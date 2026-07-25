# JoyCode アダプターガイド

JoyCode は、selective インストーラーを通じて ECC を利用できます。アダプターは、共有の ECC コマンド、エージェント、スキル、および平坦化されたルールを、プロジェクトローカルな `.joycode/` ディレクトリにインストールします。

## インストール

インストールプランをプレビューします：

```bash
node scripts/install-plan.js --target joycode --profile full
```

現在のプロジェクトに適用します：

```bash
node scripts/install-apply.js --target joycode --profile full
```

より小さなインストールには、モジュールを明示的に選択します：

```bash
node scripts/install-apply.js --target joycode --modules rules-core,commands-core,workflow-quality
```

## レイアウト

プロジェクトアダプターは、管理下のファイルを以下の下に書き込みます：

```text
.joycode/
  agents/
  commands/
  rules/
  skills/
  mcp-configs/
  scripts/
  ecc-install-state.json
```

ルールは名前空間付きのファイル名に平坦化されるため、JoyCode プロジェクトは `rules/common/coding-style.md` のようなネストしたルールディレクトリを受け取りません。コマンド、エージェント、スキルは、ECC の他の場所で使用しているのと同じ構造を保ちます。
full プロファイルには、他の ECC プロジェクトローカルアダプターが使用する共有 MCP およびセットアップヘルパーファイルも含まれます。

## アンインストール

手作業でファイルを削除するのではなく、ECC の管理下のアンインストールパスを使用します：

```bash
node scripts/uninstall.js --target joycode
```

アンインストールコマンドは `.joycode/ecc-install-state.json` を読み取り、ECC がインストールしたファイルのみを削除します。ユーザーが作成した JoyCode ファイルは保持されます。

## ソース PR

このアダプターは、stale な PR #1429 から有用なプロジェクトローカルの JoyCode の意図を救済しつつ、スタンドアロンのシェルインストーラーを ECC の現在の install-state およびアンインストールの仕組みに置き換えます。
