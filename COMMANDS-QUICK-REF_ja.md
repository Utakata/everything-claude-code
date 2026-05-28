# コマンドクイックリファレンス (Commands Quick Reference)

> グローバルにインストールされた59のスラッシュコマンド。Claude Codeの任意のセッションで `/` と入力して呼び出す。

---

## コアワークフロー (Core Workflow)

| Command | What it does |
|---------|-------------|
| `/plan` | 要件を再定義し、リスクを評価し、ステップバイステップの実装計画を作成する — **コードに触れる前にユーザーの確認を待つ** |
| `/tdd` | テスト駆動開発を強制する: インターフェースの足場作り → 失敗するテストの作成 → 実装 → 80%以上のカバレッジを検証 |
| `/code-review` | 変更されたファイルのコード品質、セキュリティ、および保守性の完全なレビュー |
| `/build-fix` | ビルドエラーを検出し修正する — 適切な build-resolver エージェントに自動的に委譲する |
| `/verify` | 完全な検証ループを実行する: ビルド → lint → テスト → 型チェック |
| `/quality-gate` | プロジェクト基準に対する品質ゲートチェック |

---

## テスト (Testing)

| Command | What it does |
|---------|-------------|
| `/tdd` | 汎用的なTDDワークフロー（任意の言語） |
| `/e2e` | Playwright のエンドツーエンドテストを生成して実行し、スクリーンショット/ビデオ/トレースをキャプチャする |
| `/test-coverage` | テストカバレッジを報告し、ギャップを特定する |
| `/go-test` | Go のTDDワークフロー（テーブル駆動、`go test -cover` で80%以上のカバレッジ） |
| `/kotlin-test` | Kotlin のTDD（Kotest + Kover） |
| `/rust-test` | Rust のTDD（cargo test、統合テスト） |
| `/cpp-test` | C++ のTDD（GoogleTest + gcov/lcov） |

---

## コードレビュー (Code Review)

| Command | What it does |
|---------|-------------|
| `/code-review` | 汎用的なコードレビュー |
| `/python-review` | Python — PEP 8、型ヒント、セキュリティ、慣用的なパターン |
| `/go-review` | Go — 慣用的なパターン、並行処理の安全性、エラーハンドリング |
| `/kotlin-review` | Kotlin — null安全性、コルーチンの安全性、クリーンアーキテクチャ |
| `/rust-review` | Rust — 所有権、ライフタイム、unsafe の使用 |
| `/cpp-review` | C++ — メモリ安全性、モダンな慣用句、並行処理 |

---

## ビルド修正 (Build Fixers)

| Command | What it does |
|---------|-------------|
| `/build-fix` | 言語を自動検出し、ビルドエラーを修正する |
| `/go-build` | Go のビルドエラーと `go vet` の警告を修正する |
| `/kotlin-build` | Kotlin/Gradle のコンパイルエラーを修正する |
| `/rust-build` | Rust のビルドおよびボローチェッカーの問題を修正する |
| `/cpp-build` | C++ の CMake およびリンカーの問題を修正する |
| `/gradle-build` | Android / KMP 向けの Gradle エラーを修正する |

---

## 計画とアーキテクチャ (Planning & Architecture)

| Command | What it does |
|---------|-------------|
| `/plan` | リスク評価を伴う実装計画 |
| `/multi-plan` | マルチモデル協調計画 |
| `/multi-workflow` | マルチモデル協調開発 |
| `/multi-backend` | バックエンドに焦点を当てたマルチモデル開発 |
| `/multi-frontend` | フロントエンドに焦点を当てたマルチモデル開発 |
| `/multi-execute` | マルチモデル協調実行 |
| `/orchestrate` | tmux/worktree のマルチエージェントオーケストレーションのガイド |
| `/devfleet` | DevFleet を介して並行する Claude Code エージェントをオーケストレーションする |

---

## セッション管理 (Session Management)

| Command | What it does |
|---------|-------------|
| `/save-session` | 現在のセッション状態を `~/.claude/session-data/` に保存する |
| `/resume-session` | 正規のセッションストアから最後に保存されたセッションを読み込み、中断したところから再開する |
| `/sessions` | `~/.claude/session-data/` からエイリアスを使用してセッション履歴を閲覧、検索、管理する（`~/.claude/sessions/` からのレガシー読み取りも可能） |
| `/checkpoint` | 現在のセッションにチェックポイントをマークする |
| `/aside` | 現在のタスクのコンテキストを失うことなく、簡単なサイドの質問に答える |
| `/context-budget` | コンテキストウィンドウの使用量を分析する — トークンのオーバーヘッドを見つけ、最適化する |

---

## 学習と改善 (Learning & Improvement)

| Command | What it does |
|---------|-------------|
| `/learn` | 現在のセッションから再利用可能なパターンを抽出する |
| `/learn-eval` | パターンを抽出し、保存する前に品質を自己評価する |
| `/evolve` | 学習したインスティンクト（instincts）を分析し、進化したスキル構造を提案する |
| `/promote` | プロジェクトスコープのインスティンクトをグローバルスコープに昇格させる |
| `/instinct-status` | 学習したすべてのインスティンクト（プロジェクト＋グローバル）と信頼度スコアを表示する |
| `/instinct-export` | インスティンクトをファイルにエクスポートする |
| `/instinct-import` | ファイルまたは URL からインスティンクトをインポートする |
| `/skill-create` | ローカルの git 履歴を分析し、再利用可能なスキルを生成する |
| `/skill-health` | 分析機能を備えたスキルポートフォリオのヘルスダッシュボード |
| `/rules-distill` | スキルをスキャンし、横断的な原則を抽出し、ルールに蒸留する |

---

## リファクタリングとクリーンアップ (Refactoring & Cleanup)

| Command | What it does |
|---------|-------------|
| `/refactor-clean` | デッドコードを削除し、重複を統合し、構造をクリーンアップする |
| `/prompt-optimize` | ドラフトプロンプトを分析し、最適化され ECC で強化されたバージョンを出力する |

---

## ドキュメントとリサーチ (Docs & Research)

| Command | What it does |
|---------|-------------|
| `/docs` | Context7 を介して現在のライブラリ/APIドキュメントを検索する |
| `/update-docs` | プロジェクトドキュメントを更新する |
| `/update-codemaps` | コードベースのコードマップを再生成する |

---

## ループと自動化 (Loops & Automation)

| Command | What it does |
|---------|-------------|
| `/loop-start` | 定期的な間隔で繰り返し実行されるエージェントループを開始する |
| `/loop-status` | 実行中のループのステータスを確認する |
| `/claw` | NanoClaw v2 を開始する — モデルルーティング、スキルのホットロード、ブランチング、およびメトリクスを備えた永続的な REPL |

---

## プロジェクトとインフラ (Project & Infrastructure)

| Command | What it does |
|---------|-------------|
| `/projects` | 既知のプロジェクトとそのインスティンクト統計をリストする |
| `/harness-audit` | エージェントハーネスの設定について、信頼性とコストを監査する |
| `/eval` | 評価（eval）ハーネスを実行する |
| `/model-route` | タスクを適切なモデル（Haiku / Sonnet / Opus）にルーティングする |
| `/pm2` | PM2 プロセスマネージャーの初期化 |
| `/setup-pm` | パッケージマネージャーの構成（npm / pnpm / yarn / bun） |

---

## クイック決定ガイド (Quick Decision Guide)

```
新しい機能を開始する？             → 最初に /plan、次に /tdd
コードを書いた直後？               → /code-review
ビルドが壊れた？                   → /build-fix
ライブドキュメントが必要？         → /docs <library>
セッションが終了しそう？           → /save-session または /learn-eval
翌日再開する？                     → /resume-session
コンテキストが重くなってきた？     → /context-budget の後に /checkpoint
学んだことを抽出したい？           → /learn-eval の後に /evolve
繰り返しのタスクを実行する？       → /loop-start
```
