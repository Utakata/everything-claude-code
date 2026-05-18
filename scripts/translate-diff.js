#!/usr/bin/env node
/**
 * translate-diff.js
 *
 * Detects markdown files in the English source that lack a ja-JP translation,
 * then translates them using one of two backends:
 *
 *   1. Jules API  (primary)   — creates a Jules session that reads, translates,
 *                               and commits the files directly to the branch.
 *                               Falls back when Jules returns 429 / queue full.
 *   2. Gemini API (fallback)  — generates translated text inline (free tier:
 *                               gemini-2.0-flash, 15 RPM, 1 M tokens/day).
 *
 * Usage:
 *   node scripts/translate-diff.js [--dry-run] [--max <n>] [--output-list <file>]
 *                                  [--force-gemini]
 *
 * Environment variables:
 *   JULES_API_KEY    – Jules API key (from jules.google.com Settings)
 *   GEMINI_API_KEY   – Google AI Studio key (fallback)
 *   JULES_SOURCE_ID  – Jules source ID for this repository (see jules.google.com/sources)
 *   REPO_ROOT        – repo root path (defaults to cwd/../)
 *   GITHUB_REF_NAME  – branch name (set automatically by GitHub Actions)
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const https = require('https');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const REPO_ROOT  = process.env.REPO_ROOT || path.join(__dirname, '..');
const LOCALE     = 'ja-JP';
const LOCALE_DIR = path.join(REPO_ROOT, 'docs', LOCALE);
const BRANCH     = process.env.GITHUB_REF_NAME || 'main';

// Jules REST base
const JULES_BASE_HOST = 'jules.googleapis.com';
const JULES_BASE_PATH = '/v1alpha';

// Gemini REST base
const GEMINI_HOST  = 'generativelanguage.googleapis.com';
const GEMINI_MODEL = 'gemini-2.0-flash';

// Source directories → docs/ja-JP/ mappings
const SOURCE_MAPPINGS = [
  { src: 'agents',   dst: path.join(LOCALE_DIR, 'agents'),  glob: '*.md' },
  { src: 'commands', dst: path.join(LOCALE_DIR, 'commands'), glob: '*.md' },
  { src: 'rules',    dst: path.join(LOCALE_DIR, 'rules'),    glob: '**/*.md', exclude: /^zh\// },
  { src: 'skills',   dst: path.join(LOCALE_DIR, 'skills'),   glob: '**/SKILL.md' },
  {
    src: '.', dst: LOCALE_DIR, glob: '*.md',
    include: /^(AGENTS|RULES|CLAUDE|SOUL|CODE_OF_CONDUCT|SPONSORING|SPONSORS|TROUBLESHOOTING|SECURITY|CHANGELOG|COMMANDS-QUICK-REF|EVALUATION|the-longform-guide|the-shortform-guide|the-security-guide|the-openclaw-guide)\.md$/,
  },
];

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args         = process.argv.slice(2);
const DRY_RUN      = args.includes('--dry-run');
const FORCE_GEMINI = args.includes('--force-gemini');
const maxArg       = args.indexOf('--max');
const MAX_FILES    = maxArg !== -1 ? parseInt(args[maxArg + 1], 10) : 20;
const outArg       = args.indexOf('--output-list');
const OUTPUT_LIST  = outArg !== -1 ? args[outArg + 1] : null;

// ---------------------------------------------------------------------------
// Translation prompt (shared by both backends)
// ---------------------------------------------------------------------------

const GLOSSARY = `
| English | Japanese |
|---------|----------|
| Agent | エージェント |
| Skill | スキル |
| Hook | フック |
| Command | コマンド |
| Rule | ルール |
| Harness | ハーネス |
| Worktree | ワークツリー |
| Plugin | プラグイン |
| Pipeline | パイプライン |
| Context window | コンテキストウィンドウ |
| Token | トークン |
| Build | ビルド |
| Deploy | デプロイ |
| Pull request | プルリクエスト |
| Commit | コミット |
| Anti-pattern | アンチパターン |
| Best practice | ベストプラクティス |
| Scaffold | スキャフォールド |
| Container | コンテナ |
| Cluster | クラスター |
| Endpoint | エンドポイント |
| Middleware | ミドルウェア |
`;

const TRANSLATION_SYSTEM = `You are a Japanese technical translator specializing in developer documentation.

Translation rules:
1. YAML frontmatter field names (name:, description:, origin:, tools:, model:) stay in English
2. Translate the VALUE of description: to Japanese
3. Do NOT translate code blocks — only translate comments (// or # lines) inside them
4. Preserve all Markdown structure exactly (heading levels, lists, tables, code fences)
5. Use katakana for technical terms per the glossary below
6. Do NOT add, remove, or reorder sections

Glossary:
${GLOSSARY}

Output ONLY the translated markdown content. No explanation, no preamble.`;

function buildUserPrompt(content) {
  return `Translate the following markdown file from English to Japanese:\n\n${content}`;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function httpsPost(hostname, path, headers, body) {
  return new Promise((resolve, reject) => {
    const bodyBuf = Buffer.from(JSON.stringify(body));
    const options = {
      hostname, path, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': bodyBuf.length, ...headers },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(bodyBuf);
    req.end();
  });
}

function httpsGet(hostname, path, headers) {
  return new Promise((resolve, reject) => {
    const options = { hostname, path, method: 'GET', headers };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

function walkDir(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(path.relative(dir, full).replace(/\\/g, '/'));
    }
  }
  return results;
}

function collectMissingFiles() {
  const missing = [];
  for (const mapping of SOURCE_MAPPINGS) {
    const srcDir = path.join(REPO_ROOT, mapping.src);
    for (const rel of walkDir(srcDir)) {
      if (mapping.exclude && mapping.exclude.test(rel)) continue;
      if (mapping.include && !mapping.include.test(rel)) continue;
      if (mapping.glob === '**/SKILL.md' && !rel.endsWith('SKILL.md')) continue;
      const dstFile = path.join(mapping.dst, rel);
      if (!fs.existsSync(dstFile)) {
        missing.push({ srcFile: path.join(srcDir, rel), dstFile, rel });
      }
    }
  }
  return missing;
}

// ---------------------------------------------------------------------------
// Backend: Jules API
// ---------------------------------------------------------------------------

class JulesBackend {
  constructor() {
    this.apiKey   = process.env.JULES_API_KEY || '';
    this.sourceId = process.env.JULES_SOURCE_ID || '';
  }

  get available() { return Boolean(this.apiKey && this.sourceId); }

  /** Returns true if Jules accepted the session, false if busy/unavailable. */
  async submitSession(files) {
    if (!this.available) return false;

    const filePaths = files.map(f => path.relative(REPO_ROOT, f.srcFile).replace(/\\/g, '/'));
    const dstPaths  = files.map(f => path.relative(REPO_ROOT, f.dstFile).replace(/\\/g, '/'));

    const prompt = [
      `You are a Japanese technical translator. Translate the following English markdown files to Japanese and save each translated file to the corresponding destination path.`,
      ``,
      `Translation rules:`,
      `- YAML frontmatter field names stay in English; translate description: values`,
      `- Do NOT translate code blocks — only translate comments (// or # lines) inside them`,
      `- Preserve all Markdown structure exactly`,
      `- Use katakana for technical terms (エージェント, スキル, フック, パイプライン, etc.)`,
      ``,
      `Files to translate (source → destination):`,
      ...filePaths.map((src, i) => `  ${src} → ${dstPaths[i]}`),
      ``,
      `After translating all files, commit the changes with message:`,
      `"feat(ja-JP): auto-translate ${files.length} file(s) [skip ci]"`,
    ].join('\n');

    const res = await httpsPost(
      JULES_BASE_HOST,
      `${JULES_BASE_PATH}/sessions`,
      { 'X-Goog-Api-Key': this.apiKey },
      {
        title: `ja-JP auto-translation (${new Date().toISOString().slice(0, 10)})`,
        prompt,
        sourceContext: { sourceId: this.sourceId, branch: BRANCH },
        automationMode: 'FULL',  // plan + execute without human approval
      }
    );

    if (res.status === 429) {
      console.log('⚠️  Jules: task queue full (429) — falling back to Gemini.');
      return false;
    }
    if (res.status === 503 || res.status === 409) {
      console.log(`⚠️  Jules: unavailable (${res.status}) — falling back to Gemini.`);
      return false;
    }
    if (res.status >= 400) {
      const err = JSON.parse(res.body);
      console.log(`⚠️  Jules: error ${res.status}: ${err?.error?.message || res.body.slice(0, 120)} — falling back to Gemini.`);
      return false;
    }

    const session = JSON.parse(res.body);
    console.log(`✅ Jules session created: ${session.name}`);
    console.log(`   Jules will translate ${files.length} file(s) and commit directly to branch "${BRANCH}".`);
    console.log(`   Monitor at: https://jules.google.com`);
    return true;
  }
}

// ---------------------------------------------------------------------------
// Backend: Gemini API (fallback)
// ---------------------------------------------------------------------------

class GeminiBackend {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
  }

  get available() { return Boolean(this.apiKey); }

  async translateFile(content) {
    if (!this.available) throw new Error('GEMINI_API_KEY is not set');

    const body = {
      system_instruction: { parts: [{ text: TRANSLATION_SYSTEM }] },
      contents: [{ role: 'user', parts: [{ text: buildUserPrompt(content) }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 8192 },
    };

    const res = await httpsPost(
      GEMINI_HOST,
      `/v1beta/models/${GEMINI_MODEL}:generateContent?key=${this.apiKey}`,
      {},
      body
    );

    if (res.status === 429) {
      // Rate limited — wait and retry once
      console.log('   Gemini rate limited, waiting 60s...');
      await sleep(60_000);
      return this.translateFile(content);
    }
    if (res.status >= 400) {
      const err = JSON.parse(res.body);
      throw new Error(`Gemini error ${res.status}: ${err?.error?.message || res.body.slice(0, 120)}`);
    }

    const parsed = JSON.parse(res.body);
    const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Gemini returned empty response');
    return text;
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('🔍 Scanning for missing ja-JP translations...');
  const missing = collectMissingFiles();

  if (missing.length === 0) {
    console.log('✅ All files are translated. Nothing to do.');
    if (OUTPUT_LIST) fs.writeFileSync(OUTPUT_LIST, '');
    return;
  }

  console.log(`📋 Found ${missing.length} untranslated file(s).`);
  const toProcess = missing.slice(0, MAX_FILES);
  console.log(`⚙️  Processing ${toProcess.length} file(s) (max: ${MAX_FILES}).`);

  if (OUTPUT_LIST) {
    fs.writeFileSync(OUTPUT_LIST, toProcess.map(f => f.dstFile).join('\n'));
  }

  if (DRY_RUN) {
    console.log('\nDry-run mode — files that would be translated:');
    for (const f of toProcess) {
      console.log(`  ${path.relative(REPO_ROOT, f.srcFile).replace(/\\/g, '/')} → ${path.relative(REPO_ROOT, f.dstFile).replace(/\\/g, '/')}`);
    }
    return;
  }

  const jules  = new JulesBackend();
  const gemini = new GeminiBackend();

  // ── Try Jules first ────────────────────────────────────────────────────────
  if (!FORCE_GEMINI && jules.available) {
    console.log('\n🤖 Trying Jules API (primary)...');
    const accepted = await jules.submitSession(toProcess);
    if (accepted) {
      // Jules handles everything — we're done here.
      if (missing.length > MAX_FILES) {
        console.log(`ℹ️  ${missing.length - MAX_FILES} file(s) remain — next run will pick them up.`);
      }
      return;
    }
  } else if (!jules.available && !FORCE_GEMINI) {
    console.log('ℹ️  Jules API not configured (JULES_API_KEY / JULES_SOURCE_ID missing) — using Gemini.');
  }

  // ── Gemini fallback ────────────────────────────────────────────────────────
  if (!gemini.available) {
    console.error('❌ Neither Jules nor Gemini is available. Set JULES_API_KEY or GEMINI_API_KEY.');
    process.exit(1);
  }

  console.log('\n💫 Using Gemini API (fallback)...');
  let succeeded = 0;
  let failed    = 0;

  for (let i = 0; i < toProcess.length; i++) {
    const { srcFile, dstFile } = toProcess[i];
    const relSrc = path.relative(REPO_ROOT, srcFile).replace(/\\/g, '/');
    const relDst = path.relative(REPO_ROOT, dstFile).replace(/\\/g, '/');
    process.stdout.write(`  [${i + 1}/${toProcess.length}] ${relSrc} → ${relDst} ... `);

    try {
      const content    = fs.readFileSync(srcFile, 'utf8');
      const translated = await gemini.translateFile(content);
      fs.mkdirSync(path.dirname(dstFile), { recursive: true });
      fs.writeFileSync(dstFile, translated, 'utf8');
      console.log('✅');
      succeeded++;
    } catch (err) {
      console.log(`❌ ${err.message}`);
      failed++;
    }

    // 500ms pause between requests to respect Gemini free-tier rate limits
    if (i < toProcess.length - 1) await sleep(500);
  }

  console.log(`\n📊 Gemini: ${succeeded} succeeded, ${failed} failed, ${missing.length - toProcess.length} deferred.`);

  if (missing.length > MAX_FILES) {
    console.log(`ℹ️  ${missing.length - MAX_FILES} file(s) remain — next run will pick them up.`);
  }

  if (failed > 0) process.exit(1);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
