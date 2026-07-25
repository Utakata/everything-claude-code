# ECC 2.0 セッションアダプター探索

## 目的

このドキュメントは、3月11日の ECC 2.0 コントロールプレーンの方向性を、このリポジトリにすでに存在するオーケストレーションコードに基づいた、具体的なアダプターとスナップショットの設計に変えます。

## 現在実装されている基盤

リポジトリにはすでに、実際の初回パスのオーケストレーション基盤があります：

- `scripts/lib/tmux-worktree-orchestrator.js`
  は tmux ペインと分離された git ワークツリーをプロビジョニングする
- `scripts/orchestrate-worktrees.js`
  は現在のセッションランチャー
- `scripts/lib/orchestration-session.js`
  は機械可読なセッションスナップショットを収集する
- `scripts/orchestration-status.js`
  はセッション名またはプランファイルからそれらのスナップショットをエクスポートする
- `commands/sessions.md`
  はすでに Claude のローカルストアから隣接するセッション履歴の概念を公開する
- `scripts/lib/session-adapters/canonical-session.js`
  は正規の `ecc.session.v1` 正規化レイヤーを定義する
- `scripts/lib/session-adapters/dmux-tmux.js`
  は現在のオーケストレーションスナップショットコレクターをアダプター `dmux-tmux` としてラップする
- `scripts/lib/session-adapters/claude-history.js`
  は Claude ローカルセッション履歴を第二のアダプターとして正規化する
- `scripts/lib/session-adapters/registry.js`
  は明示的なターゲットとターゲットタイプからアダプターを選択する
- `scripts/session-inspect.js`
  はアダプターレジストリを通じて正規の読み取り専用セッションスナップショットを出力する

実際には、ECC はすでに以下に答えられます：

- tmux オーケストレーションセッションにどのワーカーが存在するか
- 各ワーカーがどのペインにアタッチされているか
- 各ワーカーにどの task、status、handoff のファイルが存在するか
- セッションがアクティブか、いくつのペイン/ワーカーが存在するか
- 最新の Claude ローカルセッションが、オーケストレーションセッションと同じ正規の
  スナップショットの形でどのように見えたか

それは基盤を証明するのに十分です。まだ、汎用の ECC 2.0 コントロールプレーンとして認められるには十分ではありません。

## 現在のスナップショットが実際にモデル化しているもの

`scripts/lib/orchestration-session.js` から出てくる現在のスナップショットモデルは、これらの有効なフィールドを持ちます：

```json
{
  "sessionName": "workflow-visual-proof",
  "coordinationDir": ".../.claude/orchestration/workflow-visual-proof",
  "repoRoot": "...",
  "targetType": "plan",
  "sessionActive": true,
  "paneCount": 2,
  "workerCount": 2,
  "workerStates": {
    "running": 1,
    "completed": 1
  },
  "panes": [
    {
      "paneId": "%95",
      "windowIndex": 1,
      "paneIndex": 0,
      "title": "seed-check",
      "currentCommand": "codex",
      "currentPath": "/tmp/worktree",
      "active": false,
      "dead": false,
      "pid": 1234
    }
  ],
  "workers": [
    {
      "workerSlug": "seed-check",
      "workerDir": ".../seed-check",
      "status": {
        "state": "running",
        "updated": "...",
        "branch": "...",
        "worktree": "...",
        "taskFile": "...",
        "handoffFile": "..."
      },
      "task": {
        "objective": "...",
        "seedPaths": ["scripts/orchestrate-worktrees.js"]
      },
      "handoff": {
        "summary": [],
        "validation": [],
        "remainingRisks": []
      },
      "files": {
        "status": ".../status.md",
        "task": ".../task.md",
        "handoff": ".../handoff.md"
      },
      "pane": {
        "paneId": "%95",
        "title": "seed-check"
      }
    }
  ]
}
```

これはすでに有用なオペレーターペイロードです。主な制限は、それが暗黙的に1つの実行スタイルに紐づいていることです：

- tmux ペインのアイデンティティ
- ワーカースラグがペインタイトルと等しい
- markdown 調整ファイル
- プランファイルまたはセッション名のルックアップルール

## ECC 1.x と ECC 2.0 のギャップ

ECC 1.x は現在、2つの異なる「セッション」サーフェスを持ちます：

1. Claude ローカルセッション履歴
2. オーケストレーションランタイム/セッションスナップショット

それらのサーフェスは隣接していますが、統一されていません。

欠けている ECC 2.0 レイヤーは、以下を正規化できるハーネス中立のセッションアダプター境界です：

- tmux オーケストレーションのワーカー
- 単純な Claude セッション
- Codex ワークツリーセッション
- OpenCode セッション
- 将来の GitHub/App またはリモート制御のセッション

そのアダプターレイヤーがなければ、将来のオペレーター UI は tmux 固有の詳細と調整 markdown を直接読むことを強いられます。

## アダプター境界

ECC 2.0 は、正規のセッションアダプター契約を導入すべきです。

推奨される最小限のインターフェース：

```ts
type SessionAdapter = {
  id: string;
  canOpen(target: SessionTarget): boolean;
  open(target: SessionTarget): Promise<AdapterHandle>;
};

type AdapterHandle = {
  getSnapshot(): Promise<CanonicalSessionSnapshot>;
  streamEvents?(onEvent: (event: SessionEvent) => void): Promise<() => void>;
  runAction?(action: SessionAction): Promise<ActionResult>;
};
```

### 正規スナップショットの形

推奨される初回パスの正規ペイロード：

```json
{
  "schemaVersion": "ecc.session.v1",
  "adapterId": "dmux-tmux",
  "session": {
    "id": "workflow-visual-proof",
    "kind": "orchestrated",
    "state": "active",
    "repoRoot": "...",
    "sourceTarget": {
      "type": "plan",
      "value": ".claude/plan/workflow-visual-proof.json"
    }
  },
  "workers": [
    {
      "id": "seed-check",
      "label": "seed-check",
      "state": "running",
      "branch": "...",
      "worktree": "...",
      "runtime": {
        "kind": "tmux-pane",
        "command": "codex",
        "pid": 1234,
        "active": false,
        "dead": false
      },
      "intent": {
        "objective": "...",
        "seedPaths": ["scripts/orchestrate-worktrees.js"]
      },
      "outputs": {
        "summary": [],
        "validation": [],
        "remainingRisks": []
      },
      "artifacts": {
        "statusFile": "...",
        "taskFile": "...",
        "handoffFile": "..."
      }
    }
  ],
  "aggregates": {
    "workerCount": 2,
    "states": {
      "running": 1,
      "completed": 1
    }
  }
}
```

これは、コントロールプレーン契約から tmux 固有の詳細を削除しつつ、すでに存在する有用なシグナルを保持します。

## 最初にサポートするアダプター

### 1. `dmux-tmux`

`scripts/lib/orchestration-session.js` にすでに存在するロジックをラップします。

基盤がすでに実在するため、これは最も簡単な最初のアダプターです。

### 2. `claude-history`

`commands/sessions.md` と既存のセッションマネージャーユーティリティがすでに公開しているデータを正規化します：

- セッション id / alias
- ブランチ
- ワークツリー
- プロジェクトパス
- 新しさ / ファイルサイズ / 項目数

これは ECC 2.0 の非オーケストレーションのベースラインを提供します。

### 3. `codex-worktree`

同じ正規の形を使用しますが、利用可能な場合は tmux の仮定の代わりに Codex ネイティブの実行メタデータでバックアップします。

### 4. `opencode`

OpenCode のセッションメタデータが正規化するのに十分安定したら、同じアダプター境界を使用します。

## アダプターレイヤーの外に留まるべきもの

アダプターレイヤーは以下を所有すべきではありません：

- マージシーケンシングのビジネスロジック
- オペレーター UI のレイアウト
- 価格設定またはマネタイズの決定
- インストールプロファイルの選択
- tmux ライフサイクルのオーケストレーション自体

その仕事はより狭いです：

- セッションターゲットを検出する
- 正規化されたスナップショットをロードする
- オプションでランタイムイベントをストリーミングする
- オプションで安全なアクションを公開する

## 現在のファイルレイアウト

アダプターレイヤーは現在以下にあります：

```text
scripts/lib/session-adapters/
  canonical-session.js
  dmux-tmux.js
  claude-history.js
  registry.js
scripts/session-inspect.js
tests/lib/session-adapters.test.js
tests/scripts/session-inspect.test.js
```

現在のオーケストレーションスナップショットパーサーは、唯一の製品契約として残るのではなく、アダプター実装として消費されるようになっています。

## 即時の次のステップ

1. 抽象化が tmux と Claude-history を超えるよう、おそらく `codex-worktree` という
   第三のアダプターを追加する。
2. UI 作業が始まる前に、正規スナップショットに別個の `state` と `health`
   フィールドが必要かどうかを決定する。
3. イベントストリーミングが v1 に属するか、スナップショットレイヤーが自身を証明するまで
   外に留まるかを決定する。
4. オーケストレーションの内部を直接読むのではなく、アダプターレジストリの上にのみ
   オペレーター向けのパネルを構築する。

## 未解決の質問

1. ワーカーのアイデンティティは、ワーカースラグ、ブランチ、または安定した UUID でキー付けされるべきか？
2. 正規レイヤーで別個の `state` と `health` フィールドが必要か？
3. イベントストリーミングは v1 の一部であるべきか、それとも ECC 2.0 はまずスナップショットのみを
   出荷すべきか？
4. スナップショットがローカルマシンを離れる前に、どれだけのパス情報を redact すべきか？
5. アダプターレジストリは長期的にこのリポジトリ内に存在すべきか、それともインターフェースが安定したら
   最終的な ECC 2.0 コントロールプレーンアプリに移動すべきか？

## 推奨

現在の tmux/worktree 実装を、最終的な製品サーフェスではなく、アダプター `0` として扱います。

ECC 2.0 への最短パスは：

1. 現在のオーケストレーション基盤を保持する
2. それを正規のセッションアダプター契約でラップする
3. 1つの非 tmux アダプターを追加する
4. その後にのみ、その上にオペレーターパネルの構築を始める
