'use strict';

// Minimal OOXML XLSX writer. Zero runtime dependencies — uses only Node
// built-ins (zlib for DEFLATE, crc32 computed inline). Optimised for the
// ECC Excel harness use case: text-only cells (`inlineStr`), no formulas,
// no styles beyond column widths.
//
// Excel cell limit: 32,767 chars per cell. Long HTML payloads are chunked
// across consecutive rows; column A receives a "Part i/n" marker so a
// human (or Copilot) can stitch the cells back together.

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const EXCEL_CELL_MAX = 32767;
const HTML_CHUNK_SIZE = 30000; // a little under the limit to leave room for entity expansion

// ── CRC32 (IEEE 802.3) ─────────────────────────────────────────────────────

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// ── ZIP container ──────────────────────────────────────────────────────────

function dosTime(date) {
  const d = date || new Date();
  const t = ((d.getHours() & 0x1f) << 11) | ((d.getMinutes() & 0x3f) << 5) | ((d.getSeconds() >>> 1) & 0x1f);
  const dt = (((d.getFullYear() - 1980) & 0x7f) << 9) | (((d.getMonth() + 1) & 0xf) << 5) | (d.getDate() & 0x1f);
  return { time: t, date: dt };
}

function u16(buf, off, v) { buf.writeUInt16LE(v, off); }
function u32(buf, off, v) { buf.writeUInt32LE(v >>> 0, off); }

function buildZip(entries) {
  const { time, date } = dosTime();
  const localParts = [];
  const central = [];
  let offset = 0;

  for (const entry of entries) {
    const nameBuf = Buffer.from(entry.name, 'utf8');
    const raw = Buffer.from(entry.data, 'utf8');
    const deflated = zlib.deflateRawSync(raw);
    const compressed = deflated.length < raw.length ? deflated : raw;
    const method = compressed === deflated ? 8 : 0;
    const crc = crc32(raw);

    const lfh = Buffer.alloc(30);
    u32(lfh, 0, 0x04034b50);
    u16(lfh, 4, 20);
    u16(lfh, 6, 0);
    u16(lfh, 8, method);
    u16(lfh, 10, time);
    u16(lfh, 12, date);
    u32(lfh, 14, crc);
    u32(lfh, 18, compressed.length);
    u32(lfh, 22, raw.length);
    u16(lfh, 26, nameBuf.length);
    u16(lfh, 28, 0);
    localParts.push(lfh, nameBuf, compressed);

    const cfh = Buffer.alloc(46);
    u32(cfh, 0, 0x02014b50);
    u16(cfh, 4, 20);
    u16(cfh, 6, 20);
    u16(cfh, 8, 0);
    u16(cfh, 10, method);
    u16(cfh, 12, time);
    u16(cfh, 14, date);
    u32(cfh, 16, crc);
    u32(cfh, 20, compressed.length);
    u32(cfh, 24, raw.length);
    u16(cfh, 28, nameBuf.length);
    u16(cfh, 30, 0);
    u16(cfh, 32, 0);
    u16(cfh, 34, 0);
    u16(cfh, 36, 0);
    u32(cfh, 38, 0);
    u32(cfh, 42, offset);
    central.push(cfh, nameBuf);

    offset += lfh.length + nameBuf.length + compressed.length;
  }

  const localBlock = Buffer.concat(localParts);
  const centralBlock = Buffer.concat(central);

  const eocd = Buffer.alloc(22);
  u32(eocd, 0, 0x06054b50);
  u16(eocd, 4, 0);
  u16(eocd, 6, 0);
  u16(eocd, 8, entries.length);
  u16(eocd, 10, entries.length);
  u32(eocd, 12, centralBlock.length);
  u32(eocd, 16, localBlock.length);
  u16(eocd, 20, 0);

  return Buffer.concat([localBlock, centralBlock, eocd]);
}

// ── XML helpers ────────────────────────────────────────────────────────────

const XML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' };

function xmlEscape(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (ch) => XML_ESCAPES[ch]);
}

// Drop characters Excel rejects (control chars except tab/lf/cr) to keep the
// generated XML loadable.
function xmlSafeString(s) {
  return String(s == null ? '' : s).replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, '');
}

function colLetter(idx) {
  let n = idx + 1;
  let out = '';
  while (n > 0) {
    const r = (n - 1) % 26;
    out = String.fromCharCode(65 + r) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out;
}

// ── Workbook model ─────────────────────────────────────────────────────────

function createWorkbook() {
  return { sheets: [] };
}

// Add a sheet. Rows is an array of objects:
//   { a: 'plain text', b: 'html string', ... } — keys map to columns in order
// or a flat array per row: ['a-value', 'b-value', ...].
// Long values (>HTML_CHUNK_SIZE) in column B (or any cell) are chunked across
// consecutive rows; column A is suffixed with " (Part i/n)" so the human view
// shows the split clearly.
function addSheet(wb, name, rows, opts = {}) {
  if (wb.sheets.some((s) => s.name === name)) {
    throw new Error(`duplicate sheet name: ${name}`);
  }
  if (name.length > 31) throw new Error(`sheet name exceeds 31 chars: ${name}`);
  const expanded = [];
  for (const row of rows) {
    const cells = normaliseRow(row);
    const longIdx = cells.findIndex((c) => typeof c === 'string' && c.length > HTML_CHUNK_SIZE);
    if (longIdx === -1) { expanded.push(cells); continue; }
    const longVal = cells[longIdx];
    const chunks = chunkString(longVal, HTML_CHUNK_SIZE);
    const aValue = cells[0] != null ? String(cells[0]) : '';
    chunks.forEach((chunk, idx) => {
      const partLabel = chunks.length > 1 ? ` (Part ${idx + 1}/${chunks.length})` : '';
      const partRow = cells.slice();
      partRow[0] = aValue + (chunks.length > 1 ? partLabel : '');
      partRow[longIdx] = chunk;
      expanded.push(partRow);
    });
  }
  wb.sheets.push({
    name,
    rows: expanded,
    columnWidths: opts.columnWidths || null,
  });
  return wb.sheets[wb.sheets.length - 1];
}

function normaliseRow(row) {
  if (Array.isArray(row)) return row.slice();
  if (row && typeof row === 'object') {
    const keys = Object.keys(row);
    return keys.map((k) => row[k]);
  }
  return [row];
}

function chunkString(s, size) {
  const out = [];
  for (let i = 0; i < s.length; i += size) out.push(s.slice(i, i + size));
  return out;
}

function setColumnWidths(sheet, widths) {
  sheet.columnWidths = widths;
}

// ── XML emitters ───────────────────────────────────────────────────────────

function renderSheetXml(sheet) {
  const colXml = sheet.columnWidths
    ? `<cols>${sheet.columnWidths.map((w, i) =>
        `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols>`
    : '';

  const rowsXml = sheet.rows.map((row, rIdx) => {
    const rowNum = rIdx + 1;
    const cellsXml = row.map((value, cIdx) => {
      if (value == null || value === '') return '';
      const ref = `${colLetter(cIdx)}${rowNum}`;
      const safe = xmlSafeString(value);
      const truncated = safe.length > EXCEL_CELL_MAX ? safe.slice(0, EXCEL_CELL_MAX) : safe;
      const preserve = /^\s|\s$/.test(truncated) ? ' xml:space="preserve"' : '';
      return `<c r="${ref}" t="inlineStr"><is><t${preserve}>${xmlEscape(truncated)}</t></is></c>`;
    }).join('');
    return `<row r="${rowNum}">${cellsXml}</row>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">${colXml}<sheetData>${rowsXml}</sheetData></worksheet>`;
}

function renderWorkbookXml(sheets) {
  const sheetEntries = sheets.map((s, i) =>
    `<sheet name="${xmlEscape(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheetEntries}</sheets></workbook>`;
}

function renderWorkbookRels(sheets) {
  const rels = sheets.map((_, i) =>
    `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${rels}</Relationships>`;
}

function renderRootRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;
}

function renderContentTypes(sheetCount) {
  const overrides = [];
  for (let i = 1; i <= sheetCount; i++) {
    overrides.push(`<Override PartName="/xl/worksheets/sheet${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`);
  }
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${overrides.join('')}</Types>`;
}

// ── Serialise workbook to .xlsx ────────────────────────────────────────────

function writeWorkbook(wb, outputPath) {
  if (!wb.sheets.length) throw new Error('workbook has no sheets');
  const entries = [
    { name: '[Content_Types].xml', data: renderContentTypes(wb.sheets.length) },
    { name: '_rels/.rels', data: renderRootRels() },
    { name: 'xl/workbook.xml', data: renderWorkbookXml(wb.sheets) },
    { name: 'xl/_rels/workbook.xml.rels', data: renderWorkbookRels(wb.sheets) },
  ];
  wb.sheets.forEach((sheet, idx) => {
    entries.push({ name: `xl/worksheets/sheet${idx + 1}.xml`, data: renderSheetXml(sheet) });
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buildZip(entries));
  return outputPath;
}

module.exports = {
  EXCEL_CELL_MAX,
  HTML_CHUNK_SIZE,
  addSheet,
  chunkString,
  colLetter,
  createWorkbook,
  crc32,
  setColumnWidths,
  writeWorkbook,
  xmlEscape,
};
