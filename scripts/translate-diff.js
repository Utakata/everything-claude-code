#!/usr/bin/env node
/**
 * translate-diff.js
 *
 * Detects markdown files in the English source that lack a ja-JP translation,
 * translates them via the Anthropic API (claude-sonnet-4-6), and writes the
 * output files. Designed to be called by GitHub Actions.
 *
 * Usage:
 *   node scripts/translate-diff.js [--dry-run] [--max <n>] [--output-list <file>]
 *
 * Environment variables:
 *   ANTHROPIC_API_KEY  – required for translation
 *   REPO_ROOT          – path to repo root (defaults to cwd)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const REPO_ROOT = process.env.REPO_ROOT || path.join(__dirname, '..');
const LOCALE = 'ja-JP';
const LOCALE_DIR = path.join(REPO_ROOT, 'docs', LOCALE);

// Source directories and how they map to docs/ja-JP/
const SOURCE_MAPPINGS = [
  { src: 'agents',   dst: path.join(LOCALE_DIR, 'agents'),   glob: '*.md' },
  { src: 'commands', dst: path.join(LOCALE_DIR, 'commands'),  glob: '*.md' },
  { src: 'rules',    dst: path.join(LOCALE_DIR, 'rules'),     glob: '**/*.md', exclude: /^zh\// },
  { src: 'skills',   dst: path.join(LOCALE_DIR, 'skills'),    glob: '**/SKILL.md' },
  { src: '.',        dst: LOCALE_DIR,                          glob: '*.md',
    include: /^(AGENTS|RULES|CLAUDE|SOUL|CODE_OF_CONDUCT|SPONSORING|SPONSORS|TROUBLESHOOTING|SECURITY|CHANGELOG|COMMANDS-QUICK-REF|EVALUATION|the-longform-guide|the-shortform-guide|the-security-guide|the-openclaw-guide)\.md$/ },
];

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const maxArg = args.indexOf('--max');
const MAX_FILES = maxArg !== -1 ? parseInt(args[maxArg + 1], 10) : 20;
const outputListArg = args.indexOf('--output-list');
const OUTPUT_LIST = outputListArg !== -1 ? args[outputListArg + 1] : null;

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

function walkDir(dir, pattern) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(full, pattern));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const rel = path.relative(dir, full).replace(/\\/g, '/');
      if (!pattern || pattern.test(rel) || pattern.test(entry.name)) {
        results.push(rel);
      }
    }
  }
  return results;
}

function collectMissingFiles() {
  const missing = [];

  for (const mapping of SOURCE_MAPPINGS) {
    const srcDir = path.join(REPO_ROOT, mapping.src);
    const allFiles = walkDir(srcDir, null);

    for (const rel of allFiles) {
      // Apply include/exclude filters
      if (mapping.exclude && mapping.exclude.test(rel)) continue;
      if (mapping.include && !mapping.include.test(rel)) continue;
      if (mapping.glob === '**/SKILL.md' && !rel.endsWith('SKILL.md')) continue;

      const srcFile = path.join(srcDir, rel);
      const dstFile = path.join(mapping.dst, rel);

      if (!fs.existsSync(dstFile)) {
        missing.push({ srcFile, dstFile, rel, mapping });
      }
    }
  }

  return missing;
}

// ---------------------------------------------------------------------------
// Translation via Anthropic API
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
`;

const SYSTEM_PROMPT = `You are a Japanese technical translator specializing in developer documentation.

## Translation rules
1. YAML frontmatter field names (name:, description:, origin:, tools:, model:) stay in English
2. Translate the VALUE of description: to Japanese
3. Do NOT translate code blocks — only translate comments inside them (lines starting with // or #)
4. Preserve all Markdown structure exactly (heading levels, lists, tables, code fences)
5. Use katakana for technical terms per the glossary below
6. Do NOT add or remove sections

## Glossary
${GLOSSARY}

Output only the translated markdown file content, no explanation.`;

function callAnthropicAPI(content) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      reject(new Error('ANTHROPIC_API_KEY is not set'));
      return;
    }

    const body = JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Translate the following markdown file from English to Japanese:\n\n${content}`,
        },
      ],
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            reject(new Error(`API error: ${parsed.error.message}`));
          } else {
            resolve(parsed.content[0].text);
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}\nRaw: ${data.slice(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`🔍 Scanning for missing ja-JP translations...`);
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
    const listContent = toProcess.map(f => f.dstFile).join('\n');
    fs.writeFileSync(OUTPUT_LIST, listContent);
    console.log(`📝 Output list written to: ${OUTPUT_LIST}`);
  }

  if (DRY_RUN) {
    console.log('\nDry-run mode — files that would be translated:');
    for (const f of toProcess) {
      console.log(`  ${f.srcFile} → ${f.dstFile}`);
    }
    return;
  }

  let succeeded = 0;
  let failed = 0;

  for (const { srcFile, dstFile } of toProcess) {
    const relSrc = path.relative(REPO_ROOT, srcFile).replace(/\\/g, '/');
    const relDst = path.relative(REPO_ROOT, dstFile).replace(/\\/g, '/');
    process.stdout.write(`  Translating ${relSrc} → ${relDst} ... `);

    try {
      const content = fs.readFileSync(srcFile, 'utf8');
      const translated = await callAnthropicAPI(content);

      fs.mkdirSync(path.dirname(dstFile), { recursive: true });
      fs.writeFileSync(dstFile, translated, 'utf8');

      console.log('✅');
      succeeded++;
    } catch (err) {
      console.log(`❌ ${err.message}`);
      failed++;
    }

    // Brief pause to respect rate limits
    if (toProcess.indexOf({ srcFile, dstFile }) < toProcess.length - 1) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log(`\n📊 Done: ${succeeded} succeeded, ${failed} failed, ${missing.length - toProcess.length} deferred.`);

  if (missing.length > MAX_FILES) {
    console.log(`ℹ️  ${missing.length - MAX_FILES} file(s) remain untranslated — will be picked up in the next run.`);
  }

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
