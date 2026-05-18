'use strict';

/**
 * translation-rules.js
 *
 * Single source of truth for ja-JP translation rules and glossary.
 * Used by both translate-diff.js (Gemini) and jules-review-request.js (Jules).
 */

const GLOSSARY_TABLE = `
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
| Orchestration | オーケストレーション |
| Coverage | カバレッジ |
| Refactoring | リファクタリング |
| Edge case | エッジケース |
| Frontmatter | フロントマター |
`.trim();

const TRANSLATION_RULES = `
1. YAML frontmatter field names (name:, description:, origin:, tools:, model:) stay in English
2. Translate the VALUE of description: to Japanese
3. Do NOT translate code blocks — only translate comments (// or # lines) inside them
4. Preserve all Markdown structure exactly (heading levels, lists, tables, code fences)
5. Use katakana for technical terms per the glossary below
6. Do NOT add, remove, or reorder any sections
`.trim();

const REVIEW_RULES = `
1. Untranslated sections — English text that should have been translated to Japanese
2. Over-translated code — source code inside fences that was incorrectly translated
3. YAML frontmatter violations — field names (name:, origin:, tools:, model:) must stay in English
4. Terminology inconsistency — technical terms must use katakana per the glossary
5. Structural changes — heading levels, table columns, or list items added/removed vs. source
`.trim();

/** Full system prompt for Gemini translation */
const TRANSLATION_SYSTEM_PROMPT = `You are a Japanese technical translator specializing in developer documentation.

Translation rules:
${TRANSLATION_RULES}

Glossary:
${GLOSSARY_TABLE}

Output ONLY the translated markdown. No explanation, no preamble.`;

/** Prompt fragment for Jules review */
const REVIEW_PROMPT_BODY = `You are a Japanese technical translation reviewer.

Check for the following issues and post inline review comments on docs/ja-JP/ files:

${REVIEW_RULES}

Glossary (katakana reference):
${GLOSSARY_TABLE}

For each issue, post a review comment on the specific file and line.
If no issues are found, post a single approving summary comment.
Do NOT approve or request changes at the PR level — only post comments.`;

/** Human-readable markdown for PR body / documentation */
const RULES_MARKDOWN = `
## 翻訳ルール

| # | ルール |
|---|--------|
| 1 | YAMLフロントマターのフィールド名（\`name:\`, \`description:\`, \`origin:\`, \`tools:\`, \`model:\`）は英語のまま |
| 2 | \`description:\` の**値**のみ日本語に翻訳する |
| 3 | コードブロック内のソースコードは翻訳しない — \`//\` や \`#\` で始まるコメント行のみ翻訳 |
| 4 | Markdown構造（見出しレベル・テーブル・リスト・コードフェンス）は原文と完全一致 |
| 5 | 技術用語はカタカナ表記（下記用語集参照） |
| 6 | セクションの追加・削除・並び替えは禁止 |

## 用語集

${GLOSSARY_TABLE}
`.trim();

module.exports = {
  GLOSSARY_TABLE,
  TRANSLATION_RULES,
  REVIEW_RULES,
  TRANSLATION_SYSTEM_PROMPT,
  REVIEW_PROMPT_BODY,
  RULES_MARKDOWN,
};
