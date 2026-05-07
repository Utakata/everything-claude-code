# CLAUDE.md

本ファイルは、このリポジトリのコードを扱う際のClaude Code (claude.ai/code)に対するガイダンスを提供する。

## プロジェクト概要

これは**Claude Code plugin**であり、本番環境で利用可能なagents、skills、hooks、commands、rules、およびMCP configurationsのコレクションである。本プロジェクトは、Claude Codeを使用したソフトウェア開発のための、実戦でテストされたワークフローを提供する。

## テストの実行

```bash
# Run all tests
node tests/run-all.js

# Run individual test files
node tests/lib/utils.test.js
node tests/lib/package-manager.test.js
node tests/hooks/hooks.test.js
```

## アーキテクチャ

プロジェクトはいくつかのコアコンポーネントで構成されている：

- **agents/** - 委譲のための専門的なサブエージェント（planner、code-reviewer、tdd-guideなど）
- **skills/** - ワークフローの定義とドメイン知識（coding standards、patterns、testing）
- **commands/** - ユーザーによって呼び出されるスラッシュコマンド（/tdd、/plan、/e2eなど）
- **hooks/** - トリガーベースの自動化（セッションの永続化、ツール実行前/後のフック）
- **rules/** - 常に従うべきガイドライン（security、coding style、testing requirements）
- **mcp-configs/** - 外部統合のためのMCP serverの設定
- **scripts/** - hooksやセットアップのためのクロスプラットフォームなNode.jsユーティリティ
- **tests/** - スクリプトやユーティリティのためのテストスイート

## 主要なコマンド

- `/tdd` - テスト駆動開発（Test-driven development）のワークフロー
- `/plan` - 実装の計画
- `/e2e` - E2Eテストの生成と実行
- `/code-review` - 品質のレビュー
- `/build-fix` - ビルドエラーの修正
- `/learn` - セッションからのパターンの抽出
- `/skill-create` - Gitの履歴からのskillsの生成

## 開発ノート

- パッケージマネージャーの検出：npm、pnpm、yarn、bun（環境変数`CLAUDE_PACKAGE_MANAGER`またはプロジェクト設定で設定可能）
- クロスプラットフォーム：Node.jsスクリプトによるWindows、macOS、Linuxのサポート
- Agentのフォーマット：YAMLフロントマター（name、description、tools、model）を含むMarkdown
- Skillのフォーマット：When to Use、How It Works、Examplesの明確なセクションを持つMarkdown
- Skillの配置場所：`skills/`でキュレーションされる。生成またはインポートされたものは`~/.claude/skills/`以下に配置される。`docs/SKILL-PLACEMENT-POLICY.md`を参照すること。
- Hookのフォーマット：マッチャーの条件とコマンド/通知のフックを含むJSON

## コントリビューション

`CONTRIBUTING.md`のフォーマットに従うこと：
- Agents：フロントマター（name、description、tools、model）を含むMarkdown
- Skills：明確なセクション（When to Use、How It Works、Examples）
- Commands：descriptionのフロントマターを含むMarkdown
- Hooks：マッチャーとフックの配列を含むJSON

ファイルの命名：ハイフン区切りの小文字（例：`python-reviewer.md`、`tdd-workflow.md`）

## Skills

関連するファイルを扱う際は、以下のskillsを使用すること：

| File(s) | Skill |
|---------|-------|
| `README.md` | `/readme` |
| `.github/workflows/*.yml` | `/ci-workflow` |

サブエージェントを生成する際は、常にそれぞれのskillの規約をエージェントのプロンプトに渡すこと。
