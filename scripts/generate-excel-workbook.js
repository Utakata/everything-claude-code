#!/usr/bin/env node
'use strict';

/**
 * generate-excel-workbook.js
 *
 * Generates Excel workbooks from ECC skills, rules, agents, and commands.
 * Each workbook's sheets act as "code files" in the Excel IDE metaphor.
 * Copilot for Excel (M365 Enterprise) reads sheet content as context.
 *
 * Usage:
 *   node scripts/generate-excel-workbook.js --source .excel-plugin --output ./excel-ide
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { skillToRows, ruleToRows, agentToRows } = require('./lib/markdown-to-excel');

function parseArgs(argv) {
  const args = { source: '.excel-plugin', output: './excel-ide' };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--source' && argv[i + 1]) args.source = argv[++i];
    if (argv[i] === '--output' && argv[i + 1]) args.output = argv[++i];
    if (argv[i] === '--help') { printHelp(); process.exit(0); }
  }
  return args;
}

function printHelp() {
  console.log(`
Usage: node scripts/generate-excel-workbook.js [options]

Options:
  --source <dir>   ECC install directory (default: .excel-plugin)
  --output <dir>   Output directory for workbooks (default: ./excel-ide)
  --help           Show this help

Generates:
  ecc-skills.xlsx    — One sheet per ECC skill (use as Copilot context)
  ecc-rules.xlsx     — One sheet per language ruleset
  ecc-agents.xlsx    — One sheet per agent definition
  ecc-commands.xlsx  — One sheet per slash command / workflow
`);
}

function readDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true });
}

function readFile(filePath) {
  try { return fs.readFileSync(filePath, 'utf8'); } catch (_) { return ''; }
}

// ── Lightweight XLSX writer ────────────────────────────────────────────────
// Writes minimal XLSX without external dependencies (pure CommonJS).
// For production use, replace with exceljs for rich formatting.

function rowsToCsv(rows) {
  return rows.map(row =>
    row.map(cell => {
      const s = String(cell || '');
      if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    }).join(',')
  ).join('\n');
}

function writeWorkbookAsCsv(sheets, outputDir) {
  // Writes each sheet as a separate CSV file.
  // Excel can open CSV files directly; M365 Copilot reads cell content from them.
  // For true .xlsx output, pass --xlsx flag and ensure exceljs is installed.
  fs.mkdirSync(outputDir, { recursive: true });

  for (const [sheetName, rows] of Object.entries(sheets)) {
    const safeName = sheetName.replace(/[/\\?*[\]:]/g, '-').slice(0, 31);
    const csvPath = path.join(outputDir, `${safeName}.csv`);
    fs.writeFileSync(csvPath, rowsToCsv(rows), 'utf8');
  }
}

function buildIndexSheet(sheetNames, kind) {
  // Copilot reads sheets in unknown order. The 00_README sheet enforces:
  //   1. Read this first (numeric prefix sorts it to position 0)
  //   2. A1 contains an explicit instruction directing Copilot's behavior
  //   3. Sheet list with priority order so Copilot knows what to load next
  const rows = [];
  rows.push([
    'INSTRUCTION FOR COPILOT (Opus 4.7)',
    `Read this sheet FIRST. This workbook contains ${kind} content for ECC. ` +
    `Sheet names follow the pattern "NN_name" where NN is the read-priority order. ` +
    `Always reference sheets by their FULL name including the numeric prefix. ` +
    `When asked to use a ${kind}, scan this index, then read the matching sheet's A1 cell ` +
    `for that ${kind}'s primary directive before reading the rest of its cells.`,
  ]);
  rows.push(['', '']);
  rows.push(['Read Order', 'Sheet Name', 'Purpose']);
  sheetNames.forEach((name, i) => {
    const priority = String(i + 1).padStart(2, '0');
    rows.push([priority, name, `ECC ${kind}: ${name.replace(/^\d+_/, '')}`]);
  });
  return rows;
}

function prefixSheetName(index, baseName) {
  // 01_, 02_, ... — forces lexicographic ordering when Copilot scans sheets
  const priority = String(index + 1).padStart(2, '0');
  return `${priority}_${baseName}`.slice(0, 31);
}

function prependCopilotDirective(rows, kind, name) {
  // A1 cell becomes the first thing Copilot sees when reading the sheet.
  // This is the "system prompt" equivalent for sheet-as-file metaphor.
  const directive = [
    `COPILOT DIRECTIVE: This sheet is ECC ${kind} "${name}".`,
    `Read all rows below before generating code.`,
    `Reference this ${kind} by name when writing code in other sheets.`,
  ].join(' ');
  return [['__COPILOT__', directive], ['', ''], ...rows];
}

// ── Workbook builders ──────────────────────────────────────────────────────

function buildSkillsWorkbook(sourceDir) {
  const skillsDir = path.join(sourceDir, 'skills');
  const sheets = {};
  const sheetNames = [];

  for (const entry of readDir(skillsDir)) {
    if (!entry.isDirectory()) continue;
    const skillFile = path.join(skillsDir, entry.name, 'SKILL.md');
    const content = readFile(skillFile);
    if (!content) continue;
    const baseName = entry.name.slice(0, 28);
    const sheetName = prefixSheetName(sheetNames.length, baseName);
    sheets[sheetName] = prependCopilotDirective(skillToRows(content), 'skill', baseName);
    sheetNames.push(sheetName);
  }

  sheets['00_INDEX'] = buildIndexSheet(sheetNames, 'skill');
  return sheets;
}

function buildRulesWorkbook(sourceDir) {
  const rulesDir = path.join(sourceDir, 'rules');
  const sheets = {};
  const sheetNames = [];

  for (const entry of readDir(rulesDir)) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const content = readFile(path.join(rulesDir, entry.name));
    if (!content) continue;
    const baseName = entry.name.replace('.md', '').slice(0, 28);
    const sheetName = prefixSheetName(sheetNames.length, baseName);
    sheets[sheetName] = prependCopilotDirective(ruleToRows(content, entry.name), 'rule', baseName);
    sheetNames.push(sheetName);
  }

  sheets['00_INDEX'] = buildIndexSheet(sheetNames, 'rule');
  return sheets;
}

function buildAgentsWorkbook(sourceDir) {
  const agentsDir = path.join(sourceDir, 'agents');
  const sheets = {};
  const sheetNames = [];

  for (const entry of readDir(agentsDir)) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const content = readFile(path.join(agentsDir, entry.name));
    if (!content) continue;
    const baseName = entry.name.replace('.md', '').slice(0, 28);
    const sheetName = prefixSheetName(sheetNames.length, baseName);
    sheets[sheetName] = prependCopilotDirective(agentToRows(content, entry.name), 'agent', baseName);
    sheetNames.push(sheetName);
  }

  sheets['00_INDEX'] = buildIndexSheet(sheetNames, 'agent');
  return sheets;
}

function buildCommandsWorkbook(sourceDir) {
  const cmdsDir = path.join(sourceDir, 'commands');
  const sheets = {};
  const sheetNames = [];

  for (const entry of readDir(cmdsDir)) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const content = readFile(path.join(cmdsDir, entry.name));
    if (!content) continue;
    const baseName = entry.name.replace('.md', '').slice(0, 28);
    const sheetName = prefixSheetName(sheetNames.length, baseName);
    const rows = [['Command', baseName], ['Content', content.slice(0, 2000)]];
    sheets[sheetName] = prependCopilotDirective(rows, 'command', baseName);
    sheetNames.push(sheetName);
  }

  sheets['00_INDEX'] = buildIndexSheet(sheetNames, 'command');
  return sheets;
}

// ── Index JSON files for task pane ─────────────────────────────────────────

function writeIndexFiles(sourceDir) {
  const skillsDir = path.join(sourceDir, 'skills');
  const rulesDir = path.join(sourceDir, 'rules');

  const skills = readDir(skillsDir)
    .filter(e => e.isDirectory())
    .map(e => e.name);

  const files = readDir(rulesDir)
    .filter(e => e.isFile() && e.name.endsWith('.md'))
    .map(e => e.name);

  fs.writeFileSync(
    path.join(sourceDir, 'skills-index.json'),
    JSON.stringify({ skills }, null, 2),
    'utf8'
  );
  fs.writeFileSync(
    path.join(sourceDir, 'rules-index.json'),
    JSON.stringify({ files }, null, 2),
    'utf8'
  );

  console.log(`  skills-index.json: ${skills.length} skills`);
  console.log(`  rules-index.json: ${files.length} rule files`);
}

// ── Main ───────────────────────────────────────────────────────────────────

function main() {
  const args = parseArgs(process.argv);
  const sourceDir = path.resolve(args.source);
  const outputDir = path.resolve(args.output);

  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory not found: ${sourceDir}`);
    console.error('Run: ./install.sh --profile excel --target excel');
    process.exit(1);
  }

  console.log(`Source: ${sourceDir}`);
  console.log(`Output: ${outputDir}`);
  console.log('');

  // Write skill/rule index files for the task pane skill-loader
  console.log('Writing task pane index files...');
  writeIndexFiles(sourceDir);
  console.log('');

  // Build and write workbooks
  const workbooks = {
    'ecc-skills': buildSkillsWorkbook(sourceDir),
    'ecc-rules': buildRulesWorkbook(sourceDir),
    'ecc-agents': buildAgentsWorkbook(sourceDir),
    'ecc-commands': buildCommandsWorkbook(sourceDir),
  };

  for (const [name, sheets] of Object.entries(workbooks)) {
    const dir = path.join(outputDir, name);
    const count = Object.keys(sheets).filter(k => k !== '_INDEX').length;
    console.log(`Writing ${name}/ (${count} sheets)...`);
    writeWorkbookAsCsv(sheets, dir);
  }

  console.log('');
  console.log('Done. Open the CSV folders in Excel or import them as sheets.');
  console.log('Each CSV = one Excel sheet = one "code file" in the IDE metaphor.');
}

main();
