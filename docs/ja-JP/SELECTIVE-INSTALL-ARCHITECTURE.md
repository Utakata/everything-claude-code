# ECC 2.0 Selective Install 探索

## 目的

このドキュメントは、3月11日のメガプランの selective-install 要件を、具体的な ECC 2.0 の探索設計に変えます。

目標は、単に「インストール中にコピーされるファイルを減らす」ことではありません。実際のターゲットは、以下を決定論的に答えられるインストールシステムです：

- 何が要求されたか
- 何が解決されたか
- 何がコピーまたは生成されたか
- どのターゲット固有の変換が適用されたか
- ECC が何を所有し、後で安全に削除または修復できるか

それが、ECC 1.x のインストールと ECC 2.0 のコントロールプレーンの間の欠けている契約です。

## 現在実装されている基盤

最初の selective-install 基盤は、すでにリポジトリ内に存在します：

- `manifests/install-modules.json`
- `manifests/install-profiles.json`
- `schemas/install-modules.schema.json`
- `schemas/install-profiles.schema.json`
- `schemas/install-state.schema.json`
- `scripts/ci/validate-install-manifests.js`
- `scripts/lib/install-manifests.js`
- `scripts/lib/install/request.js`
- `scripts/lib/install/runtime.js`
- `scripts/lib/install/apply.js`
- `scripts/lib/install-targets/`
- `scripts/lib/install-state.js`
- `scripts/lib/install-executor.js`
- `scripts/lib/install-lifecycle.js`
- `scripts/ecc.js`
- `scripts/install-apply.js`
- `scripts/install-plan.js`
- `scripts/list-installed.js`
- `scripts/doctor.js`

現在の機能：

- 機械可読なモジュールとプロファイルのカタログ
- マニフェストのエントリが実在するリポジトリパスを指すことの CI 検証
- 依存関係の展開とターゲットフィルタリング
- アダプター対応の操作計画
- レガシーとマニフェストのインストールモードのための正規のリクエスト正規化
- 正規化されたリクエストからプラン作成への明示的なランタイムディスパッチ
- レガシーとマニフェストのインストールが両方とも耐久性のある install-state を書き込む
- いかなる変更の前にもインストールプランを読み取り専用で検査
- インストール、計画、ライフサイクルのコマンドをルーティングする統一された `ecc` CLI
- `list-installed`、`doctor`、`repair`、`uninstall` によるライフサイクルの検査と変更

現在の制限：

- ターゲット固有の merge/remove セマンティクスは、一部のモジュールで依然としてスキャフォールドレベル
- レガシー `ecc-install` 互換性が依然として `install.sh` を指す
- publish サーフェスが `package.json` で依然として広い

## 現在のコードレビュー

現在のインストーラースタックは、元の language-first のシェルインストーラーよりもすでにはるかに健全ですが、依然として少数のファイルに責任を集中させすぎています。

### 現在のランタイムパス

今日のランタイムフローは：

1. `install.sh`
   実際のパッケージルートを解決する薄いシェルラッパー
2. `scripts/install-apply.js`
   レガシーとマニフェストのモードのためのユーザー向けインストーラー CLI
3. `scripts/lib/install/request.js`
   CLI パースと正規のリクエスト正規化
4. `scripts/lib/install/runtime.js`
   正規化されたリクエストからインストールプランへのランタイムディスパッチ
5. `scripts/lib/install-executor.js`
   引数変換、レガシー互換性、操作の materialization、
   ファイルシステムの変更、install-state 書き込み
6. `scripts/lib/install-manifests.js`
   モジュール/プロファイルのカタログロードと依存関係の展開
7. `scripts/lib/install-targets/`
   ターゲットルートと配置先パスのスキャフォールディング
8. `scripts/lib/install-state.js`
   スキーマバックアップの install-state の読み書き
9. `scripts/lib/install-lifecycle.js`
   保存された操作から導出される doctor/repair/uninstall の挙動

それは selective-install 基盤を証明するのに十分ですが、インストーラーアーキテクチャを落ち着いたと感じさせるには十分ではありません。

### 現在の強み

- インストールの意図が `--profile` と `--modules` を通じて明示的になった
- リクエストパースとリクエスト正規化が CLI シェルから分離された
- ターゲットルートの解決がすでにアダプター化されている
- ライフサイクルコマンドが推測ではなく耐久性のある install-state を使うようになった
- リポジトリにはすでに `ecc` と `install-apply.js` を通じた統一された Node エントリポイントがある

### 依然として存在する現在の結合

1. `install-executor.js` は以前より小さいが、依然として一度に多くの
   計画と materialization のレイヤーを抱えている。
   リクエスト境界は抽出されたが、レガシーリクエスト変換、
   マニフェストプランの展開、操作の materialization が依然として一緒に存在する。
2. ターゲットアダプターが依然として薄すぎる。
   今日、それらはほとんどルートを解決し配置先パスをスキャフォールドする。実際の
   インストールセマンティクスは依然として executor の分岐とパスヒューリスティックに存在する。
3. planner/executor の境界がまだ十分クリーンでない。
   `install-manifests.js` はモジュールを解決するが、最終的なインストール操作セットは
   依然として部分的に executor 固有のロジックで構築される。
4. ライフサイクルの挙動が、安定したモジュールセマンティクスよりも低レベルの記録された操作に
   依存している。
   それは単純なファイルコピーには機能するが、merge/generate/remove の挙動には脆くなる。
5. 互換性モードがメインのインストーラーランタイムに直接混ざっている。
   レガシーの言語インストールは、並列のインストーラーアーキテクチャではなく、リクエスト
   アダプターのように振る舞うべきである。

## 提案されるモジュラーアーキテクチャの変更

次のアーキテクチャステップは、インストーラーを明示的なレイヤーに分離し、各レイヤーが即座にファイルを変更するのではなく安定したデータを返すようにすることです。

### 目標状態

望ましいインストールパイプラインは：

1. CLI サーフェス
2. リクエスト正規化
3. モジュール解決
4. ターゲット計画
5. 操作計画
6. 実行
7. install-state 永続化
8. 同じ操作契約の上に構築されたライフサイクルサービス

主なアイデアはシンプルです：

- マニフェストはコンテンツを記述する
- アダプターはターゲット固有の配置セマンティクスを記述する
- プランナーは何が起こるべきかを記述する
- executor はそれらのプランを適用する
- ライフサイクルコマンドは、それを再発明するのではなく、同じ plan/state モデルを再利用する

### 提案されるランタイムレイヤー

#### 1. CLI サーフェス

責任：

- ユーザーの意図のみをパースする
- install、plan、doctor、repair、uninstall にルーティングする
- 人間または JSON の出力をレンダリングする

所有すべきでない：

- レガシー言語の変換
- ターゲット固有のインストールルール
- 操作の構築

推奨されるファイル：

```text
scripts/ecc.js
scripts/install-apply.js
scripts/install-plan.js
scripts/doctor.js
scripts/repair.js
scripts/uninstall.js
```

これらはエントリポイントのままですが、ライブラリモジュールの周りの薄いラッパーになります。

#### 2. リクエスト正規化器

責任：

- 生の CLI フラグを正規のインストールリクエストに変換する
- レガシー言語インストールを互換性リクエストの形に変換する
- 混在または曖昧な入力を早期に拒否する

推奨される正規リクエスト：

```json
{
  "mode": "manifest",
  "target": "cursor",
  "profile": "developer",
  "modules": [],
  "legacyLanguages": [],
  "dryRun": false
}
```

または、互換性モードでは：

```json
{
  "mode": "legacy-compat",
  "target": "claude",
  "profile": null,
  "modules": [],
  "legacyLanguages": ["typescript", "python"],
  "dryRun": false
}
```

これにより、パイプラインの残りは、リクエストが古い CLI 構文から来たか新しい CLI 構文から来たかを無視できます。

#### 3. モジュールリゾルバー

責任：

- マニフェストカタログをロードする
- 依存関係を展開する
- コンフリクトを拒否する
- ターゲットごとにサポートされていないモジュールをフィルタリングする
- 正規の解決オブジェクトを返す

このレイヤーは純粋で読み取り専用のままであるべきです。

以下を知るべきではありません：

- 配置先のファイルシステムパス
- merge セマンティクス
- コピー戦略

現在の最も近いファイル：

- `scripts/lib/install-manifests.js`

推奨される分割：

```text
scripts/lib/install/catalog.js
scripts/lib/install/resolve-request.js
scripts/lib/install/resolve-modules.js
```

#### 4. ターゲットプランナー

責任：

- インストールターゲットアダプターを選択する
- ターゲットルートを解決する
- install-state パスを解決する
- module-to-target のマッピングルールを展開する
- ターゲット対応の操作意図を出力する

ここが、ターゲット固有の意味が存在すべき場所です。

例：

- Claude は `~/.claude` の下でネイティブ階層を保持しうる
- Cursor はバンドルされた `.cursor` ルートの子をルールとは異なる方法で同期しうる
- 生成された設定は、ターゲットに応じて merge または replace のセマンティクスを必要としうる

現在の最も近いファイル：

- `scripts/lib/install-targets/helpers.js`
- `scripts/lib/install-targets/registry.js`

推奨される進化：

```text
scripts/lib/install/targets/registry.js
scripts/lib/install/targets/claude-home.js
scripts/lib/install/targets/cursor-project.js
scripts/lib/install/targets/antigravity-project.js
```

各アダプターは、最終的に `resolveRoot` 以上のものを公開すべきです。
そのターゲットファミリーのパスと戦略のマッピングを所有すべきです。

#### 5. 操作プランナー

責任：

- モジュール解決とアダプタールールを、型付きの操作グラフに変える
- 以下のようなファーストクラスの操作を出力する：
  - `copy-file`
  - `copy-tree`
  - `merge-json`
  - `render-template`
  - `remove`
- 所有権と検証のメタデータを添付する

これが、現在のインストーラーで欠けているアーキテクチャの継ぎ目です。

今日、操作は部分的にスキャフォールドレベルで、部分的に executor 固有です。
ECC 2.0 は、操作計画をスタンドアロンのフェーズにすべきです。そうすれば：

- `plan` が実行の真のプレビューになる
- `doctor` が現在のファイルだけでなく、意図された挙動を検証できる
- `repair` が欠けている作業を安全に正確に再構築できる
- `uninstall` が管理下の操作のみを逆転できる

#### 6. 実行エンジン

責任：

- 型付きの操作グラフを適用する
- 上書きと所有権のルールを強制する
- 書き込みを安全にステージングする
- 最終的な適用済み操作の結果を収集する

このレイヤーは *何を* するかを決定すべきではありません。
提供された操作の種類を *どのように* 安全に適用するかのみを決定すべきです。

現在の最も近いファイル：

- `scripts/lib/install-executor.js`

推奨されるリファクタリング：

```text
scripts/lib/install/executor/apply-plan.js
scripts/lib/install/executor/apply-copy.js
scripts/lib/install/executor/apply-merge-json.js
scripts/lib/install/executor/apply-remove.js
```

これは、executor ロジックを1つの大きな分岐ランタイムから、小さな操作ハンドラーのセットに変えます。

#### 7. Install-State ストア

責任：

- install-state を検証して永続化する
- 正規のリクエスト、解決、適用済み操作を記録する
- インストールをリバースエンジニアリングすることを強制せずにライフサイクルコマンドをサポートする

現在の最も近いファイル：

- `scripts/lib/install-state.js`

このレイヤーはすでに正しい形に近いです。残りの主な変更は、merge/generate セマンティクスが実在するようになったら、より豊かな操作メタデータを保存することです。

#### 8. ライフサイクルサービス

責任：

- `list-installed`：状態のみを検査する
- `doctor`：desired/install-state のビューを現在のファイルシステムと比較する
- `repair`：状態からプランを再生成し、安全な操作を再適用する
- `uninstall`：ECC 所有の出力のみを削除する

現在の最も近いファイル：

- `scripts/lib/install-lifecycle.js`

このレイヤーは、最終的に、生の `copy-file` レコードだけでなく、操作の種類と所有権ポリシーで動作すべきです。

## 提案されるファイルレイアウト

クリーンなモジュラーの最終状態は、おおよそ以下のようになるべきです：

```text
scripts/lib/install/
  catalog.js
  request.js
  resolve-modules.js
  plan-operations.js
  state-store.js
  targets/
    registry.js
    claude-home.js
    cursor-project.js
    antigravity-project.js
    codex-home.js
    opencode-home.js
  executor/
    apply-plan.js
    apply-copy.js
    apply-merge-json.js
    apply-render-template.js
    apply-remove.js
  lifecycle/
    discover.js
    doctor.js
    repair.js
    uninstall.js
```

これはパッケージングの分割ではありません。
各レイヤーが1つの仕事を持つよう、現在のリポジトリ内のコード所有権の分割です。

## 現在のファイルからの移行マップ

最も低リスクな移行パスは、書き直しではなく進化的です。

### 保持

- 公開の互換シムとしての `install.sh`
- 統一された CLI としての `scripts/ecc.js`
- 状態ストアの出発点としての `scripts/lib/install-state.js`
- 現在のターゲットアダプター ID と状態の場所

### 抽出

- `scripts/lib/install-executor.js` からのリクエストパースと互換性変換
- executor の分岐からターゲットアダプターとプランナーモジュールへの、ターゲット対応の
  操作計画
- 共有ライフサイクルモノリスからより小さなサービスへの、ライフサイクル固有の分析

### 段階的に置換

- 広範なパスコピーのヒューリスティックを型付きの操作で
- スキャフォールドのみのアダプター計画をアダプター所有のセマンティクスで
- レガシー言語インストールの分岐を、同じ planner/executor パイプラインへのレガシー
  リクエスト変換で

## 次に行う即時のアーキテクチャ変更

目標が「十分に動く」だけでなく ECC 2.0 である場合、次のモジュール化のステップは：

1. `install-executor.js` をリクエスト正規化、操作計画、
   実行のモジュールに分割する
2. ターゲット固有の戦略決定をアダプター所有の計画メソッドに移す
3. `repair` と `uninstall` が、単純な `copy-file` レコードだけでなく、
   型付きの操作ハンドラーで動作するようにする
4. プランナーがパスヒューリスティックに依存しなくなるよう、マニフェストにインストール
   戦略と所有権を教える
5. 内部モジュールの境界が安定した後にのみ、npm publish サーフェスを狭める

## なぜ現在のモデルが不十分なのか

今日、ECC は依然として広範なペイロードコピー機のように振る舞います：

- `install.sh` は language-first で target-branch が多い
- ターゲットが部分的にディレクトリレイアウトに暗黙的である
- uninstall、repair、doctor は現在存在するが、依然として初期のライフサイクルコマンドである
- リポジトリは、以前のインストールが実際に何を書いたかを証明できない
- publish サーフェスが `package.json` で依然として広い

それは、メガプランですでに指摘された問題を生み出します：

- ユーザーがハーネスやワークフローが必要とするより多くのコンテンツを取り込む
- インストールが記録されないため、サポートとアップグレードが難しい
- インストールロジックがシェルの分岐で重複しているため、ターゲットの挙動がドリフトする
- Codex や OpenCode のような将来のターゲットが、安定したインストール契約を再利用するのではなく、
  より多くの特殊ケースのロジックを必要とする

## ECC 2.0 設計テーゼ

selective install は、以下のようにモデル化すべきです：

1. 要求された意図を正規のモジュールグラフに解決する
2. そのグラフをターゲットアダプターを通じて変換する
3. 決定論的なインストール操作セットを実行する
4. install-state を耐久性のある真実のソースとして書き込む

つまり、ECC 2.0 は1つではなく2つの契約を必要とします：

- コンテンツ契約
  どのモジュールが存在し、それらがどのように互いに依存するか
- ターゲット契約
  それらのモジュールが Claude、Cursor、Antigravity、Codex、OpenCode の内部にどのように配置されるか

現在のリポジトリは、最初の半分を初期の形でしか持っていませんでした。
現在のリポジトリは、最初の完全な垂直スライスを持っていますが、完全な
ターゲット固有のセマンティクスは持っていません。

## 設計上の制約

1. `everything-claude-code` を正規のソースリポジトリとして保つ。
2. 移行中、既存の `install.sh` フローを保持する。
3. 同じプランナーから home スコープと project スコープのターゲットをサポートする。
4. 推測なしに uninstall/repair/doctor を可能にする。
5. ターゲットごとのコピーロジックがモジュール定義に漏れ戻るのを避ける。
6. 将来の Codex と OpenCode のサポートを、書き直しではなく追加的に保つ。

## 正規アーティファクト

### 1. モジュールカタログ

モジュールカタログは、正規のコンテンツグラフです。

すでに実装されている現在のフィールド：

- `id`
- `kind`
- `description`
- `paths`
- `targets`
- `dependencies`
- `defaultInstall`
- `cost`
- `stability`

ECC 2.0 のためにまだ必要なフィールド：

- `installStrategy`
  例えば `copy`、`flatten-rules`、`generate`、`merge-config`
- `ownership`
  ECC がターゲットパスを完全に所有するか、その下の生成されたファイルのみを所有するか
- `pathMode`
  例えば `preserve`、`flatten`、`target-template`
- `conflicts`
  1つのターゲットで共存できないモジュールまたはパスファミリー
- `publish`
  モジュールがデフォルトでパッケージ化されるか、オプションか、インストール後に生成されるか

推奨される将来の形：

```json
{
  "id": "hooks-runtime",
  "kind": "hooks",
  "paths": ["hooks", "scripts/hooks"],
  "targets": ["claude", "cursor", "opencode"],
  "dependencies": [],
  "installStrategy": "copy",
  "pathMode": "preserve",
  "ownership": "managed",
  "defaultInstall": true,
  "cost": "medium",
  "stability": "stable"
}
```

### 2. プロファイルカタログ

プロファイルは薄いままです。

ターゲットロジックを重複させるのではなく、ユーザーの意図を表現すべきです。

すでに実装されている現在の例：

- `core`
- `developer`
- `security`
- `research`
- `full`

まだ必要なフィールド：

- `defaultTargets`
- `recommendedFor`
- `excludes`
- `requiresConfirmation`

これにより、ECC 2.0 は以下のようなことを言えます：

- `developer` は Claude と Cursor に推奨されるデフォルト
- `research` は狭いローカルインストールには重いかもしれない
- `full` は許可されるがデフォルトではない

### 3. ターゲットアダプター

これが、主な欠けているレイヤーです。

モジュールグラフは以下を知るべきではありません：

- Claude home がどこにあるか
- Cursor がどのようにコンテンツを平坦化または再マッピングするか
- どの設定ファイルが盲目的なコピーではなく merge セマンティクスを必要とするか

それはターゲットアダプターに属します。

推奨されるインターフェース：

```ts
type InstallTargetAdapter = {
  id: string;
  kind: "home" | "project";
  supports(target: string): boolean;
  resolveRoot(input?: string): Promise<string>;
  planOperations(input: InstallOperationInput): Promise<InstallOperation[]>;
  validate?(input: InstallOperationInput): Promise<ValidationIssue[]>;
};
```

推奨される最初のアダプター：

1. `claude-home`
   `~/.claude/...` に書き込む
2. `cursor-project`
   `./.cursor/...` に書き込む
3. `antigravity-project`
   `./.agent/...` に書き込む
4. `codex-home`
   後で
5. `opencode-home`
   後で

これは、セッションアダプター探索ドキュメントですでに提案されたのと同じパターンに一致します：まず正規の契約、次にハーネス固有のアダプター。

## インストール計画モデル

現在の `scripts/install-plan.js` CLI は、リポジトリが要求されたモジュールをフィルタリングされたモジュールセットに解決できることを証明します。

ECC 2.0 は、次のレイヤーを必要とします：操作計画。

推奨されるフェーズ：

1. 入力正規化
   - `--target` をパースする
   - `--profile` をパースする
   - `--modules` をパースする
   - オプションでレガシー言語の引数を変換する
2. モジュール解決
   - 依存関係を展開する
   - コンフリクトを拒否する
   - サポートされるターゲットでフィルタリングする
3. アダプター計画
   - ターゲットルートを解決する
   - 正確なコピーまたは生成の操作を導出する
   - 設定の merge とターゲットの再マッピングを特定する
4. dry-run 出力
   - 選択されたモジュールを表示する
   - スキップされたモジュールを表示する
   - 正確なファイル操作を表示する
5. 変更
   - 操作プランを実行する
6. 状態書き込み
   - 正常な完了後にのみ install-state を永続化する

推奨される操作の形：

```json
{
  "kind": "copy",
  "moduleId": "rules-core",
  "source": "rules/common/coding-style.md",
  "destination": "/Users/example/.claude/rules/ecc/common/coding-style.md",
  "ownership": "managed",
  "overwritePolicy": "replace"
}
```

その他の操作の種類：

- `copy`
- `copy-tree`
- `flatten-copy`
- `render-template`
- `merge-json`
- `merge-jsonc`
- `mkdir`
- `remove`

## Install-State 契約

install-state は、ECC 1.x に欠けている耐久性のある契約です。

推奨されるパス規約：

- Claude ターゲット：
  `~/.claude/ecc/install-state.json`
- Cursor ターゲット：
  `./.cursor/ecc-install-state.json`
- Antigravity ターゲット：
  `./.agent/ecc-install-state.json`
- 将来の Codex ターゲット：
  `~/.codex/ecc-install-state.json`

推奨されるペイロード：

```json
{
  "schemaVersion": "ecc.install.v1",
  "installedAt": "2026-03-13T00:00:00Z",
  "lastValidatedAt": "2026-03-13T00:00:00Z",
  "target": {
    "id": "claude-home",
    "root": "/Users/example/.claude"
  },
  "request": {
    "profile": "developer",
    "modules": ["orchestration"],
    "legacyLanguages": ["typescript", "python"]
  },
  "resolution": {
    "selectedModules": [
      "rules-core",
      "agents-core",
      "commands-core",
      "hooks-runtime",
      "platform-configs",
      "workflow-quality",
      "framework-language",
      "database",
      "orchestration"
    ],
    "skippedModules": []
  },
  "source": {
    "repoVersion": "2.0.0-rc.1",
    "repoCommit": "git-sha",
    "manifestVersion": 1
  },
  "operations": [
    {
      "kind": "copy",
      "moduleId": "rules-core",
      "destination": "/Users/example/.claude/rules/ecc/common/coding-style.md",
      "digest": "sha256:..."
    }
  ]
}
```

状態の要件：

- uninstall が ECC 管理下の出力のみを削除するのに十分な詳細
- repair が desired と実際にインストールされたファイルを比較するのに十分な詳細
- doctor が推測ではなくドリフトを説明するのに十分な詳細

## ライフサイクルコマンド

以下のコマンドは、install-state のライフサイクルサーフェスです：

1. `ecc list-installed`
2. `ecc uninstall`
3. `ecc doctor`
4. `ecc repair`

現在の実装ステータス：

- `ecc list-installed` は `node scripts/list-installed.js` にルーティングする
- `ecc uninstall` は `node scripts/uninstall.js` にルーティングする
- `ecc doctor` は `node scripts/doctor.js` にルーティングする
- `ecc repair` は `node scripts/repair.js` にルーティングする
- レガシースクリプトのエントリポイントは移行中も引き続き利用可能

### `list-installed`

責任：

- ターゲット id とルートを表示する
- 要求されたプロファイル/モジュールを表示する
- 解決されたモジュールを表示する
- ソースバージョンとインストール時刻を表示する

### `uninstall`

責任：

- install-state をロードする
- 状態に記録された ECC 管理下の配置先のみを削除する
- ユーザーが作成した無関係なファイルには触れない
- 正常なクリーンアップの後にのみ install-state を削除する

### `doctor`

責任：

- 欠けている管理下ファイルを検出する
- 予期しない設定のドリフトを検出する
- もはや存在しないターゲットルートを検出する
- マニフェスト/バージョンの不一致を検出する

### `repair`

責任：

- install-state から desired な操作プランを再構築する
- 欠けているまたはドリフトした管理下ファイルを再コピーする
- 互換性マップが存在しない限り、要求されたモジュールが現在のマニフェストに
  もはや存在しない場合は repair を拒否する

## レガシー互換性レイヤー

現在の `install.sh` は以下を受け入れます：

- `--target <claude|cursor|antigravity>`
- 言語名のリスト

ユーザーがすでにそれに依存しているため、その挙動を一度に消すことはできません。

ECC 2.0 は、レガシー言語の引数を互換性リクエストに変換すべきです。

推奨されるアプローチ：

1. レガシーモードのために既存の CLI の形を保つ
2. 言語名を以下のようなモジュールリクエストにマップする：
   - `rules-core`
   - target 互換のルールサブセット
3. レガシーインストールでも install-state を書き込む
4. リクエストを `legacyMode: true` としてラベル付けする

例：

```json
{
  "request": {
    "legacyMode": true,
    "legacyLanguages": ["typescript", "python"]
  }
}
```

これにより、すべてのインストールを同じ状態契約に移しつつ、古い挙動を利用可能に保ちます。

## Publish 境界

現在の npm パッケージは、依然として `package.json` を通じて広範なペイロードを publish します。

ECC 2.0 は、これを慎重に改善すべきです。

推奨されるシーケンス：

1. まず1つの正規の npm パッケージを保つ
2. publish の形を変える前に、インストール時の選択を駆動するためにマニフェストを使う
3. 安全な場合にのみ、後でパッケージ化されるサーフェスの削減を検討する

理由：

- selective install は、積極的なパッケージ手術の前に出荷できる
- uninstall と repair は、publish の変更よりも install-state に依存する
- パッケージソースが統一されたままであれば、Codex/OpenCode のサポートが容易

考えられる後の方向性：

- プロファイルごとの生成されたスリムバンドル
- 生成されたターゲット固有の tarball
- 重いモジュールのオプションのリモートフェッチ

それらはフェーズ3以降であり、profile 対応のインストールの前提条件ではありません。

## ファイルレイアウトの推奨

推奨される次のファイル：

```text
scripts/lib/install-targets/
  claude-home.js
  cursor-project.js
  antigravity-project.js
  registry.js
scripts/lib/install-state.js
scripts/ecc.js
scripts/install-apply.js
scripts/list-installed.js
scripts/uninstall.js
scripts/doctor.js
scripts/repair.js
tests/lib/install-targets.test.js
tests/lib/install-state.test.js
tests/lib/install-lifecycle.test.js
```

`install.sh` は移行中もユーザー向けのエントリポイントのままでいられますが、ターゲットごとのシェル分岐を増やし続けるのではなく、Node ベースのプランナーと executor の周りの薄いシェルになるべきです。

## 実装シーケンス

### フェーズ1：プランナーから契約へ

1. 現在のマニフェストスキーマとリゾルバーを保つ
2. 解決されたモジュールの上に操作計画を追加する
3. `ecc.install.v1` 状態スキーマを定義する
4. インストール成功時に install-state を書き込む

### フェーズ2：ターゲットアダプター

1. Claude のインストール挙動を `claude-home` アダプターに抽出する
2. Cursor のインストール挙動を `cursor-project` アダプターに抽出する
3. Antigravity のインストール挙動を `antigravity-project` アダプターに抽出する
4. `install.sh` を引数パースとアダプター呼び出しに縮小する

### フェーズ3：ライフサイクル

1. より強力なターゲット固有の merge/remove セマンティクスを追加する
2. 非コピー操作のための repair/uninstall のカバレッジを拡張する
3. パッケージ出荷サーフェスを、広範なフォルダではなくモジュールグラフに縮小する
4. `ecc-install` が `ecc install` の薄いエイリアスになるべきタイミングを決定する

### フェーズ4：Publish と将来のターゲット

1. `package.json` の publish サーフェスの安全な削減を評価する
2. `codex-home` を追加する
3. `opencode-home` を追加する
4. パッケージングの圧力が高いままであれば、生成されたプロファイルバンドルを検討する

## 即時のリポジトリローカルの次のステップ

このリポジトリで最もシグナルの高い次の実装の動きは：

1. config ライクなモジュールのためのターゲット固有の merge/remove セマンティクスを追加する
2. repair と uninstall を単純な copy-file 操作を超えて拡張する
3. パッケージ出荷サーフェスを、広範なフォルダではなくモジュールグラフに縮小する
4. `ecc-install` が別個のままか `ecc install` になるかを決定する
5. 以下をロックダウンするテストを追加する：
   - ターゲット固有の merge/remove の挙動
   - 非コピー操作のための repair と uninstall の安全性
   - 統一された `ecc` CLI のルーティングと互換性の保証

## 未解決の質問

1. ルールはレガシーモードで永遠に言語アドレス可能であるべきか、それとも移行期間の
   間だけか？
2. `platform-configs` は常に `core` とともにインストールされるべきか、それともより
   小さなターゲット固有のモジュールに分割されるべきか？
3. 設定の merge セマンティクスを操作レベルで記録したいか、それともアダプターロジックのみか？
4. 重いスキルファミリーは、最終的にパッケージ時の包含ではなく fetch-on-demand に
   移行すべきか？
5. Codex と OpenCode のターゲットアダプターは、Claude/Cursor の
   ライフサイクルコマンドが安定した後にのみ出荷すべきか？

## 推奨

現在のマニフェストリゾルバーを、インストールのアダプター `0` として扱います：

1. 現在のインストールサーフェスを保持する
2. 実際のコピー挙動をターゲットアダプターの背後に移す
3. すべての正常なインストールに install-state を書き込む
4. uninstall、doctor、repair を install-state のみに依存させる
5. その後にのみ、パッケージングを縮小するか、より多くのターゲットを追加する

それが、ECC 1.x のインストーラーの散乱から、決定論的で、サポート可能で、拡張可能な ECC 2.0 の install/control 契約への最短パスです。
