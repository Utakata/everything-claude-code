# ECC 2.0 GA ロードマップ

このロードマップは、アクティブな Linear プロジェクトのための耐久性のあるリポジトリミラーです：

<https://linear.app/itomarkets/project/ecc-platform-roadmap-52b328ee03e1>

Linear の issue 作成は、Ito Markets ワークスペースで再び利用可能になりました。ライブの実行の真実は、以下に分割されています：

- Linear プロジェクトのドキュメント、issue レーン、依存関係、マイルストーン；
- このリポジトリドキュメント；
- マージされた PR エビデンス；
- `~/.cluster-swarm/handoffs/` 配下のハンドオフ。

## 現在のエビデンス

2026-05-17 時点：

- GitHub キューは `affaan-m/everything-claude-code`、
  `affaan-m/agentshield`、`affaan-m/JARVIS`、`ECC-Tools/ECC-Tools`、
  `ECC-Tools/ECC-website` 全体でクリーンです：最新の `platform-audit` スイープは、無関係な
  ローカルの `docs/drafts/` ディレクトリを許可した場合、オープン PR 0件、
  オープン issue 0件、ディスカッションのメンテナー対応ギャップ 0件、承認済み回答が欠けている
  回答可能な Q&A 0件、ブロッキング dirty ファイル 0件を検出しました。5月17日のキューバッチは #1961、#1963、
  #1953 をマージし、非互換の #1962 をクローズ/スキップし、#1953 が #1951 をクローズしました。
- GitHub ディスカッションは、それらの追跡対象リポジトリ全体で最新です：
  `affaan-m/everything-claude-code` には計58のディスカッションがあり、#73 と #1239 への5月15日のメンテナー更新の後、
  メンテナー未対応は 0件です；AgentShield、
  JARVIS、ECC Tools、ECC Tools website はディスカッションが無効か計0件です。
- 現在の Linear ロードマップには、16の issue レーン（`ITO-44` から
  `ITO-59`）と5つのマイルストーンが含まれます：Security and Access Baseline、ECC 2.0 Preview
  and Publication、AgentShield Enterprise Iteration、ECC Tools Next-Level
  Platform、Legacy Audit and Salvage。
- Linear ライブ同期は5月17日のマージバッチについて最新です：ITO-57 に新しい
  サプライチェーン保護コメント（`ca703b95-41a1-403e-9bc4-3d68edd4d4a3`）があり、
  ECC platform プロジェクトに新しいオペレーター進捗スナップショット
  （`6c4d1b92-95cf-4ea1-84fd-cbea36f24d1a`）があります。
- `docs/releases/2.0.0-rc.1/publication-evidence-2026-05-17.md` は、
  5月17日の queue-zero 状態、日本語ローカライゼーションマージ、Dependabot の TypeScript
  と Node 型のマージ、マージ後の ja-JP lint 修復、Mini Shai-Hulud/TanStack
  ローカル保護の再チェック、npm audit/署名チェック、現在のオペレーター
  ダッシュボード、`99dd6ac0` の GitHub CI 成功を記録します。
- `docs/releases/2.0.0-rc.1/operator-readiness-dashboard-2026-05-17.md`
  は、ライブのプラットフォーム監査エビデンスから ITO-44 のプロンプトからアーティファクトへのダッシュボードを
  再生成します：PR キュー、issue キュー、ディスカッションキュー、ローカルワークツリーゲート、
  ダッシュボード生成、サプライチェーンループは最新です；publication、plugin、
  billing、AgentShield、ECC Tools、legacy、Linear/productized 同期のレーンが
  次の作業のままです。
- `docs/releases/2.0.0-rc.1/publication-evidence-2026-05-16.md` は、
  キュー、ディスカッション、Linear ロードマップ、ECC Tools アクセス、Mini Shai-Hulud/TanStack
  フルキャンペーンフォローアップ、スケジュールされたサプライチェーンウォッチカバレッジ、no-lifecycle
  CI インストールハードニング、GitHub Actions キャッシュパージ、AgentShield #85
  レジストリ署名検証、AgentShield #86 エビデンスパック CI 来歴、
  AgentShield #87 プラグインキャッシュランタイム信頼度分類、AgentShield
  #88 エビデンスパックの inspect/readback、AgentShield #89 エビデンスパックフリート
  ルーティング、AgentShield #90 フリートレビューアイテム、AgentShield #91
  チェックサムバックアップのポリシーエクスポート、AgentShield #92 チェックサム検証済みポリシー
  昇格、ECC-Tools #75 billing ゲート厳格化、
  ECC-Tools #76 AgentShield フリートサマリー消費、ECC-Tools #77 ホステッド
  finding エビデンスパス、ECC-Tools #78 ハーネスポリシールートリンク、PR #1947
  サプライチェーン保護、5月16日のリリースエビデンス
  リフレッシュを記録します。
- `npm run harness:audit -- --format json` は現在の `main` で 70/70 を報告します。
- `npm run observability:ready` は現在の `main` で、GitHub/Linear/handoff/roadmap の
  progress-sync 契約を含め、21/21 の準備状況を報告します。
- GitHub CI 実行 `25983803011` は、Validate Components、
  Coverage、Lint、Security Scan、フルの Node/パッケージマネージャーマトリックスを含め、
  `99dd6ac0db20fce51713b6a1c92515d2453b769e` について正常に完了しました。
- PR #1846 は `797f283036904128bb1b348ae62019eb9f08cf39` としてマージされ、
  npm レジストリ署名検証を耐久性のあるワークフローセキュリティゲートにしました：
  `npm audit` を実行するワークフローは `npm audit signatures` が必要になりました。
- PR #1848 は `cbecf5689d8d1bd5915e7031697a1d56aac538f2` としてマージされ、
  `docs/security/supply-chain-incident-response.md` と、`pull_request_target` ワークフローが
  共有依存関係キャッシュを restore または save するのをブロックするワークフローセキュリティ
  バリデーターのルールを追加しました。
- PR #1940 は `6951b8d5d29d13cac6b89b461104ad03838553de` としてマージされ、
  耐久性のある IOC レポートを出力するスケジュールされたサプライチェーンウォッチワークフローを追加しました。
- PR #1941 は `f7035b5644ffc857879b71c39353b2141f17c3f0` としてマージされ、
  パッケージマネージャーのライフサイクルスクリプトを無効化し、Actions 依存関係キャッシュの使用を削除し、
  それらのパターンが静かに再導入されないようバリデーターカバレッジを追加することで、
  ライフサイクルフック侵害に対して CI 依存関係インストールをハードニングしました。
- PR #1850 は `248673271455e9dc85b8add2a6ab76107b718639` としてマージされ、
  読み取り専用のアナライザーエージェントと zh-CN コピーからシェルアクセスを削除し、
  オペレーターエージェントを変えずにそのサーフェスの AgentShield high findings を減らしました。
- PR #1851 は `209abd403b7eaa968c6d4fa67be82e04b55706d6` としてマージされ、
  write 権限を持つワークフローの `actions/checkout` で
  `persist-credentials: false` を必須にしました。
- PR #1860 は `c2762dd5691a33aaa7f84a0a4901a5bab7980fc8` としてマージされ、
  Ruby/Rails 言語パックサーフェス、インストールエイリアス、
  selective-install コンポーネント、対象を絞った install-manifest executor テストを追加して #1859 をクローズしました。
- AgentShield PR #78 は `1b19a985d6ae1346244089a78806a7d5eaaf270e` としてマージされ、
  write/id-token リリースパスで `persist-credentials: false` と
  `npm ci --ignore-scripts` でリリースワークフローをハードニングしました。
- AgentShield PR #79 は `86a823c5f2c35ee97e6ecf6f99e9ac301d54119a` としてマージされ、
  baseline/watch/remediation のフィンガープリントを共有のハッシュ化された
  エビデンスフィンガープリントヘルパーに移しました。新しい baseline は生の finding エビデンスを省略しつつ、
  古い raw-evidence の baseline は比較可能なままです。
- AgentShield PR #80 は `8ed379d1de067b25640ac6273aa4d9f8e6735d43` としてマージされ、
  失敗したコーパスゲートに優先順位付けされたコーパス精度の推奨を追加し、
  カテゴリ、欠けているルール、config ID で miss をマッピングして、エンタープライズ
  スキャナーリグレッションの作業に実行可能な改善プランを持たせました。
- AgentShield PR #81 は `6583884e74ba2e896942113e1ce3146230e6fb76` としてマージされ、
  remediation プランに順序付けられた remediation ワークフローフェーズを追加し、
  生のエビデンスをコピーせずに安定した finding フィンガープリントを通じて安全な自動修正、
  手動レビュー、検証をルーティングしました。
- AgentShield PR #82 は `51336ba074ad5e9fed2c0aa3237422be22147e76` としてマージされ、
  proxy/runtime の変更、env-token 流出、DNS 流出、
  認証情報ストアアクセス、クリップボードアクセスをカバーする env proxy hijack シナリオで、
  組み込みの攻撃コーパスを拡張しました。
- AgentShield PR #87 は `26bb44650663816d07180e0d20c1895e431a326c` としてマージされ、
  インストール済みの Claude plugin-cache ランタイム信頼度を追加しました。キャッシュされたプラグインの
  findings は現在 `runtimeConfidence: plugin-cache` を出力し、非秘密のスコア影響は
  意図された `0.5x` に留まり、リポジトリローカルの非 Claude `plugins/cache`
  パスはダウングレードされず、キャッシュされたフック実装はアクティブなトップレベルの
  `hook-code` として現れなくなりました。
- AgentShield PR #88 は `65ed6e2a87545dc99d962b58413f49096a4d70ec` としてマージされ、
  下流のコンシューマーのために `agentshield evidence-pack inspect` を追加しました。
  エビデンスパックバンドルは現在、すべてのバンドルファイルを手動で開かずに、レポートスコア、
  finding カウント、ランタイム信頼度、policy、baseline、supply-chain、CI
  コンテキスト、remediation フェーズ、不正なアーティファクトエラーについて、コンパクトな JSON/text リードバックを持ちます。
- AgentShield PR #89 は `521ada9091bb6d818511ab8589ae675b920c106a` としてマージされ、
  下流のフリートルーティングのために `agentshield evidence-pack fleet <dirs...> [--json]` を追加しました。
  複数の検証済みエビデンスパックは現在、finding、policy、baseline、
  supply-chain、remediation の合計とともに、ready、security-blocker、policy-review、baseline-regression、
  supply-chain-review、invalid のルートに集約されます。
- JARVIS PR #13 は `127efabbfb5033ae53d7a53e1546aa3c33d6f962` としてマージされ、
  npm レジストリ署名検証で CI/deploy ワークフローをハードニングし、
  write 権限ジョブで永続化されたチェックアウト認証情報を無効化し、
  `latest` を使う代わりに Vercel CLI のインストールを固定しました。
- ECC-Tools PR #53 は `99018e943d03f024de8c9d278c91f66393d4f1ee` としてマージされ、
  CI の既存の本番依存関係監査の前に npm レジストリ署名検証を追加しました。
- ECC-Tools PR #54 は `05df89721f49c1e19d8502c545e26f5694806998` としてマージされ、
  `open-pr-drafts` が使われないとき `/ecc-tools followups sync-linear` が
  Linear/プロジェクトバックログでコピー対応の PR ドラフトを追跡するようにし、
  追加の PR シェルを開かずに有用な stale-PR 救済の作業を保持しました。
- ECC-Tools PR #55 は `5d8c112cce4794cfa089d5b0ea661ba87a178be1` としてマージされ、
  `/ecc-tools analyze` コメントに analysis-depth の準備状況を追加し、
  CI/CD、security、harness、reference/eval、AI routing/cost-control、team handoff のエビデンスを使用して、
  commit-history-only のリポジトリを evidence-backed と deep-ready のリポジトリから分離しました。
- ECC-Tools PR #56 は `5b729c88641eafe80f65364bab3fc74d0270f57b` としてマージされ、
  analysis-depth の準備状況を、CI diagnostics、security evidence review、harness compatibility、
  reference-set evaluation、AI routing/cost review、team backlog routing のための具体的なホステッドジョブに
  マッピングする、認証済みの `/api/analysis/depth-plan` 契約を追加しました。
- ECC-Tools PR #57 は `4cc61112a4cc9feec7b07af09321f360e34af6a4` としてマージされ、
  最初の実行可能なホステッド分析ジョブを追加しました：
  `/api/analysis/jobs/ci-diagnostics` は現在、CI/CD の準備状況でゲートし、
  workflow/test-runner/failure-evidence のアーティファクトを検査し、CI ハードニングの
  findings と次のアクションを返し、正常な実行の後にのみ使用量を課金します。
- ECC-Tools PR #58 は `ce09dd8d9b46f65c6b88dc4f48cfb6b6227ae0bf` としてマージされ、
  2番目の実行可能なホステッド分析ジョブを追加しました：
  `/api/analysis/jobs/security-evidence-review` は現在、security-evidence の
  準備状況でゲートし、キャップされた AgentShield evidence-pack、policy、baseline、
  SBOM、SARIF、security-scan のアーティファクトを検査し、supply-chain のエビデンス
  findings と次のアクションを返し、正常な実行の後にのみ使用量を課金します。
- ECC-Tools PR #59 は `505b372dbd8f75f996d9e2ed079effd30cec5ba5` としてマージされ、
  3番目の実行可能なホステッド分析ジョブを追加しました：
  `/api/analysis/jobs/harness-compatibility-audit` は現在、harness-config の
  準備状況でゲートし、キャップされた Claude、Codex、OpenCode、MCP、plugin、
  cross-harness ドキュメントのアーティファクトを検査し、ローカルのシークレットを含む設定
  パスをフェッチから除外し、ポータビリティの findings と次のアクションを返し、
  正常な実行の後にのみ使用量を課金します。
- ECC-Tools PR #60 は `b75e0a49ba5672b1ec9a2a4880ddcfa2d07dc557` としてマージされ、
  4番目の実行可能なホステッド分析ジョブを追加しました：
  `/api/analysis/jobs/reference-set-evaluation` は現在、reference-evidence の
  準備状況でゲートし、アナライザーコーパス、RAG/evaluator、PR salvage/review、
  harness、security、CI failure-mode のエビデンスを評価し、明らかな
  シークレットを含むフィクスチャパスをフェッチから除外し、reference カバレッジの
  findings と次のアクションを返し、正常な実行の後にのみ使用量を課金します。
- ECC-Tools PR #61 は `7b01b67cae0b80774b311cb515b7eca0aa038c65` としてマージされ、
  5番目の実行可能なホステッド分析ジョブを追加しました：
  `/api/analysis/jobs/ai-routing-cost-review` は現在、AI routing/cost の
  準備状況でゲートし、model routing、token budget、usage-limit、rate-limit、
  billing/entitlement、cost-regression、cost-policy のエビデンスを評価し、
  明らかなシークレットを含むパスをフェッチから除外し、cost-control の findings と
  次のアクションを返し、正常な実行の後にのみ使用量を課金します。
- ECC-Tools PR #62 は `781d6733e56f7556edb43fb96bdfb00b1f0a3aa6` としてマージされ、
  6番目の実行可能なホステッド分析ジョブを追加しました：
  `/api/analysis/jobs/team-backlog-routing` は現在、team handoff/project
  tracking の準備状況でゲートし、roadmap、runbook、handoff、release-plan、
  issue-template、ownership、project-tracker、backlog、follow-up のエビデンスを評価し、
  明らかなシークレットを含むパスをフェッチから除外し、team-routing の
  findings と次のアクションを返し、正常な実行の後にのみ使用量を課金します。
- ECC-Tools PR #63 は `fb9e4c5ceb9ccde50da74c7a69c3fa4bd321fc07` としてマージされ、
  キューされた PR 分析でホステッド実行プランをオペレーターに見えるようにしました：
  キューは現在、ready/blocked なホステッド executor コマンドと次のアクションテキストを持つ
  非ブロッキングの `ECC Tools / Hosted Depth Plan` check-run を PR head SHA で公開しつつ、
  バンドル生成と分析コメントがブロックされないよう check-run の公開を best-effort に保ちます。
- ECC-Tools PR #64 は `72020ef94db94840812977ea7ac37e9344036668` としてマージされ、
  PR 向けのホステッドジョブディスパッチ制御を追加しました：
  `/ecc-tools analyze --job ...` コメントは現在、PR head SHA に対してホステッドジョブをキューし、
  既存のホステッド readiness/evidence ゲートを通じて実行し、アーティファクト/findings/次のアクションを
  PR に投稿し返し、ホステッドジョブがバンドル分析と衝突しないよう
  冪等性キーをジョブ id でスコープします。
- ECC-Tools PR #65 は `bacd4adf6a3a629e8d403865456d15f127baaf4e` としてマージされ、
  ホステッドジョブの結果履歴/check-run サマリーを追加しました：
  キューされたホステッドジョブは現在、最新の結果と、完了またはブロックされた実行の不変の実行レコードの
  両方をキャッシュし、その後アーティファクト、findings、readiness ブロッカー、次の
  アクションを持つ非ブロッキングのジョブごとの check-run を PR head SHA で公開します。
- ECC-Tools PR #66 は `4e1db48252d068ea5dcf4308b0bc11b0dfe0c9ce` としてマージされ、
  読み取り専用のホステッドステータスコマンドを追加しました：
  `/ecc-tools analyze --job status` は現在、現在の PR head の #65 の最新結果キャッシュを読み、
  次のホステッドジョブコマンドを持つコンパクトな completed/blocked/not-run のテーブルを投稿します。
  作業をキューしたり使用量を課金したりしません。
- ECC-Tools PR #67 は `f20e6bec2b0bf49e4cc36e08b7285c795973b73d` としてマージされ、
  ホステッド depth-plan の check-run をステータス対応にしました：
  キューされた PR 分析は現在、`ECC Tools / Hosted Depth Plan` を公開するとき
  #65/#66 の最新結果キャッシュを読み、プランテーブルに最新のホステッド実行ステータスを含め、
  再実行の前に次の未実行の ready なジョブを推奨します。
- ECC-Tools PR #68 は `2cde524b5ef8f34ab7bb1af973248fe4be4359f8` としてマージされ、
  決定論的なホステッド昇格準備状況を追加しました：
  opened/synchronized な PR は現在、変更ファイルをチェックインされた evaluator/RAG コーパスと
  比較し、欠けているホステッドジョブ昇格エビデンスに警告し、
  `PR_HOSTED_PROMOTION_READINESS_CHECK_MODE=off` で無効化できる、非ブロッキングの
  `ECC Tools / Hosted Promotion Readiness` check-run を公開します。
- ECC-Tools PR #69 は `d0112dac7cef807ae27def41f057682ef0772cce` としてマージされ、
  決定論的な出力スコアリングでホステッド昇格準備状況を拡張しました：
  チェックは現在、現在の PR head のキャッシュされた完了ホステッドジョブ結果を読み、
  そのアーティファクトと findings を evaluator/RAG コーパスの期待に対してスコアリングし、
  ギャップを報告する前に、一致するホステッドアーティファクトを昇格エビデンスとして扱います。
- ECC-Tools PR #70 は `7001d805ac981fe220b4575159f469fbea9dbb76` としてマージされ、
  ホステッド昇格のための取得計画を追加しました：
  チェックは現在、キャッシュされたホステッドアーティファクト、ホステッド findings、期待されるエビデンスパス、
  変更ソースパスからランク付けされた取得候補を出力し、後のホステッドジャッジに
  変更されたパスだけから昇格しないよう伝えるモデルプロンプトシードを出力します。
- ECC-Tools PR #71 は `d41e59ff00fe1bd0b0c96386e56bc5269d7b9c15` としてマージされ、
  最初のモデルバックアップのホステッド昇格ジャッジ契約を追加しました：
  チェックは現在、provider 中立の `hosted-promotion-judge.v1` リクエスト
  契約を出力し、ホステッド取得エビデンス、entitlement、
  残り予算、provider 設定が存在しない限り fail closed します。まだライブのモデル呼び出しは行いません。
- ECC-Tools PR #72 は `973bc51e5436dd279ae5a890cce9811485eef0b5` としてマージされ、
  明示的なゲートの背後でホステッド昇格モデルジャッジを実行します：
  `PR_HOSTED_PROMOTION_MODEL_JUDGE_MODE=execute` は現在、ホステッド取得エビデンス、entitlement、budget、provider、
  executor のゲートが通過した後にのみ設定された provider を呼び出します；チェックは非ブロッキング、strict-JSON-only の
  ままで、生のレスポンスをエコーせずに、引用のないまたは非ホステッドのモデル出力を拒否します。
- ECC-Tools コミット `05d4e8296e37ba72e471beaa23ea4c81eb2aa31f`
  は、ホステッド昇格モデルジャッジにオペレーターが読める監査トレースを追加します：
  check-run は現在、生の provider 出力を露出させずに、承認された決定とともに決定論的なリクエスト
  フィンガープリントと allowed-citation カウントをレンダリングします。
- ECC-Tools PR #73 は `7d0538c9354e18adbfc72ef00d858949a817fa48` としてマージされ、
  `/api/billing/readiness` に fail-closed な native-payments アナウンスゲートを追加しました：
  公開の payment の主張は現在、ローンチコピーがリリースレビューを通過できる前に、
  Marketplace 管理下のテストアカウントからの `announcementGate.ready === true` を要求します。
- ECC-Tools コミット `91a441b92342b842832ac28b018ee46f0c4a906f`
  は、`npm run billing:announcement-gate -- --preflight` を追加し、オペレーターが特権リードバック呼び出しを行う前に、
  Marketplace テストアカウント、内部 API トークンの存在、
  billing-readiness エンドポイントを検証できるようにします。
- ECC-Tools コミット `eb6941290b2fa70db01a51084e9e79a160238468`
  は、ライブ本番のリードバック状態を記録します：Cloudflare Worker のシークレット名には
  `INTERNAL_API_SECRET` が含まれますが、本番 KV 名前空間には現在
  `account-billing:*` や `billing-state:*` のレコードがないため、まだ
  Marketplace 管理下のアカウントはアナウンスゲートを通過できません。
- `~/.cluster-swarm/handoffs/` 配下のハンドオフ `ecc-supply-chain-audit-20260513-0645.md`
  は、5月13日のサプライチェーンスイープを記録します：
  TanStack/Mini Shai-Hulud の指標に対するアクティブなロックファイル/マニフェストのヒットなし；アクティブな npm ロックファイル全体で
  npm audit/署名チェックはクリーン；`ecc2` で `cargo audit` クリーン；trunk `pip-audit`
  クリーン；サポートされる Python 3.12 ターゲットで JARVIS バックエンドの pinned-graph Python 監査はクリーン。
- PR #1861 の検証は、`node scripts/harness-audit.js --format json` を
  70/70 で、`npm run observability:ready` を 21/21 でリフレッシュしました。
- PR #1862 は、JARVIS バックエンドの Python 監査がサポートされる Python 3.12 pinned graph に対して
  再実行された後、このロードマップを更新しました。
- `docs/architecture/harness-adapter-compliance.md` は、Claude Code、Codex、
  OpenCode、Cursor、Gemini、Zed 近縁、dmux、Orca、Superset、Ghast、
  terminal-only のサポートを、インストールパス、検証コマンド、リスク
  ノートにマッピングします。
- `npm run harness:adapters -- --check` は、公開アダプター
  マトリックスが依然として `scripts/lib/harness-adapter-compliance.js` のソースデータに一致することを検証します。
- `docs/releases/2.0.0-rc.1/publication-readiness.md` は、GitHub リリース、
  npm dist-tag、Claude プラグイン、Codex プラグイン、OpenCode パッケージ、billing、
  アナウンスの公開を、新鮮なエビデンスフィールドでゲートします。
- `docs/releases/2.0.0-rc.1/naming-and-publication-matrix.md` は、
  rc.1 のネーミング決定を記録します：Everything Claude Code (ECC) として出荷し、
  npm には `ecc-universal` を、Claude/Codex プラグインスラグには `ecc` を保ち、
  リリースパイプラインが証明された後まで、より広範なリポジトリ/パッケージの改名を延期します。
- `docs/releases/2.0.0-rc.1/publication-evidence-2026-05-12.md` は、
  ドライラン公表エビデンスパスを記録します：npm pack/publish のドライラン、一時インストール
  スモーク、Claude プラグイン検証/タグプリフライト、Codex marketplace CLI の形、
  OpenCode ビルド、残りの承認ゲート付きリリースブロッカー。
- `docs/releases/2.0.0-rc.1/publication-evidence-2026-05-13.md` は、
  リリース準備エビデンスリフレッシュを記録します：70/70 ハーネス監査、アダプター準拠
  PASS、16/16 オブザーバビリティ準備、2376/2376 ルート Node テスト、markdownlint、
  リリースサーフェスと npm publish-surface のテスト、462/462 `ecc2` Rust テスト。
- `docs/releases/2.0.0-rc.1/publication-evidence-2026-05-13-post-hardening.md`
  は、PR #1850 と PR #1851 後のポストハードニングのリリース準備リフレッシュを記録します：70/70 ハーネス監査、アダプター準拠 PASS、18/18 オブザーバビリティ
  準備、2380/2380 ルート Node テスト、markdownlint、リリースサーフェスと
  npm publish-surface のテスト、462/462 `ecc2` Rust テスト、npm audit/署名
  チェック、Rust アドバイザリ監査、TanStack/Mini Shai-Hulud IOC チェック。
- `bfacf37715b39655cbc2c48f12f2a35c67cb0253` の detached なクリーンワークツリーは、
  `--force` なしの Claude プラグインタグ dry-run、ローカル marketplace 発見、temp-home ローカル
  インストール、有効なプラグインリスト、`ecc@ecc`
  `2.0.0-rc.1` のクリーンなアンインストールを検証しました。
- `docs/architecture/evaluator-rag-prototype.md` と
  `examples/evaluator-rag-prototype/` は、最初の読み取り専用の
  自己改善ハーネスプロトタイプを定義します：シナリオ仕様、トレース、レポート、
  候補プレイブック、検証器の結果、承認されたメンテナー救済、
  billing-readiness、CI-failure-diagnosis、harness-config-quality の
  候補、AgentShield policy-exception シナリオ、却下された
  安全でない候補。
- npm パッケージサーフェスは現在、パッケージの `files` 否定ルールと publish-surface リグレッションテストを通じて、Python バイトコード/キャッシュのアーティファクトを除外します。
- `docs/legacy-artifact-inventory.md` は、現在のチェックアウトに `_legacy-documents-*`
  ディレクトリが存在しないことを記録し、2つの兄弟のワークスペースレベルの `_legacy-documents-*` リポジトリを
  サニタイズ済みの抽出ソースとしてインベントリ化し、`legacy-command-shims/` を
  opt-in のアーカイブ/no-action のサーフェスとして分類します。
- `docs/stale-pr-salvage-ledger.md` は、stale PR 救済の結果、
  スキップされた PR、置き換えられた作業、および現在 Linear ITO-55 に添付された、残りの #1687、#1609、#1563、#1564、
  #1565 の translator/manual review の残務を記録します。
- AgentShield PR #53 は、2つの context-rule の false positive を減らし、
  残りの AgentShield issue をクローズしました。
- AgentShield PR #55 は、`policy` / `fail-on-policy` の入力、`policy-status` /
  `policy-violations` の出力、job-summary エビデンス、ポリシー違反アノテーションを持つ
  GitHub Action の組織ポリシー強制を追加しました。
- AgentShield PR #56 は、組織ポリシー違反のための SARIF/code-scanning の出力を
  `agentshield-policy/*` の結果として追加しました。
- AgentShield PR #57 は、OSS、team、enterprise、regulated、
  high-risk-hooks/MCP、CI-enforcement のポリシーパックプリセットと
  `agentshield policy init --pack` を追加しました。
- AgentShield PR #58 は、MCP パッケージの来歴フィールドと、npm vs git、
  pinned vs unpinned、known-good、registry-backed のサプライチェーンエビデンスのためのレポートレベルの
  カウントを追加しました。
- AgentShield PR #59 は、リスク姿勢、critical/high 優先度の findings、カテゴリ露出、README/API
  ドキュメント、ビルド済み CLI スモーク検証、1,704 テストカバレッジを持つ、
  自己完結型の HTML エグゼクティブサマリーを追加しました。
- AgentShield PR #60 は、カテゴリレベルの組み込みコーパスベンチマーク出力、
  `readyForRegressionGate` シグナル、terminal `--corpus` のカテゴリカバレッジ、
  README/API ドキュメント、ビルド済み CLI スモーク検証、1,705 テストカバレッジを追加しました。
- AgentShield PR #61 は、ローカルの typecheck、フル
  テスト、lint、build、リモートの self-scan/action 検証の後、lockfile のみの `postcss` 8.5.6 -> 8.5.14 のバンプで、
  残りの Dependabot security/bugfix PR をクリアしました。
- AgentShield PR #62 は、組織ポリシーの例外ライフサイクル監査
  エビデンスを追加しました：active、expiring-soon、expired の例外カウント；owner、ticket、
  scope、expiry、days-until-expiry のレポート；terminal 出力と GitHub
  Action job-summary エビデンス；README ドキュメント；再ビルドされた action バンドル；
  1,708 テスト検証。
- AgentShield PR #63 は、`baseline` / `save-baseline` の入力、baseline ドリフト出力、job-summary
  エビデンス、リグレッションアノテーション、README/API ドキュメント、再ビルドされた action バンドル、
  green なリモート action/self-scan/Node 検証で、GitHub Action の baseline ドリフトを公開しました。
- AgentShield PR #64 は、severity フィルタリング、JSON メタデータ出力、README/API ドキュメント、
  再ビルドされた CLI バンドル、ローカル TDD カバレッジ、green なリモート action/self-scan/Node
  検証を持つ、ファーストクラスの `agentshield baseline write`
  CLI コマンドを追加しました。
- AgentShield PR #65 は、release/security CI ハードニングのためにワークフロー action を固定しました。
- AgentShield PR #66 は、リリース publish ジョブでキャッシュの使用を無効化し、リリース
  公開が可変な復元されたビルド状態に依存しないようにしました。
- AgentShield PR #67 は、最初のポータブルなエンタープライズエビデンスパックバンドルを追加しました：
  `agentshield scan --evidence-pack <dir>` は、デフォルトの redaction とオプションの policy/baseline エビデンスの
  `not-run` マーカーを持つ、決定論的なマニフェスト、
  README、JSON、HTML、SARIF、policy-evaluation、baseline-comparison、
  supply-chain のアーティファクトを書き込みます。
- AgentShield PR #68 は、GitHub fine-grained PAT、GitLab PAT、npm トークン、Linear
  API キー、Stripe キー、Google API キー、Hugging Face トークン、Vercel トークン、
  AWS access key ID、JWT 形状の認証情報を含むエンタープライズ認証情報
  ファミリーのために、エビデンスパックの redaction をハードニングしました。
- AgentShield PR #69 は、決定論的なハーネスアダプターレジストリを追加しました。スキャン
  レポートは現在、JSON、markdown、terminal、HTML の出力で、Claude Code、OpenCode、Codex、
  Gemini、dmux、generic terminal エージェント、プロジェクトローカルテンプレートのローカルマーカーエビデンスを表面化します。
- AgentShield PDF エクスポートの決定：今のところネイティブ PDF ライターを延期します。
  自己完結型の HTML エグゼクティブレポートはエクスポート可能なバイヤーアーティファクトのままで、
  必要なときに PDF に印刷できます；ネイティブ PDF 生成は、明示的な
  エンタープライズ/コンプライアンスの要求、または HTML レポートの印刷忠実度のギャップを待つべきです。
- `docs/architecture/agentshield-enterprise-research-roadmap.md` は、
  次の AgentShield エンタープライズシグナルを特定します：スキャナー/レポート/ポリシーゲートから、
  baseline ドリフト、エビデンスパック、マルチハーネス
  アダプター、コーパス精度ゲート、remediation ルーティング、脅威インテリジェンス、
  ECC-Tools/GitHub App 統合を持つチームコントロールプレーンへの移行。
- ECC PR #1778 は、有用な stale #1413 の network/homelab architect-agent
  のコンセプトを回復しました。
- ECC-Tools PR #26 は、budget、quota、rate-limit、または cost 検証のエビデンスを欠く
  AI routing、Claude/model 呼び出し、usage limits、quota、analysis-budget の変更のための、cost/token-risk の予測的フォローアップを追加しました。
- ECC-Tools PR #27 は、Security Evidence、Harness Drift、Install Manifest Integrity、
  CI/CD Recommendation、Cost/Token Risk、Agent Config Review のバケットのための、非ブロッキングの `ECC Tools / PR Risk Taxonomy`
  check-run を追加しました。
- ECC-Tools PR #28 は、plan limits、entitlements、Marketplace plan shape、subscription source、seats、
  overage metering のための billing readiness 監査チェックを追加しました。
- ECC-Tools PR #29 は、eval、golden trace、benchmark、または reference-set のエビデンスを欠く
  analyzer、skill、agent、command、harness-guidance の変更のための、決定論的な Reference Set Validation シグナルを追加しました。
- ECC-Tools PR #30 は、フォローアップ生成を実行ごとに3つの新しい GitHub issue と
  1つのドラフト PR に制限し、その後、残りの決定論的な findings を、トラッカーをあふれさせずに
  Linear/status 追跡のためのプロジェクト同期バックログとして出力します。
- ECC-Tools PR #31 は、未解決の変更リクエスト、未解決または古いレビュー
  スレッド、明示的な承認のないレビューアクティビティのための、レビューフォローアップシグナルを分析完了
  コメントに追加しました。
- ECC-Tools PR #32 は、failure fixtures、captured logs、
  troubleshooting notes、dry-run evidence、または regression coverage を欠く workflow
  と test-runner の変更のための、CI failure-mode の予測的フォローアップを追加しました。
- ECC-Tools PR #33 は、harness
  audit、adapter matrix、cross-harness docs、または compatibility regression のエビデンスを欠く MCP、
  plugin、agent、hook、command、harness config の変更のための、harness-config quality の予測的フォローアップを追加しました。
- ECC-Tools PR #34 は、examples、validation、eval、または reference のエビデンスを欠く skill、agent、command、rule guidance の変更のための、skill-quality の予測的フォローアップと Skill
  Quality PR-risk バケットを追加しました。
- ECC-Tools PR #35 は、reference-set comparison、golden trace、
  benchmark、fixture、または eval-run のエビデンスを欠く retrieval、embedding、ranking、
  evaluator の変更のための、RAG/evaluator の予測的フォローアップと
  RAG/Evaluator Evidence PR-risk バケットを追加しました。
- ECC-Tools PR #36 は、deep-analyzer の予測的フォローアップ、Deep Analyzer
  Evidence PR-risk バケット、延期されたフォローアップ作業のための Linear 対応のプロジェクト同期バックログテーブルを追加しました。
- ECC-Tools PR #37 は、将来の予測的フォローアップと PR-risk 分類チェックのための、メンテナンスされたアナライザーコーパスフィクスチャ、コーパス検証
  テスト、併設のアナライザー reference-set エビデンス認識を追加しました。
- ECC-Tools PR #38 は、PR review/stale-salvage の予測的フォローアップ、
  PR Review/Salvage Evidence 分類バケット、stale-closure salvage、reviewer-thread、reopen-flow のエビデンスのためのメンテナンスされたコーパスフィクスチャを追加しました。
- ECC-Tools PR #39 は、延期されたフォローアップバックログ項目のための opt-in のネイティブ Linear GraphQL 同期を追加し、
  `LINEAR_API_KEY` と `LINEAR_TEAM_ID` が
  設定されているとき、GitHub オブジェクトキャップを保持しつつ Linear issue を作成または再利用します。
- ECC-Tools PR #40 は、stale-PR salvage、billing readiness、CI failure diagnosis、harness config
  quality、AgentShield policy exceptions、skill-quality evidence、
  deep-analyzer evidence、RAG/evaluator comparison evidence をカバーし、各
  シナリオが missing-evidence と evidence-backed の diff を演習する、チェックインされた evaluator/RAG コーパス契約を追加しました。
- ECC-Tools PR #41 は、サプライチェーンの依存関係をハードニングしました。
- ECC-Tools PR #42 は、AgentShield エビデンスパックのギャップ予測を追加し、
  欠けている policy/baseline/allowlist/suppression/supply-chain のエビデンスを、
  PR-risk 分類、フォローアップドラフト、Linear 対応のバックログテーブルにルーティングしました。
- ECC-Tools PR #43 は、具体的な AgentShield #67 エビデンスパック
  アーティファクト契約を認識し、正規のバンドルファイルが現在分類を満たし、
  生成されたフォローアップ PR がメンテナーを
  `agentshield scan --evidence-pack <dir>` に向けるようにしました。
- ECC-Tools PR #55 は、最初のホステッド/より深い分析の準備状況シグナルを追加しました：
  分析コメントは現在、CI、AgentShield、
  harness、reference-set、RAG/evaluator、AI-routing、cost-control、
  Linear/project-tracking のレーンに作業をルーティングする前に、リポジトリを commit-history-only、
  evidence-backed、または deep-ready として分類します。
- ECC-Tools PR #56 は、そのシグナルをホステッド実行プラン契約に変えました：
  `/api/analysis/depth-plan` は、分析使用量を課金したりバンドル PR を作成したりせずに、
  ready/blocked なジョブと次のアクションテキストを返します。
- ECC-Tools PR #57 は、最初のジョブ固有のホステッド executor を実装しました：
  `/api/analysis/jobs/ci-diagnostics` は、depth-readiness ゲート、内部
  API auth、installation ownership、repo-access billing チェック、キャップされた workflow
  ファイル読み取り、usage accounting を再利用して、具体的な CI ハードニングの findings を返します。
- ECC-Tools PR #58 は、2番目のジョブ固有のホステッド executor を実装しました：
  `/api/analysis/jobs/security-evidence-review` は、AgentShield evidence-pack、policy、baseline、SBOM、SARIF、security
  scanner のアーティファクトに、同じホステッドゲートを適用します。
- ECC-Tools PR #59 は、3番目のジョブ固有のホステッド executor を実装しました：
  `/api/analysis/jobs/harness-compatibility-audit` は、ローカルのシークレットを含むハーネス設定のフェッチを避けつつ、
  Claude、Codex、OpenCode、MCP、plugin、cross-harness のエビデンスに、同じホステッド
  ゲートを適用します。
- ECC-Tools PR #60 は、4番目のジョブ固有のホステッド executor を実装しました：
  `/api/analysis/jobs/reference-set-evaluation` は、明らかなシークレットを含むフィクスチャの
  フェッチを避けつつ、analyzer corpus、RAG/evaluator、PR salvage、harness、security、CI
  failure-mode の reference エビデンスに、同じホステッドゲートを適用します。
- ECC-Tools PR #61 は、5番目のジョブ固有のホステッド executor を実装しました：
  `/api/analysis/jobs/ai-routing-cost-review` は、明らかな
  シークレットを含むパスのフェッチを避けつつ、model-routing、token-budget、usage-limit、rate-limit、billing/entitlement、
  cost-regression、cost-policy のエビデンスに、同じホステッドゲートを適用します。
- ECC-Tools PR #62 は、6番目のジョブ固有のホステッド executor を実装しました：
  `/api/analysis/jobs/team-backlog-routing` は、明らかな
  シークレットを含むパスのフェッチを避けつつ、roadmap、runbook、handoff、release-plan、issue-template、ownership、
  project-tracker、backlog、follow-up のエビデンスに、同じホステッドゲートを適用します。
- ECC-Tools PR #63 は、キューされた PR
  分析が完了した後にホステッド depth-plan の check-run を公開し、6つのホステッド executor コマンドを、
  チェックをマージブロッカーにすることなく PR head SHA で可視化します。
- ECC-Tools PR #64 は、それらのコマンドをキューに配線します：メンテナーは PR で
  `/ecc-tools analyze --job ci-diagnostics`、`security-evidence`、
  `harness-compatibility`、`reference-set-evaluation`、`ai-routing-cost`、または
  `team-backlog` とコメントし、PR コメントでホステッドジョブ結果を受け取れます。
- ECC-Tools PR #65 は、完了したおよびブロックされたホステッドジョブ結果を
  分析キャッシュに30日間永続化し、メンテナーが古いコメントを読み直す代わりに PR
  チェックサーフェスからホステッドの結果をスキャンできるよう、非ブロッキングの `ECC Tools / Hosted
  Job: ...` check-run を公開します。
- ECC-Tools PR #66 は、`/ecc-tools analyze --job status` で PR コメントから
  キャッシュされた結果を公開し、PR head の completed、blocked、
  not-yet-run のホステッドジョブを要約し、次のホステッドジョブ
  コマンドを推奨します。
- ECC-Tools PR #67 は、それらのキャッシュされた結果をホステッド depth-plan の
  check-run にフィードバックし、キューされた分析が静的な readiness の順序を繰り返す代わりに、キャッシュ状態から次の未実行の ready なホステッドジョブを推奨するようにします。
- ECC-Tools PR #68 は、最初の evaluator バックアップのホステッド昇格ゲートを追加します：
  opened/synchronized な PR は、変更ファイルが期待されるエビデンスアーティファクトなしにフィクスチャシナリオに一致するとき、evaluator/RAG コーパスを警告に変える、非ブロッキングの Hosted Promotion Readiness
  check-run を取得します。
- ECC-Tools PR #69 は、そのゲートを拡張して、現在の PR head のキャッシュされた完了ホステッドジョブ
  出力をスコアリングし、チェックが昇格ギャップを報告する前に、ホステッドアーティファクトがコーパス
  エビデンスの期待を満たせるようにします。
- ECC-Tools PR #76 は、ホステッドセキュリティ
  レビューで AgentShield PR #89 のフリート出力を消費します：`agentshield-evidence/fleet-summary.json` は現在
  `evidence-pack-fleet` として分類され、invalid なパックと security-blocker のルートは
  high-severity のホステッド findings になり、policy、baseline、supply-chain のルートは
  owner-ready なレビュー findings を生成します。
- ECC-Tools PR #77 は `31fd883b3f0cee135aee4839b01d34855b7867f6` としてマージされ、
  ホステッドジョブの PR コメントと check-run の詳細に `Evidence` 列を追加し、
  各 finding について最大3つのソースエビデンスパスを表面化して、
  AgentShield フリート由来の findings がオペレーターを正確なバンドルアーティファクトに向けるようにします。
- ECC-Tools PR #78 は `0d4eb949aa56f56da88e6654273a22ffb95983a1` としてマージされ、
  AgentShield フリートルートをホステッドハーネス互換性レビューにリンクします：
  フリートサマリーがハーネスエビデンスとして収集され、ターゲットパスが
  Claude、Codex、OpenCode、MCP、plugin、cross-harness のオーナーにマッピングされ、ルーティングされた
  findings がオペレーターレビューのためにソースエビデンスパスを持ちます。
- AgentShield PR #90 は `6d1c57c92000541d65a3b6bc366f0322d7d0dacc` としてマージされ、
  耐久性のあるフリート `reviewItems` を追加します：`agentshield evidence-pack fleet --json`
  は現在、route、severity、repository/target
  コンテキスト、ソースエビデンスパス、reason、recommendation を持つ owner-ready なレビューアイテムを返します；text CLI は
  オペレーターのために同じルーティングされたフォローアップリストを出力します。
- AgentShield PR #91 は `73e1e3586dc4513a462e39c9799f75eea104e110` としてマージされ、
  耐久性のあるポリシーパックエクスポートを追加します：`agentshield policy export` は、選択された
  pack ごとに1つの JSON policy と、チェックサムバックアップの `manifest.json` を、
  branch-protection レビューまたは下流のポリシー昇格のための pack 選択、owners、name プレフィックス、JSON 出力とともに書き込みます。
- AgentShield PR #92 は `e7e259dc6212b63a8e03a253ca6b8c1e3c2abff7` としてマージされ、
  それらのバンドルのための保護された昇格ゲートを追加します：
  `agentshield policy promote` は、export マニフェストと選択された
  policy SHA-256 digest を検証し、改ざんされた policy JSON を拒否し、マルチ pack マニフェストには明示的な pack
  選択を要求し、アクティブな `.agentshield/policy.json` を書き込む前に dry-run JSON レビューをサポートします。
- AgentShield メインコミット `87aec47fb55d04ea28d494852d4f664c268c5601`
  は、マニフェスト digest エビデンス、policy-owner 承認、保護されたロールアウト PR ハンドオフ、ランタイム
  スモークテストのための耐久性のある `reviewItems` でポリシー昇格を拡張します。ローカル検証は `npm run typecheck`、`npm run lint`、
  `npm test` に合格しました；GitHub Actions 実行 `25985170621` は
  Node 18、20、22 と self-scan の例全体で正常に完了し、兄弟の
  AgentShield Self-Scan/Test GitHub Action の実行も正常に完了しました。
- AgentShield メインコミット `28d08c7f9961eaa54804b26e6352d23b64ae2776`
  は、`.npmrc`、`.pnpmrc`、`.yarnrc`、`.yarnrc.yml`、`pnpm-workspace.yaml`、
  `pnpm-workspace.yml` のためのパッケージマネージャーハードニングのドリフト検出を追加します。
  plaintext のレジストリ認証情報検出、明示的なライフサイクルスクリプト有効化、欠けているまたは弱い release-age
  cooldown の findings を含みます。ローカル検証は、対象を絞った rule/scanner テスト、
  `npm run typecheck`、`npm run lint`、`npm run build`、フルの
  `npm test -- --run`、`git diff --check` に合格しました；GitHub Actions 実行
  `25986170958` は正常に完了し、兄弟の AgentShield Self-Scan
  と Test GitHub Action の実行は合格しました。
- AgentShield メインコミット `659f569190f85f6f0808353e096d66c0a6d7817e`
  は、すべてのワークフロー action の pin を現在の SHA 固定の
  `actions/checkout@v6.0.2` と `actions/setup-node@v6.4.0` に更新します；GitHub Actions
  実行 `25986221319` は正常に完了し、以前の Node 20 action-runtime
  非推奨アノテーションは最終的な CI ウォッチ出力から消えました。
- AgentShield メインコミット `ee585cd` は、ローカル検証で npm `10.9.4` が
  `min-release-age` を拒否することが示された後、パッケージマネージャーハードニングの
  ガイダンスを修正します：npm 設定は現在、ライフサイクル/トークンドリフトと
  サポートされていない release-age キーについてスキャンされ、強制可能な cooldown の findings は
  pnpm `minimumReleaseAge` / `minimum-release-age` と Yarn
  `npmMinimalAgeGate` に留まります。ローカル検証は package-manager/scanner テスト、
  `npm run typecheck`、`npm run lint`、`npm run build`、
  `git diff --check` に合格しました；GitHub Actions 実行 `25986719058`、Test GitHub Action 実行
  `25986719054`、AgentShield Self-Scan 実行 `25986719066` は正常に
  完了しました。
- AgentShield メインコミット `1124535345d7040242ecd3803f65bcd4dcaf6ec2`
  は、GitHub Action を通じてパッケージマネージャーハードニングを公開し、CI/ホステッドの
  コンシューマーが registry credential、lifecycle-script、release-age
  ゲートのドリフトを、一般的な finding カウントとは別にルーティングできるようにします。ローカル検証は
  対象を絞った action テスト、`npm run typecheck`、`npm run lint`、`npm run build`、
  フルの `npm test`、`git diff --check` に合格しました；GitHub Actions CI 実行
  `25994354007`、Test GitHub Action 実行 `25994354011`、AgentShield
  Self-Scan 実行 `25994354026` は正常に完了しました。
- ECC PR #1803 は、メンテナーのクリーンアップ、現在の `main` への整合、フルのローカル検証、
  未完成の ja-JP と zh-CN の Quarkus 翻訳の作成者による削除の保持の後、コントリビューターの Quarkus 処理ブランチをランドしました。
- ECC PR #1812 は、ソースクレジット、カタログ同期、フルのローカル/リモート検証を持つメンテナー所有のブランチを通じて、stale PR #1310 から有用な Django reviewer、Django build resolver、
  Django Celery のガイダンスを救済しました。
- ECC PR #1813 は、#1325、#1414、#1478、#1504、#1603 のための source-to-salvage
  マッピングで stale PR salvage レジャーを拡張し、それらの有用な
  stale コントリビューションが後のメンテナー PR を通じてすでに保持されていたことを確認しました。
- ECC PR #1815 は、有用な stale #1304 の cost-tracking と #1232
  の skill-scout の作業を、現在のカタログ同期とフルのローカル/リモート検証を持つ現在の command/skill 規約に救済しました。
- ECC PR #1816 は、有用な stale #1659 のフロントエンドデザインガイダンスを、公式の
  Anthropic `frontend-design` スキルが外部ソースのままであるというガードレールを保持しつつ、正規の ECC スキルレイアウトに救済しました。
- ECC PR #1817 は、有用な stale #1658 の code-reviewer false-positive
  ガードレールを救済し、HIGH/CRITICAL findings、一般的な
  false-positive 除外、リグレッションテストのための証明ゲートを追加しました。
- ECC PR #1818 は、5月12日の stale-salvage ギャップパスを記録し、すでに
  存在する作業、スキップされた作業、translator/manual-review の残りを分類しました。

## 運用ルール

- 公開 PR と issue を20未満に保つ。リリースレーンのターゲットはゼロが望ましい。
- すべての GA-readiness バッチの後、70/70 ハーネス監査と 21/21 オブザーバビリティ準備を維持する。
- GitHub リリース、npm/パッケージ状態、billing 状態、プラグイン提出サーフェスが
  新鮮なエビデンスで検証されるまで、リリースやソーシャルのアナウンスを公開しない。
- クローズされた stale PR を破棄されたものとして扱わない。各クリーンアップバッチを
  救済パスと組み合わせる：クローズされた差分を検査し、有用で互換な作業を
  メンテナー所有のブランチに移植し、ソース PR をクレジットする。
- アクティブな issue 制限がクリアされるまで、新しい Linear issue を作成しない。

## プロンプトからアーティファクトへの実行チェックリスト

このテーブルは、長いオペレータープロンプトを具体的なアーティファクトに紐づけたまま保ちます。エビデンス列が存在し、新しく検証されていない限り、ステータスは完了ではありません。

| プロンプト要件 | 必要なアーティファクトまたはゲート | 現在のエビデンス | ステータス |
| --- | --- | --- | --- |
| 公開 PR を20未満に保つ | リポジトリファミリーの PR 再チェック | ECC #1961、#1963、#1953 をマージし、非互換の #1962 をクローズ/スキップした後の 2026-05-17 時点で、`everything-claude-code`、AgentShield、JARVIS、`ECC-Tools/ECC-Tools`、`ECC-Tools/ECC-website` 全体でオープン PR 0件 | 完了 |
| 公開 issue を20未満に保つ | リポジトリファミリーの issue 再チェック | 2026-05-17 時点で `everything-claude-code`、AgentShield、JARVIS、`ECC-Tools/ECC-Tools`、`ECC-Tools/ECC-website` 全体でオープン issue 0件；#1951 は #1953 でクローズ | 完了 |
| リポジトリのディスカッションを管理 | リポジトリファミリーのディスカッション再チェック | プラットフォーム監査はディスカッションのメンテナー対応ギャップ 0件と、承認済み回答が欠けている回答可能な Q&A 0件を報告；trunk には依然として計58のディスカッション | 完了 |
| PR のディスカッションを管理 | PR review/comment のクローズと merge/close 状態 | ECC #1961、#1963、#1953 はメンテナー検証後にマージ；オープンな追跡対象 PR は残っていない | 完了 |
| 有用な stale 作業を救済 | `docs/stale-pr-salvage-ledger.md` と `docs/legacy-artifact-inventory.md` | レジャーは救済済み、置き換え済み、スキップ済み、manual-review の残務を記録；#1815-#1818 は cost tracking、skill scout、フロントエンドデザインガイダンス、code-reviewer false-positive ガードレール、5月12日のギャップパスを追加；#1687、#1609、#1563、#1564、#1565 のローカライゼーション残務は language-owner レビューのために Linear ITO-55 に添付され、自動インポートはリリースブロッキングのまま残っていない | 完了；リリース前にレガシースキャンを再実行 |
| ECC 2.0 プレビューパックの準備 | リリースドキュメント、quickstart、publication readiness、リリースノート | `docs/releases/2.0.0-rc.1/` と readiness ドキュメントがツリー内にある；5月17日のエビデンスは queue-zero 状態、ローカライズドキュメントマージ、サプライチェーン再チェック、lint/test/security ゲート、オペレーターダッシュボード、`99dd6ac0` の成功した GitHub CI を記録 | 最終的なクリーンチェックアウトのリリース承認が必要 |
| Hermes 専門スキルの安全な包含 | Hermes setup/import ドキュメントとサニタイズされたスキルサーフェス | Hermes setup と import プレイブックは公開；シークレットはローカルに留まる | 最終リリースレビューが必要 |
| ネーミングと改名の準備 | package/plugin/docs/social サーフェス全体のネーミングマトリックス | `docs/releases/2.0.0-rc.1/naming-and-publication-matrix.md` は現在の package、repo、Claude plugin、Codex plugin、OpenCode、npm 可用性のエビデンスを記録 | rc.1 では完了；rc 後の改名は将来の作業 |
| Claude と Codex のプラグイン公開 | 必要なアーティファクトとステータスを持つ contact/submission パス | Publication readiness、ネーミングマトリックス、5月12日のドライランエビデンスが、プラグイン検証、クリーンチェックアウトの Claude tag/install スモーク、Codex marketplace CLI の形を文書化 | 実際の tag/push と marketplace 提出には明示的な承認が必要 |
| 記事、ツイート、アナウンス | X スレッド、LinkedIn コピー、GitHub リリースコピー、push チェックリスト | rc.1 リリースドキュメント配下にドラフトローンチ素材が存在 | URL バックアップのリフレッシュが必要 |
| AgentShield エンタープライズイテレーション | ポリシーゲート、SARIF、packs、来歴、コーパス、HTML レポート、例外ライフサイクル監査、baseline ドリフト Action/CLI サーフェス、エビデンスパック redaction、ハーネスアダプターレジストリ、エンタープライズ研究ロードマップ、サプライチェーンハードニングのリリースパス、CI-safe な baseline フィンガープリント、コーパス精度の推奨、remediation ワークフローフェーズ、env proxy hijack のコーパスカバレッジ、Mini Shai-Hulud フルキャンペーンのパッケージ IOC、CI-provenance エビデンスパック、plugin-cache ランタイム信頼度のトリアージ、エビデンスパックコンシューマー readback、フリートレベルのエビデンスパックルーティング、フリートレビューアイテム、チェックサムバックアップのポリシーエクスポート、チェックサム検証済みポリシー昇格、ポリシー昇格レビューアイテム、パッケージマネージャーハードニングのドリフト検出、npm age-gate ガイダンス修正、ワークフロー action-runtime pin リフレッシュ、パッケージマネージャーハードニング Action 出力、policy-promotion Action 出力、promotion Action 出力の ECC-Tools ホステッド消費、ECC-Tools のオペレーターに見える promotion 出力値、ECC-Tools ホステッド昇格ジャッジ監査トレース | PR #53、#55-#64、#67-#69、#78-#92 がテストエビデンスとともにランドし、ECC-Tools #76 がホステッドセキュリティレビューで fleet-summary 出力を消費し、#77 がホステッド finding 出力でソースエビデンスパスを表面化し、#78 がフリートルートをハーネスオーナーレビューにリンク；AgentShield #91 は branch-protection レビューと下流の昇格のための `agentshield policy export` バンドルを追加；AgentShield #92 は digest 検証、改ざん拒否、明示的な pack 選択、dry-run レビュー、アクティブポリシー書き込み前の JSON 出力を持つ `agentshield policy promote` を追加；AgentShield コミット `87aec47` は digest エビデンス、owner レビュー、保護されたロールアウト PR ハンドオフ、ランタイムスモークテストのための `reviewItems` を green なローカル/リモート CI とともに追加；AgentShield コミット `28d08c7` は plaintext のレジストリ認証情報、lifecycle-script 有効化、弱い pnpm/Yarn release-age cooldown のためのパッケージマネージャーハードニングのドリフト検出を green なローカル/リモート CI とともに追加；AgentShield コミット `659f569` はすべてのワークフロー action ランタイム pin を SHA 固定の checkout v6.0.2 と setup-node v6.4.0 に、green なリモート CI と残りの action-runtime 非推奨アノテーションなしでリフレッシュ；AgentShield コミット `ee585cd` はサポートされていない npm age キーにフラグを立て、強制可能な cooldown findings を pnpm/Yarn に保つことで npm release-age ガイダンスを green なローカル/リモート CI とともに修正；AgentShield コミット `1124535` は registry credentials、lifecycle scripts、release-age ゲートのためのパッケージマネージャーハードニング status/count 出力と redact された job-summary セクションを green なローカル/リモート CI とともに公開；AgentShield コミット `1593925` は owner 承認、保護されたロールアウト、ランタイムスモークのための policy-promotion status/count/digest 出力と job-summary レビューアイテムを公開し、同じ Action ジョブが昇格されたポリシーでスキャンするときランタイムスモークを verified としてマーク；ECC-Tools コミット `8658951` はそれらの policy-promotion Action 出力をホステッドセキュリティレビュー findings と Hosted Promotion Readiness スコアリングにルーティング；ECC-Tools コミット `16c537f` はホステッドセキュリティジョブのコメント/check-run に policy-promotion の status、pack、review item count、action-required count、digest をレンダリング；ECC-Tools コミット `05d4e82` は生の provider 出力なしでホステッド昇格ジャッジのリクエストフィンガープリントと allowed-citation カウントをレンダリング；ネイティブ PDF エクスポートは、明示的なエンタープライズの要求が現れるまで自己完結型 HTML と print-to-PDF の代わりに延期；`docs/architecture/agentshield-enterprise-research-roadmap.md` は現在、baseline ドリフト、エビデンスパックバンドル、redaction、adapter-registry、サプライチェーンハードニング、ハッシュ化された baseline フィンガープリント、コーパス精度の推奨、remediation ワークフロー、env proxy hijack コーパス、Mini Shai-Hulud フルキャンペーンのパッケージテーブル、`ci-context.json` 来歴、`plugin-cache` 信頼度、`evidence-pack inspect` readback、`evidence-pack fleet` ルーティング、フリート `reviewItems`、policy export、policy promotion、policy promotion `reviewItems`、パッケージマネージャーハードニング Action 出力、policy-promotion Action 出力、promotion Action 出力のホステッド消費、オペレーターに見える promotion 出力値、ホステッド昇格ジャッジ監査トレースをランド済み | 次のワークフロー自動化は、Marketplace/payment ゲート後のライブオペレーター承認/readback を深化させるべき |
| ECC Tools next-level アプリ | Billing audit、PR checks、deep analyzer、sync backlog、evaluator/RAG コーパス、analysis-depth readiness、ホステッド実行計画、ホステッド CI diagnostics、ホステッド security evidence review、ホステッド harness compatibility audit、ホステッド reference-set evaluation、ホステッド AI routing/cost review、ホステッド team backlog routing、ホステッド depth-plan check-run、PR-comment ホステッドジョブディスパッチ、ホステッドジョブ結果履歴/check-run、ホステッド結果ステータスコマンド、status 対応の depth-plan 推奨、ホステッド昇格 readiness、ホステッド昇格出力スコアリング、ホステッド昇格取得計画、ホステッド昇格ジャッジ契約、ゲートされたホステッド昇格ジャッジ実行、ホステッド昇格ジャッジ監査トレース、payment-announcement readiness、billing announcement preflight、本番 Marketplace readback 状態、AgentShield fleet-summary ホステッドルーティング、ホステッド finding source-evidence 表面化、harness policy-route review、policy-promotion Action-output ホステッドテレメトリ、オペレーターに見える promotion 出力値 | PR #26-#43 と #53-#78 がテストエビデンスとともにランドし、AgentShield エビデンスパックのギャップルーティング、正規バンドル認識、サプライチェーン署名ゲート、PR ドラフトフォローアップの Linear 追跡、evidence-backed/deep-ready リポジトリ分類、`/api/analysis/depth-plan` ホステッドジョブプラン、`/api/analysis/jobs/ci-diagnostics`、`/api/analysis/jobs/security-evidence-review`、`/api/analysis/jobs/harness-compatibility-audit`、`/api/analysis/jobs/reference-set-evaluation`、`/api/analysis/jobs/ai-routing-cost-review`、`/api/analysis/jobs/team-backlog-routing`、`ECC Tools / Hosted Depth Plan` check-run、`/ecc-tools analyze --job ...` PR コメントディスパッチ、30日間の結果キャッシュレコードにバックアップされた非ブロッキングのホステッドジョブごとの結果 check-run、`/ecc-tools analyze --job status` キャッシュルックアップ、depth-plan check-run のキャッシュ対応の次ジョブ推奨、`ECC Tools / Hosted Promotion Readiness` コーパスバックアップの PR check-run、キャッシュされた完了ジョブアーティファクト/findings に対する決定論的なホステッド出力スコアリング、ランク付けされた取得/モデルプロンプト計画、fail-closed な `hosted-promotion-judge.v1` リクエスト契約、ホステッドエビデンス、entitlement、budget、provider、executor、strict JSON、citation ゲートの背後での opt-in ライブモデルジャッジ実行、ホステッド昇格ジャッジのリクエストフィンガープリントと allowed-citation 監査トレイル、native GitHub payments の主張のための fail-closed な `/api/billing/readiness` `announcementGate`、非秘密のオペレーター検証器としての `npm run billing:announcement-gate` と `--preflight`、AgentShield フリートサマリーのためのホステッドセキュリティ findings、ホステッド finding コメント/check-run の `Evidence` 列、AgentShield フリートターゲットパスをハーネスオーナーにルーティングするホステッドハーネス findings、AgentShield policy-promotion Action 出力をホステッドセキュリティレビューと promotion-readiness スコアリングにルーティングする ECC-Tools コミット `8658951`、policy-promotion の status/pack/count/digest 値をホステッドセキュリティジョブコメント/check-run に直接レンダリングする ECC-Tools コミット `16c537f`、生の provider 出力を露出させずにモデルジャッジ監査トレースをレンダリングする ECC-Tools コミット `05d4e82`、安全な billing announcement preflight パスを追加する ECC-Tools コミット `91a441b`、本番にまだ Marketplace billing-state KV レコードがないことを記録する ECC-Tools コミット `eb69412` を含む | 次の作業は Marketplace 購入/webhook readback の完了、その後ライブアナウンスゲートの実行 |
| GitGuardian/Dependabot/CodeRabbit スタイルのチェック | 非ブロッキングの分類、決定論的なフォローアップチェック、ローカルのサプライチェーンゲート | ECC-Tools リスク分類チェックとフォローアップシグナルがランド済み。Skill Quality、Deep Analyzer Evidence、Analyzer Corpus Evidence、RAG/Evaluator Evidence、PR Review/Salvage Evidence、AgentShield evidence-pack evidence を含む；#1846 は npm レジストリ署名ゲートを追加；#1848 はサプライチェーンインシデント対応プレイブックと `pull_request_target` cache-poisoning バリデーターガードを追加；#1851 は特権チェックアウトの認証情報永続化ガードを追加；AgentShield #78、JARVIS #13、ECC-Tools #53 が trunk 外で同じハードニングを適用 | 現在のサプライチェーンゲートは完了；より深いホステッドレビュー機能は将来のまま |
| ハーネス非依存の学習システム | Audit、adapter matrix、observability、traces、promotion loop | Audit/adapters/observability ゲートと `docs/architecture/evaluator-rag-prototype.md`、`examples/evaluator-rag-prototype/`、ECC-Tools PR #40 が、trace、report、playbook、verifier、predictive-check のアーティファクトを持つ読み取り専用の stale-salvage、billing-readiness、CI-failure-diagnosis、harness-config-quality、AgentShield policy-exception、skill-quality evidence、deep-analyzer evidence、RAG/evaluator comparison のシナリオを定義；ECC-Tools PR #68-#72 は現在、そのコーパスを、キャッシュされたホステッド出力スコアリング、ランク付けされた取得候補、モデルプロンプトシード、fail-closed なホステッドモデルジャッジリクエスト契約、strict なホステッドエビデンスゲートの背後での opt-in ライブモデル実行を持つ決定論的な PR check-run ゲートに変える | 決定論的なホステッド PR チェック、キャッシュされた出力スコアリング、取得計画、ジャッジ契約、ゲートされたモデル実行が統合済み |
| Linear ロードマップが詳細 | Linear プロジェクトステータスとリポジトリミラー | リポジトリミラーが存在；issue 作成は 2026-05-12 に再試行され、ワークスペースの無料 issue 制限によりブロックされたまま；5月17日の同期は queue-zero バッチ、日本語ローカライゼーションマージ、ITO-57 ライブサプライチェーンリフレッシュコメント、ECC platform プロジェクト進捗スナップショット、定期的なステータス更新のための生成された `operator:dashboard` プロンプトからアーティファクトへの監査を追加 | 各重要なマージバッチの後に定期的なステータス更新が必要 |
| フロー分離と進捗追跡 | オーナーアーティファクトと更新ケイデンスを持つフローレーン | このロードマップは以下にレーンを定義し、`docs/architecture/progress-sync-contract.md` が GitHub/Linear/handoff/roadmap 同期を readiness ゲートの一部にする | アクティブ |
| リアルタイム Linear 同期 | issue 制限がブロックされている間のプロジェクト更新；issue は後で | ECC-Tools #39 は延期されたフォローアップバックログ項目のための opt-in の Linear API 同期を実装し、ECC-Tools #54 は draft PR シェルが開かれないときそのバックログにコピー対応の PR ドラフトを追加；`docs/architecture/progress-sync-contract.md` は issue 容量がブロックされている間のローカルファイルバックアップのリアルタイム境界を定義；5月17日のライブコネクターコメントが ITO-57 と ECC platform プロジェクトに投稿された | プロダクト化された issue 同期のためのワークスペース容量/設定のロールアウトが必要 |
| 自己利用のためのオブザーバビリティ | ローカル readiness ゲート、traces、status snapshots、HUD/status 契約、リスクレジャー、progress-sync 契約 | `npm run observability:ready` は 21/21 を報告 | ローカルゲートについては完了 |
| 適切なリリースと通知 | リリースタグ、npm publish 状態、plugin 状態、ソーシャル投稿 | Publication readiness ゲートが5月12日のドライランと5月13日の readiness エビデンスとともに存在 | 未完了；承認/ライブ URL が必要 |

## 実行レーンと追跡契約

Linear の issue 容量がクリアされるまで、このドキュメントが耐久性のある実行レジャーであり、Linear はプロジェクトステータス更新のみを受け取ります。同期契約は `docs/architecture/progress-sync-contract.md` にあります。容量が利用可能なとき、以下の各レーンは、リポジトリのエビデンスとマージコミットにリンクされた小さな Linear issue のセットになるべきです。

| レーン | 真実のソース | 次の追跡対象アーティファクト | 更新ケイデンス |
| --- | --- | --- | --- |
| キュー衛生と救済 | GitHub PR/issue 状態、救済レジャー | 将来の stale クローズのためのレジャーエントリを追加 | すべてのクリーンアップバッチ |
| リリースと公開 | rc.1 リリースドキュメント、publication readiness ドキュメント | ネーミングマトリックスとプラグイン提出/contact チェックリスト | いかなるタグの前にも |
| ハーネス OS コア | Audit、adapter matrix、observability ドキュメント、`ecc2/` | HUD/session-control の受け入れ仕様 | GA まで毎週 |
| Evaluation と RAG | Reference-set 検証、ハーネス監査、traces、ECC-Tools コーパス | 読み取り専用の evaluator/RAG プロトタイプと stale-salvage、billing-readiness、CI-failure-diagnosis、harness-config-quality、AgentShield policy-exception、skill-quality evidence、deep-analyzer evidence、RAG/evaluator comparison のフィクスチャ；ECC-Tools #68 はコーパスをホステッド昇格 readiness の check-run として公開、#69 は同じコーパスに対してキャッシュされたホステッドジョブ出力をスコアリング、#70 はランク付けされた取得候補とモデルプロンプトシードを出力、#71 は fail-closed なホステッドモデルジャッジリクエスト契約を追加、#72 は明示的に有効化されホステッド取得引用にバックアップされたときのみそのジャッジを実行；ECC-Tools `16c537f` はホステッドセキュリティコメント/チェックで policy-promotion Action 出力値を表面化；ECC-Tools `05d4e82` はリクエストフィンガープリントと allowed-citation カウントを持つホステッドモデルジャッジ監査トレースを追加 | Marketplace readback |
| AgentShield エンタープライズ | AgentShield PR エビデンスとロードマップノート | エビデンスパック inspect/readback が #88 で出荷された後、フリートルーティングが #89 でランド；#90 はフリート `reviewItems` を出力；#91 はチェックサムバックアップのポリシーバンドルをエクスポート；#92 はそれらのバンドルからチェックサム検証済みのポリシーをアクティブなポリシーファイルに昇格；AgentShield `87aec47` はポリシー昇格 `reviewItems` を追加；`28d08c7` はパッケージマネージャーハードニングのドリフト検出を追加；`659f569` はワークフロー action ランタイム pin をリフレッシュ；`ee585cd` はサポートされていない npm release-age ガイダンスを修正し、強制可能な cooldown findings を pnpm/Yarn に保つ；`1124535` は CI/ホステッドルーティングのためのパッケージマネージャーハードニング Action 出力を公開；`1593925` は policy-promotion Action 出力とランタイムスモーク job-summary エビデンスを公開；ECC-Tools #76 はフリートサマリーを消費、#77 はホステッド findings でソースエビデンスパスを表面化、#78 はフリートルートをハーネスオーナーにリンク、ECC-Tools `8658951` は policy-promotion Action 出力を消費、ECC-Tools `16c537f` はオペレーターに見える出力値をレンダリング | Marketplace/payment ゲート後のライブオペレーター承認/readback を深化 |
| ECC Tools アプリ | ECC-Tools PR エビデンス、billing audit、リスク分類、evaluator/RAG コーパス | ECC-Tools #53 はサプライチェーンワークフローハードニングブランチを公開、#54 は Linear/プロジェクトバックログでコピー対応の PR ドラフトを追跡、#55 は analysis-depth readiness を分類、#56 はホステッド実行プランを公開、#57 は最初のホステッド CI diagnostics ジョブを実行、#58 はホステッド security evidence review ジョブを実行、#59 はホステッド harness compatibility audit を実行、#60 はホステッド reference-set evaluation を実行、#61 はホステッド AI routing/cost review を実行、#62 はホステッド team backlog routing を実行、#63 はホステッド depth-plan check-run を公開、#64 は PR コメントからホステッドジョブをディスパッチ、#65 はホステッド結果履歴/check-run を永続化、#66 は PR コメントからホステッドジョブステータスを公開、#67 は depth-plan 推奨をキャッシュ対応にする、#68 は evaluator/RAG コーパスからホステッド昇格 readiness を公開、#69 はそのコーパスに対してキャッシュされたホステッドジョブ出力をスコアリング、#70 はランク付けされた取得候補とモデルプロンプトシードを出力、#71 はライブモデル呼び出しなしでゲートされた `hosted-promotion-judge.v1` 契約を出力、#72 はホステッドエビデンスと strict JSON/citation ゲートの背後で opt-in ライブモデルジャッジ実行を追加、#73 は billing readiness に fail-closed な native-payments `announcementGate` を追加、#74 はオペレーター検証のための `npm run billing:announcement-gate` を追加、#75 はライブ Marketplace readback のための billing announcement ゲートを厳格化、#76 は AgentShield fleet-summary エビデンスをホステッドセキュリティ findings にルーティング、#77 はホステッド finding 出力にソースエビデンスパスを追加、#78 は AgentShield フリートターゲットパスをホステッドハーネスオーナー findings にリンク、`8658951` は AgentShield policy-promotion Action 出力をホステッドセキュリティレビューと promotion readiness にルーティング、`16c537f` は policy-promotion の status/pack/count/digest 値をホステッドセキュリティコメント/チェックにレンダリング、`05d4e82` はホステッド昇格ジャッジのリクエストフィンガープリントと allowed-citation 監査トレースをレンダリング、`91a441b` は必要な readback 入力のための billing announcement preflight 出力を追加、`eb69412` はライブ本番 KV readback 状態を記録 | Marketplace 購入/webhook readback、その後ライブアナウンスゲート |
| Linear 進捗 | Linear プロジェクトステータス更新、`docs/architecture/progress-sync-contract.md`、生成された `operator:dashboard` 出力、このミラー | queue/evidence/missing ゲートを持つステータス更新 | すべての重要なマージバッチ |

プロジェクトステータス更新には、常に以下を含めるべきです：

1. 現在の公開 PR と issue のカウント。
2. 前回の更新以降のマージ済みエビデンス。
3. 理由を持つ延期またはブロックされた項目。
4. 次の1〜2つの実装スライス。
5. まだエビデンスバックアップされていないリリースまたは公開ゲート。

## リファレンスの圧力

GA ロードマップは、これらのリファレンスサーフェスから情報を得ています：

- worktree ネイティブの並列エージェント UX、レビューループ、ワークスペースプリセットのための
  `stablyai/orca` と `superset-sh/superset`。
- terminal/worktree の多重化、セッショングルーピング、ライフサイクルフックのための
  `standardagents/dmux` と `aidenybai/ghast`。
- 常時表示のステータス、ツール、エージェント、todo、
  コンテキストテレメトリのための `jarrodwatts/claude-hud`。
- 評価駆動のハーネス改善、traces、playbooks、promotion
  loops のための `stanford-iris-lab/meta-harness` と `greyhaven-ai/autocontext`。
- オペレーターシェル、ゲートウェイ、メモリ、スキル、
  マルチプラットフォームのコマンドパターンのための `NousResearch/hermes-agent`。
- アダプターの期待のための `anthropics/claude-code`、アクティブな `sst/opencode` / `anomalyco/opencode`、Zed、
  Codex、Cursor、Gemini、terminal-only ワークフロー。

このリファレンス作業の出力は、第二の戦略メモではなく、具体的な ECC デルタであるべきです。

## マイルストーン

### 1. GA リリース、ネーミング、プラグイン公開の準備

ターゲット：2026-05-24

受け入れ：

- ネーミングマトリックスが、製品名、npm パッケージ、Claude プラグイン、Codex プラグイン、
  OpenCode パッケージ、marketplace メタデータ、docs、移行コピーをカバーする。
- GitHub リリース、npm dist-tag、プラグイン公開、アナウンスのゲートが
  新鮮なコマンドエビデンスにマッピングされる。
- リリースノート、移行ガイド、既知の問題、quickstart、X スレッド、LinkedIn
  投稿、GitHub リリースコピーが準備されているが、リリース URL が存在する前には投稿されない。
- Claude と Codex のプラグイン公開/contact パスが、owner、必要なアーティファクト、
  提出ステータスとともに文書化される。

### 2. ハーネスアダプター準拠マトリックスとスコアカードのオンランプ

ターゲット：2026-05-31

受け入れ：

- アダプターマトリックスが、Claude Code、Codex、OpenCode、Cursor、Gemini、
  Zed 近縁サーフェス、dmux、Orca、Superset、Ghast、terminal-only の使用をカバーする。
- 各アダプターが、サポートされる資産、サポートされないサーフェス、インストールパス、
  検証コマンド、リスクノートを持つ。
- ハーネス監査が 70/70 のままで、チームがスコアカードをどう使うかを説明する公開オンランプを得る。
- リファレンスの findings が、具体的なアダプター、オブザーバビリティ、
  またはオペレーターサーフェスのデルタに変換される。

### 3. ローカルオブザーバビリティ、HUD/ステータス、セッションコントロールプレーン

ターゲット：2026-06-07

受け入れ：

- オブザーバビリティ準備が 21/21 のままで、JSONL traces、status
  snapshots、リスクレジャー、エクスポート可能なハンドオフ契約にバックアップされる。
- HUD/status モデルが、context、tool calls、active agents、todos、checks、
  cost、risk、queue state をカバーする。
- worktree/session の制御が、create、resume、status、stop、diff、PR、
  merge queue、conflict queue をカバーする。
- Linear/GitHub/handoff 同期モデルが、リアルタイムの進捗
  追跡に十分明示的である。

### 4. 自己改善ハーネス評価ループ

ターゲット：2026-06-10

受け入れ：

- シナリオ仕様、検証器契約、traces、playbooks、リグレッションゲートが
  文書化され、少なくとも1つの読み取り専用プロトタイプが存在する。
- ループが観測、提案、検証、昇格を分離する。
- チームと個人のセットアップが、設定を盲目的に
  変更せずにスコアリングされ改善できる。
- RAG/reference-set の設計が、検証済みの ECC パターン、チーム履歴、CI
  失敗、diff、レビュー結果、ハーネス設定品質をカバーする。

### 5. AgentShield エンタープライズセキュリティプラットフォーム

ターゲット：2026-06-14

受け入れ：

- 組織ベースライン、例外、owners、有効期限、severity、監査トレイル、expiring-soon
  可視性、expired-exception 強制のための、正式なポリシースキーマと評価出力が存在する。
- SARIF/code-scanning の出力が実装されテストされている。
- GitHub Action のポリシーゲートが、branch-protection と CI エビデンスのための組織ポリシーステータスと違反
  カウントを公開する。
- ポリシーパックが、OSS、team、enterprise、regulated、high-risk
  hooks/MCP、CI enforcement のために定義される。
- サプライチェーンインテリジェンスが MCP パッケージの来歴をカバーし、npm/pip reputation、CVE、typosquat、依存関係リスクのための拡張
  パスを持つ。
- プロンプトインジェクションコーパスとリグレッションベンチマークが、カテゴリレベルのカバレッジと regression-gate 出力を持つ継続的な
  ルールハードニングの準備ができている。
- エンタープライズレポートが、terminal/CI サマリーでリスク姿勢、priority findings、カテゴリ露出、policy-exception
  ライフサイクルエビデンスを持つ JSON と自己完結型 HTML エグゼクティブ出力を含む。
- ネイティブ PDF エクスポートは、エンタープライズ/コンプライアンスの
  ワークフローが自己完結型 HTML レポートとブラウザの print-to-PDF パスの代わりに生成された PDF ファイルを
  要求しない限り、GA ブロッカーではない。

### 6. ECC Tools の Billing、Deep Analysis、PR Checks、Linear Sync

ターゲット：2026-06-21

受け入れ：

- ネイティブ GitHub Marketplace の billing アナウンスが、検証された
  実装とドキュメントにバックアップされる。
- 内部 billing readiness 監査が、plan limits、seats、entitlement
  マッピング、Marketplace plan shape、subscription state、overage hooks、失敗モードをカバーする。
- 深いアナライザーが、diff パターン、CI/CD ワークフロー、dependency/security
  サーフェス、PR review の挙動、失敗履歴、ハーネス設定、skill quality、
  専用のアナライザーコーパスエビデンス、併設のアナライザー reference sets、
  PR review/stale-salvage エビデンス、RAG/evaluator comparison、reference-set
  検証をカバーする。
- PR チェックスイートの分類に、Security Evidence、Harness Drift、Install
  Manifest Integrity、CI/CD Recommendation、Cost/Token Risk、Reference Set
  Validation、Deep Analyzer Evidence、RAG/Evaluator Evidence、
  PR Review/Salvage Evidence、Skill Quality、Agent Config Review を含む。
- Evaluator/RAG の billing readiness フィクスチャ
  `examples/evaluator-rag-prototype/billing-marketplace-readiness/` が、ローンチコピーがそれらの主張を
  ライブとして扱える前に、Marketplace、App、subscription、seat、
  entitlement、plan の言語のための読み取り専用の claim-verification パスを記録する。
- cost/token-risk の予測的フォローアップが、budget エビデンスが欠けているとき AI routing、model-call、usage、
  quota、budget の変更にフラグを立てる。
- reference-set 検証のフォローアップが、eval、golden trace、benchmark、または
  メンテナンスされた reference-set エビデンスを欠く analyzer、skill、agent、command、
  harness-guidance の変更にフラグを立てる。
- deep-analyzer のフォローアップが、analyzer corpus、snapshot、fixture、または
  benchmark エビデンスを欠く repository、commit、architecture、pattern、
  analysis-pipeline の変更にフラグを立てる。
- アナライザーコーパスエビデンスが、現在の architecture と commit のアナライザー出力のためのメンテナンスされたフィクスチャとテスト、および併設の
  `src/analyzers/{fixtures,goldens,reference-sets,benchmarks,evals}/` エビデンス
  パスを含む。
- RAG/evaluator のフォローアップが、reference-set comparison、golden trace、benchmark、fixture、
  または eval-run エビデンスを欠く retrieval、embedding、ranking、evaluator
  の変更にフラグを立てる。
- Evaluator/RAG コーパス契約が、stale-PR salvage、billing readiness、
  CI failure diagnosis、harness config quality、AgentShield policy exceptions、
  skill-quality evidence、deep-analyzer evidence、RAG/evaluator comparison のための ECC-Tools フィクスチャとテストにローカルプロトタイプのシナリオをミラーする。
- PR review/stale-salvage のフォローアップが、stale-salvage fixtures、reviewer-thread cases、または reopen-flow reference エビデンスを欠く review、triage、stale-closure、
  pull-request 自動化の変更にフラグを立てる。
- PR 分析コメントが、requested changes、未解決または古いレビュースレッド、欠けている承認のためのレビューフォローアップシグナルを
  要約する。
- CI failure-mode の予測的フォローアップが、failure fixtures、captured logs、troubleshooting notes、dry-run
  evidence、または regression coverage を欠く workflow と test-runner の変更にフラグを立てる。
- harness-config quality の予測的フォローアップが、audit、adapter matrix、
  cross-harness doc、または compatibility regression エビデンスを欠く MCP、plugin、agent、hook、
  command、harness config の変更にフラグを立てる。
- Linear 同期が、GitHub をあふれさせずに延期されたバックログ findings を Linear issue に
  マップし、設定されているとき正確なタイトルの Linear issue を作成または再利用し、
  認証情報または team 設定が欠けているときスキップされた同期を報告する。
- Linear/プロジェクトバックログ同期が、`/ecc-tools followups sync-linear` が
  `open-pr-drafts` なしで使われるときコピー対応の PR ドラフトを含め、
  stale-PR salvage の作業が追加の PR シェルを開かずに追跡されたままにする。
- フォローアップ生成が自動 GitHub オブジェクト作成をキャップし、オーバーフローの
  findings をコピー対応のプロジェクト同期バックログに保つ。

### 7. レガシー監査と stale-work 救済のクローズ

ターゲット：2026-06-15

受け入れ：

- レガシーディレクトリと孤立したハンドオフがインベントリ化される。
- 各有用なアーティファクトが、landed、Linear/project-tracked、salvage
  branch、または archive/no-action としてマークされる。
- ワークスペースレベルのレガシーリポジトリは、サニタイズ済みのメンテナー
  ブランチを通じてのみ採掘される；生のコンテキスト、シークレット、個人パス、ローカル設定、プライベート
  ドラフトは決してまるごとインポートされない。
- Stale PR salvage ポリシーが有効なまま：まず stale/conflicted な PR をクローズし、
  救済レジャー項目を記録し、その後アトリビューションとともにメンテナーブランチに有用で互換な
  コンテンツを移植する。
- #1687 のローカライゼーションの残りは、盲目的な cherry-pick ではなく、translator/manual レビューのみで処理される。

## 次のエンジニアリングスライス

1. `docs/architecture/agentshield-enterprise-research-roadmap.md` から
   AgentShield エンタープライズコントロールプレーンのシーケンスを継続する：PR #63
   は GitHub Action の baseline 出力と job-summary エビデンスを出荷；PR #64
   は `agentshield baseline write` を通じてファーストクラスの baseline スナップショット作成を
   出荷；PR #67 はエビデンスパックバンドルを出荷；PR
   #68 はエビデンスパック redaction をハードニング；PR #69 はマルチハーネス
   アダプターレジストリを出荷；PR #78 は現在のサプライチェーンインシデントクラスのためにリリースワークフローをハードニング；PR #79 は baseline/watch/remediation
   フィンガープリントをハッシュ化されたエビデンスに移し、新しい baseline に生のエビデンスを書き込むのを停止；PR #80 は失敗した regression ゲートのための優先順位付けされたコーパス精度の推奨を追加；
   PR #81 は順序付けられた remediation ワークフローフェーズを追加；
   PR #82 は env proxy hijack と out-of-band
   流出のためのコーパスカバレッジを拡張；PR #83-#85 は Mini Shai-Hulud IOC カバレッジと
   release-path サプライチェーン検証をハードニング；PR #86 は whitelist された
   `ci-context.json` workflow、commit、run、runtime の来歴をエビデンス
   パックに追加；PR #87 はキャッシュされたフック実装を含め、インストール済みの Claude plugin キャッシュを
   アクティブなトップレベルランタイム設定と別に分類；PR
   #88 は下流のコンシューマーのための `agentshield evidence-pack inspect` の JSON/text readback を追加；PR #89 は複数の inspect されたバンドルにまたがる `agentshield evidence-pack fleet`
   サマリー/ルーティングを追加；ECC-Tools PR #42/#43 は現在
   エビデンスパックをルーティングし認識する；ECC-Tools PR #76 はホステッドセキュリティレビューでフリート
   サマリーを消費；ECC-Tools PR #77 はホステッド PR コメントと check-run でソース
   エビデンスパスを表面化；ECC-Tools PR #78
   は AgentShield フリートターゲットパスをホステッドハーネスオーナー findings にリンク；
   AgentShield PR #90 はソースエビデンスパスと
   owner-ready な推奨を持つフリート `reviewItems` を出力；AgentShield PR #91 は branch-protection レビューと下流のポリシー
   昇格のためのチェックサムバックアップのポリシーバンドルをエクスポート；AgentShield PR #92 は dry-run JSON レビューとともにチェックサム検証済みのポリシーバンドルを
   アクティブなポリシーファイルに昇格；AgentShield コミット
   `87aec47` は digest エビデンス、
   owner-review、protected-rollout PR ハンドオフ、ランタイムスモークテストのためのポリシー昇格 `reviewItems` を追加；
   AgentShield コミット `28d08c7` はパッケージマネージャーハードニングのドリフト検出を追加；
   AgentShield コミット `659f569` は現在の SHA 固定の v6 action で action-runtime の非推奨警告を
   クリア；AgentShield コミット `ee585cd` は、サポートされていない npm age キーを findings にしつつ
   強制可能な cooldown findings を pnpm/Yarn に保つことで npm release-age ガイダンスを修正；AgentShield コミット
   `1124535` は registry
   credentials、lifecycle-script ドリフト、release-age ゲートドリフトのためのパッケージマネージャーハードニング Action 出力を公開；
   AgentShield コミット `1593925` は owner 承認、protected rollout、digest エビデンス、runtime-smoke
   review items のための policy-promotion Action 出力を公開し、ECC-Tools コミット `8658951` はそれらの出力をホステッド
   セキュリティレビューと Hosted Promotion Readiness スコアリングで消費し、ECC-Tools
   コミット `16c537f` は promotion status、pack、review item count、
   remaining action count、digest をホステッドセキュリティコメント/check-run にレンダリングする。
   ECC-Tools コミット `05d4e82` は、生の provider 出力を露出させずに、決定論的なリクエストフィンガープリントと allowed-citation カウントを持つホステッド昇格ジャッジ監査トレースを追加する。
   ECC-Tools コミット `91a441b` は、特権 API 呼び出しの前に Marketplace readback 入力をチェックするための billing announcement preflight コマンドを追加する。
   次のスライスは、Marketplace/payment ゲート後のライブオペレーター承認/readback である。
2. `npm run billing:announcement-gate -- --preflight --account
   <github-login>` を実行し、その後 `--preflight` なしで Marketplace 管理下のテストアカウントに対して同じコマンドを実行し、いかなる native GitHub payments アナウンスの前にも `announcementGate.ready ===
   true` を要求する。
3. ワークスペースの issue 容量がクリアされるか Linear ワークスペースがアップグレードされた後、マージされた Linear バックログ同期パスを有効化/設定し、その後 PR ドラフト
   救済項目が期待されるプロジェクトにランドすることを検証する。
4. より深いホステッド取得、ベクトルストレージ、または自動化された check-run 昇格を追加する前に、
   ECC-Tools の evaluator/RAG コーパスを昇格ゲートとして使用する。
