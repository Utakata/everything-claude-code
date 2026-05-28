# 変更履歴 (Changelog)

## 2.0.0-rc.1 - 2026-04-28

### ハイライト

- Hermesオペレーターストーリー向けに、パブリックなECC 2.0リリース候補サーフェスを追加した。
- Claude Code、Codex、Cursor、OpenCode、Gemini全体で再利用可能なクロスハーネスの基盤としてECCをドキュメント化した。
- プライベートなオペレーターステートを公開する代わりに、サニタイズされたHermesのインポートスキルサーフェスを追加した。

### リリースサーフェス

- パッケージ、プラグイン、マーケットプレイス、OpenCode、エージェント、およびREADMEのメタデータを `2.0.0-rc.1` に更新した。
- リリースノート、ソーシャルドラフト、ローンチチェックリスト、ハンドオフノート、およびデモプロンプトを含む `docs/releases/2.0.0-rc.1/` を追加した。
- `docs/architecture/cross-harness.md` と、ECC/Hermes境界の回帰カバレッジ（regression coverage）を追加した。
- 現時点では `ecc2/` のバージョニングを独立させた。リリースエンジニアリングが別の決定を下さない限り、これはアルファ版のコントロールプレーンスキャフォールドのままである。

### メモ

- これはリリース候補（release candidate）であり、完全なECC 2.0コントロールプレーンロードマップのGA（一般提供）を主張するものではない。
- プレリリースのnpmパブリッシュは、リリースエンジニアリングが明示的に別の選択をしない限り、`next` dist-tagを使用する必要がある。

## 1.10.0 - 2026-04-05

### ハイライト

- 数週間にわたるOSSの成長とバックログのマージを経て、パブリックリリースサーフェスをライブリポジトリに同期した。
- オペレーターワークフローレーンを拡張し、音声、グラフランキング、課金、ワークスペース、およびアウトバウンドスキルを追加した。
- メディア生成レーンを拡張し、ManimおよびRemotionファーストのローンチツーリングを追加した。
- ECC 2.0アルファのコントロールプレーンバイナリが `ecc2/` からローカルでビルド可能になり、最初の使用可能なCLI/TUIサーフェスが公開された。

### リリースサーフェス

- プラグイン、マーケットプレイス、Codex、OpenCode、およびエージェントのメタデータを `1.10.0` に更新した。
- 公開されたカウントをライブOSSサーフェス（38エージェント、156スキル、72コマンド）に同期した。
- トップレベルのインストール向けドキュメントとマーケットプレイスの説明を更新し、現在のリポジトリの状態と一致させた。

### 新しいワークフローレーン

- `brand-voice` — 正規のソース由来の執筆スタイルシステム。
- `social-graph-ranker` — 重み付けされたウォームイントロ（warm-intro）のグラフランキングプリミティブ。
- `connections-optimizer` — グラフランキングに基づくネットワークのプルーニング/追加ワークフロー。
- `customer-billing-ops`, `google-workspace-ops`, `project-flow-ops`, `workspace-surface-audit`.
- `manim-video`, `remotion-video-creation`, `nestjs-patterns`.

### ECC 2.0 アルファ

- リポジトリのベースラインで `cargo build --manifest-path ecc2/Cargo.toml` がパスした。
- `ecc-tui` は現在、`dashboard`, `start`, `sessions`, `status`, `stop`, `resume`, `daemon` を公開している。
- アルファ版はローカルでの実験に実際に使用可能であるが、より広範なコントロールプレーンロードマップは未完成であり、GAとして扱うべきではない。

### メモ

- Claudeプラグインは、プラットフォームレベルのルール配布制約により引き続き制限されている。選択的インストール / OSSパスが、依然として最も信頼性の高いフルインストールである。
- このリリースはリポジトリサーフェスの修正とエコシステムの同期であり、完全なECC 2.0ロードマップが完成したと主張するものではない。

## 1.9.0 - 2026-03-20

### ハイライト

- マニフェスト駆動パイプラインとSQLiteステートストアを備えた選択的インストールアーキテクチャ。
- 言語カバレッジを10以上のエコシステムに拡大し、6つの新しいエージェントと言語固有のルールを追加した。
- メモリスロットリング、サンドボックスの修正、および5層のループガードにより、オブザーバーの信頼性を強化した。
- スキルの進化とセッションアダプターを備えた、自己改善スキル基盤。

### 新しいエージェント

- `typescript-reviewer` — TypeScript/JavaScriptのコードレビュースペシャリスト (#647)
- `pytorch-build-resolver` — PyTorchランタイム、CUDA、およびトレーニングエラー解決 (#549)
- `java-build-resolver` — Maven/Gradleビルドエラー解決 (#538)
- `java-reviewer` — JavaおよびSpring Bootのコードレビュー (#528)
- `kotlin-reviewer` — Kotlin/Android/KMPのコードレビュー (#309)
- `kotlin-build-resolver` — Kotlin/Gradleのビルドエラー (#309)
- `rust-reviewer` — Rustのコードレビュー (#523)
- `rust-build-resolver` — Rustビルドエラー解決 (#523)
- `docs-lookup` — ドキュメントおよびAPIリファレンスリサーチ (#529)

### 新しいスキル

- `pytorch-patterns` — PyTorchディープラーニングワークフロー (#550)
- `documentation-lookup` — APIリファレンスおよびライブラリドキュメントリサーチ (#529)
- `bun-runtime` — Bunランタイムパターン (#529)
- `nextjs-turbopack` — Next.js Turbopackワークフロー (#529)
- `mcp-server-patterns` — MCPサーバー設計パターン (#531)
- `data-scraper-agent` — AIを活用した公開データ収集 (#503)
- `team-builder` — チーム構成スキル (#501)
- `ai-regression-testing` — AI回帰テストワークフロー (#433)
- `claude-devfleet` — マルチエージェントオーケストレーション (#505)
- `blueprint` — マルチセッション構築計画
- `everything-claude-code` — 自己参照型ECCスキル (#335)
- `prompt-optimizer` — プロンプト最適化スキル (#418)
- 8つの Evos オペレーショナルドメインスキル (#290)
- 3つの Laravel スキル (#420)
- VideoDB スキル (#301)

### 新しいコマンド

- `/docs` — ドキュメント検索 (#530)
- `/aside` — サイド会話 (#407)
- `/prompt-optimize` — プロンプト最適化 (#418)
- `/resume-session`, `/save-session` — セッション管理
- チェックリストベースの全体的な判定を含む `learn-eval` の改善

### 新しいルール

- Java言語ルール (#645)
- PHPルールパック (#389)
- Perl言語ルールとスキル（パターン、セキュリティ、テスト）
- Kotlin/Android/KMPルール (#309)
- C++言語サポート (#539)
- Rust言語サポート (#523)

### インフラストラクチャ

- マニフェスト解決を備えた選択的インストールアーキテクチャ (`install-plan.js`, `install-apply.js`) (#509, #512)
- インストール済みコンポーネントを追跡するためのクエリCLIを備えたSQLiteステートストア (#510)
- 構造化されたセッション記録のためのセッションアダプター (#511)
- 自己改善スキルのためのスキル進化基盤 (#514)
- 決定論的スコアリングを備えたオーケストレーションハーネス (#524)
- CIでのカタログカウント強制 (#525)
- 全109スキルのインストールマニフェスト検証 (#537)
- PowerShellインストーラーラッパー (#532)
- `--target antigravity` フラグによる Antigravity IDE サポート (#332)
- Codex CLI カスタマイズスクリプト (#336)

### バグ修正

- 6つのファイル全体で19のCIテストの失敗を解決 (#519)
- インストールパイプライン、オーケストレーター、および修復における8つのテストの失敗を修正 (#564)
- スロットリング、リエントラントガード、およびテールサンプリングによるオブザーバーのメモリ爆発の修正 (#536)
- Haiku呼び出しのためのオブザーバーのサンドボックスアクセス修正 (#661)
- ワークツリーのプロジェクトID不一致の修正 (#665)
- オブザーバーの遅延起動（lazy-start）ロジック (#508)
- オブザーバーの5層ループ防止ガード (#399)
- HookのポータビリティとWindows .cmdのサポート
- Biome Hookの最適化 — npxのオーバーヘッドを排除 (#359)
- InsAItsセキュリティHookをオプトイン化 (#370)
- Windowsの spawnSync エクスポート修正 (#431)
- instinct CLIのUTF-8エンコーディング修正 (#353)
- Hook内のシークレットスクラビング (#348)

### 翻訳

- 韓国語 (ko-KR) 翻訳 — README、エージェント、コマンド、スキル、ルール (#392)
- 中国語 (zh-CN) ドキュメントの同期 (#428)

### クレジット

- @ymdvsymd — オブザーバーサンドボックスとワークツリーの修正
- @pythonstrup — Biome Hookの最適化
- @Nomadu27 — InsAItsセキュリティHook
- @hahmee — 韓国語翻訳
- @zdocapp — 中国語翻訳の同期
- @cookiee339 — Kotlinエコシステム
- @pangerlkr — CIワークフローの修正
- @0xrohitgarg — VideoDBスキル
- @nocodemf — Evosオペレーショナルスキル
- @swarnika-cmd — コミュニティの貢献

## 1.8.0 - 2026-03-04

### ハイライト

- 信頼性、評価（eval）の規律、および自律的なループ操作に焦点を当てたハーネスファーストのリリース。
- Hookランタイムがプロファイルベースの制御とターゲットを絞ったHookの無効化をサポート。
- NanoClaw v2により、モデルルーティング、スキルのホットロード、ブランチング、検索、コンパクション、エクスポート、およびメトリクスが追加された。

### コア

- 新しいコマンドを追加: `/harness-audit`, `/loop-start`, `/loop-status`, `/quality-gate`, `/model-route`.
- 新しいスキルを追加:
  - `agent-harness-construction`
  - `agentic-engineering`
  - `ralphinho-rfc-pipeline`
  - `ai-first-engineering`
  - `enterprise-agent-ops`
  - `nanoclaw-repl`
  - `continuous-agent-loop`
- 新しいエージェントを追加:
  - `harness-optimizer`
  - `loop-operator`

### Hookの信頼性

- 堅牢なフォールバック検索による SessionStart のルート解決の修正。
- セッションサマリーの永続化を、トランスクリプトペイロードが利用可能な Stop に移動。
- quality-gate および cost-tracker Hookを追加。
- 脆弱なインラインHookのワンライナーを専用のスクリプトファイルに置き換え。
- `ECC_HOOK_PROFILE` および `ECC_DISABLED_HOOKS` コントロールを追加。

### クロスプラットフォーム

- ドキュメント警告ロジックにおけるWindowsセーフなパス処理を改善。
- 非対話型のハングアップを回避するため、オブザーバーループの動作を強化。

### メモ

- `autonomous-loops` は1リリースの間、互換性エイリアスとして維持される。`continuous-agent-loop` が正規の名前である。

### クレジット

- inspired by [zarazhangrui](https://github.com/zarazhangrui)
- homunculus-inspired by [humanplane](https://github.com/humanplane)
