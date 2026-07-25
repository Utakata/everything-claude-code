# ECC v2.0.0-rc.1 公表準備状況

このチェックリストは、公開の公表サーフェスのためのリリースゲートです。これ自体をエビデンスとして使用しないでください。エビデンスフィールドは、リリースされる正確なコミットからの新鮮なコマンド出力または URL で埋めてください。

現在の rc.1 のネーミング決定とパッケージ/プラグイン公表パスについては、
[`naming-and-publication-matrix.md`](naming-and-publication-matrix.md) を参照してください。
組み立てられた rc.1 プレビューパックの境界については、
[`preview-pack-manifest.md`](preview-pack-manifest.md) を参照してください。
5月12日のドライランエビデンスパスについては、
[`publication-evidence-2026-05-12.md`](publication-evidence-2026-05-12.md) を参照してください。
5月13日のリリース準備エビデンスリフレッシュについては、
[`publication-evidence-2026-05-13.md`](publication-evidence-2026-05-13.md) を参照してください。
PR #1850 と PR #1851 後の5月13日ポストハードニングエビデンスリフレッシュについては、
[`publication-evidence-2026-05-13-post-hardening.md`](publication-evidence-2026-05-13-post-hardening.md) を参照してください。
5月15日のキュー、ディスカッション、Linear ロードマップ、Mini Shai-Hulud/TanStack
フォローアップ、スケジュールされたサプライチェーンウォッチ、no-lifecycle CI インストールハードニング、
GitHub Actions キャッシュパージ、AgentShield リリース検証、billing ゲート、
AgentShield #86 エビデンスパック来歴、PR #1941 までの `ecc2` current-dir ガードエビデンス
リフレッシュについては、
[`publication-evidence-2026-05-15.md`](publication-evidence-2026-05-15.md) を参照してください。
5月16日のキュークリーンアップ、recsys スキルマージ、GateGuard issue トリアージ、
AgentShield #87 プラグインキャッシュランタイム信頼度エビデンス、AgentShield #88
エビデンスパックの inspect/readback、AgentShield #89 エビデンスパックフリートルーティング、
AgentShield #90 フリートレビューアイテム、AgentShield #91 チェックサムバックアップのポリシー
エクスポート、AgentShield #92 チェックサム検証済みポリシー昇格、ECC-Tools #76
フリートサマリー消費、ECC-Tools #77 ホステッド finding エビデンスパス、
ECC-Tools #78 ハーネスポリシールートリンク、オペレーターダッシュボードリフレッシュ、
現在の `main` での統合最終ゲート再実行については、
[`publication-evidence-2026-05-16.md`](publication-evidence-2026-05-16.md) を参照してください。
5月17日のキュークリーンアップ、日本語ローカライゼーションマージ、Dependabot の
TypeScript と Node 型のマージ、マージ後の ja-JP lint 修復、Mini
Shai-Hulud/TanStack ローカル保護の再チェック、レガシー残務と Linear 進捗の
ルーティング、決定論的プレビューパックスモークゲート、現在のオペレーターダッシュボード
リフレッシュについては、
[`publication-evidence-2026-05-17.md`](publication-evidence-2026-05-17.md) を参照してください。
同じ5月16日のパスからのオペレーター向けプロンプトからアーティファクトへの準備状況ダッシュボードについては、
[`operator-readiness-dashboard-2026-05-15.md`](operator-readiness-dashboard-2026-05-15.md) を参照してください。
5月17日のオペレーターダッシュボードリフレッシュについては、
[`operator-readiness-dashboard-2026-05-17.md`](operator-readiness-dashboard-2026-05-17.md) を参照してください。

## リリースアイデンティティマトリックス

| サーフェス | 期待値 | 真実のソース | 新鮮なチェック | エビデンスアーティファクト | オーナー | ステータス |
| --- | --- | --- | --- | --- | --- | --- |
| 製品名 | Everything Claude Code / ECC | `README.md`、`CHANGELOG.md`、リリースノート | `rg -n "Everything Claude Code" README.md CHANGELOG.md docs/releases/2.0.0-rc.1` | `publication-evidence-2026-05-12.md` | リリースオーナー | エビデンス記録済み |
| GitHub リポジトリ | `affaan-m/everything-claude-code` | Git remote とリリース URL | `git remote get-url origin` | `publication-evidence-2026-05-12.md` | リリースオーナー | エビデンス記録済み |
| Git タグ | `v2.0.0-rc.1` | GitHub releases | `gh release view v2.0.0-rc.1 --repo affaan-m/everything-claude-code` | `release not found` | リリースオーナー | リリース承認までブロック |
| npm パッケージ | `ecc-universal` | `package.json` | `node -p "require('./package.json').name"` | `publication-evidence-2026-05-12.md` | パッケージオーナー | エビデンス記録済み |
| npm バージョン | `2.0.0-rc.1` | `VERSION`、`package.json`、ロックファイル | `node -p "require('./package.json').version"` | `publication-evidence-2026-05-12.md` | パッケージオーナー | エビデンス記録済み |
| npm dist-tag | rc は `next`、`latest` は GA のみ | npm レジストリ | `npm view ecc-universal dist-tags --json` | 現在のレジストリには `latest: 1.10.0` のみ；`next` は publish 待ち | パッケージオーナー | publish 承認までブロック |
| Claude プラグインスラグ | `ecc` / `ecc@ecc` インストールパス | `.claude-plugin/plugin.json`、`.claude-plugin/marketplace.json` | `node tests/hooks/hooks.test.js` | `publication-evidence-2026-05-12.md` | プラグインオーナー | エビデンス記録済み |
| Claude プラグインマニフェスト | `2.0.0-rc.1`、サポートされていない `agents` や明示的な `hooks` フィールドなし | `.claude-plugin/plugin.json`、`.claude-plugin/PLUGIN_SCHEMA_NOTES.md` | `claude plugin validate .claude-plugin/plugin.json` | `publication-evidence-2026-05-12.md` | プラグインオーナー | エビデンス記録済み |
| Codex プラグインマニフェスト | 共有スキルソースを持つ `2.0.0-rc.1` | `.codex-plugin/plugin.json` | `node tests/docs/ecc2-release-surface.test.js` | `publication-evidence-2026-05-12.md` | プラグインオーナー | エビデンス記録済み |
| Codex repo marketplace | `.agents/plugins/marketplace.json` を通じて公開される `ecc@2.0.0-rc.1` | `.agents/plugins/marketplace.json`、`.codex-plugin/README.md` | `HOME="$(mktemp -d)" codex plugin marketplace add <local-checkout>` | `publication-evidence-2026-05-15.md` | プラグインオーナー | Repo-marketplace パス検証済み；公式 Plugin Directory の公開は coming soon |
| OpenCode パッケージ | `ecc-universal` プラグインモジュール | `.opencode/package.json`、`.opencode/index.ts` | `npm run build:opencode` | `publication-evidence-2026-05-12.md` | パッケージオーナー | エビデンス記録済み |
| Agent メタデータ | `2.0.0-rc.1` | `agent.yaml`、`.agents/plugins/marketplace.json` | `node tests/scripts/catalog.test.js` | `publication-evidence-2026-05-12.md` | リリースオーナー | エビデンス記録済み |
| 移行コピー | GA の主張ではなく rc.1 アップグレードパス | `release-notes.md`、`quickstart.md`、`HERMES-SETUP.md` | `npx markdownlint-cli '**/*.md' --ignore node_modules` | `publication-evidence-2026-05-13.md` | ドキュメントオーナー | エビデンス記録済み |

## 公表ゲート

| ゲート | 必要なエビデンス | 新鮮なチェック | ブロッカーフィールド | オーナー | ステータス |
| --- | --- | --- | --- | --- | --- |
| GitHub リリース | タグが存在、リリースノートが最終 URL を使用、必要ならアセット添付 | `gh release view v2.0.0-rc.1 --json tagName,url,isPrerelease` | `Blocker: release not found on 2026-05-12` | リリースオーナー | 承認待ち |
| npm パッケージ | `npm pack --dry-run` に期待されるファイルがあり、バージョンが一致、rc は `next` へ | サポートされる場合は `npm pack --dry-run` と `npm publish --tag next --dry-run` | `Blocker: actual publish requires approval; dry run passed with next tag` | パッケージオーナー | ドライラン合格 |
| Claude プラグイン | マニフェストが検証され、marketplace JSON が公開リポジトリを指し、インストールドキュメントがスラグと一致 | `claude plugin validate .claude-plugin/plugin.json`；`claude plugin tag .claude-plugin --dry-run`；分離された temp-home インストールスモーク | `Blocker: real tag creation/push requires approval` | プラグインオーナー | クリーンチェックアウトのドライランとインストールスモーク記録済み |
| Codex プラグイン | マニフェストバージョンがパッケージとドキュメントに一致、repo marketplace がプラグインルートを指し、OpenAI の現在の公式 Plugin Directory ステータスが記録されている | `node tests/docs/ecc2-release-surface.test.js`；`node tests/plugin-manifest.test.js`；`codex plugin marketplace add --help`；temp-home `codex plugin marketplace add <local-checkout>` | `Blocker: official Plugin Directory publishing and self-serve management are documented as coming soon` | プラグインオーナー | Repo-marketplace 配布検証済み；公式ディレクトリは未了 |
| OpenCode パッケージ | ビルド出力がソースから再生成され、パッケージメタデータが最新 | `npm run build:opencode` | `Blocker: none for local build; public distribution still follows npm/plugin release` | パッケージオーナー | エビデンス記録済み |
| ECC Tools billing リファレンス | いかなる billing の主張も検証済みの Marketplace/App 状態にリンクする | `env -u GITHUB_TOKEN gh repo view ECC-Tools/ECC-Tools --json nameWithOwner,isPrivate,viewerPermission` および内部 `/api/billing/readiness?accountLogin=<marketplace-test-account>` リードバック | `Blocker: ECC-Tools #73 added announcementGate; live Marketplace test-account readback must return announcementGate.ready === true before payment announcement` | ECC Tools オーナー | コードゲート記録済み；ライブ billing リードバックは未了 |
| アナウンスコピー | X、LinkedIn、GitHub リリース、ロングフォームコピーがライブ URL を指す | `rg -n "TODO" docs/releases/2.0.0-rc.1` と `TBD` について繰り返す | `Blocker: final live release/npm/plugin URLs do not exist yet` | リリースオーナー | 未了 |
| 特権ワークフローのハードニング | リリースとメンテナンスのワークフローが永続化されたチェックアウトトークンを避ける | `node scripts/ci/validate-workflow-security.js` | `Blocker:` | リリースオーナー | ポストハードニングリフレッシュでエビデンス記録済み |

## 必要なコマンドエビデンス

いかなる公表アクションの前にも、正確なコミット SHA とコマンド出力を記録してください：

| エビデンス | コマンド | 必要な結果 | 記録された出力 |
| --- | --- | --- | --- |
| クリーンなリリースブランチ | `git status --short --branch` | 意図したリリースコミット上；無関係なファイルなし | 最終的な厳密なクリーンチェックアウトのリリースパスは未了；`publication-evidence-2026-05-17.md` が無関係な untracked `docs/drafts/` を含む現在の `main` を記録 |
| プレビューパックスモーク | `npm run preview-pack:smoke` | プレビューパックアーティファクト、Hermes 境界、最終検証コマンドリスト、公表ブロッカーが合格 | `publication-evidence-2026-05-17.md`：ready yes、digest `dfb1ed014607`、5 合格、0 失敗；最終的な厳密なクリーンチェックアウトのリリースパスで再実行 |
| ハーネス監査 | `npm run harness:audit -- --format json` | 70/70 合格 | `publication-evidence-2026-05-17.md`：70/70 |
| アダプタースコアカード | `npm run harness:adapters -- --check` | PASS | `publication-evidence-2026-05-16.md`：PASS、11 アダプター |
| オブザーバビリティ準備 | `npm run observability:ready` | 21/21 合格 | `publication-evidence-2026-05-17.md`：21/21、ready yes |
| リリースセーフティゲート | `npm run observability:ready -- --format json` | 公表準備、サプライチェーン、ワークフローセキュリティ、パッケージサーフェス、リリースサーフェスのエビデンスで Release Safety カテゴリが合格 | `publication-evidence-2026-05-13-post-hardening.md`：Release Safety 3/3 |
| サプライチェーン検証 | `npm audit --json`；`npm audit signatures`；`cd ecc2 && cargo audit -q`；Dependabot アラート；GitGuardian Security Checks | 脆弱性/アラート 0、レジストリ署名検証済み、GitGuardian クリーン | `publication-evidence-2026-05-17.md`：npm レジストリ署名とアテステーション検証済み、high 以上の npm 脆弱性 0、サプライチェーン IOC スキャンクリーン |
| ルートスイート | `node tests/run-all.js` | 失敗 0 | `publication-evidence-2026-05-17.md`：`npm test` 2487/2487 合格、0 失敗 |
| Markdown lint | `npx markdownlint-cli '**/*.md' --ignore node_modules` | 失敗 0 | `publication-evidence-2026-05-17.md`：ja-JP autonomous-loop アンカー修復後に合格 |
| パッケージサーフェス | `node tests/scripts/npm-publish-surface.test.js` | 失敗 0；npm tarball に Python バイトコードなし | 5月12日のエビデンスパスで `2/2` 合格 |
| リリースサーフェス | `node tests/docs/ecc2-release-surface.test.js` | 失敗 0 | `publication-evidence-2026-05-16.md`：20/20 合格 |
| オプションの Rust サーフェス | `cd ecc2 && cargo test` | 失敗 0 または明示的な延期 | `publication-evidence-2026-05-16.md`：462/462 合格、既存の警告のみ |
| キューベースライン | trunk、AgentShield、JARVIS、ECC Tools、ECC website 全体の `gh pr list` / `gh issue list` | オープン PR 20件未満、オープン issue 20件未満 | `publication-evidence-2026-05-17.md`：プラットフォーム監査 ready、チェック対象リポジトリ全体でオープン PR 0件、オープン issue 0件 |
| ディスカッションベースライン | `node scripts/discussion-audit.js --json` | 未管理のアクティブディスカッションキューなし、承認済み回答が欠けている回答可能な Q&A なし | `publication-evidence-2026-05-15.md`：trunk ディスカッション 58件、メンテナー未対応 0件；その他の追跡対象リポジトリは無効または 0件 |
| Linear ロードマップ | Linear プロジェクトと issue のリードバック | release、security、AgentShield、ECC Tools、legacy、observability のレーンを含む詳細なロードマップが存在 | `publication-evidence-2026-05-15.md`：プロジェクトと16の issue レーン記録済み |
| オペレーター準備状況ダッシュボード | `npm run operator:dashboard -- --json --allow-untracked docs/drafts/` | 現在のキュー状態がマクロゴールの成果物と未完了のギャップにマップされている | `publication-evidence-2026-05-17.md`：`27dc2918` から生成、platform ready true、dashboard ready true、オープン PR 0件、オープン issue 0件、ディスカッションギャップ 0件 |

## 以下の場合は公表しない

- エビデンス記録後に `main` にレビューされていないリリースサーフェスの変更がある。
- `npm view ecc-universal dist-tags --json` が意図した rc/GA タグと矛盾する。
- Claude プラグインの検証が利用できない、または意図したリリースコミットに対する
  クリーンチェックアウトのインストールスモークテストが記録されていない。
- リリースノートまたはアナウンス草稿に、プレースホルダー URL、
  `TODO`、`TBD`、プライベートなワークスペースパス、個人のオペレーターへの参照がまだ含まれている。
- billing、Marketplace、プラグイン提出のコピーが、ライブ URL が存在する前に
  ライブサーフェスを主張している。
- Stale PR 救済作業が同じブランチで進行中である。

## アナウンスの順序

1. リリースバージョン PR をマージする。
2. リリースコミットから必要なコマンドエビデンスを記録する。
3. GitHub プレリリースを作成または検証する。
4. rc dist-tag で npm を publish する。
5. プラグイン marketplace サーフェスを提出または更新する。
6. 最終的なライブ URL でリリースノートを更新する。
7. GitHub リリースコピーを公開する。
8. 公開 URL が機能した後にのみ、X、LinkedIn、ロングフォームコピーを公開する。
