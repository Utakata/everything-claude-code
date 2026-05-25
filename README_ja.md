
<div align="center">

# Everything Claude Code

**Claude Code、Cursor IDE、Codex CLI、OpenCode、GitHub Copilot向けの本番対応AIコーディングプラグイン。**

[![バージョン](https://img.shields.io/badge/version-2.0.0--rc.1-blue.svg)](CHANGELOG.md)
[![ライセンス: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

**Everything Claude Code (ECC)** は、主要なすべてのAIコーディングツールにおいて、エージェント、コマンド、スキル、および自動化の究極のコレクションである。初期のClaude Codeの設定エコシステムから、複数のIDEとCLIにまたがる共有インテリジェンス・レイヤーへと進化した。

> [!NOTE]
> これはGA(一般提供)前のv2.0.0リリース候補である。GAロードマップについては [ECC-2.0-GA-ROADMAP.md](docs/ECC-2.0-GA-ROADMAP.md) を参照すること。

[English](README.md) | [中文](docs/zh-TW/README.md) | [Русский](docs/ru/README.md) | [Türkçe](docs/tr/README.md) | [Português](docs/pt-BR/README.md) | [Tiếng Việt](docs/vi-VN/README.md) | [ไทย](docs/th/README.md)

## 含まれるもの

- **60種類のエージェント:** 言語に特化したレビュアー、アーキテクト、プランナー
- **231種類のスキル:** コードツアー、パターン、検証ループ、継続的学習
- **75種類のコマンド:** オーケストレーション、リファクタリング、TDDワークフロー
- **フックとルール:** クロスハーネスのオートフォーマット、シークレット検出、型チェック
- **14種類のMCPサーバー設定:** コンテキストを意識したツールの統合

**クロスツールサポート:**
- **Claude Code:** 完全なプラグインサポート(コマンド、エージェント、MCP、フック、スキル)
- **Cursor IDE:** `.cursor/rules` と `hooks.json` によるアダプター層
- **Codex CLI:** `.codex/config.toml` と共有 `AGENTS.md`
- **OpenCode:** `.opencode/opencode.json` ネイティブプラグイン構成
- **GitHub Copilot:** `.github/copilot-instructions.md` とプロンプトタスク

---

## インストール

### 方法1: グローバルインストール (推奨)

このリポジトリをグローバルにクローンし、任意のプロジェクトにリンクさせる。これにより、すべてのプロジェクトで設定の更新が1つの場所で同期される。

```bash
# 1. 任意の場所にクローンする
git clone https://github.com/affaan-m/everything-claude-code.git ~/.everything-claude-code
cd ~/.everything-claude-code

# 2. 依存関係のインストールとリンク
yarn install
npm link
```

### 方法2: 選択的インストール (上級者向け)

プロジェクトに直接特定のコンポーネントのみをインストールする。

```bash
# プラグインのインタラクティブな選択UIを実行する
npx @everything-claude/install
```

> 選択的インストールの詳細なアーキテクチャについては、[Selective Install Architecture](docs/SELECTIVE-INSTALL-ARCHITECTURE.md) を参照すること。

---

## 使い方 (Claude Code)

### 1. プロジェクトへの適用

プロジェクトディレクトリに移動し、スタックに合わせたプロファイルを選択して適用する：

```bash
cd /path/to/your/project
ecc typescript
# または: ecc python, ecc rust, ecc go, ecc java, ecc php
```

これにより、適切なフックとルールが `.claude.json` と `.claude/` ディレクトリに注入される。

### 2. コマンドの実行

Claude Codeを起動してコマンドを使用する：

```bash
claude

# Claude Codeのプロンプト内で：
/plan "認証システムの追加"
/tdd "usersテーブルのマイグレーション作成"
/code-review
```

> [!TIP]
> `ecc` コマンドが見つからない場合は、ローカル実行用に互換性のある代替コマンドとして `npx ecc-install <profile>` を使用できる。

---

## 主な機能

### エージェントオーケストレーション

単一のプロンプトに依存するのではなく、ドメインに特化したエージェントに作業を委譲する。

| エージェント | 目的 | 使用タイミング |
|-------|---------|-------------|
| `planner` | 実装の計画 | 複雑な機能、リファクタリング |
| `architect` | システム設計とスケーラビリティ | アーキテクチャの決定 |
| `tdd-guide` | テスト駆動開発 | 新機能、バグ修正 |
| `code-reviewer`| コード品質と保守性 | コード作成/修正後 |
| `security-reviewer`| 脆弱性検出 | コミット前、機密コード |
| `build-error-resolver`| ビルド/型エラーの修正 | ビルド失敗時 |
| `e2e-runner` | End-to-EndのPlaywrightテスト | 重要なユーザーフロー |
| `refactor-cleaner`| デッドコードのクリーンアップと簡素化 |

### クイックスタート (GitHub Copilot)

ファイルはすでに配置されている。このプロジェクトが含まれるリポジトリを開くと、GitHub Copilot Chatは自動的に `.github/copilot-instructions.md` を読み込む。
コミットされた `.vscode/settings.json` が `chat.promptFiles` を有効にするため、VS Codeは `.github/prompts/` から再利用可能なプロンプトを読み込むことができる。

Copilot Chatでワークフロープロンプトを使用するには：
1. VS CodeでCopilot Chatパネルを開く。
2. **ペーパークリップ / 添付**アイコンをクリックして**Prompt...**を選択するか、`/`と入力してプロンプトを選択する。
3. プロンプトを選択する(例: `plan`、`tdd`、`code-review`)。

### 仕組み

VS CodeのGitHub Copilotは、2種類のファイルを自動的に読み込む：

- **`.github/copilot-instructions.md`** — リポジトリレベルの指示。すべてのCopilot Chatリクエストに常に注入される。ECCのコアコーディング標準、セキュリティチェックリスト、テスト要件、Gitワークフローが含まれている。
- **`.github/prompts/*.prompt.md`** — ユーザーがオンデマンドで呼び出す再利用可能なプロンプトファイル。各プロンプトは、特定のECCワークフロー(plan → TDD → review → ship)を通じてCopilotをガイドする。

**`.vscode/settings.json`** はタスクごとの指示オーバーレイを追加するため、Copilotはコード生成、テスト作成、選択範囲のレビュー、コミットメッセージのドラフト作成など、状況に応じて適切なコンテキストを受け取る。

### 機能カバレッジ

| ECC機能 | Copilotの代替機能 |
|-------------|-------------------|
| コーディング標準 | `copilot-instructions.md` 経由で常時有効 |
| セキュリティチェックリスト | 常時有効 + `security-review` プロンプト |
| テスト / TDD | 常時有効 + `tdd` プロンプト |
| 実装の計画 | `plan` プロンプト |
| コードレビュー | `code-review` プロンプト |
| ビルドエラーの解決 | `build-fix` プロンプト |
| リファクタリング | `refactor` プロンプト |
| コミットメッセージ形式 | `settings.json` のタスクごとの指示 |
| フック / 自動化 | サポートなし (Copilotにはフックシステムがない) |
| エージェント / 委譲 | サポートなし (CopilotにはサブエージェントAPIがない) |

### 制限事項

GitHub CopilotにはフックシステムやサブエージェントAPIがないため、ECCのフックによる自動化(自動フォーマット、TypeScriptチェック、セッションの永続化、開発サーバーガード)やエージェントの委譲は利用できない。しかし、指示とプロンプトのレイヤーにより、標準、セキュリティ、TDD、ワークフローといったECCのコアコーディング哲学はすべてのCopilot Chatセッションに持ち込まれる。

---

## ツール間の機能の同等性

ECCは、**すべての主要なAIコーディングツールを最大限に活用する初めてのプラグイン**である。各ハーネスの比較は以下の通り：

| 機能 | Claude Code | Cursor IDE | Codex CLI | OpenCode | GitHub Copilot |
|---------|------------|------------|-----------|----------|----------------|
| **エージェント** | 60 | 共有 (AGENTS.md) | 共有 (AGENTS.md) | 12 | 該当なし |
| **コマンド** | 75 | 共有 | 指示ベース | 35 | 6プロンプト |
| **スキル** | 231 | 共有 | 10 (ネイティブ形式) | 37 | 指示経由 |
| **フックイベント** | 8種類 | 15種類 | 現在なし | 11種類 | なし |
| **フックスクリプト** | 20+スクリプト | 16スクリプト (DRYアダプター) | 該当なし | プラグインフック | 該当なし |
| **ルール** | 34 (共通 + 言語) | 34 (YAMLフロントマター) | 指示ベース | 13指示 | 1常時有効ファイル |
| **カスタムツール** | フック経由 | フック経由 | 該当なし | 6ネイティブツール | 該当なし |
| **MCPサーバー** | 14 | 共有 (mcp.json) | 7 (TOMLパーサー経由の自動マージ) | 完全 | 該当なし |
| **設定フォーマット** | settings.json | hooks.json + rules/ | config.toml | opencode.json | copilot-instructions.md + settings.json |
| **コンテキストファイル** | CLAUDE.md + AGENTS.md | AGENTS.md | AGENTS.md | AGENTS.md | copilot-instructions.md |
| **シークレット検出** | フックベース | beforeSubmitPrompt フック | サンドボックスベース | フックベース | 指示ベース |
| **自動フォーマット** | PostToolUse フック | afterFileEdit フック | 該当なし | file.edited フック | 該当なし |
| **バージョン** | プラグイン | プラグイン | 参照設定 | 2.0.0-rc.1 | 指示レイヤー |

**重要なアーキテクチャの決定:**
- ルートにある **AGENTS.md** はユニバーサルなクロスツールファイルである(Claude Code、Cursor、Codex、OpenCodeで読み込まれる — GitHub Copilotは代わりに `.github/copilot-instructions.md` を使用する)
- **DRYアダプターパターン**により、Cursorは重複なしにClaude Codeのフックスクリプトを再利用できる
- **スキル形式** (YAMLフロントマター付きのSKILL.md) は、Claude Code、Codex、OpenCode間で機能する
- Codexのフックの欠如は、`AGENTS.md`、オプションの `model_instructions_file` オーバーライド、およびサンドボックス権限によって補われている

---

## 背景

私は実験的展開の段階からClaude Codeを使用してきた。2025年9月のAnthropic x Forum Venturesハッカソンで[@DRodriguezFX](https://x.com/DRodriguezFX)と共に優勝し、完全にClaude Codeを使用して[zenith.chat](https://zenith.chat)を構築した。

これらの設定は、複数の本番アプリケーションにわたって実戦テスト済みである。

---

## トークン最適化

Claude Codeの使用は、トークン消費を管理しないと高額になる可能性がある。これらの設定は、品質を犠牲にすることなくコストを大幅に削減する。

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
| `model` | opus | **sonnet** | 約60%のコスト削減。コーディングタスクの80%以上を処理可能 |
| `MAX_THINKING_TOKENS` | 31,999 | **10,000** | リクエストごとの隠れた思考コストを約70%削減 |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | 95 | **50** | より早期にコンパクションを実施 — 長時間のセッションでの品質向上 |
| `ECC_CONTEXT_MONITOR_COST_WARNINGS` | on | **サブスクリプションユーザーはoff** | コンテキスト/スコープ/ループの警告を維持しつつ、エージェント向けAPIレート見積もりの警告を抑制 |

深いアーキテクチャの推論が必要な場合のみ、Opusに切り替える：
```
/model opus
```

### 日常的なワークフローコマンド

| コマンド | 使用タイミング |
|---------|-------------|
| `/model sonnet` | ほとんどのタスクのデフォルト |
| `/model opus` | 複雑なアーキテクチャ、デバッグ、深い推論 |
| `/clear` | 関連のないタスクの間 (無料、即時リセット) |
| `/compact` | 論理的なタスクの区切り (調査完了、マイルストーン完了) |
| `/cost` | セッション中のトークン消費の監視 |

Claudeのサブスクリプションを使用しており、コンテキストモニターのAPIレート見積もりが役に立たない場合は、`ECC_CONTEXT_MONITOR_COST_WARNINGS=off` に設定する。これによりエージェント向けのコスト警告のみが抑制され、コンテキスト枯渇、スコープ、またはループの警告は無効にならない。

### 戦略的コンパクション

このプラグインに含まれる `strategic-compact` スキルは、95%コンテキストでの自動コンパクションに依存するのではなく、論理的な区切りでの `/compact` を提案する。完全な判断ガイドについては、`skills/strategic-compact/SKILL.md` を参照すること。

**コンパクションすべきタイミング:**
- 調査/探索の後、実装の前
- マイルストーン完了後、次のマイルストーン開始前
- デバッグ後、機能の作業を再開する前
- アプローチが失敗した後、新しいアプローチを試す前

**コンパクションすべきでないタイミング:**
- 実装の途中 (変数名、ファイルパス、部分的な状態が失われるため)

### コンテキストウィンドウの管理

**重要:** すべてのMCPを一度に有効にしないこと。各MCPツールと説明は200kのウィンドウからトークンを消費し、約70kまで減少する可能性がある。

- 1つのプロジェクトで有効にするMCPは10個未満に抑える
- アクティブなツールは80個未満に抑える
- 未使用のClaude Code MCPサーバーを無効にするには `/mcp` を使用する。これらの実行時の選択は `~/.claude.json` に永続化される
- `ECC_DISABLED_MCPS` は、インストール/同期フロー中にECC生成のMCP設定をフィルタリングする場合にのみ使用する

### Agent Teamsのコスト警告

Agent Teamsは複数のコンテキストウィンドウを生成する。各チームメンバーは独立してトークンを消費する。並列処理が明確な価値をもたらすタスク(マルチモジュール作業、並列レビュー)にのみ使用すること。単純な連続タスクの場合、サブエージェントの方がトークン効率が良い。

---

## 警告: 重要な注意事項

### トークン最適化

1日の制限に達した場合は、推奨設定とワークフローのヒントについて、**[トークン最適化ガイド](docs/token-optimization.md)**を参照すること。

クイックウィン：

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

関連のないタスクの間には `/clear` を使用し、論理的な区切りで `/compact` を使用し、消費を監視するために `/cost` を使用する。

### カスタマイズ

これらの設定は私のワークフローに合わせて機能する。あなたは以下を行うべきである：
1. 共感できるものから始める
2. 自身のスタックに合わせて変更する
3. 使用しないものは削除する
4. 独自のパターンを追加する

---

## コミュニティプロジェクト

Everything Claude Codeに基づいて構築された、または影響を受けたプロジェクト：

| プロジェクト | 説明 |
|---------|-------------|
| [EVC](https://github.com/SaigonXIII/evc) | マーケティングエージェントワークスペース — コンテンツオペレーター、ブランドガバナンス、マルチチャネル公開のための42のコマンド。[ビジュアル概要](https://saigonxiii.github.io/evc)。 |
| [trading-skills](https://github.com/VictorVVedtion/trading-skills) | マーケットオペレーターからインスピレーションを得た、取引前レビューのプロンプトとリスクゲートを備えた68の取引テーマのClaude Codeスキル。 |

ECCを使って何かを作った場合は、ここに追加するためのPRを作成すること。

---

## スポンサー

このプロジェクトは無料でオープンソースである。スポンサーは維持と成長を支援する。

[**スポンサーになる**](https://github.com/sponsors/affaan-m) | [スポンサー層](SPONSORS.md) | [スポンサーシッププログラム](SPONSORING.md)

---

## スター履歴

[![Star History Chart](https://api.star-history.com/svg?repos=affaan-m/everything-claude-code&type=Date)](https://star-history.com/#affaan-m/everything-claude-code&Date)

---

## リンク

- **ショートハンドガイド (ここから開始):** [The Shorthand Guide to Everything Claude Code](https://x.com/affaanmustafa/status/2012378465664745795)
- **ロングフォームガイド (上級):** [The Longform Guide to Everything Claude Code](https://x.com/affaanmustafa/status/2014040193557471352)
- **セキュリティガイド:** [Security Guide](./the-security-guide.md) | [Thread](https://x.com/affaanmustafa/status/2033263813387223421)
- **フォローする:** [@affaanmustafa](https://x.com/affaanmustafa)

---

## ライセンス

MIT - 自由に使用し、必要に応じて変更し、可能であれば貢献すること。

---

**これが役に立ったら、このリポジトリにスターを付けてください。両方のガイドを読んでください。素晴らしいものを構築してください。**
