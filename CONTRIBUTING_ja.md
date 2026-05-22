# Contributing to Everything Claude Code

貢献を検討していただき感謝する！このリポジトリはClaude Codeユーザーのためのコミュニティリソースである。

## Table of Contents

- [What We're Looking For](#what-were-looking-for)
- [Quick Start](#quick-start)
- [Contributing Skills](#contributing-skills)
- [Skill Adaptation Policy](#skill-adaptation-policy)
- [Contributing Agents](#contributing-agents)
- [Contributing Hooks](#contributing-hooks)
- [Contributing Commands](#contributing-commands)
- [MCP and documentation (e.g. Context7)](#mcp-and-documentation-eg-context7)
- [Cross-Harness and Translations](#cross-harness-and-translations)
- [Pull Request Process](#pull-request-process)

---

## What We're Looking For

### Agents
特定のタスクをうまく処理する新しいエージェント:
- 言語固有のレビュアー（Python、Go、Rust）
- フレームワークの専門家（Django、Rails、Laravel、Spring）
- DevOpsスペシャリスト（Kubernetes、Terraform、CI/CD）
- ドメインの専門家（MLパイプライン、データエンジニアリング、モバイル）

### Skills
ワークフローの定義とドメイン知識:
- 言語のベストプラクティス
- フレームワークのパターン
- テスト戦略
- アーキテクチャガイド

### Hooks
有用な自動化:
- linting/formattingのフック
- セキュリティチェック
- 検証フック
- 通知フック

### Commands
有用なワークフローを呼び出すスラッシュコマンド:
- デプロイコマンド
- テストコマンド
- コード生成コマンド

---

## Quick Start

```
# 1. フォークしてクローンする
gh repo fork affaan-m/everything-claude-code --clone
cd everything-claude-code

# 2. ブランチを作成する
git checkout -b feat/my-contribution

# 3. 貢献を追加する（以下のセクションを参照）

# 4. ローカルでテストする
cp -r skills/my-skill ~/.claude/skills/  # スキルの場合
# その後、Claude Codeでテストする

# 5. PRを提出する
git add . && git commit -m "feat: add my-skill" && git push -u origin feat/my-contribution
```
---

## Contributing Skills

スキルは、Claude Codeがコンテキストに基づいて読み込む知識モジュールである。

> **Comprehensive Guide:** 効果的なスキルを作成するための詳細なガイダンスについては、[Skill Development Guide](docs/SKILL-DEVELOPMENT-GUIDE.md)を参照のこと。以下の内容をカバーしている:
> - スキルのアーキテクチャとカテゴリ
> - 例を用いた効果的なコンテンツの記述
> - ベストプラクティスと一般的なパターン
> - テストと検証
> - 完全なサンプルギャラリー

### Directory Structure

```
skills/
└── your-skill-name/
    └── SKILL.md
```

### SKILL.md Template

```markdown
---
name: your-skill-name
description: スキルリストに表示され、自動アクティブ化に使用される簡単な説明
origin: ECC
---

# Your Skill Title

このスキルがカバーする内容の簡単な概要。

## When to Activate

Claudeがこのスキルを使用すべきシナリオを説明する。これは自動アクティブ化にとって重要である。

## Core Concepts

主要なパターンとガイドラインを説明する。

## Code Examples

\`\`\`typescript
// 実用的でテストされた例を含める
function example() {
  // コメントが充実したコード
}
\`\`\`

## Anti-Patterns

例を挙げて、やってはいけないことを示す。

## Best Practices

- 実行可能なガイドライン
- すべきことと、してはいけないこと
- 避けるべき一般的な落とし穴

## Related Skills

補完的なスキルへのリンク（例: `related-skill-1`、`related-skill-2`）。
```

### Skill Categories

| カテゴリ | 目的 | 例 |
|----------|---------|----------|
| **Language Standards** | イディオム、規則、ベストプラクティス | `python-patterns`、`golang-patterns` |
| **Framework Patterns** | フレームワーク固有のガイダンス | `django-patterns`、`nextjs-patterns` |
| **Workflow** | ステップバイステップのプロセス | `tdd-workflow`、`refactoring-workflow` |
| **Domain Knowledge** | 専門的なドメイン | `security-review`、`api-design` |
| **Tool Integration** | ツール/ライブラリの使用法 | `docker-patterns`、`supabase-patterns` |
| **Template** | プロジェクト固有のスキルテンプレート | `docs/examples/project-guidelines-template.md` |

### Skill Adaptation Policy

他のリポジトリ、プラグイン、ハーネス、または個人のプロンプトパックからアイデアを移植する場合は、PRをオープンする前に[Skill Adaptation Policy](docs/skill-adaptation-policy.md)を読んでほしい。

短いバージョン:

- 外部製品のアイデンティティではなく、基となるアイデアをコピーすること
- ECCがサーフェスを実質的に変更または拡張する場合は、スキルの名前を変更すること
- 新しいデフォルトのサードパーティ依存関係よりも、ECCネイティブのルール、スキル、スクリプト、およびMCPを優先すること
- 主な価値が未検証のパッケージをインストールするようユーザーに指示することであるスキルを出荷しないこと

### Skill Checklist

- [ ] 1つのドメイン/テクノロジーに焦点を当てている（広範すぎないこと）
- [ ] 自動アクティブ化のための「When to Activate」セクションが含まれている
- [ ] 実用的でコピペ可能なコード例が含まれている
- [ ] アンチパターン（やってはいけないこと）が示されている
- [ ] 500行未満である（最大800行）
- [ ] 明確なセクションヘッダーが使用されている
- [ ] Claude Codeでテストされている
- [ ] 関連するスキルへのリンクがある
- [ ] 機密データ（APIキー、トークン、パス）が含まれていない
- [ ] フロントマターの `name:` がディレクトリ名と一致している
- [ ] フロントマターの `description:` がインライン文字列または折り畳まれた（`>`）スカラーであること。フラットテーブルのレンダラーを壊す内部の改行を保持するリテラルブロック（`|`、`|-`、または `|+`）ではないこと

### Example Skills

| スキル | カテゴリ | 目的 |
|-------|----------|---------|
| `coding-standards/` | Language Standards | TypeScript/JavaScriptパターン |
| `frontend-patterns/` | Framework Patterns | ReactおよびNext.jsのベストプラクティス |
| `backend-patterns/` | Framework Patterns | APIおよびデータベースパターン |
| `security-review/` | Domain Knowledge | セキュリティチェックリスト |
| `tdd-workflow/` | Workflow | テスト駆動開発プロセス |
| `docs/examples/project-guidelines-template.md` | Template | プロジェクト固有のスキルテンプレート |

---
## Contributing Agents

エージェントは、Taskツールを介して呼び出される特化型アシスタントである。

### File Location

```
agents/your-agent-name.md
```

### Agent Template

```markdown
---
name: your-agent-name
description: このエージェントが何を行い、Claudeがいつそれを呼び出すべきか。具体的に！
tools: ["Read", "Write", "Edit", "Bash", "Grep", "Glob"]
model: sonnet
---

あなたは [role] のスペシャリストである。

## Your Role

- 主な責任
- 副次的な責任
- あなたが行わないこと（境界）

## Workflow

### Step 1: Understand
タスクにどのようにアプローチするか。

### Step 2: Execute
どのように作業を実行するか。

### Step 3: Verify
どのように結果を検証するか。

## Output Format

ユーザーに何を返すか。

## Examples

### Example: [Scenario]
Input: [ユーザーが提供するもの]
Action: [あなたがすること]
Output: [あなたが返すもの]
```

### Agent Fields

| フィールド | 説明 | オプション |
|-------|-------------|---------|
| `name` | 小文字、ハイフン区切り | `code-reviewer` |
| `description` | いつ呼び出すかを決定するために使用される | 具体的に！ |
| `tools` | 必要なもののみ | `Read, Write, Edit, Bash, Grep, Glob, WebFetch, Task`、またはエージェントがMCPを使用する場合はMCPツール名（例: `mcp__context7__resolve-library-id`、`mcp__context7__query-docs`） |
| `model` | 複雑さのレベル | `haiku` (単純)、`sonnet` (コーディング)、`opus` (複雑) |

### Example Agents

| エージェント | 目的 |
|-------|---------|
| `tdd-guide.md` | テスト駆動開発 |
| `code-reviewer.md` | コードレビュー |
| `security-reviewer.md` | セキュリティスキャン |
| `build-error-resolver.md` | ビルドエラーの修正 |

---

## Contributing Hooks

フックは、Claude Codeのイベントによってトリガーされる自動化された動作である。

### File Location

```
hooks/hooks.json
```

### Hook Types

| タイプ | トリガー | ユースケース |
|------|---------|----------|
| `PreToolUse` | ツールが実行される前 | 検証、警告、ブロック |
| `PostToolUse` | ツールが実行された後 | フォーマット、チェック、通知 |
| `SessionStart` | セッション開始時 | コンテキストの読み込み |
| `Stop` | セッション終了時 | クリーンアップ、監査 |

### Hook Format

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "tool == \"Bash\" && tool_input.command matches \"rm -rf /\"",
        "hooks": [
          {
            "type": "command",
            "command": "echo '[Hook] BLOCKED: Dangerous command' && exit 1"
          }
        ],
        "description": "Block dangerous rm commands"
      }
    ]
  }
}
```

### Matcher Syntax

```javascript
// 特定のツールにマッチ
tool == "Bash"
tool == "Edit"
tool == "Write"

// 入力パターンにマッチ
tool_input.command matches "npm install"
tool_input.file_path matches "\\.tsx?$"

// 条件の組み合わせ
tool == "Bash" && tool_input.command matches "git push"
```

### Hook Examples

```json
// tmux外の開発サーバーをブロック
{
  "matcher": "tool == \"Bash\" && tool_input.command matches \"npm run dev\"",
  "hooks": [{"type": "command", "command": "echo 'Use tmux for dev servers' && exit 1"}],
  "description": "Ensure dev servers run in tmux"
}

// TypeScript編集後の自動フォーマット
{
  "matcher": "tool == \"Edit\" && tool_input.file_path matches \"\\.tsx?$\"",
  "hooks": [{"type": "command", "command": "npx prettier --write \"$file_path\""}],
  "description": "Format TypeScript files after edit"
}

// git push前の警告
{
  "matcher": "tool == \"Bash\" && tool_input.command matches \"git push\"",
  "hooks": [{"type": "command", "command": "echo '[Hook] Review changes before pushing'"}],
  "description": "Reminder to review before push"
}
```

### Hook Checklist

- [ ] マッチャーが具体的である（広範すぎない）
- [ ] 明確なエラー/情報メッセージが含まれている
- [ ] 正しい終了コードが使用されている（`exit 1`はブロック、`exit 0`は許可）
- [ ] 徹底的にテストされている
- [ ] 説明がある

---
## Contributing Commands

コマンドは、`/command-name` でユーザーが呼び出すアクションである。

### File Location

```
commands/your-command.md
```

### Command Template

```markdown
---
description: /helpに表示される簡単な説明
---

# Command Name

## Purpose

このコマンドが何を行うか。

## Usage

\`\`\`
/your-command [args]
\`\`\`

## Workflow

1. 最初のステップ
2. 2番目のステップ
3. 最後のステップ

## Output

ユーザーが受け取るもの。
```

### Example Commands

| コマンド | 目的 |
|---------|---------|
| `commit.md` | gitコミットを作成する |
| `code-review.md` | コードの変更をレビューする |
| `tdd.md` | TDDワークフロー |
| `e2e.md` | E2Eテスト |

---

## MCP and documentation (e.g. Context7)

スキルとエージェントは、トレーニングデータのみに依存するのではなく、**MCP（Model Context Protocol）**ツールを使用して最新のデータを取り込むことができる。これはドキュメントにとって特に有用である。

- **Context7**は、`resolve-library-id` と `query-docs` を公開するMCPサーバーである。ユーザーがライブラリ、フレームワーク、またはAPIについて尋ねたときに、回答に現在のドキュメントとコード例が反映されるようにこれを使用する。
- ライブドキュメント（例: セットアップ、APIの使用法）に依存する**スキル**を提供する場合は、関連するMCPツールの使用方法（例: ライブラリIDを解決し、次にドキュメントを照会する）を説明し、パターンとして `documentation-lookup` スキルまたはContext7を指し示すこと。
- ドキュメント/APIの質問に答える**エージェント**を提供する場合は、エージェントのツールにContext7 MCPツール名（例: `mcp__context7__resolve-library-id`、`mcp__context7__query-docs`）を含め、解決 → 照会ワークフローを文書化すること。
- **mcp-configs/mcp-servers.json** にはContext7のエントリが含まれている。ユーザーは、自身のハーネス（例: Claude Code、Cursor）でそれを有効にし、`documentation-lookup` スキル（`skills/documentation-lookup/` にある）と `/docs` コマンドを使用する。

---

## Cross-Harness and Translations

### Skill subsets (Codex and Cursor)

ECCは、他のハーネス用にスキルのサブセットを出荷する:

- **Codex:** `.agents/skills/` — `agents/openai.yaml` にリストされているスキルはCodexによって読み込まれる。
- **Cursor:** `.cursor/skills/` — スキルのサブセットがCursor用にバンドルされている。

CodexまたはCursorで利用可能であるべき**新しいスキルを追加する**場合:

1. いつも通り `skills/your-skill-name/` の下にスキルを追加する。
2. それが**Codex**で利用可能であるべき場合は、それを `.agents/skills/` に追加し（スキルディレクトリをコピーするか参照を追加する）、必要に応じて `agents/openai.yaml` で参照されていることを確認する。
3. それが**Cursor**で利用可能であるべき場合は、Cursorのレイアウトに従って `.cursor/skills/` の下に追加する。

期待される構造については、これらのディレクトリ内の既存のスキルを確認してほしい。これらのサブセットを同期させておくのは手動の作業である。更新した場合はPRにその旨を記載すること。

### Translations

翻訳は `docs/`（例: `docs/zh-CN`、`docs/zh-TW`、`docs/ja-JP`）の下にある。翻訳されているエージェント、コマンド、またはスキルを変更する場合は、対応する翻訳ファイルを更新するか、メンテナや翻訳者が更新できるようにissueをオープンすることを検討してほしい。

---

## Pull Request Process

### 1. PR Title Format

```
feat(skills): add rust-patterns skill
feat(agents): add api-designer agent
feat(hooks): add auto-format hook
fix(skills): update React patterns
docs: improve contributing guide
```

### 2. PR Description

```markdown
## Summary
何を追加し、なぜ追加するのか。

## Type
- [ ] Skill
- [ ] Agent
- [ ] Hook
- [ ] Command

## Testing
これをどのようにテストしたか。

## Checklist
- [ ] フォーマットガイドラインに従っている
- [ ] Claude Codeでテストされている
- [ ] 機密情報（APIキー、パス）が含まれていない
- [ ] 明確な説明がある
```

### 3. Review Process

1. メンテナが48時間以内にレビューする
2. 要求された場合はフィードバックに対処する
3. 承認されると、mainにマージされる

---

## Guidelines

### Do
- 貢献は焦点を絞り、モジュール化しておく
- 明確な説明を含める
- 提出する前にテストする
- 既存のパターンに従う
- 依存関係を文書化する

### Don't
- 機密データ（APIキー、トークン、パス）を含める
- 過度に複雑またはニッチな設定を追加する
- テストされていない貢献を提出する
- 既存の機能の重複を作成する

---

## File Naming

- 小文字でハイフンを使用する: `python-reviewer.md`
- 記述的にする: `workflow.md` ではなく `tdd-workflow.md`
- 名前をファイル名と一致させる

---

## Questions?

- **Issues:** [github.com/affaan-m/everything-claude-code/issues](https://github.com/affaan-m/everything-claude-code/issues)
- **X/Twitter:** [@affaanmustafa](https://x.com/affaanmustafa)

---

貢献していただき感謝する！素晴らしいリソースを一緒に構築しよう。
