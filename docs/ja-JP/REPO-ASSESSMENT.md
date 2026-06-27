# リポジトリとフォークの評価 + セットアップに関する推奨事項

**日付:** 2026-03-21

---

## 提供されているもの

### リポジトリ: `Infiniteyieldai/everything-claude-code`

これは **`affaan-m/everything-claude-code` のフォーク** です（5万以上のStarと6,000以上のForkを持つアップストリームのプロジェクト）。

| 属性 | 値 |
|-----------|-------|
| Version | 1.9.0 (現在) |
| Status | クリーンなフォーク — アップストリームの `main` から1コミット進んでいます (このセッションで追加された EVALUATION.md ドキュメント) |
| Remote branches | `main`, `claude/evaluate-repo-comparison-ASZ9Y` |
| Upstream sync | 完全に同期されています — 最後にマージされたアップストリームのコミットは zh-CN ドキュメントのPR (#728) です |
| License | MIT |

**これは作業を進めるのに適したリポジトリです。** 分岐やマージコンフリクトのない最新のアップストリームバージョンです。

---

### 現在の `~/.claude/` インストール状況

| コンポーネント | インストール済み | リポジトリで利用可能 |
|-----------|-----------|-------------------|
| Agents | 0 | 28 |
| Skills | 0 | 116 |
| Commands | 0 | 59 |
| Rules | 0 | 60+ ファイル (12言語) |
| Hooks | 1 (git Stop check) | PreToolUse/PostToolUse の完全なマトリックス |
| MCP configs | 0 | 1 (Context7) |

既存の Stop hook (`stop-hook-git-check.sh`) は堅牢です — コミットされていない、またはプッシュされていない作業がある場合、セッションの終了をブロックします。これを保持してください。

---

## インストールプロファイルの推奨事項

リポジトリには5つのインストールプロファイルが用意されています。主なユースケースに基づいて選択してください：

### Profile: `core` (最小実行可能なセットアップ)
> インストールが最も高速です。コマンド、コアとなるエージェント、hooksランタイム、品質ワークフローを取得します。

**最適な用途:** ECCを試してみたい場合、最小限のフットプリント、または制約のある環境。

```bash
node scripts/install-plan.js --profile core
node scripts/install-apply.js
```

**インストールされるもの:** rules-core, agents-core, commands-core, hooks-runtime, platform-configs, workflow-quality

---

### Profile: `developer` (日々の開発作業向けとして推奨)
> ほとんどのECCユーザー向けのデフォルトのエンジニアリングプロファイルです。

**最適な用途:** アプリケーションコードベース全体での一般的なソフトウェア開発。

```bash
node scripts/install-plan.js --profile developer
node scripts/install-apply.js
```

**coreに追加されるもの:** framework-language skills, database patterns, orchestration commands

---

### Profile: `security`
> ベースラインのランタイム + セキュリティ特化のエージェントとルール。

**最適な用途:** セキュリティを重視したワークフロー、コード監査、脆弱性レビュー。

---

### Profile: `research`
> 調査、統合、および公開ワークフロー。

**最適な用途:** コンテンツ作成、投資家向け資料、市場調査、クロスポスト。

---

### Profile: `full`
> すべて — 全18モジュール。

**最適な用途:** 完全なツールキットを必要とするパワーユーザー。

```bash
node scripts/install-plan.js --profile full
node scripts/install-apply.js
```

---

## 優先追加項目 (高価値、低リスク)

プロファイルに関係なく、これらのコンポーネントはすぐに価値を提供します：

### 1. Core Agents (最も高いROI)

| Agent | 重要な理由 |
|-------|----------------|
| `planner.md` | 複雑なタスクを実装計画に分割します |
| `code-reviewer.md` | 品質と保守性のレビュー |
| `tdd-guide.md` | TDD ワークフロー (RED→GREEN→IMPROVE) |
| `security-reviewer.md` | 脆弱性の検出 |
| `architect.md` | システム設計とスケーラビリティの決定 |

### 2. Key Commands

| Command | 重要な理由 |
|---------|----------------|
| `/plan` | コーディング前の実装計画 |
| `/tdd` | テスト駆動型ワークフロー |
| `/code-review` | オンデマンドのレビュー |
| `/build-fix` | ビルドエラーの自動解決 |
| `/learn` | 現在のセッションからのパターンの抽出 |

### 3. Hook Upgrades (`hooks/hooks.json` から)
リポジトリのhookシステムは、現在の単一のStop hookに加えて以下を追加します：

| Hook | Trigger | Value |
|------|---------|-------|
| `block-no-verify` | PreToolUse: Bash | `--no-verify` gitフラグの悪用をブロックします |
| `pre-bash-git-push-reminder` | PreToolUse: Bash | プッシュ前のレビューリマインダー |
| `doc-file-warning` | PreToolUse: Write | 標準外のドキュメントファイルに関する警告 |
| `suggest-compact` | PreToolUse: Edit/Write | 論理的な間隔での圧縮の提案 |
| Continuous learning observer | PreToolUse: * | スキル向上のためのツール使用パターンのキャプチャ |

### 4. Rules (常にオンになっているガイドライン)
`rules/common/` ディレクトリは、すべてのセッションで発動するベースラインのガイドラインを提供します：
- `security.md` — セキュリティのガードレール
- `testing.md` — 80%以上のカバレッジ要件
- `git-workflow.md` — Conventional commits、ブランチ戦略
- `coding-style.md` — 言語横断的なスタイル基準

---

## フォークを使ってすべきこと

### Option A: アップストリームトラッカーとして使用する (現在の状態)
フォークをアップストリームの `affaan-m/everything-claude-code` と同期させたままにします。定期的にアップストリームの変更をマージします：
```bash
git fetch upstream
git merge upstream/main
```
ローカルのクローンからインストールします。これはクリーンで保守性が高いです。

### Option B: フォークをカスタマイズする
個人のスキル、エージェント、またはコマンドをフォークに追加します。以下の用途に適しています：
- ビジネス固有のドメインスキル（あなたの専門分野）
- チーム固有のコーディング規約
- あなたのスタック用のカスタムhooks

フォークにはすでに EVALUATION.md と REPO-ASSESSMENT.md ドキュメントが含まれています — これは作業用フォークとしては問題ありません。

### Option C: npmからインストールする (新しいマシンにとって最もシンプル)
```bash
npx ecc-universal install --profile developer
```
リポジトリをクローンする必要はありません。これはほとんどのユーザーに推奨されるインストール方法です。

---

## 推奨されるセットアップ手順

1. **既存の Stop hook を保持する** — その役割を果たしています
2. **ローカルフォークから developer プロファイルのインストールを実行する**:
   ```bash
   cd /path/to/everything-claude-code
   node scripts/install-plan.js --profile developer
   node scripts/install-apply.js
   ```
3. **主要なスタック用の言語ルールを追加する** (TypeScript, Python, Goなど):
   ```bash
   node scripts/install-plan.js --add rules/typescript
   node scripts/install-apply.js
   ```
4. **リアルタイムのドキュメント検索のために MCP Context7 を有効にする**:
   - `mcp-configs/mcp-servers.json` をプロジェクトの `.claude/` ディレクトリにコピーします
5. **hooks をレビューする** — `hooks/hooks.json` の追加分を選択的に有効にします。まずは `block-no-verify` と `pre-bash-git-push-reminder` から始めます

---

## まとめ

| 質問 | 回答 |
|----------|--------|
| フォークは健全ですか？ | はい — アップストリームの v1.9.0 と完全に同期しています |
| 検討すべき他のフォークはありますか？ | この環境で見えるものはありません；アップストリームの `affaan-m/everything-claude-code` が信頼できる情報源です |
| 最適なインストールプロファイルは？ | 日々の開発作業には `developer` |
| 現在のセットアップで最大のギャップは？ | 0エージェントがインストールされています — 最低限planner、code-reviewer、tdd-guide、security-reviewerを追加してください |
| 最も早い成果は？ | `node scripts/install-plan.js --profile core && node scripts/install-apply.js` を実行する |
