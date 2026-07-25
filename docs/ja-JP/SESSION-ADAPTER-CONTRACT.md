# セッションアダプター契約

このドキュメントは、`ecc.session.v1` のための正規の ECC セッションスナップショット契約を定義します。

契約は `scripts/lib/session-adapters/canonical-session.js` に実装されています。このドキュメントは、アダプターとコンシューマーのための規範的な仕様です。

## 目的

ECC は複数のセッションソースを持ちます：

- tmux オーケストレーションのワークツリーセッション
- Claude ローカルセッション履歴
- 将来のハーネスとコントロールプレーンのバックエンド

アダプターは、それらのソースを1つのコントロールプレーンセーフなスナップショットの形に正規化し、検査、永続化、将来の UI レイヤーがハーネス固有のファイルやランタイムの詳細に依存しないようにします。

## 正規スナップショット

すべてのアダプターは、このトップレベルの形を持つ JSON シリアライズ可能なオブジェクトを返さなければなりません（MUST）：

```json
{
  "schemaVersion": "ecc.session.v1",
  "adapterId": "dmux-tmux",
  "session": {
    "id": "workflow-visual-proof",
    "kind": "orchestrated",
    "state": "active",
    "repoRoot": "/tmp/repo",
    "sourceTarget": {
      "type": "session",
      "value": "workflow-visual-proof"
    }
  },
  "workers": [
    {
      "id": "seed-check",
      "label": "seed-check",
      "state": "running",
      "health": "healthy",
      "branch": "feature/seed-check",
      "worktree": "/tmp/worktree",
      "runtime": {
        "kind": "tmux-pane",
        "command": "codex",
        "pid": 1234,
        "active": false,
        "dead": false
      },
      "intent": {
        "objective": "Inspect seeded files.",
        "seedPaths": ["scripts/orchestrate-worktrees.js"]
      },
      "outputs": {
        "summary": [],
        "validation": [],
        "remainingRisks": []
      },
      "artifacts": {
        "statusFile": "/tmp/status.md",
        "taskFile": "/tmp/task.md",
        "handoffFile": "/tmp/handoff.md"
      }
    }
  ],
  "aggregates": {
    "workerCount": 1,
    "states": {
      "running": 1
    },
    "healths": {
      "healthy": 1
    }
  }
}
```

## 必須フィールド

### トップレベル

| フィールド | タイプ | 備考 |
| --- | --- | --- |
| `schemaVersion` | string | この契約では正確に `ecc.session.v1` でなければならない（MUST） |
| `adapterId` | string | `dmux-tmux` や `claude-history` のような安定したアダプター識別子 |
| `session` | object | 正規のセッションメタデータ |
| `workers` | array | 正規のワーカーレコード；空でもよい |
| `aggregates` | object | 導出されたワーカーカウント |

### `session`

| フィールド | タイプ | 備考 |
| --- | --- | --- |
| `id` | string | アダプタードメイン内の安定した識別子 |
| `kind` | string | `orchestrated` や `history` のような高レベルのセッションファミリー |
| `state` | string | 正規のセッション状態 |
| `sourceTarget` | object | セッションを開いたターゲットの来歴 |

### `session.sourceTarget`

| フィールド | タイプ | 備考 |
| --- | --- | --- |
| `type` | string | `plan`、`session`、`claude-history`、`claude-alias`、`session-file` のようなルックアップクラス |
| `value` | string | 生のターゲット値または解決されたパス |

### `workers[]`

| フィールド | タイプ | 備考 |
| --- | --- | --- |
| `id` | string | アダプタースコープ内の安定したワーカー識別子 |
| `label` | string | オペレーター向けのラベル |
| `state` | string | 正規のワーカー状態（ライフサイクル） |
| `health` | string | 正規のワーカー health（運用状態） |
| `runtime` | object | 実行/ランタイムのメタデータ |
| `intent` | object | このワーカー/セッションが存在する理由 |
| `outputs` | object | 構造化された成果とチェック |
| `artifacts` | object | アダプターが所有するファイル/パス参照 |

### `workers[].runtime`

| フィールド | タイプ | 備考 |
| --- | --- | --- |
| `kind` | string | `tmux-pane` や `claude-session` のようなランタイムファミリー |
| `active` | boolean | ランタイムが今アクティブかどうか |
| `dead` | boolean | ランタイムが dead/finished と分かっているかどうか |

### `workers[].intent`

| フィールド | タイプ | 備考 |
| --- | --- | --- |
| `objective` | string | 主要な目的またはタイトル |
| `seedPaths` | string[] | ワーカー/セッションに関連する seed またはコンテキストのパス |

### `workers[].outputs`

| フィールド | タイプ | 備考 |
| --- | --- | --- |
| `summary` | string[] | 完了した出力またはサマリー項目 |
| `validation` | string[] | 検証エビデンスまたはチェック |
| `remainingRisks` | string[] | 未解決のリスク、フォローアップ、またはノート |

### `aggregates`

| フィールド | タイプ | 備考 |
| --- | --- | --- |
| `workerCount` | integer | `workers.length` と等しくなければならない（MUST） |
| `states` | object | `workers[].state` から導出されたカウントマップ |
| `healths` | object | `workers[].health` から導出されたカウントマップ |

## オプションフィールド

オプションフィールドは省略してもよい（MAY）が、出力する場合は文書化されたタイプを保持しなければならない（MUST）：

| フィールド | タイプ | 備考 |
| --- | --- | --- |
| `session.repoRoot` | `string \| null` | 分かっている場合の repo/worktree のルート |
| `workers[].branch` | `string \| null` | 分かっている場合のブランチ名 |
| `workers[].worktree` | `string \| null` | 分かっている場合のワークツリーパス |
| `workers[].runtime.command` | `string \| null` | 分かっている場合のアクティブなコマンド |
| `workers[].runtime.pid` | `number \| null` | 分かっている場合のプロセス id |
| `workers[].artifacts.*` | アダプター定義 | アダプターが所有するファイルパスまたは構造化された参照 |

アダプター固有のオプションフィールドは、`runtime`、`artifacts`、またはその他の文書化されたネストオブジェクトの内部に属します。アダプターは、この契約を更新せずに新しいトップレベルフィールドを作り出してはならない（MUST NOT）。

## 状態のセマンティクス

契約は意図的に `session.state` と `workers[].state` を複数のハーネスに十分柔軟に保ちますが、現在のアダプターはこれらの値を使用します：

- `dmux-tmux`
  - セッション状態：`active`、`completed`、`failed`、`idle`、`missing`
  - ワーカー状態：ワーカーステータスファイルから導出、例えば `running` や
    `completed`
- `claude-history`
  - セッション状態：`recorded`
  - ワーカー状態：`recorded`

コンシューマーは、未知の状態文字列を有効なアダプター固有の値として扱い、優雅にデグレードしなければならない（MUST）。

## バージョニング戦略

`schemaVersion` は唯一の互換性ゲートです。コンシューマーはそれで分岐しなければならない（MUST）。

### `ecc.session.v1` で許可されること

- 新しいオプションのネストフィールドの追加
- 新しいアダプター id の追加
- 新しい状態文字列値の追加
- 新しい health 文字列値の追加
- `workers[].artifacts` 内の新しいアーティファクトキーの追加

### 新しいスキーマバージョンを必要とすること

- 必須フィールドの削除
- フィールドの名前変更
- フィールドタイプの変更
- 既存フィールドの意味を非互換な方法で変更すること
- 同じバージョン文字列を保ちつつ、あるフィールドから別のフィールドにデータを移動すること

それらのいずれかが起こる場合、プロデューサーは `ecc.session.v2` のような新しいバージョン文字列を出力しなければならない（MUST）。

## アダプター準拠要件

すべての ECC セッションアダプターは以下をしなければならない（MUST）：

1. `schemaVersion: "ecc.session.v1"` を正確に出力する。
2. すべての必須フィールドとタイプを満たすスナップショットを返す。
3. 未知のオプションスカラー値には `null` を、未知のリスト値には空の配列を使用する。
4. アダプター固有の詳細を `runtime`、`artifacts`、またはその他の文書化されたネストオブジェクトの下にネストする。
5. `aggregates.workerCount === workers.length` を保証する。
6. `aggregates.states` が出力されたワーカー状態に一致することを保証する。
7. `aggregates.healths` が出力されたワーカー health 値に一致することを保証する。
7. 単純な JSON シリアライズ可能な値のみを生成する。
8. 永続化または下流の使用の前に正規の形を検証する。
9. セッション記録シムを通じて正規化された正規スナップショットを永続化する。
   このリポジトリでは、そのシムはまず `scripts/lib/state-store` を試み、状態ストア
   モジュールがまだ利用できない場合にのみ JSON 記録ファイルにフォールバックする。

## コンシューマーの期待

コンシューマーは以下をすべき（SHOULD）：

- `ecc.session.v1` については文書化されたフィールドのみに頼る
- 未知のオプションフィールドを無視する
- `adapterId`、`session.kind`、`runtime.kind` を、網羅的な列挙ではなくルーティングのヒントとして
  扱う
- `workers[].artifacts` 内にアダプター固有のアーティファクトキーを期待する

コンシューマーは以下をしてはならない（MUST NOT）：

- 文書化されていないフィールドからハーネス固有の挙動を推論する
- すべてのアダプターが tmux ペイン、git ワークツリー、または markdown 調整
  ファイルを持つと仮定する
- 状態文字列が馴染みがないというだけでスナップショットを拒否する

## 現在のアダプターマッピング

### `dmux-tmux`

- ソース：`scripts/lib/orchestration-session.js`
- セッション id：オーケストレーションセッション名
- セッション kind：`orchestrated`
- セッションソースターゲット：プランパスまたはセッション名
- ワーカーランタイム kind：`tmux-pane`
- アーティファクト：`statusFile`、`taskFile`、`handoffFile`

### `claude-history`

- ソース：`scripts/lib/session-manager.js`
- セッション id：存在する場合は Claude ショート id、そうでなければセッションファイル名由来の id
- セッション kind：`history`
- セッションソースターゲット：明示的な履歴ターゲット、alias、または `.tmp` セッションファイル
- ワーカーランタイム kind：`claude-session`
- Intent の seed パス：`### Context to Load` からパース
- アーティファクト：`sessionFile`、`context`

## 検証リファレンス

リポジトリの実装は以下を検証します：

- 必須のオブジェクト構造
- 必須の文字列フィールド
- boolean のランタイムフラグ
- 文字列配列の outputs と seed パス
- 集約カウントの一貫性

アダプターは、検証の失敗をユーザー入力エラーではなく、契約のバグとして扱うべきです。

## 記録フォールバックの挙動

JSON フォールバックレコーダーは、専用の状態ストアがランドする前の期間のための一時的な互換シムです。その挙動は：

- 最新のスナップショットは常にインプレースで置き換えられる
- 履歴は個別のスナップショット本体のみを記録する
- 変更のない繰り返しの読み取りは、重複した履歴エントリを追加しない

これにより、`session-inspect` やその他のポーリングスタイルの読み取りが、同じ変更のないセッションスナップショットのために無制限に履歴を増やすのを防ぎます。
