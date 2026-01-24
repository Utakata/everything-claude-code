# Everything Claude Code への貢献

貢献を検討していただき感謝する。このリポジトリはClaude Codeユーザーのためのコミュニティリソースとなることを意図している。

## 求めているもの

### Agents (エージェント)

特定のタスクをうまく処理する新しいAgent：
- 言語固有のレビュアー (Python, Go, Rust)
- フレームワークのエキスパート (Django, Rails, Laravel, Spring)
- DevOpsスペシャリスト (Kubernetes, Terraform, CI/CD)
- ドメインエキスパート (MLパイプライン, データエンジニアリング, モバイル)

### Skills (スキル)

ワークフロー定義とドメイン知識：
- 言語のベストプラクティス
- フレームワークのパターン
- テスト戦略
- アーキテクチャガイド
- ドメイン固有知識

### Commands (コマンド)

有用なワークフローを呼び出すスラッシュコマンド：
- デプロイメントコマンド
- テストコマンド
- ドキュメントコマンド
- コード生成コマンド

### Hooks (フック)

有用な自動化：
- リンティング/フォーマットHook
- セキュリティチェック
- バリデーションHook
- 通知Hook

### Rules (ルール)

常に従うべきガイドライン：
- セキュリティルール
- コードスタイルルール
- テスト要件
- 命名規則

### MCP Configurations (MCP設定)

新規または改善されたMCPサーバー設定：
- データベース統合
- クラウドプロバイダーMCP
- モニタリングツール
- コミュニケーションツール

---

## 貢献方法

### 1. リポジトリをフォークする

```bash
git clone https://github.com/YOUR_USERNAME/everything-claude-code.git
cd everything-claude-code
```

### 2. ブランチを作成する

```bash
git checkout -b add-python-reviewer
```

### 3. 貢献内容を追加する

適切なディレクトリにファイルを配置する：
- 新しいAgentは `agents/` へ
- Skillは `skills/` へ (単一の.mdファイルまたはディレクトリ)
- スラッシュコマンドは `commands/` へ
- ルールファイルは `rules/` へ
- Hook設定は `hooks/` へ
- MCPサーバー設定は `mcp-configs/` へ

### 4. フォーマットに従う

**Agent** はフロントマターを持つ必要がある：

```markdown
---
name: agent-name
description: What it does
tools: Read, Grep, Glob, Bash
model: sonnet
---

Instructions here...
```

**Skill** は明確で実行可能である必要がある：

```markdown
# Skill Name

## When to Use

...

## How It Works

...

## Examples

...
```

**Command** は何をするものか説明する必要がある：

```markdown
---
description: Brief description of command
---

# Command Name

Detailed instructions...
```

**Hook** は説明を含む必要がある：

```json
{
  "matcher": "...",
  "hooks": [...],
  "description": "What this hook does"
}
```

### 5. 貢献内容をテストする

提出する前に、設定がClaude Codeで動作することを確認する。

### 6. PRを提出する

```bash
git add .
git commit -m "Add Python code reviewer agent"
git push origin add-python-reviewer
```

その後、以下の内容を含めてPRをオープンする：
- 追加したもの
- それが有用である理由
- テスト方法

---

## ガイドライン

### 行うべきこと (Do)

- 設定は焦点を絞り、モジュール化する
- 明確な説明を含める
- 提出前にテストする
- 既存のパターンに従う
- 依存関係があれば文書化する

### 行ってはいけないこと (Don't)

- 機密データ (APIキー、トークン、パス) を含める
- 過度に複雑またはニッチな設定を追加する
- 未テストの設定を提出する
- 重複する機能を作成する
- 代替手段のない特定の有料サービスを必要とする設定を追加する

---

## ファイル命名規則

- 小文字とハイフンを使用する：`python-reviewer.md`
- 説明的な名前にする：`workflow.md` ではなく `tdd-workflow.md`
- Agent/Skill名をファイル名と一致させる

---

## 質問がある場合

Issueをオープンするか、Xで連絡してほしい：[@affaanmustafa](https://x.com/affaanmustafa)

---

貢献に感謝する。一緒に素晴らしいリソースを作り上げよう。
