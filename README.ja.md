# Everything Claude Code

**Anthropicハッカソン優勝者によるClaude Code設定の完全コレクション**

10ヶ月以上にわたる実際のプロダクト開発における集中的な日常利用を通じて進化した、本番環境対応のAgent、Skill、Hook、Command、Rule、およびMCP設定である。

---

## ガイド

このリポジトリは生のコードのみを含んでいる。詳細についてはガイドを参照されたい。

### まずはここから：短縮版ガイド（Shorthand Guide）

<img width="592" height="445" alt="image" src="https://github.com/user-attachments/assets/1a471488-59cc-425b-8345-5245c7efbcef" />

**[The Shorthand Guide to Everything Claude Code](https://x.com/affaanmustafa/status/2012378465664745795)**

基礎編 - 各設定タイプの機能、セットアップの構造、コンテキストウィンドウの管理、そしてこれらの設定の背後にある哲学について解説している。**最初にこれを読むこと。**

---

### 次に：長編ガイド（Longform Guide）

<img width="609" height="428" alt="image" src="https://github.com/user-attachments/assets/c9ca43bc-b149-427f-b551-af6840c368f0" />

**[The Longform Guide to Everything Claude Code](https://x.com/affaanmustafa/status/2014040193557471352)**

応用テクニック編 - トークン最適化、セッション間のメモリ永続化、検証ループと評価（evals）、並列化戦略、サブエージェントのオーケストレーション、そして継続的学習について解説している。このガイドに含まれるすべてが、本リポジトリの実用コードとして提供されている。

| トピック | 学べる内容 |
|-------|-------------------|
| トークン最適化 | モデル選定、システムプロンプトの軽量化、バックグラウンドプロセス |
| メモリの永続化 | セッション間でコンテキストを自動的に保存/ロードするHook |
| 継続的学習 | セッションからパターンを自動抽出し再利用可能なSkillへ変換 |
| 検証ループ | チェックポイントと継続的な評価、採点者のタイプ、pass@kメトリクス |
| 並列化 | Git worktree、カスケード方式、インスタンスのスケーリング時期 |
| サブエージェントのオーケストレーション | コンテキスト問題、反復的な検索パターン |


---

## 内容物

```
everything-claude-code/
|-- agents/           # 委任専用のサブエージェント
|   |-- planner.md           # 機能実装の計画
|   |-- architect.md         # システム設計の決定
|   |-- tdd-guide.md         # テスト駆動開発
|   |-- code-reviewer.md     # 品質とセキュリティのレビュー
|   |-- security-reviewer.md # 脆弱性分析
|   |-- build-error-resolver.md
|   |-- e2e-runner.md        # Playwright E2Eテスト
|   |-- refactor-cleaner.md  # デッドコードの削除
|   |-- doc-updater.md       # ドキュメントの同期
|
|-- skills/           # ワークフロー定義とドメイン知識
|   |-- coding-standards.md         # 言語のベストプラクティス
|   |-- backend-patterns.md         # API、データベース、キャッシュパターン
|   |-- frontend-patterns.md        # React、Next.jsパターン
|   |-- continuous-learning/        # セッションからの自動パターン抽出 (Longform Guide)
|   |-- strategic-compact/          # 手動圧縮の提案 (Longform Guide)
|   |-- tdd-workflow/               # TDD手法
|   |-- security-review/            # セキュリティチェックリスト
|
|-- commands/         # 素早い実行のためのスラッシュコマンド
|   |-- tdd.md              # /tdd - テスト駆動開発
|   |-- plan.md             # /plan - 実装計画
|   |-- e2e.md              # /e2e - E2Eテスト生成
|   |-- code-review.md      # /code-review - 品質レビュー
|   |-- build-fix.md        # /build-fix - ビルドエラー修正
|   |-- refactor-clean.md   # /refactor-clean - デッドコード削除
|   |-- learn.md            # /learn - セッション中盤でのパターン抽出 (Longform Guide)
|
|-- rules/            # 常に従うべきガイドライン
|   |-- security.md         # 必須のセキュリティチェック
|   |-- coding-style.md     # 不変性、ファイル構成
|   |-- testing.md          # TDD、80%のカバレッジ要件
|   |-- git-workflow.md     # コミット形式、PRプロセス
|   |-- agents.md           # サブエージェントへの委任タイミング
|   |-- performance.md      # モデル選定、コンテキスト管理
|
|-- hooks/            # トリガーベースの自動化
|   |-- hooks.json                # 全Hook設定 (PreToolUse, PostToolUse, Stopなど)
|   |-- memory-persistence/       # セッションライフサイクルHook (Longform Guide)
|   |   |-- pre-compact.sh        # 圧縮前の状態保存
|   |   |-- session-start.sh      # 前回のコンテキスト読み込み
|   |   |-- session-end.sh        # 終了時の学習内容の永続化
|   |-- strategic-compact/        # 圧縮の提案 (Longform Guide)
|
|-- contexts/         # 動的なシステムプロンプト注入コンテキスト (Longform Guide)
|   |-- dev.md              # 開発モードコンテキスト
|   |-- review.md           # コードレビューモードコンテキスト
|   |-- research.md         # リサーチ/探索モードコンテキスト
|
|-- examples/         # 設定例とセッション
|   |-- CLAUDE.md           # プロジェクトレベルの設定例
|   |-- user-CLAUDE.md      # ユーザーレベルの設定例
|   |-- sessions/           # セッションログファイルの例 (Longform Guide)
|
|-- mcp-configs/      # MCPサーバー設定
|   |-- mcp-servers.json    # GitHub, Supabase, Vercel, Railwayなど
|
|-- plugins/          # プラグインエコシステムドキュメント
    |-- README.md           # プラグイン、マーケットプレイス、スキルガイド
```

---

## クイックスタート

### 1. 必要なものをコピーする

```bash
# リポジトリをクローン
git clone https://github.com/affaan-m/everything-claude-code.git

# AgentをClaude設定にコピー
cp everything-claude-code/agents/*.md ~/.claude/agents/

# Ruleをコピー
cp everything-claude-code/rules/*.md ~/.claude/rules/

# Commandをコピー
cp everything-claude-code/commands/*.md ~/.claude/commands/

# Skillをコピー
cp -r everything-claude-code/skills/* ~/.claude/skills/
```

### 2. settings.jsonにHookを追加する

`hooks/hooks.json` から `~/.claude/settings.json` にHookをコピーする。

### 3. MCPを設定する

`mcp-configs/mcp-servers.json` から必要なMCPサーバーを `~/.claude.json` にコピーする。

**重要:** `YOUR_*_HERE` プレースホルダーを実際のAPIキーに置き換えること。

### 4. ガイドを読む

真面目な話、ガイドを読むことを強く推奨する。コンテキストを理解することで、これらの設定の意味が10倍深く理解できる。

1. **[短縮版ガイド（Shorthand Guide）](https://x.com/affaanmustafa/status/2012378465664745795)** - セットアップと基礎
2. **[長編ガイド（Longform Guide）](https://x.com/affaanmustafa/status/2014040193557471352)** - 応用テクニック (トークン最適化、メモリ永続化、評価、並列化)

---

## 主要概念

### Agents (エージェント)

サブエージェントは、スコープが限定された委任タスクを処理する。例：

```markdown
---
name: code-reviewer
description: Reviews code for quality, security, and maintainability
tools: Read, Grep, Glob, Bash
model: opus
---

You are a senior code reviewer...
```

### Skills (スキル)

Skillは、CommandやAgentによって呼び出されるワークフロー定義である。

```markdown
# TDD Workflow

1. Define interfaces first
2. Write failing tests (RED)
3. Implement minimal code (GREEN)
4. Refactor (IMPROVE)
5. Verify 80%+ coverage
```

### Hooks (フック)

Hookはツールのイベントで発火する。例 - console.logについての警告：

```json
{
  "matcher": "tool == \"Edit\" && tool_input.file_path matches \"\\\\.(ts|tsx|js|jsx)$\"",
  "hooks": [{
    "type": "command",
    "command": "#!/bin/bash\ngrep -n 'console\\.log' \"$file_path\" && echo '[Hook] Remove console.log' >&2"
  }]
}
```

### Rules (ルール)

Ruleは常に従うべきガイドラインである。モジュール性を保つこと。

```
~/.claude/rules/
  security.md      # ハードコードされた秘密情報の禁止
  coding-style.md  # 不変性、ファイルサイズ制限
  testing.md       # TDD、カバレッジ要件
```

---

## 貢献について

**貢献は歓迎かつ推奨される。**

このリポジトリはコミュニティリソースとなることを意図している。以下のようなものがあれば貢献してほしい。
- 有用なAgentやSkill
- 賢いHook
- より良いMCP設定
- 改良されたRule

ぜひ貢献を！ガイドラインについては [CONTRIBUTING.md](CONTRIBUTING.md) を参照のこと。

### 貢献のアイデア

- 言語固有のSkill (Python, Go, Rustのパターン)
- フレームワーク固有の設定 (Django, Rails, Laravel)
- DevOps Agent (Kubernetes, Terraform, AWS)
- テスト戦略 (様々なフレームワーク)
- ドメイン固有知識 (ML, データエンジニアリング, モバイル)

---

## 背景

私はClaude Codeを実験的展開の段階から使用している。2025年9月のAnthropic x Forum Venturesハッカソンにおいて、[@DRodriguezFX](https://x.com/DRodriguezFX) と共に [zenith.chat](https://zenith.chat) を構築し優勝した。これも完全にClaude Codeを使用して開発された。

これらの設定は、複数のプロダクトアプリケーションにおいて実戦テスト済みである。

---

## 重要な注意点

### コンテキストウィンドウの管理

**重要:** すべてのMCPを一度に有効にしないこと。ツールが多すぎると、200kのコンテキストウィンドウが70kまで縮小してしまう可能性がある。

目安:
- 20-30個のMCPを設定しておく
- プロジェクトごとに有効にするのは10個以下に抑える
- アクティブなツールは80個以下にする

使用しないMCPサーバーを無効にするには、プロジェクト設定で `disabledMcpServers` を使用する。

### カスタマイズ

これらの設定は私のワークフローには適しているが、以下の手順で調整することを推奨する。
1. 共感できるものから始める
2. 自分のスタックに合わせて修正する
3. 使わないものは削除する
4. 独自のパターンを追加する

---

## リンク

- **短縮版ガイド (まずはここから):** [The Shorthand Guide to Everything Claude Code](https://x.com/affaanmustafa/status/2012378465664745795)
- **長編ガイド (応用編):** [The Longform Guide to Everything Claude Code](https://x.com/affaanmustafa/status/2014040193557471352)
- **フォロー:** [@affaanmustafa](https://x.com/affaanmustafa)
- **zenith.chat:** [zenith.chat](https://zenith.chat)

---

## ライセンス

MIT - 自由に使用、修正し、可能であれば貢献してほしい。

---

**役に立った場合はリポジトリにスターを。両方のガイドを読むこと。素晴らしいものを作ろう。**
