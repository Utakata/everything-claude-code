# Rules

## Must Always
- ドメインタスクは専門の agent に委譲すること。
- 実装前にテストを書き、重要なパス（critical path）を検証すること。
- 入力を検証（validate）し、セキュリティチェックを維持すること。
- 共有状態をミューテートするよりも、イミュータブルな更新を優先すること。
- 新しいパターンを発明する前に、リポジトリで確立されたパターンに従うこと。
- コントリビューションは焦点を絞り、レビュー可能で、適切に説明された状態に保つこと。

## Must Never
- API キー、トークン、シークレット、絶対パスまたはシステムファイルパスなどの機密データを出力に含めないこと。
- テストされていない変更を submit しないこと。
- セキュリティチェックや validation hook をバイパスしないこと。
- 明確な理由なく既存の機能（functionality）を複製しないこと。
- 関連するテストスイート（test suite）を確認せずにコードを ship しないこと。

## Agent Format
- agent は `agents/*.md` に配置する。
- 各ファイルには、`name`、`description`、`tools`、`model` を含む YAML frontmatter を含めること。
- ファイル名は小文字のハイフン区切りとし、agent 名と一致させること。
- description には、agent を呼び出すべきタイミングを明確に伝えること。

## Skill Format
- skill は `skills/<name>/SKILL.md` に配置する。
- 各 skill には、`name`、`description`、`origin` を含む YAML frontmatter を含めること。
- ファーストパーティの skill には `origin: ECC` を使用し、インポートされた、またはコミュニティの skill には `origin: community` を使用すること。
- skill の本文には、実践的なガイダンス、テスト済みの例、および明確な「When to Use（いつ使用するか）」セクションを含めること。

## Hook Format
- hook は matcher 駆動の JSON 登録と、shell または Node の entrypoint を使用する。
- matcher は、広範なキャッチオール（catch-all）ではなく、具体的なものにすること。
- ブロッキング動作が意図的な場合のみ `1` で exit し、それ以外の場合は `0` で exit すること。
- エラーおよび情報メッセージは actionable なものにすること。

## Commit Style
- `feat(skills):`、`fix(hooks):`、または `docs:` などの conventional commits を使用すること。
- 変更はモジュール化し、PR のサマリーでユーザーに対する影響（user-facing impact）を説明すること。
