# ECC v2.0.0-rc.1 公表エビデンス - 2026-05-17

これはリリース準備エビデンスのみです。GitHub リリース、npm 公開、プラグインタグ、marketplace 提出、アナウンス投稿を作成しません。

## ソースコミット

| フィールド | エビデンス |
| --- | --- |
| Upstream main | `e6c16b40b80b3b323586c9e8341faa87c01a728c` |
| Git remote | `https://github.com/affaan-m/everything-claude-code.git` |
| エビデンススコープ | 日本語・タイ語ローカライゼーションマージバッチ、マージ後の ja-JP markdown アンカー修復、Zed インストールターゲットサポート、Mini Shai-Hulud/TanStack 保護の再チェック、`gh-token-monitor` トークンストア IOC カバレッジ、AgentShield ポリシー昇格 Action 出力ミラー、ECC-Tools ホステッド昇格ジャッジ監査トレースミラー、ECC-Tools billing アナウンスプリフライトミラー、ECC-Tools 本番 Marketplace リードバック状態ミラー、レガシー残務ダッシュボードルーティング、Linear 進捗準備、決定論的プレビューパックスモークゲート後の現在の `main` |
| ローカルステータスの但し書き | `git status --short --branch` が `## main...origin/main` と無関係な untracked `docs/drafts/` を表示；生成されたエビデンスファイルは、それが記述するソーススナップショットの後にコミットされる |

実際のリリースオペレーターは、公開前に厳密にクリーンなチェックアウトで最終リリースコミットからすべての publish 向けチェックを再実行すべきです。

## キューとディスカッションの状態

| サーフェス | コマンド | 結果 |
| --- | --- | --- |
| Trunk PR | `gh pr list --state open --limit 50 --json number,title` | オープン PR 0件 |
| Trunk issue | `gh issue list --state open --limit 50 --json number,title` | オープン issue 0件 |
| プラットフォーム監査 | `node scripts/platform-audit.js --json --allow-untracked docs/drafts/` | Ready；追跡対象リポジトリはオープン PR 0件、オープン issue 0件、ディスカッションのメンテナー対応ギャップ 0件、承認済み回答が欠けている回答可能な Q&A 0件、ブロッキング dirty ファイル 0件と報告 |
| オペレーターダッシュボード | `npm run operator:dashboard -- --markdown --allow-untracked docs/drafts/ --write docs/releases/2.0.0-rc.1/operator-readiness-dashboard-2026-05-17.md` | `e6c16b40b80b3b323586c9e8341faa87c01a728c` の現在のダッシュボードを生成；dashboard ready true、release、npm、plugin、billing、announcement のゲートが承認ゲートのため publication ready false |

プラットフォーム監査における追跡対象リポジトリは以下でした：

- `affaan-m/everything-claude-code`
- `affaan-m/agentshield`
- `affaan-m/JARVIS`
- `ECC-Tools/ECC-Tools`
- `ECC-Tools/ECC-website`

## マージとトリアージのバッチ

| 項目 | 結果 |
| --- | --- |
| Issue #1957 | README とフックのドキュメントがサポート対象の手動フックインストールをすでに文書化していることを確認した後、メンテナーガイダンスとともにクローズ |
| Issue #1958 | サプライチェーン IOC スキャンと保護パスの後、以前のキューバッチでクローズ |
| PR #1962 | ESLint 10 が現在の Node 18 サポート契約より新しい Node エンジン範囲を必要とするため、マージではなくクローズ |
| PR #1961 | TypeScript 6.0.3 を `344a9bdf9c45c7589dedd3c66a8a2ebf2cbf2e5b` としてマージ；メンテナーパッチが `.opencode/tsconfig.json` に Node 型を追加；GitHub Actions の全マトリックスが合格 |
| PR #1963 | `@types/node` 25.8.0 を `b66ae3fbe070ef1fd2b610b4011f1345b4d75875` としてマージ；メンテナーパッチが npm ロックファイルを同期；GitHub Actions の全マトリックスが合格 |
| PR #1953 | 日本語ローカライゼーションを `9495b109e2c5fc5b1044ddfa1e2179f9d4aa86be` としてマージ；メンテナーパッチがローカライズされた security/sponsorship リンクを修正し、stale な cubic 報告のフロントマター項目を翻訳し、`docs/zh-CN` から `docs/ja-JP` へのパリティに欠落ファイル 0件を確認し、CodeRabbit、GitGuardian、cubic の合格後に承認 |
| マージ後の trunk 修正 | `docs/ja-JP/skills/autonomous-loops/SKILL.md` から壊れたファイル内アンカーを削除するために `afe0ae8d725f7773147dc4aa7943a45846853a0d` をプッシュ；これにより PR #1953 後の `main` のルート lint が復旧 |
| Issue #1951 | PR #1953 がマージされたときに自動的に completed としてクローズ |
| Zed アダプターコミット | selective install ターゲット、README の Zed ガイダンス、`.zed/settings.json` 計画カバレッジを通じてプロジェクトローカルな Zed サポートを追加するために `2371a3cf0543365c1c18e84eba786b1abcb28941` をプッシュ |
| Zed Windows CI 修正 | Windows のパス区切りをまたいで Zed インストールプランのソースパスアサーションを正規化するために `744f4169972fd81618c3114ea1ca5ffb85ef4c82` をプッシュ |
| Discussion #1896 | `main` での Zed サポートを確認し、dry-run コマンドを文書化し、BYOK/OpenRouter のシークレットが ECC 管理下のプロジェクトファイルではなく Zed/ローカルユーザー設定に留まることを明確化するメンテナー更新を追加 |
| PR #1967 | 2つのメンテナークリーンアップコメントを適用し、markdownlint と言語スイッチャーのカバレッジを検証し、現在の head で CodeRabbit、GitGuardian、Greptile、cubic の合格後に承認した後、タイ語ローカライゼーションを `6b282aaa4389e9411e86bfe09d8f4de8018dcf8e` としてマージ |
| サプライチェーントークンストアスキャナースライス | Mini Shai-Hulud の `~/.config/gh-token-monitor/token` dead-man-switch トークンストアを検出し、インシデント対応 runbook を更新し、フィクスチャカバレッジを追加するために `36d390aa7d733d458963a203b91998d3aec477b2` をプッシュ；ローカルスイープはクリーンのままで GitHub Actions `26003629550` が合格 |
| レガシー残務ダッシュボードスライス | ローカライゼーション残務のエビデンスを ITO-55 に添付し続け、stale なレガシー作業がリリース現行として扱われるのを防ぐために `f397216aee5a0ca7d168726d3cc41eb47f728b37` とダッシュボード再生成コミットをプッシュ |
| Linear 進捗準備スライス | 重要なマージバッチの後にリフレッシュされた Linear 進捗エビデンスを要求するために `355c4f128183aa7f7ce9da9485af07d257d67f69` とダッシュボード再生成コミット `1a384dc5dbd24a3be725e1b26c169bddb6c850b6` をプッシュ |
| プレビューパックスモークスライス | プレビューパックアーティファクト、Hermes インポート境界、検証コマンド、承認ゲート付き公表ブロッカーをカバーする `npm run preview-pack:smoke` を追加するために `3215e655eff70b9fea5382ce5996666a1f48d1af` をプッシュ；lint とダッシュボードのフォローアップコミットが `27dc2918a24a50b8dd5e23dba2aa6a05bd17c0d7` までランド |
| AgentShield ハードニング出力スライス | パッケージマネージャーハードニングの status/count 出力と、レジストリ認証情報、ライフサイクルスクリプトドリフト、release-age ゲートドリフトについて秘匿化された GitHub Action job-summary エビデンスを公開するために AgentShield `1124535345d7040242ecd3803f65bcd4dcaf6ec2` をプッシュ |
| AgentShield ポリシー昇格 Action スライス | owner 承認、保護付きロールアウト、ランタイムスモークのためのポリシー昇格 status/count/digest 出力と GitHub Action job-summary レビューアイテムを公開するために AgentShield `1593925dca025632dd8a6454509fce3fe7517cdf` をプッシュ；同じ Action ジョブは昇格されたポリシーでスキャンするとランタイムスモークを verified としてマークする |
| ECC-Tools ポリシー昇格テレメトリスライス | AgentShield ポリシー昇格 Action 出力をホステッドセキュリティレビュー findings と Hosted Promotion Readiness スコアリングにルーティングするために ECC-Tools `86589517b11b95f1b0216ae7737563fb67ee1604` をプッシュ |
| ECC-Tools ポリシー昇格オペレーター UX スライス | ポリシー昇格 Action 出力の status、pack、レビューアイテム数、残りアクション数、digest をホステッドセキュリティジョブのコメントと check-runs にレンダリングするために ECC-Tools `16c537fd385458c438ff32fb4211079b2f8ea1c4` をプッシュ |
| ECC-Tools ホステッド昇格ジャッジ監査トレーススライス | 生のプロバイダー出力を露出させずに、ホステッド昇格ジャッジのリクエストフィンガープリントと allowed-citation 監査トレースをレンダリングするために ECC-Tools `05d4e8296e37ba72e471beaa23ea4c81eb2aa31f` をプッシュ |
| ECC-Tools billing アナウンスプリフライトスライス | 特権 API 呼び出しの前に安全な Marketplace リードバック入力とエンドポイント検証を行うために `npm run billing:announcement-gate -- --preflight` を追加するために ECC-Tools `91a441b92342b842832ac28b018ee46f0c4a906f` をプッシュ |
| ECC-Tools 本番 Marketplace リードバック状態スライス | 本番 Cloudflare のシークレット名に `INTERNAL_API_SECRET` が含まれるが、本番 KV に現在 `account-billing:*` や `billing-state:*` のレコードがないことを記録するために ECC-Tools `eb6941290b2fa70db01a51084e9e79a160238468` をプッシュ |

## リリースゲートコマンド

| ゲート | コマンド | 結果 |
| --- | --- | --- |
| ルート lint | `npm run lint` | ja-JP autonomous-loop アンカー修復後に合格 |
| ルートスイート | `npm test` | 2487 合格、0 失敗 |
| GitHub Actions CI | `gh run view 25989533576 --json status,conclusion,jobs` | Security Scan とすべての Windows テストジョブを含む 37/37 ジョブが green で正常に完了 |
| ハーネス監査 | `node scripts/harness-audit.js --format json` | 70/70、トップアクションなし |
| オブザーバビリティ準備 | `npm run observability:ready -- --format json` | 21/21、ready yes |
| ワークフローセキュリティ | `node scripts/ci/validate-workflow-security.js` | 8つのワークフローファイルを検証 |
| サプライチェーン IOC スキャン | `node scripts/ci/scan-supply-chain-iocs.js --root ~/GitHub --home --json`；`node scripts/ci/scan-supply-chain-iocs.js --root ~/Documents/GitHub --home --json` | 合格；各ワークスペーススイープが、ユーザーレベルの永続化ターゲットを含む 1,879 ファイルを findings 0件で検査 |
| npm audit | `npm audit --audit-level=high` | 脆弱性 0 |
| npm 署名 | `agentshield`、`everything-claude-code`、`ECC-Tools`、`ECC-website`、`JARVIS/frontend` 全体の `npm audit signatures` | 主要な ECC Node パッケージルート全体で合格 |
| プレビューパックスモーク | `npm run preview-pack:smoke` | 合格；ready yes；digest `dfb1ed014607`；5 チェック合格、0 失敗 |
| AgentShield エンタープライズ CI 出力スライス | AgentShield ローカルの `npm run build`、対象を絞った action テスト、`npm run typecheck`、`npm run lint`、フル `npm test`、`git diff --check`；GitHub Actions `25994354007`、`25994354011`、`25994354026` | ローカルゲート合格；`1124535` についてリモート CI、Test GitHub Action、Self-Scan が正常に完了 |
| AgentShield ポリシー昇格 Action 出力スライス | AgentShield ローカルの `npm run build`、`npx vitest run tests/action-promotion.test.ts tests/action.test.ts`、`npm run typecheck`、`npm run lint`、フル `npm test`、`git diff --check`；GitHub Actions `25995929182`、`25995929190`、`25995929161` | ローカルゲート合格；`1593925` についてリモート CI、Test GitHub Action、Self-Scan が正常に完了 |
| ECC-Tools ポリシー昇格ホステッドテレメトリスライス | ECC-Tools ローカルの、ポリシー昇格 Action 出力ルーティングと hosted-promotion readiness のための対象を絞った vitest チェック、`npm run typecheck`、`npm run lint`、フル `npm test`、`git diff --check`；GitHub Actions `25996758218` | ローカルゲート合格；`8658951` についてリモート CI が正常に完了 |
| ECC-Tools ポリシー昇格オペレーター UX スライス | ECC-Tools ローカルの、ホステッド findings/comments/checks におけるポリシー昇格 Action 出力値のための対象を絞った vitest チェック、`npm run typecheck`、`npm run lint`、フル `npm test`、`git diff --check`；GitHub Actions `25997300046` | ローカルゲート合格；`16c537f` についてリモート CI が正常に完了 |
| ECC-Tools ホステッド昇格ジャッジ監査トレーススライス | ECC-Tools ローカルの、ホステッドモデルジャッジ監査トレースのための対象を絞った vitest チェック、`npm run typecheck`、`npm run lint`、フル `npm test`、`git diff --check`；GitHub Actions `25997840703` | ローカルゲート合格；`05d4e82` についてリモート CI が正常に完了 |
| ECC-Tools billing アナウンスプリフライトスライス | ECC-Tools ローカルの、対象を絞った vitest プリフライトテスト、`npm run typecheck`、`npm run lint`、フル `npm test`、`git diff --check`；GitHub Actions `25998238507` | ローカルゲート合格；`91a441b` についてリモート CI が正常に完了 |
| ECC-Tools 本番 Marketplace リードバック状態スライス | ECC-Tools ローカルの `npm test` と `git diff --check`；Cloudflare `wrangler secret list` が `INTERNAL_API_SECRET` の名前での存在を確認；`account-billing:` と `billing-state:` に対する `wrangler kv key list` はどちらも空のリストを返した；GitHub Actions `25998610438` | ローカルゲート合格；`eb69412` についてリモート CI が正常に完了；ライブアナウンスは Marketplace 購入/webhook レコードが KV を埋めるまでブロックされたまま |
| GitHub キュー | `gh pr list`；`gh issue list`；`node scripts/platform-audit.js --json --allow-untracked docs/drafts/` | 生成されたエビデンスがコミットされた後、追跡対象リポジトリセット全体でオープン PR 0件、オープン issue 0件、ディスカッションのメンテナー対応ギャップ 0件、承認済み回答が欠けている回答可能な Q&A 0件、GitHub フェッチエラー 0件、プラットフォーム監査 ready |
| オペレーターダッシュボード | `npm run operator:dashboard -- --markdown --allow-untracked docs/drafts/ --write docs/releases/2.0.0-rc.1/operator-readiness-dashboard-2026-05-17.md` | `e6c16b40b80b3b323586c9e8341faa87c01a728c` について platform ready true、dashboard ready true、マクロ公表ゲートは依然として未完了でダッシュボードを生成 |
| GitHub Actions CI | `gh run watch 26003629550 --repo affaan-m/everything-claude-code --exit-status` | Validate Components、Lint、Security Scan、Coverage、および OS/Node/パッケージマネージャーの全マトリックスを含め、`36d390aa7d733d458963a203b91998d3aec477b2` について正常に完了 |

## 現在の公表ブロッカー

- GitHub プレリリース `v2.0.0-rc.1` はこのパスでもまだ未作成。
- npm `ecc-universal@2.0.0-rc.1` はまだ `next`
  dist-tag に publish されていない。
- Claude プラグインタグと marketplace 伝播は承認ゲートのまま。
- Codex repo-marketplace の配布は rc.1 で検証済みだが、公式
  Plugin Directory の公開は OpenAI のセルフサーブ公開サーフェスにブロックされたまま。
- ECC Tools の billing/native-payments コピーは、Marketplace の
  購入/webhook パスが本番の `account-billing:*` と
  `billing-state:*` レコードを書き込み、その後 `npm run billing:announcement-gate --
  --account <github-login>` が announcement-ready なゲートを返すまでブロックされたまま。
- リリースノート、X、LinkedIn、GitHub リリース、ロングフォームコピーは、
  release/package/plugin の URL が存在した後、依然として最終的なライブ URL が必要。
- ローカルチェックアウトには依然として無関係な untracked `docs/drafts/` があるため、
  実際の公表前に厳密なクリーンチェックアウトのリリースパスが依然として必要。

## 結果

追跡対象の公開 PR キュー、issue キュー、ディスカッションキューは2026年5月17日時点で
クリーンであり、現在の `main` は上記の Node、ハーネス、オブザーバビリティ、
ワークフローセキュリティ、npm audit/署名、サプライチェーン IOC のゲートに合格しました。
これは公表準備を改善しますが、`publication-readiness.md` の承認ゲート付きの
release、package、plugin、billing、announcement のステップを置き換えるものではありません。
