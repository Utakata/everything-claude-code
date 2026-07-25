#!/usr/bin/env node
/**
 * translate-diff.js
 *
 * Detects markdown files in the English source that lack a ja-JP translation
 * and translates them via Gemini API (gemini-2.0-flash, free tier).
 *
 * Usage:
 *   node scripts/translate-diff.js [--dry-run] [--max <n>] [--output-list <file>]
 *
 * Environment variables:
 *   GEMINI_API_KEY  – Google AI Studio key (required for translation)
 *   REPO_ROOT       – repo root path (defaults to ../ from this script)
 */

'use strict';

const fs    = require('fs');
const path  = require('path');
const https = require('https');
const { TRANSLATION_SYSTEM_PROMPT } = require('./lib/translation-rules');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const REPO_ROOT  = process.env.REPO_ROOT || path.join(__dirname, '..');
const LOCALE_DIR = path.join(REPO_ROOT, 'docs', 'ja-JP');
const GEMINI_HOST  = 'generativelanguage.googleapis.com';
const GEMINI_MODEL = 'gemini-2.0-flash';

// Source directories → docs/ja-JP/ mappings.
//   recursive: false  → only top-level *.md (used for repo root to avoid
//                       descending into node_modules/, docs/, etc.)
//   exclude           → regex on the source-relative path; matches are skipped
//   include           → regex on the source-relative path; only matches are kept
const SOURCE_MAPPINGS = [
  { src: 'agents',   dst: path.join(LOCALE_DIR, 'agents') },
  { src: 'commands', dst: path.join(LOCALE_DIR, 'commands') },
  { src: 'rules',    dst: path.join(LOCALE_DIR, 'rules'),    exclude: /^zh\// },
  { src: 'skills',   dst: path.join(LOCALE_DIR, 'skills') },
  { src: 'examples', dst: path.join(LOCALE_DIR, 'examples') },
  {
    // docs/ English source. docs/ja-JP/ maps 1:1 under LOCALE_DIR.
    // Exclude other-language locale mirrors and dated/ephemeral artifacts
    // (release marketing copy, PR/plan logs, hook-fix logs, dated dashboards).
    // releases/ is excluded EXCEPT the 2.0.0-rc.1 set, which is translated in full.
    src: 'docs', dst: LOCALE_DIR,
    exclude: /^(zh-CN|zh-TW|ko-KR|tr|pt-BR|vi-VN|th|ru|ja-JP)\/|^releases\/(?!2\.0\.0-rc\.1\/)|^fixes\/|^business\/|^PR-|^MEGA-PLAN|^PHASE1-|stale-pr-salvage|legacy-artifact-inventory|-\d{8}(-[a-z0-9-]+)?\.md$/,
  },
  {
    src: '.', dst: LOCALE_DIR, recursive: false,
    include: /^(README|CONTRIBUTING|GLOSSARY|AGENTS|RULES|CLAUDE|SOUL|CODE_OF_CONDUCT|SPONSORING|SPONSORS|TROUBLESHOOTING|SECURITY|CHANGELOG|COMMANDS-QUICK-REF|EVALUATION|the-longform-guide|the-shortform-guide|the-security-guide|the-openclaw-guide)\.md$/,
  },
];

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args      = process.argv.slice(2);
const DRY_RUN   = args.includes('--dry-run');
const maxArg    = args.indexOf('--max');
const MAX_FILES = maxArg !== -1 ? parseInt(args[maxArg + 1], 10) : 20;
const outArg    = args.indexOf('--output-list');
const OUT_LIST  = outArg !== -1 ? args[outArg + 1] : null;

// Translation prompt is loaded from scripts/lib/translation-rules.js

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

// Returns markdown paths relative to `base` (the top of the walk), so nested
// files keep their subdirectory prefix (e.g. "python/testing.md"). `base` is
// threaded through recursion — passing `dir` as the relative anchor would
// flatten nested paths to their basename.
function walkDir(dir, base = dir, recursive = true) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (recursive) results.push(...walkDir(full, base, true));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(path.relative(base, full).replace(/\\/g, '/'));
    }
  }
  return results;
}

function collectMissingFiles() {
  const missing = [];
  for (const mapping of SOURCE_MAPPINGS) {
    const srcDir = path.join(REPO_ROOT, mapping.src);
    for (const rel of walkDir(srcDir, srcDir, mapping.recursive !== false)) {
      if (mapping.exclude && mapping.exclude.test(rel)) continue;
      if (mapping.include && !mapping.include.test(rel)) continue;
      const dstFile = path.join(mapping.dst, rel);
      if (!fs.existsSync(dstFile)) {
        missing.push({ srcFile: path.join(srcDir, rel), dstFile });
      }
    }
  }
  return missing;
}

// ---------------------------------------------------------------------------
// Gemini API
// ---------------------------------------------------------------------------

function geminiTranslate(content) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) { reject(new Error('GEMINI_API_KEY is not set')); return; }

    const bodyBuf = Buffer.from(JSON.stringify({
      system_instruction: { parts: [{ text: TRANSLATION_SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: `Translate the following markdown file from English to Japanese:\n\n${content}` }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 8192 },
    }));

    const req = https.request({
      hostname: GEMINI_HOST,
      path: `/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': bodyBuf.length },
    }, (res) => {
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', async () => {
        if (res.statusCode === 429) {
          // Rate limited — wait 60s and retry
          process.stdout.write('(rate limited, waiting 60s) ');
          await new Promise(r => setTimeout(r, 60_000));
          geminiTranslate(content).then(resolve).catch(reject);
          return;
        }
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(new Error(`Gemini ${res.statusCode}: ${parsed?.error?.message || data.slice(0, 120)}`));
            return;
          }
          const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (!text) { reject(new Error('Gemini returned empty response')); return; }
          resolve(text);
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });
    req.on('error', reject);
    req.write(bodyBuf);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('Scanning for missing ja-JP translations...');
  const missing = collectMissingFiles();

  if (missing.length === 0) {
    console.log('All files are translated. Nothing to do.');
    if (OUT_LIST) fs.writeFileSync(OUT_LIST, '');
    return;
  }

  console.log(`Found ${missing.length} untranslated file(s).`);
  const toProcess = missing.slice(0, MAX_FILES);
  console.log(`Processing ${toProcess.length} file(s) (max: ${MAX_FILES}).\n`);

  if (OUT_LIST) {
    fs.writeFileSync(OUT_LIST, toProcess.map(f => f.dstFile).join('\n'));
  }

  if (DRY_RUN) {
    for (const { srcFile, dstFile } of toProcess) {
      const s = path.relative(REPO_ROOT, srcFile).replace(/\\/g, '/');
      const d = path.relative(REPO_ROOT, dstFile).replace(/\\/g, '/');
      console.log(`  ${s} → ${d}`);
    }
    return;
  }

  let ok = 0, ng = 0;
  for (let i = 0; i < toProcess.length; i++) {
    const { srcFile, dstFile } = toProcess[i];
    const s = path.relative(REPO_ROOT, srcFile).replace(/\\/g, '/');
    const d = path.relative(REPO_ROOT, dstFile).replace(/\\/g, '/');
    process.stdout.write(`  [${i + 1}/${toProcess.length}] ${s} → ${d} ... `);
    try {
      const translated = await geminiTranslate(fs.readFileSync(srcFile, 'utf8'));
      fs.mkdirSync(path.dirname(dstFile), { recursive: true });
      fs.writeFileSync(dstFile, translated, 'utf8');
      console.log('ok');
      ok++;
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      ng++;
    }
    // 500ms pause to respect free-tier rate limits
    if (i < toProcess.length - 1) await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\nDone: ${ok} ok, ${ng} failed, ${missing.length - toProcess.length} deferred.`);
  if (missing.length > MAX_FILES) {
    console.log(`${missing.length - MAX_FILES} file(s) remain — next run will pick them up.`);
  }
  if (ng > 0) process.exit(1);
}

if (require.main === module) {
  main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
}

module.exports = { walkDir, collectMissingFiles, SOURCE_MAPPINGS };
