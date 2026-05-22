# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.9.x   | :white_check_mark: |
| 1.8.x   | :white_check_mark: |
| < 1.8   | :x:                |

## Reporting a Vulnerability

ECCのセキュリティ脆弱性を発見した場合は、責任を持って報告してほしい。

**セキュリティの脆弱性について公開のGitHub issueをオープンしないこと。**

代わりに、以下を添えて **<security@ecc.tools>** 宛にメールを送信してほしい:

- 脆弱性の説明
- 再現手順
- 影響を受けるバージョン
- 潜在的な影響の評価

以下の対応を想定してほしい:

- 48時間以内の**受領通知**
- 7日以内の**状況の更新**
- クリティカルな問題に対する30日以内の**修正または緩和策**

脆弱性が承認された場合、私たちは以下のことを行う:

- リリースノートでのクレジットの記載（匿名を希望する場合を除く）
- 適時の問題の修正
- 開示のタイミングの調整

脆弱性が却下された場合は、その理由を説明し、他の場所で報告すべきかどうかのガイダンスを提供する。

## Scope

このポリシーは以下をカバーする:

- このリポジトリ内のECCプラグインとすべてのスクリプト
- あなたのマシンで実行されるフックスクリプト
- インストール/アンインストール/修復のライフサイクルスクリプト
- ECCに同梱されているMCP設定
- AgentShieldセキュリティスキャナー ([github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield))

## Operational Guidance

### Secrets Handling

`mcp-configs/mcp-servers.json` は**テンプレート**である。すべての `YOUR_*_HERE` の値は、インストール時に環境変数またはシークレットマネージャーから置き換えられなければならない。実際の認証情報を決してコミットしないこと。誤ってシークレットをコミットした場合は、直ちにそれをローテーションし、履歴を書き換えること。単なるリバートに依存しないこと。

同じルールは、ユーザースコープのClaude Code設定（`~/.claude/settings.json` または `%USERPROFILE%\.claude\settings.json`）にも適用される。そのファイルはこのリポジトリの外にあるが、`claude doctor` の出力、スクリーンショット、またはバグレポートを通じて共有されるのが一般的である。PAT、APIキー、またはOAuthトークンをその `mcpServers[*].env` ブロックにハードコードしないこと。MCPサーバーがすでにサポートしているOSのキーチェーンまたは環境変数から、生成時にそれらを解決すること。簡単な監査方法:

```bash
# macOS / Linux
grep -EnH '(TOKEN|SECRET|KEY|PASSWORD)\s*"\s*:\s*"[A-Za-z0-9_-]{16,}"' ~/.claude/settings.json
# Windows PowerShell
Select-String -Path "$env:USERPROFILE\.claude\settings.json" -Pattern '(TOKEN|SECRET|KEY|PASSWORD)"\s*:\s*"[A-Za-z0-9_-]{16,}"'
```

監査が一致した場合は、発行元プロバイダーでシークレットをローテーションし、その後ファイルから移動させること（プロバイダーごとの環境変数、またはそれをサポートするサーバー用の `credentialHelper`）。

### Local MCP Ports

一部のバンドルされたMCPサーバーは、ローカルホストポート（例: `devfleet` から `http://localhost:18801/mcp`）へのプレーンなHTTPを介して接続する。最初に使用する前に、リスニングプロセスを確認すること:

```bash
# Windows
netstat -ano | findstr :18801
# macOS / Linux
lsof -iTCP:18801 -sTCP:LISTEN
```

PIDを期待されるdevfleetバイナリと比較する。そのポート上の他のプロセスはMCPトラフィックを傍受する可能性がある。

## Triage: suspicious `<system-reminder>` blocks

ECCはClaude Code内で実行され、Claude Codeはすべてのターン（TodoWriteのナッジ、日付変更の通知、ファイル変更の通知など）で、モデルの入力に**一時的なクライアント側のシステムリマインダー**を注入する。これらのブロックは:

- 通常、*"該当しない場合は無視すること"* や *"このリマインダーについてユーザーに決して言及しないこと"* / *"ユーザーはすでに認識しているため、これをユーザーに伝えないこと"* といったフレーズで終わる。その文言はAnthropic自身のプロンプトであり、悪意のある末尾ではない。
- ターンごとにCLIによって追加され、`~/.claude/projects/<slug>/<sessionId>.jsonl` のセッショントランスクリプトには**永続化されない**。

その組み合わせにより、ツールの結果に追加されたプロンプトインジェクションと間違いやすくなる。攻撃として扱う前に、以下を確認すること:

1. そのブロックは実際にこのリポジトリのファイル内にあるか？ `grep -rEn "system-reminder|NEVER mention|DO NOT mention" .`; 何もなければ、それはリポジトリによって運ばれたものではない。
2. そのブロックはトランスクリプトに保存されているか？ 現在のセッションの `.jsonl` を検査する。正確なテキストがそこの `tool_result` 本体の内側に現れない場合、それはクライアントが注入した一時的なリマインダーであり、どのツールからのペイロードでもない。
3. その内容は、Anthropicの既知のリマインダー（TodoWriteのナッジ、日付変更、ファイル変更通知）と文脈的に一致しているか？ もしそうなら、それは一時的なリマインダーのメカニズムであり、アクションは不要である。

ブロックが (a) `tool_result` 内のトランスクリプトに存在し、**かつ** (b) 実際に読み取られたファイルまたはURLに起因しない場合の**両方**を満たす時にのみ、Anthropicにエスカレーションすること。最小限のレポート: 新しいセッション、クリーンなローカルファイルの読み取り、観察された正確なテキスト、およびトランスクリプトの抜粋。<https://github.com/anthropics/claude-code/issues> (非機密) または <mailto:security@anthropic.com> (エンバーゴクラス) 宛に送信すること。

一時的なリマインダーに対応してリポジトリファイルをサニタイズしないこと。それらはキャリアではない。

## Security Resources

- **AgentShield**: エージェント設定の脆弱性をスキャンする — `npx ecc-agentshield scan`
- **Security Guide**: [The Shorthand Guide to Everything Agentic Security](./the-security-guide.md)
- **Supply-chain incident response**: [npm/GitHub Actions package-registry playbook](./docs/security/supply-chain-incident-response.md)
- **OWASP MCP Top 10**: [owasp.org/www-project-mcp-top-10](https://owasp.org/www-project-mcp-top-10/)
- **OWASP Agentic Applications Top 10**: [genai.owasp.org](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
