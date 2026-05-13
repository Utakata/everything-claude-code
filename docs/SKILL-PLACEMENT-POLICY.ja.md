# Skill Placement and Provenance Policy

このドキュメントは、生成、インポート、およびキュレーションされたskillがどこに属するか、どのように識別されるか、そして何が出荷されるかを定義する。

## Skill Types and Placement

| Type | Root Path | Shipped | Provenance |
|------|-----------|---------|------------|
| Curated | `skills/` (repo) | Yes | Not required |
| Learned | `~/.claude/skills/learned/` | No | Required |
| Imported | `~/.claude/skills/imported/` | No | Required |
| Evolved | `~/.claude/homunculus/evolved/skills/` (global) or `projects/<hash>/evolved/skills/` (per-project) | No | Inherits from instinct source |

キュレーションされたskillはリポジトリの `skills/` 配下に配置される。インストールマニフェストはキュレーションされたパスのみを参照する。生成およびインポートされたskillはユーザーのホームディレクトリ配下に配置され、決して出荷されない。

## Curated Skills

場所: `skills/<skill-name>/` で、ルートに `SKILL.md` を配置。

- `manifests/install-modules.json` のパスに含まれる。
- `scripts/ci/validate-skills.js` によって検証される。
- provenance（来歴）ファイルはなし。属性の付与には、SKILL.mdのフロントマターの `origin` （ECC、community）を使用する。

## Learned Skills

場所: `~/.claude/skills/learned/<skill-name>/`。

continuous-learning（evaluate-session hook、/learnコマンド）によって作成される。デフォルトのパスは `skills/continuous-learning/config.json` → `learned_skills_path` 経由で設定可能である。

- リポジトリには含まれない。出荷されない。
- `SKILL.md` と同じ階層に `.provenance.json` を持つ必要がある。
- ディレクトリが存在する場合、実行時にロードされる。

## Imported Skills

場所: `~/.claude/skills/imported/<skill-name>/`。

外部ソース（URL、ファイルコピーなど）からユーザーがインストールしたskill。自動化されたインポーターはまだ存在せず、配置は規約による。

- リポジトリには含まれない。出荷されない。
- `SKILL.md` と同じ階層に `.provenance.json` を持つ必要がある。

## Evolved Skills (Continuous Learning v2)

場所: `~/.claude/homunculus/evolved/skills/` (global) または `~/.claude/homunculus/projects/<hash>/evolved/skills/` (per-project)。

クラスター化されたinstinctから、instinct-cli evolveによって生成される。learned/importedとは独立したシステムである。

- リポジトリには含まれない。出荷されない。
- ソースとなるinstinctからprovenanceを継承するため、個別の `.provenance.json` は必要ない。

## Provenance Metadata

learnedおよびimportedのskillに必須。ファイル: skillディレクトリ内の `.provenance.json`。

必須フィールド:

| Field | Type | Description |
|-------|------|-------------|
| source | string | 送信元（URL、パス、または識別子） |
| created_at | string | ISO 8601 タイムスタンプ |
| confidence | number | 0–1 |
| author | string | skillを生成した人または物 |

スキーマ: `schemas/provenance.schema.json`。検証: `scripts/lib/skill-evolution/provenance.js` → `validateProvenance`。

## Validator Behavior

### validate-skills.js

スコープ: Curated skillsのみ（リポジトリ内の `skills/`）。

- `skills/` が存在しない場合: 終了コード0（検証するものはない）。
- 各サブディレクトリについて: 非空の `SKILL.md` を含まなければならない。
- learned/imported/evolvedのルートには触れない。

### validate-install-manifests.js

スコープ: Curated pathsのみ。モジュール内のすべての `paths` はリポジトリに存在しなければならない。

- 生成/インポートされたルートはスコープ外である。どのマニフェストもそれらを参照しない。
- 欠落しているパス → エラー。オプショナルなパスの処理はない。

### Scripts That Use Generated Roots

`scripts/skills-health.js`、`scripts/lib/skill-evolution/health.js`、セッションのhook: これらは `~/.claude/skills/learned` と `~/.claude/skills/imported` をプローブする。見つからないディレクトリは空として扱われ、エラーにはならない。

## Publishable vs Local-Only

| Publishable | Local-Only |
|-------------|------------|
| `skills/*` (curated) | `~/.claude/skills/learned/*` |
| | `~/.claude/skills/imported/*` |
| | `~/.claude/homunculus/**/evolved/**` |

キュレーションされたskillのみがインストールマニフェストに表示され、インストール時にコピーされる。

## Implementation Roadmap

1. Policy documentとprovenance schema（この変更）。
2. learned-skillの書き込みパス（evaluate-session、/learn出力）にprovenanceの検証を追加し、新しく学習したskillが常に `.provenance.json` を取得するようにする。
3. evolved skillを生成する際、オプションでprovenanceを書き込むようにinstinct-cli evolveを更新する。
4. learned/importedのコンテンツを含んではならないリポジトリパス（必要に応じて）のCIに `scripts/validate-provenance.js` を追加する。
5. CONTRIBUTING.mdまたはユーザードキュメントにlearned/importedのルートを文書化し、コントリビューターがそれらをコミットしないようにする。
