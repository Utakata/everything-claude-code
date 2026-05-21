# Everything Claude Code (ECC) — Agent Instructions

これは、60の専門的なagents、231のskills、75のコマンド、およびソフトウェア開発のための自動化されたhookワークフローを提供する**本番環境対応のAIコーディングプラグイン**である。

**Version:** 2.0.0-rc.1

## Core Principles

1. **Agent-First** — ドメインのタスクを専門のagentsに委任する
2. **Test-Driven** — 実装の前にテストを書く。80%以上のカバレッジが必須である
3. **Security-First** — セキュリティを決して妥協しない。すべての入力を検証する
4. **Immutability** — 常に新しいオブジェクトを作成し、既存のものを決して変更（mutate）しない
5. **Plan Before Execute** — コードを書く前に複雑な機能の計画を立てる

## Available Agents

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| planner | 実装計画 | 複雑な機能、リファクタリング |
| architect | システム設計とスケーラビリティ | アーキテクチャの決定 |
| tdd-guide | テスト駆動開発 | 新機能、バグ修正 |
| code-reviewer | コードの品質と保守性 | コードを記述/変更した後 |
| security-reviewer | 脆弱性の検出 | コミット前、機密性の高いコード |
| build-error-resolver | ビルド/型エラーの修正 | ビルドが失敗したとき |
| e2e-runner | E2EのPlaywrightテスト | 重要なユーザーフロー |
| refactor-cleaner | デッドコードのクリーンアップ | コードのメンテナンス |
| doc-updater | ドキュメントとコードマップ | ドキュメントの更新 |
| cpp-reviewer | C/C++のコードレビュー | CおよびC++プロジェクト |
| cpp-build-resolver | C/C++のビルドエラー | CおよびC++のビルド失敗 |
| fsharp-reviewer | F#の関数型コードレビュー | F#プロジェクト |
| docs-lookup | Context7経由でのドキュメント検索 | API/ドキュメントの質問 |
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
| loop-operator | 自律的なループ実行 | ループを安全に実行し、ストールを監視し、介入する |
| harness-optimizer | ハーネス設定のチューニング | 信頼性、コスト、スループット |
| rust-reviewer | Rustのコードレビュー | Rustプロジェクト |
| rust-build-resolver | Rustのビルドエラー | Rustのビルド失敗 |
| pytorch-build-resolver | PyTorchランタイム/CUDA/トレーニングエラー | PyTorchのビルド/トレーニングの失敗 |
| mle-reviewer | 本番MLパイプラインのレビュー | MLパイプライン、評価(evals)、サービング、監視、ロールバック |
| typescript-reviewer | TypeScript/JavaScriptのコードレビュー | TypeScript/JavaScriptプロジェクト |

## Agent Orchestration

ユーザーのプロンプトなしでプロアクティブにagentsを使用する:
- 複雑な機能の要求 → **planner**
- 書いたばかり/変更したばかりのコード → **code-reviewer**
- バグ修正または新機能 → **tdd-guide**
- アーキテクチャの決定 → **architect**
- セキュリティに敏感なコード → **security-reviewer**
- 自律的なループ / ループの監視 → **loop-operator**
- ハーネス設定の信頼性とコスト → **harness-optimizer**

独立した操作には並列実行を使用する — 複数のagentsを同時に起動する。

## Security Guidelines

**いかなるコミットの前にも:**
- シークレット（APIキー、パスワード、トークン）をハードコードしない
- すべてのユーザー入力が検証されていること
- SQLインジェクションの防止（パラメータ化されたクエリ）
- XSSの防止（サニタイズされたHTML）
- CSRF保護が有効であること
- 認証/認可が検証されていること
- すべてのエンドポイントでのレート制限
- エラーメッセージが機密データを漏洩しないこと

**Secret management:** シークレットを絶対にハードコードしない。環境変数またはシークレットマネージャーを使用する。起動時に必要なシークレットを検証する。露出したシークレットは直ちにローテーションする。

**セキュリティ問題が見つかった場合:** STOP → security-reviewer agentを使用する → CRITICALな問題を修正する → 露出したシークレットをローテーションする → 同様の問題がないかコードベースをレビューする。

## Coding Style

**Immutability (CRITICAL):** 常に新しいオブジェクトを作成し、決して変更（mutate）しない。変更を適用した新しいコピーを返すこと。

**File organization:** 少ない大きなファイルよりも、多くの小さなファイルを優先する。200〜400行が標準的で、最大800行。タイプごとではなく、機能/ドメインごとに整理する。高凝集、低結合。

**Error handling:** あらゆるレベルでエラーを処理する。UIコードではユーザーフレンドリーなメッセージを提供する。サーバー側では詳細なコンテキストをログに記録する。エラーを暗黙のうちに飲み込まないこと。

**Input validation:** システムの境界ですべてのユーザー入力を検証する。スキーマベースの検証を使用する。明確なメッセージと共にフェイルファスト（fail fast）する。外部データを決して信用しないこと。

**Code quality checklist:**
- 関数は小さく（<50行）、ファイルは焦点を絞っている（<800行）
- 深いネストがない（>4レベル）
- 適切なエラー処理、ハードコードされた値がない
- 読みやすく、適切な名前の識別子

## Testing Requirements

**最小カバレッジ: 80%**

テストタイプ（すべて必須）:
1. **Unit tests** — 個々の関数、ユーティリティ、コンポーネント
2. **Integration tests** — APIエンドポイント、データベース操作
3. **E2E tests** — 重要なユーザーフロー

**TDD workflow (mandatory):**
1. 最初にテストを書く (RED) — テストはFAILすること
2. 最小限の実装を書く (GREEN) — テストはPASSすること
3. リファクタリング (IMPROVE) — カバレッジが80%以上であることを確認する

失敗のトラブルシューティング: テストの分離を確認する → モックを検証する → 実装を修正する（テストが間違っていない限り、テストは修正しない）。

## Development Workflow

1. **Plan** — planner agentを使用し、依存関係とリスクを特定し、フェーズに分割する
2. **TDD** — tdd-guide agentを使用し、最初にテストを書き、実装し、リファクタリングする
3. **Review** — すぐにcode-reviewer agentを使用し、CRITICAL/HIGHな問題に対処する
4. **適切な場所に知識をキャプチャする**
   - 個人的なデバッグのメモ、好み、および一時的なコンテキスト → 自動メモリ
   - チーム/プロジェクトの知識（アーキテクチャの決定、APIの変更、ランブック） → プロジェクトの既存のドキュメント構造
   - 現在のタスクがすでに関連するドキュメントやコードコメントを生成している場合、同じ情報を別の場所に重複させないこと
   - 明確なプロジェクトのドキュメントの場所がない場合は、新しいトップレベルのファイルを作成する前に尋ねること
5. **Commit** — Conventional commitsのフォーマット、包括的なPRの要約

## Workflow Surface Policy

- `skills/` は正規のワークフローサーフェスである。
- 新しいワークフローの貢献は、まず`skills/`に着地させるべきである。
- `commands/` はレガシーなスラッシュエントリの互換性サーフェスであり、移行またはクロスハーネスのパリティのためにシムがまだ必要な場合にのみ追加または更新されるべきである。

## Git Workflow

**Commit format:** `<type>: <description>` — Types: feat, fix, refactor, docs, test, chore, perf, ci

**PR workflow:** コミット履歴全体を分析する → 包括的な要約のドラフトを作成する → テスト計画を含める → `-u`フラグ付きでプッシュする。

## Architecture Patterns

**API response format:** 成功インジケーター、データペイロード、エラーメッセージ、およびページネーションメタデータを含む一貫したエンベロープ。

**Repository pattern:** データアクセスを標準インターフェース（findAll, findById, create, update, delete）の背後にカプセル化する。ビジネスロジックはストレージメカニズムではなく、抽象インターフェースに依存する。

**Skeleton projects:** 実戦でテストされたテンプレートを検索し、並列agents（セキュリティ、拡張性、関連性）で評価し、最も適したものをクローンし、証明された構造内でイテレーションを行う。

## Performance

**Context management:** 大規模なリファクタリングや複数ファイルの機能において、コンテキストウィンドウの最後の20%を使用するのは避ける。感度の低いタスク（単一の編集、ドキュメント、単純な修正）は、より高い使用率を許容する。

**Build troubleshooting:** build-error-resolver agentを使用する → エラーを分析する → 段階的に修正する → 各修正の後に検証する。

## Project Structure

```
agents/          — 60の専門的なサブエージェント
skills/          — 231のワークフローskillsとドメイン知識
commands/        — 75のスラッシュコマンド
hooks/           — トリガーベースの自動化
rules/           — 常に従うべきガイドライン (common + per-language)
scripts/         — クロスプラットフォームのNode.jsユーティリティ
mcp-configs/     — 14のMCPサーバー設定
tests/           — テストスイート
```

`commands/` は互換性のためにリポジトリに残っているが、長期的な方向性はskills-firstである。

## Success Metrics

- すべてのテストが80%以上のカバレッジでパスする
- セキュリティの脆弱性がない
- コードが読みやすく、保守可能である
- パフォーマンスが許容範囲内である
- ユーザーの要件が満たされている
