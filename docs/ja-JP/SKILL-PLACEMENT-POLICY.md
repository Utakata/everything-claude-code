# スキル配置・来歴ポリシー

このドキュメントは、生成、インポート、キュレーションされたスキルがどこに属するか、どのように識別されるか、何が出荷されるかを定義します。

## スキルタイプと配置

| タイプ | ルートパス | 出荷 | 来歴 |
|------|-----------|---------|------------|
| Curated（キュレーション済み） | `skills/`（リポジトリ） | はい | 不要 |
| Learned（学習済み） | `~/.claude/skills/learned/` | いいえ | 必須 |
| Imported（インポート済み） | `~/.claude/skills/imported/` | いいえ | 必須 |
| Evolved（進化済み） | `~/.claude/homunculus/evolved/skills/`（グローバル）または `projects/<hash>/evolved/skills/`（プロジェクトごと） | いいえ | instinct ソースから継承 |

キュレーション済みスキルは、`skills/` の下のリポジトリに存在します。インストールマニフェストはキュレーション済みパスのみを参照します。生成およびインポートされたスキルはユーザーのホームディレクトリの下に存在し、決して出荷されません。

## キュレーション済みスキル

場所：ルートに `SKILL.md` を持つ `skills/<skill-name>/`。

- `manifests/install-modules.json` のパスに含まれる。
- `scripts/ci/validate-skills.js` によって検証される。
- 来歴ファイルなし。アトリビューションには SKILL.md フロントマターの `origin`（ECC、community）を使用する。

## 学習済みスキル

場所：`~/.claude/skills/learned/<skill-name>/`。

continuous-learning（evaluate-session フック、/learn コマンド）によって作成される。デフォルトパスは `skills/continuous-learning/config.json` → `learned_skills_path` で設定可能。

- リポジトリにない。出荷されない。
- `SKILL.md` の兄弟として `.provenance.json` を持たなければならない。
- ディレクトリが存在する場合、ランタイムでロードされる。

## インポート済みスキル

場所：`~/.claude/skills/imported/<skill-name>/`。

外部ソース（URL、ファイルコピーなど）からユーザーがインストールしたスキル。まだ自動インポーターは存在しない；配置は規約による。

- リポジトリにない。出荷されない。
- `SKILL.md` の兄弟として `.provenance.json` を持たなければならない。

## 進化済みスキル（Continuous Learning v2）

場所：`~/.claude/homunculus/evolved/skills/`（グローバル）または `~/.claude/homunculus/projects/<hash>/evolved/skills/`（プロジェクトごと）。

クラスタリングされた instinct から instinct-cli evolve によって生成される。learned/imported とは別のシステム。

- リポジトリにない。出荷されない。
- 来歴はソース instinct から継承される；別個の `.provenance.json` は不要。

## 来歴メタデータ

学習済みおよびインポート済みスキルに必須。ファイル：スキルディレクトリ内の `.provenance.json`。

必須フィールド：

| フィールド | タイプ | 説明 |
|-------|------|-------------|
| source | string | 起源（URL、パス、または識別子） |
| created_at | string | ISO 8601 タイムスタンプ |
| confidence | number | 0〜1 |
| author | string | スキルを生成した人または物 |

スキーマ：`schemas/provenance.schema.json`。検証：`scripts/lib/skill-evolution/provenance.js` → `validateProvenance`。

## バリデーターの挙動

### validate-skills.js

スコープ：キュレーション済みスキルのみ（リポジトリの `skills/`）。

- `skills/` が存在しない場合：exit 0（検証するものがない）。
- 各サブディレクトリについて：空でない `SKILL.md` を含まなければならない。
- learned/imported/evolved のルートには触れない。

### validate-install-manifests.js

スコープ：キュレーション済みパスのみ。モジュール内のすべての `paths` がリポジトリに存在しなければならない。

- 生成/インポートされたルートはスコープ外。マニフェストはそれらを参照しない。
- 欠落したパス → エラー。オプションパスの処理なし。

### 生成ルートを使用するスクリプト

`scripts/skills-health.js`、`scripts/lib/skill-evolution/health.js`、セッションフック：これらは `~/.claude/skills/learned` と `~/.claude/skills/imported` を探査する。欠落したディレクトリは空として扱われる；エラーなし。

## 公開可能 vs ローカル限定

| 公開可能 | ローカル限定 |
|-------------|------------|
| `skills/*`（キュレーション済み） | `~/.claude/skills/learned/*` |
| | `~/.claude/skills/imported/*` |
| | `~/.claude/homunculus/**/evolved/**` |

キュレーション済みスキルのみがインストールマニフェストに現れ、インストール中にコピーされます。

## 実装ロードマップ

1. ポリシードキュメントと来歴スキーマ（この変更）。
2. 新しい学習済みスキルが常に `.provenance.json` を取得するよう、学習済みスキルの書き込みパス（evaluate-session、/learn 出力）に来歴検証を追加する。
3. 進化済みスキルを生成する際にオプションの来歴を書き込むよう、instinct-cli evolve を更新する。
4. learned/imported コンテンツを含んではならないリポジトリパスのために、`scripts/validate-provenance.js` を CI に追加する（必要な場合）。
5. コントリビューターがそれらをコミットしないよう、CONTRIBUTING.md またはユーザードキュメントで learned/imported ルートを文書化する。
