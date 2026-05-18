'use strict';

// Converts ECC SKILL.md / rules Markdown into structured Excel cell data.
// No external dependencies — uses regex-based parsing.
// HTML > Markdown: structured cell format is more readable than raw Markdown
// symbols (##, **, -) when Copilot processes cell content.

/**
 * Parse a Markdown string into sections.
 * Returns [{heading, body}]
 */
function parseSections(markdown) {
  const lines = markdown.split('\n');
  const sections = [];
  let currentHeading = 'Overview';
  let bodyLines = [];

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/);
    const h3 = line.match(/^###\s+(.+)/);

    if (h2 || h3) {
      if (bodyLines.length) {
        sections.push({ heading: currentHeading, body: bodyLines.join('\n').trim() });
        bodyLines = [];
      }
      currentHeading = (h2 || h3)[1].trim();
    } else {
      bodyLines.push(line);
    }
  }
  if (bodyLines.length) {
    sections.push({ heading: currentHeading, body: bodyLines.join('\n').trim() });
  }
  return sections;
}

/**
 * Parse YAML frontmatter from a Markdown string.
 * Returns { meta: {key:val}, body: restOfMarkdown }
 */
function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: markdown };

  const meta = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.+)/);
    if (kv) meta[kv[1].trim()] = kv[2].trim();
  }
  return { meta, body: match[2] };
}

/**
 * Strip Markdown syntax for cleaner cell text.
 * Keeps content readable without raw symbols.
 */
function stripMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')      // bold
    .replace(/\*(.+?)\*/g, '$1')           // italic
    .replace(/`(.+?)`/g, '$1')             // inline code
    .replace(/^[-*+]\s+/gm, '• ')          // list items → bullet
    .replace(/^\d+\.\s+/gm, (m) => m)      // numbered lists (keep)
    .replace(/^#{1,6}\s+/gm, '')           // headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → text
    .trim();
}

/**
 * Convert a SKILL.md string into rows for Excel.
 * Format: [[Section, Content], ...]
 * Section column is bolded by the workbook generator.
 */
function skillToRows(markdown) {
  const { meta, body } = parseFrontmatter(markdown);
  const rows = [];

  // Frontmatter as header rows
  if (meta.name) rows.push(['Skill', meta.name]);
  if (meta.description) rows.push(['Description', stripMarkdown(meta.description)]);
  if (meta.origin) rows.push(['Origin', meta.origin]);
  rows.push(['', '']);

  // Body sections
  for (const section of parseSections(body)) {
    if (!section.body) continue;
    rows.push([section.heading, stripMarkdown(section.body)]);
  }

  return rows;
}

/**
 * Convert a rules/*.md string into rows for Excel.
 * Format: [[Category, Rule], ...]
 */
function ruleToRows(markdown, filename) {
  const { body } = parseFrontmatter(markdown);
  const rows = [['File', filename], ['', '']];
  for (const section of parseSections(body)) {
    if (!section.body) continue;
    rows.push([section.heading, stripMarkdown(section.body)]);
  }
  return rows;
}

/**
 * Convert an agent .md file into rows for Excel.
 */
function agentToRows(markdown, filename) {
  const { meta, body } = parseFrontmatter(markdown);
  const rows = [];
  if (meta.name) rows.push(['Agent', meta.name]);
  if (meta.description) rows.push(['Description', stripMarkdown(meta.description)]);
  if (meta.model) rows.push(['Model', meta.model]);
  if (meta.tools) rows.push(['Tools', meta.tools]);
  rows.push(['', '']);
  rows.push(['Prompt', stripMarkdown(body)]);
  return rows;
}

module.exports = {
  agentToRows,
  parseFrontmatter,
  parseSections,
  ruleToRows,
  skillToRows,
  stripMarkdown,
};
