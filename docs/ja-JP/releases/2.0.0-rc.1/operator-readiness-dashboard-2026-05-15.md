# ECC オペレーター準備状況ダッシュボード

このダッシュボードは `npm run operator:dashboard` によって生成されます。これはオペレーターのスナップショットであり、リリース承認ではありません。

生成日時：2026-05-17T05:08:31.916Z
コミット：6d130cfcd5d06b42c7eb30be8e109cfa87fde197
ステータス：作業残あり

## 現在のステータス

| 領域 | ステータス | エビデンス |
| --- | --- | --- |
| PR キュー | 最新 | 追跡対象リポジトリ全体でオープン PR 6件 |
| Issue キュー | 最新 | 追跡対象リポジトリ全体でオープン issue 3件 |
| ディスカッション | 最新 | メンテナー対応が必要 0件；承認済み回答が欠けている 0件 |
| ローカルワークツリー | 要作業 | ブロッキングな dirty ファイル 7件；ignore 済み dirty エントリ 1件 |
| ダッシュボード生成 | 最新 | プラットフォーム監査 ready: true；GitHub skipped: false |
| 公表 | 未完了 | release、npm、plugin、billing、announcement の各ゲートを下記で追跡 |

## プロンプトからアーティファクトへのチェックリスト

| 目的要件 | アーティファクトまたはゲート | ステータス | エビデンス | ギャップ |
| --- | --- | --- | --- | --- |
| 公開 PR を20件未満に保つ | scripts/platform-audit.js のライブ GitHub スイープ | current | 追跡対象5リポジトリ全体でオープン PR 6件 | リリース前に再実行 |
| 公開 issue を20件未満に保つ | scripts/platform-audit.js のライブ GitHub スイープ | current | 追跡対象5リポジトリ全体でオープン issue 3件 | リリース前に再実行 |
| リポジトリのディスカッションに応答・管理する | scripts/platform-audit.js のディスカッションサマリー | current | メンテナー対応が必要 0件；承認済み回答が欠けている回答可能なディスカッション 0件 | リリース前に再実行 |
| ITO-44 完了ダッシュボードを繰り返し可能なコマンドに組み込む | npm run operator:dashboard | complete | operator:dashboard パッケージスクリプトが存在 | 生成されたダッシュボードを公表エビデンスに添付し続ける |
| ECC 2.0 プレビューパックの準備 | docs/releases/2.0.0-rc.1/preview-pack-manifest.md | in_progress | プレビューパックマニフェストがツリー内にある | 最終的なクリーンチェックアウトのリリース承認と publish エビデンスは未了 |
| Hermes の専門スキルを安全に含める | docs/HERMES-SETUP.md および skills/hermes-imports/SKILL.md | in_progress | Hermes セットアップとインポートスキルが存在 | 最終的なプレビューパックのスモークとリリースレビューが未了 |
| 名称変更、Claude プラグイン、Codex プラグインのパスを準備する | naming-and-publication-matrix および publication-readiness | in_progress | ネーミングマトリックスとプラグイン準備ゲートが存在 | 実際のタグ/プッシュ、marketplace 提出、最終チャネル選択は承認ゲートのまま |
| リリースノート、記事、ツイート、プッシュ通知を準備する | docs/releases/2.0.0-rc.1 のソーシャルおよびリリースコピーファイル | in_progress | リリースノート、X スレッド、LinkedIn 草稿が存在 | URL バックアップのリフレッシュと publish 承認は未了 |
| AgentShield エンタープライズのイテレーションを進める | AgentShield PR エビデンスおよびエンタープライズロードマップ | in_progress | AgentShield エンタープライズ PR エビデンスが GA ロードマップにミラーされている | 保護付きロールアウトを取り巻くワークフロー自動化と、より豊かなランタイムレビュー UX は、ポリシー昇格の出荷後に未了 |
| ECC Tools のネイティブペイメントと AI ネイティブなハーネス非依存アプリを進める | ECC Tools PR エビデンス、billing ゲート、ホステッド分析レーン | in_progress | billing アナウンスゲート、ホステッド分析レーン、AgentShield フリートサマリー消費、ホステッド finding エビデンスパス、ハーネスルートポリシーリンクが GA ロードマップにミラーされている | ライブ Marketplace テストアカウントのリードバック、ホステッド昇格テレメトリ、より豊かなオペレーターレビュー UX は未了 |
| レガシー作業を監査、prune、または添付する | docs/stale-pr-salvage-ledger.md およびレガシーインベントリ | in_progress | レガシー救済レジャーと ITO-55 の追跡が存在 | 最終的な翻訳/手動レビューの残務が残る |
| Linear ロードマップを詳細に保ち、進捗追跡を同期する | Linear プロジェクトミラーおよび progress-sync 契約 | in_progress | リポジトリミラーと progress-sync 契約が存在 | 定期的な Linear ステータス同期とプロダクト化されたリアルタイム同期が未了 |
| 自己利用のための ECC 2.0 オブザーバビリティを提供する | オブザーバビリティ準備ゲート | complete | observability:ready コマンドと準備ドキュメントが存在 | ランタイム/ダッシュボードの実装はリリースゲート後に継続可能 |
| Mini Shai-Hulud/TanStack 保護ループを最新に保つ | サプライチェーンウォッチおよび runbook | current | スケジュールされたサプライチェーンウォッチが IOC とアドバイザリソースのリフレッシュのアーティファクトを出力するようになった | Linear ステータス同期は、重要なマージバッチごとに ITO-57 のフォローアップとして残る |

## トップアクション

- `ecc-preview-pack`：最終的なクリーンチェックアウトのリリース承認と publish エビデンスは未了
- `hermes-specialized-skills`：最終的なプレビューパックのスモークとリリースレビューが未了
- `naming-and-plugin-publication`：実際のタグ/プッシュ、marketplace 提出、最終チャネル選択は承認ゲートのまま
- `release-notes-and-notifications`：URL バックアップのリフレッシュと publish 承認は未了
- `agentshield-enterprise-iteration`：保護付きロールアウトを取り巻くワークフロー自動化と、より豊かなランタイムレビュー UX は、ポリシー昇格の出荷後に未了
- `ecc-tools-next-level`：ライブ Marketplace テストアカウントのリードバック、ホステッド昇格テレメトリ、より豊かなオペレーターレビュー UX は未了
- `legacy-salvage`：最終的な翻訳/手動レビューの残務が残る
- `linear-roadmap-and-progress`：定期的な Linear ステータス同期とプロダクト化されたリアルタイム同期が未了

## 次の作業指示

1. 公表エビデンスが記録される前に、最終リリースコミットからこのダッシュボードを再生成する。
2. スケジュールされたサプライチェーンウォッチのアドバイザリソースレポートについて、Linear ステータス同期を伴う ITO-57 を継続する。
3. native-payments のアナウンスコピーを公開する前に、ECC Tools のライブ Marketplace テストアカウントのリードバックを進める。
4. 生成されたダッシュボードと最終リリースゲートがリフレッシュされた後にのみ、ITO-45、ITO-46、ITO-56 を再開する。
