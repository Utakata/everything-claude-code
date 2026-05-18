'use strict';

// ECC Artifact Viewer — Office.js + React CDN renderer
// Hooks are implemented as Office.js event handlers (onChanged, onSelectionChanged, onActivated)

const config = { model: 'claude-opus-4-7', maxTokens: 4096, reactCdnVersion: '18' };
let currentSheetCode = '';
let hookHandlers = [];

// ── Office Initialization ──────────────────────────────────────────────────
Office.onReady(async (info) => {
  if (info.host !== Office.HostType.Excel) {
    setStatus('This add-in only works in Excel.');
    return;
  }

  await loadConfig();
  await loadSkillIndex();
  registerOfficeHooks();

  document.getElementById('render-btn').addEventListener('click', renderArtifact);
  document.getElementById('read-btn').addEventListener('click', readActiveSheet);
  document.getElementById('export-btn').addEventListener('click', exportHtml);

  setStatus('Ready — open a sheet and click Render');
});

// ── Config ─────────────────────────────────────────────────────────────────
async function loadConfig() {
  try {
    const resp = await fetch('../ecc-config.json');
    const cfg = await resp.json();
    Object.assign(config, cfg);
  } catch (_) { /* use defaults */ }
}

// ── Skill Index ────────────────────────────────────────────────────────────
// Excel Online: skills are read from the workbook's "ecc-skills" sheet,
// not from the local filesystem (no local access in Excel Online).
async function loadSkillIndex() {
  // Try HTTP first (desktop Excel with local server)
  try {
    const resp = await fetch('../skills-index.json');
    const { skills } = await resp.json();
    populateSkillSelector(skills);
    return;
  } catch (_) { /* fall through to in-workbook skills */ }

  // Excel Online fallback: read skill names from a sheet named "ecc-skills"
  try {
    await Excel.run(async (context) => {
      const sheets = context.workbook.worksheets;
      sheets.load('items/name');
      await context.sync();
      const skillSheets = sheets.items
        .filter(s => s.name.startsWith('skill:'))
        .map(s => s.name.replace('skill:', ''));
      populateSkillSelector(skillSheets);
    });
  } catch (_) { /* no skill sheets found */ }
}

function populateSkillSelector(skills) {
  const sel = document.getElementById('skill-selector');
  for (const id of skills) {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = id;
    sel.appendChild(opt);
  }
}

// ── Office Hook System ─────────────────────────────────────────────────────
// Maps ECC hook semantics to Office.js events
// PreToolUse  → onSelectionChanged (before Copilot reads data)
// PostToolUse → onChanged          (after Copilot writes to sheet)
// SessionStart→ onActivated        (sheet/workbook becomes active)
function registerOfficeHooks() {
  Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();

    // PostToolUse equivalent — fires after Copilot or user edits a cell
    sheet.onChanged.add(onSheetChanged);

    // PreToolUse equivalent — fires when selection changes (read intent)
    sheet.onSelectionChanged.add(onSelectionChanged);

    // SessionStart equivalent — fires when a different sheet is activated
    context.workbook.worksheets.onActivated.add(onSheetActivated);

    await context.sync();
    flashHook('hook-activate');
  }).catch(err => setStatus(`Hook registration error: ${err.message}`));
}

function onSheetChanged(event) {
  flashHook('hook-change');
  document.getElementById('hook-last').textContent =
    `onChanged: ${new Date().toLocaleTimeString()}`;
  // Auto-render when Copilot writes new code to the sheet
  if (event.changeType === 'RangeEdited') {
    scheduleAutoRender();
  }
}

function onSelectionChanged() {
  flashHook('hook-select');
}

function onSheetActivated(event) {
  flashHook('hook-activate');
  document.getElementById('sheet-name').textContent =
    event.worksheetId || 'unknown sheet';
}

let autoRenderTimer = null;
function scheduleAutoRender() {
  clearTimeout(autoRenderTimer);
  autoRenderTimer = setTimeout(() => renderArtifact(), 1500);
}

function flashHook(id) {
  const dot = document.getElementById(id);
  if (!dot) return;
  dot.classList.add('active');
  setTimeout(() => dot.classList.remove('active'), 800);
}

// ── Sheet Reading ──────────────────────────────────────────────────────────
async function readActiveSheet() {
  setStatus('Reading sheet...');
  try {
    const result = await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      const usedRange = sheet.getUsedRange();
      usedRange.load(['values', 'address']);
      sheet.load('name');
      await context.sync();
      document.getElementById('sheet-name').textContent = sheet.name;
      return { values: usedRange.values, name: sheet.name };
    });

    currentSheetCode = sheetValuesToCode(result.values);
    setStatus(`Read ${result.values.length} rows from "${result.name}"`);
    return currentSheetCode;
  } catch (err) {
    setStatus(`Read error: ${err.message}`);
    return '';
  }
}

function sheetValuesToCode(values) {
  // Single-column sheet: each row is a line of code
  if (values.every(row => row.length === 1)) {
    return values.map(row => String(row[0] || '')).join('\n');
  }
  // Multi-column: join with spaces (for structured data views)
  return values.map(row => row.map(c => String(c || '')).join(' ')).join('\n');
}

// ── Artifact Rendering ─────────────────────────────────────────────────────
async function renderArtifact() {
  setStatus('Rendering artifact...');
  if (!currentSheetCode) {
    await readActiveSheet();
  }

  const code = currentSheetCode.trim();
  if (!code) {
    setStatus('No code to render — click "Read Sheet" first');
    return;
  }

  const html = buildArtifactHtml(code);
  document.getElementById('preview-frame').srcdoc = html;
  setStatus('Rendered ✓');
}

function buildArtifactHtml(code) {
  const isReact = /import React|from ['"]react['"]|ReactDOM|jsx/.test(code)
    || /<[A-Z][A-Za-z]*[\s/>]/.test(code);
  const isPython = /^def |^import |^from |^class |^#!/.test(code);

  if (isPython) {
    return buildPythonDisplay(code);
  }

  if (isReact || code.includes('React') || code.includes('useState')) {
    return buildReactArtifact(code);
  }

  // Plain HTML passthrough
  if (code.trim().startsWith('<!DOCTYPE') || code.trim().startsWith('<html')) {
    return code;
  }

  // Default: wrap as React component
  return buildReactArtifact(code);
}

function buildReactArtifact(code) {
  const v = config.reactCdnVersion || '18';
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <script src="https://unpkg.com/react@${v}/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@${v}/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js" crossorigin></script>
  <style>
    body { margin: 16px; font-family: -apple-system, "Segoe UI", sans-serif; }
    #root { min-height: 100px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
${code}

// Auto-mount: if App component is defined, render it
if (typeof App !== 'undefined') {
  const rootEl = document.getElementById('root');
  if (typeof ReactDOM.createRoot === 'function') {
    ReactDOM.createRoot(rootEl).render(React.createElement(App));
  } else {
    ReactDOM.render(React.createElement(App), rootEl);
  }
}
  </script>
</body>
</html>`;
}

function buildPythonDisplay(code) {
  const escaped = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { margin: 16px; background: #1e1e2e; color: #cdd6f4; font-family: monospace; }
    pre { white-space: pre-wrap; line-height: 1.5; font-size: 13px; }
    .label { color: #89b4fa; font-size: 11px; margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="label">Python — rendered as code view (run in Jupyter or terminal)</div>
  <pre>${escaped}</pre>
</body>
</html>`;
}

// ── HTML Export ────────────────────────────────────────────────────────────
async function exportHtml() {
  const code = currentSheetCode || await readActiveSheet();
  if (!code) return;
  const html = buildArtifactHtml(code);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'artifact.html';
  a.click();
  URL.revokeObjectURL(url);
  setStatus('Exported artifact.html');
}

// ── Utilities ──────────────────────────────────────────────────────────────
function setStatus(msg) {
  const el = document.getElementById('status-text');
  if (el) el.textContent = msg;
}
