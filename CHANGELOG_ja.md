
# 変更履歴 (Changelog)

## 2.0.0-rc.1 - 2026-04-28

### ハイライト

- Hermesオペレーターストーリー向けの公開用ECC 2.0リリース候補サーフェスを追加した。
- Claude Code、Codex、Cursor、OpenCode、Geminiにまたがる再利用可能なクロスハーネス基盤としてECCを文書化した。
- プライベートなオペレーター状態を公開する代わりに、サニタイズされたHermesインポートスキルサーフェスを追加した。

### リリースサーフェス

- パッケージ、プラグイン、マーケットプレイス、OpenCode、エージェント、およびREADMEのメタデータを `2.0.0-rc.1` に更新した。
- リリースノート、ソーシャルドラフト、ローンチチェックリスト、ハンドオフノート、デモプロンプトを含む `docs/releases/2.0.0-rc.1/` を追加した。
- `docs/architecture/cross-harness.md` を追加し、ECC/Hermes境界の回帰カバレッジを追加した。
- `ecc2/` のバージョニングは当面独立したままとした。リリースエンジニアリングの決定がない限り、これはアルファ版のコントロールプレーンスキャフォールドのままである。

### 備考

- これはリリース候補であり、ECC 2.0のフルコントロールプレーンロードマップのGA(一般提供)を宣言するものではない。
- プレリリースのnpmパブリッシュは、リリースエンジニアリングが明示的に選択しない限り、`next` dist-tagを使用するべきである。

## 1.10.0 - 2026-04-05

### ハイライト

- 数週間にわたるOSSの成長とバックログのマージを経て、公開リリースサーフェスをライブリポジトリに同期させた。
- オペレーターワークフローレーンを拡張し、音声、グラフランキング、請求、ワークスペース、アウトバウンドスキルを追加した。
- メディア生成レーンを拡張し、ManimとRemotionファーストの起動ツールを追加した。
- ECC 2.0アルファ版コントロールプレーンバイナリが `ecc2/` からローカルでビルド可能になり、最初の使用可能なCLI/TUIサーフェスを公開した。

### リリースサーフェス

- プラグイン、マーケットプレイス、Codex、OpenCode、およびエージェントのメタデータを `1.10.0` に更新した。
- パブリッシュされたカウントをライブOSSサーフェスに同期させた: 38個のエージェント、156個のスキル、72個のコマンド。
- インストール向けトップレベルドキュメントとマーケットプレイスの説明を、現在のリポジトリの状態に合わせて更新した。

### 新しいワークフローレーン

- `brand-voice` — 正規ソース派生のライティングスタイルシステム。
- `social-graph-ranker` — 重み付けされたウォームイントログラフランキングプリミティブ。
- `connections-optimizer` — グラフランキングに基づくネットワークプルーニング/追加ワークフロー。
- `customer-billing-ops`, `google-workspace-ops`, `project-flow-ops`, `workspace-surface-audit`。
- `manim-video`, `remotion-video-creation`, `nestjs-patterns`。

### ECC 2.0 アルファ版

- `cargo build --manifest-path ecc2/Cargo.toml` がリポジトリのベースラインでパスするようになった。
- `ecc-tui` は現在、`dashboard`、`start`、`sessions`、`status`、`stop`、`resume`、および `daemon` を公開している。
- このアルファ版はローカルでの実験用として実際に使用可能であるが、より広範なコントロールプレーンロードマップは未完成であり、GAとして扱うべきではない。

### 備考

- Claudeプラグインは依然としてプラットフォームレベルのルール配布制約により制限されている。選択的インストール / OSSパスが引き続き最も信頼性の高いフルインストール方法である。
- このリリースはリポジトリサーフェスの修正とエコシステムの同期であり、ECC 2.0のフルロードマップが完了したことを宣言するものではない。

## 1.9.0 - 2026-03-20

### ハイライト

- マニフェスト駆動のパイプラインとSQLite状態ストアを備えた選択的インストールアーキテクチャ。
- 言語カバレッジが10以上のエコシステムに拡大し、6つの新しいエージェントと言語固有のルールを追加した。
- メモリスロットリング、サンドボックスの修正、5層のループガードにより、オブザーバーの信頼性を強化した。
- スキル進化とセッションアダプターを備えた、自己改善スキル基盤。

### 新しいエージェント

- `typescript-reviewer` — TypeScript/JavaScriptのコードレビュー専門 (#647)
- `pytorch-build-resolver` — PyTorchランタイム、CUDA、トレーニングエラーの解決 (#549)
- `java-build-resolver` — Maven/Gradleのビルドエラー解決 (#538)
- `java-reviewer` — JavaおよびSpring Bootのコードレビュー (#528)
- `kotlin-reviewer` — Kotlin/Android/KMPのコードレビュー (#309)
- `kotlin-build-resolver` — Kotlin/Gradleのビルドエラー解決 (#309)
- `rust-reviewer` — Rustのコードレビュー (#523)
- `rust-build-resolver` — Rustのビルドエラー解決 (#523)
- `docs-lookup` — ドキュメントおよびAPIリファレンス調査 (#529)

### 新しいスキル

- `pytorch-patterns` — PyTorchディープラーニングワークフロー (#550)
- `documentation-lookup` — APIリファレンスおよびライブラリドキュメント調査 (#529)
- `bun-runtime` — Bunランタイムパターン (#529)
- `nextjs-turbopack` — Next.js Turbopackワークフロー (#529)
- `mcp-server-patterns` — MCPサーバーの設計パターン (#531)
- `data-scraper-agent` — AIを活用した公開データ収集 (#503)
- `team-builder` — チーム構成スキル (#501)
- `ai-regression-testing` — AI回帰テストワークフロー (#433)
- `claude-devfleet` — マルチエージェントオーケストレーション (#505)
- `blueprint` — マルチセッション構築計画
- `everything-claude-code` — 自己言及型ECCスキル (#335)
- `prompt-optimizer` — プロンプト最適化スキル (#418)
- 8つのEvos運用ドメインスキル (#290)
- 3つのLaravelスキル (#420)
- VideoDBスキル (#301)

### 新しいコマンド

- `/docs` — ドキュメント検索 (#530)
- `/aside` — サイドカンバセーション (#407)
- `/prompt-optimize` — プロンプト最適化 (#418)
- `/resume-session`, `/save-session` — セッション管理
- チェックリストに基づく包括的な判定による `learn-eval` の改善

### 新しいルール

- Java言語ルール (#645)
- PHPルールパック (#389)
- Perl言語ルールとスキル (パターン、セキュリティ、テスト)
- Kotlin/Android/KMPルール (#309)
- C++言語サポート (#539)
- Rust言語サポート (#523)

### インフラストラクチャ

- マニフェスト解決による選択的インストールアーキテクチャ (`install-plan.js`、`install-apply.js`) (#509, #512)
- インストール済みコンポーネントを追跡するためのクエリCLIを備えたSQLite状態ストア (#510)
- 構造化されたセッション記録のためのセッションアダプター (#511)
- 自己改善スキルのためのスキル進化基盤 (#514)
- 決定論的スコアリングを備えたオーケストレーションハーネス (#524)
- CIでのカタログカウントの強制 (#525)
- 109個の全スキルに対するインストールマニフェストの検証 (#537)
- PowerShellインストーラーラッパー (#532)
- `--target antigravity` フラグによるAntigravity IDEサポート (#332)
- Codex CLIカスタマイズスクリプト (#336)

### バグ修正

- 6ファイルにわたる19のCIテスト失敗を解決した (#519)
- インストールパイプライン、オーケストレーター、修復における8つのテスト失敗を修正した (#564)
- スロットリング、再入防止ガード、テールサンプリングによるオブザーバーメモリ爆発の修正 (#536)
- Haiku呼び出しに対するオブザーバーのサンドボックスアクセスの修正 (#661)
- ワークツリーのプロジェクトIDの不一致の修正 (#665)
- オブザーバーのレイジースタートロジックの修正 (#508)
- オブザーバーの5層ループ防止ガード (#399)
- フックの移植性とWindows .cmdサポート
- Biomeフックの最適化 — npxのオーバーヘッドを排除した (#359)
- InsAItsセキュリティフックをオプトインにした (#370)
- WindowsでのspawnSyncエクスポートの修正 (#431)
- インスティンクトCLIのUTF-8エンコーディングの修正 (#353)
- フックにおけるシークレットのスクラブ処理 (#348)

### 翻訳

- 韓国語 (ko-KR) 翻訳 — README、エージェント、コマンド、スキル、ルール (#392)
- 中国語 (zh-CN) ドキュメントの同期 (#428)

### クレジット

- @ymdvsymd — オブザーバーサンドボックスとワークツリーの修正
- @pythonstrup — Biomeフックの最適化
- @Nomadu27 — InsAItsセキュリティフック
- @hahmee — 韓国語翻訳
- @zdocapp — 中国語翻訳の同期
- @cookiee339 — Kotlinエコシステム
- @pangerlkr — CIワークフローの修正
- @0xrohitgarg — VideoDBスキル
- @nocodemf — Evos運用スキル
- @swarnika-cmd — コミュニティ貢献

## 1.8.0 - 2026-03-04

### ハイライト

- 信頼性、評価（eval）の規律、自律ループ操作に重点を置いたハーネスファーストのリリース。
- フックランタイムがプロファイルベースの制御とターゲットを絞ったフックの無効化をサポートするようになった。
- NanoClaw v2に、モデルルーティング、スキルのホットロード、ブランチング、検索、コンパクション、エクスポート、およびメトリクスを追加した。

### コア機能

- 新しいコマンドの追加: `/harness-audit`, `/loop-start`, `/loop-status`, `/quality-gate`, `/model-route`。
- 新しいスキルの追加:
  - `agent-harness-construction`
  - `agentic-engineering`
  - `ralphinho-rfc-pipeline`
  - `ai-first-engineering`
  - `enterprise-agent-ops`
  - `nanoclaw-repl`
  - `continuous-agent-loop`
- 新しいエージェントの追加:
  - `harness-optimizer`
  - `loop-operator`

### フックの信頼性

- 堅牢なフォールバック検索によるSessionStartルート解決を修正した。
- トランスクリプトペイロードが利用可能な `Stop` イベントに、セッション概要の永続化を移動した。
- quality-gateとcost-trackerのフックを追加した。
- 壊れやすいインラインフックのワンライナーを専用のスクリプトファイルに置き換えた。
- `ECC_HOOK_PROFILE` と `ECC_DISABLED_HOOKS` 制御を追加した。

### クロスプラットフォーム

- ドキュメント警告ロジックにおけるWindowsセーフなパス処理を改善した。
- 非対話的なハングを避けるため、オブザーバーループの動作を強化した。

### 備考

- `autonomous-loops` は1つのリリースの間、互換性エイリアスとして保持される。`continuous-agent-loop` が正規の名称である。

### クレジット

- [zarazhangrui](https://github.com/zarazhangrui) にインスパイアされた
- homunculusインスパイアの [humanplane](https://github.com/humanplane)
