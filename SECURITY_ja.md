# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.9.x   | :white_check_mark: |
| 1.8.x   | :white_check_mark: |
| < 1.8   | :x:                |

## Reporting a Vulnerability

ECC にセキュリティの脆弱性を発見した場合は、責任を持って報告すること。

**セキュリティの脆弱性について、パブリックな GitHub イシューを開かないこと。**

代わりに、以下を記載して **<security@ecc.tools>** にメールを送信すること。

- 脆弱性の説明
- 再現手順
- 影響を受けるバージョン
- 潜在的な影響の評価

以下の対応を想定すること。

- 48 時間以内の**受領確認**
- 7 日以内の**ステータス更新**
- クリティカルな問題に対する 30 日以内の**修正または緩和策**

脆弱性が受け入れられた場合、私たちは以下を行う。

- （匿名を希望しない限り）リリースノートであなたにクレジットを付与する
- タイムリーに問題を修正する
- 情報開示のタイミングをあなたと調整する

脆弱性が却下された場合、その理由を説明し、他の場所で報告すべきかどうかについてのガイダンスを提供する。

## Scope

このポリシーの対象範囲は以下の通りである。

- ECC プラグインとこのリポジトリ内のすべてのスクリプト
- マシン上で実行されるフックスクリプト
- インストール/アンインストール/修復のライフサイクルスクリプト
- ECC に同梱されている MCP 構成
- AgentShield セキュリティスキャナー ([github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield))

## Operational Guidance

### Secrets Handling

`mcp-configs/mcp-servers.json` は**テンプレート**である。すべての `YOUR_*_HERE` の値は、インストール時に環境変数またはシークレットマネージャーから置き換える必要がある。実際の認証情報を絶対にコミットしないこと。誤ってシークレットがコミットされた場合は、直ちにローテーションして履歴を書き換えること。単純なリバートに依存しないこと。

ユーザースコープの Claude Code 構成 (`~/.claude/settings.json` または `%USERPROFILE%\.claude\settings.json`) にも同じルールが適用される。そのファイルはこのリポジトリの外部にあるが、`claude doctor` の出力、スクリーンショット、またはバグレポートを通じて共有されることがよくある。その `mcpServers[*].env` ブロックに PAT、API キー、または OAuth トークンをハードコードしないこと。MCP サーバーがすでにサポートしている OS キーチェーンまたは環境変数からスポーン時に解決すること。簡単な監査：

```bash
# macOS / Linux
grep -EnH '(TOKEN|SECRET|KEY|PASSWORD)\s*"\s*:\s*"[A-Za-z0-9_-]{16,}"' ~/.claude/settings.json
# Windows PowerShell
Select-String -Path "$env:USERPROFILE\.claude\settings.json" -Pattern '(TOKEN|SECRET|KEY|PASSWORD)"\s*:\s*"[A-Za-z0-9_-]{16,}"'
```

監査に一致した場合、発行元のプロバイダーでシークレットをローテーションしてから、ファイルから移動すること（プロバイダーごとの環境変数、またはそれをサポートするサーバーの場合は `credentialHelper`）。

### Local MCP Ports

バンドルされている MCP サーバーの中には、ローカルホストのポートへプレーン HTTP 経由で接続するものがある（例：`devfleet` から `http://localhost:18801/mcp`）。最初に使用する前に、リッスンしているプロセスを検証すること。

```bash
# Windows
netstat -ano | findstr :18801
# macOS / Linux
lsof -iTCP:18801 -sTCP:LISTEN
```

PID を期待される devfleet バイナリと比較すること。そのポート上の他のプロセスは MCP トラフィックを傍受する可能性がある。

## Triage: suspicious `<system-reminder>` blocks

ECC は Claude Code 内で実行され、Claude Code は毎ターン、モデルの入力に**エフェメラルなクライアント側のシステムリマインダー**を注入する（TodoWrite のナッジ、日付変更の通知、ファイル変更の通知など）。これらのブロックは以下の特徴を持つ。

- 通常、*"ignore if not applicable"* や *"NEVER mention this reminder to the user"* / *"Don't tell the user this, since they are already aware"* のような表現で終わる。その表現は Anthropic 自身のプロンプトであり、悪意のある末尾ではない。
- ターンごとに CLI によって追加され、`~/.claude/projects/<slug>/<sessionId>.jsonl` のセッショントランスクリプトには**永続化されない**。

この組み合わせにより、ツールの結果に追加されたプロンプトインジェクションと間違いやすくなる。攻撃として扱う前に、以下を検証すること。

1. そのブロックは実際にこのリポジトリ配下のファイルにあるか？ `grep -rEn "system-reminder|NEVER mention|DO NOT mention" .` を実行し、何もなければ、リポジトリによって運ばれたものではない。
2. そのブロックはトランスクリプトに保存されているか？ 現在のセッションの `.jsonl` を検査すること。その正確なテキストがそこの `tool_result` 本文内に現れない場合、それはクライアントから注入されたエフェメラルなリマインダーであり、どのツールからのペイロードでもない。
3. その内容は、Anthropic の既知のリマインダー（TodoWrite のナッジ、日付変更、ファイル変更の通知）と文脈的に一致しているか？ 一致している場合、それはエフェメラルリマインダーのメカニズムであり、アクションは不要である。

ブロックがトランスクリプトの `tool_result` 内に存在し、**かつ**、実際に読み取られたファイルまたは URL に起因しない場合の**両方**を満たす場合にのみ Anthropic にエスカレーションすること。最小限のレポート：新しいセッション、クリーンなローカルファイルの読み取り、観察された正確なテキスト、およびトランスクリプトの抜粋。<https://github.com/anthropics/claude-code/issues>（非機密）または <mailto:security@anthropic.com>（エンバーゴクラス）に送信すること。

エフェメラルなリマインダーに応じてリポジトリファイルをサニタイズしないこと。それらはキャリアではない。

## Security Resources

- **AgentShield**: 脆弱性についてエージェント構成をスキャンする — `npx ecc-agentshield scan`
- **Security Guide**: [The Shorthand Guide to Everything Agentic Security](./the-security-guide.md)
- **Supply-chain incident response**: [npm/GitHub Actions package-registry playbook](./docs/security/supply-chain-incident-response.md)
- **OWASP MCP Top 10**: [owasp.org/www-project-mcp-top-10](https://owasp.org/www-project-mcp-top-10/)
- **OWASP Agentic Applications Top 10**: [genai.owasp.org](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
