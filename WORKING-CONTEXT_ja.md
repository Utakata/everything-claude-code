# Everything Claude Code — 作業コンテキストと運用ログ (Working Context & Operations Log)

このファイルは、Everything Claude Code (ECC) の進行中の作業コンテキスト、手動での介入、進行中のタスク、および過去に直面した問題を追跡するものである。これは、自律型エージェントと人間のメンテナが、セッションやプルリクエスト間で状態と意図を共有するための、継続的なハンドオフドキュメントとして機能する。

---

## 現在のステータス (Current Status)
- **Repo State:** 1.9.x メンテナンス、ECC 2.0-rc.1 コントロールプレーン統合（Rust TUI / SQLite）、2.x クロスハーネスポータビリティ（Claude Code、Codex、Cursor、OpenCode、Gemini対応のECC）が進行中。
- **Agent Focus:** オブザーバーのメモリ管理、安全な並行実行のオーケストレーション、および外部 API インジェクションに対する自己防衛。
- **Project Structure Checklist:**
  - [x] コアなルール / エージェント / スキル / コマンドのディレクトリが安定している
  - [x] インストールパス (`scripts/install-plan.js`, `scripts/install-apply.js`) が安定している
  - [x] 統合テストカバレッジが `tests/` に存在し、パスしている
  - [x] バージョンのバンプが `package.json`, `manifests/`, `plugins/`, `.opencode/`, `agents/openai.yaml` と同期している
  - [x] 5つの異なるAI/IDEサーフェス全体でクロスハーネスのインストールが可能

---

## 運用ログ（時系列順） (Operations Log - Chronological)

### 2026-03
- 2026-03-21: リポジトリの評価と `~/.claude/` の現在の設定（インストールされたエージェントやスキルがなく、1つの Stop フックがある事実上白紙の状態）を文書化した `EVALUATION.md` と `REPO-ASSESSMENT.md` を追加した。ユーザーが優先して追加すべき事項の概要を示した。
- 2026-03-22: `the-longform-guide.md` のトーンと構造の不一致を解決した。ECCのアイデンティティを、「ハック」としての位置づけから、本番環境対応の統合システムとして再構築した。手動で編集されたスキルからの不整合を避けるため、`skills` カタログの数を `116` に修正した。
- 2026-03-22: 「Claude Code への貢献方法」から「ECC プラグインの開発方法」へと焦点を移すため、`CONTRIBUTING.md` を更新した。フロントマター付きの Markdown スキルや JSON フックマッチャーなど、実際のディレクトリ構造とファイル形式を反映させた。
- 2026-03-22: サプライチェーンのインシデント（npm の乗っ取りなど）が ECC ユーザーにどのように影響するか、およびプロジェクトがどのように対応するかを定義するために、`docs/security/supply-chain-incident-response.md` を追加し、`SECURITY.md` にリンクした。これは、エンタープライズの評価基準を満たすためのものである。
- 2026-03-22: 新しいインストールシステムにインデックスされない手動で追加されたスキルを削除し、欠落していた `origin: ECC` のフロントマターを追加し、無効な YAML 構文を修正することにより、スキルのカタログ（`116` 個のスキル）をクリーンアップした。`tests/run-all.js` がパスすることを確認した。
- 2026-03-22: 不安定な E2E テストの失敗（ETIMEDOUT）による CI のブロックを解除するために、`tests/ci/catalog-sync.test.js` と `tests/install.test.js` に再試行ロジックとタイムアウトの増加を追加した。
- 2026-03-22: 新しい `ai-regression-testing`、`claude-devfleet`、および `everything-claude-code` スキルがカタログとインストールマニフェストに正しく登録され、テストがパスすることを確認した。
- 2026-03-22: `skills/prompt-optimizer` を追加し、`manifests/core.json` と `manifests/full.json` に追加した。カタログの同期スクリプトとテストがすべてパスすることを確認した。
- 2026-03-22: Codex、Cursor、OpenCode 全体でのクロスハーネス互換性に関するアーキテクチャの決定と計画を概説するために、`docs/architecture/cross-harness.md` を追加した。
- 2026-03-23: スキルのフロントマター内の折りたたまれたブロックスカラー（`>`）によって引き起こされた、壊れたインライン改行とフラットな Markdown レンダラーの失敗を修正した。リポジトリ全体にわたって、`skills/*/SKILL.md` の説明をインライン文字列に変更した。`tests/run-all.js` を再実行して修正を検証した。
- 2026-03-23: OpenCode エコシステムへの統合を宣言するために、`package.json` に `.opencode/plugin.json` エクスポーターを追加し、`tests/ci/opencode-sync.test.js` を作成し、マニフェストを同期した。
- 2026-03-23: ECC コミュニティ主導の成長指標と資金調達目標の透明性を高めるために、`docs/business/metrics-and-sponsorship.md` を追加し、メインの `README.md` にリンクした。
- 2026-03-24: `scripts/ci/validate-workflow-security.js` を追加して、リポジトリ内のすべての GitHub Actions ワークフローで、`actions/checkout` ステップに `persist-credentials: false` が設定されていることを強制し、GHA の書き込み権限の漏洩を防いだ。すべての既存の `.github/workflows/*.yml` ファイルを更新してこれに準拠させた。
- 2026-03-25: 新しい言語固有の `rust-reviewer` と `cpp-reviewer` を導入し、それらを `manifests/developer.json` に追加して、カタログが `29` エージェントと `119` スキルで同期されていることを確認した。
- 2026-03-26: ローカルでのデバッグと継続的なオブザーバーの調整を簡素化するために、`scripts/cli/ecc-doctor.js` と `scripts/cli/ecc-repair.js` を追加した。これらは問題の診断と修正に役立つ。
- 2026-03-28: `SOUL.md` を追加した。これは、ECC のコア・アイデンティティ、原則、エージェントオーケストレーションの哲学、およびクロスハーネスビジョンを定義する新しいドキュメントである。
- 2026-03-28: インストールマニフェストの検証を強化し、壊れた（存在しない）スキル参照が `tests/ci/manifest-validation.test.js` で適切にフラグ付けされるようにした。
- 2026-03-29: `README.md` を更新し、12以上の言語固有のレビューアとビルドリゾルバ、新しいスキル、および機能を追加した。
- 2026-03-30: `mcp-configs/mcp-servers.json` の `mcp__context7__resolve-library-id` と `mcp__context7__query-docs` を修正し、`mcp-configs/` に関する `CONTRIBUTING.md` のドキュメントを追加して、ユーザーがローカルで Context7 MCP を設定する方法をより明確にした。
- 2026-03-30: `docs/SKILL-PLACEMENT-POLICY.md` を追加して、スキルをどこに配置し、いつ新しいディレクトリを作成し、いつ既存のスキルを変更するかに関するポリシーを明確にした。

### 2026-04
- 2026-04-02: パブリックリリースサーフェスをライブ OSS ディレクトリに同期した: `README.md`, `CLAUDE.md`, `agents/openai.yaml`, `.cursor/rules/`, および `.opencode/plugin.json`。エージェントは38個、スキルは156個、コマンドは72個となった。
- 2026-04-02: 欠落していた `commands/` エントリに対してレガシーコマンドシムを生成し、古いワークフローが `/e2e`, `/go-test`, `/setup-pm` などの ECC ネイティブスキルを継続して使用できるようにした。
- 2026-04-02: リリースノート作成とリリースエンジニアリングタスクのために `docs/releases/1.10.0/` を追加した。
- 2026-04-02: コミュニティの貢献のために、10の新しいスキルと2つの新しいエージェントで `manifests/` ファイル（`full.json` を含む）を更新した。
- 2026-04-04: `ecc2/` に ECC 2.0 アルファのコントロールプレーンバイナリ（Rust ベースの TUI、SQLite）を追加した。ローカルでビルドし、基本的な TUI を実行できる。
- 2026-04-05: `manifests/` がすべてのエージェント、スキル、およびコマンドを登録していることを確認する CI マニフェスト同期チェック（`tests/ci/manifest-sync.test.js`）を追加し、不足していた 12 個のコマンドを `commands-core` に追加して手動で同期させた。
- 2026-04-05: リポジトリのカタログ統計を1つのモジュールから一元的に管理およびエクスポートする `scripts/catalog/stats.js` を追加し、README およびリリースサーフェス全体でハードコードされた数値の不一致を解決した。
- 2026-04-05: `6eba30f` の Hermes ブランチのオペレータースキルを、ブランチ全体をリプレイすることなく選択的に救出した。`skills/github-ops`, `skills/knowledge-ops`, `skills/hookify-rules` を追加し、それらをインストールモジュールに配線し、リポジトリを `159` 個のスキルに再同期させた。`knowledge-ops` は、クローンされたリポジトリ内のライブコード、GitHub/Linear でのアクティブな真実（active truth）、ナレッジベース（KB）/アーカイブレイヤーでのより広範な非コードコンテキストなど、現在のワークスペースモデルに明示的に適合された。
- 2026-04-05: `db6d52e` で残りの OpenCode npm-publish ギャップを修正した。ルートパッケージは、`prepack` 時に `.opencode/dist` をビルドし、コンパイルされた OpenCode プラグインアセットを公開された tarball に含め、専用の回帰テスト（`tests/scripts/build-opencode.test.js`）を伴うようになったため、パッケージがそのサーフェス用の生（raw）の TypeScript ソースのみを出荷することはなくなった。
- 2026-04-05: `skills/council` を追加し、`#1193` から安全な `code-tour` レーンを直接移植し、リポジトリを `162` 個のスキルに再同期させた。`code-tour` は自己完結型のままであり、実際のファイル/行のアンカーを持つ `.tours/*.tour` アーティファクトのみを生成する。スキル内で外部ランタイムや拡張機能のインストールは想定されていない。
- 2026-04-05: `ECC-Tools/main` の修正 `f615905` をデプロイした後、最新の自動生成された ECC バンドル PR の波（`#1275`-`#1281`）をクローズした。これにより、不変のヘッド SHA に対して PR スレッドの再試行分析を実行できるようにしつつ、リポジトリレベルの Issue コメント `/analyze` 要求が繰り返しバンドル PR を開くのをブロックするようになった。
- 2026-04-05: `agents/seo-specialist.md` と `skills/seo/SKILL.md` を `main` に直接移植して SEO のギャップを埋め、`skills/seo` を `business-content` に配線した。これにより、`team-builder` 内の SEO スペシャリストへの古い参照が解決され、古い PR を全体としてマージすることなく、公開カタログが `39` エージェントと `163` スキルになった。
- 2026-04-05: `#1214` から有用な共通ルールの差分を `rules/common/coding-style.md` と `rules/common/testing.md` に直接救出した（KISS/DRY/YAGNI のリマインダー、命名規則、コードの匂い（code-smell）のガイダンス、AAAスタイルのテストガイダンスなど）。その後、元の混合削除 PR をクローズした。その PR での広範なスキルの削除は、意図的にリプレイされなかった。
- 2026-04-05: `bf5961e` で `.github/workflows/monthly-metrics.yml` の古い行（stale-row）のバグを修正した。ワークフローは、月がすでに存在する場合に早期にリターンするのではなく、Issue `#1087` の現在の月の行を更新するようになった。ディスパッチされた実行により、4月のスナップショットが現在のスター/フォーク/リリースの数に更新された。
- 2026-04-05: 分岐した Hermes ブランチから有用なコスト管理ワークフローを、ブランチをリプレイするのではなく、小さな ECC ネイティブのオペレータースキルとして回復させた。`skills/ecc-tools-cost-audit/SKILL.md` は現在 `operator-workflows` に配線されており、Webhook -> キュー -> ワーカートレース、バーン（burn）の抑制、クォータのバイパス、プレミアムモデルの漏洩、および兄弟である `ECC-Tools` リポジトリでの再試行のファンアウト（fanout）に焦点を当てている。
- 2026-04-05: `753da37` で `skills/council/SKILL.md` を ECC ネイティブの4ボイスの決定ワークフローとして追加した。PR `#1254` の有用なプロトコルは保持されたが、シャドウの `~/.claude/notes` への書き込みパスは、決定の差分が重要な場合に `knowledge-ops`、`/save-session`、または直接 GitHub/Linear の更新を優先するために、明示的に削除された。
- 2026-04-05: PR `#1243` から安全な `globals` のバンプ（bump）を council レーンの一部として `main` に直接移植し、PR は代替されたものとしてクローズした。
- 2026-04-05: 完全な監査の後、PR `#1232` をクローズした。提案された `skill-scout` ワークフローは、現在の `search-first`, `/skill-create`, `skill-stocktake` と重複している。もし専用のマーケットプレイス発見レイヤーが後で戻る場合は、並行する発見パスとして着地させるのではなく、現在のインストール/カタログモデルの上に再構築する必要がある。
- 2026-04-05: PR `#1209` から安全なローカライズされた README スイッチャーの修正を、ドキュメントの PR を全体としてマージするのではなく、`main` に直接移植した。ナビゲーションには、ローカライズされた README スイッチャー全体で一貫して `Português (Brasil)` と `Türkçe` が含まれるようになり、新しいローカライズされた本文はそのまま保持されている。
- 2026-04-05: 出荷された古い InsAIts サーフェスを `main` から削除した。ECC は、外部の Python MCP エントリ、オプトインフックの配線、ラッパー/モニタースクリプト、または現在のドキュメントでの `insa-its` への言及を出荷しなくなった。変更履歴は残っているが、ライブ製品のサーフェスは現在再び完全に ECC ネイティブになっている。
- 2026-04-05: Hermes で生成された再利用可能なオペレーターワークフローレーンを、ブランチ全体をリプレイすることなく救出した。古いネストされた `skills/hermes-generated/*` ツリーの代わりに、6つの ECC ネイティブのトップレベルスキル（`automation-audit-ops`, `email-ops`, `finance-billing-ops`, `messages-ops`, `research-ops`, `terminal-ops`）を追加した。`research-ops` は既存の調査スタックをラップするようになり、他の5つは外部のランタイムの前提を導入することなく `operator-workflows` を拡張している。
- 2026-04-05: Issue `#1185` のための正規の PRD から SRS へのレーンとして、`skills/product-capability` と `docs/examples/product-capability-template.md` を追加した。これは、曖昧な製品の意図と実装の間にある ECC ネイティブの機能契約のステップであり、並行する計画サブシステムを生成するのではなく、`business-content` に配置される。
- 2026-04-05: `product-lens` を厳格化し、新しい機能契約レーンと重複しないようにした。`product-lens` は現在、製品の診断 / 簡単な検証を明示的に所有し、`product-capability` は実装可能な機能計画と SRS スタイルの制約を所有するようになった。
- 2026-04-05: エクスポートされたインベントリ/ドキュメントから削除された `project-guidelines-example` スキルへの古い参照を削除し、`continuous-learning` v1 をサポートされるレガシーパスとしてマークし、`continuous-learning-v2` への明示的なハンドオフを追加することで、`#1213` のクリーンアップを継続した。
- 2026-04-05: 孤立した最後のローカライズされた `project-guidelines-example` ドキュメントを `docs/ko-KR` および `docs/zh-CN` から削除した。このテンプレートは現在 `docs/examples/project-guidelines-template.md` にのみ存在しており、これは現在のリポジトリサーフェスと一致し、削除されたスキルの翻訳されたドキュメントが出荷されるのを避ける。
- 2026-04-05: Issue `#1051` のための現在のパブリックな移行ガイドとして `docs/HERMES-OPENCLAW-MIGRATION.md` を追加した。これは、Hermes/OpenClaw を最終的なランタイムとしてではなく、蒸留（distill）するためのソースシステムとして再定義し、スケジューラー、ディスパッチ、メモリ、スキル、およびサービスレイヤーを、既に存在する ECC ネイティブのサーフェスと ECC 2.0 バックログにマッピングしている。
- 2026-04-05: Issue `#916` の `skills/agent-sort` とレガシーな `/agent-sort` シムを、ECC ネイティブの選択的インストールワークフローとして着地させた。これは、具体的なリポジトリの証拠を使用して、エージェント、スキル、コマンド、ルール、フック、およびエクストラを DAILY バケットと LIBRARY バケットに分類し、並行するインストーラーを発明するのではなく、インストールの変更を `configure-ecc` にハンドオフする。カタログの真実（truth）は現在、`39` エージェント、`73` コマンド、および `179` スキルである。
- 2026-04-05: ブランチをマージするのではなく、安全な README のみの `#1285` スライスを `main` に直接移植した。下流のチームが、インストール、セキュリティ、またはランタイムサーフェスを変更することなく、ECC 上に構築された公開作業にリンクできるように、小さな `Community Projects` セクションを追加した。現在のサプライチェーンポリシーを満たさない外部のサードパーティ製 GitHub Action (`hashgraph-online/codex-plugin-scanner`) を追加しているため、レビューで `#1286` を拒否した。
- 2026-04-05: 完全な差分（full diff）によって `origin/feat/hermes-generated-ops-skills` を再監査した。このブランチは依然としてマージできない：現在の ECC ネイティブのサーフェスを削除し、パッケージング/インストールメタデータを後退させ、新しい `main` のコンテンツを削除する。ブランチマージではなく、選択的な救出ポリシーを継続した。
- 2026-04-05: Hermes ブランチから自己完結型の ECC ネイティブスキルとして `skills/frontend-design` を選択的に救出し、`.agents` にミラーリングし、`framework-language` に配線し、検証後にカタログを `180` スキルに再同期させた。ブランチ自体は、残っているすべての一意のファイルが意図的に移植されるか拒否されるまで、参照用としてのみ残る。
- 2026-04-05: Hermes ブランチから `hookify` コマンドバンドルと、それをサポートする `conversation-analyzer` エージェントを選択的に救出した。`hookify-rules` は既に正規のスキルとして存在していた。このパスにより、外部のランタイムやブランチ全体の後退（regressions）を引き起こすことなく、ユーザー向けコマンドサーフェス（`/hookify`, `/hookify-help`, `/hookify-list`, `/hookify-configure`）が復元された。カタログの真実（truth）は現在、`40` エージェント、`77` コマンド、および `180` スキルである。
- 2026-04-05: Hermes ブランチから自己完結型のレビュー/開発バンドルを選択的に救出した: `review-pr`, `feature-dev`, およびサポートするアナライザー/アーキテクチャエージェント（`code-architect`, `code-explorer`, `code-simplifier`, `comment-analyzer`, `pr-test-analyzer`, `silent-failure-hunter`, `type-design-analyzer`）。これにより、ブランチの広範な後退をマージすることなく、PR レビューと機能計画に関する ECC ネイティブのコマンドサーフェスが追加された。カタログの真実（truth）は現在、`47` エージェント、`79` コマンド、および `180` スキルである。
- 2026-04-05: Hermes ブランチから移行レーン用のサニタイズされたオペレータートポロジドキュメントとして `docs/HERMES-SETUP.md` を移植した。これは `#1051` 向けのドキュメントのみのサポートであり、ランタイムの変更ではなく、Hermes ブランチ自体がマージ可能であることを示すものではない。
- 2026-04-05: `origin/feat/hermes-generated-ops-skills` に関する有用な救出パス（salvage pass）を完了した。残りの一意のファイルは明示的に拒否された：
  - 重複する git ヘルパーコマンド（`commit`, `commit-push-pr`, `clean-gone`）は、現在のチェックポイント / 公開フローと重複している
  - `scripts/hooks/security-reminder*` は、現在のランタイムポリシーでは正当化されない新しい Python 実行のフックパスを追加する
  - `skills/oura-health` と `skills/pmx-guidelines` はユーザーまたはプロジェクト固有であり、正規の ECC サーフェスではない
  - `docs/releases/2.0.0-preview/*` は時期尚早な巻き添え（collateral）であり、後で現在の製品の真実から再構築する必要がある
  - ネストされた `skills/hermes-generated/*` は、すでに `main` に移植されているトップレベルの ECC ネイティブのオペレータースキルに取って代わられた
- 2026-04-08: `agent.yaml` の正規の `commands:` セクションを復元し、YAML エクスポートサーフェスと実際の `commands/` ディレクトリ間の正確な同等性を強制する `tests/ci/agent-yaml-surface.test.js` を追加することで、`#1327` で報告されたコマンドエクスポートの後退を修正した。リポジトリの完全なテストスイートで検証し、`1764/1764` パスした。
