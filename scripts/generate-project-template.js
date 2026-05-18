#!/usr/bin/env node
'use strict';

/**
 * generate-project-template.js
 *
 * Generates a project CSV template for the Excel IDE workflow.
 * Each CSV becomes an Excel sheet (= a "code file").
 * Copilot writes code into sheets; the ECC task pane renders it as an artifact.
 *
 * Usage:
 *   node scripts/generate-project-template.js --type react --output ./my-project
 *   node scripts/generate-project-template.js --type python --output ./my-project
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES = {
  react: {
    'App.jsx': [
      ['// App.jsx — React component (Copilot writes here)'],
      ['// Each row is one line of code'],
      [''],
      ['function App() {'],
      ['  return ('],
      ['    <div style={{ padding: 24, fontFamily: "sans-serif" }}>'],
      ['      <h1>Hello from ECC + Copilot</h1>'],
      ['      <p>Edit this sheet with Copilot, then click Render in the task pane.</p>'],
      ['    </div>'],
      ['  );'],
      ['}'],
    ],
    'index.html': [
      ['<!DOCTYPE html>'],
      ['<html lang="ja">'],
      ['<head>'],
      ['  <meta charset="UTF-8" />'],
      ['  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>'],
      ['  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>'],
      ['  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>'],
      ['</head>'],
      ['<body>'],
      ['  <div id="root"></div>'],
      ['  <script type="text/babel" src="App.jsx"></script>'],
      ['</body>'],
      ['</html>'],
    ],
    'README': [
      ['Project', 'React CDN App via ECC + M365 Copilot'],
      ['Model', 'claude-opus-4-7'],
      ['Harness', 'Microsoft 365 Enterprise Copilot for Excel'],
      [''],
      ['Workflow', ''],
      ['1', 'Open ecc-skills.xlsx → find skill:frontend-patterns'],
      ['2', 'Tell Copilot: "skill:frontend-patternsを参照してApp.jsxを更新して"'],
      ['3', 'Copilot edits the App.jsx sheet'],
      ['4', 'Task pane → Render → see live preview'],
    ],
  },
  python: {
    'main.py': [
      ['# main.py — Python script (Copilot writes here)'],
      ['# Each row = one line of code'],
      [''],
      ['def greet(name: str) -> str:'],
      ['    return f"Hello, {name}!"'],
      [''],
      ['if __name__ == "__main__":'],
      ['    print(greet("ECC + Copilot"))'],
    ],
    'requirements.txt': [
      ['# Python dependencies'],
      ['# Add packages here, one per row'],
      ['pandas'],
      ['numpy'],
    ],
    'README': [
      ['Project', 'Python Script via ECC + M365 Copilot'],
      ['Model', 'claude-opus-4-7'],
      ['Harness', 'Microsoft 365 Enterprise Copilot for Excel'],
      [''],
      ['Workflow', ''],
      ['1', 'Open ecc-skills.xlsx → find skill:python-patterns'],
      ['2', 'Tell Copilot: "skill:python-patternsを参照してmain.pyを更新して"'],
      ['3', 'Copilot edits the main.py sheet'],
      ['4', 'Task pane → Render → see code view'],
    ],
  },
};

function parseArgs(argv) {
  const args = { type: 'react', output: './my-project' };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--type' && argv[i + 1]) args.type = argv[++i];
    if (argv[i] === '--output' && argv[i + 1]) args.output = argv[++i];
    if (argv[i] === '--help') {
      console.log('Usage: node scripts/generate-project-template.js --type <react|python> --output <dir>');
      process.exit(0);
    }
  }
  return args;
}

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

function main() {
  const args = parseArgs(process.argv);
  const template = TEMPLATES[args.type];

  if (!template) {
    console.error(`Unknown type: ${args.type}. Use: react, python`);
    process.exit(1);
  }

  const outputDir = path.resolve(args.output);
  fs.mkdirSync(outputDir, { recursive: true });

  for (const [filename, rows] of Object.entries(template)) {
    const csvPath = path.join(outputDir, `${filename}.csv`);
    fs.writeFileSync(csvPath, rowsToCsv(rows), 'utf8');
    console.log(`  Created: ${filename}.csv (${rows.length} rows)`);
  }

  console.log('');
  console.log(`Template created at: ${outputDir}`);
  console.log('Import CSVs into Excel as individual sheets.');
  console.log('Each sheet = a code file. Copilot writes; task pane renders.');
}

main();
