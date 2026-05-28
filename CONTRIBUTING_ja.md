# Everything Claude Code (ECC) への貢献 (Contributing)

Everything Claude Code への貢献にご関心をお寄せいただき、ありがとうございます！このプロジェクトは、Claude Code 用の本番環境対応のエージェント、スキル、フック、およびコマンドのコミュニティ主導のコレクションである。

以下は、これらのコンポーネントを追加または変更する方法のガイドである。

## 目次 (Table of Contents)

1. [スキルへの貢献 (Contributing Skills)](#contributing-skills)
2. [エージェントへの貢献 (Contributing Agents)](#contributing-agents)
3. [フックへの貢献 (Contributing Hooks)](#contributing-hooks)
4. [コマンドへの貢献 (Contributing Commands)](#contributing-commands)
5. [MCPとドキュメント (MCP and documentation)](#mcp-and-documentation-eg-context7)
6. [クロスハーネスと翻訳 (Cross-Harness and Translations)](#cross-harness-and-translations)
7. [プルリクエストプロセス (Pull Request Process)](#pull-request-process)
8. [ガイドライン (Guidelines)](#guidelines)

---

## スキルへの貢献 (Contributing Skills)

スキルは、Claude Code がいつ、どのように特定のタスクを実行するかを定義するプロンプトである。

### ファイルの場所 (File Location)

```
skills/your-skill-name/SKILL.md
```

### スキルテンプレート (Skill Template)

```markdown
---
name: your-skill-name
description: Brief, 1-sentence description of the skill and when to use it
---

# Your Skill Name

## Purpose
What this skill does and why it exists.

## When to Activate
Tell Claude explicitly when to use this skill. Be specific.

- When the user asks to...
- When you see files like...
- When you encounter errors like...

## How it Works
Explain the step-by-step process.

1. **Step 1:** Do this
2. **Step 2:** Do that

## Rules
- **DO:** Best practices
- **DON'T:** Anti-patterns to avoid

## Examples

### Good Example
```code
// Example of the right way
```

### Bad Example
```code
// Example of the wrong way
```
```

### スキルのカテゴリ (Skill Categories)

| Category | Example Content | Example Directory |
|----------|-----------------|-------------------|
| **Language Standards** | Python/Go/TS rules | `coding-standards/` |
| **Framework Patterns** | React/Django/Rails | `frontend-patterns/`, `django-patterns/` |
| **Workflow** | TDD, CI/CD, Deployment | `tdd-workflow/` |
| **Domain Knowledge** | Security, Accessibility | `security-review/`, `system-design` |
| **Tool Integration** | Tool/library usage | `docker-patterns`, `supabase-patterns` |
| **Template** | Project-specific skill templates | `docs/examples/project-guidelines-template.md` |

### スキル適応ポリシー (Skill Adaptation Policy)

他のリポジトリ、プラグイン、ハーネス、または個人的なプロンプトパックからアイデアを移植する場合は、PR を開く前に [Skill Adaptation Policy](docs/skill-adaptation-policy.md) を読むこと。

要約：

- 外部プロダクトのアイデンティティではなく、基礎となるアイデアをコピーする
- ECC が表面を実質的に変更または拡張する場合は、スキルの名前を変更する
- 新しいデフォルトのサードパーティ依存関係よりも、ECC ネイティブのルール、スキル、スクリプト、および MCP を優先する
- ユーザーに未審査のパッケージのインストールを指示することが主な価値であるスキルを出荷しない

### スキルチェックリスト (Skill Checklist)

- [ ] 1つのドメイン/テクノロジーに焦点を当てている（広すぎない）
- [ ] 自動アクティベーションのための「When to Activate」セクションが含まれている
- [ ] 実用的でコピー＆ペースト可能なコード例が含まれている
- [ ] アンチパターン（やってはいけないこと）が示されている
- [ ] 500行未満（最大800行）
- [ ] 明確なセクションヘッダーが使用されている
- [ ] Claude Code でテスト済みである
- [ ] 関連するスキルへのリンクがある
- [ ] 機密データ（APIキー、トークン、パス）が含まれていない
- [ ] フロントマターの `name:` がディレクトリ名と一致している
- [ ] フロントマターの `description:` はインライン文字列または折りたたまれた（`>`）スカラーであり、内部の改行を保持し、フラットなテーブルレンダラーを壊すリテラルブロック（`|`, `|-`, または `|+`）ではない

### スキルの例 (Example Skills)

| Skill | Category | Purpose |
|-------|----------|---------|
| `coding-standards/` | Language Standards | TypeScript/JavaScript patterns |
| `frontend-patterns/` | Framework Patterns | React and Next.js best practices |
| `backend-patterns/` | Framework Patterns | API and database patterns |
| `security-review/` | Domain Knowledge | Security checklist |
| `tdd-workflow/` | Workflow | Test-driven development process |
| `docs/examples/project-guidelines-template.md` | Template | Project-specific skill template |

---

## エージェントへの貢献 (Contributing Agents)

エージェントは、Task ツールを介して呼び出される特化型の機能アシスタントである。

### ファイルの場所 (File Location)

```
agents/your-agent-name.md
```

### エージェントテンプレート (Agent Template)

```markdown
---
name: your-agent-name
description: What this agent does and when Claude should invoke it. Be specific!
tools: ["Read", "Write", "Edit", "Bash", "Grep", "Glob"]
model: sonnet
---

You are a [role] specialist.

## Your Role

- Primary responsibility
- Secondary responsibility
- What you DO NOT do (boundaries)

## Workflow

### Step 1: Understand
How you approach the task.

### Step 2: Execute
How you perform the work.

### Step 3: Verify
How you validate results.

## Output Format

What you return to the user.

## Examples

### Example: [Scenario]
Input: [what user provides]
Action: [what you do]
Output: [what you return]
```

### エージェントのフィールド (Agent Fields)

| Field | Description | Options |
|-------|-------------|---------|
| `name` | Lowercase, hyphenated | `code-reviewer` |
| `description` | Used to decide when to invoke | Be specific! |
| `tools` | Only what's needed | `Read, Write, Edit, Bash, Grep, Glob, WebFetch, Task`、またはエージェントが MCP を使用する場合は MCP ツール名（例：`mcp__context7__resolve-library-id`, `mcp__context7__query-docs`） |
| `model` | Complexity level | `haiku` (simple), `sonnet` (coding), `opus` (complex) |

### エージェントの例 (Example Agents)

| Agent | Purpose |
|-------|---------|
| `tdd-guide.md` | Test-driven development |
| `code-reviewer.md` | Code review |
| `security-reviewer.md` | Security scanning |
| `build-error-resolver.md` | Fix build errors |

---

## フックへの貢献 (Contributing Hooks)

フックは、Claude Code のイベントによってトリガーされる自動化された動作である。

### ファイルの場所 (File Location)

```
hooks/hooks.json
```

### フックの種類 (Hook Types)

| Type | Trigger | Use Case |
|------|---------|----------|
| `PreToolUse` | Before tool runs | Validate, warn, block |
| `PostToolUse` | After tool runs | Format, check, notify |
| `SessionStart` | Session begins | Load context |
| `Stop` | Session ends | Cleanup, audit |

### フックのフォーマット (Hook Format)

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

### マッチャーの構文 (Matcher Syntax)

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

### フックの例 (Hook Examples)

```json
// tmuxの外部での開発サーバーをブロックする
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

// git push 前の警告
{
  "matcher": "tool == \"Bash\" && tool_input.command matches \"git push\"",
  "hooks": [{"type": "command", "command": "echo '[Hook] Review changes before pushing'"}],
  "description": "Reminder to review before push"
}
```

### フックチェックリスト (Hook Checklist)

- [ ] マッチャーが具体的である（広すぎない）
- [ ] 明確なエラー/情報メッセージが含まれている
- [ ] 正しい終了コード（ブロックの場合は `exit 1`、許可の場合は `exit 0`）が使用されている
- [ ] 徹底的にテストされている
- [ ] description がある

---

## コマンドへの貢献 (Contributing Commands)

コマンドは、`/command-name` でユーザーが呼び出すアクションである。

### ファイルの場所 (File Location)

```
commands/your-command.md
```

### コマンドテンプレート (Command Template)

```markdown
---
description: Brief description shown in /help
---

# Command Name

## Purpose

What this command does.

## Usage

\`\`\`
/your-command [args]
\`\`\`

## Workflow

1. First step
2. Second step
3. Final step

## Output

What the user receives.
```

### コマンドの例 (Example Commands)

| Command | Purpose |
|---------|---------|
| `commit.md` | Create git commits |
| `code-review.md` | Review code changes |
| `tdd.md` | TDD workflow |
| `e2e.md` | E2E testing |

---

## MCPとドキュメント（例：Context7） (MCP and documentation)

スキルとエージェントは、トレーニングデータのみに依存するのではなく、**MCP (Model Context Protocol)** ツールを使用して最新のデータを取り込むことができる。これは、ドキュメントに特に役立つ。

- **Context7** は、`resolve-library-id` と `query-docs` を公開する MCP サーバーである。ユーザーがライブラリ、フレームワーク、または API について質問したときに、回答が最新のドキュメントとコード例を反映するように使用する。
- ライブドキュメント（セットアップ、API の使用など）に依存する**スキル**を貢献する場合は、関連する MCP ツールを使用する方法（例：ライブラリ ID を解決してからドキュメントを照会する）を説明し、パターンとして `documentation-lookup` スキルまたは Context7 を参照するようにする。
- ドキュメント/API の質問に答える**エージェント**を貢献する場合は、エージェントの tools に Context7 MCP ツール名（例：`mcp__context7__resolve-library-id`, `mcp__context7__query-docs`）を含め、解決 → 照会ワークフローをドキュメント化する。
- **mcp-configs/mcp-servers.json** には Context7 のエントリが含まれている。ユーザーはハーネス（Claude Code、Cursor など）でこれを有効にし、documentation-lookup スキル（`skills/documentation-lookup/` 内）と `/docs` コマンドを使用する。

---

## クロスハーネスと翻訳 (Cross-Harness and Translations)

### スキルのサブセット (Skill subsets for Codex and Cursor)

ECC は他のハーネス向けのスキルのサブセットを出荷している:

- **Codex:** `.agents/skills/` — `agents/openai.yaml` にリストされているスキルは Codex によって読み込まれる。
- **Cursor:** `.cursor/skills/` — スキルのサブセットが Cursor 用にバンドルされている。

Codex または Cursor で利用可能にすべき**新しいスキルを追加**する場合:

1. 通常通り `skills/your-skill-name/` の下にスキルを追加する。
2. **Codex** で利用可能にすべき場合は、それを `.agents/skills/` に追加し（スキルディレクトリをコピーするか参照を追加）、必要に応じて `agents/openai.yaml` で参照されていることを確認する。
3. **Cursor** で利用可能にすべき場合は、Cursor のレイアウトに従って `.cursor/skills/` の下に追加する。

期待される構造については、これらのディレクトリ内の既存のスキルを確認すること。これらのサブセットの同期を維持するのは手動である。これらを更新した場合は、PR で言及すること。

### 翻訳 (Translations)

翻訳は `docs/`（例：`docs/zh-CN`, `docs/zh-TW`, `docs/ja-JP`）の下に配置される。翻訳されているエージェント、コマンド、またはスキルを変更した場合は、メンテナまたは翻訳者が更新できるように、対応する翻訳ファイルを更新するか、Issue を開くことを検討すること。

---

## プルリクエストプロセス (Pull Request Process)

### 1. PR タイトルのフォーマット (PR Title Format)

```
feat(skills): add rust-patterns skill
feat(agents): add api-designer agent
feat(hooks): add auto-format hook
fix(skills): update React patterns
docs: improve contributing guide
```

### 2. PR の説明 (PR Description)

```markdown
## Summary
What you're adding and why.

## Type
- [ ] Skill
- [ ] Agent
- [ ] Hook
- [ ] Command

## Testing
How you tested this.

## Checklist
- [ ] Follows format guidelines
- [ ] Tested with Claude Code
- [ ] No sensitive info (API keys, paths)
- [ ] Clear descriptions
```

### 3. レビュープロセス (Review Process)

1. メンテナは48時間以内にレビューする
2. 要求された場合はフィードバックに対応する
3. 承認されると、main にマージされる

---

## ガイドライン (Guidelines)

### やるべきこと (Do)
- 貢献を焦点を絞ったモジュール式に保つ
- 明確な説明を含める
- 提出する前にテストする
- 既存のパターンに従う
- 依存関係をドキュメント化する

### やってはいけないこと (Don't)
- 機密データ（APIキー、トークン、パス）を含める
- 過度に複雑またはニッチな構成を追加する
- 未テストの貢献を提出する
- 既存の機能の複製を作成する

---

## ファイルの命名 (File Naming)

- ハイフン付きの小文字を使用する: `python-reviewer.md`
- わかりやすい名前にする: `workflow.md` ではなく `tdd-workflow.md`
- 名前をファイル名と一致させる

---

## 質問がありますか？ (Questions?)

- **Issues:** [github.com/affaan-m/everything-claude-code/issues](https://github.com/affaan-m/everything-claude-code/issues)
- **X/Twitter:** [@affaanmustafa](https://x.com/affaanmustafa)

---

貢献していただきありがとうございます！一緒に素晴らしいリソースを構築しましょう。