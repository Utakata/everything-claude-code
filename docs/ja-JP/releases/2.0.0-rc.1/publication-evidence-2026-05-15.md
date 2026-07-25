# ECC v2.0.0-rc.1 公表エビデンス - 2026-05-15

これはリリース準備エビデンスのみです。GitHub リリース、npm 公開、プラグインタグ、marketplace 提出、アナウンス投稿を作成しません。

## ソースコミット

| フィールド | エビデンス |
| --- | --- |
| Upstream main ベース | `1949d75e18e59a37de269d88b188fc701f5cf122` |
| エビデンスブランチ | `codex/rc1-agentshield-86-evidence` |
| エビデンススコープ | PR #1932、#1933、#1934、#1935、#1936；AgentShield #86；ECC-Tools #75 後の現在の `main` |
| Git remote | `https://github.com/affaan-m/everything-claude-code.git` |
| ローカルステータスの但し書き | このドキュメントリフレッシュの前、ワーキングツリーに無関係な untracked `docs/drafts/` ディレクトリがあった |

実際のリリースオペレーターは、公開前にクリーンなチェックアウトで最終リリースコミットからすべての publish 向けチェックを再実行すべきです。

## キューとディスカッションの状態

| サーフェス | コマンド | 結果 |
| --- | --- | --- |
| Trunk PR/issue | `affaan-m/everything-claude-code` の `gh pr list` と `gh issue list` | オープン PR 0件、オープン issue 0件 |
| AgentShield PR/issue | `affaan-m/agentshield` の `gh pr list` と `gh issue list` | オープン PR 0件、オープン issue 0件 |
| JARVIS PR/issue | `affaan-m/JARVIS` の `gh pr list` と `gh issue list` | オープン PR 0件、オープン issue 0件 |
| ECC Tools PR/issue | `ECC-Tools/ECC-Tools` の `env -u GITHUB_TOKEN gh pr list` と `env -u GITHUB_TOKEN gh issue list` | オープン PR 0件、オープン issue 0件 |
| ECC website PR/issue | `ECC-Tools/ECC-website` の `env -u GITHUB_TOKEN gh pr list` と `env -u GITHUB_TOKEN gh issue list` | オープン PR 0件、オープン issue 0件 |
| Trunk ディスカッション | GraphQL ディスカッションカウントとメンテナー対応スイープ | ディスカッション計58件；5月15日のメンテナーコメント後、メンテナー未対応 0件 |
| その他のリポジトリのディスカッション | AgentShield、JARVIS、ECC Tools、ECC website の GraphQL ディスカッションカウント | ディスカッション無効または計0件 |
| プラットフォーム監査 | `node scripts/platform-audit.js --json --allow-untracked docs/drafts/` | Ready；オープン PR 0/20、オープン issue 0/20、メンテナー対応が必要なディスカッション 0、コンフリクトするオープン PR 0、ブロッキング dirty ファイル 0 |

ECC Tools 組織は、設定された GitHub ホスト認証情報で到達可能です。このシェルでは、
エクスポートされた `GITHUB_TOKEN` がその認証情報を上書きし、`ECC-Tools/*` に対して
誤った 404/403 の失敗を引き起こします。その環境の上書きが整理されるまで、ECC Tools の
検証コマンドには `env -u GITHUB_TOKEN` を使用してください。

## Linear ロードマップの状態

詳細な実行ロードマップは、現在 Linear プロジェクトにあります：

<https://linear.app/itomarkets/project/ecc-platform-roadmap-52b328ee03e1>

プロジェクトには16の issue レベルのレーンと5つのマイルストーンが含まれます：

| マイルストーン | Issues |
| --- | --- |
| Security and Access Baseline | `ITO-44`、`ITO-57`、`ITO-58` |
| ECC 2.0 Preview and Publication | `ITO-45`、`ITO-46`、`ITO-47`、`ITO-56` |
| AgentShield Enterprise Iteration | `ITO-48`、`ITO-49` |
| ECC Tools Next-Level Platform | `ITO-50`、`ITO-51`、`ITO-52`、`ITO-53`、`ITO-54`、`ITO-59` |
| Legacy Audit and Salvage | `ITO-55` |

Linear に追加されたプロジェクトドキュメント：

- Roadmap Index and Current Execution Baseline
- Status Update 2026-05-15
- GitHub Queue Snapshot 2026-05-15
- Completion Audit Snapshot 2026-05-15
- Discussion Queue Evidence 2026-05-15
- ECC-Tools Access Evidence 2026-05-15

## サプライチェーンのエビデンス

| サーフェス | エビデンス |
| --- | --- |
| PR #1921 | Mini Shai-Hulud/TanStack フォローアップのためのサプライチェーン IOC 拡張をマージ |
| Node IPC フォローアップ / PR #1924 | 5月14日の `node-ipc` の悪意あるバージョン、ハッシュ、DNS、ランタイム IOC カバレッジを追加 |
| PR #1926 | `platform:audit` と `security-ioc-scan` コマンドサーフェス、およびリリースワークフロー IOC ゲートを追加 |
| PR #1932 | キュー、ディスカッション、ロードマップ、リリースのエビデンスをターミナルのみの出力ではなく耐久性のあるアーティファクトとしてキャプチャできるよう、`scripts/platform-audit.js` の JSON/Markdown/file-output モードを追加 |
| PR #1933 | home-scan の IOC カバレッジを、macOS、Linux、Windows 全体の Claude `settings.local.json`、`.claude/hooks/hooks.json`、ユーザーレベルの VS Code / Code Insiders `tasks.json` に拡張 |
| PR #1934 | 通常の CI 依存関係キャッシュを restore-only の `actions/cache/restore` の使用に切り替え、テストジョブが可変な依存関係の状態を共有キャッシュに保存し戻さないようにした |
| PR #1935 | test-only のシリアライズされた current-dir ガードで `ecc2` の current-directory を変更するテストを安定化し、並列テスト実行下で Rust リリースサーフェスゲートを維持 |
| PR #1940 | 6時間ごとにスケジュールされた `.github/workflows/supply-chain-watch.yml` を追加し、TanStack/Mini Shai-Hulud/node-ipc IOC スキャンと npm 署名/audit チェックが耐久性のある `supply-chain-ioc-report.json` アーティファクトを生成するようにした |
| PR #1941 | CI テストワークフローから GitHub Actions 依存関係キャッシュの使用を削除し、npm/pnpm/Yarn/Bun インストールのパッケージマネージャーライフサイクルスクリプトを無効化し、既存の Actions キャッシュをパージし、安全でない install/cache パターンを拒否するバリデーターテストを追加 |
| AgentShield PR #83 | TanStack、Mistral、OpenSearch、Guardrails、UiPath、Squawk、Claude Code / VS Code 永続化、dead-man switch アーティファクトのための Mini Shai-Hulud IOC カバレッジをマージ |
| AgentShield PR #84 | 追加の `@cap-js`、`@draftlab`、`@tallyui`、`intercom-client`、`lightning`、関連するパッケージ/バージョン IOC を含む、より広範な Mini Shai-Hulud フルキャンペーンの影響を受けるパッケージテーブルをマージ |
| AgentShield PR #85 | AgentShield のエンタープライズスキャナーのリリースパスに検証済みのレジストリ署名サーフェスを持たせるため、GitHub Action のサプライチェーン検証、ゲーティング、エビデンスパックを追加 |
| AgentShield PR #86 | 任意の環境変数とトークンをバンドルの外に保ちつつ、ホワイトリスト化された GitHub Actions ワークフロー、コミット、run、ランタイム来歴を含む `ci-context.json` を AgentShield のエビデンスパックに追加 |
| ECC-Tools PR #75 | ライブの Marketplace 管理下のテストアカウントのリードバックが準備できるまで公開の billing の主張がブロックされたままになるよう、ネイティブ GitHub payments アナウンスゲートを厳格化 |
| Trunk マージコミット | `f04702bdac132662c8496e817bcd850c86e2b854`、`ee85e1482e3d6322ddb2706392ea0fc97469bd26`、`13585f1092c92fa3f20ffe0d756e40c5720b0de5`、`553d507ea63bc252e815a924c0d2baea961351a1`、`c0bac4d6ced7f78a5464c6e3fd8cfbb43515a9d5`、`c2c54e7c0b84a213848b9ab3dfeb3ae16fb9844d`、`6b8a49a6eed11cc7df19d8b1f2add085b37cf466`、`1949d75e18e59a37de269d88b188fc701f5cf122`、`6951b8d5d29d13cac6b89b461104ad03838553de`、`f7035b5644ffc857879b71c39353b2141f17c3f0` |
| AgentShield マージコミット | `f899b27ba3fa60ec7e0dca41cc2dadcb1a1fb75d`、`d1aa5313afd915d0b7296e57aabaeb979b1ea93b`、`908d8f3a52a6a65b21e737339b56906603eb1345`、`69a5e25b675b77666d0c96abc22639a5ba883403` |
| ECC-Tools マージコミット | `6d00d67043e92cadc80f160bfe947115bfef33b1` |
| ローカル IOC テスト | `node tests/ci/scan-supply-chain-iocs.test.js` が 15/15 合格 |
| Unicode 安全性 | `node scripts/ci/check-unicode-safety.js` 合格 |
| IOC スキャン | `node scripts/ci/scan-supply-chain-iocs.js --root <ECC-workspace> --home` が no-lifecycle インストールリフレッシュ後、229 ファイルを検査して合格 |
| npm レジストリ検証 | `npm audit signatures` が 241 のレジストリ署名と30のアテステーションを検証；`npm audit --audit-level=high` が脆弱性 0 を検出 |
| Actions キャッシュパージ | `gh cache delete --all --succeed-on-no-caches` が完了し、`gh cache list --limit 20` がキャッシュなしを返した |
| Rust リリースサーフェスゲート | `cd ecc2 && cargo test` が既存の14の dead-code/未使用の警告とともに 462/462 合格 |
| ルートスイート | `node tests/run-all.js` が 2442/2442 合格、0 失敗 |
| リポジトリスイープ | 対象を絞った永続化パスのチェックで、アクティブな `gh-token-monitor`、`pgsql-monitor`、`transformers.pyz`、`pgmonitor.py` アーティファクトは見つからず |

5月15日の IOC 拡張は、シークレットスキャナーに引っかかる完全な高エントロピー指標をコミットせずに、
OpenSearch/Mistral/Guardrails/UiPath/Squawk スタイルのキャンペーン亜種、`opensearch_init.js`、`vite_setup.mjs`、
dead-drop/session プロトコル文字列、AI ツーリング永続化サーフェスのカバレッジを追加しました。
5月15日の node-ipc フォローアップは、`node-ipc@9.1.6`、`9.2.3`、`10.1.1`、
`10.1.2`、`11.0.0`、`11.1.0`、`12.0.1` に加え、`node-ipc.cjs` ペイロード
ハッシュ、悪意ある tarball ハッシュ、DNS 流出ドメイン、Socket が報告したランタイムマーカーを
ブロックします。
AgentShield PR #83 は、対応するスキャナー側のエンタープライズカバレッジを追加します：
バージョン固定のパッケージ検出、`.claude` / `.vscode` の自動化サーフェス
探索、`gh-token-monitor` の LaunchAgent/systemd/local-bin アーティファクト検出、
network/payload IOC、ビルド済みの action/CLI バンドル、1758/1758 のローカルテスト、
マージ前の green な GitHub Actions 検証。
AgentShield PR #84 は、現在の Wiz テーブルで報告された追加の影響を受ける npm パッケージスコープと
スコープなしパッケージを追加し、`dist/action.js` と `dist/index.js` を再ビルドし、
マージ前に 1758/1758 のローカルテストとフルの AgentShield GitHub Actions マトリックスに合格することで、
後のフルキャンペーンパッケージテーブルのギャップを閉じます。
AgentShield PR #85 と trunk PR #1934、#1940、#1941 は、対応を IOC 検出から
リリースパスハードニングへと拡張します：AgentShield は現在その action サーフェスの
レジストリ署名エビデンスを記録し、trunk にはスケジュールされた IOC ウォッチワークフローがあり、
trunk CI はアクティブなサプライチェーンハードニングの間、テストインストールマトリックスで
依存関係キャッシュやパッケージマネージャーライフサイクルスクリプトを使用しなくなりました。
AgentShield PR #86 は、次のエビデンスパック来歴スライスを完成させます：
`agentshield scan --evidence-pack <dir>` が現在 `ci-context.json` を書き込み、
そのアーティファクトを署名付きバンドルダイジェストに含め、バンドル README に文書化し、
`GITHUB_TOKEN` のようなトークンを持つ環境変数が長期のセキュリティレビューアーティファクトに
コピーされないことを検証します。この PR は、マージ前にローカルビルド、typecheck、lint、1764/1764
テスト、Node 18、20、22 全体のフル GitHub Actions マトリックスに合格しました。
PR #1933 は、パッケージのアンインストール後も残るユーザーレベルの設定ファイルを含め、
文書化された Claude Code と VS Code の自動化パスの実務的なワークステーション永続化ギャップを閉じます。

## プレビューパックの状態

`preview-pack-manifest.md` が現在、rc.1 プレビューパックの境界を組み立てます：

- リリースノート、クイックスタート、ローンチチェックリスト、公表準備、ネーミング
  マトリックス、5月15日のエビデンス；
- 公開の Hermes 専門サーフェスとしての `docs/HERMES-SETUP.md` と
  `skills/hermes-imports/SKILL.md`；
- クロスハーネス、ハーネスアダプター、オブザーバビリティ、progress-sync のドキュメント；
- release/package/plugin の公開後に最終的なライブ URL を受け取る必要がある、
  X、LinkedIn、記事、Telegram、デモの素材；
- GitHub リリース、npm `next` publish、Claude プラグイン、
  Codex プラグイン、ECC Tools の billing/製品準備、アナウンスの明示的なブロッカー。

プレビューパックは最終的なクリーンチェックアウトのゲーティングのために組み立てられていますが、
依然として公表アクションではありません。

## Codex Marketplace のエビデンス

OpenAI の現在の Codex プラグインドキュメントは、repo/personal marketplace の
配布を公式 Plugin Directory と区別するようになりました。Repo marketplace は
`.agents/plugins/marketplace.json` に存在します；`codex plugin marketplace add <source>`
は GitHub 短縮形、Git URL、SSH URL、ローカル marketplace ルートを追加できます。
公式 Plugin Directory の公開とセルフサーブ管理は coming soon と文書化されています：

- <https://developers.openai.com/codex/plugins/build#add-a-marketplace-from-the-cli>
- <https://developers.openai.com/codex/plugins/build#how-codex-uses-marketplaces>
- <https://developers.openai.com/codex/plugins/build#publish-official-public-plugins>

| サーフェス | エビデンス |
| --- | --- |
| CLI の形 | `codex plugin marketplace add --help` が GitHub 短縮形、Git URL、SSH URL、ローカル marketplace ルート、`--ref`、Git 限定の `--sparse` をサポート |
| Repo marketplace | `.agents/plugins/marketplace.json` が marketplace ルートから `source.path: "./"` で `ecc@2.0.0-rc.1` を公開 |
| ローカル add スモーク | `HOME="$(mktemp -d)" codex plugin marketplace add <local-checkout>` が marketplace `ecc` を追加し、実際の Codex 設定に触れずにインストール済み marketplace ルートを `<local-checkout>` として記録 |
| README の整合 | `.codex-plugin/README.md` が stale な `codex plugin install` コマンドではなく `codex plugin marketplace add` を使用するようになった |
| 公開ディレクトリのステータス | rc.1 でサポートされる Codex 配布パスは repo-marketplace/手動インストール；公式 Plugin Directory の提出は OpenAI のセルフサーブ公開の利用可能性にブロックされたまま |

## 現在の公表ブロッカー

- GitHub プレリリース `v2.0.0-rc.1` はこのパスでもまだ未作成。
- npm `ecc-universal@2.0.0-rc.1` はまだ `next` dist-tag に publish されていない。
- Claude プラグインタグと marketplace 伝播は承認ゲートのまま。
- Codex プラグインの repo-marketplace 配布は rc.1 で検証済みだが、公式
  Plugin Directory の公開は OpenAI の coming-soon なセルフサーブ公開サーフェスに
  依然としてブロックされている。
- ECC Tools PR #73 がネイティブ GitHub payments の主張のために fail-closed な
  `/api/billing/readiness` `announcementGate` を追加し、ECC Tools PR #74 が
  オペレーター検証器として `npm run billing:announcement-gate` を追加したが、
  いかなる公開の payment アナウンスの前にも、ライブの Marketplace 管理下のテストアカウントの
  リードバックが依然として `announcementGate.ready === true` を返す必要がある。
- リリースノート、X、LinkedIn、ロングフォームコピーは、release/package/plugin の URL が
  存在した後、依然として最終的なライブ URL が必要。

## 結果

キュー、ディスカッション、Linear ロードマップ、サプライチェーンのエビデンスは、5月13日の
公表エビデンスよりも新鮮です。これらは準備を改善しますが、`publication-readiness.md` が
要求する最終的なクリーンチェックアウトの publish パスを置き換えるものではありません。
