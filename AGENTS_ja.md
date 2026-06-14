# Everything Claude Code (ECC) — Agent Instructions

これは**本番環境対応のAIコーディングプラグイン**であり、ソフトウェア開発向けに60の特化型エージェント、231のスキル、75のコマンド、および自動化されたフックワークフローを提供する。

**バージョン:** 2.0.0-rc.1

## Core Principles

1. **Agent-First** — ドメインタスクは特化型エージェントに委譲する
2. **Test-Driven** — 実装前にテストを書く。80%以上のカバレッジを要求する
3. **Security-First** — セキュリティを決して妥協しない。すべての入力を検証する
4. **Immutability** — 常に新しいオブジェクトを作成し、既存のものを決して変異させない
5. **Plan Before Execute** — コードを書く前に複雑な機能の計画を立てる

## Available Agents

| エージェント | 目的 | いつ使うか |
|-------|---------|-------------|
| planner | 実装計画 | 複雑な機能、リファクタリング |
| architect | システム設計とスケーラビリティ | アーキテクチャの決定 |
| tdd-guide | テスト駆動開発 | 新機能、バグ修正 |
| code-reviewer | コードの品質と保守性 | コードの記述/修正後 |
| security-reviewer | 脆弱性検出 | コミット前、機密コード |
| build-error-resolver | ビルド/型エラーの修正 | ビルド失敗時 |
| e2e-runner | エンドツーエンドのPlaywrightテスト | 重要なユーザーフロー |
| refactor-cleaner | デッドコードのクリーンアップ | コードの保守 |
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
| loop-operator | 自律型ループの実行 | ループの安全な実行、ストールの監視、介入 |
| harness-optimizer | ハーネス構成のチューニング | 信頼性、コスト、スループット |
| rust-reviewer | Rustのコードレビュー | Rustプロジェクト |
| rust-build-resolver | Rustのビルドエラー | Rustのビルド失敗 |
| pytorch-build-resolver | PyTorchランタイム/CUDA/トレーニングエラー | PyTorchのビルド/トレーニングの失敗 |
| mle-reviewer | 本番MLパイプラインのレビュー | MLパイプライン、評価、サービング、監視、ロールバック |
| typescript-reviewer | TypeScript/JavaScriptのコードレビュー | TypeScript/JavaScriptプロジェクト |

## Agent Orchestration

ユーザーのプロンプトなしで自発的にエージェントを使用する：
- 複雑な機能リクエスト → **planner**
- 書いたばかり/修正したばかりのコード → **code-reviewer**
- バグ修正または新機能 → **tdd-guide**
- アーキテクチャの決定 → **architect**
- セキュリティに敏感なコード → **security-reviewer**
- 自律型ループ / ループ監視 → **loop-operator**
- ハーネス構成の信頼性とコスト → **harness-optimizer**

独立した操作には並列実行を使用する — 複数のエージェントを同時に起動する。

## Security Guidelines

**いかなるコミットの前にも：**
- ハードコードされたシークレット（APIキー、パスワード、トークン）がないこと
- すべてのユーザー入力が検証されていること
- SQLインジェクションの防止（パラメータ化されたクエリ）
- XSSの防止（サニタイズされたHTML）
- CSRF保護が有効であること
- 認証/認可が検証されていること
- すべてのエンドポイントでのレート制限
- エラーメッセージが機密データを漏洩しないこと

**シークレット管理:** シークレットを決してハードコードしない。環境変数またはシークレットマネージャーを使用する。起動時に必要なシークレットを検証する。露出したシークレットは直ちにローテーションする。

**セキュリティ問題が見つかった場合:** 停止 → security-reviewerエージェントを使用する → クリティカルな問題を修正する → 露出したシークレットをローテーションする → 同様の問題がないかコードベースをレビューする。

## Coding Style

**Immutability (CRITICAL):** 常に新しいオブジェクトを作成し、決して変異させない。変更を適用した新しいコピーを返す。

**ファイル構成:** 少数の大きなファイルよりも、多数の小さなファイルを優先する。通常200〜400行、最大800行。型ではなく、機能/ドメインで整理する。高凝集、低結合。

**エラー処理:** すべてのレベルでエラーを処理する。UIコードではユーザーフレンドリーなメッセージを提供する。サーバー側では詳細なコンテキストをログに記録する。エラーを決して暗黙のうちに飲み込まない。

**入力検証:** システムの境界ですべてのユーザー入力を検証する。スキーマベースの検証を使用する。明確なメッセージと共にフェイルファストする。外部データを決して信用しない。

**コード品質チェックリスト:**
- 関数は小さく（50行未満）、ファイルは焦点が絞られている（800行未満）
- 深いネスト（4レベル以上）がない
- 適切なエラー処理、ハードコードされた値がない
- 読みやすく、適切な名前の識別子

## Testing Requirements

**最小カバレッジ: 80%**

テストタイプ（すべて必須）：
1. **ユニットテスト** — 個々の関数、ユーティリティ、コンポーネント
2. **統合テスト** — APIエンドポイント、データベース操作
3. **E2Eテスト** — 重要なユーザーフロー

**TDDワークフロー（必須）：**
1. 最初にテストを書く (RED) — テストは失敗するはずである
2. 最小限の実装を書く (GREEN) — テストは合格するはずである
3. リファクタリング (IMPROVE) — カバレッジが80%以上であることを検証する

失敗のトラブルシューティング: テストの分離を確認する → モックを検証する → 実装を修正する（テストが間違っていない限り、テストは修正しない）。

## Development Workflow

1. **Plan** — plannerエージェントを使用し、依存関係とリスクを特定し、フェーズに分割する
2. **TDD** — tdd-guideエージェントを使用し、最初にテストを書き、実装し、リファクタリングする
3. **Review** — 直ちにcode-reviewerエージェントを使用し、クリティカル/ハイレベルの問題に対処する
4. **Capture knowledge in the right place**
   - 個人のデバッグメモ、好み、一時的なコンテキスト → auto memory
   - チーム/プロジェクトの知識（アーキテクチャの決定、APIの変更、ランブック） → プロジェクトの既存のドキュメント構造
   - 現在のタスクがすでに関連するドキュメントやコードコメントを生成している場合、同じ情報を別の場所に重複させない
   - 明確なプロジェクトドキュメントの場所がない場合は、新しいトップレベルファイルを作成する前に質問する
5. **Commit** — 規約に沿ったコミット形式、包括的なプルリクエストの要約

## Workflow Surface Policy

- `skills/` は正規のワークフローサーフェスである。
- 新しいワークフローの貢献は、まず `skills/` に着地させるべきである。
- `commands/` はレガシーなスラッシュエントリの互換性サーフェスであり、マイグレーションやクロスハーネスのパリティのためにシムがまだ必要な場合にのみ追加または更新されるべきである。

## Git Workflow

**コミット形式:** `<type>: <description>` — Types: feat, fix, refactor, docs, test, chore, perf, ci

**PRワークフロー:** 完全なコミット履歴を分析する → 包括的な要約のドラフトを作成する → テスト計画を含める → `-u` フラグを付けてプッシュする。

## Architecture Patterns

**API応答形式:** 成功インジケーター、データペイロード、エラーメッセージ、およびページネーションメタデータを含む一貫したエンベロープ。

**リポジトリパターン:** 標準インターフェース（findAll, findById, create, update, delete）の背後にデータアクセスをカプセル化する。ビジネスロジックはストレージメカニズムではなく、抽象化されたインターフェースに依存する。

**スケルトンプロジェクト:** 実戦でテストされたテンプレートを検索し、並行するエージェント（セキュリティ、拡張性、関連性）で評価し、最適なものをクローンし、実績のある構造の中で反復する。

## Performance

**コンテキスト管理:** 大規模なリファクタリングや複数ファイルの機能において、コンテキストウィンドウの最後の20%を避ける。機密性の低いタスク（単一の編集、ドキュメント、簡単な修正）は、より高い使用率を許容する。

**ビルドのトラブルシューティング:** build-error-resolverエージェントを使用する → エラーを分析する → 段階的に修正する → 各修正後に検証する。

## Project Structure

```
agents/          — 60 specialized subagents
skills/          — 231 workflow skills and domain knowledge
commands/        — 75 slash commands
hooks/           — Trigger-based automations
rules/           — Always-follow guidelines (common + per-language)
scripts/         — Cross-platform Node.js utilities
mcp-configs/     — 14 MCP server configurations
tests/           — Test suite
```

`commands/` は互換性のためにリポジトリに残っているが、長期的な方向性はスキルファーストである。

## Success Metrics

- すべてのテストが80%以上のカバレッジで合格する
- セキュリティの脆弱性がない
- コードが読みやすく、保守可能である
- パフォーマンスが許容範囲内である
- ユーザー要件が満たされている
