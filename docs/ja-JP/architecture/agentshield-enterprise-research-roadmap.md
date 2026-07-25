# AgentShield エンタープライズ研究ロードマップ

生成日時：2026-05-12；5月16日の AgentShield PR #87、#88、#89 のエビデンスでリフレッシュ。

これは、次の AgentShield エンタープライズイテレーションのための計画アーティファクトです。AgentShield のコードを変更しません。目標は、現在のスキャナー、ポリシーゲート、コーパス、レポートサーフェスを、複数のハーネスにまたがって AI コーディングエージェントを実行するチームのためのセキュリティコントロールプレーンに変えることです。

## レビューしたエビデンス

現在の AgentShield リポジトリの状態：

- クリーンな `main` 上の AgentShield チェックアウト。
- `README.md`、`API.md`、`package.json`、`.github/workflows/*`、
  `src/`/`tests/` のモジュールレイアウト。
- 現在サポートされるユーザーサーフェス：`agentshield scan`、`agentshield init`、
  `agentshield miniclaw start`、スキャナー JSON、MiniClaw API、GitHub Action、
  HTML、SARIF、markdown、terminal、JSON レポート。
- 現在のエンタープライズライクなサーフェス：ポリシーパック、GitHub Action ポリシー
  強制、SARIF ポリシー違反、サプライチェーン来歴、コーパス
  ベンチマーク、HTML エグゼクティブレポート、例外ライフサイクル監査。

公式 GitHub リポジトリまたは README ソースから確認した外部リファレンス：

- [stablyai/orca](https://github.com/stablyai/orca)：マルチエージェント IDE、
  ワークツリー分離、ライブエージェントステータス、GitHub 統合、diff レビュー、
  通知。
- [superset-sh/superset](https://github.com/superset-sh/superset)：ワークツリー
  オーケストレーション、組み込みの diff レビュー、ワークスペースプリセット、
  ユニバーサル CLI エージェント互換性を備えた AI エージェントエディター。
- [standardagents/dmux](https://github.com/standardagents/dmux)：ライフサイクルフック、
  マルチエージェント起動、ペイン可視性、merge/PR ワークフローを備えた tmux/ワークツリー
  マルチプレクサー。
- [jarrodwatts/claude-hud](https://github.com/jarrodwatts/claude-hud)：Claude
  Code ステータスライン、コンテキスト health、ツールアクティビティ、エージェント追跡、todo
  進捗、トランスクリプトパース、使用量テレメトリ。
- [stanford-iris-lab/meta-harness](https://github.com/stanford-iris-lab/meta-harness)：
  繰り返し可能なタスク、ログ化された proposer インタラクション、評価されたスキャフォールド変更を通じた
  ハーネス最適化。
- [greyhaven-ai/autocontext](https://github.com/greyhaven-ai/autocontext)：
  トレース、スコアリングされた生成、プレイブック、永続化された知識、シナリオ評価、
  オプションの本番トレースを備えた再帰的改善ループ。
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)：
  自己改善スキル、メモリ、セッション検索、マルチプラットフォームゲートウェイ、
  スケジュールされた自動化、ターミナルバックエンド、trajectory 生成。
- [anthropics/claude-code](https://github.com/anthropics/claude-code)：
  terminal、IDE、GitHub、プラグイン、権限、MCP、データ保持のサーフェス。
- [anomalyco/opencode](https://github.com/anomalyco/opencode)：build/plan エージェント、
  デスクトップベータ、client/server アーキテクチャ、LSP サポートを備えた、
  provider 非依存のオープンソースコーディングエージェント。
- [opencode-ai/opencode](https://github.com/opencode-ai/opencode)：セッション、providers、LSP、
  ファイル変更追跡、カスタムコマンド、auto-compact を備えた、以前のアーカイブ済みの Go ベースの
  ターミナルエージェント。
- [zed-industries/zed](https://github.com/zed-industries/zed)：厳格な
  ライセンス/コンプライアンス CI の期待を持つ、高性能マルチプレイヤーエディター。
- [aidenybai/ghast](https://github.com/aidenybai/ghast)：Ghostty を中心に構築された
  ネイティブターミナルマルチプレクサー、ワークスペースグルーピング、スプリットペイン、drag/drop、
  通知、ターミナル検索。

ローカル Claude Code ソースの検査：

- プライベートな Claude Code ソーススナップショットから、非秘密のローカルファイル/モジュールの形のみを
  レビューした。
- 観測された関連サーフェス：`tools/`、`utils/permissions/`、`utils/mcp/`、
  `utils/hooks/`、`utils/plugins/`、`types/permissions.ts`、
  `types/plugin.ts`、`remote/`、`tasks/`、`assistant/sessionHistory.ts`、
  セッション/履歴ユーティリティ。
- コードはコピーしなかった。教訓は、AgentShield が `.claude/` ツリーを唯一の
  真実のソースとして扱うのではなく、権限、プラグイン、MCP、フック、リモートセッション、
  task/subagent アクティビティ、履歴をファーストクラスの監査ドメインとして追跡すべきということである。

## 現在の AgentShield の位置づけ

AgentShield はすでに静的 lint ツール以上のものです：

- ルールカバレッジは、シークレット、権限、フック、MCP サーバー、エージェント設定、
  プロンプトインジェクション、サプライチェーン、taint 分析、サンドボックス実行、ポリシー評価、
  ランタイム修復/ステータス、コーパス検証、MiniClaw、Opus 分析にまたがる。
- レポートは人間と機械が使用可能：terminal、JSON、markdown、HTML、
  SARIF、スキャンログ、GitHub Action 出力。
- エンタープライズフックが存在：ポリシーパック、例外メタデータ、expiring/expired な
  例外レポート、SARIF code scanning、job-summary 出力。
- 精度作業がアクティブ：`runtimeConfidence`、テンプレート/例の重み付け、
  docs-example のダウングレード、インストール済み Claude plugin-cache の信頼度、
  hook-manifest の解決、false-positive 監査ガイダンス、コーパス準備。
- エビデンスパックの消費は、下流ツールにとって十分ファーストクラスになった：
  `agentshield evidence-pack inspect` がバンドルを検証し、レポートスコア、finding カウント、
  ランタイム信頼度、ポリシー、baseline、サプライチェーン、CI コンテキスト、remediation、不正な
  アーティファクトエラーについてコンパクトな JSON/text サマリーを出力する。
- フリートレベルのエビデンスパック消費が、ローカルのルーティングプリミティブを持つようになった：
  `agentshield evidence-pack fleet <dirs...> [--json]` が複数の inspect された
  バンドルを ready、security-blocker、policy-review、baseline-regression、supply-chain-review、
  invalid のルートに集約する。
- ECC-Tools がそのフリートプリミティブをホステッドセキュリティレビューで消費するようになった：
  `agentshield-evidence/fleet-summary.json` が invalid なパック、security
  blocker、policy レビュー、baseline リグレッション、supply-chain レビューをホステッド findings に
  ルーティングする。

5月16日の更新：AgentShield PR #87 が
`26bb44650663816d07180e0d20c1895e431a326c` としてマージ。インストール済みの Claude
plugin cache コンテンツを `runtimeConfidence: plugin-cache` として分類し、非秘密の
plugin-cache のスコア影響を `0.5x` に保ち、リポジトリローカルの非 Claude `plugins/cache` パスの
ダウングレードを避け、キャッシュされたフック実装がアクティブな `hook-code` として現れる前に
plugin-cache 分類が勝つようにする。
AgentShield PR #88 が
`65ed6e2a87545dc99d962b58413f49096a4d70ec` としてマージ。
`agentshield evidence-pack inspect <dir> [--json]` を追加し、readback の前にバンドルを検証し、
すべてのコンシューマー向けエビデンスアーティファクトを要約し、不正だが有効な JSON アーティファクトが
inspection をクラッシュさせないようにする。
AgentShield PR #89 が
`521ada9091bb6d818511ab8589ae675b920c106a` としてマージ。
`agentshield evidence-pack fleet <dirs...> [--json]` を追加し、inspect パスを通じて各パックを検証し、
finding、policy、baseline、supply-chain、remediation の合計を集約し、各パックを
決定論的なフリートルートに割り当てる。

フリートルーティング後の次のイテレーションは、デフォルトで「regex ルールをもっと追加する」であるべきではありません。ECC-Tools のフォローアップルーティングが現在フリートサマリーを消費し、ホステッド findings でソースエビデンスパスを表面化し、最初のクロスハーネスポリシースライスが現在 AgentShield フリートルートのターゲットパスをハーネスオーナーレビューにリンクします。AgentShield フリート出力は現在、ルーティングされたパックのソースエビデンスパスと owner-ready な推奨を持つ `reviewItems` も出力します。より高いレバレッジの動きは、ルーティングされたフリート findings のための耐久性のあるポリシーエクスポートとワークフロー自動化です。

## エンタープライズのギャップ

### 1. 組織ベースラインとドリフト

エンタープライズのバイヤーは、リポジトリ、チーム、またはエージェントフリートが時間とともにより安全になっているか、よりリスキーになっているかを知る必要があります。AgentShield はスキャンログと baseline 比較モジュールを持ち、PR #63 が現在そのドリフトを GitHub Action の入力、出力、アノテーション、job-summary エビデンスを通じて公開します。PR #64 は `agentshield baseline write` を通じてファーストクラスの baseline スナップショット作成を追加します。残りの製品サーフェスは、CLI ドリフトサマリー、エビデンスパック、owner-ready なデルタを明示的にすべきです。

ターゲットケイパビリティ：

- `agentshield baseline write --path .claude --output agentshield-baseline.json`
- `agentshield scan --baseline agentshield-baseline.json`
- new、fixed、unchanged、suppressed、policy-excepted な findings のためのレポートセクション。
- ある時点のグレードだけではなく、「セキュリティ姿勢が変化した」を投稿する GitHub Action 出力。

### 2. マルチハーネスセキュリティアダプター

市場は、1つのツールではなく、多数の並列エージェントハーネスへと移行しています。Orca、Superset、dmux、OpenCode、Claude Code、Codex、Gemini、Zed、ターミナルマルチプレクサーはすべて、異なるセキュリティサーフェスを作り出します。

ターゲットケイパビリティ：

- `claude-code`、`opencode`、`codex`、`gemini`、`zed`、`dmux`、`orca`、`superset`、
  `generic-terminal` のための小さなアダプターレジストリ。
- 各アダプターは、設定パス、権限の概念、プラグインサーフェス、
  MCP/ツーリング規約、履歴/セッションサーフェス、CI エビデンスを宣言する。
- レポート出力は findings をハーネスと信頼度でグループ化し、テンプレート/docs の
  findings がアクティブなランタイムの露出のように見えないようにする。

### 3. セッションとワークツリーの認識

ワークツリーネイティブなオーケストレーターは、リスクモデルを変えます。チームは、それぞれ独自のブランチ、シェル、MCP 設定、ローカル状態を持つ多数のエージェントを並列で実行できます。

ターゲットケイパビリティ：

- ブランチ、ワークツリーパス、エージェント名、セッション id、provider、オーケストレーターのための
  オプションのスキャンメタデータ。
- 以下に答えるスキャン履歴テーブル：どのワークツリーが新しい権限を導入したか、
  どのエージェント実行がリスキーな MCP を追加したか、どのブランチがポリシーを緩めたか、
  最終的にマージされたブランチがそれを修正したかどうか。
- ステータスライン、GitHub チェック、ローカルダッシュボードで使用可能な、コンパクトな「セキュリティ HUD」サマリー。

### 4. バイヤーと監査人のためのエビデンスパック

HTML レポートは今日の適切なバイヤー向けアーティファクトです；ネイティブ PDF は延期されています。より深いニーズは、監査、セキュリティレビュー、顧客アンケートに添付できるポータブルなエビデンスバンドルです。

ターゲットケイパビリティ：

- `agentshield scan --evidence-pack out/agentshield-evidence`
- バンドルには JSON レポート、HTML レポート、SARIF、ポリシー評価、
  例外監査、baseline diff、依存関係/来歴サマリー、およびアーティファクトの解釈方法を説明する
  短い README が含まれる。
- シークレット、ローカルパス、ユーザー名、プロジェクト名のためのオプションの redaction モード。

### 5. リグレッションコーパスとリファレンスセット

Meta-Harness と Autocontext は同じ教訓を指し示します：改善にはスコアリングされたシナリオ、トレース、プレイブックが必要です。AgentShield はすでにコーパスベンチマークを持っていますが、エンタープライズの信頼には、false positive、false negative、ポリシーリグレッションのためのキュレーションされたリファレンスセットが必要です。

ターゲットケイパビリティ：

- critical なルール、false-positive の suppression、ポリシー例外、テンプレート/docs の例、
  プラグインマニフェスト、hook-code 解決のためのバージョン管理されたシナリオフィクスチャ。
- 集約的な準備状況だけではなく、カテゴリごとの precision/coverage レポート。
- リリース前に合格しなければならない「精度リグレッションなし」ゲート。
- suppression が存在する理由と、いつ expire すべきかのプレイブックノート。

### 6. 修復ワークフロー

セキュリティツールは、メンテナーをあふれさせることなく findings を責任ある作業に変えるとき、エンタープライズグレードになります。

ターゲットケイパビリティ：

- 安全な変換のための、ワンクリックまたは CLI 生成の修復ブランチ。
- ファイル順ではなく、owner とリスクで findings をグループ化するポリシーコメント。
- check-run アノテーション、issue キャップ、Linear 同期、延期されたバックログエクスポートのための
  GitHub App サポート。
- 繰り返しのスキャンにまたがる重複 issue を避ける finding フィンガープリント。

### 7. 脅威インテリジェンスとパッケージレピュテーション

エージェントセキュリティは、MCP パッケージ、プラグインリポジトリ、action バンドル、急速に変化する CLI エコシステムに依存します。静的チェックには、メンテナンスされた外部レピュテーションレイヤーが必要です。

ターゲットケイパビリティ：

- 既知の MCP/パッケージのリスク、CVE、マルウェアパッケージ名、疑わしいインストールスクリプト、
  可変な git 依存関係、known-good なパッケージのための local-first な脅威インテルキャッシュ。
- オフラインの決定論的モードは引き続き利用可能。
- オンラインエンリッチメントは opt-in であり、すべての外部の主張について明確な来歴を生成する。

### 8. コマーシャルとチームの制御

AgentShield はすでに概念的に ECC Tools GitHub App に接続されています。ネイティブ GitHub payments は製品パスをより具体的にします：無料のローカルスキャン、有料の組織ポリシーゲート、有料のエビデンスバンドル、有料のドリフト/履歴。

ターゲットケイパビリティ：

- Tier 認識の GitHub App チェック：無料の静的スキャン、有料の組織ポリシー強制、
  有料のエビデンスパック、有料の履歴ドリフト、有料の深い分析。
- ポリシーオーナーと例外承認者のための seat/team マッピング。
- payment 状態が強制の挙動を静かに変えないよう、ECC-Tools と共有される billing 準備チェック。

## 推奨される構築順序

### スライス1：ベースラインドリフト MVP

最小のエンタープライズコントロールプレーンプリミティブを実装する：このスキャンを最後に承認された baseline と比較する。

アーティファクト：

- Baseline JSON スキーマ。
- Baseline ライターとコンパレーター。
- new/fixed/unchanged な findings のための terminal と JSON のレポートセクション。
- 安定したフィンガープリント、fixed findings、new findings、ポリシー
  例外の carry-forward をカバーするテスト。

なぜ最初か：

- 既存のスキャン出力を再利用する。
- CLI、GitHub Action、GitHub App の価値を一度に改善する。
- ホステッドサービスを必要としない。

### スライス2：エビデンスパックバンドル

既存の機械および人間のレポートを、ポータブルな監査アーティファクトにバンドルする。

アーティファクト：

- `--evidence-pack <dir>` CLI フラグ。
- Redact されたバンドル README。
- HTML、JSON、SARIF、policy、exception、baseline diff のファイル。
- ファイルレイアウト、redaction、決定論的な出力名のためのテスト。

なぜ2番目か：

- 既存のレポート作業をバイヤー対応の証明に変換する。
- 監査ハンドオフのニーズを満たしつつ、ネイティブ PDF を延期したままにする。

### スライス3：ハーネスアダプターレジストリ

ハーネスサポートを暗黙ではなく明示的にする。

アーティファクト：

- Claude Code、OpenCode、Codex、Gemini、dmux、generic
  terminal、プロジェクトローカルテンプレートのためのアダプターメタデータ。
- どのアダプターが一致したか、なぜかを報告する探索出力。
- アダプターによるレポートグルーピング。
- 各アダプターのフィクスチャディレクトリを使用したテスト。

なぜ3番目か：

- AgentShield を ECC のハーネス非依存のポジショニングに整合させる。
- すべてのハーネスが Claude の設定モデルを共有しているかのように装うことなく、将来の Zed、Orca、Superset、Hermes
  統合のための安定したサーフェスを作る。

### スライス4：コーパス精度ゲート

コーパスをベンチマークからリリースゲートに昇格させる。

アーティファクト：

- カテゴリごとのコーパスレポート。
- 必要なカテゴリのしきい値。
- 既知の false-positive suppression のためのリグレッションスナップショット。
- publish 前にコーパス準備を要求するリリースチェックリストエントリ。

なぜ4番目か：

- ルールが拡大するにつれてエンタープライズの信頼性が低下するのを防ぐ。
- 後の Meta-Harness/Autocontext スタイルの改善ループのための耐久性のあるルートを作る。

### スライス5：GitHub App と Linear 同期の配線

AgentShield の findings を ECC-Tools のフォローアップルーティングに接続する。

アーティファクト：

- ECC-Tools の issue キャップと互換性のある finding フィンガープリント。
- baseline ドリフトとポリシー違反のための Linear 対応バックログエクスポート。
- owner/risk でグループ化された check-run アノテーション。
- 繰り返しのスキャンが重複 issue をスパムしないことを保証するテスト。

なぜ5番目か：

- スライス1の baseline/フィンガープリントの作業を必要とする。
- ローカル CLI から有料チームワークフローへの橋渡しである。

## このイテレーションの非目標

- バイヤー/コンプライアンスのワークフローが HTML と print-to-PDF の代わりに生成された PDF を
  明示的に要求しない限り、ネイティブ PDF 生成。
- ローカルの baseline/evidence/fingerprint 契約が安定する前のホステッドダッシュボード。
- 決定論的なコーパスゲートとリファレンストレースが存在する前の、ファインチューニングまたはモデル
  トレーニング。
- 明示的でレビュー可能な変換とテストなしの、リスキーな findings のための広範な自動コード
  書き換え。

## 受け入れゲート

AgentShield エンタープライズイテレーションは、以下が真になるまで完了しません：

- ローカルの `npm run typecheck`、`npm run lint`、`npm test`、`npm run build`
  が AgentShield リポジトリのルートから合格する。
- ビルドされた CLI のスモークテストが、新しいフラグまたはレポートモードをカバーする。
- GitHub Action のセルフテストが、新しい CI 可視の出力をカバーする。
- ドキュメントが、free/local のパスと paid/team のパスを別々に名指しする。
- ランタイム信頼度の変更が、低信頼度の plugin/package サーフェスが
  抑制されるのではなく可視のままであることを証明するライブスキャンエビデンスを含む。
- 機能が生成するエビデンスが、CI diffing に十分に決定論的である。
- ECC-Tools が、GitHub/Linear のオブジェクトキャップを超えることなく、finding フィンガープリントまたは
  バックログエクスポートを消費できる。
- GA ロードマップと Linear プロジェクトステータスが、マージされた AgentShield PR にリンクする。
