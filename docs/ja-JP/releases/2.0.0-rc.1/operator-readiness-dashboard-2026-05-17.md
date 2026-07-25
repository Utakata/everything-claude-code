# ECC オペレーター準備状況ダッシュボード

このダッシュボードは `npm run operator:dashboard` によって生成されます。これはオペレーターのスナップショットであり、リリース承認ではありません。

生成日時：2026-05-18T01:50:19.099Z
コミット：000df72d6b9c5b11feb11deef609911943b48424
ステータス：作業残あり

## 現在のステータス

| 領域 | ステータス | エビデンス |
| --- | --- | --- |
| PR キュー | 最新 | 追跡対象リポジトリ全体でオープン PR 0件 |
| Issue キュー | 最新 | 追跡対象リポジトリ全体でオープン issue 0件 |
| ディスカッション | 最新 | メンテナー対応が必要 0件；承認済み回答が欠けている 0件 |
| ローカルワークツリー | 最新 | ブロッキングな dirty ファイル 0件；ignore 済み dirty エントリ 1件 |
| ダッシュボード生成 | 最新 | プラットフォーム監査 ready: true；GitHub skipped: false |
| 公表 | 未完了 | release、npm、plugin、billing、announcement の各ゲートを下記で追跡 |

## プロンプトからアーティファクトへのチェックリスト

| 目的要件 | アーティファクトまたはゲート | ステータス | エビデンス | ギャップ |
| --- | --- | --- | --- | --- |
| 公開 PR を20件未満に保つ | scripts/platform-audit.js のライブ GitHub スイープ | current | 追跡対象5リポジトリ全体でオープン PR 0件 | リリース前に再実行 |
| 公開 issue を20件未満に保つ | scripts/platform-audit.js のライブ GitHub スイープ | current | 追跡対象5リポジトリ全体でオープン issue 0件 | リリース前に再実行 |
| リポジトリのディスカッションに応答・管理する | scripts/platform-audit.js のディスカッションサマリー | current | メンテナー対応が必要 0件；承認済み回答が欠けている回答可能なディスカッション 0件 | リリース前に再実行 |
| ITO-44 完了ダッシュボードを繰り返し可能なコマンドに組み込む | npm run operator:dashboard | complete | operator:dashboard パッケージスクリプトが存在 | 生成されたダッシュボードを公表エビデンスに添付し続ける |
| ECC 2.0 プレビューパックの準備 | docs/releases/2.0.0-rc.1/preview-pack-manifest.md | current | プレビューパックマニフェストと決定論的スモークゲートがツリー内にある | 公表前にクリーンチェックアウトのプレビューパックスモークを再実行 |
| Hermes の専門スキルを安全に含める | docs/HERMES-SETUP.md および skills/hermes-imports/SKILL.md | current | Hermes セットアップ/インポートのアーティファクトがプレビューパックスモークでカバーされている | リリースレビュー前にプレビューパックスモークを再実行 |
| 名称変更、Claude プラグイン、Codex プラグインのパスを準備する | naming-and-publication-matrix および publication-readiness | in_progress | ネーミングマトリックスとプラグイン準備ゲートが存在 | 実際のタグ/プッシュ、marketplace 提出、最終チャネル選択は承認ゲートのまま |
| リリースノート、記事、ツイート、プッシュ通知を準備する | docs/releases/2.0.0-rc.1 のソーシャルおよびリリースコピーファイル | in_progress | リリースノート、X スレッド、LinkedIn 草稿が存在 | URL バックアップのリフレッシュと publish 承認は未了 |
| AgentShield エンタープライズのイテレーションを進める | AgentShield PR エビデンスおよびエンタープライズロードマップ | in_progress | AgentShield ポリシー昇格の `reviewItems` が `87aec47` でランド；パッケージマネージャーハードニングのドリフト検出が `28d08c7` でランド；ワークフローアクションのランタイムピンが `659f569` でリフレッシュ；npm age-gate ガイダンスが `ee585cd` で修正；パッケージマネージャーハードニングの Action 出力が `1124535` でランド；ポリシー昇格の Action 出力とランタイムスモークの job-summary エビデンスが `1593925` でランド；ECC-Tools がそれらの出力を `8658951` で消費し、オペレーターが読める status/pack/count/digest テレメトリを `16c537f` で表面化し、ホステッド昇格ジャッジの監査トレースを `05d4e82` でレンダリング；すべて GA ロードマップにミラーされている | Marketplace/payment ゲート後、ライブオペレーターの承認/リードバックを深化させる |
| ECC Tools のネイティブペイメントと AI ネイティブなハーネス非依存アプリを進める | ECC Tools PR エビデンス、billing ゲート、ホステッド分析レーン | in_progress | billing アナウンスゲート、ホステッド分析レーン、AgentShield フリートサマリー消費、ホステッド finding エビデンスパス、ハーネスルートポリシーリンク、ポリシー昇格の Action 出力テレメトリ、オペレーターに見える昇格出力の詳細、ホステッド昇格ジャッジの監査トレース、billing アナウンスのプリフライト、本番 KV リードバック状態が GA ロードマップにミラーされている | Marketplace の購入/webhook リードバックを完了し、その後ライブアナウンスゲートを実行 |
| レガシー作業を監査、prune、または添付する | docs/stale-pr-salvage-ledger.md およびレガシーインベントリ | current | レガシー救済レジャーとインベントリが最新；すべてのローカライゼーション残務が手動の言語オーナーレビュー用に Linear ITO-55 に添付されている | リリース前にレガシースキャンを再実行 |
| Linear ロードマップを詳細に保ち、進捗追跡を同期する | Linear プロジェクトミラーおよび progress-sync 契約 | current | Linear ライブ同期とプロジェクト進捗スナップショットが最新；progress-sync 契約がファイルバックアップの work-items/status パスを定義 | 重要なマージバッチごとに Linear/プロジェクトステータス更新とローカル work-items 同期を再実行 |
| 自己利用のための ECC 2.0 オブザーバビリティを提供する | オブザーバビリティ準備ゲート | complete | observability:ready コマンドと準備ドキュメントが存在 | ランタイム/ダッシュボードの実装はリリースゲート後に継続可能 |
| Mini Shai-Hulud/TanStack 保護ループを最新に保つ | サプライチェーンウォッチ＋runbook＋AgentShield パッケージマネージャーハードニング | current | スケジュールされたサプライチェーンウォッチが IOC/アドバイザリソースリフレッシュのアーティファクトを出力；ECC スキャナーが gh-token-monitor のトークンストア永続化をカバー；AgentShield が既知の AI ツール永続化 IOC、npm ライフサイクル/トークンドリフト、サポート外の npm age-key ドリフト、pnpm/Yarn クールダウンドリフトを検出するようになった；ITO-57 に5月17日の Linear エビデンス更新がある | 重要なサプライチェーンバッチごとにアドバイザリ/ソースリフレッシュと Linear 同期を再実行 |

## トップアクション

- `naming-and-plugin-publication`：実際のタグ/プッシュ、marketplace 提出、最終チャネル選択は承認ゲートのまま
- `release-notes-and-notifications`：URL バックアップのリフレッシュと publish 承認は未了
- `agentshield-enterprise-iteration`：Marketplace/payment ゲート後、ライブオペレーターの承認/リードバックを深化させる
- `ecc-tools-next-level`：Marketplace の購入/webhook リードバックを完了し、その後ライブアナウンスゲートを実行

## 次の作業指示

1. 公表エビデンスが記録される前に、最終リリースコミットからこのダッシュボードを再生成する。
2. 次の重要なマージバッチまたはアドバイザリソースリフレッシュの後、ITO-57 の Linear/プロジェクトステータス同期を再実行する。
3. ECC Tools の Marketplace 購入/webhook リードバックを完了し、その後 native-payments コピーを公開する前にプリフライトとライブアナウンスゲートを実行する。
4. 生成されたダッシュボードと最終リリースゲートがリフレッシュされた後にのみ、ITO-45、ITO-46、ITO-56 を再開する。
