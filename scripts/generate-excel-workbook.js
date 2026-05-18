#!/usr/bin/env node
'use strict';

/**
 * generate-excel-workbook.js
 *
 * Generates one .xlsx workbook per language for the Excel Online harness.
 * Sheets carry an `__COPILOT__` A1 directive (plain text, for Copilot
 * consumption) and an HTML payload in column B (for the Task Pane viewer).
 *
 * Usage:
 *   node scripts/generate-excel-workbook.js --language python --output ./excel-ide
 *   node scripts/generate-excel-workbook.js --language all --output ./excel-ide
 *   node scripts/generate-excel-workbook.js --format csv --output ./excel-ide   # legacy
 */

const fs = require('fs');
const path = require('path');

const {
  skillToRows, ruleToRows, agentToRows,
} = require('./lib/markdown-to-excel');
const {
  skillToHtml, ruleToHtml, agentToHtml, commandToHtml,
  htmlToShortPlain, wrapAsSelfContainedDoc,
} = require('./lib/markdown-to-html');
const {
  createWorkbook, addSheet, writeWorkbook, setColumnWidths,
} = require('./lib/xlsx-writer');
const {
  LANGUAGE_CONFIGS, getLanguageConfig, hasLanguage, listLanguages,
} = require('./lib/excel-language-configs');

const REPO_ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const args = {
    source: REPO_ROOT,
    output: path.join(REPO_ROOT, 'excel-ide'),
    language: 'all',
    format: 'xlsx',
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--source'   && argv[i + 1]) { args.source   = argv[++i]; continue; }
    if (a === '--output'   && argv[i + 1]) { args.output   = argv[++i]; continue; }
    if (a === '--language' && argv[i + 1]) { args.language = argv[++i]; continue; }
    if (a === '--format'   && argv[i + 1]) { args.format   = argv[++i]; continue; }
    if (a === '--help' || a === '-h') { printHelp(); process.exit(0); }
  }
  return args;
}

function printHelp() {
  console.log(`
Usage: node scripts/generate-excel-workbook.js [options]

Options:
  --language <name>   Language workbook to build: ${listLanguages().join(', ')}, or "all"
                      (default: all)
  --source <dir>      ECC source directory (default: repo root)
  --output <dir>      Output directory for workbooks (default: ./excel-ide)
  --format <fmt>      "xlsx" (default) or "csv" (legacy, one CSV per sheet)
  --help, -h          Show this help

Per-language workbook structure:
  00_INDEX     — HTML navigation in column B, plain-text outline in column A
  NN_<name>    — rule / skill / agent / command sheets in priority order
  99_workspace — empty sheet where Copilot writes code
  00_COMMITS   — snapshot log (seeded; appended by Task Pane snapshot.js)
`);
}

// ── Source resolution ──────────────────────────────────────────────────────

function readFileSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch (_) { return ''; }
}

function readDirSafe(p) {
  try { return fs.readdirSync(p, { withFileTypes: true }); } catch (_) { return []; }
}

// Walk `rules/<dir>` for .md files. Resolves `rules/python` to its files.
function resolveRuleSources(sourceRoot, ruleSpecs) {
  const out = [];
  for (const spec of ruleSpecs) {
    const dir = path.join(sourceRoot, spec);
    for (const entry of readDirSafe(dir)) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        const fullPath = path.join(dir, entry.name);
        const relParts = spec.split('/').slice(1).concat(entry.name.replace(/\.md$/, ''));
        const baseName = `rule_${relParts.join('-')}`;
        out.push({ kind: 'rule', baseName, fullPath, displayName: relParts.join('/') });
      }
    }
  }
  return out;
}

function resolveSkillSources(sourceRoot, skillNames) {
  const out = [];
  for (const name of skillNames) {
    const skillFile = path.join(sourceRoot, 'skills', name, 'SKILL.md');
    if (fs.existsSync(skillFile)) {
      out.push({ kind: 'skill', baseName: `skill_${name}`, fullPath: skillFile, displayName: name });
    }
  }
  return out;
}

function resolveAgentSources(sourceRoot, patterns) {
  const out = [];
  const agentsDir = path.join(sourceRoot, 'agents');
  for (const entry of readDirSafe(agentsDir)) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    if (!patterns.some((pat) => (pat instanceof RegExp ? pat.test(entry.name) : pat === entry.name))) continue;
    const base = entry.name.replace(/\.md$/, '');
    out.push({
      kind: 'agent',
      baseName: `agent_${base}`,
      fullPath: path.join(agentsDir, entry.name),
      displayName: base,
    });
  }
  return out;
}

function resolveCommandSources(sourceRoot, commandNames) {
  const out = [];
  for (const name of commandNames) {
    const cmdFile = path.join(sourceRoot, 'commands', name);
    if (fs.existsSync(cmdFile)) {
      const base = name.replace(/\.md$/, '');
      out.push({ kind: 'command', baseName: `cmd_${base}`, fullPath: cmdFile, displayName: base });
    }
  }
  return out;
}

// ── Sheet content ──────────────────────────────────────────────────────────

function copilotDirective(kind, name, language) {
  return [
    `__COPILOT__: Read COLUMN A only for context.`,
    `Column B contains rich HTML for the human Task Pane viewer; ignore Column B unless explicitly asked.`,
    `This sheet is ECC ${kind} "${name}" (workbook: ${language}).`,
    `Sheet NN_ prefix indicates read priority. See sheet 00_INDEX (Column A) for canonical read order.`,
  ].join(' ');
}

// Build a sheet's row payload. Returns array of [a, b] tuples.
function buildSheetRows(source, language) {
  const md = readFileSafe(source.fullPath);
  if (!md) return null;

  let html;
  let plainRows;
  if (source.kind === 'skill') {
    ({ html } = skillToHtml(md));
    plainRows = skillToRows(md);
  } else if (source.kind === 'rule') {
    ({ html } = ruleToHtml(md, path.basename(source.fullPath)));
    plainRows = ruleToRows(md, path.basename(source.fullPath));
  } else if (source.kind === 'agent') {
    ({ html } = agentToHtml(md, path.basename(source.fullPath)));
    plainRows = agentToRows(md, path.basename(source.fullPath));
  } else if (source.kind === 'command') {
    ({ html } = commandToHtml(md, path.basename(source.fullPath)));
    plainRows = [['Command', source.displayName], ['Content', md.slice(0, 2000)]];
  } else {
    return null;
  }

  const directive = copilotDirective(source.kind, source.displayName, language);
  const rows = [];
  rows.push([directive, html]);                                  // A1 + B1 (HTML payload lives here)
  rows.push(['', '']);
  for (const r of plainRows) rows.push([r[0] || '', r[1] || '']);
  return rows;
}

function prefixSheetName(index, kind, base) {
  const priority = String(index + 1).padStart(2, '0');
  // 31-char Excel limit. Reserve 3 for "NN_".
  const trimmedBase = base.replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 28);
  return `${priority}_${trimmedBase}`.slice(0, 31);
}

function buildIndexSheet(workbookSheets, language, summary) {
  // Column A: plain text instruction + sheet list (Copilot reads this only)
  // Column B: HTML navigation table (Task Pane renders this)
  const aLines = [];
  aLines.push(`INSTRUCTION FOR COPILOT (Opus 4.7): Read this sheet FIRST.`);
  aLines.push(`This workbook is "${language}". ${summary}`);
  aLines.push(`Sheets follow the pattern NN_<name>. Read them in numeric order.`);
  aLines.push(`Each sheet's A1 cell holds the COPILOT DIRECTIVE for that sheet.`);
  aLines.push(``);
  aLines.push(`Sheet read order:`);
  for (const s of workbookSheets) aLines.push(`  ${s.name} — ${s.displayName} (${s.kind})`);

  const htmlRows = workbookSheets.map((s) =>
    `<tr><td>${escapeHtml(s.name)}</td><td>${escapeHtml(s.kind)}</td><td>${escapeHtml(s.displayName)}</td></tr>`
  ).join('');
  const tableHtml = `<h1>${escapeHtml(language)} — ECC Workbook</h1><p>${escapeHtml(summary)}</p>` +
    `<table><thead><tr><th>Sheet</th><th>Kind</th><th>Name</th></tr></thead><tbody>${htmlRows}</tbody></table>`;
  const indexHtml = wrapAsSelfContainedDoc(tableHtml, { title: `${language} — ECC Index` });

  return [
    [aLines.join('\n'), indexHtml],
  ];
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[ch]);
}

// ── Per-language workbook ──────────────────────────────────────────────────

function buildLanguageWorkbook(language, sourceRoot) {
  const cfg = getLanguageConfig(language);
  if (!cfg) throw new Error(`Unknown language: ${language}`);

  const sources = [
    ...resolveRuleSources(sourceRoot, cfg.rules || []),
    ...resolveSkillSources(sourceRoot, cfg.skills || []),
    ...resolveAgentSources(sourceRoot, cfg.agents || []),
    ...resolveCommandSources(sourceRoot, cfg.commands || []),
  ];

  const workbookSheets = [];
  let counter = 0;
  for (const source of sources) {
    const rows = buildSheetRows(source, language);
    if (!rows) continue;
    const name = prefixSheetName(counter, source.kind, source.baseName);
    workbookSheets.push({ name, kind: source.kind, displayName: source.displayName, rows });
    counter++;
  }

  // Final two sheets: workspace (empty) + commits log (seeded)
  workbookSheets.push({
    name: '99_workspace',
    kind: 'workspace',
    displayName: 'workspace',
    rows: [
      ['__COPILOT__: Write code here. This is the user workspace sheet. Use other sheets (rules/skills/agents/commands) as context only.', ''],
      ['', ''],
    ],
  });
  workbookSheets.push({
    name: '00_COMMITS',
    kind: 'commits',
    displayName: 'commits log',
    rows: [
      ['timestamp', 'base_sheet', 'snapshot_sheet', 'author', 'message', 'parent_snapshot'],
    ],
  });

  return { workbookSheets, cfg };
}

function writeLanguageXlsx(language, workbookSheets, cfg, outputDir) {
  const wb = createWorkbook();

  const indexRows = buildIndexSheet(workbookSheets, language, cfg.summary);
  const indexSheet = addSheet(wb, '00_INDEX', indexRows);
  setColumnWidths(indexSheet, [50, 120]);

  for (const s of workbookSheets) {
    const sheet = addSheet(wb, s.name, s.rows);
    setColumnWidths(sheet, [40, 100]);
  }

  fs.mkdirSync(outputDir, { recursive: true });
  const outPath = path.join(outputDir, `${language}.xlsx`);
  writeWorkbook(wb, outPath);
  return outPath;
}

function writeLanguageCsv(language, workbookSheets, cfg, outputDir) {
  const dir = path.join(outputDir, language);
  fs.mkdirSync(dir, { recursive: true });

  const indexRows = buildIndexSheet(workbookSheets, language, cfg.summary);
  fs.writeFileSync(path.join(dir, '00_INDEX.csv'), rowsToCsv(indexRows), 'utf8');

  for (const s of workbookSheets) {
    const safeName = s.name.replace(/[/\\?*[\]:]/g, '-');
    fs.writeFileSync(path.join(dir, `${safeName}.csv`), rowsToCsv(s.rows), 'utf8');
  }
  return dir;
}

function rowsToCsv(rows) {
  return rows.map((row) => row.map((cell) => {
    const s = String(cell == null ? '' : cell);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  }).join(',')).join('\n');
}

// ── Main ───────────────────────────────────────────────────────────────────

function main() {
  const args = parseArgs(process.argv);
  const sourceRoot = path.resolve(args.source);
  const outputDir = path.resolve(args.output);

  if (!fs.existsSync(sourceRoot)) {
    console.error(`Source directory not found: ${sourceRoot}`);
    process.exit(1);
  }

  if (!['xlsx', 'csv'].includes(args.format)) {
    console.error(`Invalid --format: ${args.format} (expected xlsx or csv)`);
    process.exit(1);
  }

  const languages = args.language === 'all'
    ? listLanguages()
    : args.language.split(',').map((s) => s.trim()).filter(Boolean);

  for (const lang of languages) {
    if (!hasLanguage(lang)) {
      console.error(`Unknown language: ${lang} (available: ${listLanguages().join(', ')})`);
      process.exit(1);
    }
  }

  console.log(`Source:  ${sourceRoot}`);
  console.log(`Output:  ${outputDir}`);
  console.log(`Format:  ${args.format}`);
  console.log(`Targets: ${languages.join(', ')}`);
  console.log('');

  for (const lang of languages) {
    const { workbookSheets, cfg } = buildLanguageWorkbook(lang, sourceRoot);
    const sheetCount = workbookSheets.length + 1; // +1 for 00_INDEX
    if (args.format === 'xlsx') {
      const out = writeLanguageXlsx(lang, workbookSheets, cfg, outputDir);
      console.log(`  ✓ ${path.relative(REPO_ROOT, out)} (${sheetCount} sheets)`);
    } else {
      const out = writeLanguageCsv(lang, workbookSheets, cfg, outputDir);
      console.log(`  ✓ ${path.relative(REPO_ROOT, out)}/ (${sheetCount} CSV files)`);
    }
  }

  console.log('');
  console.log('Done.');
}

if (require.main === module) main();

module.exports = {
  buildLanguageWorkbook,
  buildIndexSheet,
  buildSheetRows,
  copilotDirective,
  parseArgs,
  prefixSheetName,
  resolveRuleSources,
  resolveSkillSources,
  resolveAgentSources,
  resolveCommandSources,
  rowsToCsv,
  writeLanguageCsv,
  writeLanguageXlsx,
};

// Available languages (re-exported for tests)
module.exports.LANGUAGE_CONFIGS = LANGUAGE_CONFIGS;
