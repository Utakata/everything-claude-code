/**
 * Tests for scripts/generate-excel-workbook.js
 *
 * Run with: node tests/scripts/generate-excel-workbook.test.js
 */

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const zlib = require('zlib');

const {
  buildLanguageWorkbook,
  buildIndexSheet,
  buildSheetRows,
  copilotDirective,
  parseArgs,
  prefixSheetName,
  resolveRuleSources,
  resolveSkillSources,
  resolveCommandSources,
  rowsToCsv,
  writeLanguageXlsx,
  writeLanguageCsv,
  LANGUAGE_CONFIGS,
} = require('../../scripts/generate-excel-workbook');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

function readZip(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  const cnt = buf.readUInt16LE(eocd + 10);
  const cdOff = buf.readUInt32LE(eocd + 16);
  const out = {};
  let c = cdOff;
  for (let i = 0; i < cnt; i++) {
    const method = buf.readUInt16LE(c + 10);
    const compSize = buf.readUInt32LE(c + 20);
    const nameLen = buf.readUInt16LE(c + 28);
    const extraLen = buf.readUInt16LE(c + 30);
    const commentLen = buf.readUInt16LE(c + 32);
    const local = buf.readUInt32LE(c + 42);
    const name = buf.slice(c + 46, c + 46 + nameLen).toString('utf8');
    const lfhName = buf.readUInt16LE(local + 26);
    const lfhExtra = buf.readUInt16LE(local + 28);
    const raw = buf.slice(local + 30 + lfhName + lfhExtra, local + 30 + lfhName + lfhExtra + compSize);
    out[name] = method === 8 ? zlib.inflateRawSync(raw) : raw;
    c += 46 + nameLen + extraLen + commentLen;
  }
  return out;
}

function test(name, fn) {
  try { fn(); console.log(`  ✓ ${name}`); return true; }
  catch (err) { console.log(`  ✗ ${name}`); console.log(`    Error: ${err.message}`); return false; }
}

function runTests() {
  console.log('\n=== Testing generate-excel-workbook ===\n');
  let passed = 0, failed = 0;
  const record = (ok) => { ok ? passed++ : failed++; };

  record(test('parseArgs accepts --language, --format, --output', () => {
    const a = parseArgs(['node', 'gen', '--language', 'python', '--format', 'csv', '--output', '/tmp/x']);
    assert.strictEqual(a.language, 'python');
    assert.strictEqual(a.format, 'csv');
    assert.strictEqual(a.output, '/tmp/x');
  }));

  record(test('parseArgs defaults to language=all and format=xlsx', () => {
    const a = parseArgs(['node', 'gen']);
    assert.strictEqual(a.language, 'all');
    assert.strictEqual(a.format, 'xlsx');
  }));

  record(test('prefixSheetName attaches NN_ and stays within 31 chars', () => {
    assert.strictEqual(prefixSheetName(0, 'rule', 'short'), '01_short');
    const long = prefixSheetName(8, 'skill', 'a'.repeat(40));
    assert.ok(long.length <= 31, `expected ≤31 chars, got ${long.length}`);
    assert.ok(long.startsWith('09_'));
  }));

  record(test('copilotDirective is plain text and references the language workbook', () => {
    const d = copilotDirective('rule', 'python-coding-style', 'python');
    assert.ok(d.includes('__COPILOT__'));
    assert.ok(d.includes('Read COLUMN A only'));
    assert.ok(d.includes('"python-coding-style"'));
    assert.ok(d.includes('(workbook: python)'));
    assert.ok(!d.includes('<')); // no HTML in directive
  }));

  record(test('resolveRuleSources walks rules/<dir> for .md files', () => {
    const sources = resolveRuleSources(REPO_ROOT, ['rules/python']);
    assert.ok(sources.length > 0);
    assert.ok(sources.every((s) => s.kind === 'rule'));
    assert.ok(sources.some((s) => s.displayName.includes('coding-style')));
  }));

  record(test('resolveSkillSources finds named skills under skills/', () => {
    const sources = resolveSkillSources(REPO_ROOT, ['tdd-workflow', 'does-not-exist']);
    assert.strictEqual(sources.length, 1);
    assert.strictEqual(sources[0].kind, 'skill');
    assert.strictEqual(sources[0].displayName, 'tdd-workflow');
  }));

  record(test('resolveCommandSources finds named commands under commands/', () => {
    const sources = resolveCommandSources(REPO_ROOT, ['plan.md', 'missing.md']);
    assert.ok(sources.length >= 1);
    assert.strictEqual(sources[0].kind, 'command');
  }));

  record(test('buildSheetRows produces [A1, B1] with directive + HTML', () => {
    const source = resolveSkillSources(REPO_ROOT, ['tdd-workflow'])[0];
    const rows = buildSheetRows(source, 'python');
    assert.ok(rows.length >= 2);
    assert.ok(rows[0][0].includes('__COPILOT__'));
    assert.ok(rows[0][1].startsWith('<!DOCTYPE html>'));
  }));

  record(test('buildIndexSheet output column A is plain text and B is HTML', () => {
    const sheets = [
      { name: '01_rule_x', kind: 'rule', displayName: 'rule-x', rows: [] },
      { name: '02_skill_y', kind: 'skill', displayName: 'skill-y', rows: [] },
    ];
    const rows = buildIndexSheet(sheets, 'python', 'summary text');
    assert.strictEqual(rows.length, 1);
    assert.ok(rows[0][0].includes('INSTRUCTION FOR COPILOT'));
    assert.ok(rows[0][0].includes('01_rule_x'));
    assert.ok(rows[0][1].startsWith('<!DOCTYPE html>'));
    assert.ok(rows[0][1].includes('<table>'));
  }));

  record(test('buildLanguageWorkbook returns sheets ending with 99_workspace + 00_COMMITS', () => {
    const { workbookSheets } = buildLanguageWorkbook('python', REPO_ROOT);
    assert.ok(workbookSheets.length > 5);
    const tail = workbookSheets.slice(-2).map((s) => s.name);
    assert.deepStrictEqual(tail, ['99_workspace', '00_COMMITS']);
  }));

  record(test('every language config produces a writable workbook', () => {
    for (const lang of Object.keys(LANGUAGE_CONFIGS)) {
      const { workbookSheets, cfg } = buildLanguageWorkbook(lang, REPO_ROOT);
      assert.ok(workbookSheets.length >= 2, `${lang}: too few sheets`);
      assert.ok(cfg.title, `${lang}: missing title`);
    }
  }));

  record(test('writeLanguageXlsx produces a valid xlsx with NN_ ordering and 00_INDEX', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'excel-'));
    const { workbookSheets, cfg } = buildLanguageWorkbook('python', REPO_ROOT);
    const out = writeLanguageXlsx('python', workbookSheets, cfg, tmp);
    const buf = fs.readFileSync(out);
    const files = readZip(buf);
    assert.ok(files['xl/workbook.xml']);
    const wbXml = files['xl/workbook.xml'].toString('utf8');
    assert.ok(wbXml.includes('name="00_INDEX"'));
    assert.ok(/name="01_/.test(wbXml));
    assert.ok(wbXml.includes('name="99_workspace"'));
    assert.ok(wbXml.includes('name="00_COMMITS"'));
    fs.rmSync(tmp, { recursive: true });
  }));

  record(test('writeLanguageXlsx embeds HTML payload in column B', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'excel-'));
    const { workbookSheets, cfg } = buildLanguageWorkbook('python', REPO_ROOT);
    const out = writeLanguageXlsx('python', workbookSheets, cfg, tmp);
    const files = readZip(fs.readFileSync(out));
    // Find the first non-index content sheet (sheet2).
    const sheet2 = files['xl/worksheets/sheet2.xml'].toString('utf8');
    assert.ok(sheet2.includes('__COPILOT__'), 'directive should be in column A');
    assert.ok(sheet2.includes('&lt;!DOCTYPE html&gt;'), 'HTML should be escaped into column B');
    fs.rmSync(tmp, { recursive: true });
  }));

  record(test('writeLanguageCsv outputs one CSV per sheet (legacy mode)', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'excel-'));
    const { workbookSheets, cfg } = buildLanguageWorkbook('general', REPO_ROOT);
    const dir = writeLanguageCsv('general', workbookSheets, cfg, tmp);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.csv')).sort();
    assert.ok(files.includes('00_INDEX.csv'));
    assert.ok(files.includes('99_workspace.csv'));
    fs.rmSync(tmp, { recursive: true });
  }));

  record(test('rowsToCsv quotes fields with commas, quotes, or newlines', () => {
    const out = rowsToCsv([['a', 'b,c'], ['"q"', 'multi\nline']]);
    assert.ok(out.includes('"b,c"'));
    assert.ok(out.includes('""q""'));
    assert.ok(out.includes('"multi\nline"'));
  }));

  console.log(`\n${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exit(1);
}

runTests();
