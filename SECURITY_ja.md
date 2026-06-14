# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.9.x   | :white_check_mark: |
| 1.8.x   | :white_check_mark: |
| < 1.8   | :x:                |

## Reporting a Vulnerability

ECCにセキュリティの脆弱性を発見した場合は、責任を持って報告すること。

**セキュリティの脆弱性に関して公開のGitHubイシューを開かないこと。**

代わりに、**<security@ecc.tools>** 宛てに以下を記載してメールで連絡すること：

- 脆弱性の説明
- 再現手順
- 影響を受けるバージョン
- 潜在的な影響の評価

以下の対応を想定すること：

- 48時間以内の**確認の通知**
- 7日以内の**状況更新**
- クリティカルな問題については30日以内の**修正または緩和策の提供**

脆弱性が承認された場合、我々は：

- リリースノートでクレジットを記載する（匿名を希望しない場合）
- 適時に問題を修正する
- 情報開示のタイミングをあなたと調整する

脆弱性が却下された場合、その理由を説明し、他の場所に報告すべきかどうかのガイダンスを提供する。

## Scope

このポリシーの対象範囲：

- ECCプラグインおよびこのリポジトリ内のすべてのスクリプト
- あなたのマシンで実行されるフックスクリプト
- インストール/アンインストール/修復のライフサイクルスクリプト
- ECCに同梱されているMCP構成
- AgentShield セキュリティスキャナー ([github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield))

## Operational Guidance

### Secrets Handling

`mcp-configs/mcp-servers.json` は**テンプレート**である。すべての `YOUR_*_HERE` の値は、インストール時に環境変数またはシークレットマネージャーから置き換えられなければならない。実際の認証情報を決してコミットしないこと。万が一シークレットが誤ってコミットされた場合は、直ちにローテーションし、履歴を書き換えること。単なるrevertに頼らないこと。

同じルールは、ユーザースコープのClaude Code構成（`~/.claude/settings.json` または `%USERPROFILE%\.claude\settings.json`）にも適用される。このファイルはこのリポジトリの外部にあるが、`claude doctor` の出力、スクリーンショット、またはバグレポートを通じて頻繁に共有される。PAT、APIキー、またはOAuthトークンを `mcpServers[*].env` ブロックにハードコードしないこと。OSのキーチェーンまたはMCPサーバーがすでにサポートしている環境変数から、起動時にそれらを解決すること。簡単な監査方法：

```bash
# macOS / Linux
grep -EnH '(TOKEN|SECRET|KEY|PASSWORD)\s*"\s*:\s*"[A-Za-z0-9_-]{16,}"' ~/.claude/settings.json
# Windows PowerShell
Select-String -Path "$env:USERPROFILE\.claude\settings.json" -Pattern '(TOKEN|SECRET|KEY|PASSWORD)"\s*:\s*"[A-Za-z0-9_-]{16,}"'
```

監査が一致した場合、発行元プロバイダーでシークレットをローテーションし、ファイルから移動させること（プロバイダーごとの環境変数、またはそれをサポートするサーバーの場合は `credentialHelper` を使用する）。

### Local MCP Ports

同梱されている一部のMCPサーバーは、平文のHTTP経由でlocalhostポートに接続する（例: `devfleet` は `http://localhost:18801/mcp`）。初回使用前に、リッスンしているプロセスを検証すること：

```bash
# Windows
netstat -ano | findstr :18801
# macOS / Linux
lsof -iTCP:18801 -sTCP:LISTEN
```

PIDを想定されるdevfleetバイナリと比較する。そのポート上の他のプロセスがMCPトラフィックを傍受する可能性がある。

## Triage: suspicious `<system-reminder>` blocks

ECCはClaude Code内で実行され、Claude Codeはターンごとに**エフェメラルなクライアント側システムリマインダー**（TodoWriteのナッジ、日付変更の通知、ファイル変更の通知など）をモデルの入力に注入する。これらのブロックは：

- 通常、*"該当しない場合は無視すること"* や *"ユーザーにこのリマインダーについて決して言及しないこと"* / *"ユーザーはすでに認識しているため、これを伝えないこと"* といった表現で終わる。その文言はAnthropic自身のプロンプトであり、悪意のある末尾ではない。
- ターンごとにCLIによって追加され、セッションのトランスクリプト（`~/.claude/projects/<slug>/<sessionId>.jsonl`）には**保持されない**。

この組み合わせにより、ツール結果に付加されたプロンプトインジェクションと間違いやすくなる。攻撃として扱う前に、以下を検証すること：

1. ブロックが実際にこのリポジトリ配下のファイル内にあるか？ `grep -rEn "system-reminder|NEVER mention|DO NOT mention" .` を実行し、何もなければ、リポジトリによって運ばれたものではない。
2. ブロックがトランスクリプトに保存されているか？ 現在のセッションの `.jsonl` を検査し、そこにある `tool_result` の本文内に正確なテキストが現れない場合、それはクライアントが注入したエフェメラルなリマインダーであり、どのツールからのペイロードでもない。
3. 内容がAnthropicの既知のリマインダー（TodoWriteのナッジ、日付変更、ファイル変更の通知）と文脈的に一致しているか？ もし一致していれば、それはエフェメラルリマインダーのメカニズムであり、何のアクションも必要ない。

ブロックがトランスクリプトの `tool_result` 内に存在し、**かつ** 実際に読み取られたファイルやURLに起因しない場合**にのみ**、Anthropicにエスカレーションすること。最小限のレポート要件：新規セッション、クリーンなローカルファイルの読み取り、観察された正確なテキスト、およびトランスクリプトの抜粋。<https://github.com/anthropics/claude-code/issues> （非機密）または <mailto:security@anthropic.com> （エンバーゴクラス）に送信する。

エフェメラルなリマインダーへの対応としてリポジトリファイルをサニタイズしないこと。それらはキャリアではない。

## Security Resources

- **AgentShield**: エージェント構成の脆弱性をスキャンする — `npx ecc-agentshield scan`
- **Security Guide**: [The Shorthand Guide to Everything Agentic Security](./the-security-guide.md)
- **Supply-chain incident response**: [npm/GitHub Actions package-registry playbook](./docs/security/supply-chain-incident-response.md)
- **OWASP MCP Top 10**: [owasp.org/www-project-mcp-top-10](https://owasp.org/www-project-mcp-top-10/)
- **OWASP Agentic Applications Top 10**: [genai.owasp.org](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
