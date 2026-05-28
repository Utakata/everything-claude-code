# リポジトリとフォークの評価およびセットアップの推奨事項 (Repo & Fork Assessment + Setup Recommendations)

**Date:** 2026-03-21

---

## 利用可能なもの (What's Available)

### リポジトリ (Repo): `Infiniteyieldai/everything-claude-code`

これは **`affaan-m/everything-claude-code` のフォーク** である（アップストリームプロジェクトは 50K 以上のスター、6K 以上のフォークを持つ）。

| Attribute | Value |
|-----------|-------|
| Version | 1.9.0 (current) |
| Status | クリーンなフォーク — アップストリームの `main` より1コミット進んでいる（このセッションで追加された EVALUATION.md ドキュメント） |
| Remote branches | `main`, `claude/evaluate-repo-comparison-ASZ9Y` |
| Upstream sync | 完全に同期済み — 最後にマージされたアップストリームのコミットは zh-CN docs PR (#728) |
| License | MIT |

**これは作業するのに適したリポジトリである。** 分岐やマージの競合がない最新のアップストリームバージョンである。

---

### 現在の `~/.claude/` のインストール状況 (Current Installation)

| Component | Installed | Available in Repo |
|-----------|-----------|-------------------|
| Agents | 0 | 28 |
| Skills | 0 | 116 |
| Commands | 0 | 59 |
| Rules | 0 | 60以上のファイル (12言語) |
| Hooks | 1 (git Stop check) | PreToolUse/PostToolUse の完全なマトリックス |
| MCP configs | 0 | 1 (Context7) |

既存の Stop フック (`stop-hook-git-check.sh`) は堅牢であり、コミットされていない/プッシュされていない作業がある場合、セッションの終了をブロックする。これは維持すべきである。

---

## インストールプロファイルの推奨事項 (Install Profile Recommendations)

リポジトリには5つのインストールプロファイルが用意されている。主なユースケースに基づいて選択すること:

### プロファイル: `core` (Minimum viable setup)
> インストールが最も速い。コマンド、コアエージェント、フックのランタイム、および品質ワークフローを取得できる。

**最適:** ECC の試用、最小限のフットプリント、または制約のある環境。

```bash
node scripts/install-plan.js --profile core
node scripts/install-apply.js
```

**インストールされるもの:** rules-core, agents-core, commands-core, hooks-runtime, platform-configs, workflow-quality

---

### プロファイル: `developer` (日常の開発作業に推奨)
> ほとんどの ECC ユーザーにとってのデフォルトのエンジニアリングプロファイル。

**最適:** アプリケーションコードベース全体での一般的なソフトウェア開発。

```bash
node scripts/install-plan.js --profile developer
node scripts/install-apply.js
```

**coreに加えて追加されるもの:** framework-language skills, database patterns, orchestration commands

---

### プロファイル: `security`
> ベースラインランタイム + セキュリティ固有のエージェントとルール。

**最適:** セキュリティ重視のワークフロー、コード監査、脆弱性レビュー。

---

### プロファイル: `research`
> 調査、統合、および公開ワークフロー。

**最適:** コンテンツ作成、投資家向け資料、市場調査、クロスポスティング。

---

### プロファイル: `full`
> すべて — 全18モジュール。

**最適:** 完全なツールキットを必要とするパワーユーザー。

```bash
node scripts/install-plan.js --profile full
node scripts/install-apply.js
```

---

## 優先的に追加すべきもの (Priority Additions - High Value, Low Risk)

プロファイルに関係なく、以下のコンポーネントは即座に価値を提供する:

### 1. コアエージェント (Core Agents - highest ROI)

| Agent | Why it matters |
|-------|----------------|
| `planner.md` | 複雑なタスクを実装計画に分解する |
| `code-reviewer.md` | 品質と保守性のレビュー |
| `tdd-guide.md` | TDD ワークフロー (RED→GREEN→IMPROVE) |
| `security-reviewer.md` | 脆弱性の検出 |
| `architect.md` | システム設計とスケーラビリティの決定 |

### 2. 主要コマンド (Key Commands)

| Command | Why it matters |
|---------|----------------|
| `/plan` | コーディング前の実装計画 |
| `/tdd` | テスト駆動ワークフロー |
| `/code-review` | オンデマンドのレビュー |
| `/build-fix` | 自動化されたビルドエラー解決 |
| `/learn` | 現在のセッションからパターンを抽出 |

### 3. フックのアップグレード (Hook Upgrades from `hooks/hooks.json`)
リポジトリのフックシステムは、現在の単一の Stop フックに加えて以下の機能を追加する:

| Hook | Trigger | Value |
|------|---------|-------|
| `block-no-verify` | PreToolUse: Bash | `--no-verify` git フラグの悪用をブロックする |
| `pre-bash-git-push-reminder` | PreToolUse: Bash | プッシュ前のレビューリマインダー |
| `doc-file-warning` | PreToolUse: Write | 非標準のドキュメントファイルに関する警告 |
| `suggest-compact` | PreToolUse: Edit/Write | 論理的な間隔でのコンパクション（整理）を提案する |
| 継続的学習オブザーバー | PreToolUse: * | スキル向上のためのツール使用パターンのキャプチャ |

### 4. ルール (Rules - Always-on guidelines)
`rules/common/` ディレクトリは、すべてのセッションで発火するベースラインガイドラインを提供する:
- `security.md` — セキュリティのガードレール
- `testing.md` — 80% 以上のカバレッジ要件
- `git-workflow.md` — Conventional commits、ブランチ戦略
- `coding-style.md` — 言語横断的なスタイル基準

---

## フォークの扱い方 (What to Do With the Fork)

### オプション A: アップストリームトラッカーとして使用する (現状維持)
フォークを `affaan-m/everything-claude-code` のアップストリームと同期し続ける。定期的にアップストリームの変更をマージする:
```bash
git fetch upstream
git merge upstream/main
```
ローカルクローンからインストールする。これはクリーンで保守性が高い。

### オプション B: フォークをカスタマイズする
個人的なスキル、エージェント、またはコマンドをフォークに追加する。以下の場合に適している:
- ビジネス固有のドメインスキル（あなたの業界向け）
- チーム固有のコーディング規約
- スタック向けのカスタムフック

フォークには既に EVALUATION.md と REPO-ASSESSMENT.md のドキュメントがあるが、作業用フォークとしては問題ない。

### オプション C: npm からインストールする (新規マシンで最も簡単)
```bash
npx ecc-universal install --profile developer
```
リポジトリをクローンする必要はない。これはほとんどのユーザーに推奨されるインストール方法である。

---

## 推奨されるセットアップ手順 (Recommended Setup Steps)

1. **既存の Stop フックを維持する** — それは役割を果たしている
2. **ローカルフォークから `developer` プロファイルのインストールを実行する**:
   ```bash
   cd /path/to/everything-claude-code
   node scripts/install-plan.js --profile developer
   node scripts/install-apply.js
   ```
3. **主要なスタック（TypeScript、Python、Goなど）向けの言語ルールを追加する**:
   ```bash
   node scripts/install-plan.js --add rules/typescript
   node scripts/install-apply.js
   ```
4. **ライブドキュメント検索のために MCP Context7 を有効にする**:
   - `mcp-configs/mcp-servers.json` をプロジェクトの `.claude/` ディレクトリにコピーする
5. **フックを確認する** — `block-no-verify` と `pre-bash-git-push-reminder` から始めて、`hooks/hooks.json` の追加機能を段階的に有効にする

---

## まとめ (Summary)

| Question | Answer |
|----------|--------|
| フォークは健全か？ (Is the fork healthy?) | はい — アップストリームの v1.9.0 と完全に同期されている |
| 検討すべき他のフォークは？ (Other forks to consider?) | この環境では見当たらない。アップストリームの `affaan-m/everything-claude-code` が情報源 (source of truth) である |
| 最適なインストールプロファイルは？ (Best install profile?) | 日々の開発作業には `developer` |
| 現在の設定の最大のギャップは？ (Biggest gap in current setup?) | エージェントが0個 — 少なくとも planner, code-reviewer, tdd-guide, security-reviewer を追加すること |
| 最も手っ取り早い成果は？ (Quickest win?) | `node scripts/install-plan.js --profile core && node scripts/install-apply.js` を実行する |
