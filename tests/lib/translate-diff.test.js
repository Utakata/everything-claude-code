'use strict';

// Regression coverage for scripts/translate-diff.js path handling.
//
// Historically walkDir() anchored relative paths to the current recursion
// directory instead of the top of the walk, flattening nested files to their
// basename (rules/python/testing.md -> testing.md). That made the detector
// report the same collapsed name many times ("339 missing" when the real gap
// was 0) and, on a real run, write translations to wrong flattened paths.

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Build an isolated fixture repo BEFORE requiring the module — REPO_ROOT and
// the derived mappings are captured at load time.
const REPO = fs.mkdtempSync(path.join(os.tmpdir(), 'ecc-translate-diff-'));
process.env.REPO_ROOT = REPO;

function write(rel, body = 'x') {
  const full = path.join(REPO, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, body, 'utf8');
}

// --- Sources ---------------------------------------------------------------
write('rules/python/testing.md');
write('rules/go/testing.md');          // same basename, different dir
write('rules/zh/testing.md');          // excluded locale source
write('skills/foo/SKILL.md');
write('skills/foo/references/bar.md');  // reference sub-file (now in scope)
write('docs/architecture/y.md');
write('docs/zh-CN/x.md');              // excluded other-language locale
write('docs/releases/1.0.0/notes.md'); // excluded ephemeral artifact
write('README.md');
write('node_modules/pkg/readme.md');   // must not be reached from root mapping

// --- Existing translations (mirrors) --------------------------------------
write('docs/ja-JP/skills/foo/SKILL.md'); // already translated → not a gap

const { walkDir, collectMissingFiles } = require('../../scripts/translate-diff');

console.log('=== Testing translate-diff.js ===\n');

let passed = 0;
let failed = 0;
function test(desc, fn) {
  try {
    fn();
    console.log(`  ✓ ${desc}`);
    passed++;
  } catch (e) {
    console.log(`  ✗ ${desc}: ${e.message}`);
    failed++;
  }
}

console.log('walkDir path handling:');
test('preserves nested subdirectory prefix', () => {
  const rels = walkDir(path.join(REPO, 'rules'));
  assert.ok(rels.includes('python/testing.md'), `got: ${rels.join(', ')}`);
  assert.ok(rels.includes('go/testing.md'), `got: ${rels.join(', ')}`);
});
test('does not flatten same-basename files to one entry', () => {
  const rels = walkDir(path.join(REPO, 'rules'));
  const testingFiles = rels.filter(r => r.endsWith('testing.md'));
  assert.strictEqual(testingFiles.length, 3, `got: ${rels.join(', ')}`);
});
test('recursive:false returns only top-level files', () => {
  const rels = walkDir(REPO, REPO, false);
  assert.ok(rels.includes('README.md'));
  assert.ok(!rels.some(r => r.includes('/')), `descended unexpectedly: ${rels.join(', ')}`);
});

console.log('\ncollectMissingFiles scope + mappings:');
const missing = collectMissingFiles();
const srcRel = missing.map(m => path.relative(REPO, m.srcFile).replace(/\\/g, '/'));
const dstRel = missing.map(m => path.relative(REPO, m.dstFile).replace(/\\/g, '/'));

test('flags nested untranslated rules with correct nested dst path', () => {
  const i = srcRel.indexOf('rules/python/testing.md');
  assert.notStrictEqual(i, -1, `sources: ${srcRel.join(', ')}`);
  assert.strictEqual(dstRel[i], 'docs/ja-JP/rules/python/testing.md');
});
test('flags skill reference sub-files (skills/**/*.md now in scope)', () => {
  assert.ok(srcRel.includes('skills/foo/references/bar.md'), srcRel.join(', '));
});
test('does not re-flag already-translated SKILL.md', () => {
  assert.ok(!srcRel.includes('skills/foo/SKILL.md'), srcRel.join(', '));
});
test('flags docs/ English source with 1:1 ja-JP mapping', () => {
  const i = srcRel.indexOf('docs/architecture/y.md');
  assert.notStrictEqual(i, -1, `sources: ${srcRel.join(', ')}`);
  assert.strictEqual(dstRel[i], 'docs/ja-JP/architecture/y.md');
});
test('flags root README.md', () => {
  assert.ok(srcRel.includes('README.md'), srcRel.join(', '));
});
test('excludes rules/zh locale source', () => {
  assert.ok(!srcRel.includes('rules/zh/testing.md'), srcRel.join(', '));
});
test('excludes docs other-language locales and ephemeral artifacts', () => {
  assert.ok(!srcRel.some(r => r.startsWith('docs/zh-CN/')), srcRel.join(', '));
  assert.ok(!srcRel.some(r => r.startsWith('docs/releases/')), srcRel.join(', '));
});
test('root mapping does not descend into node_modules', () => {
  assert.ok(!srcRel.some(r => r.includes('node_modules')), srcRel.join(', '));
});

// Cleanup best-effort
try { fs.rmSync(REPO, { recursive: true, force: true }); } catch (_) { /* ignore */ }

console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
if (failed > 0) process.exit(1);
