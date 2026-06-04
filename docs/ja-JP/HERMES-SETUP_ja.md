# Hermes x ECC セットアップ

Hermes はオペレーターシェルである。ECC はその背後にある再利用可能なシステムである。

このガイドは、コンテンツ、アウトリーチ、リサーチ、セールスオペレーション、財務チェック、エンジニアリングワークフローを一つのターミナルネイティブなインターフェースから実行するために使用される Hermes スタックの、サニタイズされた公開バージョンである。

## 公開される内容

- このリポジトリから提供される ECC のスキル、エージェント、コマンド、フック、および MCP 設定
- 再利用可能な程度に安定した、Hermes によって生成されたワークフロースキル
- チャット、cron、ワークスペースメモリ、およびディストリビューションフローのための、文書化されたオペレータートポロジー
- スタックをパブリックに共有するためのローンチ用資料

このガイドには、プライベートシークレット、本番用トークン、個人データ、または生の `~/.hermes` のエクスポートは含まれない。

## アーキテクチャ

Hermes をフロントドアとして使用し、ECC を再利用可能なワークフロー基盤として使用する。

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

プライベートな状態を漏らすことなくセットアップを再現するための、最小限のサーフェスとしてこれを使用する。

- `~/.hermes/config.yaml`
  - モデルルーティング
  - MCP サーバー登録
  - プラグインのロード
- `~/.hermes/skills/ecc-imports/`
  - Hermes ネイティブでの使用のためにコピーされた ECC スキル
- `skills/hermes-generated/`
  - 繰り返される Hermes セッションから抽出されたオペレーターパターン
- `~/.hermes/plugins/`
  - フック、リマインダー、およびワークフロー固有のツールグルーのためのブリッジプラグイン
- `~/.hermes/cron/jobs.json`
  - 明示的なプロンプトとチャネルを備えた、スケジュールされた自動化の実行
- `~/.hermes/workspace/`
  - ビジネス、オペレーション、ヘルス、コンテンツ、およびメモリアーティファクト

## 推奨機能スタック

### コア

- チャット、cron、オーケストレーション、およびワークスペース状態のための Hermes
- スキル、ルール、プロンプト、およびクロスハーネスの規約のための ECC
- ベースラインの MCP レイヤーとしての GitHub + Context7 + Exa + Firecrawl + Playwright

### コンテンツ

- ローカル編集とアセンブリのための FFmpeg
- プログラマブルなクリップのための Remotion
- 画像/動画生成のための fal.ai
- 音声、クリーンアップ、およびオーディオパッケージングのための ElevenLabs
- 最終的なソーシャルネイティブの仕上げのための CapCut または VectCutAPI

### ビジネスオペレーション

- ドキュメント、スプレッドシート、スライド、およびリサーチダンプのための記録システムとしての Google Drive
- 収益および支払いオペレーションのための Stripe
- エンジニアリング実行のための GitHub
- 緊急のナッジや承認のための Telegram および iMessage スタイルのチャネル

## ローカル認証が引き続き必要なもの

これらはローカルにとどまり、オペレーターごとに設定する必要がある。

- Drive / Docs / Sheets / Slides 用の Google OAuth トークン
- X / LinkedIn / アウトバウンド配信用の認証情報
- Stripe キー
- ブラウザ自動化の認証情報とステルス/プロキシ設定
- Linear や Apollo などの CRM またはプロジェクトシステムの認証情報
- ヘルスケア自動化が有効な場合の Apple Health エクスポートまたはインジェストのパス

## 推奨される立ち上げ順序

0. 最初に `ecc migrate audit --source ~/.hermes` を実行し、レガシーワークスペースをインベントリ化して、どの部分がすでに ECC2 にマッピングされているかを確認する。
0.5. 何かをインポートする前に、移行アーティファクトを計画しスキャフォールドする:
   - `ecc migrate plan` と `ecc migrate scaffold` を使用して、レビュー可能な計画を生成する
   - `ecc migrate import-skills --output-dir migration-artifacts/skills` を使用して、再利用可能なレガシースキルをスキャフォールドする
   - `ecc migrate import-tools --output-dir migration-artifacts/tools` を使用して、ツールの翻訳テンプレートをスキャフォールドする
   - `ecc migrate import-plugins --output-dir migration-artifacts/plugins` を使用して、ブリッジプラグインのテンプレートをスキャフォールドする
   - `ecc migrate import-schedules --dry-run` を使用して、定期ジョブをプレビューする
   - `ecc migrate import-remote --dry-run` を使用して、ゲートウェイディスパッチをプレビューする
   - `ecc migrate import-env --dry-run` を使用して、安全な環境/サービスコンテキストをプレビューする
   - `ecc migrate import-memory` を使用して、サニタイズされたワークスペースメモリをインポートする
1. ECC をインストールし、`node tests/run-all.js` を使用してベースラインのハーネス設定を確認する。期待される結果は、失敗ゼロのテストサマリーである。
2. Hermes をインストールし、ECC からインポートしたスキルを参照させる。
3. 毎日実際に使用する MCP サーバーを登録する。
4. 最初に Google Drive、次に GitHub、次にディストリビューションチャネルの認証を行う。
5. レディネスチェック、コンテンツのアカウンタビリティ、受信トレイのトリアージ、収益モニターなど、小さな cron サーフェスから開始する。
6. その後、ヘルス、リレーションシップのグラフ化、アウトバウンドのシーケンスなど、より重い個人的なワークフローを追加する。

## 関連ドキュメント

- [Hermes/OpenClaw 移行ガイド](HERMES-OPENCLAW-MIGRATION.md)
- [クロスハーネスアーキテクチャ](architecture/cross-harness.md)

## なぜ Hermes x ECC なのか

このスタックは次のような場合に役立つ:

- ビジネスやエンジニアリングのオペレーションを実行するための、一つのターミナルネイティブな場所が欲しい場合
- 使い捨てのプロンプトではなく、再利用可能なスキルが欲しい場合
- ナッジ、監査、およびエスカレーションを行うことができる自動化が欲しい場合
- 個人的なオペレーター状態を公開せずに、システムの形状を示すパブリックリポジトリが欲しい場合

## パブリックリリース候補のスコープ

ECC v2.0.0-rc.1 は Hermes サーフェスを文書化し、ローンチ用資料を現在出荷している。

残りのプライベートな部分は、後から階層化することができる:

- 追加のサニタイズされたテンプレート
- より豊富なパブリックの例
- さらに生成されたワークフローパック
- より緊密な CRM および Google Workspace 統合
