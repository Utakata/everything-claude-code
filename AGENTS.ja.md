# Everything Claude Code (ECC) — エージェントの指示 (Agent Instructions)

これは**プロダクション対応のAIコーディングプラグイン**であり、ソフトウェア開発のための47の特化型Agent、181のSkill、79のCommand、および自動化されたHookワークフローを提供する。

**バージョン:** 1.10.0

## コア原則 (Core Principles)

1. **Agentファースト (Agent-First)** — ドメインタスクは特化型Agentに委任する
2. **テスト駆動 (Test-Driven)** — 実装前にテストを書くこと。80%以上のカバレッジが必須である
3. **セキュリティ第一 (Security-First)** — セキュリティで決して妥協しないこと。すべての入力を検証する
4. **不変性 (Immutability)** — 常に新しいオブジェクトを作成し、既存のものを決してミューテート（変更）しない
5. **実行前の計画 (Plan Before Execute)** — 複雑な機能はコードを書く前に計画する

## 利用可能なAgent (Available Agents)

| Agent | 目的 (Purpose) | 使用タイミング (When to Use) |
|-------|---------|-------------|
| planner | 実装計画 | 複雑な機能、リファクタリング |
| architect | システム設計とスケーラビリティ | アーキテクチャの決定 |
| tdd-guide | テスト駆動開発 | 新機能、バグ修正 |
| code-reviewer | コードの品質と保守性 | コードの記述/変更後 |
| security-reviewer | 脆弱性の検出 | コミット前、機密性の高いコード |
| build-error-resolver | ビルド/型エラーの修正 | ビルド失敗時 |
| e2e-runner | エンドツーエンドのPlaywrightテスト | 重要なユーザーフロー |
| refactor-cleaner | デッドコードのクリーンアップ | コードのメンテナンス |
| doc-updater | ドキュメントとコードマップの更新 | ドキュメントの更新時 |
| cpp-reviewer | C/C++コードレビュー | CおよびC++プロジェクト |
| cpp-build-resolver | C/C++ビルドエラー | CおよびC++ビルド失敗時 |
| docs-lookup | Context7を介したドキュメント検索 | API/ドキュメントに関する質問 |
| go-reviewer | Goコードレビュー | Goプロジェクト |
| go-build-resolver | Goビルドエラー | Goビルド失敗時 |
| kotlin-reviewer | Kotlinコードレビュー | Kotlin/Android/KMPプロジェクト |
| kotlin-build-resolver | Kotlin/Gradleビルドエラー | Kotlinビルド失敗時 |
| database-reviewer | PostgreSQL/Supabaseスペシャリスト | スキーマ設計、クエリ最適化 |
| python-reviewer | Pythonコードレビュー | Pythonプロジェクト |
| java-reviewer | JavaおよびSpring Bootコードレビュー | Java/Spring Bootプロジェクト |
| java-build-resolver | Java/Maven/Gradleビルドエラー | Javaビルド失敗時 |
| loop-operator | 自律的なループ実行 | ループの安全な実行、ストールの監視、介入 |
| harness-optimizer | Harness設定のチューニング | 信頼性、コスト、スループット |
| rust-reviewer | Rustコードレビュー | Rustプロジェクト |
| rust-build-resolver | Rustビルドエラー | Rustビルド失敗時 |
| pytorch-build-resolver | PyTorchランタイム/CUDA/トレーニングエラー | PyTorchのビルド/トレーニング失敗時 |
| typescript-reviewer | TypeScript/JavaScriptコードレビュー | TypeScript/JavaScriptプロジェクト |

## Agentのオーケストレーション (Agent Orchestration)

ユーザーのプロンプトを待たずに、プロアクティブにAgentを使用すること:
- 複雑な機能の要求 → **planner**
- 書いたばかり/変更したばかりのコード → **code-reviewer**
- バグ修正または新機能 → **tdd-guide**
- アーキテクチャの決定 → **architect**
- 機密性の高いコード → **security-reviewer**
- 自律的なループ / ループの監視 → **loop-operator**
- Harness設定の信頼性とコスト → **harness-optimizer**

独立した操作には並列実行を使用する — 複数のAgentを同時に起動する。

## セキュリティガイドライン (Security Guidelines)

**いかなるコミットの前にも (Before ANY commit):**
- ハードコードされたシークレット（APIキー、パスワード、トークン）がないこと
- すべてのユーザー入力が検証されていること
- SQLインジェクションの防止（パラメータ化されたクエリ）
- XSSの防止（サニタイズされたHTML）
- CSRF保護が有効になっていること
- 認証/認可が検証されていること
- すべてのエンドポイントでのレート制限
- エラーメッセージが機密データを漏洩しないこと

**シークレット管理 (Secret management):** シークレットを絶対にハードコードしないこと。環境変数またはシークレットマネージャーを使用する。起動時に必要なシークレットを検証する。公開されたシークレットは直ちにローテーションする。

**セキュリティの問題が見つかった場合 (If security issue found):** 停止 (STOP) → security-reviewer Agentを使用する → クリティカル(CRITICAL)な問題を修正する → 公開されたシークレットをローテーションする → 類似の問題がないかコードベースをレビューする。

## コーディングスタイル (Coding Style)

**不変性 (Immutability) (CRITICAL):** 常に新しいオブジェクトを作成し、決してミューテート（変更）しないこと。変更が適用された新しいコピーを返すこと。

**ファイル構成 (File organization):** 少数の大きなファイルよりも、多数の小さなファイルを好むこと。通常200〜400行、最大800行。タイプではなく、機能/ドメインごとに整理すること。高凝集、低結合。

**エラー処理 (Error handling):** すべてのレベルでエラーを処理すること。UIコードではユーザーフレンドリーなメッセージを提供すること。サーバーサイドでは詳細なコンテキストをログに記録すること。エラーを暗黙のうちに握りつぶさないこと。

**入力検証 (Input validation):** システム境界ですべてのユーザー入力を検証すること。スキーマベースの検証を使用すること。明確なメッセージと共にフェイルファスト(Fail fast)すること。外部データを決して信用しないこと。

**コード品質チェックリスト (Code quality checklist):**
- 関数は小さく（50行未満）、ファイルは焦点を絞る（800行未満）
- 深いネスト（4レベル超）がないこと
- 適切なエラー処理、ハードコードされた値がないこと
- 読みやすく、適切な名前の識別子

## テスト要件 (Testing Requirements)

**最小カバレッジ (Minimum coverage): 80%**

テストタイプ（すべて必須）:
1. **ユニットテスト (Unit tests)** — 個別の関数、ユーティリティ、コンポーネント
2. **統合テスト (Integration tests)** — APIエンドポイント、データベース操作
3. **E2Eテスト (E2E tests)** — 重要なユーザーフロー

**TDDワークフロー (必須) (TDD workflow (mandatory)):**
1. 最初にテストを書く (RED) — テストは失敗(FAIL)すべきである
2. 最小限の実装を書く (GREEN) — テストは成功(PASS)すべきである
3. リファクタリング (IMPROVE) — カバレッジが80%以上であることを確認する

失敗のトラブルシューティング: テストの分離を確認する → モックを検証する → 実装を修正する（テストが間違っていない限り、テストは修正しない）。

## 開発ワークフロー (Development Workflow)

1. **計画 (Plan)** — planner Agentを使用し、依存関係とリスクを特定し、フェーズに分割する
2. **TDD** — tdd-guide Agentを使用し、最初にテストを書き、実装し、リファクタリングする
3. **レビュー (Review)** — 直ちにcode-reviewer Agentを使用し、クリティカル/ハイ(CRITICAL/HIGH)な問題に対処する
4. **適切な場所での知識のキャプチャ (Capture knowledge in the right place)**
   - 個人的なデバッグメモ、設定、および一時的なコンテキスト → 自動メモリ
   - チーム/プロジェクトの知識（アーキテクチャの決定、APIの変更、ランブック） → プロジェクトの既存のドキュメント構造
   - 現在のタスクがすでに関連するドキュメントやコードコメントを生成している場合、同じ情報を他の場所に重複させないこと
   - 明確なプロジェクトドキュメントの場所がない場合は、新しいトップレベルファイルを作成する前に尋ねること
5. **コミット (Commit)** — Conventional Commitsの形式、包括的なPRサマリー

## ワークフローサーフェスポリシー (Workflow Surface Policy)

- `skills/` は正規のワークフローサーフェスである。
- 新しいワークフローのコントリビューションは、まず `skills/` にランディングさせるべきである。
- `commands/` はレガシーなスラッシュエントリの互換性サーフェスであり、移行やクロスHarnessのパリティのためにシム(shim)が依然として必要な場合にのみ追加または更新されるべきである。

## Gitワークフロー (Git Workflow)

**コミット形式 (Commit format):** `<type>: <description>` — Types: feat, fix, refactor, docs, test, chore, perf, ci

**PRワークフロー (PR workflow):** コミット履歴全体を分析する → 包括的なサマリーのドラフトを作成する → テスト計画を含める → `-u` フラグを付けてプッシュする。

## アーキテクチャパターン (Architecture Patterns)

**APIレスポンス形式 (API response format):** 成功インジケーター、データペイロード、エラーメッセージ、およびページネーションメタデータを含む一貫したエンベロープ(envelope)。

**リポジトリパターン (Repository pattern):** 標準的なインターフェース (findAll, findById, create, update, delete) の背後にデータアクセスをカプセル化する。ビジネスロジックは抽象インターフェースに依存し、ストレージメカニズムには依存しない。

**スケルトンプロジェクト (Skeleton projects):** 実戦テスト済みのテンプレートを検索し、並列Agent（セキュリティ、拡張性、関連性）で評価し、最適なものをクローンし、証明された構造内で反復する。

## パフォーマンス (Performance)

**コンテキスト管理 (Context management):** 大規模なリファクタリングや複数ファイルの機能において、コンテキストウィンドウの最後の20%の使用は避けること。感度の低いタスク（単一の編集、ドキュメント、単純な修正）は、より高い使用率を許容する。

**ビルドのトラブルシューティング (Build troubleshooting):** build-error-resolver Agentを使用する → エラーを分析する → 段階的に修正する → 各修正後に検証する。

## プロジェクト構造 (Project Structure)

```
agents/          — 47の特化型サブエージェント
skills/          — 181のワークフロースキルとドメイン知識
commands/        — 79のスラッシュコマンド
hooks/           — トリガーベースの自動化
rules/           — 常に従うべきガイドライン（共通 + 言語別）
scripts/         — クロスプラットフォームのNode.jsユーティリティ
mcp-configs/     — 14のMCPサーバー設定
tests/           — テストスイート
```

`commands/` は互換性のためにリポジトリに残っているが、長期的な方向性はSkillファーストである。

## 成功指標 (Success Metrics)

- 80%以上のカバレッジですべてのテストが合格する
- セキュリティの脆弱性がない
- コードが読みやすく、保守可能である
- パフォーマンスが許容範囲内である
- ユーザーの要件が満たされている
