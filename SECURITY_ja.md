# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.9.x   | :white_check_mark: |
| 1.8.x   | :white_check_mark: |
| < 1.8   | :x:                |

## Reporting a Vulnerability

ECCにセキュリティ脆弱性を発見した場合は、責任を持って報告してほしい。

**セキュリティ脆弱性について公開のGitHub Issueを作成しないこと。**

代わりに、以下を記載して **<security@ecc.tools>** 宛にメールを送信すること：

- 脆弱性の説明
- 再現手順
- 影響を受けるバージョン
- 潜在的な影響評価

以下の対応を期待できる：

- 48時間以内の**受領確認**
- 7日以内の**ステータス更新**
- 致命的な問題に対する30日以内の**修正または緩和策**

脆弱性が受理された場合、私たちは以下を行う：

- リリースノートでのクレジット表記（匿名を希望する場合を除く）
- 適時な問題の修正
- 開示のタイミングの調整

脆弱性が却下された場合は、その理由を説明し、別の場所に報告すべきかどうかのガイダンスを提供する。

## Scope

このポリシーの対象範囲：

- ECCプラグインおよびこのリポジトリ内のすべてのスクリプト
- ローカルマシンで実行されるhookスクリプト
- インストール/アンインストール/修復のライフサイクルスクリプト
- ECCに同梱されているMCP設定
- AgentShieldセキュリティスキャナー ([github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield))

## Operational Guidance

### Secrets Handling

`mcp-configs/mcp-servers.json` は**テンプレート**である。すべての `YOUR_*_HERE` の値は、インストール時に環境変数またはシークレットマネージャーから置換されなければならない。実際のクレデンシャルを決してコミットしてはならない。シークレットが誤ってコミットされた場合は、直ちにローテーションし、履歴を書き換えること。単なるリバートに依存してはならない。

同じルールがユーザー範囲のClaude Code設定（`~/.claude/settings.json` または `%USERPROFILE%\.claude\settings.json`）にも適用される。そのファイルはこのリポジトリの外部にあるが、`claude doctor` の出力、スクリーンショット、またはバグレポートを介して一般的に共有される。PAT、APIキー、またはOAuthトークンを `mcpServers[*].env` ブロックにハードコーディングしてはならない。MCPサーバーがすでにサポートしているOSのキーチェーンまたは環境変数から、起動時に解決すること。簡単な監査：

```bash
# macOS / Linux
grep -EnH '(TOKEN|SECRET|KEY|PASSWORD)\s*"\s*:\s*"[A-Za-z0-9_-]{16,}"' ~/.claude/settings.json
# Windows PowerShell
Select-String -Path "$env:USERPROFILE\.claude\settings.json" -Pattern '(TOKEN|SECRET|KEY|PASSWORD)"\s*:\s*"[A-Za-z0-9_-]{16,}"'
```

監査が一致した場合、発行元のプロバイダーでシークレットをローテーションし、その後ファイルから移動させること（プロバイダーごとの環境変数、またはサポートしているサーバーの場合は `credentialHelper`）。

### Local MCP Ports

同梱されている一部のMCPサーバーは、localhostポートへのプレーンなHTTPを介して接続する（例: `devfleet` は `http://localhost:18801/mcp`）。初回使用前に、リスニングプロセスを確認すること：

```bash
# Windows
netstat -ano | findstr :18801
# macOS / Linux
lsof -iTCP:18801 -sTCP:LISTEN
```

PIDを期待されるdevfleetバイナリと比較する。そのポートにある他のプロセスは、MCPトラフィックを傍受する可能性がある。

## Triage: suspicious `<system-reminder>` blocks

ECCはClaude Code内で実行され、Claude Codeは毎ターン、モデルの入力に**一時的なクライアント側のシステムリマインダー**（TodoWriteのナッジ、日付変更の通知、ファイル変更の通知など）を注入する。これらのブロックは：

- 通常、*"該当しない場合は無視すること"* や *"このリマインダーをユーザーに決して伝えないこと"* / *"ユーザーはすでに気づいているので、このことをユーザーに伝えないこと"* といった表現で終わる。その言い回しはAnthropic自身のプロンプトであり、悪意のあるテールではない。
- ターンごとにCLIによって追加され、`~/.claude/projects/<slug>/<sessionId>.jsonl` のセッショントランスクリプトには**永続化されない**。

この組み合わせにより、ツール結果に追加されたプロンプトインジェクションと間違いやすくなる。攻撃として扱う前に、以下を確認すること：

1. ブロックは実際にこのリポジトリ配下のファイルにあるか？ `grep -rEn "system-reminder|NEVER mention|DO NOT mention" .`。何もなければ、リポジトリによって運ばれたものではない。
2. ブロックはトランスクリプトに保存されているか？ 現在のセッションの `.jsonl` を検査する。そこにある `tool_result` 本体内に正確なテキストが表示されない場合、それはどのツールからのペイロードでもなく、クライアントによって注入された一時的なリマインダーである。
3. 内容はAnthropicの既知のリマインダー（TodoWriteナッジ、日付変更、ファイル変更通知）と文脈的に一致しているか？ もしそうなら、それは一時的なリマインダーのメカニズムであり、アクションは不要である。

ブロックが (a) トランスクリプトの `tool_result` 内に**存在し**、**かつ** (b) 実際に読み取られたファイルまたはURLに起因しない場合のみ、Anthropicにエスカレーションすること。最小限のレポート：新規セッション、クリーンなローカルファイルの読み取り、観察された正確なテキスト、およびトランスクリプトの抜粋。 <https://github.com/anthropics/claude-code/issues> (機密でない場合) または <mailto:security@anthropic.com> (非公開扱いの場合) に送信する。

一時的なリマインダーに反応してリポジトリファイルをサニタイズしてはならない。それらはキャリアではない。

## Security Resources

- **AgentShield**: エージェント設定の脆弱性をスキャンする — `npx ecc-agentshield scan`
- **Security Guide**: [The Shorthand Guide to Everything Agentic Security](./the-security-guide.md)
- **Supply-chain incident response**: [npm/GitHub Actions package-registry playbook](./docs/security/supply-chain-incident-response.md)
- **OWASP MCP Top 10**: [owasp.org/www-project-mcp-top-10](https://owasp.org/www-project-mcp-top-10/)
- **OWASP Agentic Applications Top 10**: [genai.owasp.org](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
