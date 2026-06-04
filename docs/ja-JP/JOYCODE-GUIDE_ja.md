# JoyCode アダプターガイド

JoyCode は選択的インストーラーを介して ECC を使用できる。アダプターは、共有の ECC コマンド、エージェント、スキル、およびフラット化されたルールをプロジェクトローカルの `.joycode/` ディレクトリにインストールする。

## インストール

インストール計画をプレビューする:

```bash
node scripts/install-plan.js --target joycode --profile full
```

それを現在のプロジェクトに適用する:

```bash
node scripts/install-apply.js --target joycode --profile full
```

より小さなインストールの場合は、モジュールを明示的に選択する:

```bash
node scripts/install-apply.js --target joycode --modules rules-core,commands-core,workflow-quality
```

## レイアウト

プロジェクトアダプターは、管理対象ファイルを以下の場所に書き込む:

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

ルールは名前空間付きのファイル名にフラット化されるため、JoyCode プロジェクトには `rules/common/coding-style.md` のようなネストされたルールディレクトリは配置されない。コマンド、エージェント、およびスキルは、ECC の他の場所で使用されているのと同じ構造を維持する。
フルプロファイルには、他の ECC プロジェクトローカルアダプターが使用する共有 MCP およびセットアップヘルパーファイルも含まれる。

## アンインストール

手動でファイルを削除するのではなく、ECC の管理されたアンインストールパスを使用する:

```bash
node scripts/uninstall.js --target joycode
```

アンインストールコマンドは `.joycode/ecc-install-state.json` を読み込み、ECC がインストールしたファイルのみを削除する。ユーザーが作成した JoyCode ファイルは保持される。

## ソース PR

このアダプターは、古い PR #1429 から有用なプロジェクトローカルの JoyCode の意図をサルベージし、スタンドアロンのシェルインストーラーを ECC の現在のインストール状態およびアンインストール機構に置き換える。
