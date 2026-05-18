'use strict';

// Converts ECC SKILL.md / rules Markdown into self-contained HTML for Excel
// Online cells (Column B) and rich Task Pane viewers. Regex-based, zero
// runtime dependencies; mirrors the style of markdown-to-excel.js.

const { parseFrontmatter, parseSections } = require('./markdown-to-excel');

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
}

function escapeAttr(str) {
  return escapeHtml(str);
}

// Minimal inline markdown → HTML. Handles links, bold, italic, inline code.
function renderInline(text) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`\n]+)`/g, (_, code) => `<code>${code}</code>`);
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) =>
    `<a href="${escapeAttr(url)}" rel="noopener">${label}</a>`);
  html = html.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  return html;
}

// Convert a block of markdown body into HTML. Supports headings (## ###),
// fenced code blocks (```lang), bullet/numbered lists, tables, blockquotes,
// and paragraphs. Each emitted element is sanitized via escapeHtml.
function renderBlock(body) {
  const lines = body.split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^```/.test(line)) {
      const lang = line.slice(3).trim();
      const code = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) { code.push(lines[i]); i++; }
      i++;
      const klass = lang ? ` class="language-${escapeAttr(lang)}"` : '';
      out.push(`<pre><code${klass}>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    const h3 = line.match(/^###\s+(.+)/);
    if (h3) { out.push(`<h3>${renderInline(h3[1])}</h3>`); i++; continue; }
    const h2 = line.match(/^##\s+(.+)/);
    if (h2) { out.push(`<h2>${renderInline(h2[1])}</h2>`); i++; continue; }
    const h1 = line.match(/^#\s+(.+)/);
    if (h1) { out.push(`<h1>${renderInline(h1[1])}</h1>`); i++; continue; }

    if (/^\s*[-*+]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(`<li>${renderInline(lines[i].replace(/^\s*[-*+]\s+/, ''))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(`<li>${renderInline(lines[i].replace(/^\s*\d+\.\s+/, ''))}</li>`);
        i++;
      }
      out.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    if (/^\s*\|.+\|\s*$/.test(line) && i + 1 < lines.length && /^\s*\|[-:\s|]+\|\s*$/.test(lines[i + 1])) {
      const header = splitTableRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && /^\s*\|.+\|\s*$/.test(lines[i])) {
        rows.push(splitTableRow(lines[i]));
        i++;
      }
      const thead = `<thead><tr>${header.map((c) => `<th>${renderInline(c)}</th>`).join('')}</tr></thead>`;
      const tbody = `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${renderInline(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
      out.push(`<table>${thead}${tbody}</table>`);
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push(`<blockquote>${renderInline(quote.join(' '))}</blockquote>`);
      continue;
    }

    if (line.trim() === '') { i++; continue; }

    const para = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !/^(#|```|[-*+]\s|\d+\.\s|>|\|)/.test(lines[i])) {
      para.push(lines[i]); i++;
    }
    out.push(`<p>${renderInline(para.join(' '))}</p>`);
  }

  return out.join('\n');
}

function splitTableRow(line) {
  return line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
}

// Strip HTML tags and collapse whitespace, then truncate. Used for Column A
// plain-text summaries that Copilot consumes as context.
function htmlToShortPlain(html, maxChars = 240) {
  const text = String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars - 1).trimEnd() + '…';
}

// Defense-in-depth sanitizer: removes <script>, <style>, and any on*= event
// handler attributes. Output is rendered inside a sandboxed iframe so this is
// a belt-and-suspenders measure.
function sanitizeFragment(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, '')
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, '')
    .replace(/javascript:/gi, 'about:blank#');
}

// Render frontmatter as a small definition list at the top of the document.
function renderMeta(meta) {
  const entries = Object.entries(meta).filter(([, v]) => v != null && v !== '');
  if (!entries.length) return '';
  const dl = entries.map(([k, v]) =>
    `<div class="meta-row"><dt>${escapeHtml(k)}</dt><dd>${renderInline(String(v))}</dd></div>`).join('');
  return `<dl class="meta">${dl}</dl>`;
}

// Build a tabbed section view from parsed sections. Sections become tabs;
// first tab is selected by default. Plain block fallback if only one section.
function renderSectionsAsTabs(sections) {
  const usable = sections.filter((s) => s.body && s.body.trim());
  if (usable.length === 0) return '';
  if (usable.length === 1) {
    return `<section class="content">${renderBlock(usable[0].body)}</section>`;
  }

  const tabs = usable.map((s, idx) => {
    const id = `tab-${idx}`;
    const selected = idx === 0 ? ' aria-selected="true"' : '';
    return `<button role="tab" aria-controls="${id}-panel"${selected} data-tab="${id}">${escapeHtml(s.heading)}</button>`;
  }).join('');

  const panels = usable.map((s, idx) => {
    const id = `tab-${idx}`;
    const hidden = idx === 0 ? '' : ' hidden';
    return `<section role="tabpanel" id="${id}-panel"${hidden}>${renderBlock(s.body)}</section>`;
  }).join('');

  return `<div class="tabs"><div role="tablist">${tabs}</div>${panels}</div>`;
}

const DEFAULT_STYLES = `
  :root { color-scheme: light dark; --fg: #1a1a1a; --bg: #ffffff; --muted: #666; --accent: #0066cc; --code-bg: #f5f5f5; --border: #ddd; }
  @media (prefers-color-scheme: dark) { :root { --fg: #e8e8e8; --bg: #1a1a1a; --muted: #999; --accent: #4da3ff; --code-bg: #2a2a2a; --border: #444; } }
  body { font: 14px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: var(--fg); background: var(--bg); margin: 0; padding: 16px; max-width: 900px; }
  h1, h2, h3 { line-height: 1.25; }
  h1 { font-size: 1.8em; margin-top: 0; }
  h2 { font-size: 1.3em; border-bottom: 1px solid var(--border); padding-bottom: 4px; }
  h3 { font-size: 1.1em; color: var(--muted); }
  a { color: var(--accent); }
  code { font: 13px ui-monospace, "SF Mono", Menlo, monospace; background: var(--code-bg); padding: 1px 5px; border-radius: 3px; }
  pre { background: var(--code-bg); padding: 12px; border-radius: 6px; overflow-x: auto; }
  pre code { background: transparent; padding: 0; }
  table { border-collapse: collapse; width: 100%; margin: 12px 0; }
  th, td { border: 1px solid var(--border); padding: 6px 10px; text-align: left; }
  th { background: var(--code-bg); }
  blockquote { border-left: 3px solid var(--accent); margin: 12px 0; padding: 4px 12px; color: var(--muted); }
  dl.meta { display: grid; grid-template-columns: max-content 1fr; gap: 4px 12px; background: var(--code-bg); padding: 12px; border-radius: 6px; margin-bottom: 16px; }
  dl.meta .meta-row { display: contents; }
  dl.meta dt { font-weight: 600; color: var(--muted); }
  dl.meta dd { margin: 0; }
  .tabs [role="tablist"] { display: flex; gap: 4px; border-bottom: 1px solid var(--border); margin-bottom: 12px; }
  .tabs button[role="tab"] { background: transparent; border: 0; padding: 8px 14px; cursor: pointer; color: var(--muted); border-bottom: 2px solid transparent; }
  .tabs button[role="tab"][aria-selected="true"] { color: var(--accent); border-bottom-color: var(--accent); }
  .copy-actions { margin-top: 24px; padding-top: 12px; border-top: 1px solid var(--border); display: flex; gap: 8px; flex-wrap: wrap; }
  .copy-actions button { background: var(--accent); color: white; border: 0; padding: 6px 14px; border-radius: 4px; cursor: pointer; font: inherit; }
  @media (max-width: 600px) { body { padding: 12px; font-size: 13px; } h1 { font-size: 1.5em; } }
`;

const TAB_SCRIPT = `
(function(){
  document.querySelectorAll('.tabs').forEach(function(t){
    t.addEventListener('click', function(e){
      var btn = e.target.closest('button[role="tab"]');
      if(!btn || !t.contains(btn)) return;
      var tabId = btn.getAttribute('data-tab');
      t.querySelectorAll('button[role="tab"]').forEach(function(b){ b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
      t.querySelectorAll('[role="tabpanel"]').forEach(function(p){ p.hidden = p.id !== tabId + '-panel'; });
    });
  });
  document.querySelectorAll('[data-copy-prompt], [data-copy-json]').forEach(function(b){
    b.addEventListener('click', function(){
      var target = b.getAttribute('data-copy-prompt') || b.getAttribute('data-copy-json');
      var src = document.getElementById(target);
      if(!src) return;
      navigator.clipboard.writeText(src.innerText || src.textContent || '');
      var orig = b.textContent; b.textContent = 'Copied!'; setTimeout(function(){ b.textContent = orig; }, 1200);
    });
  });
})();
`;

// Wrap an HTML fragment in a self-contained document with inline styles and
// the tab/copy script. Safe to drop into an Excel cell (chunked if >32K) or
// open directly in a browser.
function wrapAsSelfContainedDoc(innerHtml, opts = {}) {
  const title = escapeHtml(opts.title || 'ECC Document');
  const promptId = opts.promptTargetId;
  const copyActions = promptId
    ? `<div class="copy-actions">
         <button data-copy-prompt="${escapeAttr(promptId)}">📋 Copy as Prompt</button>
         <button data-copy-json="${escapeAttr(promptId)}">{} Copy as JSON</button>
       </div>`
    : '';
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>${DEFAULT_STYLES}</style></head>
<body>${sanitizeFragment(innerHtml)}${copyActions}<script>${TAB_SCRIPT}</script></body></html>`;
}

// ── Public conversion helpers ─────────────────────────────────────────────

function skillToHtml(markdown) {
  const { meta, body } = parseFrontmatter(markdown);
  const sections = parseSections(body);
  const fragment = renderMeta(meta) + renderSectionsAsTabs(sections);
  const html = wrapAsSelfContainedDoc(fragment, { title: meta.name || 'ECC Skill' });
  return { plain: htmlToShortPlain(html), html, meta };
}

function ruleToHtml(markdown, filename) {
  const { meta, body } = parseFrontmatter(markdown);
  const sections = parseSections(body);
  const header = renderMeta(Object.assign({ file: filename }, meta));
  const fragment = header + renderSectionsAsTabs(sections);
  const html = wrapAsSelfContainedDoc(fragment, { title: filename || 'ECC Rule' });
  return { plain: htmlToShortPlain(html), html };
}

function agentToHtml(markdown, filename) {
  const { meta, body } = parseFrontmatter(markdown);
  const sections = parseSections(body);
  const header = renderMeta(Object.assign({ file: filename }, meta));
  const fragment = header + (sections.length ? renderSectionsAsTabs(sections) : renderBlock(body));
  const html = wrapAsSelfContainedDoc(fragment, { title: meta.name || filename || 'ECC Agent' });
  return { plain: htmlToShortPlain(html), html, meta };
}

function commandToHtml(markdown, filename) {
  const { meta, body } = parseFrontmatter(markdown);
  const sections = parseSections(body);
  const header = renderMeta(Object.assign({ file: filename }, meta));
  const fragment = header + (sections.length ? renderSectionsAsTabs(sections) : renderBlock(body));
  const html = wrapAsSelfContainedDoc(fragment, { title: filename || 'ECC Command' });
  return { plain: htmlToShortPlain(html), html };
}

module.exports = {
  agentToHtml,
  commandToHtml,
  escapeHtml,
  htmlToShortPlain,
  parseFrontmatter,
  parseSections,
  renderBlock,
  renderInline,
  ruleToHtml,
  sanitizeFragment,
  skillToHtml,
  wrapAsSelfContainedDoc,
};
