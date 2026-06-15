# Everything Claude Code for Trae

Everything Claude Code (ECC) のワークフローを Trae IDE に導入する。このリポジトリは、単一のコマンドで任意の Trae プロジェクトにインストールできるカスタムのコマンド、エージェント、スキル、ルールを提供する。

## Quick Start

### Option 1: Local Installation (Current Project Only)

```bash
# Install to current project
cd /path/to/your/project
TRAE_ENV=cn .trae/install.sh
```

これにより、プロジェクトディレクトリに `.trae-cn/` が作成される。

### Option 2: Global Installation (All Projects)

```bash
# Install globally to ~/.trae-cn/
cd /path/to/your/project
TRAE_ENV=cn .trae/install.sh ~

# Or from the .trae folder directly
cd /path/to/your/project/.trae
TRAE_ENV=cn ./install.sh ~
```

これにより `~/.trae-cn/` が作成され、すべての Trae プロジェクトに適用される。

### Option 3: Quick Install to Current Directory

```bash
# If already in project directory with .trae folder
cd .trae
./install.sh
```

インストーラーは非破壊的なコピーを行うため、既存のファイルを上書きすることはない。

## Installation Modes

### Local Installation

現在のプロジェクトの `.trae-cn` ディレクトリにインストールする:

```bash
cd /path/to/your/project
TRAE_ENV=cn .trae/install.sh
```

これにより、すべての ECC コンポーネントを含む `/path/to/your/project/.trae-cn/` が作成される。

### Global Installation

ホームディレクトリの `.trae-cn` ディレクトリにインストールする (すべての Trae プロジェクトに適用):

```bash
# From project directory
TRAE_ENV=cn .trae/install.sh ~

# Or directly from .trae folder
cd .trae
TRAE_ENV=cn ./install.sh ~
```

これにより、すべての ECC コンポーネントを含む `~/.trae-cn/` が作成される。すべての Trae プロジェクトでこのグローバルインストールが使用されるようになる。

**Note**: グローバルインストールは、すべてのプロジェクトで単一の ECC コピーを維持したい場合に便利である。

## Environment Support

- **Default**: `.trae` ディレクトリを使用する
- **CN Environment**: `.trae-cn` ディレクトリを使用する (`TRAE_ENV=cn` 経由で設定)

### Force Environment

```bash
# From project root, force the CN environment
TRAE_ENV=cn .trae/install.sh

# From inside the .trae folder
cd .trae
TRAE_ENV=cn ./install.sh
```

**Note**: `TRAE_ENV` は、インストールセッション全体に適用されるグローバル環境変数である。

## Uninstall

アンインストーラーは、マニフェストファイル (`.ecc-manifest`) を使用してインストールされたファイルを追跡し、安全な削除を保証する:

```bash
# Uninstall from current directory (if already inside .trae or .trae-cn)
cd .trae-cn
./uninstall.sh

# Or uninstall from project root
cd /path/to/your/project
TRAE_ENV=cn .trae/uninstall.sh

# Uninstall globally from home directory
TRAE_ENV=cn .trae/uninstall.sh ~

# Will ask for confirmation before uninstalling
```

### Uninstall Behavior

- **Safe removal**: マニフェストで追跡されているファイル (ECC によってインストールされたファイル) のみ削除される
- **User files preserved**: 手動で追加したファイルは保持される
- **Non-empty directories**: ユーザーが追加したファイルを含むディレクトリはスキップされる
- **Manifest-based**: インストール時に作成された `.ecc-manifest` ファイルが必要である

### Environment Support

アンインストールは、インストール時と同じ `TRAE_ENV` 環境変数を尊重する:

```bash
# Uninstall from .trae-cn (CN environment)
TRAE_ENV=cn ./uninstall.sh

# Uninstall from .trae (default environment)
./uninstall.sh
```

**Note**: マニフェストファイルが見つからない場合 (古いインストールなど)、アンインストーラーはディレクトリ全体を削除するかどうかを確認する。

## What's Included

### Commands

コマンドは、Trae チャットの `/` メニューから呼び出し可能なオンデマンドのワークフローである。すべてのコマンドは、プロジェクトルートの `commands/` フォルダーから直接再利用される。

### Agents

エージェントは、特定のツール構成を持つ専門的な AI アシスタントである。すべてのエージェントは、プロジェクトルートの `agents/` フォルダーから直接再利用される。

### Skills

スキルは、チャットの `/` メニューから呼び出し可能なオンデマンドのワークフローである。すべてのスキルは、プロジェクトの `skills/` フォルダーから直接再利用される。

### Rules

ルールは、エージェントがコードを操作する方法を形成する、常に有効なルールとコンテキストを提供する。すべてのルールは、プロジェクトルートの `rules/` フォルダーから直接再利用される。

## Usage

1. チャットで `/` を入力して、コマンドメニューを開く
2. コマンドまたはスキルを選択する
3. エージェントが、具体的な手順とチェックリストとともにワークフローを案内する

## Project Structure

```
.trae/ (or .trae-cn/)
├── commands/           # Command files (reused from project root)
├── agents/             # Agent files (reused from project root)
├── skills/             # Skill files (reused from skills/)
├── rules/              # Rule files (reused from project root)
├── install.sh          # Install script
├── uninstall.sh        # Uninstall script
└── README.md           # This file
```

## Customization

インストール後、すべてのファイルは自由に変更可能である。インストーラーは既存のファイルを決して上書きしないため、再インストールを行ってもカスタマイズは安全に保たれる。

**Note**: `install.sh` と `uninstall.sh` スクリプトはインストール時にターゲットディレクトリへ自動的にコピーされるため、プロジェクトから直接これらのコマンドを実行できる。

## Recommended Workflow

1. **Start with planning**: `/plan` コマンドを使用して、複雑な機能を細分化する
2. **Write tests first**: 実装前に `/tdd` コマンドを呼び出す
3. **Review your code**: コード記述後、 `/code-review` を使用する
4. **Check security**: 認証、API エンドポイント、または機密データの取り扱いについて、再度 `/code-review` を使用する
5. **Fix build errors**: ビルドエラーがある場合は、 `/build-fix` を使用する

## Next Steps

- Trae でプロジェクトを開く
- `/` を入力して利用可能なコマンドを確認する
- ECC のワークフローを楽しんで！
