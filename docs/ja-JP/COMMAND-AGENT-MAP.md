# コマンド → エージェント / スキル マップ

このドキュメントは、各スラッシュコマンドと、それが呼び出す主要なエージェントまたはスキル、および注目すべき直接呼び出しエージェントをリストします。どのコマンドがどのエージェントを使用するかを発見し、リファクタリングを一貫させるために使用してください。

| コマンド | 主要エージェント | 備考 |
|---------|------------------|--------|
| `/plan` | planner | コード前の実装計画 |
| `/tdd` | tdd-guide | テスト駆動開発 |
| `/code-review` | code-reviewer | 品質とセキュリティのレビュー |
| `/build-fix` | build-error-resolver | ビルド/型エラーの修正 |
| `/e2e` | e2e-runner | Playwright E2E テスト |
| `/refactor-clean` | refactor-cleaner | デッドコードの削除 |
| `/update-docs` | doc-updater | ドキュメント同期 |
| `/update-codemaps` | doc-updater | Codemaps / アーキテクチャドキュメント |
| `/go-review` | go-reviewer | Go コードレビュー |
| `/go-test` | tdd-guide | Go TDD ワークフロー |
| `/go-build` | go-build-resolver | Go ビルドエラーの修正 |
| `/python-review` | python-reviewer | Python コードレビュー |
| `/harness-audit` | — | ハーネススコアカード（単一エージェントなし） |
| `/loop-start` | loop-operator | 自律ループの開始 |
| `/loop-status` | loop-operator | ループステータスの検査 |
| `/quality-gate` | — | 品質パイプライン（フックライク） |
| `/model-route` | — | モデル推奨（エージェントなし） |
| `/orchestrate` | planner, tdd-guide, code-reviewer, security-reviewer, architect | マルチエージェントのハンドオフ |
| `/multi-plan` | architect（Codex/Gemini プロンプト） | マルチモデル計画 |
| `/multi-execute` | architect / frontend プロンプト | マルチモデル実行 |
| `/multi-backend` | architect | バックエンドのマルチサービス |
| `/multi-frontend` | architect | フロントエンドのマルチサービス |
| `/multi-workflow` | architect | 汎用のマルチサービス |
| `/learn` | — | continuous-learning スキル、instincts |
| `/learn-eval` | — | continuous-learning-v2、評価してから保存 |
| `/instinct-status` | — | continuous-learning-v2 |
| `/instinct-import` | — | continuous-learning-v2 |
| `/instinct-export` | — | continuous-learning-v2 |
| `/evolve` | — | continuous-learning-v2、instincts のクラスタリング |
| `/promote` | — | continuous-learning-v2 |
| `/projects` | — | continuous-learning-v2 |
| `/skill-create` | — | skill-create-output スクリプト、git 履歴 |
| `/checkpoint` | — | verification-loop スキル |
| `/verify` | — | verification-loop スキル |
| `/eval` | — | eval-harness スキル |
| `/test-coverage` | — | カバレッジ分析 |
| `/sessions` | — | セッション履歴 |
| `/setup-pm` | — | パッケージマネージャーセットアップスクリプト |
| `/claw` | — | NanoClaw CLI（scripts/claw.js） |
| `/pm2` | — | PM2 サービスライフサイクル |
| `/security-scan` | security-reviewer（スキル） | security-scan スキル経由の AgentShield |

## 直接使用エージェント

| 直接エージェント | 目的 | スコープ | 備考 |
|--------------|---------|-------|--------|
| `typescript-reviewer` | TypeScript/JavaScript コードレビュー | TypeScript/JavaScript プロジェクト | レビューが TS/JS 固有の findings を必要とし、まだ専用のスラッシュコマンドがない場合に、エージェントを直接呼び出す。 |

## コマンドが参照するスキル

- **continuous-learning**、**continuous-learning-v2**：`/learn`、`/learn-eval`、`/instinct-*`、`/evolve`、`/promote`、`/projects`
- **verification-loop**：`/checkpoint`、`/verify`
- **eval-harness**：`/eval`
- **security-scan**：`/security-scan`（AgentShield を実行）
- **strategic-compact**：コンパクションポイントで提案される（フック）

## このマップの使い方

- **発見可能性：** どのコマンドがどのエージェントをトリガーするかを見つける（例：「code-reviewer には `/code-review` を使う」）。
- **リファクタリング：** エージェントの名前変更または削除時に、このドキュメントとコマンドファイルで参照を検索する。
- **CI/docs：** カタログスクリプト（`node scripts/ci/catalog.js`）はエージェント/コマンド/スキルのカウントを出力する；このマップは、コマンドとエージェントの関係でそれを補完する。
