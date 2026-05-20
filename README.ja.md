**Language:** English | [Português (Brasil)](docs/pt-BR/README.md) | [简体中文](README.zh-CN.md) | [繁體中文](docs/zh-TW/README.md) | [日本語](docs/ja-JP/README.md) | [한국어](docs/ko-KR/README.md) | [Türkçe](docs/tr/README.md) | [Русский](docs/ru/README.md) | [Tiếng Việt](docs/vi-VN/README.md) | [ไทย](docs/th/README.md)

# Everything Claude Code (ECC)

![Everything Claude Code — the performance system for AI agent harnesses](assets/hero.png)

[![Stars](https://img.shields.io/github/stars/affaan-m/everything-claude-code?style=flat)](https://github.com/affaan-m/everything-claude-code/stargazers)
[![Forks](https://img.shields.io/github/forks/affaan-m/everything-claude-code?style=flat)](https://github.com/affaan-m/everything-claude-code/network/members)
[![Contributors](https://img.shields.io/github/contributors/affaan-m/everything-claude-code?style=flat)](https://github.com/affaan-m/everything-claude-code/graphs/contributors)
[![npm ecc-universal](https://img.shields.io/npm/dw/ecc-universal?label=ecc-universal%20weekly%20downloads&logo=npm)](https://www.npmjs.com/package/ecc-universal)
[![npm ecc-agentshield](https://img.shields.io/npm/dw/ecc-agentshield?label=ecc-agentshield%20weekly%20downloads&logo=npm)](https://www.npmjs.com/package/ecc-agentshield)
[![GitHub App Install](https://img.shields.io/badge/GitHub%20App-150%20installs-2ea44f?logo=github)](https://github.com/marketplace/ecc-tools)
[![ライセンス](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
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

[**English**](README.md) | [Português (Brasil)](docs/pt-BR/README.md) | [简体中文](README.zh-CN.md) | [繁體中文](docs/zh-TW/README.md) | [日本語](docs/ja-JP/README.md) | [한국어](docs/ko-KR/README.md) | [Türkçe](docs/tr/README.md) | [Русский](docs/ru/README.md) | [Tiếng Việt](docs/vi-VN/README.md) | [ไทย](docs/th/README.md)

</div>

---

**Claude Code、Cursor、OpenCode、および Codex のための欠けている標準ライブラリ。**

Everything Claude Code (ECC) は、本番環境で利用可能な AI コーディングプラグインのエコシステムである。特化した agents、skills、commands、および rules を提供し、Claude Code、Cursor、OpenCode、および Codex app/CLI 内で安全に実行される移植可能な git harness としてパッケージ化されている。

このリポジトリは、脆弱なグローバルシステムプロンプトに依存することなく、確立されたソフトウェアエンジニアリングのプラクティス、テストのガードレール、およびプロジェクト固有の知識を使用して、AI コーディングアシスタントを強化するためのモジュール式で言語に依存しない方法を提供する。

---

## The Guides (ガイド)

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
<td align="center"><b>Shorthand Guide</b><br/>セットアップ、基礎、哲学。<b>まずこれを読むこと。</b></td>
<td align="center"><b>Longform Guide</b><br/>トークン最適化、メモリ永続化、評価、並列化。</td>
<td align="center"><b>Security Guide</b><br/>攻撃ベクトル、サンドボックス化、サニタイズ、CVE、AgentShield。</td>
</tr>
</table>

| Topic | What You'll Learn |
|-------|-------------------|
| Token Optimization | モデルの選択、システムプロンプトの軽量化、バックグラウンドプロセス |
| Memory Persistence | セッション間で自動的にコンテキストを保存/ロードする hook |
| Continuous Learning | セッションからパターンを自動抽出し、再利用可能な skills にする |
| Verification Loops | チェックポイントと継続的評価、グレーダーの種類、pass@k metrics |
| Parallelization | Git worktrees、カスケードメソッド、インスタンスをスケールするタイミング |
| Subagent Orchestration | コンテキスト問題、反復的検索パターン |

---

## What's New (新機能)

### v2.0.0-rc.1 — Surface Refresh, Operator Workflows, and ECC 2.0 Alpha (2026年4月)

- **Dashboard GUI** — ダーク/ライトのテーマ切り替え、フォントのカスタマイズ、およびヘッダーとタスクバーのプロジェクトロゴを備えた、新しい Tkinter ベースのデスクトップアプリケーション（`ecc_dashboard.py` または `npm run dashboard`）。
- **Public surface synced to the live repo** — メタデータ、カタログカウント、プラグインマニフェスト、およびインストール向けドキュメントが、実際の OSS サーフェスと一致するようになった：60の agents、231の skills、および75のレガシー command シム。
- **Operator and outbound workflow expansion** — `brand-voice`、`social-graph-ranker`、`connections-optimizer`、`customer-billing-ops`、`ecc-tools-cost-audit`、`google-workspace-ops`、`project-flow-ops`、および `workspace-surface-audit` がオペレーターレーンを構成する。
- **Media and launch tooling** — `manim-video`、`remotion-video-creation`、およびアップグレードされたソーシャルパブリッシングサーフェスにより、技術的な説明やローンチコンテンツが同じシステムの一部となる。
- **Framework and product surface growth** — `nestjs-patterns`、より豊富な Codex/OpenCode インストールサーフェス、および拡張されたクロスハーネスパッケージングにより、リポジトリが Claude Code 単体を超えて使用可能に保たれる。
- **ECC 2.0 alpha is in-tree** — `ecc2/` にある Rust コントロールプレーンプロトタイプがローカルでビルドされ、`dashboard`、`start`、`sessions`、`status`、`stop`、`resume`、および `daemon` コマンドを公開するようになった。アルファ版として使用可能であるが、まだ一般向けリリースではない。
- **Operator status snapshots** — `ecc status --markdown --write status.md` は、ローカルのステートストアを、準備状況、アクティブなセッション、skill 実行のヘルス、インストールのヘルス、保留中のガバナンスイベント、および Linear/GitHub/handoffs からのリンクされたワークアイテムをカバーするポータブルなハンドオフに変換する。手動入力には `ecc work-items upsert ...`、PR/issue キューのステートには `ecc work-items sync-github --repo owner/repo` を使用し、準備状況の確認が必要な場合に自動化を失敗させるには `ecc status --exit-code` を使用すること。
- **Ecosystem hardening** — AgentShield、ECC Tools コストコントロール、請求ポータルの作業、および Web サイトの更新が、別々のサイロにドリフトすることなく、コアプラグインの周囲で引き続き出荷される。

### v1.9.0 — Selective Install & Language Expansion (2026年3月)

- **Selective install architecture** — ターゲットコンポーネントをインストールするための `install-plan.js` および `install-apply.js` を備えたマニフェスト駆動のインストールパイプライン。ステートストアがインストールされているものを追跡し、差分更新を可能にする。
- **6 new agents** — `typescript-reviewer`、`pytorch-build-resolver`、`java-build-resolver`、`java-reviewer`、`kotlin-reviewer`、`kotlin-build-resolver` により、言語カバレッジが10言語に拡大。
- **New skills** — ディープラーニングワークフロー向けの `pytorch-patterns`、API リファレンス調査向けの `documentation-lookup`、モダン JS ツールチェーン向けの `bun-runtime` と `nextjs-turbopack`、さらに8つの運用ドメイン skills と `mcp-server-patterns`。
- **Session & state infrastructure** — クエリ CLI を備えた SQLite ステートストア、構造化された記録のためのセッションアダプター、自己改善 skills のための skill 進化の基盤。
- **Orchestration overhaul** — Harness の監査スコアリングが決定論的になり、オーケストレーションのステータスとランチャーの互換性が強化され、5層のガードによるオブザーバーループ防止が行われた。
- **Observer reliability** — スロットリングとテールサンプリングによるメモリ爆発の修正、サンドボックスアクセスの修正、遅延開始ロジック、および再入可能ガード。
- **12 language ecosystems** — 既存の TypeScript、Python、Go、および共通のルールに加えて、Java、PHP、Perl、Kotlin/Android/KMP、C++、および Rust の新しいルールが追加された。
- **Community contributions** — 韓国語および中国語の翻訳、biome hook の最適化、ビデオ処理 skills、運用 skills、PowerShell インストーラー、Antigravity IDE サポート。
- **CI hardening** — 19のテスト失敗の修正、カタログカウントの強制、インストールマニフェストの検証、および完全なテストスイートのパス。

### v1.8.0 — Harness Performance System (2026年3月)

- **Harness-first release** — ECC は、単なる config パックではなく、agent harness performance system として明示的にフレーム化されるようになった。
- **Hook reliability overhaul** — SessionStart ルートのフォールバック、Stop フェーズのセッションサマリー、および壊れやすいインラインのワンライナーを置き換えるスクリプトベースの hooks。
- **Hook runtime controls** — hook ファイルを編集せずに実行時にゲートするための `ECC_HOOK_PROFILE=minimal|standard|strict` および `ECC_DISABLED_HOOKS=...`。
- **New harness commands** — `/harness-audit`、`/loop-start`、`/loop-status`、`/quality-gate`、`/model-route`。
- **NanoClaw v2** — モデルルーティング、skill ホットロード、セッション branch/search/export/compact/metrics。
- **Cross-harness parity** — Claude Code、Cursor、OpenCode、および Codex app/CLI 間の動作が厳格化された。
- **997 internal tests passing** — hook/ランタイムのリファクタリングと互換性の更新後、完全なスイートがパスした。

### v1.7.0 — Cross-Platform Expansion & Presentation Builder (2026年2月)

- **Codex app + CLI support** — 直接の `AGENTS.md` ベースの Codex サポート、インストーラーターゲティング、および Codex ドキュメント。
- **`frontend-slides` skill** — PPTX 変換ガイダンスと厳格な viewport-fit ルールを備えた、依存関係のない HTML プレゼンテーションビルダー。
- **5 new generic business/content skills** — `article-writing`、`content-engine`、`market-research`、`investor-materials`、`investor-outreach`。
- **Broader tool coverage** — Cursor、Codex、および OpenCode のサポートが厳格化され、同じリポジトリがすべての主要な harnesses でクリーンに機能するようになった。
- **992 internal tests** — プラグイン、hooks、skills、およびパッケージング全体で検証とリグレッションカバレッジが拡大。

### v1.6.0 — Codex CLI, AgentShield & Marketplace (2026年2月)

- **Codex CLI support** — 新しい `/codex-setup` command は、OpenAI Codex CLI 互換性のための `codex.md` を生成する。
- **7 new skills** — `search-first`、`swift-actor-persistence`、`swift-protocol-di-testing`、`regex-vs-llm-structured-text`、`content-hash-cache-pattern`、`cost-aware-llm-pipeline`、`skill-stocktake`。
- **AgentShield integration** — `/security-scan` skill は、Claude Code から直接 AgentShield を実行する；1282のテスト、102のルール。
- **GitHub Marketplace** — ECC Tools GitHub App が [github.com/marketplace/ecc-tools](https://github.com/marketplace/ecc-tools) で公開され、free/pro/enterprise tier が利用可能。
- **30+ community PRs merged** — 6言語にわたる30人のコントリビューターからの貢献。
- **978 internal tests** — agents、skills、commands、hooks、および rules 全体にわたる検証スイートの拡大。

### v1.4.1 — Bug Fix (2026年2月)

- **Fixed instinct import content loss** — `/instinct-import` 中に `parse_instinct_file()` がフロントマターの後のすべてのコンテンツ（Action, Evidence, Examples セクション）を暗黙のうちにドロップしていた問題を修正。([#148](https://github.com/affaan-m/everything-claude-code/issues/148), [#161](https://github.com/affaan-m/everything-claude-code/pull/161))

### v1.4.0 — Multi-Language Rules, Installation Wizard & PM2 (2026年2月)

- **Interactive installation wizard** — 新しい `configure-ecc` skill は、マージ/上書きの検出を備えたガイド付きセットアップを提供する。
- **PM2 & multi-agent orchestration** — 複雑なマルチサービスワークフローを管理するための6つの新しい commands（`/pm2`、`/multi-plan`、`/multi-execute`、`/multi-backend`、`/multi-frontend`、`/multi-workflow`）。
- **Multi-language rules architecture** — フラットなファイルから `common/` + `typescript/` + `python/` + `golang/` ディレクトリにルールを再構築。必要な言語のみをインストール可能。
- **Chinese (zh-CN) translations** — すべての agents、commands、skills、および rules（80以上のファイル）の完全な翻訳。
- **GitHub Sponsors support** — GitHub Sponsors 経由でのプロジェクト支援。
- **Enhanced CONTRIBUTING.md** — コントリビューションの種類ごとの詳細な PR テンプレート。

### v1.3.0 — OpenCode Plugin Support (2026年2月)

- **Full OpenCode integration** — OpenCode のプラグインシステムを介した hook サポート（20以上のイベントタイプ）を備えた、12の agents、24の commands、16の skills。
- **3 native custom tools** — run-tests、check-coverage、security-audit。
- **LLM documentation** — 包括的な OpenCode ドキュメントのための `llms.txt`。

### v1.2.0 — Unified Commands & Skills (2026年2月)

- **Python/Django support** — Django の patterns、security、TDD、および検証 skills。
- **Java Spring Boot skills** — Spring Boot の patterns、security、TDD、および検証。
- **Session management** — セッション履歴のための `/sessions` command。
- **Continuous learning v2** — 信頼度スコアリング、インポート/エクスポート、進化を備えた instinct ベースの学習。

完全な changelog は [Releases](https://github.com/affaan-m/everything-claude-code/releases) を参照すること。
