# ECC v2.0.0-rc.1 公表エビデンス - 2026-05-13

これはリリース準備エビデンスのみです。GitHub リリース、npm 公開、プラグインタグ、marketplace 提出、アナウンス投稿を作成しません。

## ソースコミット

| フィールド | エビデンス |
| --- | --- |
| Upstream main ベース | `797f283036904128bb1b348ae62019eb9f08cf39` |
| エビデンスブランチ | `docs/release-readiness-20260513` |
| エビデンススコープ | PR #1846 後の現在の `main` に、markdownlint のみの zh-CN CLAUDE リストマーカー正規化を加えたもの |
| Git remote | `https://github.com/affaan-m/everything-claude-code.git` |
| ローカルステータスの但し書き | ワーキングツリーに無関係な untracked `docs/drafts/` ディレクトリがあった |

実際のリリースオペレーターは、公開前にクリーンなチェックアウトで最終リリースコミットからこれらのチェックを再実行すべきです。

## キューとリリースの状態

| サーフェス | コマンド | 結果 |
| --- | --- | --- |
| GitHub PR と issue | trunk、AgentShield、JARVIS、ECC-Tools、ECC-website 全体の `gh pr list` / `gh issue list` | 追跡対象リポジトリ全体でオープン PR 0件、オープン issue 0件 |
| Trunk ディスカッション | `affaan-m/everything-claude-code` の GraphQL ディスカッションスイープ | 最新の100ディスカッションはクローズ済み；オープンなディスカッションのバックログは見つからず |
| npm audit 署名ゲート | PR #1846 | `797f283` としてマージ；`npm audit` を実行するワークフローは `npm audit signatures` が必要になった |

## 必要なコマンドエビデンス

| エビデンス | コマンド | 結果 |
| --- | --- | --- |
| ハーネス監査 | `npm run harness:audit -- --format json` | `overall_score: 70`、`max_score: 70`、トップアクションなし |
| アダプタースコアカード | `npm run harness:adapters -- --check` | `Harness Adapter Compliance: PASS`；11 アダプター |
| オブザーバビリティ準備 | `npm run observability:ready -- --format json` | `overall_score: 16`、`max_score: 16`、`ready: true`、トップアクションなし |
| ルートスイート | `node tests/run-all.js` | `2376` 合格、`0` 失敗 |
| Markdown lint | `npx markdownlint-cli '**/*.md' --ignore node_modules` | 2つの zh-CN CLAUDE ドキュメントをアスタリスク箇条書きからダッシュ箇条書きに正規化した後に合格 |
| パッケージサーフェス | `node tests/scripts/npm-publish-surface.test.js` | `2/2` 合格；パッケージサーフェスは依然として Python バイトコード/キャッシュアーティファクトを除外 |
| リリースサーフェス | `node tests/docs/ecc2-release-surface.test.js` | `18/18` 合格 |
| Rust サーフェス | `cd ecc2 && cargo test` | `462/462` 合格；未使用の関数/フィールドに対する警告のみ |

## セキュリティゲートのエビデンス

| サーフェス | コマンドまたはチェック | 結果 |
| --- | --- | --- |
| ローカル npm 署名監査 | PR #1846 前の `npm audit signatures` | 241 の検証済みレジストリ署名と30の検証済みアテステーション |
| ローカル npm 脆弱性監査 | PR #1846 前の `npm audit --audit-level=high` | 脆弱性 0 |
| ワークフローセキュリティバリデーター | `node scripts/ci/validate-workflow-security.js` | 7つのワークフローファイルを検証 |
| ワークフローバリデーターテスト | `node tests/ci/validate-workflow-security.test.js` | 新しい署名ゲートのケースを含め `11/11` 合格 |
| #1846 の GitHub CI | 現在の head の PR チェック | `windows-latest / Node 18.x / pnpm` を含む、OS/パッケージマネージャーの全マトリックスが合格 |

## まだ承認または外部アクションを必要とするブロッカー

- GitHub プレリリース `v2.0.0-rc.1` を作成または検証する。
- npm dist-tag `next` で `ecc-universal@2.0.0-rc.1` を publish する。
- 明示的な承認の後にのみ、Claude プラグインタグを作成してプッシュする。
- ライブの Claude/Codex/OpenCode marketplace 提出パスを確認するか、手動提出のオーナーとステータスを記録する。
- ローンチコピーで使用する前に、ECC Tools の billing/App/Marketplace の主張を検証する。
- リリースとパッケージ/プラグインの URL が存在した後、ライブ URL でアナウンスコピーをリフレッシュする。
