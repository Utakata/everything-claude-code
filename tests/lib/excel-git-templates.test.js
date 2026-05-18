/**
 * Tests for scripts/lib/excel-git-templates.js
 *
 * Run with: node tests/lib/excel-git-templates.test.js
 */

const assert = require('assert');
const { buildHistorySheet, buildDiffSheet, buildPromptSheet } = require('../../scripts/lib/excel-git-templates');

function test(name, fn) {
  try { fn(); console.log(`  ✓ ${name}`); return true; }
  catch (err) { console.log(`  ✗ ${name}`); console.log(`    Error: ${err.message}`); return false; }
}

function runTests() {
  console.log('\n=== Testing excel-git-templates ===\n');
  let passed = 0, failed = 0;
  const record = (ok) => { ok ? passed++ : failed++; };

  record(test('buildHistorySheet returns rows with __COPILOT__ directive', () => {
    const rows = buildHistorySheet();
    assert.ok(rows.length >= 3);
    assert.ok(rows[0][0].includes('__COPILOT__'));
    assert.ok(rows[0][0].includes('snapshot'));
    // Row 2 (index 2) is the header row
    const header = rows[2];
    assert.ok(header.includes('timestamp'));
    assert.ok(header.includes('base_sheet'));
    assert.ok(header.includes('snapshot_sheet'));
    assert.ok(header.includes('message'));
  }));

  record(test('buildHistorySheet seed row contains example snapshot name', () => {
    const rows = buildHistorySheet();
    const seed = rows[3];
    assert.ok(seed[1].includes('workspace'), `expected base_sheet to reference workspace, got: ${seed[1]}`);
    assert.ok(typeof seed[0] === 'string' && seed[0].length > 10, 'timestamp should be non-empty string');
  }));

  record(test('buildDiffSheet returns 205+ rows (header + 200 formula rows)', () => {
    const rows = buildDiffSheet('90_workspace');
    assert.ok(rows.length >= 205, `expected >=205 rows, got ${rows.length}`);
  }));

  record(test('buildDiffSheet row 1 carries __COPILOT__ directive', () => {
    const rows = buildDiffSheet('90_workspace');
    assert.ok(rows[0][0].includes('__COPILOT__'));
    assert.ok(rows[0][0].includes('B2') || rows[0][0].includes('B3'));
  }));

  record(test('buildDiffSheet B2 defaults to supplied workspace sheet name', () => {
    const rows = buildDiffSheet('90_workspace');
    assert.strictEqual(rows[1][1], '90_workspace');
    const rows2 = buildDiffSheet('mySheet');
    assert.strictEqual(rows2[1][1], 'mySheet');
  }));

  record(test('buildDiffSheet formula rows use INDIRECT referencing $B$2/$B$3', () => {
    const rows = buildDiffSheet('90_workspace');
    // Row index 5 is the first data row (A1 cell comparison)
    const firstFormRow = rows[5];
    assert.strictEqual(firstFormRow[0], 'A1');
    assert.ok(typeof firstFormRow[1] === 'object' && firstFormRow[1].formula);
    assert.ok(firstFormRow[1].formula.includes('INDIRECT'));
    assert.ok(firstFormRow[1].formula.includes('$B$2'));
    assert.ok(typeof firstFormRow[2] === 'object' && firstFormRow[2].formula);
    assert.ok(firstFormRow[2].formula.includes('$B$3'));
    assert.ok(typeof firstFormRow[3] === 'object' && firstFormRow[3].formula);
    assert.ok(firstFormRow[3].formula.includes('IF'));
    assert.ok(firstFormRow[3].formula.includes('CHANGED'));
  }));

  record(test('buildDiffSheet covers the full 10-column × 20-row grid', () => {
    const rows = buildDiffSheet('90_workspace');
    // Header rows: directive(1) + left(1) + right(1) + blank(1) + colheaders(1) = 5
    // Data rows should be 10 * 20 = 200
    const dataRows = rows.slice(5);
    assert.strictEqual(dataRows.length, 200);
    assert.strictEqual(dataRows[0][0], 'A1');
    assert.strictEqual(dataRows[9][0], 'J1');   // last col, first row
    assert.strictEqual(dataRows[10][0], 'A2');  // second row starts
    assert.strictEqual(dataRows[199][0], 'J20'); // last cell
  }));

  record(test('buildPromptSheet returns rows with __COPILOT__ directive and TEXTJOIN formula', () => {
    const rows = buildPromptSheet();
    assert.ok(rows.length >= 2);
    assert.ok(rows[0][0].includes('__COPILOT__'));
    assert.ok(rows[0][0].includes('A2'));
    const formulaCell = rows[1][0];
    assert.ok(typeof formulaCell === 'object' && formulaCell.formula);
    assert.ok(formulaCell.formula.includes('TEXTJOIN'));
    assert.ok(formulaCell.formula.includes('99_DIFF'));
    assert.ok(formulaCell.formula.includes('CHANGED'));
    assert.ok(formulaCell.formula.includes('INDIRECT') || formulaCell.formula.includes('IF'));
  }));

  record(test('buildPromptSheet formula references 99_DIFF sheet for diff data', () => {
    const rows = buildPromptSheet();
    const formula = rows[1][0].formula;
    assert.ok(formula.includes("'99_DIFF'") || formula.includes('99_DIFF'));
    assert.ok(formula.includes('D6:D205') || formula.includes('D6'));
    assert.ok(formula.includes('A6:A205') || formula.includes('A6'));
  }));

  console.log(`\n${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exit(1);
}

runTests();
