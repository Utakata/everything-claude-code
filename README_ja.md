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

**AIエージェントハーネスのためのパフォーマンス最適化システム。Anthropicハッカソンの勝者より。**

単なる設定ではない。スキル、インスティンクト、メモリの最適化、継続的学習、セキュリティスキャン、そしてリサーチファーストな開発を備えた完全なシステムである。実際の製品を構築するために10ヶ月以上の集中的な日常的な使用を通じて進化してきた、本番環境対応のagent、skill、hook、rule、MCP configuration、およびレガシーなcommand shimを提供する。

**Claude Code**、**Codex**、**Cursor**、**OpenCode**、**Gemini**、**Zed**、**GitHub Copilot**、その他AIエージェントハーネスにまたがって機能する。

ECC v2.0.0-rc.1は、その再利用可能なレイヤーの上に公開のHermes operatorストーリーを追加する。[Hermesセットアップガイド](docs/HERMES-SETUP.md)から始め、次に[rc.1 リリースノート](docs/releases/2.0.0-rc.1/release-notes.md)と[クロスハーネスアーキテクチャ](docs/architecture/cross-harness.md)を確認してほしい。

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
    <strong> スポンサー</strong><br />
    <sub>OSSへの資金提供 · $5/月 から</sub>
  </a>
</td>
<td width="25%" align="center">
  <a href="https://github.com/affaan-m/everything-claude-code/discussions">
    <strong>コミュニティ</strong>
    <br />
    <sub>ディスカッション · Q&amp;A · ショー＆テル</sub>
  </a>
</td>
<td width="25%" align="center">
  <a href="https://github.com/apps/ecc-tools">
    <strong> GitHub App</strong><br />
    <sub>インストール · PR監査 · 無料ティア</sub>
  </a>
</td>
</tr>
</table>

<sub>**OSSは引き続き無料である。** このリポジトリは永久にMITライセンスである。ECC Proは、プライベートリポジトリ用のホスト型GitHub Appである。<a href="https://github.com/sponsors/affaan-m">スポンサー</a>と<a href="https://ecc.tools/pricing">Proサブスクライバー</a>が作業の資金を提供している — だからこそ、単一のメンテナが7つのハーネスにまたがって毎週出荷できている。</sub>

---

## The Guides

このリポジトリは生のコードのみである。ガイドですべてを説明している。

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
<td align="center"><b>Shorthand Guide</b><br/>セットアップ、基礎、哲学。 <b>最初にこれを読むこと。</b></td>
<td align="center"><b>Longform Guide</b><br/>トークン最適化、メモリ永続化、評価、並列化。</td>
<td align="center"><b>Security Guide</b><br/>攻撃ベクトル、サンドボックス、サニタイズ、CVE、AgentShield。</td>
</tr>
</table>

| トピック | 学べること |
|-------|-------------------|
| トークン最適化 | モデル選択、システムプロンプトのスリム化、バックグラウンドプロセス |
| メモリ永続化 | セッション間でコンテキストを自動的に保存・読み込みするhook |
| 継続的学習 | セッションからのパターンを再利用可能なskillに自動抽出 |
| 検証ループ | チェックポイントと継続的評価、グレーダータイプ、pass@kメトリクス |
| 並列化 | Gitワークツリー、カスケードメソッド、インスタンスのスケーリング時期 |
| サブエージェントのオーケストレーション | コンテキスト問題、反復的検索パターン |

---

## What's New

### v2.0.0-rc.1 — Surface Refresh, Operator Workflows, and ECC 2.0 Alpha (Apr 2026)

- **Dashboard GUI** — ダーク/ライトテーマ切り替え、フォントカスタマイズ、ヘッダーとタスクバーのプロジェクトロゴを備えた新しいTkinterベースのデスクトップアプリケーション（`ecc_dashboard.py` または `npm run dashboard`）。
- **公開サーフェスとライブリポジトリの同期** — メタデータ、カタログカウント、プラグインマニフェスト、およびインストール向けドキュメントが実際のOSSサーフェスと一致するようになった。60個のagent、231個のskill、および75個のレガシーなcommand shimが含まれる。
- **Operatorとアウトバウンドワークフローの拡張** — `brand-voice`、`social-graph-ranker`、`connections-optimizer`、`customer-billing-ops`、`ecc-tools-cost-audit`、`google-workspace-ops`、`project-flow-ops`、`workspace-surface-audit` がオペレーターレーンを完成させる。
- **メディアとローンチツーリング** — `manim-video`、`remotion-video-creation`、およびアップグレードされたソーシャルパブリッシングサーフェスにより、技術的な説明やローンチコンテンツが同一システムの一部となる。
- **フレームワークとプロダクトサーフェスの成長** — `nestjs-patterns`、よりリッチなCodex/OpenCodeインストールサーフェス、および拡張されたクロスハーネスパッケージングにより、リポジトリがClaude Codeを超えて使用可能であり続ける。
- **ECC 2.0アルファがインツリーに** — `ecc2/` 内のRustコントロールプレーンのプロトタイプがローカルでビルド可能になり、`dashboard`、`start`、`sessions`、`status`、`stop`、`resume`、`daemon` コマンドが公開された。これはアルファとして使用可能であり、まだ一般リリースではない。
- **Operator status snapshots** — `ecc status --markdown --write status.md` は、ローカルの状態ストアを、準備状況、アクティブセッション、skillの実行健全性、インストールの健全性、保留中のガバナンスイベント、およびLinear/GitHub/handoffsからのリンクされた作業アイテムを網羅するポータブルなハンドオフへと変換する。手動エントリには `ecc work-items upsert ...` を使用し、PR/issueキューの状態には `ecc work-items sync-github --repo owner/repo` を使用し、準備状況に注意が必要な場合に自動化を失敗させるには `ecc status --exit-code` を使用する。
- **エコシステムの強化** — AgentShield、ECC Toolsコストコントロール、請求ポータル作業、およびWebサイトの刷新は、別々のサイロにドリフトするのではなく、コアプラグインの周囲で引き続き出荷されている。

### v1.9.0 — Selective Install & Language Expansion (Mar 2026)

- **選択的インストールアーキテクチャ** — ターゲットコンポーネントのインストールに向けた `install-plan.js` と `install-apply.js` を伴うマニフェスト駆動のインストールパイプライン。状態ストアがインストールされたものを追跡し、インクリメンタルな更新を可能にする。
- **6つの新しいエージェント** — `typescript-reviewer`、`pytorch-build-resolver`、`java-build-resolver`、`java-reviewer`、`kotlin-reviewer`、`kotlin-build-resolver` が言語カバレッジを10言語に拡大。
- **新しいスキル** — 深層学習ワークフロー用の `pytorch-patterns`、APIリファレンス調査用の `documentation-lookup`、モダンJSツールチェーン用の `bun-runtime` と `nextjs-turbopack`、さらに8つの運用ドメインスキルと `mcp-server-patterns`。
- **セッション＆状態インフラストラクチャ** — クエリCLI付きのSQLite状態ストア、構造化記録用のセッションアダプタ、自己改善スキルのためのスキル進化基盤。
- **オーケストレーションのオーバーホール** — ハーネス監査スコアリングが決定論的になり、オーケストレーション状態とランチャーの互換性が強化され、5層ガード付きのオブラザーバループ防止が実装された。
- **オブザーバーの信頼性** — スロットリングとテールサンプリングによるメモリ爆発の修正、サンドボックスアクセス修正、遅延スタートロジック、およびリエントランシーガード。
- **12の言語エコシステム** — 既存のTypeScript、Python、Go、および共通のルールに加えて、Java、PHP、Perl、Kotlin/Android/KMP、C++、Rustの新しいルールが追加された。
- **コミュニティからの貢献** — 韓国語および中国語の翻訳、Biomeフックの最適化、ビデオ処理スキル、運用スキル、PowerShellインストーラ、Antigravity IDEサポート。
- **CIの強化** — 19のテスト失敗修正、カタログカウントの強制、インストールマニフェストの検証、完全なテストスイートのパス。

### v1.8.0 — Harness Performance System (Mar 2026)

- **ハーネスファーストのリリース** — ECCは単なる設定パックではなく、エージェントハーネスのパフォーマンスシステムとして明確に位置付けられるようになった。
- **フックの信頼性の大幅な見直し** — SessionStartルートフォールバック、Stopフェーズのセッション要約、および壊れやすいインラインワンライナーを置き換えるスクリプトベースのフック。
- **フックランタイムコントロール** — `ECC_HOOK_PROFILE=minimal|standard|strict` および `ECC_DISABLED_HOOKS=...` によるフックファイルの編集なしでのランタイムゲーティング。
- **新しいハーネスコマンド** — `/harness-audit`、`/loop-start`、`/loop-status`、`/quality-gate`、`/model-route`。
- **NanoClaw v2** — モデルルーティング、スキルのホットロード、セッションのブランチ/検索/エクスポート/圧縮/メトリクス。
- **クロスハーネスパリティ** — Claude Code、Cursor、OpenCode、Codexアプリ/CLI間での動作の厳密化。
- **997の内部テスト合格** — フック/ランタイムリファクタリングおよび互換性アップデート後のフルスイートグリーン。

### v1.7.0 — Cross-Platform Expansion & Presentation Builder (Feb 2026)

- **Codex app + CLI support** — `AGENTS.md` ベースの直接的なCodexサポート、インストーラーターゲティング、およびCodexドキュメント
- **`frontend-slides` skill** — ゼロ依存のHTMLプレゼンテーションビルダー、PPTX変換ガイダンス、および厳格なビューポート適合ルール付き
- **5 new generic business/content skills** — `article-writing`、`content-engine`、`market-research`、`investor-materials`、`investor-outreach`
- **Broader tool coverage** — 共通の主要ハーネスすべてで同一リポジトリがクリーンに出荷されるよう、Cursor、Codex、およびOpenCodeサポートが強化された
- **992 internal tests** — プラグイン、hook、skill、およびパッケージング全体にわたる広範な検証および回帰カバレッジ

### v1.6.0 — Codex CLI, AgentShield & Marketplace (Feb 2026)

- **Codex CLI support** — 新しい `/codex-setup` コマンドにより、OpenAI Codex CLI互換のための `codex.md` を生成する
- **7 new skills** — `search-first`、`swift-actor-persistence`、`swift-protocol-di-testing`、`regex-vs-llm-structured-text`、`content-hash-cache-pattern`、`cost-aware-llm-pipeline`、`skill-stocktake`
- **AgentShield integration** — `/security-scan` skillはClaude Codeから直接AgentShieldを実行する。1282テスト、102ルール
- **GitHub Marketplace** — ECC Tools GitHub Appが [github.com/marketplace/ecc-tools](https://github.com/marketplace/ecc-tools) で無料/プロ/エンタープライズティアとともに公開
- **30+ community PRs merged** — 6言語にまたがる30人の貢献者からの貢献
- **978 internal tests** — agent、skill、command、hook、およびrule全体にわたる広範な検証スイート

### v1.4.1 — Bug Fix (Feb 2026)

- **インスティンクトインポート時のコンテンツ喪失を修正** — `parse_instinct_file()` が `/instinct-import` 時にフロントマターより後のすべてのコンテンツ（Action、Evidence、Examplesセクション）を暗黙的にドロップしていたのを修正。([#148](https://github.com/affaan-m/everything-claude-code/issues/148), [#161](https://github.com/affaan-m/everything-claude-code/pull/161))

### v1.4.0 — Multi-Language Rules, Installation Wizard & PM2 (Feb 2026)

- **Interactive installation wizard** — 新しい `configure-ecc` skillが、マージ/上書きの検出を伴うガイド付きセットアップを提供する
- **PM2 & multi-agent orchestration** — 複雑なマルチサービスワークフローの管理のための6つの新しいコマンド（`/pm2`、`/multi-plan`、`/multi-execute`、`/multi-backend`、`/multi-frontend`、`/multi-workflow`）
- **Multi-language rules architecture** — Ruleはフラットファイルから `common/` + `typescript/` + `python/` + `golang/` ディレクトリに再構築された。必要な言語のみをインストールする
- **Chinese (zh-CN) translations** — すべてのagent、command、skill、およびruleの完全な翻訳（80ファイル以上）
- **GitHub Sponsors support** — GitHub Sponsors経由でのプロジェクト支援
- **Enhanced CONTRIBUTING.md** — コントリビューションタイプごとの詳細なPRテンプレート

### v1.3.0 — OpenCode Plugin Support (Feb 2026)

- **Full OpenCode integration** — OpenCodeのプラグインシステム（20種類以上のイベントタイプ）を通じたhookサポートを伴う、12個のagent、24個のcommand、16個のskill
- **3 native custom tools** — run-tests、check-coverage、security-audit
- **LLM documentation** — 包括的なOpenCodeドキュメント用の `llms.txt`

### v1.2.0 — Unified Commands & Skills (Feb 2026)

- **Python/Django support** — Djangoパターン、セキュリティ、TDD、および検証スキル
- **Java Spring Boot skills** — Spring Boot向けのパターン、セキュリティ、TDD、および検証
- **Session management** — セッション履歴用の `/sessions` コマンド
- **Continuous learning v2** — 信頼度スコアリング、インポート/エクスポート、進化を備えたインスティンクトベースの学習

完全な変更履歴は [Releases](https://github.com/affaan-m/everything-claude-code/releases) を参照のこと。

---
## Quick Start

2分未満でセットアップして起動する:

### 1つのパスのみを選択する

ほとんどのClaude Codeユーザーは、正確に1つのインストールパスを使用すべきである:

- **推奨のデフォルト:** Claude Codeプラグインをインストールし、その後で実際に必要なruleフォルダのみをコピーする。
- **手動インストーラーを使用するケース:** よりきめ細かな制御が必要な場合、プラグインパスを完全に避けたい場合、またはClaude Codeのビルドでセルフホストされたマーケットプレイスエントリの解決に問題がある場合のみ。
- **インストール方法を重ねないこと。** 最もよくある壊れたセットアップは、最初に `/plugin install` を実行し、その後で `install.sh --profile full` や `npx ecc-install --profile full` を実行することである。

すでに複数のインストールを重ねており、重複しているように見える場合は、[ECCのリセット/アンインストール](#reset--uninstall-ecc)に直接進んでほしい。

### 低コンテキスト / フックなしパス

hookがグローバルすぎると感じる場合、またはECCのrule、agent、command、およびコアワークフローskillのみが必要な場合は、プラグインをスキップし、最小限の手動プロファイルを使用する:

```bash
./install.sh --profile minimal --target claude
```

```powershell
.\install.ps1 --profile minimal --target claude
# or
npx ecc-install --profile minimal --target claude
```

このプロファイルは、意図的に `hooks-runtime` を除外する。

通常のコアプロファイルが必要だがhookをオフにしたい場合は、以下を使用する:

```bash
./install.sh --profile core --without baseline:hooks --target claude
```

後でランタイム強制が必要になった場合のみ、hookを追加する:

```bash
./install.sh --target claude --modules hooks-runtime
```

### 最初に適切なコンポーネントを見つける

どのECCプロファイルまたはコンポーネントをインストールすべきかわからない場合は、任意のプロジェクトからパッケージ化されたアドバイザーに尋ねてほしい:

```bash
npx ecc consult "security reviews" --target claude
```

一致するコンポーネント、関連するプロファイル、およびプレビュー/インストールコマンドを返す。インストールする前にプレビューコマンドを使用して、正確なファイル計画を確認してほしい。

プロダクションML/MLOpsワークフローの場合は、インストールをオプトインにしてコンポーネントスコープを維持する:

```bash
npx ecc consult "mlops training model deployment" --target claude
npx ecc install --profile minimal --target claude --with capability:machine-learning
```

### Step 1: プラグインをインストールする (推奨)

> 注意: プラグインは便利だが、Claude Codeビルドでセルフホストマーケットプレイスエントリの解決に問題がある場合、以下のOSSインストーラーが依然として最も信頼性の高いパスである。

```bash
# マーケットプレイスを追加
/plugin marketplace add https://github.com/affaan-m/everything-claude-code

# プラグインをインストール
/plugin install ecc@ecc
```

### 名前に関する注意事項と移行

ECCは現在3つの公開識別子を持っており、これらは互換性がない:

- GitHubソースリポジトリ: `affaan-m/everything-claude-code`
- Claudeマーケットプレイス/プラグイン識別子: `ecc@ecc`
- npmパッケージ: `ecc-universal`

これは意図的である。Anthropicのマーケットプレイス/プラグインのインストールは、正規のプラグイン識別子によってキー付けされるため、ECCは、厳密なDesktop/APIバリデーターに対してツール名やスラッシュコマンドの名前空間を短く保つために `ecc@ecc` を使用する。古い投稿では以前の長いマーケットプレイス識別子がまだ表示されている場合があるが、それはレガシーエイリアスとしてのみ扱ってほしい。これとは別に、npmパッケージは意図的に `ecc-universal` に留まっているため、npmインストールとマーケットプレイスインストールでは意図的に異なる名前が使用される。

### Step 2: 必要な場合のみルールをインストールする

> 警告: **重要:** Claude Codeプラグインは `rules` を自動的に配布できない。
>
> 既に `/plugin install` 経由でECCをインストールしている場合、**その後で `./install.sh --profile full`、`.\install.ps1 --profile full`、または `npx ecc-install --profile full` を実行しないでほしい**。プラグインは既にECCのskill、command、およびhookを読み込んでいる。プラグインインストールの後に完全なインストーラーを実行すると、同じサーフェスがユーザーディレクトリにコピーされ、重複したskillや重複したランタイム動作が発生する可能性がある。
>
> プラグインインストールの場合は、実際に使用する `rules/` ディレクトリのみを手動で `~/.claude/rules/ecc/` の下にコピーしてほしい。`rules/common` と、実際に使用する1つの言語またはフレームワークパックから始めること。そのすべてのコンテキストをClaudeに明示的に含めたい場合を除き、すべてのルールディレクトリをコピーしないでほしい。
>
> 完全なインストーラーは、プラグインパスの代わりに完全に手動のECCインストールを実行している場合にのみ使用してほしい。
>
> ローカルのClaudeセットアップが消去またはリセットされたとしても、ECCを再購入する必要があるわけではない。まず `node scripts/ecc.js list-installed` から始め、次に何も再インストールする前に `node scripts/ecc.js doctor` と `node scripts/ecc.js repair` を実行してほしい。これで通常、セットアップを再構築することなくECCが管理するファイルが復元される。問題がECC Toolsの課金/アカウントやマーケットプレイスへのアクセスに関するものである場合は、請求/アカウントの復旧は別途対応してほしい。

```bash
# まずリポジトリをクローンする
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code

# 依存関係をインストールする（パッケージマネージャーを選択）
npm install        # または: pnpm install | yarn install | bun install

# プラグインインストールパス: ECCルールのみをECC所有の名前空間にコピーする
mkdir -p ~/.claude/rules/ecc
cp -R rules/common ~/.claude/rules/ecc/
cp -R rules/typescript ~/.claude/rules/ecc/

# 完全な手動ECCインストールパス（/plugin install の代わりにこれを使用する）
# ./install.sh --profile full
```

```powershell
# Windows PowerShell

# プラグインインストールパス: ECCルールのみをECC所有の名前空間にコピーする
New-Item -ItemType Directory -Force -Path "$HOME/.claude/rules/ecc" | Out-Null
Copy-Item -Recurse rules/common "$HOME/.claude/rules/ecc/"
Copy-Item -Recurse rules/typescript "$HOME/.claude/rules/ecc/"

# 完全な手動ECCインストールパス（/plugin install の代わりにこれを使用する）
# .\install.ps1 --profile full
# npx ecc-install --profile full
```

手動インストールの手順については、`rules/` フォルダ内のREADMEを参照してほしい。ルールを手動でコピーする際は、相対参照が機能し続け、ファイル名が衝突しないように、ディレクトリ内のファイルではなく言語ディレクトリ全体（例えば `rules/common` や `rules/golang`）をコピーすること。

### 完全な手動インストール (フォールバック)

プラグインパスを意図的にスキップする場合にのみ、これを使用してほしい:

```bash
./install.sh --profile full
```

```powershell
.\install.ps1 --profile full
# or
npx ecc-install --profile full
```

このパスを選択した場合は、そこで停止すること。`/plugin install` も同時に実行しないでほしい。

### リセット / アンインストール

ECCが重複していたり、邪魔であったり、壊れていると感じた場合は、自身の上に再インストールを続けないこと。

- **プラグインパス:** Claude Codeからプラグインを削除し、手動で `~/.claude/rules/ecc/` の下にコピーした特定のルールフォルダを削除する。
- **手動インストーラー / CLIパス:** リポジトリのルートから、まず削除をプレビューする:

```bash
node scripts/uninstall.js --dry-run
```

その後、ECCが管理するファイルを削除する:

```bash
node scripts/uninstall.js
```

ライフサイクルラッパーを使用することもできる:

```bash
node scripts/ecc.js list-installed
node scripts/ecc.js doctor
node scripts/ecc.js repair
node scripts/ecc.js uninstall --dry-run
```

ECCは、そのインストール状態に記録されたファイルのみを削除する。インストールしていない無関係なファイルは削除しない。

メソッドを重ねてしまった場合は、以下の順序でクリーンアップする:

1. Claude Codeプラグインのインストールを削除する。
2. リポジトリルートからECCアンインストールコマンドを実行し、インストール状態管理ファイルを削除する。
3. 手動でコピーし、不要になった余分なルールフォルダを削除する。
4. 単一のパスを使用して一度だけ再インストールする。

### Step 3: 使い始める

```bash
# スキルは主要なワークフローサーフェスである。
# ECCがcommands/から移行する間、既存のスラッシュスタイルのコマンド名は引き続き機能する。

# プラグインインストールは、正規の名前空間付けられた形式を使用する
/ecc:plan "Add user authentication"

# 手動インストールは、より短いスラッシュ形式を保持する:
# /plan "Add user authentication"

# 利用可能なコマンドを確認する
/plugin list ecc@ecc
```

**以上だ！** これで60個のagent、231個のskill、および75個のレガシーなcommand shimにアクセスできるようになった。

### Dashboard GUI

デスクトップダッシュボードを起動して、ECCコンポーネントを視覚的に探索する:

```bash
npm run dashboard
# or
python3 ./ecc_dashboard.py
```

**機能:**
- タブ付きインターフェース: Agents、Skills、Commands、Rules、Settings
- ダーク/ライトテーマ切り替え
- フォントのカスタマイズ（ファミリーとサイズ）
- ヘッダーとタスクバーのプロジェクトロゴ
- すべてのコンポーネントにわたる検索とフィルター

### マルチモデルコマンドは追加のセットアップが必要

> 警告: `multi-*` コマンドは、上記のベースプラグイン/ルールインストールではカバーされて**いない**。
>
> `/multi-plan`、`/multi-execute`、`/multi-backend`、`/multi-frontend`、および `/multi-workflow` を使用するには、`ccg-workflow` ランタイムもインストールする必要がある。
>
> `npx ccg-workflow` で初期化する。
>
> このランタイムは、以下を含む、これらのコマンドが期待する外部依存関係を提供する:
> - `~/.claude/bin/codeagent-wrapper`
> - `~/.claude/.ccg/prompts/*`
>
> `ccg-workflow` がないと、これらの `multi-*` コマンドは正しく実行されない。
---

## Cross-Platform Support

このプラグインは現在、主要なIDE（Cursor、Zed、OpenCode、Antigravity）およびCLIハーネス全体にわたる緊密な統合とともに、**Windows、macOS、およびLinux**を完全にサポートしている。最大限の互換性のために、すべてのフックとスクリプトはNode.jsで書き直された。

### パッケージマネージャーの検出

プラグインは、以下の優先順位で、お好みのパッケージマネージャー（npm、pnpm、yarn、またはbun）を自動的に検出する：

1. **環境変数**: `CLAUDE_PACKAGE_MANAGER`
2. **プロジェクト設定**: `.claude/package-manager.json`
3. **package.json**: `packageManager` フィールド
4. **ロックファイル**: package-lock.json、yarn.lock、pnpm-lock.yaml、またはbun.lockbからの検出
5. **グローバル設定**: `~/.claude/package-manager.json`
6. **フォールバック**: 最初に利用可能なパッケージマネージャー

お好みのパッケージマネージャーを設定するには：

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

または、Claude Codeで `/setup-pm` コマンドを使用する。

### Hook Runtime Controls

ランタイムフラグを使用して、厳格さを調整したり、特定のフックを一時的に無効にしたりできる：

```bash
# フックの厳格さプロファイル（デフォルト：standard）
export ECC_HOOK_PROFILE=standard

# 無効にするフックIDのカンマ区切りリスト
export ECC_DISABLED_HOOKS="pre:bash:tmux-reminder,post:edit:typecheck"

# SessionStartの追加コンテキストの上限（デフォルト：8000文字）
export ECC_SESSION_START_MAX_CHARS=4000

# ローカルモデルや低コンテキストのセットアップのために、SessionStartの追加コンテキストを完全に無効にする
export ECC_SESSION_START_CONTEXT=off

# コンテキスト/スコープ/ループの警告は維持するが、APIレートのコスト見積もりを抑制する
export ECC_CONTEXT_MONITOR_COST_WARNINGS=off
```

Windows PowerShell:

```powershell
[Environment]::SetEnvironmentVariable('ECC_CONTEXT_MONITOR_COST_WARNINGS', 'off', 'User')
```

---

## What's Inside

このリポジトリは**Claude Codeプラグイン**である - 直接インストールするか、コンポーネントを手動でコピーしてほしい。

```
everything-claude-code/
|-- .claude-plugin/   # プラグインおよびマーケットプレイスのマニフェスト
|   |-- plugin.json         # プラグインのメタデータとコンポーネントパス
|   |-- marketplace.json    # /plugin marketplace add 用のマーケットプレイスカタログ
|
|-- agents/           # 委譲のための60個の特化型サブエージェント
|   |-- planner.md           # 機能実装の計画
|   |-- architect.md         # システム設計の決定
|   |-- tdd-guide.md         # テスト駆動開発
|   |-- code-reviewer.md     # 品質およびセキュリティレビュー
|   |-- security-reviewer.md # 脆弱性分析
|   |-- build-error-resolver.md
|   |-- e2e-runner.md        # PlaywrightのE2Eテスト
|   |-- refactor-cleaner.md  # デッドコードのクリーンアップ
|   |-- doc-updater.md       # ドキュメントの同期
|   |-- docs-lookup.md       # ドキュメント/APIの検索
|   |-- chief-of-staff.md    # コミュニケーションのトリアージと下書き
|   |-- loop-operator.md     # 自律ループの実行
|   |-- harness-optimizer.md # ハーネス設定のチューニング
|   |-- cpp-reviewer.md      # C++のコードレビュー
|   |-- cpp-build-resolver.md # C++のビルドエラー解決
|   |-- fsharp-reviewer.md   # F#の関数型コードレビュー
|   |-- go-reviewer.md       # Goのコードレビュー
|   |-- go-build-resolver.md # Goのビルドエラー解決
|   |-- python-reviewer.md   # Pythonのコードレビュー
|   |-- database-reviewer.md # データベース/Supabaseのレビュー
|   |-- typescript-reviewer.md # TypeScript/JavaScriptのコードレビュー
|   |-- java-reviewer.md     # Java/Spring Bootのコードレビュー
|   |-- java-build-resolver.md # Java/Maven/Gradleのビルドエラー
|   |-- kotlin-reviewer.md   # Kotlin/Android/KMPのコードレビュー
|   |-- kotlin-build-resolver.md # Kotlin/Gradleのビルドエラー
|   |-- harmonyos-app-resolver.md # HarmonyOS/ArkTSアプリ開発
|   |-- rust-reviewer.md     # Rustのコードレビュー
|   |-- rust-build-resolver.md # Rustのビルドエラー解決
|   |-- pytorch-build-resolver.md # PyTorch/CUDAトレーニングエラー
|   |-- mle-reviewer.md      # 本番MLパイプライン、評価、サービング、および監視レビュー
|
|-- skills/           # ワークフロー定義とドメイン知識
|   |-- coding-standards/           # 言語のベストプラクティス
|   |-- clickhouse-io/              # ClickHouseの分析、クエリ、データエンジニアリング
|   |-- backend-patterns/           # API、データベース、キャッシングパターン
|   |-- frontend-patterns/          # React、Next.jsパターン
|   |-- frontend-slides/            # HTMLスライドデッキとPPTXからWebへのプレゼンテーションワークフロー (NEW)
|   |-- article-writing/            # 一般的なAIトーンなしで提供された声での長文執筆 (NEW)
|   |-- content-engine/             # マルチプラットフォームのソーシャルコンテンツと再利用ワークフロー (NEW)
|   |-- market-research/            # 出典が明記された市場、競合、および投資家リサーチ (NEW)
|   |-- investor-materials/         # ピッチデッキ、ワンページャー、メモ、および財務モデル (NEW)
|   |-- investor-outreach/          # パーソナライズされた資金調達のアウトリーチとフォローアップ (NEW)
|   |-- continuous-learning/        # レガシーなv1 Stopフックパターン抽出
|   |-- continuous-learning-v2/     # 信頼度スコアリングを伴うインスティンクトベースの学習
|   |-- iterative-retrieval/        # サブエージェントのための段階的なコンテキストの絞り込み
|   |-- strategic-compact/          # 手動圧縮の提案 (Longform Guide)
|   |-- tdd-workflow/               # TDD方法論
|   |-- security-review/            # セキュリティチェックリスト
|   |-- eval-harness/               # 検証ループ評価 (Longform Guide)
|   |-- verification-loop/          # 継続的検証 (Longform Guide)
|   |-- videodb/                   # ビデオとオーディオ：取り込み、検索、編集、生成、ストリーミング (NEW)
|   |-- golang-patterns/            # Goのイディオムとベストプラクティス
|   |-- golang-testing/             # Goのテストパターン、TDD、ベンチマーク
|   |-- cpp-coding-standards/         # C++ Core GuidelinesからのC++コーディング標準 (NEW)
|   |-- cpp-testing/                # GoogleTest、CMake/CTestを用いたC++テスト (NEW)
|   |-- django-patterns/            # Djangoパターン、モデル、ビュー (NEW)
|   |-- django-security/            # Djangoのセキュリティベストプラクティス (NEW)
|   |-- django-tdd/                 # DjangoのTDDワークフロー (NEW)
|   |-- django-verification/        # Djangoの検証ループ (NEW)
|   |-- laravel-patterns/           # Laravelアーキテクチャパターン (NEW)
|   |-- laravel-security/           # Laravelのセキュリティベストプラクティス (NEW)
|   |-- laravel-tdd/                # LaravelのTDDワークフロー (NEW)
|   |-- laravel-verification/       # Laravelの検証ループ (NEW)
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
|   |-- security-scan/              # AgentShieldセキュリティ監査人統合 (NEW)
|   |-- java-coding-standards/     # Javaコーディング標準 (NEW)
|   |-- jpa-patterns/              # JPA/Hibernateパターン (NEW)
|   |-- postgres-patterns/         # PostgreSQL最適化パターン (NEW)
|   |-- nutrient-document-processing/ # Nutrient APIを用いたドキュメント処理 (NEW)
|   |-- docs/examples/project-guidelines-template.md  # プロジェクト固有のスキルのテンプレート
|   |-- database-migrations/         # 移行パターン（Prisma、Drizzle、Django、Go）(NEW)
|   |-- api-design/                  # REST API設計、ページネーション、エラーレスポンス (NEW)
|   |-- deployment-patterns/         # CI/CD、Docker、ヘルスチェック、ロールバック (NEW)
|   |-- docker-patterns/            # Docker Compose、ネットワーキング、ボリューム、コンテナセキュリティ (NEW)
|   |-- e2e-testing/                 # PlaywrightのE2EパターンとPage Object Model (NEW)
|   |-- content-hash-cache-pattern/  # ファイル処理用のSHA-256コンテンツハッシュキャッシュ (NEW)
|   |-- cost-aware-llm-pipeline/     # LLMコスト最適化、モデルルーティング、予算追跡 (NEW)
|   |-- regex-vs-llm-structured-text/ # 決定フレームワーク：テキスト解析のための正規表現 vs LLM (NEW)
|   |-- swift-actor-persistence/     # actorを用いたスレッドセーフなSwiftデータ永続化 (NEW)
|   |-- swift-protocol-di-testing/   # テスト可能なSwiftコードのためのプロトコルベースのDI (NEW)
|   |-- search-first/               # コーディング前の調査ワークフロー (NEW)
|   |-- skill-stocktake/            # 品質のためのスキルとコマンドの監査 (NEW)
|   |-- liquid-glass-design/         # iOS 26 Liquid Glassデザインシステム (NEW)
|   |-- foundation-models-on-device/ # FoundationModelsによるAppleのオンデバイスLLM (NEW)
|   |-- swift-concurrency-6-2/       # Swift 6.2 Approachable Concurrency (NEW)
|   |-- mle-workflow/               # 本番MLのデータコントラクト、評価、デプロイ、監視 (NEW)
|   |-- perl-patterns/             # モダンPerl 5.36+のイディオムとベストプラクティス (NEW)
|   |-- perl-security/             # Perlセキュリティパターン、テイントモード、安全なI/O (NEW)
|   |-- perl-testing/              # Test2::V0、prove、Devel::Coverを用いたPerl TDD (NEW)
|   |-- autonomous-loops/           # 自律ループパターン：シーケンシャルパイプライン、PRループ、DAGオーケストレーション (NEW)
|   |-- plankton-code-quality/      # Planktonフックによる書き込み時のコード品質強制 (NEW)
|
|-- commands/         # 維持されたスラッシュエントリの互換性; skills/ を優先すること
|   |-- plan.md             # /plan - 実装の計画
|   |-- code-review.md      # /code-review - 品質レビュー
|   |-- build-fix.md        # /build-fix - ビルドエラーの修正
|   |-- refactor-clean.md   # /refactor-clean - デッドコードの削除
|   |-- quality-gate.md     # /quality-gate - 検証ゲート
|   |-- learn.md            # /learn - セッション中からのパターン抽出 (Longform Guide)
|   |-- learn-eval.md       # /learn-eval - パターンの抽出、評価、保存 (NEW)
|   |-- checkpoint.md       # /checkpoint - 検証状態の保存 (Longform Guide)
|   |-- setup-pm.md         # /setup-pm - パッケージマネージャーの設定
|   |-- go-review.md        # /go-review - Goのコードレビュー (NEW)
|   |-- go-test.md          # /go-test - GoのTDDワークフロー (NEW)
|   |-- go-build.md         # /go-build - Goのビルドエラー修正 (NEW)
|   |-- skill-create.md     # /skill-create - git履歴からのスキル生成 (NEW)
|   |-- instinct-status.md  # /instinct-status - 学習したインスティンクトの表示 (NEW)
|   |-- instinct-import.md  # /instinct-import - インスティンクトのインポート (NEW)
|   |-- instinct-export.md  # /instinct-export - インスティンクトのエクスポート (NEW)
|   |-- evolve.md           # /evolve - インスティンクトをスキルにクラスタリング
|   |-- prune.md            # /prune - 期限切れの保留中インスティンクトの削除 (NEW)
|   |-- pm2.md              # /pm2 - PM2サービスライフサイクル管理 (NEW)
|   |-- multi-plan.md       # /multi-plan - マルチエージェントタスク分解 (NEW)
|   |-- multi-execute.md    # /multi-execute - オーケストレーションされたマルチエージェントワークフロー (NEW)
|   |-- multi-backend.md    # /multi-backend - バックエンド向けマルチサービスオーケストレーション (NEW)
|   |-- multi-frontend.md   # /multi-frontend - フロントエンド向けマルチサービスオーケストレーション (NEW)
|   |-- multi-workflow.md   # /multi-workflow - 一般的なマルチサービスワークフロー (NEW)
|   |-- sessions.md         # /sessions - セッション履歴管理
|   |-- test-coverage.md    # /test-coverage - テストカバレッジ分析
|   |-- update-docs.md      # /update-docs - ドキュメントの更新
|   |-- update-codemaps.md  # /update-codemaps - コードマップの更新
|   |-- python-review.md    # /python-review - Pythonのコードレビュー (NEW)
|-- legacy-command-shims/   # /tddや/evalのような引退したシムのオプトインアーカイブ
|   |-- tdd.md              # /tdd - tdd-workflowスキルの使用を推奨
|   |-- e2e.md              # /e2e - e2e-testingスキルの使用を推奨
|   |-- eval.md             # /eval - eval-harnessスキルの使用を推奨
|   |-- verify.md           # /verify - verification-loopスキルの使用を推奨
|   |-- orchestrate.md      # /orchestrate - dmux-workflowsやmulti-workflowの使用を推奨
|
|-- rules/            # 常に従うべきガイドライン (~/.claude/rules/ecc/ にコピー)
|   |-- README.md            # 構造の概要とインストールガイド
|   |-- common/              # 言語に依存しない原則
|   |   |-- coding-style.md    # 不変性、ファイル構成
|   |   |-- git-workflow.md    # コミット形式、PRプロセス
|   |   |-- testing.md         # TDD、80%カバレッジ要件
|   |   |-- performance.md     # モデル選択、コンテキスト管理
|   |   |-- patterns.md        # デザインパターン、スケルトンプロジェクト
|   |   |-- hooks.md           # フックアーキテクチャ、TodoWrite
|   |   |-- agents.md          # サブエージェントに委任するタイミング
|   |   |-- security.md        # 必須のセキュリティチェック
|   |-- typescript/          # TypeScript/JavaScript固有
|   |-- python/              # Python固有
|   |-- golang/              # Go固有
|   |-- swift/               # Swift固有
|   |-- php/                 # PHP固有 (NEW)
|   |-- arkts/               # HarmonyOS / ArkTS固有
|
|-- hooks/            # トリガーベースの自動化
|   |-- README.md                 # フックのドキュメント、レシピ、およびカスタマイズガイド
|   |-- hooks.json                # すべてのフック設定（PreToolUse、PostToolUse、Stopなど）
|   |-- memory-persistence/       # セッションライフサイクルフック (Longform Guide)
|   |-- strategic-compact/        # 圧縮提案 (Longform Guide)
|
|-- scripts/          # クロスプラットフォームのNode.jsスクリプト (NEW)
|   |-- lib/                     # 共有ユーティリティ
|   |   |-- utils.js             # クロスプラットフォームのファイル/パス/システムユーティリティ
|   |   |-- package-manager.js   # パッケージマネージャーの検出と選択
|   |-- hooks/                   # フック実装
|   |   |-- session-start.js     # セッション開始時のコンテキスト読み込み
|   |   |-- session-end.js       # セッション終了時の状態保存
|   |   |-- pre-compact.js       # 圧縮前の状態保存
|   |   |-- suggest-compact.js   # 戦略的な圧縮提案
|   |   |-- evaluate-session.js  # セッションからのパターン抽出
|   |-- setup-package-manager.js # 対話型PMセットアップ
|
|-- tests/            # テストスイート (NEW)
|   |-- lib/                     # ライブラリテスト
|   |-- hooks/                   # フックテスト
|   |-- run-all.js               # すべてのテストを実行
|
|-- contexts/         # 動的なシステムプロンプトインジェクションコンテキスト (Longform Guide)
|   |-- dev.md              # 開発モードコンテキスト
|   |-- review.md           # コードレビューモードコンテキスト
|   |-- research.md         # 調査/探索モードコンテキスト
|
|-- examples/         # 設定とセッションの例
|   |-- CLAUDE.md             # プロジェクトレベルの設定例
|   |-- user-CLAUDE.md        # ユーザーレベルの設定例
|   |-- saas-nextjs-CLAUDE.md   # 実際のSaaS（Next.js + Supabase + Stripe）
|   |-- go-microservice-CLAUDE.md # 実際のGoマイクロサービス（gRPC + PostgreSQL）
|   |-- django-api-CLAUDE.md      # 実際のDjango REST API（DRF + Celery）
|   |-- laravel-api-CLAUDE.md     # 実際のLaravel API（PostgreSQL + Redis）(NEW)
|   |-- rust-api-CLAUDE.md        # 実際のRust API（Axum + SQLx + PostgreSQL）(NEW)
|
|-- mcp-configs/      # MCPサーバー構成
|   |-- mcp-servers.json    # GitHub、Supabase、Vercel、Railwayなど
|
|-- ecc_dashboard.py  # デスクトップGUIダッシュボード (Tkinter)
|
|-- assets/           # ダッシュボード用アセット
|   |-- images/
|       |-- ecc-logo.png
|
|-- marketplace.json  # セルフホストマーケットプレイス構成（/plugin marketplace add 用）
```
---

## Ecosystem Tools

### Skill Creator

リポジトリからClaude Codeスキルを生成する2つの方法:

#### Option A: Local Analysis (Built-in)

外部サービスを使用しないローカル分析には `/skill-create` コマンドを使用する:

```bash
/skill-create                    # 現在のリポジトリを分析
/skill-create --instincts        # continuous-learning-v2 用のインスティンクトも生成
```

これはgit履歴をローカルで分析し、SKILL.mdファイルを生成する。

#### Option B: GitHub App (Advanced)

高度な機能（1万以上のコミット、自動PR、チーム共有）を利用する場合:

[GitHub Appをインストール](https://github.com/apps/skill-creator) | [ecc.tools](https://ecc.tools)

```bash
# 任意のissueでコメントする:
/skill-creator analyze

# または、デフォルトブランチへのpushで自動トリガー
```

どちらのオプションも以下を作成する:
- **SKILL.md ファイル** - Claude Codeですぐに使えるスキル
- **Instinct コレクション** - continuous-learning-v2 用
- **パターン抽出** - コミット履歴から学習する

### AgentShield — Security Auditor

> Claude Code Hackathon（Cerebral Valley x Anthropic、2026年2月）で構築。1282テスト、98%のカバレッジ、102の静的分析ルール。

Claude Code設定の脆弱性、設定ミス、およびインジェクションリスクをスキャンする。

```bash
# クイックスキャン（インストール不要）
npx ecc-agentshield scan

# 安全な問題を自動修正
npx ecc-agentshield scan --fix

# 3つのOpus 4.6エージェントを用いた深い分析
npx ecc-agentshield scan --opus --stream

# ゼロから安全な設定を生成
npx ecc-agentshield init
```

**スキャン対象:** CLAUDE.md、settings.json、MCP config、hook、エージェント定義、および5つのカテゴリ（シークレット検出（14パターン）、権限監査、hookインジェクション分析、MCPサーバーリスクプロファイリング、エージェント設定レビュー）にわたるスキル。

**`--opus` フラグ** は、レッドチーム/ブルーチーム/監査人パイプラインで3つのClaude Opus 4.6エージェントを実行する。攻撃者がエクスプロイトチェーンを発見し、防御者が保護を評価し、監査人が両方を統合して優先順位付けされたリスク評価を作成する。単なるパターンマッチングではなく、敵対的推論を行う。

**出力形式:** ターミナル（A-Fの色分け）、JSON（CIパイプライン用）、Markdown、HTML。ビルドゲートでの重大な発見には終了コード2。

Claude Code内で `/security-scan` を使用して実行するか、[GitHub Action](https://github.com/affaan-m/agentshield) を使ってCIに追加する。

[GitHub](https://github.com/affaan-m/agentshield) | [npm](https://www.npmjs.com/package/ecc-agentshield)

### Continuous Learning v2

インスティンクトベースの学習システムは、パターンを自動的に学習する:

```bash
/instinct-status        # 信頼度とともに学習したインスティンクトを表示
/instinct-import <file> # 他者からインスティンクトをインポート
/instinct-export        # 共有のためにインスティンクトをエクスポート
/evolve                 # 関連するインスティンクトをスキルにクラスタリング
```

完全なドキュメントについては `skills/continuous-learning-v2/` を参照のこと。
レガシーなv1 Stop-hook学習スキルフローを明示的に使用したい場合のみ `continuous-learning/` を保持する。

---

## Requirements

### Claude Code CLI Version

**最小バージョン: v2.1.0 以降**

このプラグインは、プラグインシステムがhookを処理する方法の変更により、Claude Code CLI v2.1.0以降が必要である。

バージョンを確認する:
```bash
claude --version
```

### Important: Hooks Auto-Loading Behavior

> 警告: **コントリビューター向け:** `.claude-plugin/plugin.json` に `"hooks"` フィールドを追加**しないでほしい**。これは回帰テストによって強制されている。

Claude Code v2.1+ は、規約により、インストールされたプラグインから `hooks/hooks.json` を**自動的に読み込む**。`plugin.json` で明示的に宣言すると、重複検出エラーが発生する:

```
Duplicate hooks file detected: ./hooks/hooks.json resolves to already-loaded file
```

**履歴:** これは、このリポジトリで繰り返し修正/元に戻すサイクルを引き起こしてきた（[#29](https://github.com/affaan-m/everything-claude-code/issues/29)、[#52](https://github.com/affaan-m/everything-claude-code/issues/52)、[#103](https://github.com/affaan-m/everything-claude-code/issues/103)）。Claude Codeのバージョン間で動作が変更されたため、混乱が生じていた。これが再導入されるのを防ぐため、現在は回帰テストが設けられている。

---

## Installation

### Option 1: Install as Plugin (Recommended)

このリポジトリを使用する最も簡単な方法 - Claude Codeプラグインとしてインストールする:

```bash
# このリポジトリをマーケットプレイスとして追加する
/plugin marketplace add https://github.com/affaan-m/everything-claude-code

# プラグインをインストールする
/plugin install ecc@ecc
```

または、`~/.claude/settings.json` に直接追加する:

```json
{
  "extraKnownMarketplaces": {
    "ecc": {
      "source": {
        "source": "github",
        "repo": "affaan-m/everything-claude-code"
      }
    }
  },
  "enabledPlugins": {
    "ecc@ecc": true
  }
}
```

これにより、すべてのコマンド、エージェント、スキル、およびフックに即座にアクセスできるようになる。

> **注意:** Claude Codeプラグインシステムは、プラグインを介した `rules` の配布をサポートしていない（[アップストリームの制限](https://code.claude.com/docs/en/plugins-reference)）。ルールは手動でインストールする必要がある:
>
> ```bash
> # まずリポジトリをクローンする
> git clone https://github.com/affaan-m/everything-claude-code.git
>
> # Option A: ユーザーレベルのルール（すべてのプロジェクトに適用）
> mkdir -p ~/.claude/rules/ecc
> cp -r everything-claude-code/rules/common ~/.claude/rules/ecc/
> cp -r everything-claude-code/rules/typescript ~/.claude/rules/ecc/   # スタックを選択
> cp -r everything-claude-code/rules/python ~/.claude/rules/ecc/
> cp -r everything-claude-code/rules/golang ~/.claude/rules/ecc/
> cp -r everything-claude-code/rules/php ~/.claude/rules/ecc/
>
> # Option B: プロジェクトレベルのルール（現在のプロジェクトにのみ適用）
> mkdir -p .claude/rules/ecc
> cp -r everything-claude-code/rules/common .claude/rules/ecc/
> cp -r everything-claude-code/rules/typescript .claude/rules/ecc/     # スタックを選択
> ```

---

### Option 2: Manual Installation

インストールするものを手動で制御したい場合:

```bash
# リポジトリをクローン
git clone https://github.com/affaan-m/everything-claude-code.git

# エージェントをClaude設定にコピー
cp everything-claude-code/agents/*.md ~/.claude/agents/

# ルールディレクトリ（common + 言語固有）をコピー
mkdir -p ~/.claude/rules/ecc
cp -r everything-claude-code/rules/common ~/.claude/rules/ecc/
cp -r everything-claude-code/rules/typescript ~/.claude/rules/ecc/   # スタックを選択
cp -r everything-claude-code/rules/python ~/.claude/rules/ecc/
cp -r everything-claude-code/rules/golang ~/.claude/rules/ecc/
cp -r everything-claude-code/rules/php ~/.claude/rules/ecc/
cp -r everything-claude-code/rules/arkts ~/.claude/rules/ecc/

# 最初にスキルをコピー（主要なワークフローサーフェス）
# 推奨（新規ユーザー）: コア/一般スキルのみ
mkdir -p ~/.claude/skills/ecc
cp -r everything-claude-code/.agents/skills/* ~/.claude/skills/ecc/
cp -r everything-claude-code/skills/search-first ~/.claude/skills/ecc/

# オプション: 必要な場合のみニッチ/フレームワーク固有のスキルを追加
# for s in django-patterns django-tdd laravel-patterns springboot-patterns quarkus-patterns; do
# cp -r everything-claude-code/skills/$s ~/.claude/skills/ecc/
# done

# オプション: 移行中も維持されているスラッシュコマンドの互換性を保持
mkdir -p ~/.claude/commands
cp everything-claude-code/commands/*.md ~/.claude/commands/

# 引退したシムは legacy-command-shims/commands/ にある。
# /tdd のような古い名前がまだ必要な場合のみ、そこから個々のファイルをコピーする。
```

#### Install hooks

リポジトリの生の `hooks/hooks.json` を `~/.claude/settings.json` や `~/.claude/hooks/hooks.json` にコピーしないでほしい。このファイルはプラグイン/リポジトリ指向であり、ECCインストーラーを通じてインストールされるか、プラグインとして読み込まれることを意図しているため、生でのコピーはサポートされている手動インストールパスではない。

コマンドパスが正しく書き換えられるように、インストーラーを使用してClaude hookランタイムのみをインストールしてほしい:

```bash
# macOS / Linux
bash ./install.sh --target claude --modules hooks-runtime
```

```powershell
# Windows PowerShell
pwsh -File .\install.ps1 --target claude --modules hooks-runtime
```

これにより、解決されたhookが `~/.claude/hooks/hooks.json` に書き込まれ、既存の `~/.claude/settings.json` はそのまま残される。

`/plugin install` を介してECCをインストールした場合、それらのhookを `settings.json` にコピーしないでほしい。Claude Code v2.1+ はプラグインの `hooks/hooks.json` をすでに自動読み込みしており、それらを `settings.json` で複製すると、重複実行およびクロスプラットフォームのhookの競合が発生する。

Windowsでの注意点: Claudeの設定ディレクトリは `~/claude` ではなく `%USERPROFILE%\\.claude` である。

#### Configure MCPs

Claudeプラグインのインストールでは、意図的にECCにバンドルされたMCPサーバー定義を自動で有効にしない。これは、手動でのMCP設定を引き続き利用可能にしつつ、厳格なサードパーティゲートウェイにおいてプラグインのMCPツール名が長くなりすぎるのを避けるためである。

ライブのClaude Codeサーバーを変更するには、Claude Codeの `/mcp` コマンドまたはCLIで管理されるMCP設定を使用してほしい。Claude Codeランタイムで無効にするには `/mcp` を使用する。Claude Codeはそれらの選択を `~/.claude.json` に永続化する。

リポジトリローカルでのMCPアクセスのために、目的のMCPサーバー定義を `mcp-configs/mcp-servers.json` からプロジェクトスコープの `.mcp.json` にコピーしてほしい。

すでに自身のECCバンドルMCPのコピーを実行している場合は、以下を設定する:

```bash
export ECC_DISABLED_MCPS="github,context7,exa,playwright,sequential-thinking,memory"
```

ECCが管理するインストールおよびCodexの同期フローは、重複して再追加するのではなく、それらのバンドルされたサーバーをスキップまたは削除する。`ECC_DISABLED_MCPS` はECCのインストール/同期フィルターであり、ライブのClaude Codeのトグルではない。

**重要:** `YOUR_*_HERE` プレースホルダーは実際のAPIキーに置き換えてほしい。

---

## Key Concepts

### Agents

サブエージェントは、限定されたスコープで委任されたタスクを処理する。例:

```markdown
---
name: code-reviewer
description: Reviews code for quality, security, and maintainability
tools: ["Read", "Grep", "Glob", "Bash"]
model: opus
---

You are a senior code reviewer...
```

### Skills

スキルは主要なワークフローサーフェスである。直接呼び出したり、自動的に提案させたり、エージェントが再利用したりすることができる。ECCは移行期間中も維持された `commands/` を出荷し続けるが、引退した短い名前のシムは、明示的なオプトインのみを目的として `legacy-command-shims/` の下に置かれている。新しいワークフローの開発は、まず `skills/` に着地させるべきである。

```markdown
# TDD Workflow

1. Define interfaces first
2. Write failing tests (RED)
3. Implement minimal code (GREEN)
4. Refactor (IMPROVE)
5. Verify 80%+ coverage
```

### Hooks

フックはツールイベントで発火する。例 - console.logに関する警告:

```json
{
  "matcher": "tool == \"Edit\" && tool_input.file_path matches \"\\\\.(ts|tsx|js|jsx)$\"",
  "hooks": [{
    "type": "command",
    "command": "#!/bin/bash\ngrep -n 'console\\.log' \"$file_path\" && echo '[Hook] Remove console.log' >&2"
  }]
}
```

### Rules

ルールは常に従うべきガイドラインであり、`common/`（言語に依存しない）+ 言語固有のディレクトリに整理されている：

```
rules/
  common/          # 普遍的な原則（常にインストールする）
  typescript/      # TS/JS固有のパターンとツール
  python/          # Python固有のパターンとツール
  golang/          # Go固有のパターンとツール
  swift/           # Swift固有のパターンとツール
  php/             # PHP固有のパターンとツール
  arkts/           # HarmonyOS / ArkTSのパターンと制約
```

インストールと構造の詳細については [`rules/README.md`](rules/README.md) を参照のこと。

---

## Which Agent Should I Use?

どこから始めればよいかわからない場合は、このクイックリファレンスを使用してほしい。スキルは正規のワークフローサーフェスである。維持されているスラッシュエントリは、コマンドファーストのワークフローで引き続き利用できる。

| やりたいこと | 使用するサーフェス | 使用されるエージェント |
|--------------|-----------------|------------|
| 新機能の計画 | `/ecc:plan "Add auth"` | planner |
| システムアーキテクチャの設計 | `/ecc:plan` + architect エージェント | architect |
| テストを先に書くコーディング | `tdd-workflow` スキル | tdd-guide |
| 書いたばかりのコードをレビュー | `/code-review` | code-reviewer |
| 失敗したビルドの修正 | `/build-fix` | build-error-resolver |
| エンドツーエンドテストの実行 | `e2e-testing` スキル | e2e-runner |
| セキュリティ脆弱性の発見 | `/security-scan` | security-reviewer |
| デッドコードの削除 | `/refactor-clean` | refactor-cleaner |
| ドキュメントの更新 | `/update-docs` | doc-updater |
| Goコードのレビュー | `/go-review` | go-reviewer |
| Pythonコードのレビュー | `/python-review` | python-reviewer |
| F#コードのレビュー | *(直接 `fsharp-reviewer` を呼び出す)* | fsharp-reviewer |
| TypeScript/JavaScriptコードのレビュー | *(直接 `typescript-reviewer` を呼び出す)* | typescript-reviewer |
| HarmonyOSアプリの開発 | *(直接 `harmonyos-app-resolver` を呼び出す)* | harmonyos-app-resolver |
| データベースクエリの監査 | *(自動的に委任)* | database-reviewer |
| 本番ML変更のレビュー | `mle-workflow` スキル + `mle-reviewer` エージェント | mle-reviewer |

### Common Workflows

以下のスラッシュ形式は、維持されているコマンドサーフェスの一部として残っている場合に示されている。`/tdd` や `/eval` などの引退した短い名前のシムは、明示的なオプトインのみを目的として `legacy-command-shims/` に置かれている。

**新機能の開始:**
```
/ecc:plan "Add user authentication with OAuth"
                                              → plannerが実装の青写真を作成する
tdd-workflow スキル                            → tdd-guideがテストを先に書くことを強制する
/code-review                                  → code-reviewerがあなたの作業をチェックする
```

**バグの修正:**
```
tdd-workflow スキル                            → tdd-guide: バグを再現する失敗するテストを書く
                                              → 修正を実装し、テストが通ることを検証する
/code-review                                  → code-reviewer: リグレッションを検出する
```

**本番環境への準備:**
```
/security-scan                                → security-reviewer: OWASP Top 10監査
e2e-testing スキル                             → e2e-runner: 重要なユーザーフローのテスト
/test-coverage                                → 80%以上のカバレッジを検証
```

---

## FAQ

<details>
<summary><b>インストールされているエージェント/コマンドを確認するにはどうすればよいか？</b></summary>

```bash
/plugin list ecc@ecc
```

これにより、プラグインから利用可能なすべてのエージェント、コマンド、およびスキルが表示される。
</details>

<details>
<summary><b>フックが機能しない / "Duplicate hooks file" エラーが表示される</b></summary>

これは最も一般的な問題である。**`.claude-plugin/plugin.json` に `"hooks"` フィールドを追加しないでほしい。** Claude Code v2.1+ は、インストールされたプラグインから `hooks/hooks.json` を自動的に読み込む。明示的に宣言すると、重複検出エラーが発生する。[#29](https://github.com/affaan-m/everything-claude-code/issues/29)、[#52](https://github.com/affaan-m/everything-claude-code/issues/52)、[#103](https://github.com/affaan-m/everything-claude-code/issues/103) を参照のこと。
</details>

<details>
<summary><b>ECCをカスタムAPIエンドポイントまたはモデルゲートウェイ上のClaude Codeで使用できるか？</b></summary>

可能である。ECCはAnthropicがホストするトランスポート設定をハードコーディングしていない。Claude Codeの通常のCLI/プラグインサーフェスを介してローカルで実行されるため、以下で機能する:

- AnthropicがホストするClaude Code
- `ANTHROPIC_BASE_URL` と `ANTHROPIC_AUTH_TOKEN` を使用する公式のClaude Codeゲートウェイのセットアップ
- Claude Codeが期待するAnthropic APIを話す互換性のあるカスタムエンドポイント

最小限の例:

```bash
export ANTHROPIC_BASE_URL=https://your-gateway.example.com
export ANTHROPIC_AUTH_TOKEN=your-token
claude
```

ゲートウェイがモデル名を再マッピングする場合は、ECCではなくClaude Codeでそれを設定してほしい。ECCのフック、スキル、コマンド、およびルールは、`claude` CLIが機能していればモデルプロバイダーに依存しない。

公式リファレンス:
- [Claude Code LLM gateway docs](https://docs.anthropic.com/en/docs/claude-code/llm-gateway)
- [Claude Code model configuration docs](https://docs.anthropic.com/en/docs/claude-code/model-config)

</details>

<details>
<summary><b>コンテキストウィンドウが縮小している / Claudeのコンテキストが不足している</b></summary>

MCPサーバーが多すぎるとコンテキストが消費される。各MCPツールの説明は200kのウィンドウからトークンを消費し、約70kに減少する可能性がある。SessionStartのコンテキストはデフォルトで8000文字に制限されている。ローカルモデルや低コンテキストの設定では、`ECC_SESSION_START_MAX_CHARS=4000` で下げるか、`ECC_SESSION_START_CONTEXT=off` で無効にしてほしい。

**修正方法:** Claude Codeから `/mcp` を使用して、使われていないMCPを無効にする。Claude Codeはそれらのランタイムの選択を `~/.claude.json` に書き込む。`.claude/settings.json` および `.claude/settings.local.json` は、すでにロードされているMCPサーバーの信頼できるトグルではない。

有効にするMCPは10個未満、アクティブにするツールは80個未満に保ってほしい。
</details>

<details>
<summary><b>一部のコンポーネントのみ（例えば、エージェントのみ）を使用できるか？</b></summary>

可能である。オプション2（手動インストール）を使用し、必要なものだけをコピーしてほしい:

```bash
# エージェントのみ
cp everything-claude-code/agents/*.md ~/.claude/agents/

# ルールのみ
mkdir -p ~/.claude/rules/ecc/
cp -r everything-claude-code/rules/common ~/.claude/rules/ecc/
```

各コンポーネントは完全に独立している。
</details>

<details>
<summary><b>これはCursor / OpenCode / Codex / Antigravity / GitHub Copilotで動作するか？</b></summary>

動作する。ECCはクロスプラットフォームである:
- **Cursor**: `.cursor/` に事前翻訳された設定がある。[Cursor IDE Support](#cursor-ide-support) を参照のこと。
- **Gemini CLI**: `.gemini/GEMINI.md` と共有インストーラーの配管を介した、実験的なプロジェクトローカルサポート。
- **OpenCode**: `.opencode/` での完全なプラグインサポート。[OpenCode Support](#opencode-support) を参照のこと。
- **Codex**: アダプタードリフトガードとSessionStartフォールバックを備えた、macOSアプリとCLIの両方に対するファーストクラスのサポート。PR [#257](https://github.com/affaan-m/everything-claude-code/pull/257) を参照のこと。
- **GitHub Copilot (VS Code)**: `.github/copilot-instructions.md`、`.vscode/settings.json`、および `.github/prompts/` を介した指示とプロンプトレイヤー。[GitHub Copilot Support](#github-copilot-support) を参照のこと。
- **Antigravity**: `.agent/` 内のワークフロー、スキル、およびフラット化されたルールに対する緊密に統合されたセットアップ。[Antigravity Guide](docs/ANTIGRAVITY-GUIDE.md) を参照のこと。
- **JoyCode / CodeBuddy**: コマンド、エージェント、スキル、およびフラット化されたルールのためのプロジェクトローカルの選択的インストールアダプター。[JoyCode Adapter Guide](docs/JOYCODE-GUIDE.md) を参照のこと。
- **Qwen CLI**: コマンド、エージェント、スキル、ルール、およびQwen設定のためのホームディレクトリの選択的インストールアダプター。[Qwen CLI Adapter Guide](docs/QWEN-GUIDE.md) を参照のこと。
- **Zed**: `.zed/settings.json`、フラット化されたルール、コマンド、エージェント、およびスキルのためのプロジェクトローカルの選択的インストールアダプター。
- **Non-native harnesses**: Grokや同様のインターフェースのための手動フォールバックパス。[Manual Adaptation Guide](docs/MANUAL-ADAPTATION-GUIDE.md) を参照のこと。
- **Claude Code**: ネイティブ — これが主要なターゲットである。
</details>

<details>
<summary><b>新しいスキルやエージェントを提供するにはどうすればよいか？</b></summary>

[CONTRIBUTING.md](CONTRIBUTING.md) を参照してほしい。短いバージョン:
1. リポジトリをフォークする
2. `skills/your-skill-name/SKILL.md`（YAMLフロントマター付き）にスキルを作成する
3. または `agents/your-agent.md` にエージェントを作成する
4. それが何を行い、いつ使用するかを明確に説明したPRを提出する
</details>
---

## Running Tests

プラグインには包括的なテストスイートが含まれている:

```bash
# すべてのテストを実行
node tests/run-all.js

# 個別のテストファイルを実行
node tests/lib/utils.test.js
node tests/lib/package-manager.test.js
node tests/hooks/hooks.test.js
```

---

## Contributing

**貢献は歓迎され、奨励されている。**

このリポジトリはコミュニティリソースとなることを意図している。もしあなたが以下のものを持っているなら:
- 有用なエージェントやスキル
- 巧妙なフック
- より良いMCP設定
- 改善されたルール

ぜひ貢献してほしい！ ガイドラインについては [CONTRIBUTING.md](CONTRIBUTING.md) を参照のこと。

### Ideas for Contributions

- 言語固有のスキル（Rust、C#、Kotlin、Java） — Go、Python、Perl、Swift、TypeScript、およびHarmonyOS/ArkTSはすでに含まれている
- フレームワーク固有の設定（Rails、FastAPI） — Django、NestJS、Spring Boot、およびLaravelはすでに含まれている
- DevOpsエージェント（Kubernetes、Terraform、AWS、Docker）
- テスト戦略（さまざまなフレームワーク、視覚的リグレッション）
- ドメイン固有の知識（ML、データエンジニアリング、モバイル）

### Community Ecosystem Notes

これらはECCにバンドルされておらず、このリポジトリによる監査も受けていないが、より広いClaude Codeのスキルエコシステムを探索している場合は知っておく価値がある:

- [claude-seo](https://github.com/AgriciDaniel/claude-seo) — SEOに焦点を当てたスキルとエージェントのコレクション
- [claude-ads](https://github.com/AgriciDaniel/claude-ads) — 広告監査とペイドグロースのワークフローコレクション
- [claude-cybersecurity](https://github.com/AgriciDaniel/claude-cybersecurity) — セキュリティ指向のスキルとエージェントのコレクション

---

## Cursor IDE Support

ECCは、Cursorのプロジェクトレイアウトに適合させたフック、ルール、エージェント、スキル、コマンド、およびMCP設定を備えたCursor IDEサポートを提供する。

### Quick Start (Cursor)

```bash
# macOS/Linux
./install.sh --target cursor typescript
./install.sh --target cursor python golang swift php
```

```powershell
# Windows PowerShell
.\install.ps1 --target cursor typescript
.\install.ps1 --target cursor python golang swift php
```

### What's Included

| コンポーネント | 数 | 詳細 |
|-----------|-------|---------|
| Hook Events | 15 | sessionStart, beforeShellExecution, afterFileEdit, beforeMCPExecution, beforeSubmitPrompt, その他10個 |
| Hook Scripts | 16 | 共有アダプターを介して `scripts/hooks/` に委譲する薄いNode.jsスクリプト |
| Rules | 34 | 9つの共通（alwaysApply） + 25の言語固有（TypeScript、Python、Go、Swift、PHP） |
| Agents | 48 | インストール時の `.cursor/agents/ecc-*.md`; ユーザーやマーケットプレイスのエージェントとの衝突を避けるためのプレフィックス |
| Skills | 共有 + バンドル | 翻訳された追加のための `.cursor/skills/` |
| Commands | 共有 | インストールされている場合は `.cursor/commands/` |
| MCP Config | 共有 | インストールされている場合は `.cursor/mcp.json` |

### Cursor Loading Notes

ECCはルートの `AGENTS.md` を `.cursor/` にインストールしない。Cursorはネストされた `AGENTS.md` ファイルをディレクトリコンテキストとして扱うため、ECCのリポジトリIDをホストプロジェクトにコピーすると、そのプロジェクトが汚染される。

Cursorネイティブの読み込み動作は、Cursorのビルドによって異なる場合がある。ECCはエージェントを `.cursor/agents/ecc-*.md` としてインストールする。使用しているCursorのビルドがプロジェクトのエージェントを公開しない場合でも、それらのファイルは隠されたグローバルプロンプトコンテキストとしてではなく、明示的な参照定義として引き続き機能する。

### Hook Architecture (DRY Adapter Pattern)

Cursorは**Claude Codeよりも多くのフックイベント**を持っている（20対8）。`.cursor/hooks/adapter.js` モジュールは、Cursorの標準入力JSONをClaude Codeの形式に変換し、既存の `scripts/hooks/*.js` を複製なしで再利用できるようにする。

```
Cursor stdin JSON → adapter.js → transforms → scripts/hooks/*.js
                                              (Claude Codeと共有)
```

主要なフック:
- **beforeShellExecution** — tmux外の開発サーバー（exit 2）およびgit pushレビューをブロックする
- **afterFileEdit** — 自動フォーマット + TypeScriptチェック + console.logの警告
- **beforeSubmitPrompt** — プロンプト内のシークレット（sk-、ghp_、AKIAパターン）を検出する
- **beforeTabFileRead** — Tabが.env、.key、.pemファイルを読み込むのをブロックする（exit 2）
- **beforeMCPExecution / afterMCPExecution** — MCP監査ロギング

### Rules Format

Cursorのルールは、`description`、`globs`、および `alwaysApply` を備えたYAMLフロントマターを使用する:

```yaml
---
description: "TypeScript coding style extending common rules"
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]
alwaysApply: false
---
```

---

## Codex macOS App + CLI Support

ECCは、リファレンス設定、Codex固有のAGENTS.mdサプリメント、および共有スキルを備えた、macOSアプリとCLIの両方に対する**ファーストクラスのCodexサポート**を提供する。

### Quick Start (Codex App + CLI)

```bash
# リポジトリでCodex CLIを実行する — AGENTS.mdと.codex/は自動検出される
codex

# 自動セットアップ: ECCアセット（AGENTS.md、スキル、MCPサーバー）を ~/.codex に同期する
npm install && bash scripts/sync-ecc-to-codex.sh
# または: pnpm install && bash scripts/sync-ecc-to-codex.sh
# または: yarn install && bash scripts/sync-ecc-to-codex.sh
# または: bun install && bash scripts/sync-ecc-to-codex.sh

# または手動で: リファレンス設定をホームディレクトリにコピーする
cp .codex/config.toml ~/.codex/config.toml
```

同期スクリプトは、**追加のみ**の戦略を使用して、ECC MCPサーバーを既存の `~/.codex/config.toml` に安全にマージする — 既存のサーバーを削除したり変更したりすることは決してない。変更をプレビューするには `--dry-run` を実行し、ECCサーバーを最新の推奨設定に強制的に更新するには `--update-mcp` を実行する。

Context7の場合、ECCは正規のCodexセクション名 `[mcp_servers.context7]` を使用しつつ、引き続き `@upstash/context7-mcp` パッケージを起動する。すでにレガシーな `[mcp_servers.context7-mcp]` エントリがある場合、`--update-mcp` はそれを正規のセクション名に移行する。

Codex macOS app:
- このリポジトリをワークスペースとして開く。
- ルートの `AGENTS.md` が自動検出される。
- `.codex/config.toml` と `.codex/agents/*.toml` は、プロジェクトローカルに保つのが最適である。
- リファレンスの `.codex/config.toml` は意図的に `model` や `model_provider` を固定していないため、オーバーライドしない限りCodexは自身の現在のデフォルトを使用する。
- オプション: `.codex/config.toml` を `~/.codex/config.toml` にコピーしてグローバルデフォルトとする。`.codex/agents/` もコピーしない限り、マルチエージェントロールファイルはプロジェクトローカルに保つこと。

### What's Included

| コンポーネント | 数 | 詳細 |
|-----------|-------|---------|
| Config | 1 | `.codex/config.toml` — トップレベルの承認/サンドボックス/web_search、MCPサーバー、通知、プロファイル |
| AGENTS.md | 2 | ルート（ユニバーサル） + `.codex/AGENTS.md`（Codex固有のサプリメント） |
| Skills | 32 | `.agents/skills/` — 各スキルの SKILL.md + agents/openai.yaml |
| MCP Servers | 6 | GitHub、Context7、Exa、Memory、Playwright、Sequential Thinking（`--update-mcp` 同期を介してSupabaseを含む7つ） |
| Profiles | 2 | `strict`（読み取り専用サンドボックス）と `yolo`（完全自動承認） |
| Agent Roles | 3 | `.codex/agents/` — explorer、reviewer、docs-researcher |

### Skills

`.agents/skills/` にあるスキルはCodexによって自動的に読み込まれる:

`claude-api`、`frontend-design`、`skill-creator` などの正規のAnthropicスキルは、意図的にここには再バンドルされていない。公式バージョンが必要な場合は、[`anthropics/skills`](https://github.com/anthropics/skills) からインストールしてほしい。

| スキル | 説明 |
|-------|-------------|
| agent-introspection-debugging | エージェントの動作、ルーティング、およびプロンプト境界のデバッグ |
| agent-sort | エージェントカタログと割り当てサーフェスのソート |
| api-design | REST API設計パターン |
| article-writing | メモや音声参照からの長文執筆 |
| backend-patterns | API設計、データベース、キャッシング |
| brand-voice | 実際のコンテンツからソース派生したライティングスタイルプロファイル |
| bun-runtime | ランタイム、パッケージマネージャー、バンドラー、およびテストランナーとしてのBun |
| coding-standards | 普遍的なコーディング標準 |
| content-engine | プラットフォームネイティブなソーシャルコンテンツと再利用 |
| crosspost | X、LinkedIn、Threadsにわたるマルチプラットフォームのコンテンツ配信 |
| deep-research | 統合と出典明記を伴うマルチソースリサーチ |
| dmux-workflows | tmuxペインマネージャーを使用したマルチエージェントオーケストレーション |
| documentation-lookup | Context7 MCPを介した最新のライブラリおよびフレームワークのドキュメント |
| e2e-testing | Playwright E2Eテスト |
| eval-harness | 評価駆動開発 |
| everything-claude-code | プロジェクトの開発規則とパターン |
| exa-search | Web、コード、企業調査のためのExa MCPを介したニューラル検索 |
| fal-ai-media | 画像、ビデオ、オーディオの統合メディア生成 |
| frontend-patterns | React/Next.jsパターン |
| frontend-slides | HTMLプレゼンテーション、PPTX変換、視覚スタイルの探索 |
| investor-materials | デッキ、メモ、モデル、およびワンページャー |
| investor-outreach | パーソナライズされたアウトリーチ、フォローアップ、および紹介の紹介文 |
| market-research | 出典が明記された市場および競合リサーチ |
| mcp-server-patterns | Node/TypeScript SDKを使用したMCPサーバーの構築 |
| nextjs-turbopack | Next.js 16+およびTurbopackのインクリメンタルバンドリング |
| product-capability | プロダクト目標をスコープされたケイパビリティマップに変換する |
| security-review | 包括的なセキュリティチェックリスト |
| strategic-compact | コンテキスト管理 |
| tdd-workflow | 80%以上のカバレッジを持つテスト駆動開発 |
| verification-loop | ビルド、テスト、lint、型チェック、セキュリティ |
| video-editing | FFmpegとRemotionを使用したAI支援ビデオ編集ワークフロー |
| x-api | 投稿と分析のためのX/Twitter API統合 |

### Key Limitation

Codexは**Claudeスタイルのフック実行パリティをまだ提供していない**。そこでのECCの強制は、`AGENTS.md`、オプションの `model_instructions_file` オーバーライド、およびサンドボックス/承認設定を介した指示ベースのものである。

### Multi-Agent Support

現在のCodexビルドは安定したマルチエージェントワークフローをサポートしている。

- `.codex/config.toml` で `features.multi_agent = true` を有効にする
- `[agents.<name>]` の下にロールを定義する
- 各ロールを `.codex/agents/` の下のファイルに向ける
- CLIで `/agent` を使用して、子エージェントを検査または操作する

ECCには3つのサンプルロール設定が同梱されている:

| ロール | 目的 |
|------|---------|
| `explorer` | 編集前の読み取り専用コードベースの証拠収集 |
| `reviewer` | 正確性、セキュリティ、およびテスト欠落のレビュー |
| `docs_researcher` | リリース/ドキュメント変更前のドキュメントおよびAPIの検証 |
---

## Zed Support

ECCは、プロジェクトローカル設定、フラット化されたルール、エージェント、コマンド、およびスキルのための保守的な `.zed` アダプターを介してZedプロジェクトサポートを提供する。

```bash
./install.sh --profile minimal --target zed
```

```powershell
.\install.ps1 --profile minimal --target zed
```

アダプターはECCが管理するファイルを `.zed/` の下に書き込み、BYOK/OpenRouterの資格情報をリポジトリから除外する。ZedのアカウントまたはAPIキーは、Zed自身のユーザーインターフェース設定またはローカルユーザー設定を通じて設定してほしい。

---

## OpenCode Support

ECCは、プラグインとフックを含む**完全なOpenCodeサポート**を提供する。

### Quick Start

```bash
# OpenCodeをインストールする
npm install -g opencode

# リポジトリのルートで実行する
opencode
```

構成は `.opencode/opencode.json` から自動的に検出される。

### Feature Parity

| 機能 | Claude Code | OpenCode | ステータス |
|---------|-------------|----------|--------|
| Agents | PASS: 60エージェント | PASS: 12エージェント | **Claude Codeがリード** |
| Commands | PASS: 75コマンド | PASS: 35コマンド | **Claude Codeがリード** |
| Skills | PASS: 231スキル | PASS: 37スキル | **Claude Codeがリード** |
| Hooks | PASS: 8イベントタイプ | PASS: 11イベント | **OpenCodeがより多い！** |
| Rules | PASS: 29ルール | PASS: 13指示 | **Claude Codeがリード** |
| MCP Servers | PASS: 14サーバー | PASS: 完全 | **完全なパリティ** |
| Custom Tools | PASS: フック経由 | PASS: 6ネイティブツール | **OpenCodeが優れている** |

### Hook Support via Plugins

OpenCodeのプラグインシステムは、20以上のイベントタイプを持つClaude Codeよりも洗練されている:

| Claude Code Hook | OpenCode Plugin Event |
|-----------------|----------------------|
| PreToolUse | `tool.execute.before` |
| PostToolUse | `tool.execute.after` |
| Stop | `session.idle` |
| SessionStart | `session.created` |
| SessionEnd | `session.deleted` |

**追加のOpenCodeイベント**: `file.edited`、`file.watcher.updated`、`message.updated`、`lsp.client.diagnostics`、`tui.toast.show` など。

### Maintained Slash Entries

| コマンド | 説明 |
|---------|-------------|
| `/plan` | 実装計画を作成する |
| `/code-review` | コードの変更をレビューする |
| `/build-fix` | ビルドエラーを修正する |
| `/refactor-clean` | デッドコードを削除する |
| `/learn` | セッションからパターンを抽出する |
| `/checkpoint` | 検証状態を保存する |
| `/quality-gate` | 維持されている検証ゲートを実行する |
| `/update-docs` | ドキュメントを更新する |
| `/update-codemaps` | コードマップを更新する |
| `/test-coverage` | カバレッジを分析する |
| `/go-review` | Goコードのレビュー |
| `/go-test` | GoのTDDワークフロー |
| `/go-build` | Goビルドエラーの修正 |
| `/python-review` | Pythonコードのレビュー（PEP 8、型ヒント、セキュリティ） |
| `/multi-plan` | マルチモデル協調計画 |
| `/multi-execute` | マルチモデル協調実行 |
| `/multi-backend` | バックエンドに焦点を当てたマルチモデルワークフロー |
| `/multi-frontend` | フロントエンドに焦点を当てたマルチモデルワークフロー |
| `/multi-workflow` | 完全なマルチモデル開発ワークフロー |
| `/pm2` | PM2サービスコマンドの自動生成 |
| `/sessions` | セッション履歴の管理 |
| `/skill-create` | gitからのスキル生成 |
| `/instinct-status` | 学習したインスティンクトの表示 |
| `/instinct-import` | インスティンクトのインポート |
| `/instinct-export` | インスティンクトのエクスポート |
| `/evolve` | インスティンクトをスキルにクラスタリング |
| `/promote` | プロジェクトのインスティンクトをグローバルスコープに昇格 |
| `/projects` | 既知のプロジェクトとインスティンクトの統計情報を一覧表示 |
| `/prune` | 期限切れの保留中インスティンクトの削除（30日TTL） |
| `/learn-eval` | パターンを保存する前に抽出および評価する |
| `/setup-pm` | パッケージマネージャーの設定 |
| `/harness-audit` | ハーネスの信頼性、評価の準備状況、およびリスク姿勢の監査 |
| `/loop-start` | 制御されたエージェンティックループ実行パターンの開始 |
| `/loop-status` | アクティブなループ状態とチェックポイントの検査 |
| `/quality-gate` | パスまたはリポジトリ全体の品質ゲートチェックの実行 |
| `/model-route` | 複雑さと予算に基づいてタスクをモデルにルーティングする |

### Plugin Installation

**Option 1: 直接使用する**
```bash
cd everything-claude-code
opencode
```

**Option 2: npmパッケージとしてインストールする**
```bash
npm install ecc-universal
```

次に、あなたの `opencode.json` に追加する:
```json
{
  "plugin": ["ecc-universal"]
}
```

そのnpmプラグインエントリにより、ECCの公開されたOpenCodeプラグインモジュール（フック/イベントおよびプラグインツール）が有効になる。
これによってECCの完全なコマンド/エージェント/指示カタログがプロジェクト構成に**自動的に追加されるわけではない**。

完全なECC OpenCodeセットアップについては、以下のいずれかを行う:
- このリポジトリ内でOpenCodeを実行する、または
- バンドルされている `.opencode/` 設定アセットをプロジェクトにコピーし、`opencode.json` で `instructions`、`agent`、および `command` エントリを接続する

### Documentation

- **移行ガイド**: `.opencode/MIGRATION.md`
- **OpenCodeプラグインのREADME**: `.opencode/README.md`
- **統合されたルール**: `.opencode/instructions/INSTRUCTIONS.md`
- **LLMドキュメント**: `llms.txt`（LLM向けの完全なOpenCodeドキュメント）

---

## GitHub Copilot Support

ECCは、追加のツールを必要としない、Copilot Chatのネイティブな指示とプロンプトファイルシステムを介したVS Code向けの**GitHub Copilotサポート**を提供する。

### What's Included

| コンポーネント | ファイル | 目的 |
|-----------|------|---------|
| Core instructions | `.github/copilot-instructions.md` | 常に読み込まれるルール: コーディングスタイル、セキュリティ、テスト、gitワークフロー |
| VS Code settings | `.vscode/settings.json` | コード生成、テスト生成、レビュー、およびコミットメッセージのためのタスクごとの指示ファイル |
| Plan prompt | `.github/prompts/plan.prompt.md` | 段階的な実装計画 |
| TDD prompt | `.github/prompts/tdd.prompt.md` | Red-Green-Improveサイクル |
| Code review prompt | `.github/prompts/code-review.prompt.md` | 品質およびセキュリティレビュー |
| Security review prompt | `.github/prompts/security-review.prompt.md` | 深いOWASP整合セキュリティ分析 |
| Build fix prompt | `.github/prompts/build-fix.prompt.md` | 体系的なビルドおよびCIエラー解決 |
| Refactor prompt | `.github/prompts/refactor.prompt.md` | デッドコードのクリーンアップと簡素化 |

### Quick Start (GitHub Copilot)

ファイルはすでに配置されている — このプロジェクトを含む任意のリポジトリを開くと、GitHub Copilot Chatは自動的に `.github/copilot-instructions.md` を取得する。
コミットされた `.vscode/settings.json` は `chat.promptFiles` を有効にし、VS Codeが `.github/prompts/` から再利用可能なプロンプトを読み込めるようにする。

Copilot Chatでワークフロープロンプトを使用するには:
1. VS CodeでCopilot Chatパネルを開く。
2. **クリップ/添付**アイコンをクリックして**Prompt...**を選択するか、`/` を入力してプロンプトを選択する。
3. プロンプトを選択する（例: `plan`、`tdd`、`code-review`）。

### How It Works

VS CodeのGitHub Copilotは、2種類のファイルを自動的に読み込む:

- **`.github/copilot-instructions.md`** — すべてのCopilot Chatリクエストに常に注入されるリポジトリレベルの指示。ECCのコアコーディング標準、セキュリティチェックリスト、テスト要件、およびgitワークフローが含まれている。
- **`.github/prompts/*.prompt.md`** — ユーザーがオンデマンドで呼び出す再利用可能なプロンプトファイル。各プロンプトは、特定のECCワークフロー（計画 → TDD → レビュー → 出荷）を通じてCopilotをガイドする。

**`.vscode/settings.json`** は、コード生成、テストの記述、選択範囲のレビュー、またはコミットメッセージの作成のいずれを行っているかに応じてCopilotが適切なコンテキストを受け取るように、タスクごとの指示オーバーレイを追加する。

### Feature Coverage

| ECC機能 | Copilotの相当機能 |
|-------------|-------------------|
| コーディング標準 | `copilot-instructions.md` を介して常にオン |
| セキュリティチェックリスト | 常にオン + `security-review` プロンプト |
| テスト / TDD | 常にオン + `tdd` プロンプト |
| 実装計画 | `plan` プロンプト |
| コードレビュー | `code-review` プロンプト |
| ビルドエラー解決 | `build-fix` プロンプト |
| リファクタリング | `refactor` プロンプト |
| コミットメッセージ形式 | `settings.json` 内のタスクごとの指示 |
| フック / 自動化 | サポートなし（Copilotにはフックシステムがない） |
| エージェント / 委譲 | サポートなし（CopilotにはサブエージェントAPIがない） |

### Limitations

GitHub CopilotにはフックシステムやサブエージェントAPIがないため、ECCのフックによる自動化（自動フォーマット、TypeScriptチェック、セッションの永続化、開発サーバーガード）とエージェントへの委譲は利用できない。しかし、指示とプロンプトレイヤーは、標準、セキュリティ、TDD、ワークフローといったECCの完全なコーディング哲学をすべてのCopilot Chatセッションにもたらす。

---
## Cross-Tool Feature Parity

ECCは**すべての主要なAIコーディングツールを最大限に活用する最初のプラグイン**である。各ハーネスの比較は以下の通りである:

| 機能 | Claude Code | Cursor IDE | Codex CLI | OpenCode | GitHub Copilot |
|---------|------------|------------|-----------|----------|----------------|
| **Agents** | 60 | Shared (AGENTS.md) | Shared (AGENTS.md) | 12 | N/A |
| **Commands** | 75 | Shared | 指示ベース | 35 | 6 prompts |
| **Skills** | 231 | Shared | 10 (ネイティブ形式) | 37 | 指示経由 |
| **Hook Events** | 8種類 | 15種類 | まだない | 11種類 | None |
| **Hook Scripts** | 20+スクリプト | 16スクリプト (DRY adapter) | N/A | プラグインフック | N/A |
| **Rules** | 34 (common + lang) | 34 (YAML frontmatter) | 指示ベース | 13指示 | 1つの常時オンファイル |
| **Custom Tools** | フック経由 | フック経由 | N/A | 6ネイティブツール | N/A |
| **MCP Servers** | 14 | Shared (mcp.json) | 7 (TOMLパーサー経由で自動マージ) | 完全 | N/A |
| **Config Format** | settings.json | hooks.json + rules/ | config.toml | opencode.json | copilot-instructions.md + settings.json |
| **Context File** | CLAUDE.md + AGENTS.md | AGENTS.md | AGENTS.md | AGENTS.md | copilot-instructions.md |
| **Secret Detection** | フックベース | beforeSubmitPromptフック | サンドボックスベース | フックベース | 指示ベース |
| **Auto-Format** | PostToolUseフック | afterFileEditフック | N/A | file.editedフック | N/A |
| **Version** | Plugin | Plugin | リファレンス設定 | 2.0.0-rc.1 | 指示レイヤー |

**主要なアーキテクチャの決定:**
- ルートの**AGENTS.md**は、ユニバーサルなクロスツールファイルである（Claude Code、Cursor、Codex、およびOpenCodeによって読み込まれる — GitHub Copilotは代わりに `.github/copilot-instructions.md` を使用する）
- **DRYアダプターパターン**により、Cursorは重複することなくClaude Codeのフックスクリプトを再利用できる
- **Skills形式**（YAMLフロントマターを持つSKILL.md）は、Claude Code、Codex、およびOpenCode全体で機能する
- Codexにフックがないことは、`AGENTS.md`、オプションの `model_instructions_file` オーバーライド、およびサンドボックス権限によって補われている

---

## Background

私は実験的なロールアウトの時からClaude Codeを使用している。2025年9月のAnthropic x Forum Venturesハッカソンで、[@DRodriguezFX](https://x.com/DRodriguezFX) とともに完全にClaude Codeを使用して [zenith.chat](https://zenith.chat) を構築し、優勝した。

これらの設定は、複数の本番アプリケーション全体で実戦テストされている。

---

## Token Optimization

トークンの消費を管理しないと、Claude Codeの使用料は高額になる可能性がある。これらの設定は、品質を犠牲にすることなくコストを大幅に削減する。

### Recommended Settings

`~/.claude/settings.json` に追加する:

```json
{
  "model": "sonnet",
  "env": {
    "MAX_THINKING_TOKENS": "10000",
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "50"
  }
}
```

| 設定 | デフォルト | 推奨 | 影響 |
|---------|---------|-------------|--------|
| `model` | opus | **sonnet** | 約60%のコスト削減。コーディングタスクの80%以上を処理 |
| `MAX_THINKING_TOKENS` | 31,999 | **10,000** | リクエストごとの隠れた思考コストを約70%削減 |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | 95 | **50** | より早く圧縮する — 長いセッションでの品質向上 |
| `ECC_CONTEXT_MONITOR_COST_WARNINGS` | on | **サブスクリプションユーザーはoff** | コンテキスト/スコープ/ループの警告は維持しつつ、エージェント向けAPIレートの見積もり警告を抑制 |

深いアーキテクチャの推論が必要な場合のみ、Opusに切り替える:
```
/model opus
```

### Daily Workflow Commands

| コマンド | いつ使用するか |
|---------|-------------|
| `/model sonnet` | ほとんどのタスクのデフォルト |
| `/model opus` | 複雑なアーキテクチャ、デバッグ、深い推論 |
| `/clear` | 関連のないタスクの間（無料、即時リセット） |
| `/compact` | 論理的なタスクのブレークポイント（調査完了、マイルストーン完了） |
| `/cost` | セッション中のトークン消費の監視 |

Claudeサブスクリプションを使用しており、コンテキストモニターのAPIレートの見積もりが有用でない場合は、`ECC_CONTEXT_MONITOR_COST_WARNINGS=off` を設定してほしい。これはエージェント向けのコスト警告を抑制するだけであり、コンテキストの枯渇、スコープ、またはループの警告を無効にするものではない。

### Strategic Compaction

このプラグインに含まれる `strategic-compact` スキルは、95%コンテキストでの自動圧縮に依存するのではなく、論理的なブレークポイントで `/compact` を提案する。完全な決定ガイドについては `skills/strategic-compact/SKILL.md` を参照のこと。

**いつ圧縮するか:**
- 調査/探索の後、実装の前
- マイルストーンを完了した後、次を開始する前
- デバッグの後、機能の作業を再開する前
- 失敗したアプローチの後、新しいアプローチを試す前

**いつ圧縮してはいけないか:**
- 実装の途中（変数名、ファイルパス、部分的な状態が失われる）

### Context Window Management

**重要:** すべてのMCPを一度に有効にしないでほしい。各MCPツールの説明は200kのウィンドウからトークンを消費し、約70kに減少する可能性がある。

- プロジェクトごとに有効にするMCPは10個未満に保つ
- アクティブにするツールは80個未満に保つ
- 未使用のClaude Code MCPサーバーを無効にするには `/mcp` を使用する。それらのランタイムの選択は `~/.claude.json` に保持される
- `ECC_DISABLED_MCPS` は、インストール/同期フロー中にECCが生成したMCP構成をフィルタリングするためだけに使用する

### Agent Teams Cost Warning

エージェントチームは複数のコンテキストウィンドウを生成する。各チームメンバーは独立してトークンを消費する。並列処理が明確な価値をもたらすタスク（マルチモジュールの作業、並列レビュー）にのみ使用してほしい。単純なシーケンシャルタスクの場合、サブエージェントの方がトークン効率が良い。

---

## WARNING: Important Notes

### Token Optimization

1日の制限に達した場合は、推奨設定とワークフローのヒントについて、**[トークン最適化ガイド](docs/token-optimization.md)** を参照のこと。

Quick wins:

```json
// ~/.claude/settings.json
{
  "model": "sonnet",
  "env": {
    "MAX_THINKING_TOKENS": "10000",
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "50",
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku"
  }
}
```

関連のないタスクの間には `/clear` を、論理的なブレークポイントには `/compact` を、消費の監視には `/cost` を使用してほしい。

### Customization

これらの設定は私のワークフローで機能するものである。あなたは以下のことをすべきである:
1. 共感できるものから始める
2. 自分のスタックに合わせて変更する
3. 使わないものは削除する
4. 自分自身のパターンを追加する

---

## Community Projects

Everything Claude Codeに基づいて、またはそこからインスピレーションを得て構築されたプロジェクト:

| プロジェクト | 説明 |
|---------|-------------|
| [EVC](https://github.com/SaigonXIII/evc) | マーケティングエージェントワークスペース — コンテンツオペレーター、ブランドガバナンス、マルチチャネルパブリッシング向けの42のコマンド。[視覚的概要](https://saigonxiii.github.io/evc)。 |
| [trading-skills](https://github.com/VictorVVedtion/trading-skills) | マーケットオペレーターからインスピレーションを得た、取引前のレビュープロンプトとリスクゲートを備えた、68のトレーディングをテーマにしたClaude Codeスキル。 |

ECCで何かを構築したなら、ここにそれを追加するPRをオープンしてほしい。

---

## Sponsors

このプロジェクトは無料でオープンソースである。スポンサーは維持と成長を助ける。

[**スポンサーになる**](https://github.com/sponsors/affaan-m) | [スポンサーティア](SPONSORS.md) | [スポンサーシッププログラム](SPONSORING.md)

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=affaan-m/everything-claude-code&type=Date)](https://star-history.com/#affaan-m/everything-claude-code&Date)

---

## Links

- **Shorthand Guide (Start Here):** [The Shorthand Guide to Everything Claude Code](https://x.com/affaanmustafa/status/2012378465664745795)
- **Longform Guide (Advanced):** [The Longform Guide to Everything Claude Code](https://x.com/affaanmustafa/status/2014040193557471352)
- **Security Guide:** [Security Guide](./the-security-guide.md) | [Thread](https://x.com/affaanmustafa/status/2033263813387223421)
- **Follow:** [@affaanmustafa](https://x.com/affaanmustafa)

---

## License

MIT - 自由に使用し、必要に応じて変更し、可能であれば還元してほしい。

---

**役に立ったらこのリポジトリにスターをつけてほしい。両方のガイドを読むこと。素晴らしいものを構築しよう。**
