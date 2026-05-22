# Everything Claude Code (ECC) — Agent Instructions

これは、ソフトウェア開発のための60個の特化型エージェント、231個のスキル、75個のコマンド、および自動化されたフックワークフローを提供する**本番環境対応のAIコーディングプラグイン**である。

**Version:** 2.0.0-rc.1

## Core Principles

1. **Agent-First** — ドメインタスクのために特化型エージェントに委任する
2. **Test-Driven** — 実装の前にテストを書く。80%以上のカバレッジが必須である
3. **Security-First** — セキュリティを決して妥協しない。すべての入力を検証する
4. **Immutability** — 常に新しいオブジェクトを作成し、既存のオブジェクトを決して変更しない
5. **Plan Before Execute** — コードを書く前に複雑な機能を計画する

## Available Agents

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| planner | 実装計画 | 複雑な機能、リファクタリング |
| architect | システム設計とスケーラビリティ | アーキテクチャの決定 |
| tdd-guide | テスト駆動開発 | 新機能、バグ修正 |
| code-reviewer | コードの品質と保守性 | コードの記述/変更後 |
| security-reviewer | 脆弱性の検出 | コミット前、機密コード |
| build-error-resolver | ビルド/型エラーの修正 | ビルドが失敗した時 |
| e2e-runner | Playwrightによるエンドツーエンドテスト | 重要なユーザーフロー |
| refactor-cleaner | デッドコードのクリーンアップ | コードの保守 |
| doc-updater | ドキュメントとコードマップ | ドキュメントの更新 |
| cpp-reviewer | C/C++のコードレビュー | CおよびC++プロジェクト |
| cpp-build-resolver | C/C++のビルドエラー | CおよびC++のビルド失敗 |
| fsharp-reviewer | F#の関数型コードレビュー | F#プロジェクト |
| docs-lookup | Context7を介したドキュメント検索 | API/ドキュメントの質問 |
| go-reviewer | Goのコードレビュー | Goプロジェクト |
| go-build-resolver | Goのビルドエラー | Goのビルド失敗 |
| kotlin-reviewer | Kotlinのコードレビュー | Kotlin/Android/KMPプロジェクト |
| kotlin-build-resolver | Kotlin/Gradleのビルドエラー | Kotlinのビルド失敗 |
| database-reviewer | PostgreSQL/Supabaseスペシャリスト | スキーマ設計、クエリ最適化 |
| python-reviewer | Pythonのコードレビュー | Pythonプロジェクト |
| django-reviewer | Djangoのコードレビュー | Djangoアプリ、DRF API、ORM、マイグレーション |
| django-build-resolver | Djangoのビルド、マイグレーション、およびセットアップエラー | Djangoの起動、依存関係、マイグレーション、collectstaticの失敗 |
| java-reviewer | JavaおよびSpring Bootのコードレビュー | Java/Spring Bootプロジェクト |
| java-build-resolver | Java/Maven/Gradleのビルドエラー | Javaのビルド失敗 |
| loop-operator | 自律ループ実行 | ループを安全に実行し、ストールを監視し、介入する |
| harness-optimizer | ハーネス設定のチューニング | 信頼性、コスト、スループット |
| rust-reviewer | Rustのコードレビュー | Rustプロジェクト |
| rust-build-resolver | Rustのビルドエラー | Rustのビルド失敗 |
| pytorch-build-resolver | PyTorchランタイム/CUDA/トレーニングエラー | PyTorchのビルド/トレーニング失敗 |
| mle-reviewer | 本番MLパイプラインレビュー | MLパイプライン、評価、サービング、監視、ロールバック |
| typescript-reviewer | TypeScript/JavaScriptのコードレビュー | TypeScript/JavaScriptプロジェクト |

## Agent Orchestration

ユーザーのプロンプトなしで自発的にエージェントを使用すること:
- 複雑な機能要求 → **planner**
- 書いたばかり/変更したばかりのコード → **code-reviewer**
- バグ修正または新機能 → **tdd-guide**
- アーキテクチャの決定 → **architect**
- セキュリティに敏感なコード → **security-reviewer**
- 自律ループ / ループ監視 → **loop-operator**
- ハーネス設定の信頼性とコスト → **harness-optimizer**

独立した操作には並列実行を使用すること — 複数のエージェントを同時に起動する。

## Security Guidelines

**いかなるコミットの前にも:**
- シークレット（APIキー、パスワード、トークン）をハードコードしないこと
- すべてのユーザー入力が検証されていること
- SQLインジェクションの防止（パラメータ化されたクエリ）
- XSSの防止（サニタイズされたHTML）
- CSRF保護が有効であること
- 認証/認可が検証されていること
- すべてのエンドポイントでのレート制限
- エラーメッセージが機密データを漏洩しないこと

**Secret management:** シークレットを決してハードコードしないこと。環境変数またはシークレットマネージャーを使用すること。起動時に必須のシークレットを検証すること。露出したシークレットは直ちにローテーションすること。

**セキュリティ問題が見つかった場合:** 停止する → security-reviewerエージェントを使用する → クリティカルな問題を修正する → 露出したシークレットをローテーションする → 同様の問題がないかコードベースをレビューする。

## Coding Style

**Immutability (CRITICAL):** 常に新しいオブジェクトを作成し、決して変更しないこと。変更が適用された新しいコピーを返すこと。

**File organization:** 少ない大きなファイルよりも多くの小さなファイルを優先する。通常は200〜400行、最大で800行とする。種類ではなく、機能/ドメインによって整理すること。高凝集度、低結合度。

**Error handling:** すべてのレベルでエラーを処理すること。UIコードではユーザーフレンドリーなメッセージを提供すること。サーバー側では詳細なコンテキストを記録すること。エラーを静かに飲み込まないこと。

**Input validation:** システム境界ですべてのユーザー入力を検証すること。スキーマベースの検証を使用すること。明確なメッセージとともにフェイルファストすること。外部データを決して信用しないこと。

**Code quality checklist:**
- 関数は小さく（50行未満）、ファイルは焦点を絞っている（800行未満）
- 深いネスト（4レベル以上）がない
- 適切なエラー処理があり、ハードコードされた値がない
- 読みやすく、適切な名前の識別子

## Testing Requirements

**最小カバレッジ: 80%**

テストタイプ（すべて必須）:
1. **Unit tests** — 個々の関数、ユーティリティ、コンポーネント
2. **Integration tests** — APIエンドポイント、データベース操作
3. **E2E tests** — 重要なユーザーフロー

**TDD workflow (必須):**
1. 最初にテストを書く (RED) — テストは失敗するはずである
2. 最小限の実装を書く (GREEN) — テストは合格するはずである
3. リファクタリング (IMPROVE) — 80%以上のカバレッジを検証する

障害のトラブルシューティング: テストの分離を確認する → モックを検証する → （テストが間違っていない限り）テストではなく実装を修正する。

## Development Workflow

1. **Plan** — plannerエージェントを使用し、依存関係とリスクを特定し、フェーズに分割する
2. **TDD** — tdd-guideエージェントを使用し、最初にテストを書き、実装し、リファクタリングする
3. **Review** — すぐにcode-reviewerエージェントを使用し、クリティカル/高い問題に対処する
4. **適切な場所で知識をキャプチャする**
   - 個人のデバッグメモ、好み、および一時的なコンテキスト → 自動メモリ
   - チーム/プロジェクトの知識（アーキテクチャの決定、APIの変更、ランブック） → プロジェクトの既存のドキュメント構造
   - 現在のタスクがすでに適切なドキュメントやコードコメントを生成している場合、同じ情報を他の場所で複製しないこと
   - 明確なプロジェクトドキュメントの場所がない場合は、新しいトップレベルファイルを作成する前に尋ねること
5. **Commit** — Conventional commits形式、包括的なPRサマリー

## Workflow Surface Policy

- `skills/` は正規のワークフローサーフェスである。
- 新しいワークフローのコントリビューションは、まず `skills/` に着地させるべきである。
- `commands/` はレガシーなスラッシュエントリの互換性サーフェスであり、移行またはクロスハーネスのパリティのためにシムがまだ必要な場合にのみ追加または更新されるべきである。

## Git Workflow

**Commit format:** `<type>: <description>` — Types: feat, fix, refactor, docs, test, chore, perf, ci

**PR workflow:** コミット履歴全体を分析する → 包括的なサマリーを起草する → テスト計画を含める → `-u` フラグを使用してプッシュする。

## Architecture Patterns

**API response format:** 成功インジケーター、データペイロード、エラーメッセージ、およびページネーションメタデータを備えた一貫したエンベロープ。

**Repository pattern:** 標準インターフェース（findAll、findById、create、update、delete）の背後にデータアクセスをカプセル化する。ビジネスロジックはストレージメカニズムではなく、抽象インターフェースに依存する。

**Skeleton projects:** 実戦テスト済みのテンプレートを検索し、並行するエージェント（セキュリティ、拡張性、関連性）で評価し、最も一致するものをクローンし、証明された構造内でイテレーションを行う。

## Performance

**Context management:** 大規模なリファクタリングや複数ファイルの機能において、コンテキストウィンドウの最後の20%の使用を避ける。機密性の低いタスク（単一の編集、ドキュメント、単純な修正）は、より高い使用率を許容する。

**Build troubleshooting:** build-error-resolverエージェントを使用する → エラーを分析する → 段階的に修正する → 各修正後に検証する。

## Project Structure

```
agents/          — 60の特化型サブエージェント
skills/          — 231のワークフロースキルとドメイン知識
commands/        — 75のスラッシュコマンド
hooks/           — トリガーベースの自動化
rules/           — 常に従うべきガイドライン（共通 + 言語別）
scripts/         — クロスプラットフォームのNode.jsユーティリティ
mcp-configs/     — 14のMCPサーバー設定
tests/           — テストスイート
```

`commands/` は互換性のためにリポジトリに残っているが、長期的な方向性はスキルファーストである。

## Success Metrics

- すべてのテストが80%以上のカバレッジで合格する
- セキュリティ脆弱性がない
- コードが読みやすく保守可能である
- パフォーマンスが許容範囲である
- ユーザーの要件が満たされている
