# ECC 2.0 Alpha

`ecc2/` は、現在 Rust ベースの ECC 2.0 コントロールプレーンのスキャフォールドである。

ローカルでの実験用アルファ版として使用可能だが、まだ完成した ECC 2.0 プロダクト**ではない**。

## What Exists Today

- ターミナル UI ダッシュボード
- SQLite をバックエンドとするセッションストア
- セッションの開始 / 停止 / 再開フロー
- バックグラウンドデーモンモード
- 可観測性とリスクスコアリングのプリミティブ
- ワークツリーを認識するセッションスキャフォールド
- 基本的なマルチセッション状態と出力の追跡

## What This Is For

ECC 2.0 は、個々のハーネスインストールの上のレイヤーである。

目標は以下の通り:

- 多数のエージェントセッションを単一のサーフェスから管理する
- セッション状態、出力、リスクを可視化して維持する
- オーケストレーション、ワークツリー管理、およびレビュートロールを追加する
- 将来のハーネス相互運用性を妨げることなく、まずは Claude Code をサポートする

## Current Status

このディレクトリは以下のように扱うべきである:

- 実際のコード
- アルファ品質
- ローカルでのビルドとテストは有効
- まだパブリックな GA (一般提供) リリースではない

より広範なロードマップに関するオープンなイシュー群は、メインリポジトリのイシュートラッカーで `ecc-2.0` ラベルの下に存在する。

## Run It

リポジトリのルートから:

```bash
cd ecc2
cargo run
```

便利なコマンド:

```bash
# Launch the dashboard
cargo run -- dashboard

# Start a new session
cargo run -- start --task "audit the repo and propose fixes" --agent claude --worktree

# List sessions
cargo run -- sessions

# Inspect a session
cargo run -- status latest

# Stop a session
cargo run -- stop <session-id>

# Resume a failed/stopped session
cargo run -- resume <session-id>

# Run the daemon loop
cargo run -- daemon
```

## Validate

```bash
cd ecc2
cargo test
```

## What Is Still Missing

アルファ版には、ECC 2.0 を定義する高度なオペレーターサーフェスが欠けている:

- よりリッチなマルチエージェントのオーケストレーション
- 明示的なエージェント間の委譲と要約
- 視覚的なワークツリー / 差分レビューサーフェス
- より強力な外部ハーネスとの互換性
- より深いメモリとロードマップを認識するプランニングレイヤー
- リリースのパッケージングとインストーラーのストーリー

## Repo Rule

スキャフォールドがビルドできるからといって、`ecc2/` を完成品として宣伝してはならない。

正しいフレーミングは以下の通り:

- ECC 2.0 アルファ版が存在する
- 内部 / オペレーターテストとして使用可能である
- まだ完全なリリースではない
