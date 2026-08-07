# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.9.x   | :white_check_mark: |
| 1.8.x   | :white_check_mark: |
| < 1.8   | :x:                |

## Reporting a Vulnerability

ECCにセキュリティの脆弱性を発見した場合は、責任を持って報告すること。

**セキュリティ脆弱性について公開のGitHub issueを開かないこと。**

代わりに、以下を含めて **<security@ecc.tools>** にメールを送信すること：

- 脆弱性の説明
- 再現手順
- 影響を受けるバージョン
- 潜在的な影響評価

以下の対応を想定すること：

- 48時間以内の**受領確認**
- 7日以内の**ステータス更新**
- 致命的な問題に対する30日以内の**修正または緩和策**

脆弱性が承認された場合、以下を行う：

- （匿名を希望しない限り）リリースノートにクレジットを記載する
- タイムリーに問題を修正する
- 情報公開のタイミングを調整する

脆弱性が却下された場合は、その理由を説明し、別の場所に報告すべきかどうかのガイダンスを提供する。

## Scope

このポリシーの適用範囲：

- ECCプラグインおよびこのリポジトリ内のすべてのスクリプト
- ローカルマシンで実行されるフックスクリプト
- インストール/アンインストール/修復のライフサイクルスクリプト
- ECCに同梱されているMCP構成
- AgentShieldセキュリティスキャナー ([github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield))

## Operational Guidance

### Secrets Handling

`mcp-configs/mcp-servers.json` は**テンプレート**である。すべての `YOUR_*_HERE` の値は、インストール時に環境変数またはシークレットマネージャーから置き換える必要がある。実際の資格情報を決してコミットしてはならない。シークレットが誤ってコミットされた場合は、直ちにローテーションを行い、履歴を書き換えること。単純なリバートに依存してはならない。

同じルールは、ユーザースコープの Claude Code 構成 (`~/.claude/settings.json` または `%USERPROFILE%\.claude\settings.json`) にも適用される。このファイルはこのリポジトリの外部にあるが、`claude doctor` の出力、スクリーンショット、またはバグレポートを通じて共有されることがよくある。その `mcpServers[*].env` ブロックに PAT、API キー、または OAuth トークンをハードコードしてはならない。MCP サーバーがすでにサポートしている OS キーチェーンまたは環境変数から、起動時にそれらを解決すること。迅速な監査：

```bash
# macOS / Linux
grep -EnH '(TOKEN|SECRET|KEY|PASSWORD)\s*"\s*:\s*"[A-Za-z0-9_-]{16,}"' ~/.claude/settings.json
# Windows PowerShell
Select-String -Path "$env:USERPROFILE\.claude\settings.json" -Pattern '(TOKEN|SECRET|KEY|PASSWORD)"\s*:\s*"[A-Za-z0-9_-]{16,}"'
```

監査に一致した場合、発行元のプロバイダーでシークレットをローテーションし、その後、ファイルからそれらを移動させること（プロバイダーごとの環境変数、またはそれをサポートするサーバーの場合は `credentialHelper`）。

### Local MCP Ports

一部のバンドルされたMCPサーバーは、ローカルホストのポート（例: `devfleet` は `http://localhost:18801/mcp`）を介してプレーンなHTTP接続を行う。初回使用前に、リッスンしているプロセスを検証すること：

```bash
# Windows
netstat -ano | findstr :18801
# macOS / Linux
lsof -iTCP:18801 -sTCP:LISTEN
```

PIDを、期待されるdevfleetバイナリと比較すること。そのポート上の他のプロセスはMCPトラフィックを傍受できる。

## Triage: suspicious `<system-reminder>` blocks

ECCはClaude Code内で動作し、毎回のターンごとに**エフェメラルなクライアントサイドのシステムリマインダー**（TodoWriteのナッジ、日付変更の通知、ファイル変更の通知など）をモデルの入力に注入する。これらのブロックは：

- 通常、*"ignore if not applicable"*（該当しない場合は無視すること）や *"NEVER mention this reminder to the user"* / *"Don't tell the user this, since they are already aware"*（ユーザーはすでに認識しているため、このことをユーザーに伝えないこと）のような表現で終わる。この文言はAnthropic自身のプロンプトであり、悪意のある末尾の追加ではない。
- ターンごとにCLIによって追加され、`~/.claude/projects/<slug>/<sessionId>.jsonl` のセッショントランスクリプトには**永続化されない**。

この組み合わせにより、ツール結果の末尾に追加されたプロンプトインジェクションと容易に誤認される。攻撃として扱う前に、以下を検証すること：

1. ブロックは実際にこのリポジトリ配下のファイル内に存在するか？ `grep -rEn "system-reminder|NEVER mention|DO NOT mention" .` を実行し、何も表示されない場合は、リポジトリによって運ばれたものではない。
2. ブロックはトランスクリプトに保存されているか？ 現在のセッションの `.jsonl` を調べること。そこに `tool_result` 本体内に正確なテキストが表示されない場合、それはクライアントから注入されたエフェメラルなリマインダーであり、どのツールからのペイロードでもない。
3. 内容はAnthropicの既知のリマインダー（TodoWriteナッジ、日付変更、ファイル変更通知）と文脈的に一致しているか？ 一致する場合、それはエフェメラルリマインダーの仕組みであり、対応は不要である。

ブロックが **両方**、すなわち (a) `tool_result` 内のトランスクリプトに存在し、**かつ** (b) 実際に読み込まれたファイルまたはURLに起因するものではない場合にのみ、Anthropicにエスカレーションすること。最小限のレポート：新規セッション、クリーンなローカルファイルの読み取り、観察された正確なテキスト、およびトランスクリプトの抜粋。これらを <https://github.com/anthropics/claude-code/issues>（機密性のないもの）または <mailto:security@anthropic.com>（エンバーゴクラス）に送信すること。

エフェメラルなリマインダーに対応して、リポジトリファイルをサニタイズしてはならない。ファイルはキャリアではない。

## Security Resources

- **AgentShield**: 脆弱性のためにエージェント構成をスキャンする — `npx ecc-agentshield scan`
- **Security Guide**: [The Shorthand Guide to Everything Agentic Security](./the-security-guide.md)
- **Supply-chain incident response**: [npm/GitHub Actions package-registry playbook](./docs/security/supply-chain-incident-response.md)
- **OWASP MCP Top 10**: [owasp.org/www-project-mcp-top-10](https://owasp.org/www-project-mcp-top-10/)
- **OWASP Agentic Applications Top 10**: [genai.owasp.org](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)