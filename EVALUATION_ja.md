# リポジトリ評価と現在の設定の比較 (Repo Evaluation vs Current Setup)

**Date:** 2026-03-21
**Branch:** `claude/evaluate-repo-comparison-ASZ9Y`

---

## 現在の設定 (Current Setup `~/.claude/`)

アクティブな Claude Code のインストールはほぼ最小限である:

| Component | Current |
|-----------|---------|
| Agents | 0 |
| Skills | 0 installed |
| Commands | 0 |
| Hooks | 1 (Stop: git check) |
| Rules | 0 |
| MCP configs | 0 |

**インストール済みのフック:**
- `Stop` → `stop-hook-git-check.sh` — コミットされていない変更やプッシュされていないコミットがある場合、セッションの終了をブロックする

**インストール済みの権限:**
- `Skill` — スキルの呼び出しを許可する

**プラグイン:** `blocklist.json` のみ（アクティブなプラグインはインストールされていない）

---

## このリポジトリ (This Repo `everything-claude-code` v1.9.0)

| Component | Repo |
|-----------|------|
| Agents | 28 |
| Skills | 116 |
| Commands | 59 |
| Rules sets | 12言語 + 共通 (60+ ルールファイル) |
| Hooks | 包括的なシステム (PreToolUse, PostToolUse, SessionStart, Stop) |
| MCP configs | 1 (Context7 + その他) |
| Schemas | 9 JSON バリデーター |
| Scripts/CLI | 46+ Node.js モジュール + 複数のCLI |
| Tests | 58 テストファイル |
| Install profiles | core, developer, security, research, full |
| Supported harnesses | Claude Code, Codex, Cursor, OpenCode |

---

## ギャップ分析 (Gap Analysis)

### フック (Hooks)
- **Current:** 1つの Stop フック (git 衛生チェック)
- **Repo:** 以下をカバーする完全なフックマトリックス:
  - 危険なコマンドのブロック (`rm -rf`, 強制プッシュ)
  - ファイル編集時の自動フォーマット
  - 開発サーバーでの tmux 強制
  - コスト追跡
  - セッション評価とガバナンスキャプチャ
  - MCP ヘルスモニタリング

### エージェント (Agents) (28個不足)
リポジトリは、すべての主要なワークフローに対して特化したエージェントを提供する:
- 言語レビューア: TypeScript, Python, Go, Java, Kotlin, Rust, C++, Flutter
- ビルドリゾルバ: Go, Java, Kotlin, Rust, C++, PyTorch
- ワークフローエージェント: planner, tdd-guide, code-reviewer, security-reviewer, architect
- 自動化: loop-operator, doc-updater, refactor-cleaner, harness-optimizer

### スキル (Skills) (116個不足)
以下をカバーするドメイン知識モジュール:
- 言語パターン (Python, Go, Kotlin, Rust, C++, Java, Swift, Perl, Laravel, Django)
- テスト戦略 (TDD, E2E, カバレッジ)
- アーキテクチャパターン (バックエンド, フロントエンド, API設計, データベースマイグレーション)
- AI/ML ワークフロー (Claude API, eval harness, agent loops, cost-aware pipelines)
- ビジネスワークフロー (investor materials, market research, content engine)

### コマンド (Commands) (59個不足)
- `/tdd`, `/plan`, `/e2e`, `/code-review` — コアな開発ワークフロー
- `/sessions`, `/save-session`, `/resume-session` — セッションの永続化
- `/orchestrate`, `/multi-plan`, `/multi-execute` — マルチエージェント協調
- `/learn`, `/skill-create`, `/evolve` — 継続的改善
- `/build-fix`, `/verify`, `/quality-gate` — ビルド/品質の自動化

### ルール (Rules) (60以上のファイルが不足)
以下のための言語固有のコーディングスタイル、パターン、テスト、およびセキュリティガイドライン:
TypeScript, Python, Go, Java, Kotlin, Rust, C++, C#, Swift, Perl, PHP、および共通/言語横断ルール。

---

## 推奨事項 (Recommendations)

### 即時価値 (Immediate value - core install)
`ecc install --profile core` を実行して以下を取得する:
- コアエージェント (code-reviewer, planner, tdd-guide, security-reviewer)
- 必須スキル (tdd-workflow, coding-standards, security-review)
- 主要コマンド (/tdd, /plan, /code-review, /build-fix)

### フルインストール (Full install)
`ecc install --profile full` を実行して、28のすべてのエージェント、116のスキル、59のコマンドを取得する。

### フックのアップグレード (Hooks upgrade)
現在の Stop フックは堅牢である。リポジトリの `hooks.json` は以下を追加する:
- 危険なコマンドのブロック (安全性)
- 自動フォーマット (品質)
- コスト追跡 (可観測性)
- セッション評価 (学習)

### ルール (Rules)
言語ルール（例：TypeScript、Python）を追加することで、セッションごとのプロンプトに依存することなく、常時オンのコーディングガイドラインを提供する。

---

## 現在の設定の優れている点 (What the Current Setup Does Well)

- `stop-hook-git-check.sh` の Stop フックは本番環境レベルの品質であり、既に良好な git 衛生（git hygiene）を強制している
- `Skill` 権限が正しく設定されている
- 設定はクリーンであり、競合や不要なもの（cruft）はない

---

## まとめ (Summary)

現在の設定は、1つの適切に実装された git 衛生フックを持つ、事実上白紙の状態（blank slate）である。このリポジトリは、エージェント、スキル、コマンド、フック、ルールをカバーする、完全に本番テスト済みの拡張レイヤーを提供する。選択的インストールシステムにより、設定を肥大化させることなく、必要なものだけを正確に追加することができる。
