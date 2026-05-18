'use strict';

// Sheet-only Git template builders for the ECC Excel harness.
//
// No Office Add-in, no JavaScript, no plugins. All functionality is
// implemented as Excel native formulas (INDIRECT, TEXTJOIN, IF) that
// work in Excel Online / Microsoft 365 without any extensions.
//
// Workflow:
//   1. Copilot edits code in 90_workspace
//   2. User copies sheet: right-click → Move or Copy → 90_workspace@v1
//   3. User logs the snapshot in 98_HISTORY (manual row append)
//   4. User enters sheet names in 99_DIFF B2/B3 → INDIRECT diff renders
//   5. User copies 99_PROMPT!A2 → paste into Copilot chat

const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const ROW_COUNT = 20;

// Returns [colLetter, rowNumber] pairs for the 10×20 comparison grid,
// in row-major order so the diff output reads top-to-bottom naturally.
function gridAddresses() {
  const addrs = [];
  for (let r = 1; r <= ROW_COUNT; r++) {
    for (const col of COLUMNS) {
      addrs.push(`${col}${r}`);
    }
  }
  return addrs; // 200 entries
}

// ── 98_HISTORY ────────────────────────────────────────────────────────────

function buildHistorySheet() {
  return [
    [
      '__COPILOT__: Snapshot commit log. Append one row per snapshot. ' +
      'Columns: timestamp | base_sheet | snapshot_sheet | author | message | parent. ' +
      'Do not modify rows above row 3.',
    ],
    [],
    ['timestamp', 'base_sheet', 'snapshot_sheet', 'author', 'message', 'parent'],
    // Seed one example row (users can delete or overwrite)
    [new Date().toISOString().slice(0, 19).replace('T', ' '), '90_workspace', '90_workspace@v0', '', 'initial snapshot', ''],
  ];
}

// ── 99_DIFF ───────────────────────────────────────────────────────────────

function buildDiffSheet(workspaceSheetName) {
  const ws = workspaceSheetName || '90_workspace';
  const addrs = gridAddresses();

  const rows = [
    [
      '__COPILOT__: Cell-level diff between two snapshots. ' +
      'Enter sheet names in B2 and B3. Column D shows CHANGED for cells that differ. ' +
      'Read this column to summarise what changed between snapshots.',
    ],
    ['Left snapshot', ws],
    ['Right snapshot', ws],
    [],
    ['Cell', 'Left value', 'Right value', 'Changed?'],
  ];

  for (const addr of addrs) {
    rows.push([
      addr,
      { formula: `=IFERROR(INDIRECT("'"&$B$2&"'!"&A${rows.length + 1}),"")` },
      { formula: `=IFERROR(INDIRECT("'"&$B$3&"'!"&A${rows.length + 1}),"")` },
      { formula: `=IF(B${rows.length + 1}=C${rows.length + 1},"","CHANGED")` },
    ]);
  }

  return rows;
}

// ── 99_PROMPT ─────────────────────────────────────────────────────────────

function buildPromptSheet() {
  const promptFormula =
    '=TEXTJOIN(CHAR(10),TRUE,' +
    '"I changed sheet \'" & \'99_DIFF\'!B2 & "\' vs \'" & \'99_DIFF\'!B3 & "\'.","Changed cells:",' +
    'IFERROR(TEXTJOIN(CHAR(10),TRUE,' +
    'IF(\'99_DIFF\'!D6:D205="CHANGED",' +
    '"  " & \'99_DIFF\'!A6:A205 & ": " & \'99_DIFF\'!B6:B205 & " -> " & \'99_DIFF\'!C6:C205,' +
    '"")),"(no changes detected)"))';

  return [
    [
      '__COPILOT__: Prompt builder. Select cell A2 and press Ctrl+C, ' +
      'then paste into Copilot chat to describe what changed between snapshots.',
    ],
    [{ formula: promptFormula }],
  ];
}

module.exports = { buildHistorySheet, buildDiffSheet, buildPromptSheet };
