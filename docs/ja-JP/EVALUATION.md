# リポジトリの評価と現在のセットアップの比較

**日付:** 2026-03-21
**ブランチ:** `claude/evaluate-repo-comparison-ASZ9Y`

---

## 現在のセットアップ (`~/.claude/`)

アクティブな Claude Code のインストールはほぼ最小限です：

| コンポーネント | 現在の状況 |
|-----------|---------|
| Agents | 0 |
| Skills | 0 インストール済み |
| Commands | 0 |
| Hooks | 1 (Stop: git check) |
| Rules | 0 |
| MCP configs | 0 |

**インストール済みのhooks:**
- `Stop` → `stop-hook-git-check.sh` — コミットされていない変更やプッシュされていないコミットがある場合、セッションの終了をブロックします

**インストール済みのpermissions:**
- `Skill` — skillの呼び出しを許可します

**Plugins:** `blocklist.json` のみ (アクティブなプラグインはインストールされていません)

---

## このリポジトリ (`everything-claude-code` v1.9.0)

| コンポーネント | リポジトリ |
|-----------|------|
| Agents | 28 |
| Skills | 116 |
| Commands | 59 |
| Rules sets | 12言語 + 共通 (60以上のruleファイル) |
| Hooks | 包括的なシステム (PreToolUse, PostToolUse, SessionStart, Stop) |
| MCP configs | 1 (Context7 + その他) |
| Schemas | 9つのJSONバリデーター |
| Scripts/CLI | 46以上のNode.jsモジュール + 複数のCLI |
| Tests | 58のtestファイル |
| Install profiles | core, developer, security, research, full |
| Supported harnesses | Claude Code, Codex, Cursor, OpenCode |

---

## ギャップ分析

### Hooks
- **現在:** 1つのStop hook (git衛生チェック)
- **リポジトリ:** 以下をカバーする完全なhookマトリックス：
  - 危険なコマンドのブロック (`rm -rf`、フォースプッシュ)
  - ファイル編集時の自動フォーマット
  - 開発サーバーのtmux強制
  - コストトラッキング
  - セッション評価とガバナンスキャプチャ
  - MCPヘルスモニタリング

### Agents (28不足)
リポジトリは、すべての主要なワークフローに対して特化したエージェントを提供します：
- Language reviewers: TypeScript, Python, Go, Java, Kotlin, Rust, C++, Flutter
- Build resolvers: Go, Java, Kotlin, Rust, C++, PyTorch
- Workflow agents: planner, tdd-guide, code-reviewer, security-reviewer, architect
- Automation: loop-operator, doc-updater, refactor-cleaner, harness-optimizer

### Skills (116不足)
以下をカバーするドメイン知識モジュール：
- Language patterns (Python, Go, Kotlin, Rust, C++, Java, Swift, Perl, Laravel, Django)
- Testing strategies (TDD, E2E, coverage)
- Architecture patterns (backend, frontend, API design, database migrations)
- AI/ML workflows (Claude API, eval harness, agent loops, cost-aware pipelines)
- Business workflows (investor materials, market research, content engine)

### Commands (59不足)
- `/tdd`, `/plan`, `/e2e`, `/code-review` — コアな開発ワークフロー
- `/sessions`, `/save-session`, `/resume-session` — セッションの永続化
- `/orchestrate`, `/multi-plan`, `/multi-execute` — マルチエージェントの調整
- `/learn`, `/skill-create`, `/evolve` — 継続的改善
- `/build-fix`, `/verify`, `/quality-gate` — ビルド/品質の自動化

### Rules (60以上のファイルが不足)
以下の言語向けの言語固有のコーディングスタイル、パターン、テスト、およびセキュリティガイドライン：
TypeScript, Python, Go, Java, Kotlin, Rust, C++, C#, Swift, Perl, PHP、および共通/言語横断的なルール。

---

## 推奨事項

### 即時価値 (core install)
`ecc install --profile core` を実行して以下を取得します：
- Core agents (code-reviewer, planner, tdd-guide, security-reviewer)
- Essential skills (tdd-workflow, coding-standards, security-review)
- Key commands (/tdd, /plan, /code-review, /build-fix)

### Full install
`ecc install --profile full` を実行して、全28のエージェント、116のスキル、59のコマンドを取得します。

### Hooks のアップグレード
現在のStop hookは堅牢です。リポジトリの `hooks.json` は以下を追加します：
- 危険なコマンドのブロック (安全性)
- 自動フォーマット (品質)
- コストトラッキング (可観測性)
- セッション評価 (学習)

### Rules
言語ルール（例：TypeScript、Python）を追加することで、セッションごとのプロンプトに依存することなく、常にオンになっているコーディングガイドラインを提供します。

---

## 現在のセットアップで優れている点

- `stop-hook-git-check.sh` のStop hookは実稼働品質であり、すでに良好なgit衛生を強制しています
- `Skill` 権限は正しく設定されています
- セットアップはクリーンであり、コンフリクトや不要なものは存在しません

---

## まとめ

現在のセットアップは、本質的に白紙の状態であり、1つのよく実装されたgit衛生フックがあるだけです。このリポジトリは、エージェント、スキル、コマンド、フック、ルールをカバーする、完全で実稼働テスト済みの拡張レイヤーを提供します。また、選択的なインストールシステムを備えているため、構成を肥大化させることなく、必要なものだけを正確に追加できます。
