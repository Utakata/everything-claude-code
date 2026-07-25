# Hermes x ECC セットアップ

Hermes はオペレーターシェルです。ECC はその背後にある再利用可能なシステムです。

このガイドは、コンテンツ、アウトリーチ、リサーチ、セールスオペレーション、財務チェック、エンジニアリングワークフローを1つのターミナルネイティブなサーフェスから実行するために使用される Hermes スタックの、公開・サニタイズ済み版です。

## 公開されるもの

- このリポジトリの ECC スキル、エージェント、コマンド、フック、MCP 設定
- 再利用に十分安定した Hermes 生成のワークフロースキル
- チャット、cron、ワークスペースメモリ、配信フローのための文書化されたオペレータートポロジー
- スタックを公開で共有するためのローンチ素材

このガイドには、プライベートなシークレット、ライブトークン、個人データ、生の `~/.hermes` エクスポートは含まれません。

## アーキテクチャ

Hermes をフロントドアとして、ECC を再利用可能なワークフロー基盤として使用します。

```text
Telegram / CLI / TUI
        ↓
      Hermes
        ↓
 ECC skills + hooks + MCPs + generated workflow packs
        ↓
 Google Drive / GitHub / browser automation / research APIs / media tools / finance tools
```

## 公開ワークスペースマップ

プライベートな状態を漏らさずにセットアップを再現するための最小限のサーフェスとして、これを使用します。

- `~/.hermes/config.yaml`
  - モデルルーティング
  - MCP サーバー登録
  - プラグインローディング
- `~/.hermes/skills/ecc-imports/`
  - Hermes ネイティブでの使用のためにコピーされた ECC スキル
- `skills/hermes-generated/`
  - 繰り返される Hermes セッションから蒸留されたオペレーターパターン
- `~/.hermes/plugins/`
  - フック、リマインダー、ワークフロー固有のツールグルーのためのブリッジプラグイン
- `~/.hermes/cron/jobs.json`
  - 明示的なプロンプトとチャネルを持つスケジュールされた自動化の実行
- `~/.hermes/workspace/`
  - ビジネス、オペレーション、健康、コンテンツ、メモリのアーティファクト

## 推奨ケイパビリティスタック

### コア

- チャット、cron、オーケストレーション、ワークスペース状態のための Hermes
- スキル、ルール、プロンプト、クロスハーネス規約のための ECC
- ベースラインの MCP レイヤーとしての GitHub + Context7 + Exa + Firecrawl + Playwright

### コンテンツ

- ローカルの編集と組み立てのための FFmpeg
- プログラマブルなクリップのための Remotion
- 画像/動画生成のための fal.ai
- 音声、クリーンアップ、オーディオパッケージングのための ElevenLabs
- 最終的なソーシャルネイティブの仕上げのための CapCut または VectCutAPI

### ビジネスオペレーション

- ドキュメント、シート、デッキ、リサーチダンプの system of record としての Google Drive
- 収益と支払いオペレーションのための Stripe
- エンジニアリングの実行のための GitHub
- 緊急のナッジと承認のための Telegram および iMessage スタイルのチャネル

## まだローカル認証が必要なもの

これらはローカルに留まり、オペレーターごとに設定すべきです：

- Drive / Docs / Sheets / Slides のための Google OAuth トークン
- X / LinkedIn / アウトバウンド配信の認証情報
- Stripe キー
- ブラウザ自動化の認証情報と stealth/プロキシ設定
- Linear や Apollo などの CRM またはプロジェクトシステムの認証情報
- 健康自動化が有効な場合の Apple Health エクスポートまたは取り込みパス

## 推奨される立ち上げ順序

0. まず `ecc migrate audit --source ~/.hermes` を実行して、レガシーワークスペースをインベントリ化し、どの部分がすでに ECC2 にマップされているかを確認する。
0.5. 何かをインポートする前に、移行アーティファクトを計画・スキャフォールドする：
   - `ecc migrate plan` と `ecc migrate scaffold` でレビュー可能なプランを生成する
   - `ecc migrate import-skills --output-dir migration-artifacts/skills` で再利用可能なレガシースキルをスキャフォールドする
   - `ecc migrate import-tools --output-dir migration-artifacts/tools` でツール変換テンプレートをスキャフォールドする
   - `ecc migrate import-plugins --output-dir migration-artifacts/plugins` でブリッジプラグインテンプレートをスキャフォールドする
   - `ecc migrate import-schedules --dry-run` で定期ジョブをプレビューする
   - `ecc migrate import-remote --dry-run` でゲートウェイディスパッチをプレビューする
   - `ecc migrate import-env --dry-run` で安全な env/service コンテキストをプレビューする
   - `ecc migrate import-memory` でサニタイズ済みのワークスペースメモリをインポートする
1. ECC をインストールし、`node tests/run-all.js` でベースラインのハーネスセットアップを検証する；期待される結果は失敗ゼロのテストサマリーである。
2. Hermes をインストールし、ECC からインポートしたスキルを指すようにする。
3. 実際に毎日使用する MCP サーバーを登録する。
4. まず Google Drive を、次に GitHub を、その後配信チャネルを認証する。
5. 小さな cron サーフェスから始める：準備チェック、コンテンツのアカウンタビリティ、受信トレイのトリアージ、収益モニター。
6. その後にのみ、健康、関係グラフ化、アウトバウンドシーケンシングのような、より重い個人ワークフローを追加する。

## 関連ドキュメント

- [Hermes/OpenClaw 移行ガイド](HERMES-OPENCLAW-MIGRATION.md)
- [クロスハーネスアーキテクチャ](architecture/cross-harness.md)

## なぜ Hermes x ECC なのか

このスタックは、以下を望むときに有用です：

- ビジネスとエンジニアリングのオペレーションを実行する、1つのターミナルネイティブな場所
- 使い捨てのプロンプトではなく、再利用可能なスキル
- ナッジ、監査、エスカレーションができる自動化
- プライベートなオペレーターの状態を露出させずにシステムの形を示す公開リポジトリ

## 公開リリース候補のスコープ

ECC v2.0.0-rc.1 は Hermes サーフェスを文書化し、ローンチ素材を今出荷します。

残りのプライベートな部分は後でレイヤー化できます：

- 追加のサニタイズ済みテンプレート
- より豊かな公開例
- より多くの生成されたワークフローパック
- より緊密な CRM と Google Workspace の統合
