# Qwen CLI アダプターガイド

ECC は、その管理下のコマンド、エージェント、スキル、ルール、MCP サーフェスを Qwen CLI のホームディレクトリにインストールできます。

## インストール

ECC リポジトリのルートから：

```bash
./install.sh --target qwen --profile minimal
```

ファイルをコピーする前に、より大きなインストールをプレビューします：

```bash
./install.sh --target qwen --profile full --dry-run
```

Qwen アダプターは `~/.qwen/` に書き込み、管理下のファイルの所有権を `~/.qwen/ecc-install-state.json` に記録します。

## インストールされるレイアウト

管理下のインストールは以下を配置できます：

```text
~/.qwen/
  QWEN.md
  agents/
  commands/
  mcp-configs/
  rules/
  skills/
  ecc-install-state.json
```

インストーラーはルールのソースレイアウトを保持するため、言語ルールセットは `~/.qwen/rules/common/` や `~/.qwen/rules/typescript/` のようなパスの下に留まります。

## 更新

ECC の更新をプルした後、同じインストールコマンドを再実行します。インストーラーは install-state ファイルを使用して、`~/.qwen/` 内の無関係なユーザーファイルを取り込むことなく ECC 管理下のファイルを更新します。

## アンインストール

Qwen ディレクトリ全体を削除するのではなく、管理下のアンインストールパスを使用します：

```bash
node scripts/uninstall.js --target qwen
```

これは `~/.qwen/ecc-install-state.json` に記録されたファイルを削除し、無関係な Qwen 設定はそのまま残します。

## スコープ

このターゲットは、stale な PR #1352 よりも意図的に狭くなっています。メンテナンス可能な Qwen インストールターゲットの意図を現在の selective インストーラーに移植し、Qwen のフック/イベント契約が確認されるまで、検証されていないフックランタイムの主張を避けます。
