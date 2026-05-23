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

**AIエージェントハーネスのためのパフォーマンス最適化システムである。Anthropicハッカソンの優勝者によって作成された。**

単なる設定ではない。スキル、直感、メモリ最適化、継続的学習、セキュリティスキャン、そしてリサーチファーストな開発を備えた完全なシステムである。10ヶ月以上にわたり実際のプロダクトを構築する中で毎日集中的に使用し、進化させてきた、本番環境に対応するエージェント、スキル、フック、ルール、MCP設定、およびレガシーコマンドシムである。

**Claude Code**、**Codex**、**Cursor**、**OpenCode**、**Gemini**、**Zed**、**GitHub Copilot**、その他のAIエージェントハーネスを横断して動作する。

ECC v2.0.0-rc.1では、その再利用可能なレイヤーの上にパブリックなHermesオペレータストーリーが追加されている。[Hermesセットアップガイド](docs/HERMES-SETUP.md)から始め、次に[rc.1リリースノート](docs/releases/2.0.0-rc.1/release-notes.md)および[クロスハーネスアーキテクチャ](docs/architecture/cross-harness.md)を確認すること。

---

<table>
<tr>
<td width="25%" align="center">
  <a href="https://ecc.tools/pricing">
    <strong> ECC Pro</strong><br />
    <sub>Private repos · GitHub App · $19/seat/mo</sub>
  </a>
</td>
<td width="25%" align="center">
  <a href="https://github.com/sponsors/affaan-m">
    <strong> Sponsor</strong><br />
    <sub>Fund the OSS · From $5/mo</sub>
  </a>
</td>
<td width="25%" align="center">
  <a href="https://github.com/affaan-m/everything-claude-code/discussions">
    <strong>Community</strong>
    <br />
    <sub>Discussions · Q&amp;A · Show & Tell</sub>
  </a>
</td>
<td width="25%" align="center">
  <a href="https://github.com/apps/ecc-tools">
    <strong> GitHub App</strong><br />
    <sub>Install · PR audits · Free tier</sub>
  </a>
</td>
</tr>
</table>

<sub>**OSSは引き続き無料である。** このリポジトリは永久にMITライセンスである。ECC Proはプライベートリポジトリ向けのホスト型GitHub Appである。<a href="https://github.com/sponsors/affaan-m">スポンサー</a>と<a href="https://ecc.tools/pricing">Proサブスクライバー</a>がこの作業に資金を提供しており、それゆえに一人のメンテナが7つのハーネスにわたって毎週リリースできている。</sub>

---

## The Guides

このリポジトリは生のコードのみである。すべてはガイドで説明されている。

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
<td align="center"><b>Shorthand Guide</b><br/>セットアップ、基礎、哲学。<b>まずこれを読むこと。</b></td>
<td align="center"><b>Longform Guide</b><br/>トークン最適化、メモリ永続化、評価、並列化。</td>
<td align="center"><b>Security Guide</b><br/>攻撃ベクトル、サンドボックス、サニタイズ、CVE、AgentShield。</td>
</tr>
</table>

| トピック | 学べること |
|-------|-------------------|
| トークン最適化 | モデル選択、システムプロンプトの削減、バックグラウンドプロセス |
| メモリ永続化 | セッション間でコンテキストを自動的に保存・読み込みするフック |
| 継続的学習 | セッションからパターンを自動抽出し、再利用可能なスキルにする |
| 検証ループ | チェックポイントと継続的評価、グレーダーのタイプ、pass@k メトリクス |
| 並列化 | Gitワークツリー、カスケードメソッド、インスタンスをスケールするタイミング |
| サブエージェントオーケストレーション | コンテキスト問題、反復的検索パターン |

---

## What's New

### v2.0.0-rc.1 — サーフェスリフレッシュ、オペレータワークフロー、ECC 2.0 Alpha (2026年4月)

- **ダッシュボード GUI** — ダーク/ライトテーマ切り替え、フォントカスタマイズ、ヘッダーおよびタスクバーでのプロジェクトロゴ表示機能を備えた、Tkinterベースの新しいデスクトップアプリケーション（`ecc_dashboard.py` または `npm run dashboard`）。
- **ライブリポジトリと同期されたパブリックサーフェス** — メタデータ、カタログ数、プラグインマニフェスト、およびインストール向けドキュメントが、実際のOSSサーフェス（60エージェント、231スキル、75レガシーコマンドシム）と一致するようになった。
- **オペレータおよびアウトバウンドワークフローの拡張** — `brand-voice`、`social-graph-ranker`、`connections-optimizer`、`customer-billing-ops`、`ecc-tools-cost-audit`、`google-workspace-ops`、`project-flow-ops`、および `workspace-surface-audit` により、オペレータレーンが補完された。
- **メディアおよびローンチツール** — `manim-video`、`remotion-video-creation`、およびアップグレードされたソーシャルパブリッシングサーフェスにより、技術解説やローンチコンテンツが同一システムの一部として統合された。
- **フレームワークとプロダクトサーフェスの成長** — `nestjs-patterns`、Codex/OpenCode向けのより充実したインストールサーフェス、および拡張されたクロスハーネスパッケージングにより、Claude Code以外でもリポジトリが利用可能であり続けている。
- **ECC 2.0 alphaをツリーに統合** — `ecc2/`にあるRustコントロールプレーンのプロトタイプがローカルでビルド可能になり、`dashboard`、`start`、`sessions`、`status`、`stop`、`resume`、`daemon`コマンドが公開された。アルファ版として利用可能だが、まだ一般リリースではない。
- **オペレータステータススナップショット** — `ecc status --markdown --write status.md` により、ローカルのステートストアが、レディネス、アクティブなセッション、スキル実行ヘルス、インストールヘルス、保留中のガバナンスイベント、およびLinear/GitHub/ハンドオフからのリンクされた作業アイテムをカバーするポータブルなハンドオフへと変換される。手動での入力には `ecc work-items upsert ...` を使用し、PR/イシューキューのステートには `ecc work-items sync-github --repo owner/repo`、そしてレディネスに注意が必要な場合に自動化を失敗させるには `ecc status --exit-code` を使用すること。
- **エコシステムのハードニング** — AgentShield、ECC Toolsコストコントロール、請求ポータル作業、およびウェブサイトの刷新が、別々のサイロに漂流することなく、コアプラグインの周辺で出荷され続けている。

### v1.9.0 — 選択的インストールと対応言語の拡大 (2026年3月)

- **選択的インストールアーキテクチャ** — `install-plan.js` および `install-apply.js` による、対象コンポーネントをインストールするためのマニフェスト駆動のインストールパイプライン。ステートストアがインストール内容を追跡し、インクリメンタルな更新を可能にする。
- **6つの新規エージェント** — `typescript-reviewer`、`pytorch-build-resolver`、`java-build-resolver`、`java-reviewer`、`kotlin-reviewer`、`kotlin-build-resolver` により、サポート言語が10言語に拡大した。
- **新規スキル** — ディープラーニングワークフロー向けの `pytorch-patterns`、APIリファレンス調査向けの `documentation-lookup`、モダンJSツールチェーン向けの `bun-runtime` および `nextjs-turbopack`、さらに8つの運用ドメインスキルと `mcp-server-patterns`。
- **セッションとステートインフラストラクチャ** — クエリCLIを備えたSQLiteステートストア、構造化された記録のためのセッションアダプター、自己改善スキルのためのスキル進化基盤。
- **オーケストレーションの全面改修** — ハーネス監査スコアリングの決定論化、オーケストレーションステータスとランチャー互換性の強化、5層のガードによるオブザーバーループ防止。
- **オブザーバーの信頼性** — スロットリングとテールサンプリングによるメモリ爆発の修正、サンドボックスアクセスの修正、遅延起動ロジック、および再入可能ガード。
- **12の言語エコシステム** — 既存のTypeScript、Python、Go、および共通ルールに加えて、Java、PHP、Perl、Kotlin/Android/KMP、C++、およびRustの新しいルールが追加された。
- **コミュニティからの貢献** — 韓国語および中国語の翻訳、Biomeフック最適化、動画処理スキル、運用スキル、PowerShellインストーラー、Antigravity IDEサポート。
- **CIハードニング** — 19のテスト失敗修正、カタログ数強制、インストールマニフェスト検証、そしてテストスイート全体のグリーン化。

### v1.8.0 — ハーネスパフォーマンスシステム (2026年3月)

- **ハーネスファーストリリース** — ECCは単なる設定パックではなく、明示的にエージェントハーネスパフォーマンスシステムとして位置づけられるようになった。
- **フック信頼性の全面改修** — SessionStartルートフォールバック、Stopフェーズのセッションサマリー、および壊れやすいインラインのワンライナーを置き換えるスクリプトベースのフック。
- **フックランタイムコントロール** — フックファイルを編集することなくランタイムのゲート設定を可能にする `ECC_HOOK_PROFILE=minimal|standard|strict` および `ECC_DISABLED_HOOKS=...`。
- **新規ハーネスコマンド** — `/harness-audit`、`/loop-start`、`/loop-status`、`/quality-gate`、`/model-route`。
- **NanoClaw v2** — モデルルーティング、スキルホットロード、セッションブランチ/検索/エクスポート/コンパクト/メトリクス。
- **クロスハーネスパリティ** — Claude Code、Cursor、OpenCode、およびCodexアプリ/CLI間での動作の厳格化。
- **997の内部テストがパス** — フック/ランタイムリファクタリングおよび互換性アップデート後、テストスイート全体がグリーンになった。

### v1.7.0 — クロスプラットフォームの拡大とプレゼンテーションビルダー (2026年2月)

- **Codexアプリ + CLIサポート** — 直接的な `AGENTS.md` ベースのCodexサポート、インストーラーターゲット、およびCodexドキュメント。
- **`frontend-slides` スキル** — PPTX変換ガイダンスと厳密なビューポートフィットルールを備えた、依存関係ゼロのHTMLプレゼンテーションビルダー。
- **5つの新しい一般的なビジネス/コンテンツスキル** — `article-writing`、`content-engine`、`market-research`、`investor-materials`、`investor-outreach`。
- **より広範なツールカバー率** — 同じリポジトリがすべての主要ハーネスにクリーンにデプロイできるように、Cursor、Codex、およびOpenCodeのサポートが強化された。
- **992の内部テスト** — プラグイン、フック、スキル、パッケージング全体にわたる、拡張された検証とリグレッションカバー率。

### v1.6.0 — Codex CLI、AgentShield、マーケットプレイス (2026年2月)

- **Codex CLIサポート** — OpenAI Codex CLI互換のための `codex.md` を生成する新しい `/codex-setup` コマンド。
- **7つの新規スキル** — `search-first`、`swift-actor-persistence`、`swift-protocol-di-testing`、`regex-vs-llm-structured-text`、`content-hash-cache-pattern`、`cost-aware-llm-pipeline`、`skill-stocktake`。
- **AgentShield統合** — Claude CodeからAgentShieldを直接実行する `/security-scan` スキル。1282のテスト、102のルール。
- **GitHub Marketplace** — ECC Tools GitHub Appが無料/Pro/エンタープライズティアを備えて [github.com/marketplace/ecc-tools](https://github.com/marketplace/ecc-tools) でライブ公開。
- **30以上のコミュニティPRがマージ** — 6言語にわたる30人の貢献者からのコントリビューション。
- **978の内部テスト** — エージェント、スキル、コマンド、フック、ルールにわたる拡張検証スイート。

### v1.4.1 — バグ修正 (2026年2月)

- **直感インポートのコンテンツ消失の修正** — `/instinct-import` 実行時に `parse_instinct_file()` がフロントマター以降の全コンテンツ（Action、Evidence、Examplesセクション）を暗黙的にドロップしていた問題を修正した。([#148](https://github.com/affaan-m/everything-claude-code/issues/148), [#161](https://github.com/affaan-m/everything-claude-code/pull/161))

### v1.4.0 — マルチ言語ルール、インストールウィザード、PM2 (2026年2月)

- **インタラクティブインストールウィザード** — マージ/上書き検出を備えたガイド付きセットアップを提供する新しい `configure-ecc` スキル。
- **PM2およびマルチエージェントオーケストレーション** — 複雑なマルチサービスワークフローを管理するための6つの新しいコマンド（`/pm2`、`/multi-plan`、`/multi-execute`、`/multi-backend`、`/multi-frontend`、`/multi-workflow`）。
- **マルチ言語ルールアーキテクチャ** — ルールをフラットファイルから `common/` + `typescript/` + `python/` + `golang/` ディレクトリに再構築。必要な言語のみをインストール。
- **中国語 (zh-CN) 翻訳** — すべてのエージェント、コマンド、スキル、ルール（80ファイル以上）の完全な翻訳。
- **GitHub Sponsorsサポート** — GitHub Sponsors経由でプロジェクトをスポンサー。
- **強化された CONTRIBUTING.md** — 各コントリビューションタイプ向けの詳細なPRテンプレート。

### v1.3.0 — OpenCodeプラグインサポート (2026年2月)

- **完全なOpenCode統合** — 12エージェント、24コマンド、16スキルに、OpenCodeのプラグインシステム（20以上のイベントタイプ）を通じたフックサポートを追加。
- **3つのネイティブカスタムツール** — run-tests、check-coverage、security-audit。
- **LLMドキュメント** — 包括的なOpenCodeドキュメントのための `llms.txt`。

### v1.2.0 — 統合コマンドとスキル (2026年2月)

- **Python/Djangoサポート** — Djangoのパターン、セキュリティ、TDD、検証スキル。
- **Java Spring Bootスキル** — Spring Bootのパターン、セキュリティ、TDD、検証。
- **セッション管理** — セッション履歴のための `/sessions` コマンド。
- **継続的学習 v2** — 確信度スコアリング、インポート/エクスポート、進化を備えた、直感ベースの学習。

完全な変更履歴は[Releases](https://github.com/affaan-m/everything-claude-code/releases)を参照のこと。

---

## Quick Start

2分以内にセットアップして実行する：

### 1つのパスのみを選択すること

ほとんどのClaude Codeユーザーは、厳密に1つのインストールパスを使用するべきである：

- **推奨のデフォルト：** Claude Codeプラグインをインストールし、その後で実際に必要なルールのフォルダのみをコピーする。
- **手動インストーラーを使用するケース：** より細かい制御が必要な場合、プラグインパスを完全に避けたい場合、またはお使いのClaude Codeビルドがセルフホストのマーケットプレイスエントリを解決するのに問題がある場合のみ。
- **インストール方法を重ねないこと。** 最もよくある壊れたセットアップは、最初に `/plugin install` を行い、その後に `./install.sh --profile full` や `npx ecc-install --profile full` を実行することである。

もしすでに複数のインストールを重ねており、重複しているように見える場合は、[ECCのリセット / アンインストール](#reset--uninstall-ecc)へ直行すること。

### ローコンテキスト / フックなしパス

フックがグローバルすぎるように感じる場合、またはECCのルール、エージェント、コマンド、コアワークフロースキルのみが必要な場合は、プラグインをスキップして最小構成の（minimal）手動プロファイルを使用する：

```bash
./install.sh --profile minimal --target claude
```

```powershell
.\install.ps1 --profile minimal --target claude
# または
npx ecc-install --profile minimal --target claude
```

このプロファイルは、意図的に `hooks-runtime` を除外する。

通常のコアプロファイルが必要だが、フックをオフにする必要がある場合は次を使用する：

```bash
./install.sh --profile core --without baseline:hooks --target claude
```

ランタイムでの強制が必要になった場合にのみ、後からフックを追加する：

```bash
./install.sh --target claude --modules hooks-runtime
```

### まず適切なコンポーネントを見つける

どのECCプロファイルまたはコンポーネントをインストールすべきか不明な場合は、任意のプロジェクトからパッケージ化されたアドバイザーに尋ねること：

```bash
npx ecc consult "security reviews" --target claude
```

一致するコンポーネント、関連プロファイル、およびプレビュー/インストールコマンドが返される。正確なファイルプランを検査したい場合は、インストール前にプレビューコマンドを使用すること。

本番環境のML/MLOpsワークフローについては、インストールをオプトインかつコンポーネントスコープに維持すること：

```bash
npx ecc consult "mlops training model deployment" --target claude
npx ecc install --profile minimal --target claude --with capability:machine-learning
```

### Step 1: プラグインのインストール (推奨)

> 注: プラグインは便利だが、お使いのClaude Codeビルドがセルフホストのマーケットプレイスエントリを解決するのに問題がある場合、以下のOSSインストーラーが依然として最も信頼できるパスである。

```bash
# マーケットプレイスの追加
/plugin marketplace add https://github.com/affaan-m/everything-claude-code

# プラグインのインストール
/plugin install ecc@ecc
```

### 名前に関する注記とマイグレーション

ECCには現在3つのパブリックな識別子があり、それらは相互に互換性があるわけではない：

- GitHubソースリポジトリ: `affaan-m/everything-claude-code`
- Claudeマーケットプレイス/プラグイン識別子: `ecc@ecc`
- npmパッケージ: `ecc-universal`

これは意図的である。Anthropicのマーケットプレイス/プラグインのインストールは正規のプラグイン識別子をキーとしているため、ECCは `ecc@ecc` を使用して、厳格なデスクトップ/APIバリデーターのためにツール名とスラッシュコマンドの名前空間を十分に短く保っている。古い投稿には以前の長いマーケットプレイス識別子が表示されているかもしれないが、それは単なるレガシーなエイリアスとして扱うこと。これとは別に、npmパッケージは `ecc-universal` にとどまっており、npmのインストールとマーケットプレイスのインストールは意図的に異なる名前を使用している。

### Step 2: 必要な場合のみルールをインストールする

> 警告: **重要:** Claude Codeのプラグインは `rules` を自動的に配布することができない。
>
> すでに `/plugin install` 経由でECCをインストールした場合、**その後に `./install.sh --profile full`、`.\install.ps1 --profile full`、または `npx ecc-install --profile full` を実行しないこと**。プラグインはすでにECCのスキル、コマンド、およびフックをロードしている。プラグインインストール後にフルインストーラーを実行すると、それらと同じサーフェスがユーザーディレクトリにコピーされ、スキルの重複およびランタイム動作の重複を引き起こす可能性がある。
>
> プラグインインストールの場合は、`~/.claude/rules/ecc/` の下に、必要な `rules/` ディレクトリのみを手動でコピーすること。まずは `rules/common` に加えて、実際に使用している1つの言語またはフレームワークのパックから始める。Claude内にそのすべてのコンテキストを明示的に配置したい場合を除き、すべてのルールディレクトリをコピーしないこと。
>
> プラグインパスではなく、完全に手動でECCをインストールする場合にのみフルインストーラーを使用すること。
>
> ローカルのClaudeセットアップがワイプまたはリセットされたとしても、ECCを再購入する必要があるわけではない。まず `node scripts/ecc.js list-installed` から始め、次に `node scripts/ecc.js doctor` および `node scripts/ecc.js repair` を実行してから、何かを再インストールすること。これにより、通常はセットアップを再構築することなく、ECCが管理するファイルが復元される。問題がECC Toolsの課金/アカウントアクセスに関するものである場合は、課金/アカウントの回復とは別に対応すること。

```bash
# まずリポジトリをクローンする
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code

# 依存関係をインストールする（使用しているパッケージマネージャーを選択）
npm install        # または: pnpm install | yarn install | bun install

# プラグインインストールパス: ECCが所有する名前空間内にECCのルールのみをコピーする
mkdir -p ~/.claude/rules/ecc
cp -R rules/common ~/.claude/rules/ecc/
cp -R rules/typescript ~/.claude/rules/ecc/

# 完全に手動なECCインストールパス (/plugin install の代わりにこれを使用)
# ./install.sh --profile full
```

```powershell
# Windows PowerShell

# プラグインインストールパス: ECCが所有する名前空間内にECCのルールのみをコピーする
New-Item -ItemType Directory -Force -Path "$HOME/.claude/rules/ecc" | Out-Null
Copy-Item -Recurse rules/common "$HOME/.claude/rules/ecc/"
Copy-Item -Recurse rules/typescript "$HOME/.claude/rules/ecc/"

# 完全に手動なECCインストールパス (/plugin install の代わりにこれを使用)
# .\install.ps1 --profile full
# npx ecc-install --profile full
```

手動でのインストール手順については、`rules/` フォルダにある README を参照すること。ルールを手動でコピーする際は、内部のファイルではなく、言語ディレクトリ全体（例えば `rules/common` や `rules/golang`）をコピーし、相対参照が機能し続け、ファイル名が衝突しないようにすること。

### 完全に手動でのインストール (フォールバック)

プラグインパスを意図的にスキップする場合にのみこれを使用すること：

```bash
./install.sh --profile full
```

```powershell
.\install.ps1 --profile full
# または
npx ecc-install --profile full
```

このパスを選択した場合は、そこで停止すること。追加で `/plugin install` を実行しないこと。

### ECCのリセット / アンインストール

もしECCが重複している、出しゃばっている、または壊れていると感じた場合は、自身の上に再インストールし続けないこと。

- **プラグインパス:** Claude Codeからプラグインを削除し、`~/.claude/rules/ecc/` の下に手動でコピーした特定のルールフォルダを削除する。
- **手動インストーラー / CLIパス:** リポジトリルートから、まず削除のプレビューを行う：

```bash
node scripts/uninstall.js --dry-run
```

次にECC管理ファイルを削除する：

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

ECCはインストールステートに記録されているファイルのみを削除する。インストールしていない無関係なファイルを削除することはない。

方法を重ねてしまった場合は、以下の順序でクリーンアップする：

1. Claude Codeのプラグインインストールを削除する。
2. リポジトリルートからECCのアンインストールコマンドを実行し、インストールステート管理ファイルを削除する。
3. 手動でコピーし、もはや不要となった余分なルールフォルダを削除する。
4. 単一のパスを使用して、1回だけ再インストールする。

### Step 3: 使い始める

```bash
# スキルは主要なワークフローサーフェスである。
# ECCが commands/ から移行している間も、既存のスラッシュスタイルのコマンド名は引き続き機能する。

# プラグインインストールでは正規の名前空間付けられた形式を使用する
/ecc:plan "Add user authentication"

# 手動インストールでは短いスラッシュ形式が保持される：
# /plan "Add user authentication"

# 利用可能なコマンドを確認する
/plugin list ecc@ecc
```

**以上である！** これで60エージェント、231スキル、および75のレガシーコマンドシムにアクセスできるようになった。

### ダッシュボード GUI

ECCコンポーネントを視覚的に探索するためにデスクトップダッシュボードを起動する：

```bash
npm run dashboard
# または
python3 ./ecc_dashboard.py
```

**機能:**
- タブ付きインターフェース: Agents, Skills, Commands, Rules, Settings
- ダーク/ライトテーマの切り替え
- フォントのカスタマイズ (フォントファミリーとサイズ)
- ヘッダーとタスクバーにプロジェクトロゴを表示
- すべてのコンポーネントに対する検索とフィルタリング

### マルチモデルコマンドには追加のセットアップが必要

> 警告: `multi-*` コマンドは、上記の基本プラグイン/ルールインストールでは**カバーされていない**。
>
> `/multi-plan`、`/multi-execute`、`/multi-backend`、`/multi-frontend`、および `/multi-workflow` を使用するには、`ccg-workflow` ランタイムもインストールする必要がある。
>
> `npx ccg-workflow` で初期化する。
>
> そのランタイムは、これらのコマンドが想定する外部依存関係を提供する。これには以下が含まれる：
> - `~/.claude/bin/codeagent-wrapper`
> - `~/.claude/.ccg/prompts/*`
>
> `ccg-workflow` がない場合、これらの `multi-*` コマンドは正しく実行されない。

---

## クロスプラットフォームサポート

このプラグインは現在、主要なIDE（Cursor、Zed、OpenCode、Antigravity）およびCLIハーネスとの密接な統合と並行して、**Windows、macOS、およびLinux**を完全にサポートしている。すべてのフックとスクリプトは、最大限の互換性を得るためにNode.jsで書き直された。

### パッケージマネージャーの検出

プラグインは、以下の優先順位でお好みのパッケージマネージャー（npm、pnpm、yarn、またはbun）を自動的に検出する：

1. **環境変数**: `CLAUDE_PACKAGE_MANAGER`
2. **プロジェクト設定**: `.claude/package-manager.json`
3. **package.json**: `packageManager` フィールド
4. **ロックファイル**: package-lock.json、yarn.lock、pnpm-lock.yaml、または bun.lockb からの検出
5. **グローバル設定**: `~/.claude/package-manager.json`
6. **フォールバック**: 最初に利用可能なパッケージマネージャー

好みのパッケージマネージャーを設定するには：

```bash
# 環境変数を使用
export CLAUDE_PACKAGE_MANAGER=pnpm

# グローバル設定を使用
node scripts/setup-package-manager.js --global pnpm

# プロジェクト設定を使用
node scripts/setup-package-manager.js --project bun

# 現在の設定を検出
node scripts/setup-package-manager.js --detect
```

または、Claude Codeで `/setup-pm` コマンドを使用する。

### フックランタイムコントロール

ランタイムフラグを使用して、厳格さを調整したり、特定のフックを一時的に無効にしたりできる：

```bash
# フックの厳格さプロファイル (デフォルト: standard)
export ECC_HOOK_PROFILE=standard

# 無効にするフックIDをカンマ区切りで指定
export ECC_DISABLED_HOOKS="pre:bash:tmux-reminder,post:edit:typecheck"

# SessionStartの追加コンテキストの上限 (デフォルト: 8000文字)
export ECC_SESSION_START_MAX_CHARS=4000

# ローコンテキスト/ローカルモデルセットアップのためにSessionStartの追加コンテキストを完全に無効にする
export ECC_SESSION_START_CONTEXT=off

# コンテキスト/スコープ/ループの警告は維持しつつ、APIレートベースのコスト見積もりを抑制する
export ECC_CONTEXT_MONITOR_COST_WARNINGS=off
```

Windows PowerShell:

```powershell
[Environment]::SetEnvironmentVariable('ECC_CONTEXT_MONITOR_COST_WARNINGS', 'off', 'User')
```

---

## 内容物

このリポジトリは**Claude Codeプラグイン**である - 直接インストールするか、コンポーネントを手動でコピーすること。

```
everything-claude-code/
|-- .claude-plugin/   # プラグインおよびマーケットプレイスのマニフェスト
|   |-- plugin.json         # プラグインのメタデータとコンポーネントパス
|   |-- marketplace.json    # /plugin marketplace add 用のマーケットプレイスカタログ
|
|-- agents/           # 委譲のための60の特化型サブエージェント
|   |-- planner.md           # 機能実装の計画
|   |-- architect.md         # システム設計の決定
|   |-- tdd-guide.md         # テスト駆動開発
|   |-- code-reviewer.md     # 品質とセキュリティのレビュー
|   |-- security-reviewer.md # 脆弱性分析
|   |-- build-error-resolver.md
|   |-- e2e-runner.md        # Playwright E2Eテスト
|   |-- refactor-cleaner.md  # デッドコードのクリーンアップ
|   |-- doc-updater.md       # ドキュメントの同期
|   |-- docs-lookup.md       # ドキュメント/APIの検索
|   |-- chief-of-staff.md    # コミュニケーションのトリアージとドラフト作成
|   |-- loop-operator.md     # 自律ループの実行
|   |-- harness-optimizer.md # ハーネス設定のチューニング
|   |-- cpp-reviewer.md      # C++ コードレビュー
|   |-- cpp-build-resolver.md # C++ ビルドエラー解決
|   |-- fsharp-reviewer.md   # F# 関数型コードのレビュー
|   |-- go-reviewer.md       # Go コードレビュー
|   |-- go-build-resolver.md # Go ビルドエラー解決
|   |-- python-reviewer.md   # Python コードレビュー
|   |-- database-reviewer.md # データベース/Supabaseレビュー
|   |-- typescript-reviewer.md # TypeScript/JavaScript コードレビュー
|   |-- java-reviewer.md     # Java/Spring Boot コードレビュー
|   |-- java-build-resolver.md # Java/Maven/Gradle ビルドエラー
|   |-- kotlin-reviewer.md   # Kotlin/Android/KMP コードレビュー
|   |-- kotlin-build-resolver.md # Kotlin/Gradle ビルドエラー
|   |-- harmonyos-app-resolver.md # HarmonyOS/ArkTS アプリ開発
|   |-- rust-reviewer.md     # Rust コードレビュー
|   |-- rust-build-resolver.md # Rust ビルドエラー解決
|   |-- pytorch-build-resolver.md # PyTorch/CUDA トレーニングエラー
|   |-- mle-reviewer.md      # 本番MLパイプライン、評価、サービング、監視のレビュー
|
|-- skills/           # ワークフロー定義とドメイン知識
|   |-- coding-standards/           # 言語のベストプラクティス
|   |-- clickhouse-io/              # ClickHouse アナリティクス、クエリ、データエンジニアリング
|   |-- backend-patterns/           # API、データベース、キャッシングパターン
|   |-- frontend-patterns/          # React、Next.js パターン
|   |-- frontend-slides/            # HTMLスライドデッキおよびPPTX-to-webプレゼンテーションワークフロー (NEW)
|   |-- article-writing/            # 一般的なAIトーンを排除し、指定された声色での長文執筆 (NEW)
|   |-- content-engine/             # マルチプラットフォーム向けソーシャルコンテンツと再利用ワークフロー (NEW)
|   |-- market-research/            # 情報源が明示された市場、競合、投資家リサーチ (NEW)
|   |-- investor-materials/         # ピッチデッキ、ワンページャー、メモ、財務モデル (NEW)
|   |-- investor-outreach/          # パーソナライズされた資金調達のアウトリーチとフォローアップ (NEW)
|   |-- continuous-learning/        # レガシー v1 Stopフック パターン抽出
|   |-- continuous-learning-v2/     # 確信度スコアリングを備えた直感ベースの学習
|   |-- iterative-retrieval/        # サブエージェントのための段階的なコンテキスト絞り込み
|   |-- strategic-compact/          # 手動コンパクションの提案 (Longform Guide)
|   |-- tdd-workflow/               # TDD 方法論
|   |-- security-review/            # セキュリティチェックリスト
|   |-- eval-harness/               # 検証ループ評価 (Longform Guide)
|   |-- verification-loop/          # 継続的検証 (Longform Guide)
|   |-- videodb/                   # ビデオ・オーディオ: 取り込み、検索、編集、生成、ストリーミング (NEW)
|   |-- golang-patterns/            # Goのイディオムとベストプラクティス
|   |-- golang-testing/             # Goのテストパターン、TDD、ベンチマーク
|   |-- cpp-coding-standards/         # C++ Core Guidelinesに基づくC++コーディング規約 (NEW)
|   |-- cpp-testing/                # GoogleTest、CMake/CTestを用いたC++テスト (NEW)
|   |-- django-patterns/            # Djangoのパターン、モデル、ビュー (NEW)
|   |-- django-security/            # Djangoのセキュリティベストプラクティス (NEW)
|   |-- django-tdd/                 # Django TDDワークフロー (NEW)
|   |-- django-verification/        # Django 検証ループ (NEW)
|   |-- laravel-patterns/           # Laravel アーキテクチャパターン (NEW)
|   |-- laravel-security/           # Laravel セキュリティベストプラクティス (NEW)
|   |-- laravel-tdd/                # Laravel TDDワークフロー (NEW)
|   |-- laravel-verification/       # Laravel 検証ループ (NEW)
|   |-- python-patterns/            # Python イディオムとベストプラクティス (NEW)
|   |-- python-testing/             # pytestを用いたPythonテスト (NEW)
|   |-- quarkus-patterns/            # Java Quarkus パターン (NEW)
|   |-- quarkus-security/            # Quarkus セキュリティ (NEW)
|   |-- quarkus-tdd/                 # Quarkus TDD (NEW)
|   |-- quarkus-verification/        # Quarkus 検証 (NEW)
|   |-- springboot-patterns/        # Java Spring Boot パターン (NEW)
|   |-- springboot-security/        # Spring Boot セキュリティ (NEW)
|   |-- springboot-tdd/             # Spring Boot TDD (NEW)
|   |-- springboot-verification/    # Spring Boot 検証 (NEW)
|   |-- configure-ecc/              # インタラクティブなインストールウィザード (NEW)
|   |-- security-scan/              # AgentShield セキュリティ監査ツールの統合 (NEW)
|   |-- java-coding-standards/     # Java コーディング規約 (NEW)
|   |-- jpa-patterns/              # JPA/Hibernate パターン (NEW)
|   |-- postgres-patterns/         # PostgreSQL 最適化パターン (NEW)
|   |-- nutrient-document-processing/ # Nutrient APIを用いたドキュメント処理 (NEW)
|   |-- docs/examples/project-guidelines-template.md  # プロジェクト固有スキルのテンプレート
|   |-- database-migrations/         # マイグレーションパターン (Prisma, Drizzle, Django, Go) (NEW)
|   |-- api-design/                  # REST API 設計、ページネーション、エラーレスポンス (NEW)
|   |-- deployment-patterns/         # CI/CD、Docker、ヘルスチェック、ロールバック (NEW)
|   |-- docker-patterns/            # Docker Compose、ネットワーキング、ボリューム、コンテナセキュリティ (NEW)
|   |-- e2e-testing/                 # Playwright E2EパターンとPage Object Model (NEW)
|   |-- content-hash-cache-pattern/  # ファイル処理のためのSHA-256コンテンツハッシュキャッシング (NEW)
|   |-- cost-aware-llm-pipeline/     # LLMコスト最適化、モデルルーティング、予算追跡 (NEW)
|   |-- regex-vs-llm-structured-text/ # 意思決定フレームワーク: テキスト解析における正規表現 vs LLM (NEW)
|   |-- swift-actor-persistence/     # アクターを用いたスレッドセーフなSwiftデータ永続化 (NEW)
|   |-- swift-protocol-di-testing/   # テスタブルなSwiftコードのためのプロトコルベースのDI (NEW)
|   |-- search-first/               # コーディング前のリサーチワークフロー (NEW)
|   |-- skill-stocktake/            # 品質のためのスキルとコマンドの監査 (NEW)
|   |-- liquid-glass-design/         # iOS 26 Liquid Glass デザインシステム (NEW)
|   |-- foundation-models-on-device/ # FoundationModelsを用いたAppleのオンデバイスLLM (NEW)
|   |-- swift-concurrency-6-2/       # Swift 6.2 親しみやすい並行処理 (NEW)
|   |-- mle-workflow/               # 本番MLデータコントラクト、評価、デプロイ、監視 (NEW)
|   |-- perl-patterns/             # モダンなPerl 5.36+ イディオムとベストプラクティス (NEW)
|   |-- perl-security/             # Perl セキュリティパターン、テイントモード、安全な I/O (NEW)
|   |-- perl-testing/              # Test2::V0, prove, Devel::Coverを用いたPerl TDD (NEW)
|   |-- autonomous-loops/           # 自律ループパターン: 順次パイプライン、PRループ、DAGオーケストレーション (NEW)
|   |-- plankton-code-quality/      # Planktonフックを用いた書き込み時のコード品質強制 (NEW)
|
|-- commands/         # 維持されているスラッシュエントリの互換性; skills/ を優先すること
|   |-- plan.md             # /plan - 実装計画
|   |-- code-review.md      # /code-review - 品質レビュー
|   |-- build-fix.md        # /build-fix - ビルドエラー修正
|   |-- refactor-clean.md   # /refactor-clean - デッドコード削除
|   |-- quality-gate.md     # /quality-gate - 検証ゲート
|   |-- learn.md            # /learn - セッション途中でのパターン抽出 (Longform Guide)
|   |-- learn-eval.md       # /learn-eval - パターンを抽出、評価、保存する (NEW)
|   |-- checkpoint.md       # /checkpoint - 検証状態を保存 (Longform Guide)
|   |-- setup-pm.md         # /setup-pm - パッケージマネージャーの設定
|   |-- go-review.md        # /go-review - Go コードレビュー (NEW)
|   |-- go-test.md          # /go-test - Go TDDワークフロー (NEW)
|   |-- go-build.md         # /go-build - Go ビルドエラー修正 (NEW)
|   |-- skill-create.md     # /skill-create - Git履歴からスキルを生成 (NEW)
|   |-- instinct-status.md  # /instinct-status - 学習した直感の表示 (NEW)
|   |-- instinct-import.md  # /instinct-import - 直感のインポート (NEW)
|   |-- instinct-export.md  # /instinct-export - 直感のエクスポート (NEW)
|   |-- evolve.md           # /evolve - 直感をスキルにクラスタリング
|   |-- prune.md            # /prune - 期限切れの保留中の直感を削除 (NEW)
|   |-- pm2.md              # /pm2 - PM2 サービスライフサイクル管理 (NEW)
|   |-- multi-plan.md       # /multi-plan - マルチエージェントタスク分解 (NEW)
|   |-- multi-execute.md    # /multi-execute - オーケストレーションされたマルチエージェントワークフロー (NEW)
|   |-- multi-backend.md    # /multi-backend - バックエンド向けマルチサービスオーケストレーション (NEW)
|   |-- multi-frontend.md   # /multi-frontend - フロントエンド向けマルチサービスオーケストレーション (NEW)
|   |-- multi-workflow.md   # /multi-workflow - 一般的なマルチサービスワークフロー (NEW)
|   |-- sessions.md         # /sessions - セッション履歴管理
|   |-- test-coverage.md    # /test-coverage - テストカバレッジ分析
|   |-- update-docs.md      # /update-docs - ドキュメントの更新
|   |-- update-codemaps.md  # /update-codemaps - コードマップの更新
|   |-- python-review.md    # /python-review - Python コードレビュー (NEW)
|-- legacy-command-shims/   # /tdd や /eval などの退役したシムのオプトイン用アーカイブ
|   |-- tdd.md              # /tdd - tdd-workflow スキルを優先すること
|   |-- e2e.md              # /e2e - e2e-testing スキルを優先すること
|   |-- eval.md             # /eval - eval-harness スキルを優先すること
|   |-- verify.md           # /verify - verification-loop スキルを優先すること
|   |-- orchestrate.md      # /orchestrate - dmux-workflows または multi-workflow を優先すること
|
|-- rules/            # 常に従うべきガイドライン (~/.claude/rules/ecc/ へコピー)
|   |-- README.md            # 構造の概要とインストールガイド
|   |-- common/              # 言語に依存しない原則
|   |   |-- coding-style.md    # 不変性、ファイル構成
|   |   |-- git-workflow.md    # コミット形式、PRプロセス
|   |   |-- testing.md         # TDD、80%カバレッジ要件
|   |   |-- performance.md     # モデル選択、コンテキスト管理
|   |   |-- patterns.md        # デザインパターン、スケルトンプロジェクト
|   |   |-- hooks.md           # フックアーキテクチャ、TodoWrite
|   |   |-- agents.md          # サブエージェントへの委譲のタイミング
|   |   |-- security.md        # 必須のセキュリティチェック
|   |-- typescript/          # TypeScript/JavaScript 固有
|   |-- python/              # Python 固有
|   |-- golang/              # Go 固有
|   |-- swift/               # Swift 固有
|   |-- php/                 # PHP 固有 (NEW)
|   |-- arkts/               # HarmonyOS / ArkTS 固有
|
|-- hooks/            # トリガーベースの自動化
|   |-- README.md                 # フックドキュメント、レシピ、カスタマイズガイド
|   |-- hooks.json                # すべてのフック設定 (PreToolUse, PostToolUse, Stop, etc.)
|   |-- memory-persistence/       # セッションライフサイクルフック (Longform Guide)
|   |-- strategic-compact/        # コンパクションの提案 (Longform Guide)
|
|-- scripts/          # クロスプラットフォーム Node.js スクリプト (NEW)
|   |-- lib/                     # 共有ユーティリティ
|   |   |-- utils.js             # クロスプラットフォーム ファイル/パス/システムユーティリティ
|   |   |-- package-manager.js   # パッケージマネージャーの検出と選択
|   |-- hooks/                   # フック実装
|   |   |-- session-start.js     # セッション開始時にコンテキストをロード
|   |   |-- session-end.js       # セッション終了時にステートを保存
|   |   |-- pre-compact.js       # コンパクション前のステート保存
|   |   |-- suggest-compact.js   # 戦略的コンパクションの提案
|   |   |-- evaluate-session.js  # セッションからパターンを抽出
|   |-- setup-package-manager.js # インタラクティブなPMセットアップ
|
|-- tests/            # テストスイート (NEW)
|   |-- lib/                     # ライブラリテスト
|   |-- hooks/                   # フックテスト
|   |-- run-all.js               # すべてのテストを実行
|
|-- contexts/         # 動的なシステムプロンプトインジェクションコンテキスト (Longform Guide)
|   |-- dev.md              # 開発モードコンテキスト
|   |-- review.md           # コードレビューモードコンテキスト
|   |-- research.md         # リサーチ/探索モードコンテキスト
|
|-- examples/         # 設定とセッションの例
|   |-- CLAUDE.md             # プロジェクトレベル設定の例
|   |-- user-CLAUDE.md        # ユーザーレベル設定の例
|   |-- saas-nextjs-CLAUDE.md   # 実際のSaaS (Next.js + Supabase + Stripe)
|   |-- go-microservice-CLAUDE.md # 実際のGoマイクロサービス (gRPC + PostgreSQL)
|   |-- django-api-CLAUDE.md      # 実際のDjango REST API (DRF + Celery)
|   |-- laravel-api-CLAUDE.md     # 実際のLaravel API (PostgreSQL + Redis) (NEW)
|   |-- rust-api-CLAUDE.md        # 実際のRust API (Axum + SQLx + PostgreSQL) (NEW)
|
|-- mcp-configs/      # MCP サーバー設定
|   |-- mcp-servers.json    # GitHub、Supabase、Vercel、Railway など
|
|-- ecc_dashboard.py  # デスクトップ GUI ダッシュボード (Tkinter)
|
|-- assets/           # ダッシュボード用アセット
|   |-- images/
|       |-- ecc-logo.png
|
|-- marketplace.json  # セルフホストのマーケットプレイス設定 (/plugin marketplace add 用)
```

---

## エコシステムツール

### Skill Creator

リポジトリからClaude Codeスキルを生成する2つの方法：

#### オプション A: ローカル分析 (組み込み)

外部サービスなしでローカル分析を行うには、`/skill-create` コマンドを使用する：

```bash
/skill-create                    # 現在のリポジトリを分析する
/skill-create --instincts        # continuous-learning-v2用の直感も生成する
```

これはGitの履歴をローカルで分析し、SKILL.mdファイルを生成する。

#### オプション B: GitHub App (高度)

高度な機能（1万以上のコミット、自動PR、チーム共有）向け：

[GitHub Appをインストール](https://github.com/apps/skill-creator) | [ecc.tools](https://ecc.tools)

```bash
# 任意のイシューにコメントする:
/skill-creator analyze

# または、デフォルトブランチへのプッシュ時に自動トリガー
```

両方のオプションで以下が作成される：
- **SKILL.md ファイル** - Claude Codeですぐに使えるスキル
- **直感コレクション** - continuous-learning-v2用
- **パターン抽出** - コミット履歴から学習する

### AgentShield — セキュリティ監査ツール

> Claude Code Hackathon（Cerebral Valley x Anthropic、2026年2月）で構築された。1282のテスト、98%のカバレッジ、102の静的解析ルール。

Claude Codeの設定で脆弱性、設定ミス、インジェクションリスクをスキャンする。

```bash
# クイックスキャン（インストール不要）
npx ecc-agentshield scan

# 安全な問題を自動修正
npx ecc-agentshield scan --fix

# 3つのOpus 4.6エージェントを使用したディープ分析
npx ecc-agentshield scan --opus --stream

# ゼロから安全な設定を生成
npx ecc-agentshield init
```

**スキャン対象:** 5つのカテゴリ（シークレット検出(14パターン)、権限監査、フックインジェクション分析、MCPサーバーリスクプロファイリング、エージェント設定レビュー）にわたる、CLAUDE.md、settings.json、MCP設定、フック、エージェント定義、およびスキル。

**`--opus` フラグ**は、レッドチーム/ブルーチーム/オーディターのパイプラインで3つのClaude Opus 4.6エージェントを実行する。攻撃者がエクスプロイトチェーンを発見し、防御者が保護を評価し、オーディターが両方を統合して優先順位付けされたリスク評価を作成する。単なるパターンマッチングではなく、敵対的推論を行う。

**出力形式:** ターミナル (A-Fのカラー評価)、JSON (CIパイプライン用)、Markdown、HTML。ビルドゲート用に、重大な発見があった場合は終了コード2を返す。

Claude Codeで実行するには `/security-scan` を使用するか、[GitHub Action](https://github.com/affaan-m/agentshield) でCIに追加すること。

[GitHub](https://github.com/affaan-m/agentshield) | [npm](https://www.npmjs.com/package/ecc-agentshield)

### Continuous Learning v2

直感ベースの学習システムは、パターンを自動的に学習する：

```bash
/instinct-status        # 確信度とともに学習された直感を表示
/instinct-import <file> # 他者から直感をインポート
/instinct-export        # 共有のために直感をエクスポート
/evolve                 # 関連する直感をスキルにクラスタリング
```

完全なドキュメントについては `skills/continuous-learning-v2/` を参照のこと。
レガシーなv1のStopフック学習スキルプロセスを明示的に必要とする場合のみ、`continuous-learning/` を保持すること。

---

## 要件

### Claude Code CLI バージョン

**最小バージョン: v2.1.0 以降**

プラグインシステムにおけるフックの処理方法の変更により、このプラグインには Claude Code CLI v2.1.0+ が必要である。

バージョンを確認する：
```bash
claude --version
```

### 重要: フックの自動ロード動作

> 警告: **コントリビューター向け:** `.claude-plugin/plugin.json` に `"hooks"` フィールドを追加**しないこと**。これはリグレッションテストによって強制されている。

Claude Code v2.1+ は、規則に従ってインストールされたプラグインから `hooks/hooks.json` を**自動的にロードする**。`plugin.json` で明示的に宣言すると、重複検出エラーが発生する：

```
Duplicate hooks file detected: ./hooks/hooks.json resolves to already-loaded file
```

**履歴:** この問題は、本リポジトリで修正とリバートのサイクルを繰り返す原因となった（[#29](https://github.com/affaan-m/everything-claude-code/issues/29)、[#52](https://github.com/affaan-m/everything-claude-code/issues/52)、[#103](https://github.com/affaan-m/everything-claude-code/issues/103)）。Claude Codeのバージョン間で動作が変更されたため、混乱が生じた。現在、この問題が再導入されるのを防ぐためのリグレッションテストが設けられている。

---

## どのエージェントを使うべきか？

どこから始めるべきか分からない場合、このクイックリファレンスを使用すること。スキルが正規のワークフローサーフェスである。維持されているスラッシュエントリは、コマンドファーストなワークフローのために引き続き利用可能である。

| やりたいこと | 使用するサーフェス | 使用されるエージェント |
|--------------|-----------------|------------|
| 新機能の計画 | `/ecc:plan "Add auth"` | planner |
| システムアーキテクチャの設計 | `/ecc:plan` + architect エージェント | architect |
| テストファーストでコードを書く | `tdd-workflow` スキル | tdd-guide |
| 書いたばかりのコードをレビューする | `/code-review` | code-reviewer |
| 失敗しているビルドを修正する | `/build-fix` | build-error-resolver |
| E2Eテストを実行する | `e2e-testing` スキル | e2e-runner |
| セキュリティの脆弱性を見つける | `/security-scan` | security-reviewer |
| デッドコードを削除する | `/refactor-clean` | refactor-cleaner |
| ドキュメントを更新する | `/update-docs` | doc-updater |
| Goコードをレビューする | `/go-review` | go-reviewer |
| Pythonコードをレビューする | `/python-review` | python-reviewer |
| F#コードをレビューする | *(直接 `fsharp-reviewer` を呼び出す)* | fsharp-reviewer |
| TypeScript/JavaScriptコードをレビューする | *(直接 `typescript-reviewer` を呼び出す)* | typescript-reviewer |
| HarmonyOSアプリを開発する | *(直接 `harmonyos-app-resolver` を呼び出す)* | harmonyos-app-resolver |
| データベースクエリを監査する | *(自動委譲される)* | database-reviewer |
| 本番ML変更をレビューする | `mle-workflow` スキル + `mle-reviewer` エージェント | mle-reviewer |

### 一般的なワークフロー

以下のスラッシュ形式は、それらが維持されているコマンドサーフェスの一部として残っている箇所について示されている。`/tdd` や `/eval` のような退役した短い名前のシムは、明示的なオプトイン用に `legacy-command-shims/` に置かれている。

**新機能の開始:**
```
/ecc:plan "Add user authentication with OAuth"
                                              → planner が実装ブループリントを作成
tdd-workflow スキル                            → tdd-guide がテストファーストでの記述を強制
/code-review                                  → code-reviewer が作業をチェック
```

**バグの修正:**
```
tdd-workflow スキル                            → tdd-guide: バグを再現する失敗するテストを書く
                                              → 修正を実装し、テストがパスすることを確認
/code-review                                  → code-reviewer: リグレッションをキャッチ
```

**本番環境への準備:**
```
/security-scan                                → security-reviewer: OWASPトップ10監査
e2e-testing スキル                             → e2e-runner: 重要なユーザーフローテスト
/test-coverage                                → 80%以上のカバレッジを確認
```

---

## FAQ

<details>
<summary><b>どのエージェント/コマンドがインストールされているか確認するには？</b></summary>

```bash
/plugin list ecc@ecc
```

これにより、プラグインから利用可能なすべてのエージェント、コマンド、およびスキルが表示される。
</details>

<details>
<summary><b>フックが機能しない / "Duplicate hooks file" エラーが表示される</b></summary>

これは最も一般的な問題である。**`.claude-plugin/plugin.json` に `"hooks"` フィールドを追加してはならない。** Claude Code v2.1+ は、インストールされたプラグインから `hooks/hooks.json` を自動的にロードする。明示的に宣言すると重複検出エラーが発生する。[#29](https://github.com/affaan-m/everything-claude-code/issues/29)、[#52](https://github.com/affaan-m/everything-claude-code/issues/52)、[#103](https://github.com/affaan-m/everything-claude-code/issues/103) を参照のこと。
</details>

<details>
<summary><b>カスタムAPIエンドポイントやモデルゲートウェイ上のClaude CodeでECCを使用できるか？</b></summary>

可能である。ECCはAnthropicがホストするトランスポート設定をハードコードしていない。Claude Codeの通常のCLI/プラグインサーフェスを通じてローカルで実行されるため、以下で機能する：

- AnthropicがホストするClaude Code
- `ANTHROPIC_BASE_URL` および `ANTHROPIC_AUTH_TOKEN` を使用した公式Claude Codeゲートウェイのセットアップ
- Claude Codeが期待するAnthropic APIと通信する互換性のあるカスタムエンドポイント

最小構成の例：

```bash
export ANTHROPIC_BASE_URL=https://your-gateway.example.com
export ANTHROPIC_AUTH_TOKEN=your-token
claude
```

ゲートウェイがモデル名を再マッピングする場合は、ECCではなくClaude Code側でその設定を行うこと。`claude` CLIが既に機能していれば、ECCのフック、スキル、コマンド、およびルールはモデルプロバイダーに依存しない。

公式リファレンス:
- [Claude Code LLM gateway docs](https://docs.anthropic.com/en/docs/claude-code/llm-gateway)
- [Claude Code model configuration docs](https://docs.anthropic.com/en/docs/claude-code/model-config)

</details>

<details>
<summary><b>コンテキストウィンドウが狭まっている / Claudeがコンテキスト不足になる</b></summary>

多すぎるMCPサーバーはコンテキストを消費する。各MCPツールの説明は200kのウィンドウからトークンを消費し、約70kまで減少させる可能性がある。SessionStartのコンテキストはデフォルトで8000文字に制限されている。ローカルモデルや低コンテキストのセットアップでは、`ECC_SESSION_START_MAX_CHARS=4000` で下げるか、`ECC_SESSION_START_CONTEXT=off` で無効化すること。

**修正方法:** `/mcp` を使用して、Claude Codeから未使用のMCPを無効にする。Claude Codeはそれらのランタイムでの選択を `~/.claude.json` に書き込む。`.claude/settings.json` および `.claude/settings.local.json` は、既にロードされたMCPサーバーに対する信頼できるトグルではない。

有効なMCPは10個未満、アクティブなツールは80個未満に保つこと。
</details>

<details>
<summary><b>一部のコンポーネントのみ（例：エージェントのみ）を使用できるか？</b></summary>

可能である。オプション 2（手動インストール）を使用し、必要なものだけをコピーする：

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
<summary><b>これはCursor / OpenCode / Codex / Antigravity / GitHub Copilotで機能するか？</b></summary>

機能する。ECCはクロスプラットフォームである：
- **Cursor**: `.cursor/` にある事前翻訳された設定。[Cursor IDE Support](#cursor-ide-support)を参照のこと。
- **Gemini CLI**: `.gemini/GEMINI.md` と共有インストーラー基盤を通じた実験的なプロジェクトローカルのサポート。
- **OpenCode**: `.opencode/` での完全なプラグインサポート。[OpenCode Support](#opencode-support)を参照のこと。
- **Codex**: アダプタードリフトガードとSessionStartフォールバックを備えた、macOSアプリおよびCLIの両方に対するファーストクラスサポート。PR [#257](https://github.com/affaan-m/everything-claude-code/pull/257) を参照のこと。
- **GitHub Copilot (VS Code)**: `.github/copilot-instructions.md`、`.vscode/settings.json`、および `.github/prompts/` を通じた命令およびプロンプトレイヤー。[GitHub Copilot Support](#github-copilot-support)を参照のこと。
- **Antigravity**: `.agent/` 内のワークフロー、スキル、およびフラット化されたルールのために密接に統合されたセットアップ。[Antigravity Guide](docs/ANTIGRAVITY-GUIDE.md)を参照のこと。
- **JoyCode / CodeBuddy**: コマンド、エージェント、スキル、およびフラット化されたルール用のプロジェクトローカルの選択的インストールアダプター。[JoyCode Adapter Guide](docs/JOYCODE-GUIDE.md)を参照のこと。
- **Qwen CLI**: コマンド、エージェント、スキル、ルール、およびQwen設定用のホームディレクトリ選択的インストールアダプター。[Qwen CLI Adapter Guide](docs/QWEN-GUIDE.md)を参照のこと。
- **Zed**: `.zed/settings.json`、フラット化されたルール、コマンド、エージェント、およびスキル用のプロジェクトローカル選択的インストールアダプター。
- **非ネイティブハーネス**: Grokおよび同様のインターフェース向けの手動フォールバックパス。[Manual Adaptation Guide](docs/MANUAL-ADAPTATION-GUIDE.md)を参照のこと。
- **Claude Code**: ネイティブ — これがプライマリターゲットである。
</details>

<details>
<summary><b>新しいスキルやエージェントをコントリビュートするにはどうすればよいか？</b></summary>

[CONTRIBUTING.md](CONTRIBUTING.md) を参照のこと。短い手順：
1. リポジトリをフォークする
2. `skills/your-skill-name/SKILL.md`（YAMLフロントマター付き）でスキルを作成する
3. または `agents/your-agent.md` でエージェントを作成する
4. それが何を行うか、およびいつ使用すべきかの明確な説明を含めてPRを提出する
</details>

---

## テストの実行

プラグインには包括的なテストスイートが含まれている：

```bash
# すべてのテストを実行
node tests/run-all.js

# 個別のテストファイルを実行
node tests/lib/utils.test.js
node tests/lib/package-manager.test.js
node tests/hooks/hooks.test.js
```

---

## トークン最適化

Claude Codeの使用は、トークン消費を管理しなければ高額になる可能性がある。以下の設定により、品質を犠牲にすることなくコストを大幅に削減できる。

### 推奨設定

`~/.claude/settings.json` に追加する：

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
| `model` | opus | **sonnet** | 約60%のコスト削減; 80%以上のコーディングタスクを処理可能 |
| `MAX_THINKING_TOKENS` | 31,999 | **10,000** | リクエストあたりの隠れた思考コストを約70%削減 |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | 95 | **50** | より早い段階でコンパクションを行う — 長いセッションでの品質向上 |
| `ECC_CONTEXT_MONITOR_COST_WARNINGS` | on | **サブスクリプションユーザーはoff** | コンテキスト/スコープ/ループの警告は維持しつつ、エージェント向けAPIレート見積もり警告を抑制 |

Opusに切り替えるのは、深いアーキテクチャの推論が必要な場合のみにすること：
```
/model opus
```

### 日常的なワークフローコマンド

| コマンド | 使用するタイミング |
|---------|-------------|
| `/model sonnet` | ほとんどのタスクのデフォルト |
| `/model opus` | 複雑なアーキテクチャ、デバッグ、深い推論 |
| `/clear` | 関連のないタスクの間 (無料、即時リセット) |
| `/compact` | 論理的なタスクの区切り (調査完了、マイルストーン完了) |
| `/cost` | セッション中のトークン消費の監視 |

Claudeサブスクリプションを使用しており、コンテキストモニターのAPIレート見積もりが役立たない場合は、`ECC_CONTEXT_MONITOR_COST_WARNINGS=off` を設定する。これはエージェント向けのコスト警告を抑制するのみであり、コンテキストの枯渇、スコープ、またはループの警告を無効にするものではない。

### 戦略的コンパクション

このプラグインに含まれる `strategic-compact` スキルは、95%コンテキストでの自動コンパクションに依存するのではなく、論理的な区切りで `/compact` を提案する。完全な意思決定ガイドについては `skills/strategic-compact/SKILL.md` を参照のこと。

**コンパクションすべき時:**
- リサーチ/探索の完了後、実装を開始する前
- マイルストーンの完了後、次を開始する前
- デバッグ後、機能作業を続ける前
- 失敗したアプローチの後、新しいアプローチを試す前

**コンパクションすべきでない時:**
- 実装の途中（変数名、ファイルパス、部分的なステートが失われる）

### コンテキストウィンドウの管理

**重要:** すべてのMCPを一度に有効にしないこと。各MCPツールの説明は200kのウィンドウからトークンを消費し、約70kまで減少させる可能性がある。

- 1プロジェクトあたり有効なMCPは10個未満に保つ
- アクティブなツールは80個未満に保つ
- `/mcp` を使用して、Claude Codeから未使用のMCPサーバーを無効にする。これらのランタイムでの選択は `~/.claude.json` に保持される
- `ECC_DISABLED_MCPS` は、インストール/同期フロー中にECC生成のMCP設定をフィルタリングするためだけに使用する

### エージェントチームのコストに関する警告

エージェントチームは複数のコンテキストウィンドウを生成する。各チームメンバーは独立してトークンを消費する。並列化が明確な価値を提供するタスク（マルチモジュール作業、並行レビューなど）にのみ使用すること。単純な順次タスクには、サブエージェントの方がトークン効率が良い。

---

## WARNING: Important Notes

### トークン最適化

一日の上限に達している場合は、推奨設定とワークフローのヒントについて、**[Token Optimization Guide](docs/token-optimization.md)** を参照のこと。

手っ取り早い解決策：

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

関連のないタスクの間には `/clear` を使用し、論理的な区切りでは `/compact`、トークン消費の監視には `/cost` を使用すること。

### カスタマイズ

これらの設定は私のワークフローに合わせて機能する。あなたは以下を行うべきである：
1. 共感できるものから始める
2. 自分のスタックに合わせて変更する
3. 使用しないものは削除する
4. 自身のパターンを追加する

---

## コミュニティプロジェクト

Everything Claude Codeに基づいて構築された、または影響を受けたプロジェクト：

| プロジェクト | 説明 |
|---------|-------------|
| [EVC](https://github.com/SaigonXIII/evc) | マーケティングエージェントワークスペース — コンテンツオペレーター、ブランドガバナンス、マルチチャネルパブリッシング向けの42のコマンド。[視覚的な概要](https://saigonxiii.github.io/evc)。 |
| [trading-skills](https://github.com/VictorVVedtion/trading-skills) | マーケットオペレーターに影響を受けた、取引前レビュープロンプトとリスクゲートを備えた68のトレーディングテーマのClaude Codeスキル。 |

ECCを使って何かを構築した場合は、ここに追加するためのPRをオープンすること。

---

## スポンサー

このプロジェクトは無料でオープンソースである。スポンサーは維持と成長を助ける。

[**スポンサーになる**](https://github.com/sponsors/affaan-m) | [スポンサーティア](SPONSORS.md) | [スポンサーシッププログラム](SPONSORING.md)

---

## スター履歴

[![Star History Chart](https://api.star-history.com/svg?repos=affaan-m/everything-claude-code&type=Date)](https://star-history.com/#affaan-m/everything-claude-code&Date)

---

## リンク

- **Shorthand Guide (ここから始める):** [The Shorthand Guide to Everything Claude Code](https://x.com/affaanmustafa/status/2012378465664745795)
- **Longform Guide (高度):** [The Longform Guide to Everything Claude Code](https://x.com/affaanmustafa/status/2014040193557471352)
- **Security Guide:** [Security Guide](./the-security-guide.md) | [Thread](https://x.com/affaanmustafa/status/2033263813387223421)
- **フォロー:** [@affaanmustafa](https://x.com/affaanmustafa)

---

## ライセンス

MIT - 自由に使用し、必要に応じて変更し、可能であればコントリビュートして還元すること。

---

**このリポジトリが役立ったらスターをつけること。両方のガイドを読むこと。素晴らしいものを構築すること。**
