# Antigravity セットアップおよび使用ガイド

Google の [Antigravity](https://antigravity.dev) は、設定に `.agent/` ディレクトリの規約を使用する AI コーディング IDE である。ECC は、選択的インストールシステムを通じて Antigravity をファーストクラスでサポートしている。

## クイックスタート

```bash
# Antigravity ターゲットで ECC をインストール
./install.sh --target antigravity typescript

# または、複数の言語モジュールを指定してインストール
./install.sh --target antigravity typescript python go
```

これにより、ECC コンポーネントがプロジェクトの `.agent/` ディレクトリにインストールされ、Antigravity によって読み込まれる準備が整う。

## インストールマッピングの仕組み

ECC は、コンポーネントの構造を Antigravity が期待するレイアウトに一致するように再マッピングする。

| ECC ソース | Antigravity の宛先 | 含まれる内容 |
|------------|------------------------|------------------|
| `rules/` | `.agent/rules/` | 言語ルールとコーディング標準（フラット化） |
| `commands/` | `.agent/workflows/` | スラッシュコマンドは Antigravity のワークフローになる |
| `agents/` | `.agent/skills/` | エージェント定義は Antigravity のスキルになる |

> **`.agents/` vs `.agent/` vs `agents/` に関する注意**: インストーラーは、`rules` → `.agent/rules/`、`commands` → `.agent/workflows/`、および `agents`（ドットプレフィックスなし）→ `.agent/skills/` の3つのソースパスのみを明示的に処理する。ECC リポジトリ内のドットプレフィックス付きの `.agents/` ディレクトリは、Codex/Antigravity のスキル定義と `openai.yaml` 設定のための **静的なレイアウト** であり、インストーラーによって直接マッピングされることはない。`.agents/` パスはすべてデフォルトのスキャフォールド操作にフォールスルーする。`.agents/skills/` のコンテンツを Antigravity ランタイムで利用できるようにしたい場合は、それらを手動で `.agent/skills/` にコピーする必要がある。

### Claude Code との主な違い

- **ルールのフラット化**: Claude Code ではルールはサブディレクトリ（`rules/common/`、`rules/typescript/`）の下にネストされている。Antigravity はフラットな `rules/` ディレクトリを期待しており、インストーラーはこれを自動的に処理する。
- **コマンドがワークフローになる**: ECC の `/command` ファイルは `.agent/workflows/` に配置され、これは Antigravity のスラッシュコマンドに相当する。
- **エージェントがスキルになる**: ECC のエージェント定義は `.agent/skills/` にマッピングされ、Antigravity はそこでスキル設定を検索する。

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
│   └── ecc-install-state.json     # ECC が何をインストールしたかを追跡する
```

## `openai.yaml` エージェント設定

`.agents/skills/` の下の各スキルディレクトリには、`.agents/skills/<skill-name>/agents/openai.yaml` というパスに `agents/openai.yaml` ファイルが含まれており、Antigravity 向けにスキルを設定している。

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
| `display_name` | Antigravity の UI で表示される人間が読める名前 |
| `short_description` | スキルが何を行うかの短い説明 |
| `brand_color` | スキルの視覚的バッジの16進数カラー |
| `default_prompt` | スキルが手動で呼び出されたときの提案プロンプト |
| `allow_implicit_invocation` | `true` の場合、Antigravity はコンテキストに基づいてスキルを自動的にアクティブ化できる |

## インストールの管理

### インストールされているものを確認する

```bash
node scripts/list-installed.js --target antigravity
```

### 壊れたインストールを修復する

```bash
# まず、何が間違っているかを診断する
node scripts/doctor.js --target antigravity

# 次に、不足している、またはドリフトしたファイルを復元する
node scripts/repair.js --target antigravity
```

### アンインストール

```bash
node scripts/uninstall.js --target antigravity
```

### インストール状態

インストーラーは `.agent/ecc-install-state.json` を書き込み、ECC がどのファイルを所有しているかを追跡する。これにより、安全なアンインストールと修復が可能になる。ECC は、自身が作成していないファイルに触れることはない。

## Antigravity 用のカスタムスキルの追加

新しいスキルに貢献し、それを Antigravity で利用できるようにしたい場合：

1. 通常通り `skills/your-skill-name/SKILL.md` の下にスキルを作成する
2. `agents/your-skill-name.md` にエージェント定義を追加する — これはインストーラーが実行時に `.agent/skills/` にマッピングするパスであり、スキルを Antigravity ハーネスで利用できるようにする
3. `.agents/skills/your-skill-name/agents/openai.yaml` に Antigravity エージェント設定を追加する — これは、暗黙の呼び出しメタデータのために Codex が消費する静的リポジトリレイアウトである
4. `SKILL.md` のコンテンツを `.agents/skills/your-skill-name/SKILL.md` にミラーリングする — この静的コピーは Codex によって使用され、Antigravity のリファレンスとして機能する
5. Antigravity サポートを追加したことを PR に記載する

> **重要な違い**: インストーラーは `agents/`（ドットなし）→ `.agent/skills/` にデプロイする — これにより、実行時にスキルが利用可能になる。`.agents/`（ドットプレフィックス）ディレクトリは、Codex `openai.yaml` 設定用の個別の静的レイアウトであり、インストーラーによって自動デプロイされない。

完全な貢献ガイドについては、[CONTRIBUTING.md](../CONTRIBUTING.md) を参照。

## 他のターゲットとの比較

| 機能 | Claude Code | Cursor | Codex | Antigravity |
|---------|-------------|--------|-------|-------------|
| インストールターゲット | `claude-home` | `cursor-project` | `codex-home` | `antigravity` |
| 設定ルート | `~/.claude/` | `.cursor/` | `~/.codex/` | `.agent/` |
| スコープ | ユーザーレベル | プロジェクトレベル | ユーザーレベル | プロジェクトレベル |
| ルールフォーマット | ネストされたディレクトリ | フラット | フラット | フラット |
| コマンド | `commands/` | 該当なし | 該当なし | `workflows/` |
| エージェント/スキル | `agents/` | 該当なし | 該当なし | `skills/` |
| インストール状態 | `ecc-install-state.json` | `ecc-install-state.json` | `ecc-install-state.json` | `ecc-install-state.json` |

## トラブルシューティング

### Antigravity でスキルが読み込まれない

- `.agent/` ディレクトリが（ホームディレクトリではなく）プロジェクトのルートに存在することを確認する
- `ecc-install-state.json` が作成されていることを確認する — 不足している場合は、インストーラーを再実行する
- ファイルに `.md` 拡張子があり、有効なフロントマターがあることを確認する

### ルールが適用されない

- ルールはサブディレクトリにネストされるのではなく、`.agent/rules/` にある必要がある
- `node scripts/doctor.js --target antigravity` を実行して、インストールを確認する

### ワークフローが利用できない

- Antigravity は `commands/` ではなく、`.agent/workflows/` でワークフローを検索する
- 手動で ECC コマンドをコピーした場合は、ディレクトリの名前を変更する

## 関連リソース

- [選択的インストールアーキテクチャ](./SELECTIVE-INSTALL-ARCHITECTURE.md) — インストールシステムが内部でどのように機能するか
- [選択的インストール設計](./SELECTIVE-INSTALL-DESIGN.md) — 設計の決定とターゲットアダプターの契約
- [CONTRIBUTING.md](../CONTRIBUTING.md) — スキル、エージェント、およびコマンドに貢献する方法
