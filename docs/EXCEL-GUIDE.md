# Excel IDE + M365 Enterprise Copilot Guide

ECC for **Microsoft 365 Enterprise Copilot in Excel Online**.  
All functionality runs inside Excel sheets using native formulas — no plugins, no extensions, no Office Add-ins required.

## Architecture

```
Local machine (Node.js ≥18)
  └── scripts/generate-excel-workbook.js
        ↓ generates one .xlsx per language
OneDrive / SharePoint
  ├── python.xlsx
  ├── javascript.xlsx
  ├── typescript.xlsx
  └── ... (one per language config)

Each .xlsx structure:
  00_INDEX          ← Copilot overview + sheet directory
  01_<rule/skill>   ← Rules and skills as HTML + plain text
  02_...
  ...
  90_workspace      ← Copilot writes code here
  98_HISTORY        ← Manual snapshot log (timestamp / sheet names / message)
  99_DIFF           ← INDIRECT-formula diff between two sheets
  99_PROMPT         ← TEXTJOIN formula builds Copilot prompt from diff
```

---

## Quick Start

### Step 1 — Generate language workbooks

```bash
# In the ECC repository (local machine, Node.js ≥18)

# Generate all language workbooks
node scripts/generate-excel-workbook.js

# Generate a specific language
node scripts/generate-excel-workbook.js --language python --output ./excel-output

# Generate CSV instead of XLSX (legacy)
node scripts/generate-excel-workbook.js --language python --format csv --output ./excel-output
```

Output files appear in the current directory (or `--output` path):
```
python.xlsx
javascript.xlsx
typescript.xlsx
general.xlsx
... (one per language)
```

### Step 2 — Upload to OneDrive / SharePoint

Upload the `.xlsx` files to your OneDrive or a SharePoint document library.

### Step 3 — Open in Excel Online

1. Navigate to OneDrive → open a language workbook (e.g., `python.xlsx`)
2. Excel Online opens the file with all sheets intact
3. Navigate to the `00_INDEX` sheet first — it contains the Copilot directive and a directory of all sheets

---

## Sheet-by-Sheet Reference

### `00_INDEX` — Workbook overview

- **Column A** (plain text): Copilot directive + table of contents listing all sheet names and purposes
- **Column B** (HTML): Rich HTML version of the same content for human reading

Copilot reads column A only. The `__COPILOT__` directive in A1 instructs Copilot to read `00_INDEX` first before any other sheet.

### `NN_<kind>_<name>` — Rules, skills, agents, commands

Each rule / skill / agent / command from the ECC repository becomes a sheet:

- **Column A** (plain text): `__COPILOT__` directive + full Markdown content
- **Column B** (HTML): Rendered HTML version for human reading

The `NN_` numeric prefix controls read order. Copilot reads lower-numbered sheets first when scanning the workbook.

### `90_workspace` — Active coding area

The sheet where Copilot writes code.

- Start with an empty sheet or a template
- Ask Copilot to write code based on the rules/skills in the other sheets
- Example prompt: `"01_python-coding-styleシートのルールに従って、90_workspaceシートにFibonacciクラスを書いて"`

### `98_HISTORY` — Snapshot log

Manual commit log. Append one row per snapshot you create.

| Column | Content |
|--------|---------|
| A | Timestamp (e.g., `2025-05-18 14:32:00`) |
| B | Base sheet name (e.g., `90_workspace`) |
| C | Snapshot sheet name (e.g., `90_workspace@v1`) |
| D | Author (optional) |
| E | Message (e.g., `"add Fibonacci class"`) |
| F | Parent snapshot (optional) |

### `99_DIFF` — Cell-level diff

Compares two sheets using `INDIRECT` formulas. No macros required.

| Cell | Content |
|------|---------|
| B2 | Left sheet name (type the name of the base/original sheet) |
| B3 | Right sheet name (type the name of the changed snapshot) |
| A6:A205 | Cell addresses (`A1`, `B1`, ..., `J20`) |
| B6:B205 | `=IFERROR(INDIRECT("'"&$B$2&"'!"&A6),"")` — left values |
| C6:C205 | `=IFERROR(INDIRECT("'"&$B$3&"'!"&A6),"")` — right values |
| D6:D205 | `=IF(B6=C6,"","CHANGED")` — diff indicator |

The grid covers columns A–J, rows 1–20 (200 cells). This covers typical code/data sheets.

### `99_PROMPT` — Copilot prompt builder

Cell A2 contains a `TEXTJOIN` formula that automatically builds a natural-language summary of changes from `99_DIFF`. Works with Excel 365 / Excel Online dynamic array formulas — no Ctrl+Shift+Enter needed.

---

## Sheet-only Git Workflow

This workflow replaces a Git client entirely using Excel-native features.

### 1. Edit in `90_workspace`

Ask Copilot to write or modify code in `90_workspace`. All editing happens in this sheet.

### 2. Take a snapshot (manual "commit")

1. Right-click the `90_workspace` tab → **Move or Copy...**
2. Check **Create a copy**
3. Set **Before sheet**: *(move to end)*
4. Rename the copy: `90_workspace@v1` (or use a timestamp: `90_workspace@2025-05-18`)
5. Click OK

The snapshot is now a read-only record of the workspace at that point in time.

### 3. Log the snapshot in `98_HISTORY`

Append a row to `98_HISTORY`:

```
2025-05-18 14:32:00 | 90_workspace | 90_workspace@v1 | alice | add Fibonacci class |
```

### 4. Diff two snapshots using `99_DIFF`

1. Navigate to `99_DIFF`
2. Type the **base** sheet name in **B2** (e.g., `90_workspace@v1`)
3. Type the **changed** sheet name in **B3** (e.g., `90_workspace`)
4. Column D shows `CHANGED` for every cell that differs

### 5. Build a Copilot prompt from the diff

1. Navigate to `99_PROMPT`
2. Select cell **A2** (the TEXTJOIN formula cell)
3. Press **Ctrl+C** to copy the formula's evaluated text
4. Paste into the **Copilot chat panel** — it summarises exactly which cells changed and what the new values are

Example output pasted to Copilot:

```
I changed sheet '90_workspace@v1' vs '90_workspace'.
Changed cells:
  A3: "" → "def fibonacci(n):"
  A4: "" → "    if n <= 1: return n"
  A5: "" → "    return fibonacci(n-1) + fibonacci(n-2)"
```

### 6. Restore from a snapshot

1. Navigate to the snapshot sheet (e.g., `90_workspace@v1`)
2. Select all (**Ctrl+A**) → Copy (**Ctrl+C**)
3. Navigate to `90_workspace`
4. Select cell A1 → Paste (**Ctrl+V**)

The workspace is now restored to the snapshot state.

---

## Copilot Sheet Read Order — Critical Caveat

**M365 Copilot (Opus 4.7) のシート読み取り順序は公式に保証されていません。**  
ワークブックには階層構造がなく、どのシートをどの順番で読むかはコンテキストや
プロンプトによって変動します。これに対する ECC の対策:

### 1. シート名の数値プレフィックス

`generate-excel-workbook.js` は全シートに `01_`, `02_`, ... を自動付加します:

```
00_INDEX                    ← 必ず最初に読ませる（数値最小）
01_tdd-workflow
02_frontend-patterns
03_python-patterns
...
90_workspace
98_HISTORY
99_DIFF
99_PROMPT
```

辞書順ソート時に `00_INDEX` が必ず先頭に来ます。Copilot がワークブックを
スキャンするとき、この順序を尊重する可能性が高まります。

### 2. A1 セルの `__COPILOT__` ディレクティブ

各シートの A1 セルには明示的な指示が自動挿入されます:

```
A1: __COPILOT__: This sheet is ECC skill "tdd-workflow".
    Read COLUMN A only (plain text). Column B is HTML for human reading.
    Reference this skill when writing code in 90_workspace.
```

これにより、Copilot がどのシートを読んでも、A1 で「何のシートか」「どう使うか」
を即座に把握できます。プロンプトインジェクション耐性も向上します。

### 3. `00_INDEX` シートの集約

各ワークブックの `00_INDEX` シートには:
- ワークブック全体の目的（Copilot 向けインストラクション）
- 全シートの読み取り優先度
- 各シートの 1 行サマリー

これにより、Copilot は `00_INDEX` を最初に読めば全体構造を理解できます。

### 4. ユーザー側のプロンプト指示

明示的に順序を指定するプロンプトパターン:

```
"最初に00_INDEXシートを読んで、その後01_tdd-workflowシートの内容に従って
90_workspaceシートにテストを書いて"
```

シート名の `01_` プレフィックスを含めることで、Copilot が正しいシートを
ピンポイントで特定できます。

---

## Supported Languages

| Language key | Generated file | Included sources |
|---|---|---|
| `python` | `python.xlsx` | Python rules, TDD workflow, general skills |
| `javascript` | `javascript.xlsx` | JS rules, frontend patterns, general skills |
| `typescript` | `typescript.xlsx` | TS rules, frontend patterns, general skills |
| `react` | `react.xlsx` | React rules, frontend patterns, general skills |
| `java` | `java.xlsx` | Java rules, general skills |
| `csharp` | `csharp.xlsx` | C# rules, general skills |
| `go` | `go.xlsx` | Go rules, general skills |
| `rust` | `rust.xlsx` | Rust rules, general skills |
| `general` | `general.xlsx` | All general skills and rules |

---

## Troubleshooting

### `99_DIFF` shows no CHANGED cells when differences exist

- Verify that the sheet names in B2 and B3 exactly match the tab names (case-sensitive)
- Sheet names containing special characters (`@`, spaces) must exist as exact tab names — Excel's INDIRECT uses single-quotes around them automatically via the formula

### `99_PROMPT` A2 shows `#VALUE!` or `(no changes detected)` unexpectedly

- Ensure `99_DIFF` is in the same workbook (INDIRECT across workbooks requires the source file to be open)
- If B2/B3 are empty, `99_DIFF` returns empty strings throughout — `99_PROMPT` reports no changes

### Snapshot sheets appear before `90_workspace` in the tab bar

- Excel inserts copied sheets at the specified position; move them after `99_PROMPT` manually if needed
- Tab order does not affect `INDIRECT` formula resolution — formulas use sheet names, not positions

### Large workbooks are slow to open in Excel Online

- Each language workbook targets < 5 MB; if a workbook exceeds this, the HTML content in column B may be truncated automatically
- Use `--format csv` to generate lightweight CSVs for debugging

---

## Related Resources

- [ANTIGRAVITY-GUIDE.md](./ANTIGRAVITY-GUIDE.md) — similar project-scoped adapter
- [SELECTIVE-INSTALL-ARCHITECTURE.md](./SELECTIVE-INSTALL-ARCHITECTURE.md) — install system
- [MANUAL-ADAPTATION-GUIDE.md](./MANUAL-ADAPTATION-GUIDE.md) — instruction-backed harnesses
- [cross-harness.md](./architecture/cross-harness.md) — portability model
