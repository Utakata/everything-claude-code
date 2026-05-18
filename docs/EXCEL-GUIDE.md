# Excel IDE + M365 Enterprise Copilot Guide

ECC for **Microsoft 365 Enterprise Copilot in Excel Online**.  
Excel sheets act as code files. Copilot writes code. The ECC task pane renders React/HTML artifacts.

## Architecture

```
OneDrive / SharePoint
  ├── ecc-skills/         ← Each .csv = one skill sheet (uploaded from local)
  │     tdd-workflow.csv
  │     frontend-patterns.csv
  │     python-patterns.csv
  │     ...
  ├── my-project/         ← Work sheets (Copilot writes code here)
  │     App.jsx.csv       ← React component
  │     utils.py.csv      ← Python utilities
  │     index.html.csv    ← HTML entry point
  └── [ECC Task Pane Add-in]
        → reads active sheet → renders React CDN artifact
```

### Hook System (Excel Online)

Excel Online has no native hook execution. ECC maps hook semantics to **Office.js events**:

| ECC Hook | Office.js Equivalent | Trigger |
|----------|---------------------|---------|
| `PostToolUse` | `sheet.onChanged` | Fires after Copilot or user edits cells |
| `PreToolUse` | `sheet.onSelectionChanged` | Fires when selection changes |
| `SessionStart` | `worksheet.onActivated` | Fires when a sheet is activated |
| `Stop` | `workbook.onAutoSaveSettingChanged` | Session-level lifecycle |

These events are wired in `.excel-plugin/taskpane/viewer.js`. The task pane's **hook indicator bar**
shows live event activity (green pulse = active hook).

**Power Automate** can extend this further: create flows triggered by Excel file changes via
Microsoft Graph webhooks for async post-processing (e.g., format validation, auto-commit to Git).

---

## Quick Start

### Step 1 — Install ECC (run locally, upload result)

```bash
# In the ECC repository (local machine)
./install.sh --profile excel --target excel

# Generate CSV files from ECC skills, rules, agents
node scripts/generate-excel-workbook.js --source .excel-plugin --output ./excel-ide
```

### Step 2 — Upload to OneDrive / SharePoint

Upload the entire `excel-ide/` directory to OneDrive or SharePoint.  
Each subdirectory (`ecc-skills/`, `ecc-rules/`, etc.) contains CSV files.

```
OneDrive/
  └── excel-ide/
        ├── ecc-skills/      ← skill sheets
        ├── ecc-rules/       ← rule sheets
        ├── ecc-agents/      ← agent sheets
        └── ecc-commands/    ← workflow sheets
```

### Step 3 — Open in Excel Online

1. Navigate to OneDrive → open any CSV in **Excel Online**
2. Each CSV opens as a workbook with a single sheet
3. Use "Move or copy sheet" to consolidate multiple skills into one workbook

### Step 4 — Generate a Project Template

```bash
node scripts/generate-project-template.js --type react --output ./my-app
```

Upload `my-app/` to OneDrive. Open `App.jsx.csv` in Excel Online — this is your main code sheet.

### Step 5 — Install the Task Pane Add-in

The `.excel-plugin/` directory contains the **ECC Artifact Viewer** Office Add-in.

**Option A — Microsoft AppSource / Admin Center (Enterprise)**
1. Host the `.excel-plugin/` contents on an HTTPS server
2. Update `manifest.json` with your HTTPS URL
3. Upload `manifest.json` to Microsoft 365 Admin Center → Integrated Apps

**Option B — Sideload (development)**
1. In Excel Online: Insert → Office Add-ins → Upload My Add-in
2. Select `.excel-plugin/manifest.json`

---

## IDE Workflow

### Excel Sheets as Code Files

| Sheet Name | Content | How Copilot Uses It |
|------------|---------|---------------------|
| `App.jsx` | React component code (one row = one line) | Copilot edits cells to write JSX |
| `utils.py` | Python utilities | Copilot edits cells to write Python |
| `tdd-workflow` | ECC TDD skill (from ecc-skills workbook) | Copilot reads as instructions |
| `rule:typescript` | TypeScript rules | Copilot reads as coding standards |

### Prompting Copilot with ECC Skills

Open the ECC skills workbook alongside your project workbook. Reference skills by sheet name:

```
"tdd-workflowシートを参照して、App.jsxシートにカウンターコンポーネントのテストを書いて"

"skill:python-patternsに従ってutils.pyシートのコードをリファクタリングして"

"frontend-patternsを使って、App.jsxをより良いReactコンポーネントに改善して"
```

Copilot reads the referenced sheet's content as context, then edits the target sheet.

### Artifact Rendering (React CDN)

1. Open your project workbook in Excel Online
2. Click **ECC Artifact Viewer** in the ribbon (Home tab → ECC Copilot group)
3. Select a skill from the dropdown (optional — loads as system context)
4. Click **▶ Render** — the task pane renders the active sheet's code as a React app

The task pane:
- Detects React JSX: wraps with CDN React 18 + Babel standalone
- Detects Python: shows formatted code view (run separately in Jupyter)
- Detects HTML: renders directly in iframe
- Auto-renders after Copilot edits (via `onChanged` hook, 1.5s debounce)

---

## Directory Mapping (Install)

| ECC Source | `.excel-plugin/` Destination | Excel Usage |
|------------|------------------------------|-------------|
| `rules/` | `rules/*.md` (flattened) | Context for Copilot via skill sheets |
| `agents/` | `agents/*.md` | Agent definition sheets |
| `commands/` | `commands/*.md` | Workflow/command sheets |
| `skills/*/SKILL.md` | `skills/*/SKILL.md` | Skill content sheets |
| `.excel-plugin/` | `.excel-plugin/` (scaffold) | Task pane add-in files |

---

## Hook Architecture (深堀り)

ECC の hook 設計を Excel Online でエミュレートする方法:

### Office.js Event Hooks

```js
// PostToolUse — Copilot がセルを書き込んだ後に発火
sheet.onChanged.add(event => {
  if (event.changeType === 'RangeEdited') scheduleAutoRender();
});

// PreToolUse — 選択変更（Copilot がデータを読む前）
sheet.onSelectionChanged.add(() => flashHook('hook-select'));

// SessionStart — シートがアクティブになった時
context.workbook.worksheets.onActivated.add(onSheetActivated);
```

### Power Automate による拡張 Hook

より高度な hook（非同期、外部 API 呼び出し）は Power Automate で実装:

1. **トリガー**: "When a file is modified in SharePoint" (Excel ファイル変更)
2. **アクション**: Microsoft Graph API → 変更されたセルを読み取る
3. **アクション**: HTTP POST → 外部 API（フォーマットチェック、CI 連携など）
4. **アクション**: Excel セルに結果を書き戻す

これが ECC の `PostToolUse` hook の Excel 版相当。

### Copilot Studio による Agent Hook

M365 Enterprise Copilot Studio でカスタムエージェントを作成し、
ECC スキルシートを knowledge source として登録することで、
hook-like な自動化（コードレビュー自動実行など）が可能。

---

## Troubleshooting

### Skills not loading in skill selector
- Skill sheets must be named `skill:<name>` in the workbook
- Or serve `.excel-plugin/` from HTTPS and ensure `skills-index.json` exists

### Rendering fails for React code
- Ensure the sheet code defines an `App` function/component
- The task pane auto-wraps JSX with React CDN — no `import` statements needed

### Task pane not showing in Excel Online
- Check HTTPS requirement for the `manifest.json` content URL
- For sideloading: Insert → Office Add-ins → Upload My Add-in

### CORS errors when fetching skills
- In Excel Online, serve assets from the same origin as the task pane
- Or embed skills directly as workbook sheets (offline mode)

---

## Related Resources

- [ANTIGRAVITY-GUIDE.md](./ANTIGRAVITY-GUIDE.md) — similar project-scoped adapter
- [SELECTIVE-INSTALL-ARCHITECTURE.md](./SELECTIVE-INSTALL-ARCHITECTURE.md) — install system
- [MANUAL-ADAPTATION-GUIDE.md](./MANUAL-ADAPTATION-GUIDE.md) — instruction-backed harnesses
- [cross-harness.md](./architecture/cross-harness.md) — portability model
