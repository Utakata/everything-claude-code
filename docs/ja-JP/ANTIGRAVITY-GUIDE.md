# Antigravity セットアップ・使用ガイド

Google の [Antigravity](https://antigravity.dev) は、設定に `.agent/` ディレクトリ規約を使用する AI コーディング IDE です。ECC は、その selective インストールシステムを通じて Antigravity をファーストクラスでサポートします。

## クイックスタート

```bash
# Antigravity ターゲットで ECC をインストール
./install.sh --target antigravity typescript

# または複数の言語モジュールで
./install.sh --target antigravity typescript python go
```

これは、ECC コンポーネントをプロジェクトの `.agent/` ディレクトリにインストールし、Antigravity が取り込める状態にします。

## インストールマッピングの仕組み

ECC は、そのコンポーネント構造を Antigravity の期待するレイアウトに合わせて再マッピングします：

| ECC ソース | Antigravity の配置先 | 内容 |
|------------|------------------------|------------------|
| `rules/` | `.agent/rules/` | 言語ルールとコーディング標準（平坦化） |
| `commands/` | `.agent/workflows/` | スラッシュコマンドが Antigravity ワークフローになる |
| `agents/` | `.agent/skills/` | エージェント定義が Antigravity スキルになる |

> **`.agents/` と `.agent/` と `agents/` についての注意**：インストーラーは3つのソースパスのみを明示的に処理します：`rules` → `.agent/rules/`、`commands` → `.agent/workflows/`、`agents`（ドットプレフィックスなし）→ `.agent/skills/`。ECC リポジトリ内のドットプレフィックス付き `.agents/` ディレクトリは、Codex/Antigravity のスキル定義と `openai.yaml` 設定のための**静的レイアウト**であり、インストーラーによって直接マッピングされません。`.agents/` パスはすべてデフォルトのスキャフォールド操作にフォールスルーします。`.agents/skills/` のコンテンツを Antigravity ランタイムで利用可能にしたい場合は、手動で `.agent/skills/` にコピーする必要があります。

### Claude Code との主な違い

- **ルールは平坦化される**：Claude Code はルールをサブディレクトリ（`rules/common/`、`rules/typescript/`）の下にネストします。Antigravity はフラットな `rules/` ディレクトリを期待します — インストーラーがこれを自動的に処理します。
- **コマンドはワークフローになる**：ECC の `/command` ファイルは `.agent/workflows/` に配置されます。これは Antigravity におけるスラッシュコマンドの相当物です。
- **エージェントはスキルになる**：ECC のエージェント定義は `.agent/skills/` にマッピングされます。ここは Antigravity がスキル設定を探す場所です。

## インストール後のディレクトリ構造

```
your-project/
├── .agent/
│   ├── rules/
│   │   ├── coding-standards.md
│   │   ├── testing.md
│   │   ├── security.md
│   │   └── typescript.md          # 言語固有のルール
│   ├── workflows/
│   │   ├── plan.md
│   │   ├── code-review.md
│   │   ├── tdd.md
│   │   └── ...
│   ├── skills/
│   │   ├── planner.md
│   │   ├── code-reviewer.md
│   │   ├── tdd-guide.md
│   │   └── ...
│   └── ecc-install-state.json     # ECC がインストールしたものを追跡
```

## `openai.yaml` エージェント設定

`.agents/skills/` 配下の各スキルディレクトリには、`.agents/skills/<skill-name>/agents/openai.yaml` というパスに `agents/openai.yaml` ファイルが含まれ、Antigravity 用にスキルを設定します：

```yaml
interface:
  display_name: "API Design"
  short_description: "REST API design patterns and best practices"
  brand_color: "#F97316"
  default_prompt: "Design REST API: resources, status codes, pagination"
policy:
  allow_implicit_invocation: true
```

| フィールド | 目的 |
|-------|---------|
| `display_name` | Antigravity の UI に表示される人間が読める名前 |
| `short_description` | スキルが何をするかの簡単な説明 |
| `brand_color` | スキルのビジュアルバッジの16進カラー |
| `default_prompt` | スキルが手動で呼び出されたときの推奨プロンプト |
| `allow_implicit_invocation` | `true` の場合、Antigravity はコンテキストに基づいてスキルを自動的にアクティブ化できる |

## インストールの管理

### インストール済みのものを確認する

```bash
node scripts/list-installed.js --target antigravity
```

### 壊れたインストールを修復する

```bash
# まず、何が問題かを診断する
node scripts/doctor.js --target antigravity

# 次に、欠落またはドリフトしたファイルを復元する
node scripts/repair.js --target antigravity
```

### アンインストール

```bash
node scripts/uninstall.js --target antigravity
```

### インストール状態

インストーラーは `.agent/ecc-install-state.json` を書き込み、どのファイルを ECC が所有しているかを追跡します。これにより安全なアンインストールと修復が可能になります — ECC は自身が作成していないファイルには決して触れません。

## Antigravity 用のカスタムスキルの追加

新しいスキルをコントリビュートし、それを Antigravity で利用可能にしたい場合：

1. 通常どおり `skills/your-skill-name/SKILL.md` の下にスキルを作成する
2. `agents/your-skill-name.md` にエージェント定義を追加する — これはインストーラーがランタイムで `.agent/skills/` にマッピングするパスであり、あなたのスキルを Antigravity ハーネスで利用可能にする
3. `.agents/skills/your-skill-name/agents/openai.yaml` に Antigravity エージェント設定を追加する — これは implicit invocation のメタデータのために Codex が消費する静的なリポジトリレイアウトである
4. `SKILL.md` のコンテンツを `.agents/skills/your-skill-name/SKILL.md` にミラーする — この静的コピーは Codex が使用し、Antigravity のリファレンスとして機能する
5. Antigravity サポートを追加したことを PR で言及する

> **重要な区別**：インストーラーは `agents/`（ドットなし）→ `.agent/skills/` をデプロイします — これがスキルをランタイムで利用可能にするものです。`.agents/`（ドットプレフィックス付き）ディレクトリは、Codex の `openai.yaml` 設定のための別個の静的レイアウトであり、インストーラーによって自動デプロイされません。

完全なコントリビューションガイドについては [CONTRIBUTING.md](../CONTRIBUTING.md) を参照してください。

## 他のターゲットとの比較

| 機能 | Claude Code | Cursor | Codex | Antigravity |
|---------|-------------|--------|-------|-------------|
| インストールターゲット | `claude-home` | `cursor-project` | `codex-home` | `antigravity` |
| 設定ルート | `~/.claude/` | `.cursor/` | `~/.codex/` | `.agent/` |
| スコープ | ユーザーレベル | プロジェクトレベル | ユーザーレベル | プロジェクトレベル |
| ルール形式 | ネストしたディレクトリ | フラット | フラット | フラット |
| コマンド | `commands/` | N/A | N/A | `workflows/` |
| エージェント/スキル | `agents/` | N/A | N/A | `skills/` |
| インストール状態 | `ecc-install-state.json` | `ecc-install-state.json` | `ecc-install-state.json` | `ecc-install-state.json` |

## トラブルシューティング

### Antigravity でスキルがロードされない

- `.agent/` ディレクトリがプロジェクトルート（ホームディレクトリではない）に存在することを確認する
- `ecc-install-state.json` が作成されたことを確認する — 欠落している場合は、インストーラーを再実行する
- ファイルが `.md` 拡張子と有効なフロントマターを持つことを確認する

### ルールが適用されない

- ルールは、サブディレクトリにネストされるのではなく、`.agent/rules/` になければならない
- `node scripts/doctor.js --target antigravity` を実行してインストールを検証する

### ワークフローが利用できない

- Antigravity はワークフローを `commands/` ではなく `.agent/workflows/` で探す
- ECC コマンドを手動でコピーした場合は、ディレクトリの名前を変更する

## 関連リソース

- [Selective Install アーキテクチャ](./SELECTIVE-INSTALL-ARCHITECTURE.md) — インストールシステムが内部でどのように機能するか
- [Selective Install 設計](./SELECTIVE-INSTALL-DESIGN.md) — 設計上の決定とターゲットアダプター契約
- [CONTRIBUTING.md](../CONTRIBUTING.md) — スキル、エージェント、コマンドのコントリビュート方法
