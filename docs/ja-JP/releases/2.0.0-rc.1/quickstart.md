# ECC v2.0.0-rc.1 クイックスタート

このパスは、機能作業に着手する前にリリースサーフェスを検証したい新規コントリビューター向けです。

## クローン

```bash
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code
```

クリーンなチェックアウトから始めます。プライベートなオペレーターの状態、生のワークスペースエクスポート、トークン、ローカルの Hermes ファイルをリポジトリにコピーしないでください。

## インストール

```bash
npm ci
```

これにより、公開リリースサーフェスで使用される Node ベースの検証・パッケージングツールチェーンがインストールされます。

## 検証

```bash
node tests/run-all.js
```

期待される結果：すべてのテストが失敗ゼロで合格すること。リリース固有のドリフトについては、焦点を絞ったチェックを実行します：

```bash
node tests/docs/ecc2-release-surface.test.js
```

次に、ローカルのオブザーバビリティサーフェスを確認します：

```bash
npm run observability:ready
```

これは、ループステータス、セッショントレース、ハーネス監査、ECC2 のツールリスクログのための
[オブザーバビリティ準備ゲート](../../architecture/observability-readiness.md) を実行します。

## 最初のスキル

まず `skills/hermes-imports/SKILL.md` を読んでください。

これは、意図された ECC 2.0 のパターンを示しています：

- 繰り返されるオペレーターワークフローを取り上げる
- 認証情報、プライベートなパス、生のワークスペースエクスポート、個人メモリを削除する
- 耐久性のあるワークフローの形を保つ
- サニタイズ済みの結果を再利用可能な `SKILL.md` として公開する

プライベートな Hermes ワークフローをまるごとインポートすることから始めないでください。1つの再利用可能なスキルを蒸留することから始めてください。

## ハーネスの切り替え

同じスキルソースをハーネス横断で使用します：

- Claude Code は、Claude プラグインとネイティブフックを通じて ECC を利用します。
- Codex は、`AGENTS.md`、`.codex-plugin/plugin.json`、および MCP リファレンス設定を通じて ECC を利用します。
- OpenCode は、OpenCode の package/plugin サーフェスを通じて ECC を利用します。

ポータブルな単位は依然として `skills/*/SKILL.md` です。ハーネス固有のファイルは、ワークフローを再定義するのではなく、そのソースをロードまたは適応させるべきです。

## 次のドキュメント

- [Hermes セットアップ](../../HERMES-SETUP.md)
- [クロスハーネスアーキテクチャ](../../architecture/cross-harness.md)
- [リリースノート](release-notes.md)
