# セキュリティポリシー (Security Policy)

## サポートされるバージョン (Supported Versions)

| Version | Supported          |
| ------- | ------------------ |
| 1.9.x   | :white_check_mark: |
| 1.8.x   | :white_check_mark: |
| < 1.8   | :x:                |

## 脆弱性の報告 (Reporting a Vulnerability)

ECC にセキュリティの脆弱性を発見した場合は、責任を持って報告すること。

**セキュリティの脆弱性に関して、公開の GitHub Issue を作成してはならない。**

代わりに、以下の情報を含めて **<security@ecc.tools>** 宛てに電子メールを送信すること：

- 脆弱性の説明
- 再現手順
- 影響を受けるバージョン
- 潜在的な影響の評価

以下の対応を期待できる：

- 48時間以内の**受領確認**
- 7日以内の**ステータス更新**
- 重大な問題については、30日以内の**修正または緩和策**

脆弱性が受け入れられた場合、以下の対応を行う：

- リリースノートでのクレジット表記（匿名を希望する場合を除く）
- タイムリーな問題の修正
- 開示タイミングの調整

脆弱性が却下された場合は、その理由を説明し、別の場所で報告すべきかどうかのガイダンスを提供する。

## スコープ (Scope)

このポリシーの対象範囲は以下の通り：

- ECC プラグインおよびこのリポジトリ内のすべてのスクリプト
- ユーザーのマシンで実行されるフックスクリプト
- インストール / アンインストール / 修復のライフサイクルスクリプト
- ECC に同梱されている MCP 設定
- AgentShield セキュリティスキャナー ([github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield))

## 運用ガイダンス (Operational Guidance)

### シークレットの取り扱い (Secrets Handling)

`mcp-configs/mcp-servers.json` は**テンプレート**である。すべての `YOUR_*_HERE` の値は、インストール時に環境変数またはシークレットマネージャーから置き換える必要がある。実際の認証情報をコミットしてはならない。シークレットが誤ってコミットされた場合は、直ちにローテーションし、履歴を書き換えること。単なる revert（元に戻す）操作に依存してはならない。

同じルールは、ユーザースコープの Claude Code 設定 (`~/.claude/settings.json` または `%USERPROFILE%\.claude\settings.json`) にも適用される。このファイルはこのリポジトリの外部にあるが、`claude doctor` の出力、スクリーンショット、またはバグレポートを通じて頻繁に共有される。PAT (Personal Access Token)、API キー、または OAuth トークンを `mcpServers[*].env` ブロックにハードコードしてはならない。MCP サーバーがすでにサポートしている OS のキーチェーンまたは環境変数から、起動時にそれらを解決すること。クイック監査の方法は以下の通り：

```bash
# macOS / Linux
grep -EnH '(TOKEN|SECRET|KEY|PASSWORD)\s*"\s*:\s*"[A-Za-z0-9_-]{16,}"' ~/.claude/settings.json
# Windows PowerShell
Select-String -Path "$env:USERPROFILE\.claude\settings.json" -Pattern '(TOKEN|SECRET|KEY|PASSWORD)"\s*:\s*"[A-Za-z0-9_-]{16,}"'
```

監査に一致した場合、発行元のプロバイダーでシークレットをローテーションし、その後ファイルから移動させること（プロバイダーごとの環境変数、またはサポートしているサーバーの場合は `credentialHelper` を使用する）。

### ローカル MCP ポート (Local MCP Ports)

同梱されている一部の MCP サーバーは、プレーンな HTTP を介して localhost ポートに接続する（例: `devfleet` は `http://localhost:18801/mcp` に接続）。初回使用の前に、リスニングプロセスを確認すること：

```bash
# Windows
netstat -ano | findstr :18801
# macOS / Linux
lsof -iTCP:18801 -sTCP:LISTEN
```

予想される devfleet バイナリの PID と比較すること。そのポート上の他のプロセスは、MCP トラフィックを傍受する可能性がある。

## トリアージ: 疑わしい `<system-reminder>` ブロック (Triage: suspicious `<system-reminder>` blocks)

ECC は Claude Code 内で実行され、Claude Code はターンごとに**一時的なクライアント側のシステムリマインダー**をモデルの入力に挿入する（TodoWrite のナッジ、日付変更の通知、ファイル変更の通知など）。これらのブロックには以下の特徴がある：

- 通常、*"ignore if not applicable"* や *"NEVER mention this reminder to the user"* / *"Don't tell the user this, since they are already aware"* のような表現で終わる。この表現は Anthropic 独自のプロンプトであり、悪意のある末尾ではない。
- ターンごとに CLI によって追加され、`~/.claude/projects/<slug>/<sessionId>.jsonl` のセッショントランスクリプトには**永続化されない**。

この組み合わせにより、ツール結果に付加されたプロンプトインジェクションと誤認されやすくなる。攻撃として扱う前に、以下を確認すること：

1. そのブロックは実際にこのリポジトリ配下のファイルに存在するか？ `grep -rEn "system-reminder|NEVER mention|DO NOT mention" .` を実行し、何も出力されなければ、リポジトリから持ち込まれたものではない。
2. そのブロックはトランスクリプトに保存されているか？ 現在のセッションの `.jsonl` を検査し、正確なテキストがそこの `tool_result` 本体内に表示されていなければ、それはクライアントが挿入した一時的なリマインダーであり、どのツールからのペイロードでもない。
3. コンテンツは Anthropic の既知のリマインダー（TodoWrite のナッジ、日付変更、ファイル変更通知）と文脈的に一致しているか？ 「はい」の場合、それは一時的なリマインダーのメカニズムであり、アクションは不要である。

ブロックが **(a) トランスクリプトの `tool_result` 内に存在し**、**かつ (b) 実際に読み込まれたファイルまたは URL に起因するものではない**場合にのみ、Anthropic にエスカレーションすること。最小限のレポートには、新規セッション、クリーンなローカルファイルの読み取り、観察された正確なテキスト、およびトランスクリプトの抜粋を含める。報告先は <https://github.com/anthropics/claude-code/issues>（非機密情報）または <mailto:security@anthropic.com>（公開制限付きクラス）である。

一時的なリマインダーに対応してリポジトリのファイルをサニタイズしてはならない。これらはキャリア（媒介）ではない。

## セキュリティリソース (Security Resources)

- **AgentShield**: エージェント構成の脆弱性をスキャンする — `npx ecc-agentshield scan`
- **セキュリティガイド (Security Guide)**: [The Shorthand Guide to Everything Agentic Security](./the-security-guide.md)
- **サプライチェーンのインシデント対応 (Supply-chain incident response)**: [npm/GitHub Actions package-registry playbook](./docs/security/supply-chain-incident-response.md)
- **OWASP MCP Top 10**: [owasp.org/www-project-mcp-top-10](https://owasp.org/www-project-mcp-top-10/)
- **OWASP Agentic Applications Top 10**: [genai.owasp.org](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)