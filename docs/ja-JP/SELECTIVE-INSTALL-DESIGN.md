# ECC Selective Install 設計

## 目的

このドキュメントは、ECC のユーザー向け selective-install 設計を定義します。

内部ランタイムアーキテクチャとコード境界に焦点を当てる
`docs/SELECTIVE-INSTALL-ARCHITECTURE.md` を補完します。

このドキュメントは、まずプロダクトとオペレーターの質問に答えます：

- ユーザーがどのように ECC コンポーネントを選ぶか
- CLI がどのように感じられるべきか
- どの設定ファイルが存在すべきか
- ハーネスターゲットをまたいでインストールがどのように振る舞うべきか
- 書き直しを要求せずに、設計が現在の ECC コードベースにどのようにマップされるか

## 問題

今日、リポジトリに初回パスのマニフェストとライフサイクルのサポートがあるにもかかわらず、ECC は依然として大きなペイロードのインストーラーのように感じられます。

ユーザーはよりシンプルなメンタルモデルを必要としています：

- ベースラインをインストールする
- 実際に使用する言語パックを追加する
- 実際に欲しいフレームワーク設定を追加する
- security、research、orchestration のようなオプションのケイパビリティパックを追加する

selective-install システムは、ECC を all-or-nothing ではなく合成可能に感じさせるべきです。

現在の基盤では、ユーザー向けコンポーネントは依然として、より粗い内部インストールモジュールの上のエイリアスレイヤーです。つまり、include/exclude はモジュール選択レベルですでに有用ですが、根底にあるモジュールグラフがより細かく分割されるまで、一部のファイルレベルの境界は不完全なままです。

## 目標

1. ユーザーが小さなデフォルトの ECC フットプリントを素早くインストールできるようにする。
2. ユーザーが再利用可能なコンポーネントファミリーからインストールを合成できるようにする：
   - コアルール
   - 言語パック
   - フレームワークパック
   - ケイパビリティパック
   - target/platform の設定
3. Claude、Cursor、Antigravity、Codex、OpenCode をまたいで1つの一貫した UX を保つ。
4. インストールを検査可能、修復可能、アンインストール可能に保つ。
5. ロールアウト中、現在の `ecc-install typescript` スタイルとの後方互換性を保つ。

## 非目標

- 第一フェーズで ECC を複数の npm パッケージにパッケージングすること
- リモート marketplace の構築
- 同じフェーズでの完全なコントロールプレーン UI
- selective install が出荷される前にすべてのスキル分類問題を解決すること

## ユーザー体験の原則

### 1. 小さく始める

ユーザーは、1つのコマンドで有用な ECC インストールを得られるべきです：

```bash
ecc install --target claude --profile core
```

デフォルトの体験は、ユーザーがすべてのスキルファミリーとすべてのフレームワークを望んでいると仮定すべきではありません。

### 2. 意図で積み上げる

ユーザーは以下の観点で考えるべきです：

- 「開発者ベースラインが欲しい」
- 「TypeScript と Python が必要」
- 「Next.js と Django が欲しい」
- 「security パックが欲しい」

ユーザーは生の内部リポジトリパスを知る必要はないはずです。

### 3. 変更の前にプレビュー

すべてのインストールパスは dry-run 計画をサポートすべきです：

```bash
ecc install --target cursor --profile developer --with lang:typescript --with framework:nextjs --dry-run
```

プランは以下を明確に示すべきです：

- 選択されたコンポーネント
- スキップされたコンポーネント
- ターゲットルート
- 管理下のパス
- 予想される install-state の場所

### 4. ローカル設定はファーストクラスであるべき

チームはプロジェクトレベルのインストール設定をコミットし、以下を使用できるべきです：

```bash
ecc install --config ecc-install.json
```

これにより、コントリビューターと CI をまたいで決定論的なインストールが可能になります。

## コンポーネントモデル

現在のマニフェストはすでにインストールモジュールとプロファイルを使用しています。ユーザー向け設計は、その内部構造を保ちつつ、4つの主要なコンポーネントファミリーとして提示すべきです。

近い将来の実装ノート：一部のユーザー向けコンポーネント ID は、特に言語/フレームワークレイヤーで、依然として共有の内部モジュールに解決されます。カタログは、後のフェーズでより細かいモジュールの粒度に向かうクリーンなパスを保ちつつ、UX を即座に改善します。

### 1. ベースライン

これらはデフォルトの ECC ビルディングブロックです：

- コアルール
- ベースラインエージェント
- コアコマンド
- ランタイムフック
- プラットフォーム設定
- ワークフロー品質のプリミティブ

現在の内部モジュールの例：

- `rules-core`
- `agents-core`
- `commands-core`
- `hooks-runtime`
- `platform-configs`
- `workflow-quality`

### 2. 言語パック

言語パックは、言語エコシステムのためのルール、ガイダンス、ワークフローをグループ化します。

例：

- `lang:typescript`
- `lang:python`
- `lang:go`
- `lang:java`
- `lang:rust`

各言語パックは、1つ以上の内部モジュールとターゲット固有の資産に解決すべきです。

### 3. フレームワークパック

フレームワークパックは言語パックの上に位置し、フレームワーク固有のルール、スキル、オプションのセットアップを取り込みます。

例：

- `framework:react`
- `framework:nextjs`
- `framework:django`
- `framework:springboot`
- `framework:laravel`

フレームワークパックは、適切な場合、正しい言語パックまたはベースラインプリミティブに依存すべきです。

### 4. ケイパビリティパック

ケイパビリティパックは、横断的な ECC 機能バンドルです。

例：

- `capability:security`
- `capability:research`
- `capability:orchestration`
- `capability:media`
- `capability:content`

これらは、マニフェストですでに導入されている現在のモジュールファミリーにマップすべきです。

## プロファイル

プロファイルは依然として最速のオンランプです。

推奨されるユーザー向けプロファイル：

- `core`
  最小限のベースライン、ECC を試すほとんどのユーザーにとって安全なデフォルト
- `developer`
  アクティブなソフトウェアエンジニアリング作業に最適なデフォルト
- `security`
  ベースラインとセキュリティ重視のガイダンス
- `research`
  ベースラインと research/content/investigation のツール
- `full`
  分類され現在サポートされているすべて

プロファイルは、追加の `--with` と `--without` フラグで合成可能であるべきです。

例：

```bash
ecc install --target claude --profile developer --with lang:typescript --with framework:nextjs --without capability:orchestration
```

## 提案される CLI 設計

### 主要コマンド

```bash
ecc install
ecc plan
ecc list-installed
ecc doctor
ecc repair
ecc uninstall
ecc catalog
```

### Install CLI

推奨される形：

```bash
ecc install [--target <target>] [--profile <name>] [--with <component>]... [--without <component>]... [--config <path>] [--dry-run] [--json]
```

例：

```bash
ecc install --target claude --profile core
ecc install --target cursor --profile developer --with lang:typescript --with framework:nextjs
ecc install --target antigravity --with capability:security --with lang:python
ecc install --config ecc-install.json
```

### Plan CLI

推奨される形：

```bash
ecc plan [install と同じ選択フラグ]
```

目的：

- 変更なしでプレビューを生成する
- selective install の正規のデバッグサーフェスとして機能する

### Catalog CLI

推奨される形：

```bash
ecc catalog profiles
ecc catalog components
ecc catalog components --family language
ecc catalog show framework:nextjs
```

目的：

- ユーザーがドキュメントを読まずに有効なコンポーネント名を発見できるようにする
- 設定の作成を親しみやすく保つ

### 互換性 CLI

これらのレガシーフローは、移行中も引き続き機能すべきです：

```bash
ecc-install typescript
ecc-install --target cursor typescript
ecc typescript
```

内部的には、これらは新しいリクエストモデルに正規化され、モダンなインストールと同じ方法で install-state を書き込むべきです。

## 提案される設定ファイル

### ファイル名

推奨されるデフォルト：

- `ecc-install.json`

オプションの将来のサポート：

- `.ecc/install.json`

### 設定の形

```json
{
  "$schema": "./schemas/ecc-install-config.schema.json",
  "version": 1,
  "target": "cursor",
  "profile": "developer",
  "include": [
    "lang:typescript",
    "lang:python",
    "framework:nextjs",
    "capability:security"
  ],
  "exclude": [
    "capability:media"
  ],
  "options": {
    "hooksProfile": "standard",
    "mcpCatalog": "baseline",
    "includeExamples": false
  }
}
```

### フィールドのセマンティクス

- `target`
  `claude`、`cursor`、`antigravity` のような選択されたハーネスターゲット
- `profile`
  開始するベースラインプロファイル
- `include`
  追加するコンポーネント
- `exclude`
  プロファイル結果から差し引くコンポーネント
- `options`
  コンポーネントのアイデンティティを変えない target/runtime のチューニングフラグ

### 優先順位ルール

1. CLI 引数は設定ファイルの値を上書きする。
2. 設定ファイルはプロファイルのデフォルトを上書きする。
3. プロファイルのデフォルトは内部モジュールのデフォルトを上書きする。

これにより、挙動が予測可能で説明しやすくなります。

## モジュラーインストールフロー

ユーザー向けフローは以下であるべきです：

1. 提供されたか自動検出された設定ファイルをロードする
2. CLI の意図を設定の意図の上にマージする
3. リクエストを正規の選択に正規化する
4. プロファイルをベースラインコンポーネントに展開する
5. `include` コンポーネントを追加する
6. `exclude` コンポーネントを差し引く
7. 依存関係とターゲット互換性を解決する
8. プランをレンダリングする
9. dry-run モードでない場合は操作を適用する
10. install-state を書き込む

重要な UX の特性は、まったく同じフローが以下を駆動することです：

- `install`
- `plan`
- `repair`
- `uninstall`

コマンドは、ECC が選択されたインストールをどう理解するかではなく、アクションで異なります。

## ターゲットの挙動

selective install は、ターゲットアダプターがコンテンツの配置方法を決定できるようにしつつ、すべてのターゲットで同じ概念上のコンポーネントグラフを保持すべきです。

### Claude

最適な用途：

- home スコープの ECC ベースライン
- コマンド、エージェント、ルール、フック、プラットフォーム設定、オーケストレーション

### Cursor

最適な用途：

- プロジェクトスコープのインストール
- ルールとプロジェクトローカルの自動化・設定

### Antigravity

最適な用途：

- プロジェクトスコープの agent/rule/workflow のインストール

### Codex / OpenCode

インストーラーの特殊なフォークではなく、追加的なターゲットのままであるべきです。

selective-install 設計は、これらを新しいインストーラーアーキテクチャではなく、単に新しいアダプターと新しいターゲット固有のマッピングルールにすべきです。

## 技術的な実現可能性

この設計が実現可能なのは、リポジトリにすでに以下があるためです：

- インストールモジュールとプロファイルのマニフェスト
- install-state パスを持つターゲットアダプター
- プラン検査
- install-state 記録
- ライフサイクルコマンド
- 統一された `ecc` CLI サーフェス

欠けている作業は概念的な発明ではありません。欠けている作業は、現在の基盤をよりクリーンなユーザー向けコンポーネントモデルにプロダクト化することです。

### フェーズ1で実現可能

- profile + include/exclude の選択
- `ecc-install.json` 設定ファイルのパース
- catalog/discovery コマンド
- ユーザー向けコンポーネント ID から内部モジュールセットへのエイリアスマッピング
- dry-run と JSON の計画

### フェーズ2で実現可能

- より豊かなターゲットアダプターのセマンティクス
- config ライクな資産のための merge 対応の操作
- 非コピー操作のためのより強力な repair/uninstall の挙動

### 後で

- 削減された publish サーフェス
- 生成されたスリムバンドル
- リモートコンポーネントのフェッチ

## 現在の ECC マニフェストへのマッピング

現在のマニフェストは、まだ真のユーザー向け `lang:*` /
`framework:*` / `capability:*` の分類を公開していません。それは、第二のインストーラーエンジンとしてではなく、既存のモジュールの上のプレゼンテーションレイヤーとして導入すべきです。

推奨されるアプローチ：

- `install-modules.json` を内部の解決カタログとして保つ
- フレンドリーなコンポーネント ID を1つ以上の内部モジュールにマップする、ユーザー向けの
  コンポーネントカタログを追加する
- 移行期間中、プロファイルが内部モジュールまたはユーザー向けコンポーネント ID の
  いずれかを参照できるようにする

これにより、UX を改善しつつ、現在の selective-install 基盤を壊すことを避けられます。

## 提案されるロールアウト

### フェーズ1：設計と探索

- ユーザー向けコンポーネントの分類を確定する
- 設定スキーマを追加する
- CLI 設計と優先順位ルールを追加する

### フェーズ2：ユーザー向け解決レイヤー

- コンポーネントエイリアスを実装する
- 設定ファイルのパースを実装する
- `include` / `exclude` を実装する
- `catalog` を実装する

### フェーズ3：より強力なターゲットセマンティクス

- より多くのロジックをターゲット所有の計画に移す
- merge/generate 操作をクリーンにサポートする
- repair/uninstall の忠実度を向上させる

### フェーズ4：パッケージング最適化

- 公開されるサーフェスを狭める
- 生成されたバンドルを評価する

## 推奨

次の実装の動きは「インストーラーを書き直す」ことであるべきではありません。

それは以下であるべきです：

1. 現在のマニフェスト/ランタイム基盤を保つ
2. ユーザー向けコンポーネントカタログと設定ファイルを追加する
3. `include` / `exclude` の選択とカタログ発見を追加する
4. 既存のプランナーとライフサイクルスタックがそのモデルを消費できるようにする

それが、現在の ECC コードベースから、大きなレガシーインストーラーではなく ECC 2.0 のように感じられる真の selective install 体験への最短パスです。
