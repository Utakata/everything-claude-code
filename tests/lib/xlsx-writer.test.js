/**
 * Tests for scripts/lib/xlsx-writer.js
 *
 * Run with: node tests/lib/xlsx-writer.test.js
 */

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const zlib = require('zlib');

const {
  addSheet,
  chunkString,
  colLetter,
  createWorkbook,
  crc32,
  setColumnWidths,
  writeWorkbook,
  xmlEscape,
  HTML_CHUNK_SIZE,
  EXCEL_CELL_MAX,
} = require('../../scripts/lib/xlsx-writer');

// Minimal ZIP central-directory reader so the tests stay self-contained.
// Returns { [name]: Buffer }.
function readZip(buf) {
  const SIG_EOCD = 0x06054b50;
  let eocdOffset = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
    if (buf.readUInt32LE(i) === SIG_EOCD) { eocdOffset = i; break; }
  }
  assert.ok(eocdOffset !== -1, 'EOCD not found');
  const entryCount = buf.readUInt16LE(eocdOffset + 10);
  const cdSize = buf.readUInt32LE(eocdOffset + 12);
  const cdOffset = buf.readUInt32LE(eocdOffset + 16);

  const out = {};
  let cursor = cdOffset;
  for (let i = 0; i < entryCount; i++) {
    assert.strictEqual(buf.readUInt32LE(cursor), 0x02014b50, 'CFH signature mismatch');
    const method = buf.readUInt16LE(cursor + 10);
    const compSize = buf.readUInt32LE(cursor + 20);
    const uncompSize = buf.readUInt32LE(cursor + 24);
    const nameLen = buf.readUInt16LE(cursor + 28);
    const extraLen = buf.readUInt16LE(cursor + 30);
    const commentLen = buf.readUInt16LE(cursor + 32);
    const localOffset = buf.readUInt32LE(cursor + 42);
    const name = buf.slice(cursor + 46, cursor + 46 + nameLen).toString('utf8');

    const lfhNameLen = buf.readUInt16LE(localOffset + 26);
    const lfhExtraLen = buf.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + lfhNameLen + lfhExtraLen;
    const raw = buf.slice(dataStart, dataStart + compSize);
    const data = method === 8 ? zlib.inflateRawSync(raw) : raw;
    assert.strictEqual(data.length, uncompSize, `uncompressed size mismatch for ${name}`);
    out[name] = data;

    cursor += 46 + nameLen + extraLen + commentLen;
  }
  void cdSize;
  return out;
}

function test(name, fn) {
  try { fn(); console.log(`  ✓ ${name}`); return true; }
  catch (err) { console.log(`  ✗ ${name}`); console.log(`    Error: ${err.message}`); return false; }
}

function runTests() {
  console.log('\n=== Testing xlsx-writer ===\n');
  let passed = 0, failed = 0;
  const record = (ok) => { ok ? passed++ : failed++; };

  record(test('colLetter maps indices to A, B, … Z, AA', () => {
    assert.strictEqual(colLetter(0), 'A');
    assert.strictEqual(colLetter(1), 'B');
    assert.strictEqual(colLetter(25), 'Z');
    assert.strictEqual(colLetter(26), 'AA');
    assert.strictEqual(colLetter(27), 'AB');
  }));

  record(test('xmlEscape escapes the five XML special chars', () => {
    assert.strictEqual(xmlEscape('a & b < c > d " e \''), 'a &amp; b &lt; c &gt; d &quot; e &apos;');
  }));

  record(test('crc32 matches known IEEE 802.3 vectors', () => {
    assert.strictEqual(crc32(Buffer.from('')), 0);
    assert.strictEqual(crc32(Buffer.from('123456789')), 0xcbf43926);
    assert.strictEqual(crc32(Buffer.from('The quick brown fox jumps over the lazy dog')), 0x414fa339);
  }));

  record(test('chunkString splits at the given size', () => {
    assert.deepStrictEqual(chunkString('abcdefghij', 3), ['abc', 'def', 'ghi', 'j']);
    assert.deepStrictEqual(chunkString('ab', 5), ['ab']);
  }));

  record(test('addSheet rejects duplicate names', () => {
    const wb = createWorkbook();
    addSheet(wb, 'A', [['x']]);
    assert.throws(() => addSheet(wb, 'A', [['y']]));
  }));

  record(test('addSheet rejects names over 31 chars', () => {
    const wb = createWorkbook();
    assert.throws(() => addSheet(wb, 'x'.repeat(32), [['v']]));
  }));

  record(test('addSheet chunks long cell values across rows with Part i/n labels', () => {
    const wb = createWorkbook();
    const huge = 'h'.repeat(HTML_CHUNK_SIZE * 2 + 100);
    const sheet = addSheet(wb, 'big', [['summary', huge]]);
    assert.ok(sheet.rows.length >= 3, 'expected at least 3 chunked rows');
    assert.ok(/Part 1\/3/.test(sheet.rows[0][0]));
    assert.ok(/Part 3\/3/.test(sheet.rows[2][0]));
    assert.ok(sheet.rows[0][1].length <= HTML_CHUNK_SIZE);
  }));

  record(test('writeWorkbook creates a parseable XLSX (Content_Types + workbook + sheets)', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'xlsx-'));
    const out = path.join(tmp, 'out.xlsx');
    const wb = createWorkbook();
    addSheet(wb, '00_INDEX', [
      ['Section', 'Value'],
      ['Lang', 'python'],
    ]);
    const s2 = addSheet(wb, '01_rule', [
      ['__COPILOT__', 'directive text'],
      ['', ''],
      ['Heading', '<h1>HTML payload</h1>'],
    ]);
    setColumnWidths(s2, [40, 120]);
    writeWorkbook(wb, out);

    const buf = fs.readFileSync(out);
    const files = readZip(buf);
    assert.ok(files['[Content_Types].xml']);
    assert.ok(files['_rels/.rels']);
    assert.ok(files['xl/workbook.xml']);
    assert.ok(files['xl/_rels/workbook.xml.rels']);
    assert.ok(files['xl/worksheets/sheet1.xml']);
    assert.ok(files['xl/worksheets/sheet2.xml']);

    const wbXml = files['xl/workbook.xml'].toString('utf8');
    assert.ok(wbXml.includes('name="00_INDEX"'));
    assert.ok(wbXml.includes('name="01_rule"'));

    const sheet2 = files['xl/worksheets/sheet2.xml'].toString('utf8');
    assert.ok(sheet2.includes('<t>__COPILOT__</t>'));
    assert.ok(sheet2.includes('&lt;h1&gt;HTML payload&lt;/h1&gt;'));
    assert.ok(sheet2.includes('width="120"'));

    fs.rmSync(tmp, { recursive: true });
  }));

  record(test('writeWorkbook escapes special chars and preserves whitespace cells', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'xlsx-'));
    const out = path.join(tmp, 'out.xlsx');
    const wb = createWorkbook();
    addSheet(wb, 'esc', [
      ['  leading spaces', 'tail '],
      ['quote"&<>', '<script>x</script>'],
    ]);
    writeWorkbook(wb, out);
    const xml = readZip(fs.readFileSync(out))['xl/worksheets/sheet1.xml'].toString('utf8');
    assert.ok(xml.includes('xml:space="preserve"'));
    assert.ok(xml.includes('quote&quot;&amp;&lt;&gt;'));
    assert.ok(!xml.includes('<script>x</script>'));
    assert.ok(xml.includes('&lt;script&gt;x&lt;/script&gt;'));
    fs.rmSync(tmp, { recursive: true });
  }));

  record(test('addSheet accepts formula objects and does not chunk them', () => {
    const wb = createWorkbook();
    const sheet = addSheet(wb, 'formulas', [
      [{ formula: '=SUM(A1:A10)' }],
      [{ formula: '=IFERROR(A1,"")' }],
      ['text', { formula: '=B1+1', value: '42' }],
    ]);
    assert.strictEqual(sheet.rows.length, 3);
    assert.deepStrictEqual(sheet.rows[0][0], { formula: '=SUM(A1:A10)' });
    assert.deepStrictEqual(sheet.rows[2][1], { formula: '=B1+1', value: '42' });
  }));

  record(test('writeWorkbook emits <f> tags for formula cells', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'xlsx-'));
    const out = path.join(tmp, 'f.xlsx');
    const wb = createWorkbook();
    addSheet(wb, 'fs', [
      ['label', { formula: '=SUM(A2:A5)' }],
      ['cached', { formula: '=A1+1', value: '99' }],
    ]);
    writeWorkbook(wb, out);
    const xml = readZip(fs.readFileSync(out))['xl/worksheets/sheet1.xml'].toString('utf8');
    assert.ok(xml.includes('<f>SUM(A2:A5)</f>'), 'formula should appear in <f> tag without leading =');
    assert.ok(xml.includes('<f>A1+1</f>'), 'second formula should appear without leading =');
    assert.ok(xml.includes('<v>99</v>'), 'cached value should appear in <v> tag');
    // Formula cells (column B) must not carry t="inlineStr"
    assert.ok(!/<c r="B\d+" t="inlineStr"/.test(xml), 'formula cells must not use inlineStr type');
    fs.rmSync(tmp, { recursive: true });
  }));

  record(test('writeWorkbook truncates a single cell at EXCEL_CELL_MAX even after chunking', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'xlsx-'));
    const out = path.join(tmp, 'out.xlsx');
    const wb = createWorkbook();
    addSheet(wb, 's', [['ok', 'short']]);
    writeWorkbook(wb, out);
    const xml = readZip(fs.readFileSync(out))['xl/worksheets/sheet1.xml'].toString('utf8');
    assert.ok(xml.length < EXCEL_CELL_MAX * 2);
    fs.rmSync(tmp, { recursive: true });
  }));

  console.log(`\n${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exit(1);
}

runTests();
