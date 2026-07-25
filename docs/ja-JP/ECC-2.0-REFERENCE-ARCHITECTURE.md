# ECC 2.0 リファレンスアーキテクチャ

現在の実行ミラー：
[`ECC-2.0-GA-ROADMAP.md`](ECC-2.0-GA-ROADMAP.md)。

このドキュメントは、2026年5月のリファレンススイープを具体的な ECC バックログの形に変えます。第二の戦略メモではありません：以下のすべてのリファレンスの圧力は、アダプター、チェック、観測可能なシグナル、セキュリティポリシー、PR レビューサーフェス、またはリリース準備ゲートとしてランドすべきです。

## リファレンスベースライン

スナップショット日付：2026-05-12。

| リファレンス | ECC 2.0 への主要な圧力 | 具体的な ECC デルタ |
| --- | --- | --- |
| [`stablyai/orca`](https://github.com/stablyai/orca) | ターミナル、ソース管理、GitHub 統合、SSH、通知、design/browser モード、アカウント切り替え、ワークツリーごとのコンテキストを備えた、ワークツリーネイティブのマルチエージェント IDE。 | ワークツリーのライフサイクル、レビュー状態、通知状態、アカウント/provider アイデンティティを、ファーストクラスのアダプターシグナルとして扱う。 |
| [`superset-sh/superset`](https://github.com/superset-sh/superset) | 並列実行、ワークツリー分離、diff レビュー、ワークスペースプリセット、広範な CLI エージェント互換性を備えた、デスクトップ AI エージェントワークスペース。 | ワークスペースプリセットの分類を追加し、外部エディターが消費できるほど ECC2 のセッション/ワークツリー状態をエクスポート可能にする。 |
| [`standardagents/dmux`](https://github.com/standardagents/dmux) | Tmux/ワークツリーのオーケストレーション、ライフサイクルフック、マルチセレクトのエージェント制御、スマートマージ、ファイルブラウザ、通知、クリーンアップ。 | ハーネスマトリックスにライフサイクルフックのカバレッジを追加し、merge/conflict のキューイベントを定義する。 |
| [`aidenybai/ghast`](https://github.com/aidenybai/ghast) | cwd グループのワークスペース、ペイン、タブ、drag/drop、検索、通知を備えた、ネイティブ macOS ターミナルマルチプレクサー。 | cwd/セッションのグルーピングと検索可能なハンドオフ/セッションレコードを追加しつつ、ターミナルネイティブのエルゴノミクスを保持する。 |
| [`jarrodwatts/claude-hud`](https://github.com/jarrodwatts/claude-hud) | コンテキスト、ツール、エージェント、todo、トランスクリプトバックアップのアクティビティのための、常時表示の Claude Code ステータスライン。 | コンテキスト、コスト、ツール呼び出し、アクティブなエージェント、todo、キュー状態、チェック、リスクのための ECC HUD/ステータスペイロードを形式化する。 |
| [`stanford-iris-lab/meta-harness`](https://github.com/stanford-iris-lab/meta-harness) | タスク固有のハーネス設計に対する自動検索：何を保存、取得、表示するか。 | ECC 改善ループを、シナリオ仕様、proposer トレース、検証器の結果、昇格されたプレイブックに分割する。 |
| [`greyhaven-ai/autocontext`](https://github.com/greyhaven-ai/autocontext) | トレース、レポート、アーティファクト、データセット、プレイブック、役割分離された evaluator を使用した再帰的ハーネス改善。 | インストールされたハーネス資産を変更する前に、再利用可能なトレースとプレイブックを保存する。 |
| [`NousResearch/hermes-agent`](https://github.com/NousResearch/hermes-agent) | メモリ、スキル、スケジューラー、ゲートウェイ、サブエージェント、ターミナルバックエンド、移行ツーリングを備えた、自己改善オペレーターシェル。 | 根底にあるコマンドを隠すことなく、local、SSH、コンテナ、ホステッドターミナルバックエンドをまたいで ECC をポータブルに保つ。 |
| [`anthropics/claude-code`](https://github.com/anthropics/claude-code)、[`sst/opencode`](https://github.com/sst/opencode)、Zed、Codex、Cursor、Gemini | 異なるエージェントハーネスは、異なるフック、プラグインサーフェス、セッションストア、設定ファイル、レビューループを公開する。 | 1つのハーネスを正規の UX として扱うのではなく、公開のアダプター準拠マトリックスを維持する。 |
| ローカル Claude Code ソースレビュー | セッション、ツール、権限、フック、リモート、アナリティクス、task、context-suggestion のサーフェスは、公開 CLI の UX が示唆するよりも構造化されている。 | セッションメッセージ、権限リクエスト、ツールの進捗、コンテキスト圧力、サマリー状態を中心に、ステータスとリスクのイベントをモデル化する。 |

## アーキテクチャの形

ECC 2.0 は、コマンド、エージェント、スキルのカタログだけではなく、ハーネスのオペレーティングシステムであるべきです。

```text
┌──────────────────────────────────────────────────────────────┐
│ Operator Surface                                             │
│ CLI, plugin, TUI, HUD/statusline, release gates, PR checks   │
├──────────────────────────────────────────────────────────────┤
│ Harness Adapter Layer                                        │
│ Claude Code, Codex, OpenCode, Cursor, Gemini, Zed, dmux,     │
│ Orca, Superset, Ghast, terminal-only                         │
├──────────────────────────────────────────────────────────────┤
│ Worktree, Session, And Queue Runtime                         │
│ worktrees, panes, sessions, todos, checks, merge/conflict    │
│ queues, notification state, ownership, handoff exports       │
├──────────────────────────────────────────────────────────────┤
│ Observability And Evaluation Loop                            │
│ JSONL traces, status snapshots, risk ledger, harness audit,  │
│ scenario specs, verifiers, promoted playbooks, RAG sets      │
├──────────────────────────────────────────────────────────────┤
│ Security And Commercial Platform                             │
│ AgentShield policies/SARIF, ECC Tools checks, billing,       │
│ Linear/GitHub sync, enterprise reports                       │
└──────────────────────────────────────────────────────────────┘
```

## リファレンスからバックログへのマップ

### ワークツリーとセッションのオーケストレーション

Orca、Superset、dmux、Ghast から採用：

- ワークツリーのライフサイクルイベント：create、resume、pause、stop、diff、review、PR、
  merge-ready、conflict、stale、close、salvage。
- リポジトリ、ブランチ、cwd、task、owner、ハーネスによるセッショングルーピング。
- リリースレーン、PR トリアージレーン、docs レーン、security レーン、
  test-writer レーンのためのワークスペースプリセット。
- ブロックされた CI、dirty なワークツリー、マージコンフリクト、stale なレビュー、
  完了した自律実行のための通知。
- メンテナーから所有権を奪うことなく diff と PR をアノテートできるレビューループ。

リポジトリ作業：

- `everything-claude-code`：アダプター準拠マトリックスと公開
  スコアカードのオンランプを拡張する。
- `ecc2`：ホステッドテレメトリを追加する前に、安定したローカルペイロードを通じて
  セッション/ワークツリー状態を表面化する。
- `ECC-Tools`：PR チェック、issue ルーティング、Linear 同期のために同じライフサイクルイベントを消費する。

検証：

- `npm run harness:audit -- --format json`
- `npm run observability:ready`
- マトリックスが docs からデータに移行したら、対象を絞ったアダプターマトリックスのテスト

### HUD、ステータス、オブザーバビリティ

Claude HUD と Claude Code ソースレビューから採用：

- コンテキスト圧力：使用量、コンパクションのリスク、大きな結果の警告、サマリー
  状態。
- ツールアクティビティ：アクティブなツール、最近のツール、期間、リスクの高い操作、
  権限リクエスト。
- エージェントアクティビティ：アクティブなサブエージェント、委譲されたタスク、branch/worktree、待機
  状態。
- キューアクティビティ：オープンな PR/issue、CI 状態、stale/conflict バッチ、レビュー
  状態、closed-stale 救済バックログ。
- コスト/リスク：トークンコスト推定、破壊的操作のリスク、hook/MCP のリスク、
  セキュリティスキャン状態。

リポジトリ作業：

- `docs/architecture/observability-readiness.md` をオペレーター向けの
  準備ゲートとして保つ。
- ECC2 と ECC Tools の両方が消費できるバージョン管理された HUD/ステータス JSON 契約を
  定義する。
- ビジュアル UI を構築する前に、`loop-status`、`session-inspect`、ハーネス監査、
  リスクレジャーからのサンプルエクスポートをフィクスチャディレクトリに追加する。

検証：

- `npm run observability:ready`
- すべてのステータスペイロードのフィクスチャ検証
- セッション履歴を読むコマンドのクロスプラットフォームスモークテスト

### 自己改善ハーネスループ

Meta-Harness、Autocontext、Hermes Agent から採用：

- ループを観測、提案、検証、昇格、ロールバックに分離する。
- 提案されたすべての改善を、最終的な変更ファイルだけではなく、トレースとアーティファクトとして
  保存する。
- 検証器が、blast radius を広げずにシナリオを改善することを証明した後にのみ、プレイブックを
  昇格させる。
- 検証済みの ECC パターン、チーム履歴、CI 失敗、レビュー結果、ハーネス設定品質、
  セキュリティ決定のために RAG/リファレンスセットを使用する。

リポジトリ作業：

- `everything-claude-code`：シナリオ仕様、検証器契約、
  プレイブック昇格ルールを文書化する。
- `ECC-Tools`：ワークスペースをあふれさせることなく、アナライザーの findings を PR コメント、check run、Linear
  タスクにマップする。
- `agentshield`：プロンプトインジェクションと設定リスクの findings をリグレッション
  スイートに供給する。

現在のプロトタイプ：

- `docs/architecture/evaluator-rag-prototype.md` は、読み取り専用の
  evaluator/RAG アーティファクト契約を定義する。
- `examples/evaluator-rag-prototype/` は、stale-PR 救済のための最初のシナリオ仕様、トレース、
  レポート、候補プレイブック、検証器の結果を記録する。

検証：

- トレース、レポート、候補プレイブック、検証器の結果を出力する読み取り専用プロトタイプ
- 不正な提案が却下されることを証明するリグレッションフィクスチャ

### AgentShield エンタープライズセキュリティプラットフォーム

AgentShield は、有用なスキャナーからエンタープライズセキュリティプラットフォームへ移行すべきです。

バックログの形：

- 組織ベースライン、ルール深刻度、owner、例外、有効期限、
  エビデンス、監査トレイルのためのポリシースキーマ。
- GitHub code scanning のための SARIF 出力。
- OSS、team、enterprise、regulated、high-risk hooks/MCP、
  CI 強制のためのポリシーパック。
- MCP パッケージ、npm/pip の来歴、CVE、
  typosquat、依存関係レピュテーションのためのサプライチェーンインテリジェンス。
- プロンプトインジェクションコーパスとリグレッションベンチマーク。
- JSON とエグゼクティブ HTML/PDF のレポート出力。

検証：

- スキーマユニットテスト
- SARIF フィクスチャテスト
- ポリシーパックのゴールデンテスト
- 公開 issue 履歴からの false-positive リグレッションテスト

### ECC Tools コマーシャル・レビュープラットフォーム

ECC Tools は、billing、深い分析、PR チェック、Linear 進捗追跡のための GitHub ネイティブレイヤーになるべきです。

バックログの形：

- いかなる payments アナウンスの前にも、ネイティブ GitHub Marketplace の billing 監査：
  プラン、シート、org/account マッピング、サブスクリプション状態、超過の挙動、
  downgrade/cancel の挙動、失敗モード。
- GitGuardian、Dependabot、CodeRabbit、Greptile の有用な部分に匹敵するスコープの深いアナライザー：
  セキュリティエビデンス、依存関係リスク、
  CI/CD 推奨、PR レビューの挙動、設定品質、token/cost リスク、
  ハーネスドリフト。
- 検証済みの ECC パターン、過去の PR 結果、
  依存関係アドバイザリ、CI 失敗、レビュー決定、チーム固有の
  規約に対する RAG/リファレンスセット。
- issue 制限を使い果たすことなく、findings をプロジェクトステータス、マイルストーンエビデンス、
  owner-ready な issue にマップする Linear 同期。

検証：

- check-run フィクスチャテスト
- billing webhook リプレイテスト
- アナライザーのゴールデン PR フィクスチャ
- Linear 同期の dry-run フィクスチャ

### Closed-Stale 救済レーン

stale な PR をクローズすることで公開キューは利用可能に保たれますが、コントリビューターにリベースの時間がもうないという理由で有用な作業が失われるべきではありません。

実行ルール：

1. stale、コンフリクト、または陳腐化した PR を、明確な礼儀のコメントとともにクローズする。
2. ソース PR、作成者、クローズ理由、有用なファイル/コンセプト、リスク、推奨されるメンテナー
   アクションとともに、救済レジャーに記録する。
3. クリーンアップバッチの後、各クローズされた PR の差分を手動で検査する。
4. パッチが依然としてクリーンに適用され、現在のアーキテクチャを保持する場合にのみ cherry-pick する。
   そうでなければ、有用なアイデアを新しいメンテナーブランチで再実装する。
5. コミット本文または PR 本文にアトリビューションを保持する。
6. 有用な作業がランドしたら、メンテナー PR またはマージされたコミットをリンクして、ソース PR に
   コメントを返す。
7. レジャー項目を landed、superseded、Linear-tracked、または no-action としてマークする。

必要なセーフガード：

- 生成された churn、一括ローカライゼーション、または依存関係の
  メジャーバージョン変更を、決して盲目的に cherry-pick しない。
- 1つの救済メガブランチよりも、小さなメンテナー PR を優先する。
- 通常のコード、docs、カタログの変更と同じ検証ゲートを実行する。
- 最終的な実装が書き換えられても、コントリビューターのクレジットを保つ。

## 近い将来の実装順序

1. ハーネスアダプターマトリックスと公開スコアカードのオンランプを拡張する。
2. エビデンスフィールド付きの release/name/plugin 公開チェックリストを追加する。
3. HUD/ステータス JSON 契約とフィクスチャディレクトリを定義する。
4. AgentShield ポリシースキーマと SARIF フィクスチャを開始する。
5. ECC Tools の billing と check-run のサーフェスを監査する。
6. レガシーフォルダと closed-stale な PR を救済レジャーにインベントリ化する。
7. 有用な stale 作業を、小さなアトリビューション付きのメンテナー PR で移植する。

## 非目標

- ローカルのイベントモデルが有用でテスト可能になる前のホステッドテレメトリ。
- 検証器のエビデンスなしのユーザーハーネス設定の自動変更。
- いずれか1つのエージェントハーネスを正規のインターフェースとして扱うこと。
- コマンド、パッケージ、marketplace、billing のエビデンスが新鮮になる前の、
  リリースまたは payments のアナウンス。
