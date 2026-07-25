# ECC v2.0.0-rc.1 公表エビデンス - 2026-05-13 ポストハードニング

これはリリース準備エビデンスのみです。GitHub リリース、npm 公開、プラグインタグ、marketplace 提出、アナウンス投稿を作成しません。

## ソースコミット

| フィールド | エビデンス |
| --- | --- |
| Upstream main ベース | `209abd403b7eaa968c6d4fa67be82e04b55706d6` |
| エビデンスブランチ | `docs/post-hardening-release-evidence-20260513` |
| エビデンススコープ | PR #1850 と PR #1851 後の現在の `main` |
| Git remote | `https://github.com/affaan-m/everything-claude-code.git` |
| ローカルステータスの但し書き | ワーキングツリーに無関係な untracked `docs/drafts/` ディレクトリがあった |

実際のリリースオペレーターは、公開前にクリーンなチェックアウトで最終リリースコミットからこれらのチェックを再実行すべきです。

## キューとリリースの状態

| サーフェス | コマンド | 結果 |
| --- | --- | --- |
| GitHub PR と issue | trunk、AgentShield、JARVIS 全体の `gh pr list` / `gh issue list` | アクセス可能な `affaan-m` リポジトリでオープン PR 0件、オープン issue 0件 |
| Trunk ディスカッション | `affaan-m/everything-claude-code` の GraphQL ディスカッションカウント | オープンなディスカッション 0件 |
| Dependabot アラート | trunk、AgentShield、JARVIS の Dependabot アラート API | オープンなアラート 0件 |
| リリース状態 | `gh release view v2.0.0-rc.1` | まだ未作成；リリースは承認ゲートのまま |

ECC-Tools 組織のリポジトリ数は、現在の GraphQL トークンではそれらの組織リポジトリを解決できないため、
このパスでは再チェックされませんでした。以前の #42 後のローカルチェックアウトハンドオフでは、
両方の ECC-Tools リポジトリがオープン PR 0件、オープン issue 0件と記録されていました。

## 前回のエビデンス以降にランドしたハードニング

| PR | マージコミット | エビデンス |
| --- | --- | --- |
| #1850 | `248673271455e9dc85b8add2a6ab76107b718639` | 読み取り専用のアナライザーエージェントと zh-CN コピーから `Bash` ツールアクセスを削除；そのサーフェスの AgentShield high findings が新しい high findings なしで 21 -> 18 に減少 |
| #1851 | `209abd403b7eaa968c6d4fa67be82e04b55706d6` | write 権限のワークフローで `actions/checkout` の認証情報永続化を無効化し、そのガードを維持するワークフローセキュリティバリデーターのルールを追加 |

## 必要なコマンドエビデンス

| エビデンス | コマンド | 結果 |
| --- | --- | --- |
| ハーネス監査 | `npm run harness:audit -- --format json` | `overall_score: 70`、`max_score: 70`、トップアクションなし |
| アダプタースコアカード | `npm run harness:adapters -- --check` | `Harness Adapter Compliance: PASS`；11 アダプター |
| オブザーバビリティ準備 | `npm run observability:ready -- --format json` | `overall_score: 21`、`max_score: 21`、`ready: true`、トップアクションなし；Release Safety 3/3 を含む |
| ワークフローセキュリティバリデーター | `node scripts/ci/validate-workflow-security.js` | 7つのワークフローファイルを検証 |
| ワークフローバリデーターテスト | `node tests/ci/validate-workflow-security.test.js` | 14/14 合格 |
| リリースサーフェス | `node tests/docs/ecc2-release-surface.test.js` | 18/18 合格 |
| パッケージサーフェス | `node tests/scripts/npm-publish-surface.test.js` | 2/2 合格 |
| ルートスイート | `node tests/run-all.js` | 2381/2381 合格、0 失敗 |
| Markdown lint | `npx markdownlint-cli '**/*.md' --ignore node_modules --ignore docs/drafts` | 合格 |
| Rust サーフェス | `cd ecc2 && cargo test` | 462/462 合格；未使用の関数/フィールドに対する警告のみ |
| GitGuardian Security Checks | ポストハードニングのセキュリティ PR での GitHub チェック | マージ前に合格 |

## サプライチェーンのエビデンス

| サーフェス | コマンドまたはチェック | 結果 |
| --- | --- | --- |
| ローカル npm 脆弱性監査 | `npm audit --json` | 脆弱性 0 |
| ローカル npm 署名監査 | `npm audit signatures` | 241 の検証済みレジストリ署名と30の検証済みアテステーション |
| Rust アドバイザリ監査 | `cd ecc2 && cargo audit -q` | 静かに合格 |
| TanStack / Mini Shai-Hulud IOC チェック | 影響を受けるパッケージ名前空間、ペイロードファイル名、既知のコミットマーカーの Grep | 影響を受けるパッケージへのランタイムまたはロックファイルの依存なし；worm IOC の一致なし |
| GitGuardian Security Checks | ポストハードニングのセキュリティ PR での GitHub チェック | マージ前に合格 |

## 外部アドバイザリのマッピング

2026年5月の TanStack インシデントは、3つのワークフロークラスを通じて ECC リリースリスクにマップされます：

- 信頼できない PR コードを実行またはチェックアウトする `pull_request_target` ワークフロー；
- fork、base、リリースワークフローの信頼境界を越える共有依存関係キャッシュ；
- 書き込み可能なトークンまたは後続のプロセス実行に露出した OIDC トークンを持つ
  リリースジョブ。

ECC の現在のガードレールは、これらのクラスを以下を通じてカバーします：

- `workflow_run` と `pull_request_target` ワークフローにおける信頼できないチェックアウト ref の拒否；
- `pull_request_target` と `id-token: write` ワークフローにおける共有キャッシュの拒否；
- ワークフローが `npm audit` を実行する際の必須の `npm audit signatures`；
- write 権限を持つワークフローにおける必須の `npm ci --ignore-scripts`；
- write 権限を持つワークフローにおける `actions/checkout` の必須の `persist-credentials: false`。

## まだ承認または外部アクションを必要とするブロッカー

- GitHub プレリリース `v2.0.0-rc.1` を作成または検証する。
- npm dist-tag `next` で `ecc-universal@2.0.0-rc.1` を publish する。
- 明示的な承認の後にのみ、Claude プラグインタグを作成してプッシュする。
- ライブの Claude/Codex/OpenCode marketplace 提出パスを確認するか、手動提出のオーナーとステータスを記録する。
- ローンチコピーで使用する前に、ECC Tools の billing/App/Marketplace の主張を検証する。
- リリースとパッケージ/プラグインの URL が存在した後、ライブ URL でアナウンスコピーをリフレッシュする。
