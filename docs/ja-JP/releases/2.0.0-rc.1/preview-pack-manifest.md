# ECC v2.0.0-rc.1 プレビューパックマニフェスト

このマニフェストは、`2.0.0-rc.1` のレビュー済みプレビューパックを定義します。これ自体はリリースアクションではありません。GitHub プレリリースの作成、npm の publish、プラグインサーフェスのタグ付け、アナウンスの投稿の前に、公開ローンチサーフェスが組み立てられていることを検証するために使用してください。

## パックの内容

| アーティファクト | 役割 | ゲート |
| --- | --- | --- |
| `README.md` | 公開オンランプとインストールサーフェス | Hermes セットアップ、rc.1 ノート、プラグインインストール、手動インストール、リセット、アンインストールのガイダンスをリンク |
| `docs/HERMES-SETUP.md` | 公開 Hermes オペレータートポロジー | 生のワークスペースエクスポート、認証情報、プライベートアカウント名、ローカル限定のオペレーター状態を含まない |
| `skills/hermes-imports/SKILL.md` | サニタイズ済みの Hermes から ECC へのインポートワークフロー | インポートルール、サニタイズチェックリスト、変換パターン、出力契約を含む |
| `docs/architecture/cross-harness.md` | Claude Code、Codex、OpenCode、Cursor、Gemini、Hermes、ターミナルのみの利用のための共有基盤モデル | ポータビリティの境界を明示し、サポートされていないネイティブパリティを主張しない |
| `docs/architecture/harness-adapter-compliance.md` | アダプターマトリックスとスコアカード | `npm run harness:adapters -- --check` で検証 |
| `docs/architecture/observability-readiness.md` | ローカルのオペレーター準備ゲート | `npm run observability:ready` で検証 |
| `docs/architecture/progress-sync-contract.md` | GitHub、Linear、ハンドオフ、ロードマップ、work-item の同期境界 | `node scripts/platform-audit.js --format json --allow-untracked docs/drafts/` でチェック |
| `scripts/preview-pack-smoke.js` | 決定論的なプレビューパックのスモークゲート | `npm run preview-pack:smoke` で検証 |
| `docs/releases/2.0.0-rc.1/release-notes.md` | GitHub リリースコピーのソース | 公表前に、最終的なライブの release/package/plugin URL でリフレッシュする必要がある |
| `docs/releases/2.0.0-rc.1/quickstart.md` | クローンから最初のワークフローまでのパス | クローン、インストール、検証、最初のスキル、ハーネス切り替えをカバー |
| `docs/releases/2.0.0-rc.1/launch-checklist.md` | オペレーターローンチチェックリスト | release、package、plugin、announcement のアクションについて承認ゲート付きのままにする必要がある |
| `docs/releases/2.0.0-rc.1/publication-readiness.md` | リリースゲート | 正確なリリースコミットからの新鮮なエビデンスが必要 |
| `docs/releases/2.0.0-rc.1/publication-evidence-2026-05-15.md` | 現在の5月15日のキュー、ロードマップ、セキュリティ、サプライチェーンウォッチ、no-lifecycle CI インストールハードニング、AgentShield #86 エビデンスパック来歴、ECC Tools billing ゲート、Actions キャッシュパージ、PR #1941 までの `ecc2` テストエビデンス | 実際の公表前に、最終的なクリーンチェックアウトのエビデンスファイルで置き換える必要がある |
| `docs/releases/2.0.0-rc.1/publication-evidence-2026-05-16.md` | 現在の5月16/17日のキュークリーンアップ、recsys スキルマージ、GateGuard トリアージ、PR #1947 サプライチェーン保護、AgentShield #87 プラグインキャッシュ信頼度エビデンス、AgentShield #88 エビデンスパックの inspect/readback、AgentShield #89 エビデンスパックフリートルーティング、AgentShield #90 フリートレビューアイテム、AgentShield #91 ポリシーエクスポート、AgentShield #92 ポリシー昇格、ECC-Tools #76 フリートサマリー消費、ECC-Tools #77 ホステッド finding エビデンスパス、ECC-Tools #78 ハーネスポリシールートリンク、ダッシュボードリフレッシュ、5月16日ミラーまでの Node/Rust/リリースサーフェスの統合ゲートエビデンス | 実際の公表前に、厳密なクリーンチェックアウトから再実行する必要がある |
| `docs/releases/2.0.0-rc.1/publication-evidence-2026-05-17.md` | 現在の5月17日の queue-zero 状態、日本語ローカライゼーションマージ、Dependabot の TypeScript と Node 型のマージ、マージ後の ja-JP lint 修復、Mini Shai-Hulud/TanStack 保護の再チェック、npm audit/署名チェック、レガシーと Linear 進捗のルーティング、決定論的プレビューパックスモーク、オペレーターダッシュボードリフレッシュ、Linear 同期、`27dc2918` の GitHub CI エビデンス | 現在の最も強力な準備状況スナップショット；実際の公表前に、厳密なクリーンチェックアウトから再実行する必要がある |
| `docs/releases/2.0.0-rc.1/operator-readiness-dashboard-2026-05-17.md` | 現在のプロンプトからアーティファクトへのオペレーターダッシュボード | PR/issue/discussion/platform/supply-chain のゲートが最新であり、公表、プラグイン、billing、AgentShield、ECC Tools、レガシー、Linear プロダクト化のギャップがまだ開いていることを示す |
| `docs/releases/2.0.0-rc.1/naming-and-publication-matrix.md` | ネーミング、スラグ、公表パスの決定記録 | rc.1 では `Everything Claude Code / ECC`、npm `ecc-universal`、プラグインスラグ `ecc` を維持 |
| `docs/releases/2.0.0-rc.1/x-thread.md` | X ローンチ草稿 | release/package/plugin の公開後、プレースホルダーをライブ URL に置き換える必要がある |
| `docs/releases/2.0.0-rc.1/linkedin-post.md` | LinkedIn ローンチ草稿 | release/package/plugin の公開後、プレースホルダーをライブ URL に置き換える必要がある |
| `docs/releases/2.0.0-rc.1/article-outline.md` | ロングフォームローンチアウトライン | GA エビデンスが揃うまでリリース候補のフレーミングを保つ必要がある |
| `docs/releases/2.0.0-rc.1/telegram-handoff.md` | 内部/共有可能なハンドオフコピー | プライベートなワークスペースや認証情報の詳細を含めてはならない |
| `docs/releases/2.0.0-rc.1/demo-prompts.md` | デモプロンプトと proof-of-work プロンプト | プライベートな Hermes ワークフローを公開例に抽象化したまま保つ必要がある |

## Hermes スキルの境界

プレビューパックには、1つの公開 Hermes 専門スキルが含まれています：

- `skills/hermes-imports/SKILL.md`

これは rc.1 では意図的なものです。このスキルはサニタイズと変換のワークフローであり、プライベートな Hermes 自動化のダンプではありません。追加の Hermes 生成スキルは、同じルールに合格した後にのみ ECC に入るべきです：

- 生のワークスペースエクスポートなし；
- ライブアカウント名、クライアントデータ、財務データ、CRM データ、健康データ、
  プライベートな連絡先グラフなし；
- プロバイダー要件はシークレット値ではなくケイパビリティで記述する；
- ローカルの絶対パスではなくリポジトリ相対の例を使う；
- プライベートな状態なしでワークフローが有用であることを証明するテストまたはドキュメント。

## リファレンスに着想を得たアダプターの方向性

プレビューパックは、外部システムをコピーのターゲットではなく、設計上の圧力として使用します：

| リファレンスの圧力 | ECC プレビューパックの解釈 |
| --- | --- |
| Claude Code | ネイティブプラグイン、スキル、コマンド、フック、MCP 規約、ステータスライン指向のワークフロー |
| Codex | インストラクションバックアップのプラグインメタデータ、共有スキル、MCP リファレンス設定、明示的なフックパリティの但し書き |
| OpenCode | エッジで共有フックロジックを持つ、アダプターバックアップの package/plugin サーフェス |
| Zed 近縁ツール | 検証済みのネイティブアダプターが存在するまでは、インストラクションバックアップのポータビリティ |
| dmux | リポジトリ検証の置き換えではなく、セッション/ランタイムのオーケストレーションシグナルとハンドオフエクスポート |
| Orca、Superset、Ghast | ワークツリーのライフサイクル、セッショングルーピング、通知、ワークスペースプリセットのための reference-only な圧力 |
| Hermes Agent、meta-harness、autocontext スタイルのシステム | 公開アーティファクト、検証器の出力、evaluator/RAG プロトタイプを通じてルーティングされる、評価、メモリ、コンテキストルーティングの圧力 |

## 最終検証コマンド

公表前に、正確なリリースコミットからこれらを実行してください：

```bash
git status --short --branch
node scripts/platform-audit.js --format json --allow-untracked docs/drafts/
npm run preview-pack:smoke
npm run harness:adapters -- --check
npm run harness:audit -- --format json
npm run observability:ready
npm run security:ioc-scan
npm audit --audit-level=moderate
npm audit signatures
node tests/docs/ecc2-release-surface.test.js
node tests/run-all.js
cd ecc2 && cargo test
```

## 公表のブロッカー

プレビューパックは組み立てられていますが、これらのライブサーフェスが存在し、最終的なエビデンスファイルに記録されるまで、公表は依然としてブロックされています：

- GitHub プレリリース `v2.0.0-rc.1`；
- `next` dist-tag 上の npm `ecc-universal@2.0.0-rc.1`；
- `ecc@ecc` の Claude プラグインタグ / marketplace 伝播；
- Codex repo-marketplace の配布エビデンスと公式 Plugin Directory の
  可用性ステータス；
- X、LinkedIn、GitHub リリース、ロングフォームコピーの最終アナウンス URL；
- いかなる native-payments のアナウンスコピーが公開される前の、ECC Tools の
  billing/製品準備エビデンス。

## 結果

rc.1 プレビューパックは、最終的なクリーンチェックアウトのリリースゲートの準備は整っていますが、上記の承認ゲート付きの release、package、plugin、announcement のステップなしには、公開の公表の準備は整っていません。
