#!/usr/bin/env node
/**
 * jules-review-request.js
 *
 * Submits a Jules session to review a translation PR.
 * Jules reads the changed files and posts review comments.
 *
 * Usage:
 *   node scripts/jules-review-request.js --pr <number> --branch <branch>
 *
 * Environment variables:
 *   JULES_API_KEY    – from jules.google.com Settings
 *   JULES_SOURCE_ID  – repository source ID from jules.google.com/sources
 */

'use strict';

const https = require('https');

const JULES_HOST = 'jules.googleapis.com';
const JULES_PATH = '/v1alpha';

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args     = process.argv.slice(2);
const prArg    = args.indexOf('--pr');
const brArg    = args.indexOf('--branch');
const PR_NUM   = prArg  !== -1 ? args[prArg  + 1] : process.env.PR_NUMBER;
const BRANCH   = brArg  !== -1 ? args[brArg  + 1] : process.env.GITHUB_HEAD_REF;

// ---------------------------------------------------------------------------
// Jules API
// ---------------------------------------------------------------------------

function julesPost(apiPath, body) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.JULES_API_KEY;
    if (!apiKey) { reject(new Error('JULES_API_KEY is not set')); return; }

    const bodyBuf = Buffer.from(JSON.stringify(body));
    const req = https.request({
      hostname: JULES_HOST,
      path: `${JULES_PATH}${apiPath}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': bodyBuf.length,
        'X-Goog-Api-Key': apiKey,
      },
    }, (res) => {
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
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
  const sourceId = process.env.JULES_SOURCE_ID;
  if (!sourceId) { throw new Error('JULES_SOURCE_ID is not set'); }
  if (!PR_NUM)   { throw new Error('--pr <number> is required'); }
  if (!BRANCH)   { throw new Error('--branch <branch> is required'); }

  const prompt = [
    `You are a Japanese technical translation reviewer.`,
    ``,
    `Review the ja-JP translation files added in PR #${PR_NUM} (branch: ${BRANCH}).`,
    `Focus only on files under docs/ja-JP/.`,
    ``,
    `Check for the following issues and post inline review comments:`,
    ``,
    `1. **Untranslated sections** — any English text that should have been translated`,
    `2. **Over-translated code** — source code inside fences that was incorrectly translated`,
    `3. **YAML frontmatter violations** — field names (name:, origin:, tools:) must stay in English`,
    `4. **Terminology inconsistency** — use katakana for tech terms:`,
    `   エージェント, スキル, フック, コマンド, ルール, パイプライン, コンテナ, クラスター`,
    `5. **Structural changes** — heading levels, table columns, or list items added/removed`,
    ``,
    `For each issue found, post a review comment on the specific file and line.`,
    `If no issues are found, post a single approving summary comment.`,
    `Do NOT approve or request changes at the PR level — only post comments.`,
  ].join('\n');

  console.log(`🤖 Submitting Jules review session for PR #${PR_NUM} (branch: ${BRANCH})...`);

  const res = await julesPost('/sessions', {
    title: `Translation review: PR #${PR_NUM}`,
    prompt,
    sourceContext: { sourceId, branch: BRANCH },
    automationMode: 'FULL',
  });

  if (res.status === 429) {
    console.log('⚠️  Jules is busy (429). Review will be skipped this time.');
    process.exit(0); // Non-fatal — PR can still be merged without Jules review
  }
  if (res.status >= 400) {
    const err = JSON.parse(res.body);
    throw new Error(`Jules error ${res.status}: ${err?.error?.message || res.body.slice(0, 120)}`);
  }

  const session = JSON.parse(res.body);
  console.log(`✅ Jules review session created: ${session.name}`);
  console.log(`   Jules will review the translation and post inline comments.`);
  console.log(`   Monitor at: https://jules.google.com`);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
