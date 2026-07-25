# ECC v2.0.0-rc.1 公表エビデンス - 2026-05-16

これはリリース準備エビデンスのみです。GitHub リリース、npm 公開、プラグインタグ、marketplace 提出、アナウンス投稿を作成しません。

## ソースコミット

| フィールド | エビデンス |
| --- | --- |
| Upstream main | `6bced468d76b269243a6f0bd28472853aa78e0e4` |
| Git remote | `https://github.com/affaan-m/everything-claude-code.git` |
| エビデンススコープ | PR #1944、PR #1945、issue #1946 トリアージ、PR #1947 サプライチェーン保護、AgentShield PR #87、AgentShield PR #88、AgentShield PR #89、AgentShield PR #90、AgentShield PR #91、AgentShield PR #92、ECC-Tools PR #76、ECC-Tools PR #77、ECC-Tools PR #78、日本語ローカライゼーショントリアージ、ITO-57 同期、オペレーターダッシュボードリフレッシュ後の現在の `main` |
| ローカルステータスの但し書き | `git status --short --branch` が `## main...origin/main` と無関係な untracked `docs/drafts/` を表示 |

実際のリリースオペレーターは、公開前に厳密にクリーンなチェックアウトで最終リリースコミットからすべての publish 向けチェックを再実行すべきです。

## キューとディスカッションの状態

| サーフェス | コマンド | 結果 |
| --- | --- | --- |
| Trunk PR | `gh pr list --state open --json number,title,url --limit 20` | オープン PR 6件：Dependabot #1959-#1963 と、日本語ローカライゼーションパリティで changes requested のまま開いている PR #1953 |
| Trunk issue | `gh issue list --state open --json number,title,url --limit 20` | オープン issue 3件：保留中のローカライゼーション PR にリンクした #1951 と、次のキューバッチを待つ #1957・#1958 |
| プラットフォーム監査 | `node scripts/platform-audit.js --json --allow-untracked docs/drafts/` | Ready；オープン PR 6、オープン issue 3、ディスカッションのメンテナー対応ギャップ 0、ディスカッションの回答欠落ギャップ 0、クリーンチェックアウトでのブロッキング dirty ファイル 0；現在のブランチ生成はミラー編集をローカルの dirty 作業として認識 |
| オペレーターダッシュボード | `npm run operator:dashboard -- --json --allow-untracked docs/drafts/` | `dashboardReady: true`、`platformReady: true`、head `6bced468d76b269243a6f0bd28472853aa78e0e4` |

## マージとトリアージのバッチ

| 項目 | 結果 |
| --- | --- |
| PR #1944 | statusline ANSI パレット更新を `50ac061f9e72d7daa137f1bd08760cf74e9b577d` としてマージ；マージ前に対象を絞った `node tests/hooks/ecc-statusline.test.js` と `node scripts/ci/validate-hooks.js` が合格 |
| PR #1945 | `recsys-pipeline-architect` コミュニティスキルを `9e973b29fb1a2a0aeb9e6980017b67c3ddb05201` としてマージ；メンテナーパッチがカタログ数を同期し、Unicode 安全性でブロックされた絵文字を削除 |
| Issue #1946 | 修正済みのメンテナーコメントとともにトリアージ済みとしてクローズ；Linear `ITO-60` が GateGuard の proactive fact-forcing プリフライト UX を追跡するようになった |
| PR #1947 | スケジュールされたサプライチェーンウォッチ/アドバイザリソースのエビデンスを `4093d1bb7a14db1b4d4ea5bd00f2073baf94bfb0` としてマージ；trunk にスケジュールウォッチのエビデンスに配線された TanStack/Mini Shai-Hulud/node-ipc IOC スキャンとアドバイザリソースレポートのサーフェスが追加された |
| AgentShield PR #87 | プラグインキャッシュのランタイム信頼度分類を `26bb44650663816d07180e0d20c1895e431a326c` としてマージ；インストール済みの Claude プラグインキャッシュ findings が `runtimeConfidence: plugin-cache` を出力するようになり、`plugins/cache` は `.claude` 配下の Claude キャッシュにのみマップされ、キャッシュされたフック実装がアクティブな `hook-code` として誤ラベル付けされなくなった |
| AgentShield PR #88 | エビデンスパックの inspect/readback を `65ed6e2a87545dc99d962b58413f49096a4d70ec` としてマージ；`agentshield evidence-pack inspect` が report、policy、baseline、supply-chain、CI コンテキスト、remediation、および不正なアーティファクトエラーについて検証済みの JSON/text サマリーを出力するようになった |
| AgentShield PR #89 | エビデンスパックのフリートルーティングを `521ada9091bb6d818511ab8589ae675b920c106a` としてマージ；`agentshield evidence-pack fleet <dirs...> [--json]` が複数の検証済みバンドルを ready、security-blocker、policy-review、baseline-regression、supply-chain-review、invalid のルートに finding、policy、baseline、supply-chain、remediation の合計とともに集約するようになった |
| AgentShield PR #90 | フリートレビューアイテムを `6d1c57c92000541d65a3b6bc366f0322d7d0dacc` としてマージ；`agentshield evidence-pack fleet --json` が route、severity、repository/target コンテキスト、ソースエビデンスパス、reason、owner-ready な推奨を含む `reviewItems` を出力するようになり、text CLI が `Review items` ブロックを出力するようになった |
| AgentShield PR #91 | チェックサムバックアップのポリシーエクスポートを `73e1e3586dc4513a462e39c9799f75eea104e110` としてマージ；`agentshield policy export` が選択された pack ごとに1つの JSON ポリシーファイルと SHA-256 ダイジェスト付きの `manifest.json` を書き込み、pack 選択、繰り返しの owner、name プレフィックス、JSON 出力をサポート |
| AgentShield PR #92 | チェックサム検証済みのポリシー昇格を `e7e259dc6212b63a8e03a253ca6b8c1e3c2abff7` としてマージ；`agentshield policy promote` がエクスポートマニフェストと選択されたポリシーダイジェストを検証し、改ざんされた JSON を拒否し、マルチ pack マニフェストには明示的な pack 選択を要求し、dry-run JSON レビューをサポートし、検証後にのみアクティブポリシーを書き込む |
| ECC-Tools PR #76 | AgentShield フリートサマリー消費を `5bde2328d15f584481fb6334e6960716dbf3e16f` としてマージ；ホステッド `security-evidence-review` が `agentshield-evidence/fleet-summary.json` を認識し、`evidence-pack-fleet` として分類し、invalid/security-blocker/policy/baseline/supply-chain のフリート結果をホステッド findings にルーティングし、不正なフリート JSON では fail closed する |
| ECC-Tools PR #77 | ホステッド finding のソースエビデンス出力を `31fd883b3f0cee135aee4839b01d34855b7867f6` としてマージ；ホステッドジョブの PR コメントと check-run の詳細に、AgentShield フリート由来の findings を含め、finding ごとに最大3つのソースエビデンスパスを持つ `Evidence` 列が含まれるようになった |
| ECC-Tools PR #78 | AgentShield フリートルートのハーネスレビューを `0d4eb949aa56f56da88e6654273a22ffb95983a1` としてマージ；ホステッド `harness-compatibility-audit` がフリートサマリーを収集し、route ターゲットパスを Claude/Codex/OpenCode/MCP/plugin のハーネスオーナーにマップし、ソースエビデンスパス付きの owner-review findings を出力するようになった |
| ITO-57 | PR #1947 のアドバイザリソースエビデンス、マージ後のソースリフレッシュ、IOC スキャン、npm audit/署名チェック、OpenAI アプリ更新の但し書きで更新 |
| ITO-49 | AgentShield PR #87、#88、#89、#90、#91、#92 のマージエビデンス、ローカルテストエビデンス、CI ステータス、ライブ `~/.claude` スキャン分類数、ローカル Mini Shai-Hulud 保護スキャン結果、ポリシー昇格検証で更新 |
| ITO-50 | ECC-Tools PR #76、PR #77、PR #78 のマージエビデンス、ホステッドセキュリティレビューの挙動、ホステッド finding エビデンスパスの挙動、ハーネスフリートルートの owner-review 挙動、ローカルテストエビデンス、リモートの Verify/Security Audit/Workers ビルドチェックで更新 |
| ITO-44 | キュークリーンアップ、ダッシュボードリフレッシュ、残りのマクロギャップで更新 |

## リリースゲートコマンド

| ゲート | コマンド | 結果 |
| --- | --- | --- |
| ルートスイート | `npm test` | 2469 合格、0 失敗 |
| Rust `ecc2` スイート | `cd ecc2 && cargo test` | 462 合格、0 失敗；既存の dead-code/未使用の警告のみ |
| リリースサーフェス | `node tests/docs/ecc2-release-surface.test.js` | 20 合格 |
| ハーネスアダプター | `npm run harness:adapters -- --check` | PASS；11 アダプター |
| ハーネス監査 | `npm run harness:audit -- --format json` | 70/70、トップアクションなし |
| オブザーバビリティ準備 | `npm run observability:ready` | 21/21、ready yes |
| サプライチェーン IOC スキャン | `npm run security:ioc-scan` | 合格；227 ファイルを検査 |
| アドバイザリソースリフレッシュ | `npm run security:advisory-sources -- --refresh --json` | Ready；アクティブソース 9件；Linear ペイロードは同期のため依然として `ITO-57` を指す |
| npm audit | `npm audit --audit-level=moderate` | 脆弱性 0 |
| npm 署名 | `npm audit signatures` | 241 の検証済みレジストリ署名；30の検証済みアテステーション |
| ダッシュボードレンダラー | `node tests/scripts/operator-readiness-dashboard.test.js` | 7 合格、0 失敗 |

## 現在の公表ブロッカー

- GitHub プレリリース `v2.0.0-rc.1` はこのパスでもまだ未作成。
- npm `ecc-universal@2.0.0-rc.1` はまだ `next` dist-tag に publish されていない。
- Claude プラグインタグと marketplace 伝播は承認ゲートのまま。
- Codex repo-marketplace の配布は rc.1 で検証済みだが、公式
  Plugin Directory の公開は OpenAI の coming-soon なセルフサーブ公開サーフェスに
  ブロックされたまま。
- ECC Tools の billing/native-payments コピーは、ライブの Marketplace 管理下の
  テストアカウントのリードバックが announcement-ready なゲートを返すまでブロックされたまま。
- リリースノート、X、LinkedIn、GitHub リリース、ロングフォームコピーは、
  release/package/plugin の URL が存在した後、依然として最終的なライブ URL が必要。
- ローカルチェックアウトには依然として無関係な untracked `docs/drafts/` があるため、
  実際の公表前に厳密なクリーンチェックアウトのリリースパスが依然として必要。

## 結果

公開の PR キュー、issue キュー、ディスカッションキューはクリアであり、rc.1
プレビューパックは2026年5月16日にメインの Node、Rust、リリースサーフェス、ハーネス、オブザーバビリティ、
サプライチェーンのゲートに合格しました。これは公表準備を改善しますが、`publication-readiness.md` の
承認ゲート付きの release、package、plugin、announcement のステップを置き換えるものではありません。
