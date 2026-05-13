# CLAUDE.md

このファイルは、本リポジトリ内のコードを操作する際のClaude Code (claude.ai/code) 向けのガイダンスを提供する。

## Project Overview

これは**Claude Code plugin**であり、実稼働に対応したagent、skill、hook、command、rule、およびMCP configurationのコレクションである。このプロジェクトは、Claude Codeを使用したソフトウェア開発のための、実地検証済みのワークフローを提供する。

## Running Tests

```bash
# Run all tests
node tests/run-all.js

# Run individual test files
node tests/lib/utils.test.js
node tests/lib/package-manager.test.js
node tests/hooks/hooks.test.js
```

## Architecture

プロジェクトは以下のコアコンポーネントで構成されている：

- **agents/** - 委譲するための専門化されたsubagent（planner、code-reviewer、tdd-guideなど）
- **skills/** - ワークフローの定義とドメイン知識（coding standards、patterns、testing）
- **commands/** - ユーザーが呼び出すスラッシュコマンド（/tdd、/plan、/e2eなど）
- **hooks/** - トリガーベースの自動化（session persistence、pre/post-tool hooks）
- **rules/** - 常に従うべきガイドライン（security、coding style、testing requirements）
- **mcp-configs/** - 外部連携のためのMCP server configuration
- **scripts/** - hookやセットアップ用のクロスプラットフォームNode.jsユーティリティ
- **tests/** - スクリプトとユーティリティのためのテストスイート

## Key Commands

- `/tdd` - Test-driven developmentワークフロー
- `/plan` - 実装の計画
- `/e2e` - E2Eテストの生成と実行
- `/code-review` - 品質レビュー
- `/build-fix` - ビルドエラーの修正
- `/learn` - セッションからのパターンの抽出
- `/skill-create` - Gitの履歴からのskillの生成

## Development Notes

- パッケージマネージャーの検出：npm、pnpm、yarn、bun（`CLAUDE_PACKAGE_MANAGER`環境変数またはプロジェクト設定で設定可能）
- クロスプラットフォーム：Node.jsスクリプトによるWindows、macOS、Linuxのサポート
- Agentのフォーマット：YAMLフロントマター（name、description、tools、model）付きのMarkdown
- Skillのフォーマット：使用すべきタイミング、仕組み、例を記載した明確なセクションを持つMarkdown
- Skillの配置：skills/にて管理され、生成/インポートされたものは ~/.claude/skills/ 配下に配置される。詳細は docs/SKILL-PLACEMENT-POLICY.md を参照。
- Hookのフォーマット：マッチャー条件とcommand/notificationのhookを持つJSON

## Contributing

CONTRIBUTING.mdのフォーマットに従うこと：
- Agents：フロントマター（name、description、tools、model）付きのMarkdown
- Skills：明確なセクション（When to Use、How It Works、Examples）
- Commands：descriptionフロントマター付きのMarkdown
- Hooks：マッチャーとhooks配列を持つJSON

ファイル命名規則：ハイフン区切りの小文字（例：`python-reviewer.md`、`tdd-workflow.md`）

## Skills

関連するファイルを操作する場合は、以下のskillを使用すること：

| File(s) | Skill |
|---------|-------|
| `README.md` | `/readme` |
| `.github/workflows/*.yml` | `/ci-workflow` |

subagentを生成する際は、常に各skillからの規約をagentのプロンプトに渡すこと。
