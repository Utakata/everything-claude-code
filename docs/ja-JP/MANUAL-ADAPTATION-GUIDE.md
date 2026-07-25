# 非ネイティブハーネスのための手動適応ガイド

`.claude/`、`.codex/`、`.opencode/`、`.cursor/`、`.agent/` のレイアウトをネイティブにロードしないハーネス内で ECC の挙動が欲しい場合に、このガイドを使用します。

これは、システムプロンプト、アップロードされたファイル、または貼り付けられた指示を受け入れられるが、リポジトリのネイティブなインストールサーフェスを直接実行できない、Grok やその他のチャットスタイルインターフェースのようなツールのためのフォールバックパスです。

## これを使うタイミング

ターゲットハーネスが以下の場合に手動適応を使用します：

- リポジトリフォルダを自動ロードしない
- カスタムスラッシュコマンドをサポートしない
- フックをサポートしない
- リポジトリローカルなスキルアクティベーションをサポートしない
- ファイルシステム/ツールへのアクセスが部分的またはない

ファーストクラスの ECC ターゲットが存在する場合は、常にそれを優先します：

- Claude Code
- Codex
- Cursor
- OpenCode
- CodeBuddy
- Antigravity

非ネイティブハーネスで ECC の挙動が必要な場合にのみ、このガイドを使用します。

## 再現しているもの

ECC を手動で適応させるとき、あなたは4つのことを保持しようとしています：

1. リポジトリ全体を投棄するのではなく、焦点を絞ったコンテキスト。
2. モデルがワークフローを推測することを願うのではなく、スキルアクティベーションの手がかり。
3. ハーネスにスラッシュコマンドシステムがなくても、コマンドの意図。
4. ハーネスにネイティブな自動化がなくても、フックの規律。

リポジトリ内のすべてのファイルをミラーしようとしているのではありません。可能な限り小さいコンテキストバンドルで有用な挙動を再作成しようとしているのです。

## ECC ネイティブのフォールバック

リポジトリ自体からの手動選択をデフォルトにします。

実際に必要なファイルのみから始めます：

- 1つの言語またはフレームワークのスキル
- 1つのワークフロースキル
- タスクが専門的な場合は1つのドメインスキル
- ハーネスが明示的なオーケストレーションから恩恵を受ける場合のみ、1つのエージェントまたはコマンド

良い最小限の例：

- Python の機能作業：
  - `skills/python-patterns/SKILL.md`
  - `skills/tdd-workflow/SKILL.md`
  - `skills/verification-loop/SKILL.md`
- TypeScript の API 作業：
  - `skills/backend-patterns/SKILL.md`
  - `skills/security-review/SKILL.md`
  - `skills/tdd-workflow/SKILL.md`
- コンテンツ/アウトバウンドの作業：
  - `skills/brand-voice/SKILL.md`
  - `skills/content-engine/SKILL.md`
  - `skills/crosspost/SKILL.md`

ハーネスがファイルアップロードをサポートする場合は、それらのファイルのみをアップロードします。

ハーネスが貼り付けコンテキストのみをサポートする場合は、関連するセクションを抽出し、生のフルファイルではなく圧縮されたバンドルを貼り付けます。

## 手動コンテキストパッキング

これを行うのに追加のツーリングは必要ありません。

リポジトリを直接使用します：

```bash
cd /path/to/everything-claude-code

sed -n '1,220p' skills/tdd-workflow/SKILL.md > /tmp/ecc-context.md
printf '\n\n---\n\n' >> /tmp/ecc-context.md
sed -n '1,220p' skills/backend-patterns/SKILL.md >> /tmp/ecc-context.md
printf '\n\n---\n\n' >> /tmp/ecc-context.md
sed -n '1,220p' skills/security-review/SKILL.md >> /tmp/ecc-context.md
```

パッキングの前に、`rg` を使用して適切なスキルを特定することもできます：

```bash
rg -n "When to use|Use when|Trigger" skills -g 'SKILL.md'
```

オプション：`repomix` のようなリポジトリパッカーをすでに使用している場合、選択されたファイルを1つのハンドオフドキュメントに圧縮するのに役立ちます。これは便利ツールであり、正規の ECC パスではありません。

## 圧縮ルール

別のハーネス用に ECC を手動でパッキングするとき：

- タスクのフレーミングを保つ
- アクティベーション条件を保つ
- ワークフローのステップを保つ
- 重要な例を保つ
- 最初に繰り返しの散文を削除する
- 2番目に無関係な亜種を削除する
- 1〜2個のスキルで十分なときにディレクトリ全体を貼り付けるのを避ける

より緊密なプロンプト形式が必要な場合は、必須部分をコンパクトな構造化ブロックに変換します：

```xml
<skill name="tdd-workflow">
  <when>New feature, bug fix, or refactor that should be test-first.</when>
  <steps>
    <step>Write a failing test.</step>
    <step>Make it pass with the smallest change.</step>
    <step>Refactor and rerun validation.</step>
  </steps>
</skill>
```

## コマンドの再現

ハーネスにスラッシュコマンドシステムがない場合は、システムプロンプトまたはセッションプリアンブルに小さなコマンドレジストリを定義します。

例：

```text
Command registry:
- /plan -> use planner-style reasoning, produce a short execution plan, then act
- /tdd -> follow the tdd-workflow skill
- /review -> switch into code-review mode and enumerate findings first
- /verify -> run a verification loop before claiming completion
```

実際のコマンドを実装しているのではありません。ECC の挙動にマップされる明示的な呼び出しハンドルをハーネスに与えているのです。

## フックの再現

ハーネスにネイティブフックがない場合は、フックの意図を常設の指示に移します。

例：

```text
Before writing code:
1. Check whether a relevant skill should be activated.
2. Check for security-sensitive changes.
3. Prefer tests before implementation when feasible.

Before finalizing:
1. Re-read the user request.
2. Verify the main changed paths.
3. State what was actually validated and what was not.
```

それは真の自動化を再作成しませんが、ECC の運用上の規律をキャプチャします。

## ハーネスケイパビリティマトリックス

| ケイパビリティ | ファーストクラスの ECC ターゲット | 手動適応のターゲット |
| --- | --- | --- |
| フォルダベースのインストール | Native | No |
| スラッシュコマンド | Native | プロンプトでシミュレート |
| フック | Native | プロンプトでシミュレート |
| スキルアクティベーション | Native | 手動 |
| リポジトリローカルのツーリング | Native | ハーネス次第 |
| コンテキストパッキング | オプション | 必須 |

## 実践的な Grok スタイルのセットアップ

1. 最小の有用なバンドルを選ぶ。
2. 選択された ECC スキルファイルを1つのアップロードまたは貼り付けブロックにパックする。
3. 短いコマンドレジストリを追加する。
4. 常設の「フック意図」の指示を追加する。
5. 1つのタスクから始め、スケールアップする前にハーネスがワークフローに従うことを検証する。

スタータープリアンブルの例：

```text
You are operating with a manually adapted ECC bundle.

Active skills:
- backend-patterns
- tdd-workflow
- security-review

Command registry:
- /plan
- /tdd
- /verify

Before writing code, follow the active skill instructions.
Before finalizing, verify what changed and report any remaining gaps.
```

## 制限

手動適応は有用ですが、ネイティブターゲットと比較すると依然としてセカンドクラスです。

以下を失います：

- 自動インストールと同期
- ネイティブのフック実行
- 真のコマンドの配管
- ランタイムでの信頼できるスキル発見
- 組み込みのマルチエージェント/ワークツリーのオーケストレーション

したがって、ルールはシンプルです：

- 非ネイティブハーネスに ECC の挙動を持ち込むには手動適応を使用する
- フルシステムが欲しいときは、常にネイティブの ECC ターゲットを使用する

## 関連作業

- [Issue #1186](https://github.com/affaan-m/everything-claude-code/issues/1186)
- [Discussion #1077](https://github.com/affaan-m/everything-claude-code/discussions/1077)
- [Antigravity ガイド](./ANTIGRAVITY-GUIDE.md)
- [トラブルシューティング](./TROUBLESHOOTING.md)
