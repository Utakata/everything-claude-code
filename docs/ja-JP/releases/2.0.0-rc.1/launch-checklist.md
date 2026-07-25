# ECC v2.0.0-rc.1 ローンチチェックリスト

## リポジトリ

- ローカルの `main` が `origin/main` と同期していることを確認する
- `docs/ECC-2.0-GA-ROADMAP.md` が、現在の Linear マイルストーン計画と、Ito
  Markets ワークスペース配下の最新の `ECC Platform Roadmap` プロジェクトスナップショットを
  反映していることを確認する
- `docs/HERMES-SETUP.md` が存在することを確認する
- `docs/architecture/cross-harness.md` が存在することを確認する
- このリリースディレクトリがコミットされていることを確認する
- 最終の publish チェックを実行する前に、`preview-pack-manifest.md` が公開リリース、Hermes、アダプター、
  オブザーバビリティ、公表、およびアナウンスの各アーティファクトを列挙していることを確認する
- プライベートトークン、個人ドキュメント、生のワークスペースエクスポートをリポジトリの外に保つ

## リリースサーフェス

- package、plugin、marketplace、OpenCode、agent のメタデータが `2.0.0-rc.1` のままであることを確認する
- `ecc2/Cargo.toml` が rc.1 では `0.1.0` のままであることを確認する。`ecc2/` はアルファのコントロールプレーンのスキャフォールドのままです
- いかなる GitHub リリース、npm publish、プラグイン提出、アナウンス投稿の前にも、新鮮なエビデンスで `publication-readiness.md` を完成させる
- `publication-evidence-2026-05-17.md` と
  `operator-readiness-dashboard-2026-05-17.md` を最終エビデンスレビューに含め、
  その後、正確なリリースコミットから publish 向けのチェックを再実行する
- リリースメタデータは、専用のリリースバージョン PR 1つで更新する
- ルートのテストスイートを実行する
- `cd ecc2 && cargo test` を実行する

## コンテンツ

- `x-thread.md` から X スレッドを公開する
- `linkedin-post.md` から LinkedIn 草稿を公開する
- より長い記事には `article-outline.md` を使う
- 30〜60秒の proof-of-work クリップを1つ録画する

## デモ素材の提案

- Hermes と ECC を並べて表示
- リポジトリからリリースドキュメントが生成またはレビューされる様子
- ブリーフから投稿、チェックリストへと移行するワークフロー
- アルファのフレーミングを付けた `ecc2/` ダッシュボードまたはセッションサーフェス

## メッセージング

以下のような言葉を使う：

- 「リリース候補（release candidate）」
- 「サニタイズ済みオペレータースタック」
- 「エージェンティックな作業のためのクロスハーネスなオペレーティングシステム」
- 「ECC は再利用可能な基盤、Hermes はオペレーターシェル」
- 「プライベート/ローカルの統合はサニタイズ後にランドする」
