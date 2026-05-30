**Language:** English | [Português (Brasil)](docs/pt-BR/README.md) | [简体中文](README.zh-CN.md) | [繁體中文](docs/zh-TW/README.md) | [日本語](docs/ja-JP/README.md) | [한국어](docs/ko-KR/README.md) | [Türkçe](docs/tr/README.md) | [Русский](docs/ru/README.md) | [Tiếng Việt](docs/vi-VN/README.md) | [ไทย](docs/th/README.md)

# Everything Claude Code

![Everything Claude Code — the performance system for AI agent harnesses](assets/hero.png)

[![Stars](https://img.shields.io/github/stars/affaan-m/everything-claude-code?style=flat)](https://github.com/affaan-m/everything-claude-code/stargazers)
[![Forks](https://img.shields.io/github/forks/affaan-m/everything-claude-code?style=flat)](https://github.com/affaan-m/everything-claude-code/network/members)
[![Contributors](https://img.shields.io/github/contributors/affaan-m/everything-claude-code?style=flat)](https://github.com/affaan-m/everything-claude-code/graphs/contributors)
[![npm ecc-universal](https://img.shields.io/npm/dw/ecc-universal?label=ecc-universal%20weekly%20downloads&logo=npm)](https://www.npmjs.com/package/ecc-universal)
[![npm ecc-agentshield](https://img.shields.io/npm/dw/ecc-agentshield?label=ecc-agentshield%20weekly%20downloads&logo=npm)](https://www.npmjs.com/package/ecc-agentshield)
[![GitHub App Install](https://img.shields.io/badge/GitHub%20App-150%20installs-2ea44f?logo=github)](https://github.com/marketplace/ecc-tools)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Shell](https://img.shields.io/badge/-Shell-4EAA25?logo=gnu-bash&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white)
![Go](https://img.shields.io/badge/-Go-00ADD8?logo=go&logoColor=white)
![Java](https://img.shields.io/badge/-Java-ED8B00?logo=openjdk&logoColor=white)
![Perl](https://img.shields.io/badge/-Perl-39457E?logo=perl&logoColor=white)
![Markdown](https://img.shields.io/badge/-Markdown-000000?logo=markdown&logoColor=white)

> **182K+ stars** | **28K+ forks** | **170+ contributors** | **12+ language ecosystems** | **Anthropic Hackathon Winner**

---

<div align="center">

**Language / 语言 / 語言 / Dil / Язык / Ngôn ngữ**

[**English**](README.md) | [Português (Brasil)](docs/pt-BR/README.md) | [简体中文](README.zh-CN.md) | [繁體中文](docs/zh-TW/README.md) | [日本語](docs/ja-JP/README.md) | [한국어](docs/ko-KR/README.md)
 | [Türkçe](docs/tr/README.md) | [Русский](docs/ru/README.md) | [Tiếng Việt](docs/vi-VN/README.md) | [ไทย](docs/th/README.md)

</div>

---

**AIエージェントハーネスのためのパフォーマンス最適化システム。Anthropicハッカソン優勝者より。**

単なる設定ファイルではない。スキル、インスティンクト（直感学習）、メモリ最適化、継続的学習、セキュリティスキャン、そしてリサーチファーストな開発手法を含む完全なシステムである。実際のプロダクトを構築するために10ヶ月以上にわたる集中的な日常使用を経て進化してきた、本番環境対応のagent、skill、hook、rule、MCP設定、およびレガシーコマンドシム群を提供する。

**Claude Code**, **Codex**, **Cursor**, **OpenCode**, **Gemini**, **Zed**, **GitHub Copilot** など、その他のAIエージェントハーネスを横断して動作する。

ECC v2.0.0-rc.1では、その再利用可能なレイヤーの上にパブリックなHermesオペレーターストーリーを追加している。まずは[Hermes setup guide](docs/HERMES-SETUP.md)から始め、次に[rc.1 release notes](docs/releases/2.0.0-rc.1/release-notes.md)と[cross-harness architecture](docs/architecture/cross-harness.md)を確認されたい。

---

<table>
<tr>
<td width="25%" align="center">
  <a href="https://ecc.tools/pricing">
    <strong> ECC Pro</strong><br />
    <sub>プライベートリポジトリ · GitHub App · $19/シート/月</sub>
  </a>
</td>
<td width="25%" align="center">
  <a href="https://github.com/sponsors/affaan-m">
    <strong> Sponsor</strong><br />
    <sub>OSSへの資金提供 · 月額$5から</sub>
  </a>
</td>
<td width="25%" align="center">
  <a href="https://github.com/affaan-m/everything-claude-code/discussions">
    <strong>Community</strong>
    <br />
    <sub>ディスカッション · Q&amp;A · Show & Tell</sub>
  </a>
</td>
<td width="25%" align="center">
  <a href="https://github.com/apps/ecc-tools">
    <strong> GitHub App</strong><br />
    <sub>インストール · PR監査 · 無料枠あり</sub>
  </a>
</td>
</tr>
</table>

<sub>**OSSは常に無料である。** このリポジトリは永久にMITライセンスである。ECC Proはプライベートリポジトリ向けのホスト型GitHub Appである。<a href="https://github.com/sponsors/affaan-m">Sponsor</a>や<a href="https://ecc.tools/pricing">Pro subscriber</a>がこの開発に資金を提供しているため、単独のメンテナーが7つのハーネスを横断して毎週リリースを出荷できている。</sub>

---
## The Guides

このリポジトリには生のコードのみが含まれている。ガイドがすべてを説明している。

<table>
<tr>
<td width="33%">
<a href="https://x.com/affaanmustafa/status/2012378465664745795">
<img src="./assets/images/guides/shorthand-guide.png" alt="The Shorthand Guide to Everything Claude Code" />
</a>
</td>
<td width="33%">
<a href="https://x.com/affaanmustafa/status/2014040193557471352">
<img src="./assets/images/guides/longform-guide.png" alt="The Longform Guide to Everything Claude Code" />
</a>
</td>
<td width="33%">
<a href="https://x.com/affaanmustafa/status/2033263813387223421">
<img src="./assets/images/security/security-guide-header.png" alt="The Shorthand Guide to Everything Agentic Security" />
</a>
</td>
</tr>
<tr>
<td align="center"><b>Shorthand Guide</b><br/>セットアップ、基礎、哲学。<b>最初にこれを読むこと。</b></td>
<td align="center"><b>Longform Guide</b><br/>トークン最適化、メモリ永続化、評価、並列化。</td>
<td align="center"><b>Security Guide</b><br/>攻撃ベクトル、サンドボックス化、サニタイズ、CVE、AgentShield。</td>
</tr>
</table>

| トピック | 学べること |
|-------|-------------------|
| トークン最適化 | モデル選択、システムプロンプトのスリム化、バックグラウンドプロセス |
| メモリ永続化 | セッション間でコンテキストを自動的に保存・読み込みするhook |
| 継続的学習 | セッションからパターンを自動抽出し、再利用可能なskillへ変換 |
| 検証ループ | チェックポイントと継続的評価、グレーダータイプ、pass@kメトリクス |
| 並列化 | Git worktree、カスケードメソッド、インスタンスのスケーリング時期 |
| サブエージェントオーケストレーション | コンテキスト問題、反復的検索パターン |

---

## What's New

### v2.0.0-rc.1 — Surface Refresh, Operator Workflows, and ECC 2.0 Alpha (Apr 2026)

- **Dashboard GUI** — Tkinterベースの新しいデスクトップアプリケーション（`ecc_dashboard.py`または`npm run dashboard`）。ダーク/ライトテーマの切り替え、フォントのカスタマイズ、ヘッダーとタスクバーのプロジェクトロゴを備える。
- **ライブリポジトリに同期されたパブリックサーフェス** — メタデータ、カタログカウント、プラグインマニフェスト、およびインストール向けのドキュメントが、実際のOSSサーフェス（60のagent、231のskill、75のレガシーコマンドシム）と一致するようになった。
- **オペレーターとアウトバウンドワークフローの拡張** — `brand-voice`、`social-graph-ranker`、`connections-optimizer`、`customer-billing-ops`、`ecc-tools-cost-audit`、`google-workspace-ops`、`project-flow-ops`、`workspace-surface-audit`によりオペレーターレーンが完成。
- **メディアとローンチツール** — `manim-video`、`remotion-video-creation`、およびアップグレードされたソーシャルパブリッシングサーフェスにより、技術的な解説とローンチコンテンツが同一システムの一部となった。
- **フレームワークとプロダクトサーフェスの成長** — `nestjs-patterns`、よりリッチなCodex/OpenCodeインストールサーフェス、および拡張されたクロスハーネスパッケージングにより、Claude Codeの枠を超えてリポジトリが利用可能になっている。
- **ECC 2.0 alphaをツリーに統合** — `ecc2/`にあるRustのコントロールプレーンプロトタイプがローカルでビルド可能になり、`dashboard`、`start`、`sessions`、`status`、`stop`、`resume`、`daemon`コマンドを公開している。アルファ版として利用可能だが、まだ一般向けリリースではない。
- **オペレーターステータスのスナップショット** — `ecc status --markdown --write status.md`は、ローカルの状態ストアを移植可能なハンドオフに変換する。これには準備状態、アクティブなセッション、skill実行の健全性、インストールの健全性、保留中のガバナンスイベント、およびLinear/GitHub/ハンドオフからのリンクされた作業アイテムが含まれる。手動入力には`ecc work-items upsert ...`を、PR/イシューキューの状態には`ecc work-items sync-github --repo owner/repo`を、準備状態に注意が必要な場合に自動化を失敗させるには`ecc status --exit-code`を使用すること。
- **エコシステムの堅牢化** — AgentShield、ECC Toolsのコストコントロール、課金ポータルの作業、ウェブサイトの刷新は、別々のサイロに漂流することなく、引き続きコアプラグインを中心に提供される。

### v1.9.0 — Selective Install & Language Expansion (Mar 2026)

- **選択的インストールアーキテクチャ** — `install-plan.js`および`install-apply.js`を用いた、コンポーネントのターゲットインストール向けマニフェスト主導のインストールパイプライン。状態ストアがインストールされたものを追跡し、差分更新を可能にする。
- **6つの新しいagent** — `typescript-reviewer`、`pytorch-build-resolver`、`java-build-resolver`、`java-reviewer`、`kotlin-reviewer`、`kotlin-build-resolver`により、サポート言語が10言語に拡大した。
- **新しいskill** — ディープラーニングワークフロー向けの`pytorch-patterns`、APIリファレンス調査向けの`documentation-lookup`、モダンJSツールチェーン向けの`bun-runtime`と`nextjs-turbopack`、さらに8つのオペレーショナルドメインスキルと`mcp-server-patterns`を追加した。
- **セッションと状態インフラストラクチャ** — クエリCLIを備えたSQLite状態ストア、構造化された記録のためのセッションアダプター、自己改善スキルのためのskill進化基盤。
- **オーケストレーションの全面見直し** — ハーネス監査のスコアリングが確定的になり、オーケストレーションのステータスとランチャーの互換性が強化され、5層のガードによるオブザーバーループ防止機能が追加された。
- **オブザーバーの信頼性** — スロットリングとテールサンプリングによるメモリ爆発の修正、サンドボックスアクセスの修正、遅延開始ロジック、および再入防止ガード。
- **12の言語エコシステム** — 既存のTypeScript、Python、Go、および共通ルールに加え、Java、PHP、Perl、Kotlin/Android/KMP、C++、Rustの新しいルールが追加された。
- **コミュニティからの貢献** — 韓国語および中国語の翻訳、biome hookの最適化、ビデオ処理スキル、運用スキル、PowerShellインストーラー、Antigravity IDEのサポート。
- **CIの堅牢化** — 19件のテスト失敗を修正し、カタログカウントの強制、インストールマニフェストの検証、および完全なテストスイートのグリーン化を達成した。

### v1.8.0 — Harness Performance System (Mar 2026)

- **ハーネスファーストなリリース** — ECCは単なる設定パックではなく、agentハーネスパフォーマンスシステムとして明確に位置付けられるようになった。
- **hookの信頼性の全面見直し** — SessionStartルートフォールバック、Stopフェーズのセッション要約、および壊れやすいインラインのワンライナーを置き換えるスクリプトベースのhook。
- **hookランタイムコントロール** — `ECC_HOOK_PROFILE=minimal|standard|strict`および`ECC_DISABLED_HOOKS=...`により、hookファイルを編集せずにランタイムで制御可能になった。
- **新しいハーネスコマンド** — `/harness-audit`、`/loop-start`、`/loop-status`、`/quality-gate`、`/model-route`。
- **NanoClaw v2** — モデルルーティング、skillのホットロード、セッションのブランチ/検索/エクスポート/コンパクト/メトリクス。
- **クロスハーネスのパリティ** — Claude Code、Cursor、OpenCode、およびCodexアプリ/CLI間での動作が厳密に統一された。
- **997件の内部テスト合格** — hook/ランタイムのリファクタリングおよび互換性アップデート後、完全なスイートがグリーンになった。
### v1.7.0 — Cross-Platform Expansion & Presentation Builder (Feb 2026)

- **Codexアプリ + CLIサポート** — 直接の`AGENTS.md`ベースのCodexサポート、インストーラーターゲティング、およびCodexドキュメント。
- **`frontend-slides` skill** — 依存関係ゼロのHTMLプレゼンテーションビルダー。PPTX変換のガイダンスと厳密なビューポートフィットルール付き。
- **5つの新しい一般的なビジネス/コンテンツスキル** — `article-writing`、`content-engine`、`market-research`、`investor-materials`、`investor-outreach`。
- **ツールカバレッジの拡大** — Cursor、Codex、およびOpenCodeのサポートが強化され、同じリポジトリがすべての主要なハーネス間でクリーンに出荷されるようになった。
- **992件の内部テスト** — プラグイン、hook、skill、およびパッケージング全体で検証と回帰カバレッジが拡大した。

### v1.6.0 — Codex CLI, AgentShield & Marketplace (Feb 2026)

- **Codex CLIサポート** — 新しい`/codex-setup`コマンドは、OpenAI Codex CLI互換のための`codex.md`を生成する。
- **7つの新しいskill** — `search-first`、`swift-actor-persistence`、`swift-protocol-di-testing`、`regex-vs-llm-structured-text`、`content-hash-cache-pattern`、`cost-aware-llm-pipeline`、`skill-stocktake`。
- **AgentShieldの統合** — `/security-scan` skillは、Claude Codeから直接AgentShieldを実行する。1282のテスト、102のルール。
- **GitHub Marketplace** — ECC Tools GitHub Appが[github.com/marketplace/ecc-tools](https://github.com/marketplace/ecc-tools)で公開された。無料/プロ/エンタープライズの各階層がある。
- **30件以上のコミュニティPRがマージ** — 6言語にわたる30人のコントリビューターからの貢献。
- **978件の内部テスト** — agent、skill、コマンド、hook、ルールにわたる検証スイートの拡大。

### v1.4.1 — Bug Fix (Feb 2026)

- **インスティンクトインポート時のコンテンツ喪失を修正** — `/instinct-import`中に`parse_instinct_file()`がフロントマター以降のすべてのコンテンツ（Action、Evidence、Examplesセクション）を暗黙のうちにドロップしていた問題を修正（[#148](https://github.com/affaan-m/everything-claude-code/issues/148), [#161](https://github.com/affaan-m/everything-claude-code/pull/161)）。

### v1.4.0 — Multi-Language Rules, Installation Wizard & PM2 (Feb 2026)

- **対話型インストールウィザード** — 新しい`configure-ecc` skillは、マージ/上書き検出を備えたガイド付きセットアップを提供する。
- **PM2とマルチエージェントオーケストレーション** — 複雑なマルチサービスワークフローを管理するための6つの新しいコマンド（`/pm2`、`/multi-plan`、`/multi-execute`、`/multi-backend`、`/multi-frontend`、`/multi-workflow`）。
- **多言語ルールアーキテクチャ** — ルールがフラットファイルから`common/` + `typescript/` + `python/` + `golang/`ディレクトリに再構築された。必要な言語のみをインストールする。
- **中国語（zh-CN）翻訳** — すべてのagent、コマンド、skill、およびルールの完全な翻訳（80ファイル以上）。
- **GitHub Sponsorsサポート** — GitHub Sponsorsを通じてプロジェクトをスポンサーする機能。
- **CONTRIBUTING.mdの拡張** — 貢献タイプごとの詳細なPRテンプレート。

### v1.3.0 — OpenCode Plugin Support (Feb 2026)

- **完全なOpenCode統合** — OpenCodeのプラグインシステムを介したhookサポート（20種類以上のイベント）を備えた12のagent、24のコマンド、16のskill。
- **3つのネイティブカスタムツール** — run-tests、check-coverage、security-audit。
- **LLMドキュメント** — 包括的なOpenCodeドキュメントのための`llms.txt`。

### v1.2.0 — Unified Commands & Skills (Feb 2026)

- **Python/Djangoサポート** — Djangoのパターン、セキュリティ、TDD、および検証スキル。
- **Java Spring Bootスキル** — Spring Boot向けのパターン、セキュリティ、TDD、および検証。
- **セッション管理** — セッション履歴のための`/sessions`コマンド。
- **継続的学習 v2** — 信頼性スコアリング、インポート/エクスポート、進化を備えたインスティンクトベースの学習。

すべての変更履歴は[Releases](https://github.com/affaan-m/everything-claude-code/releases)で確認されたい。

---

## Quick Start

2分未満で稼働させる：

### いずれか1つの方法だけを選択すること

ほとんどのClaude Codeユーザーは、以下のいずれか1つのインストールパスだけを使用すべきである：

- **推奨されるデフォルト:** Claude Codeプラグインをインストールし、実際に必要なルールのフォルダーのみをコピーする。
- **手動インストーラーを使用する場合:** より細かい制御を行いたい場合、プラグインパスを完全に避けたい場合、またはClaude Codeビルドがセルフホストされたマーケットプレイスエントリの解決に問題がある場合のみ。
- **インストール方法を重ねないこと。** 最も一般的な壊れたセットアップは、最初に`/plugin install`を実行し、その後で`install.sh --profile full`または`npx ecc-install --profile full`を実行することである。

すでに複数のインストールを重ねており、内容が重複しているように見える場合は、直ちに[Reset / Uninstall ECC](#reset--uninstall-ecc)に進まれたい。

### 低コンテキスト / hookなしパス

hookがグローバルすぎると感じる場合、またはECCのルール、agent、コマンド、コアワークフロースキルのみが必要な場合は、プラグインをスキップして最小の手動プロファイルを使用する：

```bash
./install.sh --profile minimal --target claude
```

```powershell
.\install.ps1 --profile minimal --target claude
# or
npx ecc-install --profile minimal --target claude
```

このプロファイルは意図的に`hooks-runtime`を除外している。

通常のコアプロファイルが必要だが、hookをオフにしたい場合は以下を使用する：

```bash
./install.sh --profile core --without baseline:hooks --target claude
```

後でランタイムの強制が必要になった場合のみ、hookを追加する：

```bash
./install.sh --target claude --modules hooks-runtime
```

### 最初に適切なコンポーネントを見つける

どのECCプロファイルまたはコンポーネントをインストールすべきかわからない場合は、任意のプロジェクトからパッケージ化されたアドバイザーに尋ねること：

```bash
npx ecc consult "security reviews" --target claude
```

これは一致するコンポーネント、関連するプロファイル、およびプレビュー/インストールコマンドを返す。正確なファイルプランを確認したい場合は、インストールする前にプレビューコマンドを使用すること。

本番環境のML/MLOpsワークフローについては、インストールをオプトインかつコンポーネントスコープに維持する：

```bash
npx ecc consult "mlops training model deployment" --target claude
npx ecc install --profile minimal --target claude --with capability:machine-learning
```

### Step 1: Install the Plugin (Recommended)

> NOTE: プラグインは便利だが、Claude Codeビルドがセルフホストされたマーケットプレイスエントリの解決に問題がある場合は、以下のOSSインストーラーが依然として最も信頼できる手段である。

```bash
# マーケットプレイスの追加
/plugin marketplace add https://github.com/affaan-m/everything-claude-code

# プラグインのインストール
/plugin install ecc@ecc
```

### Naming + Migration Note

ECCには現在3つの公開識別子があり、これらは互換性がない：

- GitHubソースリポジトリ: `affaan-m/everything-claude-code`
- Claudeマーケットプレイス/プラグイン識別子: `ecc@ecc`
- npmパッケージ: `ecc-universal`

これは意図的なものである。Anthropicのマーケットプレイス/プラグインのインストールは正規のプラグイン識別子をキーとするため、厳格なデスクトップ/APIバリデーターに対応できるようツール名やスラッシュコマンドのネームスペースを十分に短く保つため、ECCは`ecc@ecc`を使用している。古い記事には以前の長いマーケットプレイス識別子が表示されているかもしれないが、それはレガシーエイリアスとしてのみ扱うこと。別途、npmパッケージは`ecc-universal`のままであり、npmのインストールとマーケットプレイスのインストールは意図的に異なる名前を使用している。

### Step 2: Install Rules Only If You Need Them

> WARNING: **重要:** Claude Codeのプラグインは`rules`を自動的に配布することはできない。
>
> すでに`/plugin install`経由でECCをインストールしている場合、**その後で`./install.sh --profile full`、`.\install.ps1 --profile full`、または`npx ecc-install --profile full`を実行してはならない**。プラグインはすでにECCのskill、コマンド、およびhookをロードしている。プラグインのインストール後に完全なインストーラーを実行すると、それらと同じサーフェスがユーザーディレクトリにコピーされ、重複したskillと重複したランタイム動作を引き起こす可能性がある。
>
> プラグインインストールの場合は、必要な`rules/`ディレクトリのみを`~/.claude/rules/ecc/`の下に手動でコピーすること。まずは`rules/common`と、実際に使用している言語またはフレームワークのパック1つから始めること。Claude内にすべてのコンテキストを明示的に持たせたい場合を除き、すべてのルールディレクトリをコピーしないこと。
>
> プラグインパスの代わりに完全な手動ECCインストールを行う場合のみ、完全なインストーラーを使用すること。
>
> ローカルのClaudeセットアップが消去またはリセットされた場合でも、ECCを再購入する必要があるわけではない。まず`node scripts/ecc.js list-installed`から始め、次に何かを再インストールする前に`node scripts/ecc.js doctor`と`node scripts/ecc.js repair`を実行すること。これにより通常はセットアップを再構築することなく、ECCが管理するファイルが復元される。問題がECC Toolsの課金/アカウントやマーケットプレイスへのアクセスにある場合は、課金/アカウントの回復を別途処理すること。
```bash
# まずリポジトリをクローンする
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code

# 依存関係をインストールする（パッケージマネージャーを選択）
npm install        # または: pnpm install | yarn install | bun install

# プラグインインストールパス: ECCルールのみをECCが所有するネームスペースにコピーする
mkdir -p ~/.claude/rules/ecc
cp -R rules/common ~/.claude/rules/ecc/
cp -R rules/typescript ~/.claude/rules/ecc/

# 完全な手動ECCインストールパス（/plugin installの代わりにこれを使用する）
# ./install.sh --profile full
```

```powershell
# Windows PowerShell

# プラグインインストールパス: ECCルールのみをECCが所有するネームスペースにコピーする
New-Item -ItemType Directory -Force -Path "$HOME/.claude/rules/ecc" | Out-Null
Copy-Item -Recurse rules/common "$HOME/.claude/rules/ecc/"
Copy-Item -Recurse rules/typescript "$HOME/.claude/rules/ecc/"

# 完全な手動ECCインストールパス（/plugin installの代わりにこれを使用する）
# .\install.ps1 --profile full
# npx ecc-install --profile full
```

手動インストールの手順については、`rules/`フォルダ内のREADMEを参照されたい。手動でルールをコピーする場合は、その中のファイルではなく、言語ディレクトリ全体（例：`rules/common`や`rules/golang`）をコピーし、相対参照が機能し続け、ファイル名が衝突しないようにすること。

### Fully manual install (Fallback)

プラグインパスを意図的にスキップする場合のみ、これを使用すること：

```bash
./install.sh --profile full
```

```powershell
.\install.ps1 --profile full
# または
npx ecc-install --profile full
```

このパスを選択した場合は、そこで停止すること。追加で`/plugin install`を実行してはならない。

### Reset / Uninstall ECC

ECCが重複している、邪魔になっている、または壊れていると感じた場合は、自身の上に再インストールを重ねないこと。

- **プラグインパス:** Claude Codeからプラグインを削除し、その後`~/.claude/rules/ecc/`の下に手動でコピーした特定のルールフォルダーを削除する。
- **手動インストーラー / CLIパス:** リポジトリのルートから、まず削除のプレビューを行う：

```bash
node scripts/uninstall.js --dry-run
```

次に、ECC管理のファイルを削除する：

```bash
node scripts/uninstall.js
```

ライフサイクルラッパーを使用することもできる：

```bash
node scripts/ecc.js list-installed
node scripts/ecc.js doctor
node scripts/ecc.js repair
node scripts/ecc.js uninstall --dry-run
```

ECCは、インストール状態に記録されたファイルのみを削除する。インストールしていない無関係なファイルは削除されない。

複数の方法を重ねた場合は、以下の順序でクリーンアップすること：

1. Claude Codeプラグインのインストールを削除する。
2. リポジトリルートからECCのアンインストールコマンドを実行し、インストール状態管理されたファイルを削除する。
3. 手動でコピーした、不要になった余分なルールフォルダーを削除する。
4. 単一のパスを使用して、一度だけ再インストールする。

### Step 3: Start Using

```bash
# skillが主要なワークフローサーフェスである。
# 既存のスラッシュスタイルのコマンド名は、ECCがcommands/からの移行中も引き続き機能する。

# プラグインのインストールでは、正規のネームスペース形式を使用する
/ecc:plan "Add user authentication"

# 手動インストールでは、短いスラッシュ形式が維持される:
# /plan "Add user authentication"

# 利用可能なコマンドを確認する
/plugin list ecc@ecc
```

**以上である！** これで60のagent、231のskill、および75のレガシーコマンドシムにアクセスできるようになった。

### Dashboard GUI

デスクトップダッシュボードを起動し、ECCコンポーネントを視覚的に探索する：

```bash
npm run dashboard
# または
python3 ./ecc_dashboard.py
```

**特徴:**
- タブ付きインターフェース: Agents, Skills, Commands, Rules, Settings
- ダーク/ライトテーマの切り替え
- フォントのカスタマイズ（ファミリーとサイズ）
- ヘッダーとタスクバーのプロジェクトロゴ
- すべてのコンポーネントにわたる検索とフィルター

### Multi-model commands require additional setup

> WARNING: `multi-*` コマンドは、上記の基本プラグイン/ルールインストールには含まれて**いない**。
>
> `/multi-plan`、`/multi-execute`、`/multi-backend`、`/multi-frontend`、および`/multi-workflow`を使用するには、`ccg-workflow`ランタイムもインストールする必要がある。
>
> `npx ccg-workflow`で初期化すること。
>
> このランタイムは、これらのコマンドが期待する外部依存関係を提供する。これには以下が含まれる：
> - `~/.claude/bin/codeagent-wrapper`
> - `~/.claude/.ccg/prompts/*`
>
> `ccg-workflow`がないと、これらの`multi-*`コマンドは正しく実行されない。

---

## Cross-Platform Support

このプラグインは現在、**Windows、macOS、およびLinux**を完全にサポートしており、主要なIDE（Cursor、Zed、OpenCode、Antigravity）およびCLIハーネスとの緊密な統合も備えている。最大の互換性のために、すべてのhookとスクリプトはNode.jsで書き直されている。

### Package Manager Detection

プラグインは、以下の優先順位で優先パッケージマネージャー（npm、pnpm、yarn、またはbun）を自動的に検出する：

1. **環境変数**: `CLAUDE_PACKAGE_MANAGER`
2. **プロジェクト設定**: `.claude/package-manager.json`
3. **package.json**: `packageManager` フィールド
4. **ロックファイル**: package-lock.json、yarn.lock、pnpm-lock.yaml、または bun.lockbからの検出
5. **グローバル設定**: `~/.claude/package-manager.json`
6. **フォールバック**: 最初に利用可能なパッケージマネージャー

優先パッケージマネージャーを設定するには：

```bash
# 環境変数経由
export CLAUDE_PACKAGE_MANAGER=pnpm

# グローバル設定経由
node scripts/setup-package-manager.js --global pnpm

# プロジェクト設定経由
node scripts/setup-package-manager.js --project bun

# 現在の設定を検出
node scripts/setup-package-manager.js --detect
```

または、Claude Codeで`/setup-pm`コマンドを使用する。

### Hook Runtime Controls

ランタイムフラグを使用して厳密さを調整したり、特定のhookを一時的に無効にしたりできる：

```bash
# hookの厳密さプロファイル（デフォルト: standard）
export ECC_HOOK_PROFILE=standard

# 無効にするhook ID（カンマ区切り）
export ECC_DISABLED_HOOKS="pre:bash:tmux-reminder,post:edit:typecheck"

# SessionStartの追加コンテキストの上限（デフォルト: 8000文字）
export ECC_SESSION_START_MAX_CHARS=4000

# ローカルモデルや低コンテキストのセットアップでは、SessionStartの追加コンテキストを完全に無効にする
export ECC_SESSION_START_CONTEXT=off

# コンテキスト/スコープ/ループの警告は維持しつつ、APIレートのコスト見積もりを抑制する
export ECC_CONTEXT_MONITOR_COST_WARNINGS=off
```

Windows PowerShell:

```powershell
[Environment]::SetEnvironmentVariable('ECC_CONTEXT_MONITOR_COST_WARNINGS', 'off', 'User')
```

---

## What's Inside

このリポジトリは**Claude Codeプラグイン**である - 直接インストールするか、コンポーネントを手動でコピーすること。

```
everything-claude-code/
|-- .claude-plugin/   # プラグインとマーケットプレイスのマニフェスト
|   |-- plugin.json         # プラグインのメタデータとコンポーネントのパス
|   |-- marketplace.json    # /plugin marketplace add のためのマーケットプレイスカタログ
|
|-- agents/           # 委任のための60の特化型サブエージェント
|   |-- planner.md           # 機能実装の計画
|   |-- architect.md         # システム設計の決定
|   |-- tdd-guide.md         # テスト駆動開発
|   |-- code-reviewer.md     # 品質とセキュリティのレビュー
|   |-- security-reviewer.md # 脆弱性分析
|   |-- build-error-resolver.md
|   |-- e2e-runner.md        # PlaywrightのE2Eテスト
|   |-- refactor-cleaner.md  # デッドコードのクリーンアップ
|   |-- doc-updater.md       # ドキュメントの同期
|   |-- docs-lookup.md       # ドキュメント/APIの検索
|   |-- chief-of-staff.md    # コミュニケーションのトリアージと草案作成
|   |-- loop-operator.md     # 自律的なループの実行
|   |-- harness-optimizer.md # ハーネス設定のチューニング
|   |-- cpp-reviewer.md      # C++コードのレビュー
|   |-- cpp-build-resolver.md # C++のビルドエラー解決
|   |-- fsharp-reviewer.md   # F#の関数型コードレビュー
|   |-- go-reviewer.md       # Goコードのレビュー
|   |-- go-build-resolver.md # Goのビルドエラー解決
|   |-- python-reviewer.md   # Pythonコードのレビュー
|   |-- database-reviewer.md # データベース/Supabaseのレビュー
|   |-- typescript-reviewer.md # TypeScript/JavaScriptコードのレビュー
|   |-- java-reviewer.md     # Java/Spring Bootコードのレビュー
|   |-- java-build-resolver.md # Java/Maven/Gradleのビルドエラー
|   |-- kotlin-reviewer.md   # Kotlin/Android/KMPコードのレビュー
|   |-- kotlin-build-resolver.md # Kotlin/Gradleのビルドエラー
|   |-- harmonyos-app-resolver.md # HarmonyOS/ArkTSアプリ開発
|   |-- rust-reviewer.md     # Rustコードのレビュー
|   |-- rust-build-resolver.md # Rustのビルドエラー解決
|   |-- pytorch-build-resolver.md # PyTorch/CUDAのトレーニングエラー
|   |-- mle-reviewer.md      # 本番環境のMLパイプライン、評価、サービング、および監視のレビュー
|
|-- skills/           # ワークフローの定義とドメイン知識
|   |-- coding-standards/           # 言語のベストプラクティス
|   |-- clickhouse-io/              # ClickHouseのアナリティクス、クエリ、データエンジニアリング
|   |-- backend-patterns/           # API、データベース、キャッシュのパターン
|   |-- frontend-patterns/          # React、Next.jsのパターン
|   |-- frontend-slides/            # HTMLスライドデッキおよびPPTXからWebへのプレゼンテーションワークフロー (NEW)
|   |-- article-writing/            # 一般的なAIのトーンを排した指定されたトーンでの長文執筆 (NEW)
|   |-- content-engine/             # マルチプラットフォームのソーシャルコンテンツと再利用ワークフロー (NEW)
|   |-- market-research/            # ソースが明示された市場、競合、および投資家リサーチ (NEW)
|   |-- investor-materials/         # ピッチデッキ、ワンページャー、メモ、および財務モデル (NEW)
|   |-- investor-outreach/          # パーソナライズされた資金調達のアウトリーチとフォローアップ (NEW)
|   |-- continuous-learning/        # レガシー v1 Stop-hookパターン抽出
|   |-- continuous-learning-v2/     # 信頼性スコアリングを備えたインスティンクトベースの学習
|   |-- iterative-retrieval/        # サブエージェントのための段階的なコンテキスト精製
|   |-- strategic-compact/          # 手動でのコンパクト化の提案 (Longform Guide)
|   |-- tdd-workflow/               # TDD方法論
|   |-- security-review/            # セキュリティチェックリスト
|   |-- eval-harness/               # 検証ループの評価 (Longform Guide)
|   |-- verification-loop/          # 継続的検証 (Longform Guide)
|   |-- videodb/                   # ビデオとオーディオ：取り込み、検索、編集、生成、ストリーミング (NEW)
|   |-- golang-patterns/            # Goのイディオムとベストプラクティス
|   |-- golang-testing/             # Goのテストパターン、TDD、ベンチマーク
|   |-- cpp-coding-standards/         # C++ Core Guidelinesに基づくC++コーディング標準 (NEW)
|   |-- cpp-testing/                # GoogleTest、CMake/CTestを用いたC++テスト (NEW)
|   |-- django-patterns/            # Djangoのパターン、モデル、ビュー (NEW)
|   |-- django-security/            # Djangoのセキュリティベストプラクティス (NEW)
|   |-- django-tdd/                 # Django TDDワークフロー (NEW)
|   |-- django-verification/        # Django検証ループ (NEW)
|   |-- laravel-patterns/           # Laravelアーキテクチャパターン (NEW)
|   |-- laravel-security/           # Laravelセキュリティベストプラクティス (NEW)
|   |-- laravel-tdd/                # Laravel TDDワークフロー (NEW)
|   |-- laravel-verification/       # Laravel検証ループ (NEW)
|   |-- python-patterns/            # Pythonのイディオムとベストプラクティス (NEW)
|   |-- python-testing/             # pytestを用いたPythonテスト (NEW)
|   |-- quarkus-patterns/            # Java Quarkusパターン (NEW)
|   |-- quarkus-security/            # Quarkusセキュリティ (NEW)
|   |-- quarkus-tdd/                 # Quarkus TDD (NEW)
|   |-- quarkus-verification/        # Quarkus検証 (NEW)
|   |-- springboot-patterns/        # Java Spring Bootパターン (NEW)
|   |-- springboot-security/        # Spring Bootセキュリティ (NEW)
|   |-- springboot-tdd/             # Spring Boot TDD (NEW)
|   |-- springboot-verification/    # Spring Boot検証 (NEW)
|   |-- configure-ecc/              # 対話型インストールウィザード (NEW)
|   |-- security-scan/              # AgentShieldセキュリティオーディター統合 (NEW)
|   |-- java-coding-standards/     # Javaコーディング標準 (NEW)
|   |-- jpa-patterns/              # JPA/Hibernateパターン (NEW)
|   |-- postgres-patterns/         # PostgreSQL最適化パターン (NEW)
|   |-- nutrient-document-processing/ # Nutrient APIを用いたドキュメント処理 (NEW)
|   |-- docs/examples/project-guidelines-template.md  # プロジェクト固有のskill向けテンプレート
|   |-- database-migrations/         # マイグレーションパターン（Prisma, Drizzle, Django, Go） (NEW)
|   |-- api-design/                  # REST API設計、ページネーション、エラーレスポンス (NEW)
|   |-- deployment-patterns/         # CI/CD、Docker、ヘルスチェック、ロールバック (NEW)
|   |-- docker-patterns/            # Docker Compose、ネットワーキング、ボリューム、コンテナセキュリティ (NEW)
|   |-- e2e-testing/                 # Playwright E2EパターンとPage Object Model (NEW)
|   |-- content-hash-cache-pattern/  # ファイル処理のためのSHA-256コンテンツハッシュキャッシュ (NEW)
|   |-- cost-aware-llm-pipeline/     # LLMコスト最適化、モデルルーティング、予算追跡 (NEW)
|   |-- regex-vs-llm-structured-text/ # 意思決定フレームワーク：テキスト解析における正規表現 vs LLM (NEW)
|   |-- swift-actor-persistence/     # actorを用いたスレッドセーフなSwiftデータ永続化 (NEW)
|   |-- swift-protocol-di-testing/   # テスト可能なSwiftコードのためのプロトコルベースのDI (NEW)
|   |-- search-first/               # コーディング前のリサーチワークフロー (NEW)
|   |-- skill-stocktake/            # 品質の向上のためのskillとコマンドの監査 (NEW)
|   |-- liquid-glass-design/         # iOS 26 Liquid Glassデザインシステム (NEW)
|   |-- foundation-models-on-device/ # FoundationModelsを用いたAppleのオンデバイスLLM (NEW)
|   |-- swift-concurrency-6-2/       # Swift 6.2 Approachable Concurrency (NEW)
|   |-- mle-workflow/               # 本番環境のMLデータ契約、評価、デプロイ、監視 (NEW)
|   |-- perl-patterns/             # モダンなPerl 5.36+のイディオムとベストプラクティス (NEW)
|   |-- perl-security/             # Perlのセキュリティパターン、テイントモード、安全なI/O (NEW)
|   |-- perl-testing/              # Test2::V0, prove, Devel::Coverを用いたPerlのTDD (NEW)
|   |-- autonomous-loops/           # 自律ループパターン：シーケンシャルパイプライン、PRループ、DAGオーケストレーション (NEW)
|   |-- plankton-code-quality/      # Plankton hooksを用いた書き込み時のコード品質強制 (NEW)
|
|-- commands/         # メンテナンスされているスラッシュエントリの互換性; skills/を推奨
|   |-- plan.md             # /plan - 実装の計画
|   |-- code-review.md      # /code-review - 品質レビュー
|   |-- build-fix.md        # /build-fix - ビルドエラーの修正
|   |-- refactor-clean.md   # /refactor-clean - デッドコードの削除
|   |-- quality-gate.md     # /quality-gate - 検証ゲート
|   |-- learn.md            # /learn - セッション中盤でのパターン抽出 (Longform Guide)
|   |-- learn-eval.md       # /learn-eval - パターンの抽出、評価、および保存 (NEW)
|   |-- checkpoint.md       # /checkpoint - 検証状態の保存 (Longform Guide)
|   |-- setup-pm.md         # /setup-pm - パッケージマネージャーの設定
|   |-- go-review.md        # /go-review - Goコードレビュー (NEW)
|   |-- go-test.md          # /go-test - Go TDDワークフロー (NEW)
|   |-- go-build.md         # /go-build - Goビルドエラーの修正 (NEW)
|   |-- skill-create.md     # /skill-create - git履歴からのskill生成 (NEW)
|   |-- instinct-status.md  # /instinct-status - 学習したインスティンクトの表示 (NEW)
|   |-- instinct-import.md  # /instinct-import - インスティンクトのインポート (NEW)
|   |-- instinct-export.md  # /instinct-export - インスティンクトのエクスポート (NEW)
|   |-- evolve.md           # /evolve - インスティンクトをskillにクラスタリングする
|   |-- prune.md            # /prune - 期限切れの保留中インスティンクトの削除 (NEW)
|   |-- pm2.md              # /pm2 - PM2サービスライフサイクル管理 (NEW)
|   |-- multi-plan.md       # /multi-plan - マルチエージェントタスク分解 (NEW)
|   |-- multi-execute.md    # /multi-execute - オーケストレーションされたマルチエージェントワークフロー (NEW)
|   |-- multi-backend.md    # /multi-backend - バックエンドマルチサービスオーケストレーション (NEW)
|   |-- multi-frontend.md   # /multi-frontend - フロントエンドマルチサービスオーケストレーション (NEW)
|   |-- multi-workflow.md   # /multi-workflow - 一般的なマルチサービスワークフロー (NEW)
|   |-- sessions.md         # /sessions - セッション履歴の管理
|   |-- test-coverage.md    # /test-coverage - テストカバレッジ分析
|   |-- update-docs.md      # /update-docs - ドキュメントの更新
|   |-- update-codemaps.md  # /update-codemaps - コードマップの更新
|   |-- python-review.md    # /python-review - Pythonコードレビュー (NEW)
|-- legacy-command-shims/   # /tddや/evalのような廃止されたシムのオプトインアーカイブ
|   |-- tdd.md              # /tdd - tdd-workflow skillを推奨
|   |-- e2e.md              # /e2e - e2e-testing skillを推奨
|   |-- eval.md             # /eval - eval-harness skillを推奨
|   |-- verify.md           # /verify - verification-loop skillを推奨
|   |-- orchestrate.md      # /orchestrate - dmux-workflowsまたはmulti-workflowを推奨
|
|-- rules/            # 常に従うべきガイドライン (~/.claude/rules/ecc/にコピーする)
|   |-- README.md            # 構造の概要とインストールガイド
|   |-- common/              # 言語非依存の原則
|   |   |-- coding-style.md    # 不変性、ファイル構成
|   |   |-- git-workflow.md    # コミット形式、PRプロセス
|   |   |-- testing.md         # TDD、80%カバレッジの要件
|   |   |-- performance.md     # モデル選択、コンテキスト管理
|   |   |-- patterns.md        # デザインパターン、スケルトンプロジェクト
|   |   |-- hooks.md           # hookアーキテクチャ、TodoWrite
|   |   |-- agents.md          # サブエージェントへの委任のタイミング
|   |   |-- security.md        # 必須のセキュリティチェック
|   |-- typescript/          # TypeScript/JavaScript固有
|   |-- python/              # Python固有
|   |-- golang/              # Go固有
|   |-- swift/               # Swift固有
|   |-- php/                 # PHP固有 (NEW)
|   |-- arkts/               # HarmonyOS / ArkTS固有
|
|-- hooks/            # トリガーベースの自動化
|   |-- README.md                 # hookのドキュメント、レシピ、およびカスタマイズガイド
|   |-- hooks.json                # すべてのhook設定 (PreToolUse, PostToolUse, Stop, etc.)
|   |-- memory-persistence/       # セッションライフサイクルhook (Longform Guide)
|   |-- strategic-compact/        # コンパクト化の提案 (Longform Guide)
|
|-- scripts/          # クロスプラットフォームなNode.jsスクリプト (NEW)
|   |-- lib/                     # 共有ユーティリティ
|   |   |-- utils.js             # クロスプラットフォームなファイル/パス/システムユーティリティ
|   |   |-- package-manager.js   # パッケージマネージャーの検出と選択
|   |-- hooks/                   # hookの実装
|   |   |-- session-start.js     # セッション開始時のコンテキスト読み込み
|   |   |-- session-end.js       # セッション終了時の状態保存
|   |   |-- pre-compact.js       # コンパクト化前の状態保存
|   |   |-- suggest-compact.js   # 戦略的なコンパクト化の提案
|   |   |-- evaluate-session.js  # セッションからのパターン抽出
|   |-- setup-package-manager.js # 対話型のPMセットアップ
|
|-- tests/            # テストスイート (NEW)
|   |-- lib/                     # ライブラリテスト
|   |-- hooks/                   # hookテスト
|   |-- run-all.js               # すべてのテストの実行
|
|-- contexts/         # 動的なシステムプロンプトインジェクションコンテキスト (Longform Guide)
|   |-- dev.md              # 開発モードコンテキスト
|   |-- review.md           # コードレビューモードコンテキスト
|   |-- research.md         # リサーチ/探索モードコンテキスト
|
|-- examples/         # 設定とセッションの例
|   |-- CLAUDE.md             # プロジェクトレベルの設定例
|   |-- user-CLAUDE.md        # ユーザーレベルの設定例
|   |-- saas-nextjs-CLAUDE.md   # 実際のSaaS (Next.js + Supabase + Stripe)
|   |-- go-microservice-CLAUDE.md # 実際のGoマイクロサービス (gRPC + PostgreSQL)
|   |-- django-api-CLAUDE.md      # 実際のDjango REST API (DRF + Celery)
|   |-- laravel-api-CLAUDE.md     # 実際のLaravel API (PostgreSQL + Redis) (NEW)
|   |-- rust-api-CLAUDE.md        # 実際のRust API (Axum + SQLx + PostgreSQL) (NEW)
|
|-- mcp-configs/      # MCPサーバー設定
|   |-- mcp-servers.json    # GitHub、Supabase、Vercel、Railwayなど
|
|-- ecc_dashboard.py  # デスクトップGUIダッシュボード (Tkinter)
|
|-- assets/           # ダッシュボード用のアセット
|   |-- images/
|       |-- ecc-logo.png
|
|-- marketplace.json  # セルフホストマーケットプレイス設定 (/plugin marketplace add 用)
```
