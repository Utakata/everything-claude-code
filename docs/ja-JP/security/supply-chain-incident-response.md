# サプライチェーンインシデント対応

このプレイブックは、npm、GitHub Actions、およびエコシステム横断のパッケージレジストリインシデントのための ECC オペレーター runbook です。意図的に保守的です：レジストリ署名、来歴、trusted publishing は有用なシグナルですが、ワークフローが意図したコードパスを実行したことを証明するものではありません。

## 現在の外部トリガー

2026-05-15 時点で、アクティブなインシデントクラスは、2026年5月の TanStack npm サプライチェーン侵害と、より広範な Mini Shai-Hulud キャンペーンです。ECC は、これらのインシデントがパッケージの install/publish パス、AI 開発者ツールの設定、開発者の認証情報を狙うため、関連する npm/PyPI の波に対して同じ IOC スイープを保ちます：

- TanStack は、2026-05-11 の 19:20 から 19:26 UTC の間に公開された、42 個の `@tanstack/*`
  パッケージにまたがる84の悪意あるバージョンを報告した。
- GitHub アドバイザリ `GHSA-g7cv-rxg3-hmpx` / `CVE-2026-45321` は、
  クラウド認証情報、GitHub トークン、npm
  認証情報、Vault トークン、Kubernetes トークン、SSH 秘密鍵を収集する install-time マルウェアを記述する。
- StepSecurity、Socket、Aikido、Wiz からのフォローオンレポートは、
  同じキャンペーンが Mistral AI、UiPath、OpenSearch、Guardrails AI、Squawk、その他の
  npm/PyPI パッケージに関連するパッケージに拡大していることを記述する。
- Socket の 2026-05-14 の `node-ipc` レポートは、`node-ipc` バージョン `9.1.6`、`9.2.3`、`12.0.1`
  に影響する別個のアクティブな npm
  侵害を記述する。過去の悪意ある `node-ipc` バージョンも、破壊的または不正なファイル書き込みの
  挙動を持っていたため、ECC によってブロックされている。
- ライブの IOC セットには、Claude Code
  `.claude/settings.json`、VS Code `.vscode/tasks.json`、OS レベルの
  `gh-token-monitor` LaunchAgent/systemd サービスを通じた永続化が含まれる。一部の亜種は、
  `~/.config/gh-token-monitor/token` と dead-man-switch トークンの説明
  `IfYouRevokeThisTokenItWillWipeTheComputerOfTheOwner`、`.github/workflows/codeql_analysis.yml` のような
  悪意あるワークフローファイル、`transformers.pyz` / `pgmonitor.py` のような Python ランタイム
  ペイロードを追加する。盗まれた GitHub トークンをローテーションする前に、それらの
  永続化フックを削除する。
- スキャナーは、遅延レポートのマーカーも監視する：`router_init.js`
  SHA-256 の prefix/suffix `ab4fcada...8601266c`、`tanstack_runner.js`
  SHA-256 の prefix/suffix `2ec78d55...6be27fc96`、
  `opensearch_init.js`、`vite_setup.mjs`、キャンペーンソルト `svksjrhjkcejg`、
  Session プロトコル文字列、`claude@users.noreply.github.com` の dead-drop
  コミット、`dependabout/` ブランチ名、`OhNoWhatsGoingOnWithGitHub`。
- `node-ipc` スイープは、`node-ipc.cjs` ペイロードハッシュ
  `96097e06...d9034144`、悪意ある `9.1.6`、`9.2.3`、`12.0.1` アーティファクトの
  tarball ハッシュ、`sh.azurestaticprovider.net`、`bt.node.js`、
  `37.16.75.69`、アーティファクトに存在する場合の DNS 流出ラベル
  `xh` / `xd` / `xf`、`__ntw`、`__ntRun`、`/nt-` 一時アーカイブ、
  `uname.txt`、`envs.txt`、`fixtures/_paths.txt` のようなアーカイブエントリを監視する。
- 攻撃チェーンは、`pull_request_target`、fork/base の信頼境界をまたぐ GitHub Actions キャッシュ
  ポイズニング、GitHub Actions ランナーからの OIDC トークン抽出を組み合わせた。
- npm trusted publishing/来歴は、パッケージがバインドされた CI
  アイデンティティから来たことを確認できる。それ自体では、CI キャッシュ、ライフサイクルスクリプト、
  publish パスが安全だったことを証明できない。

主要リファレンス：

- <https://tanstack.com/blog/npm-supply-chain-compromise-postmortem>
- <https://github.com/advisories/GHSA-g7cv-rxg3-hmpx>
- <https://tanstack.com/blog/incident-followup>
- <https://www.wiz.io/blog/mini-shai-hulud-strikes-again-tanstack-more-npm-packages-compromised>
- <https://socket.dev/blog/node-ipc-package-compromised>
- <https://docs.npmjs.com/trusted-publishers/>
- <https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem>

## ECC 露出チェック

リリース候補の前、広範な依存関係バンプの後、およびいかなるパッケージレジストリインシデントの後にも、これを実行します。

```bash
npm run security:ioc-scan
node scripts/ci/scan-supply-chain-iocs.js --home
npm ci --ignore-scripts
npm audit signatures
npm audit --audit-level=high
node scripts/ci/supply-chain-advisory-sources.js --json
node scripts/ci/validate-workflow-security.js
node tests/scripts/npm-publish-surface.test.js
node tests/run-all.js
```

検索ヒットがドキュメントの例にのみ現れる場合は、リリースエビデンスに記録しますが、docs のみの参照のために認証情報をローテーションしないでください。

## 耐久性のあるウォッチワークフロー

ECC は、6時間ごとおよび手動ディスパッチで `.github/workflows/supply-chain-watch.yml` も実行します。ワークフローは読み取り専用で、チェックアウトの認証情報永続化を無効化し、`npm ci --ignore-scripts` でインストールし、npm レジストリ署名を検証し、IOC スキャナーのフィクスチャを実行し、`scripts/ci/supply-chain-advisory-sources.js --refresh --json` を実行し、`supply-chain-ioc-report.json` と `supply-chain-advisory-sources.json` を出力し、GitHub Actions のハードニングルールを再検証します。

失敗したスケジュールされたウォッチは、オペレーターがその失敗が新しく報告されたアドバイザリか、stale なスキャナーフィクスチャか、レジストリ署名の問題か、ワークフローハードニングのリグレッションかを確認するまで、リリースブロッカーとして扱います。スキャナーが新しい指標を必要とする場合は、`scripts/ci/scan-supply-chain-iocs.js` を更新し、`tests/ci/scan-supply-chain-iocs.test.js` にフィクスチャカバレッジを追加し、この runbook をリフレッシュし、最新の JSON アーティファクトをリリースエビデンスに添付します。

アドバイザリソースアーティファクトは ITO-57 のステータスペイロードです。信頼されたソースレジストリ、ライブ URL リフレッシュの警告、Linear 対応のサマリーを記録します。IOC カバレッジを変更する前に `npm run security:advisory-sources -- --json` を通じてソースカバレッジをリフレッシュし、各重要なマージバッチの後、次の Linear プロジェクトステータス更新にアーティファクトを添付します。

## 即時対応

ECC またはメンテナーのマシンが既知の不正なパッケージバージョンをインストールした場合：

1. ホストが publish または deploy するのを止める。
2. クリーンアップの前にエビデンスを保存する：
   - パッケージマネージャーのコマンド履歴；
   - `package-lock.json`、`pnpm-lock.yaml`、または `yarn.lock`；
   - CI 実行 URL とランナーログ；
   - npm パッケージバージョンと tarball の整合性ハッシュ；
   - 利用可能な場合のアウトバウンドネットワークログ。
3. ライフサイクルスクリプトが実行された可能性がある場合、インストールホストを侵害されたものとして扱う。
4. トークン失効の前に永続化フックを削除する：
   - `~/.claude/settings.json` の `SessionStart` フックと隣接する
     `router_runtime.js` / `setup.mjs` ペイロードファイル；
   - `.vscode/tasks.json` の folder-open タスクと隣接するペイロードファイル；
   - `~/Library/LaunchAgents/com.user.gh-token-monitor.plist`；
   - `~/.config/systemd/user/gh-token-monitor.service`；
   - `~/.config/systemd/user/pgsql-monitor.service`；
   - `~/.config/gh-token-monitor/token`；
   - `~/.local/bin/gh-token-monitor.sh`；
   - `~/.local/bin/pgmonitor.py`；
   - `/tmp/transformers.pyz`、`/tmp/pgmonitor.py`、および macOS 上の
     `/private/tmp/` 相当物。
5. プロセスが到達できるすべての認証情報をローテーションする：
   - npm automation トークンとメンテナートークン；
   - GitHub PAT、fine-grained トークン、deploy キー、Actions シークレット；
   - クラウド認証情報、Vault トークン、Kubernetes サービスアカウントトークン、SSH
     キー、ローカルの `.npmrc` トークン；
   - 環境変数またはユーザースコープの設定で利用可能な、あらゆる MCP、プラグイン、
     またはハーネスの認証情報。
6. 影響を受けるリポジトリの GitHub Actions 依存関係キャッシュをパージする。
7. まずライフサイクルスクリプトを無効化して、クリーンな環境から再インストールする：
   `npm ci --ignore-scripts`、`pnpm install --ignore-scripts`、
   `yarn install --mode=skip-build`、または `bun install --ignore-scripts`。
8. 依存関係ツリーとパッケージバージョンが known-clean なリリースに固定された後にのみ、
   ライフサイクルスクリプトを再有効化する。

## GitHub Actions ルール

ECC は `scripts/ci/validate-workflow-security.js` を通じてこれらのルールを強制します：

- 特権ワークフローは、信頼できない PR ref をチェックアウトしてはならない；
- すべてのワークフローの依存関係インストールは、ライフサイクルスクリプトを無効化しなければならない；
- ワークフローは、アクティブなサプライチェーンハードニング中に、共有の GitHub Actions 依存関係キャッシュを
  restore または save してはならない；
- `id-token: write` を持つワークフローは、共有の依存関係キャッシュを restore または save
  してはならない；
- `npm audit` を実行するワークフローは、`npm audit signatures` も実行しなければならない；
- `pull_request_target` ワークフローは、共有の依存関係キャッシュを restore または save
  してはならない。

いかなる違反もリリースブロッカーとして扱います。

## 公開ルール

ECC をタグ付けまたは公開する前に：

1. アクティブなアドバイザリのパッケージへの予期しない依存関係がないことを検証する。
2. リリースコマンドにはクリーンなチェックアウトまたは使い捨てのワークツリーを使用する。
3. PR/テストのキャッシュを publish ジョブと混ぜない。
4. `id-token: write` を、共有の依存関係キャッシュを使用しないリリースワークフローに限定する。
5. サポートされる場合は trusted publishing/来歴を優先しつつ、依然としてローカルの
   パッケージサーフェステストとレジストリ署名検証を要求する。
6. npm dist-tag、GitHub リリース、Claude プラグイン、Codex プラグイン、
   OpenCode パッケージの状態を publication-readiness エビデンスドキュメントで確認する。

## エスカレーションのタイミング

以下の場合、いかなるリリースまたはマージの前にもメンテナーのセキュリティレビューにエスカレーションします：

- 依存関係のロックファイルが、アクティブなアドバイザリで名指しされたパッケージを参照する；
- `node scripts/ci/scan-supply-chain-iocs.js --home` が Claude Code、
  VS Code、または OS レベルの永続化指標を見つける；
- ワークフローが `pull_request_target` を、依存関係インストール、
  キャッシュ restore/save、PR-head チェックアウト、または write 権限と組み合わせる；
- リリースワークフローが `id-token: write` を共有キャッシュの使用と組み合わせる；
- publish ワークフローが、文書化された理由なしに長期の npm トークンを使用する；
- AgentShield、GitGuardian、Dependabot、npm audit、またはレジストリ署名のチェックが
  一致しない。
