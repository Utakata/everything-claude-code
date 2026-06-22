# Everything Claude Code (ECC) — Agent Instructions

This is a **production-ready AI coding plugin** providing 60 specialized agents, 231 skills, 75 commands, and automated hook workflows for software development.

**Version:** 2.0.0-rc.1

## Core Principles

1. **Agent-First** — ドメインタスクは特化した Agent に委譲すること
2. **Test-Driven** — 実装前にテストを記述すること。80%以上のカバレッジが必須である
3. **Security-First** — セキュリティを決して妥協しないこと。すべての入力をバリデーションすること
4. **Immutability** — 常に新しいオブジェクトを作成し、既存のものを決してミューテート（変更）しないこと
5. **Plan Before Execute** — コードを書く前に複雑な機能の計画を立てること

## Available Agents

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| planner | 実装計画 | 複雑な機能、Refactoring |
| architect | システム設計とスケーラビリティ | アーキテクチャの決定 |
| tdd-guide | テスト駆動開発 | 新機能、バグ修正 |
| code-reviewer | コードの品質と保守性 | コードの記述/変更後 |
| security-reviewer | 脆弱性の検出 | コミット前、機密性の高いコード |
| build-error-resolver | ビルド/型エラーの修正 | ビルド失敗時 |
| e2e-runner | エンドツーエンドの Playwright テスト | 重要なユーザーフロー |
| refactor-cleaner | デッドコードのクリーンアップ | コードの保守 |
| doc-updater | ドキュメントとコードマップ | ドキュメントの更新 |
| cpp-reviewer | C/C++ のコードレビュー | C および C++ プロジェクト |
| cpp-build-resolver | C/C++ のビルドエラー | C および C++ のビルド失敗時 |
| fsharp-reviewer | F# 関数型コードのレビュー | F# プロジェクト |
| docs-lookup | Context7 を介したドキュメント検索 | API/ドキュメントの質問 |
| go-reviewer | Go のコードレビュー | Go プロジェクト |
| go-build-resolver | Go のビルドエラー | Go のビルド失敗時 |
| kotlin-reviewer | Kotlin のコードレビュー | Kotlin/Android/KMP プロジェクト |
| kotlin-build-resolver | Kotlin/Gradle のビルドエラー | Kotlin のビルド失敗時 |
| database-reviewer | PostgreSQL/Supabase スペシャリスト | スキーマ設計、クエリ最適化 |
| python-reviewer | Python のコードレビュー | Python プロジェクト |
| django-reviewer | Django のコードレビュー | Django アプリ、DRF API、ORM、マイグレーション |
| django-build-resolver | Django のビルド、マイグレーション、およびセットアップエラー | Django の起動、依存関係、マイグレーション、collectstatic の失敗時 |
| java-reviewer | Java および Spring Boot のコードレビュー | Java/Spring Boot プロジェクト |
| java-build-resolver | Java/Maven/Gradle のビルドエラー | Java のビルド失敗時 |
| loop-operator | 自律的なループ実行 | ループを安全に実行、ストールの監視、介入 |
| harness-optimizer | Harness 構成のチューニング | 信頼性、コスト、スループット |
| rust-reviewer | Rust のコードレビュー | Rust プロジェクト |
| rust-build-resolver | Rust のビルドエラー | Rust のビルド失敗時 |
| pytorch-build-resolver | PyTorch ランタイム/CUDA/トレーニングエラー | PyTorch のビルド/トレーニング失敗時 |
| mle-reviewer | 本番環境の ML Pipeline レビュー | ML Pipeline、評価、サービング、監視、ロールバック |
| typescript-reviewer | TypeScript/JavaScript のコードレビュー | TypeScript/JavaScript プロジェクト |

## Agent Orchestration

ユーザーのプロンプトなしで自発的に Agent を使用すること：
- 複雑な機能リクエスト → **planner**
- コードを記述/変更した直後 → **code-reviewer**
- バグ修正または新機能 → **tdd-guide**
- アーキテクチャの決定 → **architect**
- セキュリティに敏感なコード → **security-reviewer**
- 自律的なループ / ループの監視 → **loop-operator**
- Harness 構成の信頼性とコスト → **harness-optimizer**

独立した操作には並列実行を使用すること — 複数の Agent を同時に起動する。

## Security Guidelines

**ANY commitの前に：**
- ハードコードされたシークレット（APIキー、パスワード、トークン）がないこと
- すべてのユーザー入力がバリデーションされていること
- SQLインジェクションの防止（パラメータ化されたクエリ）
- XSSの防止（サニタイズされたHTML）
- CSRF保護が有効であること
- 認証/認可が検証されていること
- すべての Endpoint にレート制限があること
- エラーメッセージが機密データを漏洩しないこと

**シークレット管理:** シークレットを絶対にハードコードしないこと。環境変数またはシークレットマネージャーを使用すること。起動時に必要なシークレットを検証すること。露出したシークレットは直ちにローテーションすること。

**セキュリティの問題が見つかった場合:** 停止 → security-reviewer Agent を使用 → CRITICAL な問題を修正 → 露出したシークレットをローテーション → 同様の問題がないかコードベースをレビューする。

## Coding Style

**Immutability (CRITICAL):** 常に新しいオブジェクトを作成し、決してミューテートしないこと。変更を適用した新しいコピーを返すこと。

**ファイル構成:** 少数の大きなファイルよりも多数の小さなファイル。通常200〜400行、最大800行。タイプごとではなく、機能/ドメインごとに整理すること。高凝集、低結合。

**エラー処理:** すべてのレベルでエラーを処理すること。UIコードではユーザーフレンドリーなメッセージを提供すること。サーバー側では詳細なコンテキストを記録すること。エラーを静かに飲み込んで（握り潰して）はならない。

**入力のバリデーション:** システム境界ですべてのユーザー入力をバリデーションすること。スキーマベースのバリデーションを使用すること。明確なメッセージでフェイルファスト（Fail fast）すること。外部データを決して信用しないこと。

**コード品質チェックリスト:**
- 関数は小さく（50行未満）、ファイルは焦点を絞る（800行未満）
- 深いネストがない（4レベルまで）
- 適切なエラー処理、ハードコードされた値がない
- 読みやすく、適切な名前の識別子

## Testing Requirements

**最小 Coverage: 80%**

テストタイプ（すべて必須）：
1. **Unit tests** — 個別の関数、ユーティリティ、コンポーネント
2. **Integration tests** — API Endpoint、データベース操作
3. **E2E tests** — 重要なユーザーフロー

**TDD workflow (必須):**
1. 最初にテストを書く (RED) — テストは FAIL する必要がある
2. 最小限の実装を書く (GREEN) — テストは PASS する必要がある
3. Refactoring (IMPROVE) — Coverage が80%以上であることを検証する

失敗時のトラブルシューティング: テストの分離を確認 → モックを検証 → 実装を修正する（テストが間違っている場合を除き、テストは修正しない）。

## Development Workflow

1. **Plan** — planner Agent を使用し、依存関係とリスクを特定し、フェーズに分割する
2. **TDD** — tdd-guide Agent を使用し、最初にテストを書き、実装し、Refactoring する
3. **Review** — code-reviewer Agent を直ちに使用し、CRITICAL/HIGH な問題に対処する
4. **Capture knowledge in the right place**
   - 個人のデバッグメモ、設定、および一時的なコンテキスト → 自動メモリ
   - チーム/プロジェクトの知識（アーキテクチャの決定、APIの変更、ランブック） → プロジェクトの既存のドキュメント構造
   - 現在のタスクがすでに関連するドキュメントやコードコメントを生成している場合は、同じ情報を別の場所に複製しないこと
   - 明確なプロジェクトドキュメントの場所がない場合は、新しいトップレベルのファイルを作成する前に尋ねること
5. **Commit** — Conventional commits のフォーマット、包括的な Pull request のサマリー

## Workflow Surface Policy

- `skills/` は正規のワークフローサーフェスである。
- 新しいワークフローのコントリビューションは、まず `skills/` に着地させること。
- `commands/` は互換性のためのレガシーなスラッシュエントリーのサーフェスであり、移行やクロス Harness のパリティのためにシムがまだ必要な場合にのみ追加または更新すること。

## Git Workflow

**Commit format:** `<type>: <description>` — Types: feat, fix, refactor, docs, test, chore, perf, ci

**PR workflow:** コミット履歴全体を分析 → 包括的なサマリーのドラフトを作成 → テスト計画を含める → `-u` フラグを付けて push する。

## Architecture Patterns

**API response format:** 成功インジケーター、データペイロード、エラーメッセージ、およびページネーションメタデータを含む一貫したエンベロープ（envelope）。

**Repository pattern:** データアクセスを標準インターフェース（findAll, findById, create, update, delete）の背後にカプセル化する。ビジネスロジックはストレージメカニズムではなく、抽象インターフェースに依存する。

**Skeleton projects:** 実戦でテストされたテンプレートを検索し、並列 Agent（セキュリティ、拡張性、関連性）で評価し、最も一致するものを Clone し、証明された構造内で反復する。

## Performance

**Context management:** 大規模な Refactoring や複数ファイルの機能において、Context window の最後の20%を使用することは避けること。機密性の低いタスク（単一の編集、ドキュメント、簡単な修正）では、より高い使用率が許容される。

**Build troubleshooting:** build-error-resolver Agent を使用 → エラーを分析 → 段階的に修正 → 各修正後に検証する。

## Project Structure

```
agents/          — 60の特化したサブエージェント
skills/          — 231のワークフロースキルとドメイン知識
commands/        — 75のスラッシュコマンド
hooks/           — トリガーベースの自動化
rules/           — 常に従うべきガイドライン（共通 + 言語ごと）
scripts/         — クロスプラットフォーム Node.js ユーティリティ
mcp-configs/     — 14の MCP サーバー設定
tests/           — テストスイート
```

`commands/` は互換性のためにリポジトリに残っているが、長期的な方向性は Skill ファーストである。

## Success Metrics

- 80%以上の Coverage ですべてのテストが PASS する
- セキュリティの脆弱性がない
- コードが読みやすく、保守可能である
- パフォーマンスが許容範囲である
- ユーザー要件が満たされている
