/**
 * Tests for scripts/lib/markdown-to-html.js
 *
 * Run with: node tests/lib/markdown-to-html.test.js
 */

const assert = require('assert');

const {
  agentToHtml,
  commandToHtml,
  escapeHtml,
  htmlToShortPlain,
  renderBlock,
  renderInline,
  ruleToHtml,
  sanitizeFragment,
  skillToHtml,
  wrapAsSelfContainedDoc,
} = require('../../scripts/lib/markdown-to-html');

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    return true;
  } catch (err) {
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${err.message}`);
    return false;
  }
}

function runTests() {
  console.log('\n=== Testing markdown-to-html ===\n');
  let passed = 0;
  let failed = 0;

  function record(ok) { ok ? passed++ : failed++; }

  record(test('escapeHtml escapes &, <, >, ", \'', () => {
    assert.strictEqual(escapeHtml('a & b < c > d "e" \'f\''),
      'a &amp; b &lt; c &gt; d &quot;e&quot; &#39;f&#39;');
  }));

  record(test('renderInline converts inline code', () => {
    const out = renderInline('hello `world` foo');
    assert.ok(out.includes('<code>world</code>'));
  }));

  record(test('renderInline converts bold and italic', () => {
    assert.ok(renderInline('**bold** text').includes('<strong>bold</strong>'));
    assert.ok(renderInline('an *italic* word').includes('<em>italic</em>'));
  }));

  record(test('renderInline converts links with rel=noopener', () => {
    const out = renderInline('[label](https://example.com)');
    assert.ok(out.includes('<a href="https://example.com"'));
    assert.ok(out.includes('rel="noopener"'));
    assert.ok(out.includes('>label</a>'));
  }));

  record(test('renderInline escapes raw HTML in input', () => {
    const out = renderInline('<script>alert(1)</script>');
    assert.ok(!out.includes('<script>'));
    assert.ok(out.includes('&lt;script&gt;'));
  }));

  record(test('renderBlock converts H2 / H3', () => {
    const out = renderBlock('## Heading 2\n\n### Heading 3');
    assert.ok(out.includes('<h2>Heading 2</h2>'));
    assert.ok(out.includes('<h3>Heading 3</h3>'));
  }));

  record(test('renderBlock converts fenced code with language class', () => {
    const out = renderBlock('```python\nprint("hi")\n```');
    assert.ok(out.includes('<pre><code class="language-python">'));
    assert.ok(out.includes('print(&quot;hi&quot;)'));
  }));

  record(test('renderBlock converts bullet lists', () => {
    const out = renderBlock('- one\n- two\n- three');
    assert.ok(out.includes('<ul>'));
    assert.ok(out.includes('<li>one</li>'));
    assert.ok(out.includes('<li>three</li>'));
  }));

  record(test('renderBlock converts numbered lists', () => {
    const out = renderBlock('1. first\n2. second');
    assert.ok(out.includes('<ol>'));
    assert.ok(out.includes('<li>first</li>'));
  }));

  record(test('renderBlock converts tables', () => {
    const md = '| A | B |\n| --- | --- |\n| 1 | 2 |\n| 3 | 4 |';
    const out = renderBlock(md);
    assert.ok(out.includes('<table>'));
    assert.ok(out.includes('<th>A</th>'));
    assert.ok(out.includes('<td>3</td>'));
  }));

  record(test('renderBlock converts blockquotes', () => {
    const out = renderBlock('> quoted text');
    assert.ok(out.includes('<blockquote>quoted text</blockquote>'));
  }));

  record(test('renderBlock wraps paragraphs', () => {
    const out = renderBlock('Just a paragraph of text.');
    assert.ok(out.includes('<p>Just a paragraph of text.</p>'));
  }));

  record(test('sanitizeFragment removes <script> blocks', () => {
    const dirty = '<p>safe</p><script>alert(1)</script><p>safe2</p>';
    const clean = sanitizeFragment(dirty);
    assert.ok(!clean.includes('<script'));
    assert.ok(clean.includes('safe'));
    assert.ok(clean.includes('safe2'));
  }));

  record(test('sanitizeFragment strips on*= attributes', () => {
    const dirty = '<div onclick="bad()" onmouseover=\'x\' onfocus=y>x</div>';
    const clean = sanitizeFragment(dirty);
    assert.ok(!/onclick/i.test(clean));
    assert.ok(!/onmouseover/i.test(clean));
    assert.ok(!/onfocus/i.test(clean));
  }));

  record(test('sanitizeFragment neutralizes javascript: URLs', () => {
    const clean = sanitizeFragment('<a href="javascript:alert(1)">x</a>');
    assert.ok(!/javascript:/i.test(clean));
  }));

  record(test('htmlToShortPlain strips tags', () => {
    const out = htmlToShortPlain('<h1>Title</h1><p>Body <code>x</code></p>');
    assert.ok(!out.includes('<'));
    assert.ok(out.includes('Title'));
    assert.ok(out.includes('Body'));
  }));

  record(test('htmlToShortPlain truncates with ellipsis', () => {
    const long = '<p>' + 'a'.repeat(500) + '</p>';
    const out = htmlToShortPlain(long, 50);
    assert.strictEqual(out.length, 50);
    assert.ok(out.endsWith('…'));
  }));

  record(test('htmlToShortPlain decodes basic entities', () => {
    const out = htmlToShortPlain('<p>&lt;tag&gt; &amp; rest</p>');
    assert.ok(out.includes('<tag> & rest'));
  }));

  record(test('wrapAsSelfContainedDoc emits <!DOCTYPE html>', () => {
    const doc = wrapAsSelfContainedDoc('<p>hi</p>', { title: 'T' });
    assert.ok(doc.startsWith('<!DOCTYPE html>'));
    assert.ok(doc.includes('<title>T</title>'));
    assert.ok(doc.includes('<style>'));
  }));

  record(test('wrapAsSelfContainedDoc adds copy actions when promptTargetId given', () => {
    const doc = wrapAsSelfContainedDoc('<pre id="src">data</pre>', { promptTargetId: 'src' });
    assert.ok(doc.includes('data-copy-prompt="src"'));
    assert.ok(doc.includes('data-copy-json="src"'));
  }));

  record(test('skillToHtml extracts frontmatter and yields plain/html/meta', () => {
    const md = [
      '---',
      'name: example-skill',
      'description: Example for tests',
      '---',
      '',
      '## When to Use',
      '',
      'Use when testing.',
      '',
      '## How It Works',
      '',
      '- step one',
      '- step two',
    ].join('\n');
    const { plain, html, meta } = skillToHtml(md);
    assert.strictEqual(meta.name, 'example-skill');
    assert.ok(html.includes('example-skill'));
    assert.ok(html.includes('When to Use'));
    assert.ok(html.includes('<li>step one</li>'));
    assert.ok(plain.length > 0 && plain.length <= 240);
  }));

  record(test('skillToHtml multi-section output uses tabs', () => {
    const md = '## A\n\nfirst\n\n## B\n\nsecond';
    const { html } = skillToHtml(md);
    assert.ok(html.includes('role="tablist"'));
    assert.ok(html.includes('aria-selected="true"'));
  }));

  record(test('ruleToHtml includes filename in metadata', () => {
    const md = '## Style\n\nUse two spaces.';
    const { html } = ruleToHtml(md, 'python-style.md');
    assert.ok(html.includes('python-style.md'));
    assert.ok(html.includes('Use two spaces'));
  }));

  record(test('agentToHtml preserves frontmatter fields', () => {
    const md = [
      '---',
      'name: my-agent',
      'description: An agent',
      'model: opus',
      '---',
      '',
      'Agent prompt body.',
    ].join('\n');
    const { html, meta } = agentToHtml(md, 'my-agent.md');
    assert.strictEqual(meta.name, 'my-agent');
    assert.strictEqual(meta.model, 'opus');
    assert.ok(html.includes('Agent prompt body'));
  }));

  record(test('commandToHtml handles minimal input', () => {
    const md = '---\ndescription: cmd\n---\n\nDo things.';
    const { html, plain } = commandToHtml(md, 'do-things.md');
    assert.ok(html.includes('Do things'));
    assert.ok(plain.length > 0);
  }));

  record(test('skillToHtml resists script injection in body', () => {
    const md = '## Section\n\nbefore <script>evil()</script> after';
    const { html } = skillToHtml(md);
    assert.ok(!html.toLowerCase().includes('<script>evil'));
    assert.ok(html.includes('before'));
    assert.ok(html.includes('after'));
  }));

  console.log(`\n${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exit(1);
}

runTests();
