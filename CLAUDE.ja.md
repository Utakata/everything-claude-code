# CLAUDE.md

このファイルは、このリポジトリのコードを操作する際のClaude Code (claude.ai/code) 向けのガイダンスを提供する。

## Project Overview

これは**Claude Code プラグイン**であり、本番環境対応のエージェント、スキル、フック、コマンド、ルール、およびMCP設定のコレクションである。このプロジェクトは、Claude Codeを使用したソフトウェア開発のための、実戦でテストされたワークフローを提供する。

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

プロジェクトはいくつかのコアコンポーネントに編成されている：

- **agents/** - 委譲のための特化型サブエージェント (planner, code-reviewer, tdd-guide, 等)
- **skills/** - ワークフローの定義とドメイン知識 (コーディング標準、パターン、テスト)
- **commands/** - ユーザーによって呼び出されるスラッシュコマンド (/tdd, /plan, /e2e, 等)
- **hooks/** - トリガーベースの自動化 (セッションの永続化、ツール使用前/後のフック)
- **rules/** - 常に従うべきガイドライン (セキュリティ、コーディングスタイル、テスト要件)
- **mcp-configs/** - 外部連携のためのMCPサーバー設定
- **scripts/** - フックとセットアップのためのクロスプラットフォームのNode.jsユーティリティ
- **tests/** - スクリプトとユーティリティのためのテストスイート

## Key Commands

- `/tdd` - テスト駆動開発のワークフロー
- `/plan` - 実装計画
- `/e2e` - E2Eテストの生成と実行
- `/code-review` - 品質レビュー
- `/build-fix` - ビルドエラーの修正
- `/learn` - セッションからのパターンの抽出
- `/skill-create` - git履歴からのスキルの生成

## Development Notes

- パッケージマネージャーの検出: npm, pnpm, yarn, bun (`CLAUDE_PACKAGE_MANAGER`環境変数またはプロジェクト設定で構成可能)
- クロスプラットフォーム: Node.jsスクリプトによるWindows, macOS, Linuxのサポート
- エージェントのフォーマット: YAMLフロントマター(name, description, tools, model)を持つMarkdown
- スキルのフォーマット: 「いつ使用するか」「どのように機能するか」「例」といった明確なセクションを持つMarkdown
- スキルの配置: `skills/`で管理され、生成/インポートされたものは`~/.claude/skills/`に配置される。詳細は `docs/SKILL-PLACEMENT-POLICY.md` を参照。
- フックのフォーマット: matcherの条件とcommand/notificationフックの配列を持つJSON

## Contributing

CONTRIBUTING.md のフォーマットに従うこと：
- エージェント: フロントマター(name, description, tools, model)を持つMarkdown
- スキル: 明確なセクション (When to Use, How It Works, Examples)
- コマンド: descriptionフロントマターを持つMarkdown
- フック: matcherとhooks配列を持つJSON

ファイルの命名規則: ハイフン区切りの小文字 (例: `python-reviewer.md`, `tdd-workflow.md`)

## Skills

関連するファイルを操作する際は、以下のスキルを使用すること：

| File(s) | Skill |
|---------|-------|
| `README.md` | `/readme` |
| `.github/workflows/*.yml` | `/ci-workflow` |

サブエージェントを生成する際は、常に各スキルの規約をエージェントのプロンプトに渡すこと。
