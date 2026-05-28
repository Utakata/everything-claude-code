# セキュリティポリシー (Security Policy)

## サポートされているバージョン (Supported Versions)

| Version | Supported          |
| ------- | ------------------ |
| 1.9.x   | :white_check_mark: |
| 1.8.x   | :white_check_mark: |
| < 1.8   | :x:                |

## 脆弱性の報告 (Reporting a Vulnerability)

ECC にセキュリティの脆弱性を発見した場合は、責任を持って報告してほしい。

**セキュリティの脆弱性について、公開の GitHub Issue を開かないこと。**

代わりに、**<security@ecc.tools>** 宛てに以下の情報を含めて電子メールを送信すること：

- 脆弱性の説明
- 再現手順
- 影響を受けるバージョン
- 潜在的な影響の評価

以下の対応を想定している：

- 48時間以内の**受領確認**
- 7日以内の**ステータス更新**
- 重大な問題に対する30日以内の**修正または緩和策**

脆弱性が受け入れられた場合、私たちは以下を行う：

- リリースノートにクレジットを記載する（匿名を希望する場合を除く）
- 適時に問題を修正する
- 情報開示のタイミングを調整する

脆弱性が却下された場合は、その理由を説明し、他の場所に報告すべきかどうかのガイダンスを提供する。

## 対象範囲 (Scope)

このポリシーは以下を対象とする：

- ECC プラグインおよびこのリポジトリ内のすべてのスクリプト
- マシン上で実行されるフックスクリプト
- インストール/アンインストール/修復のライフサイクルスクリプト
- ECC に同梱されている MCP 構成
- AgentShield セキュリティスキャナー ([github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield))

## 運用ガイダンス (Operational Guidance)

### シークレットの取り扱い (Secrets Handling)

`mcp-configs/mcp-servers.json` は**テンプレート**である。すべての `YOUR_*_HERE` の値は、インストール時に環境変数またはシークレットマネージャーから置き換える必要がある。実際の認証情報を絶対にコミットしないこと。誤ってシークレットをコミットした場合は、直ちにそれをローテーションし、履歴を書き直すこと。単なる revert に頼らないこと。

同じルールが、ユーザースコープの Claude Code 設定（`~/.claude/settings.json` または `%USERPROFILE%\.claude\settings.json`）にも適用される。このファイルはこのリポジトリの外部にあるが、`claude doctor` の出力、スクリーンショット、またはバグレポートを介して共有されることがよくある。`mcpServers[*].env` ブロックに PAT（個人アクセストークン）、API キー、または OAuth トークンをハードコードしないこと。MCP サーバーが既にサポートしている OS キーチェーンまたは環境変数から、生成時（spawn time）にそれらを解決すること。簡単な監査：

```bash
# macOS / Linux
grep -EnH '(TOKEN|SECRET|KEY|PASSWORD)\s*"\s*:\s*"[A-Za-z0-9_-]{16,}"' ~/.claude/settings.json
# Windows PowerShell
Select-String -Path "$env:USERPROFILE\.claude\settings.json" -Pattern '(TOKEN|SECRET|KEY|PASSWORD)"\s*:\s*"[A-Za-z0-9_-]{16,}"'
```

監査に一致した場合、発行元プロバイダーでシークレットをローテーションし、ファイルから削除すること（プロバイダーごとの環境変数、またはそれをサポートするサーバーの場合は `credentialHelper` を使用）。

### ローカル MCP ポート (Local MCP Ports)

同梱されている一部の MCP サーバーは、プレーンな HTTP を介して localhost ポートに接続する（例: `devfleet` は `http://localhost:18801/mcp` へ）。最初に使用する前に、リスニングプロセスを確認すること：

```bash
# Windows
netstat -ano | findstr :18801
# macOS / Linux
lsof -iTCP:18801 -sTCP:LISTEN
```

PID を予期される devfleet バイナリと比較する。そのポート上の他のプロセスは、MCP トラフィックを傍受する可能性がある。

## トリアージ：疑わしい `<system-reminder>` ブロック (Triage: suspicious `<system-reminder>` blocks)

ECC は Claude Code 内で実行され、毎ターン（TodoWrite のナッジ、日付変更の通知、ファイル変更の通知など）、モデルの入力に**一時的なクライアントサイドのシステムリマインダー（ephemeral client-side system reminders）**を注入する。これらのブロックは：

- 通常、*"ignore if not applicable"（該当しない場合は無視）* または *"NEVER mention this reminder to the user"（ユーザーにこのリマインダーを絶対に伝えないでください）* / *"Don't tell the user this, since they are already aware"（ユーザーはすでに認識しているため、これを伝えないでください）* のような言い回しで終わる。その表現は Anthropic 自身のプロンプトであり、悪意のある末尾の追加（malicious tail）ではない。
- CLI によってターンごとに追加され、`~/.claude/projects/<slug>/<sessionId>.jsonl` のセッショントランスクリプトには**永続化されない（not persisted）**。

この組み合わせにより、ツールの結果に追加されたプロンプトインジェクションと間違いやすくなる。これを攻撃として扱う前に、以下を確認すること：

1. そのブロックは実際にこのリポジトリ内のファイルにあるか？ `grep -rEn "system-reminder|NEVER mention|DO NOT mention" .`; 何も出力されない場合、リポジトリによって運ばれたものではない。
2. そのブロックはトランスクリプトに保存されているか？ 現在のセッションの `.jsonl` を調べること。その正確なテキストがそこの `tool_result` 本体内に表示されない場合、それはクライアントから注入された一時的なリマインダーであり、ツールのペイロードではない。
3. そのコンテンツは、Anthropic の既知のリマインダー（TodoWrite のナッジ、日付変更、ファイル変更の通知）と文脈的に一致しているか？ もしそうであれば、それは一時的なリマインダーメカニズムであり、何もする必要はない。

ブロックが **両方**、すなわち (a) `tool_result` 内のトランスクリプトに存在し、**かつ** (b) 実際に読み取られたファイルや URL に起因するものではない場合にのみ、Anthropic にエスカレーションすること。最小限のレポート：新規セッション、クリーンなローカルファイルの読み取り、観察された正確なテキスト、およびトランスクリプトの抜粋。送信先は <https://github.com/anthropics/claude-code/issues>（非機密）、または <mailto:security@anthropic.com>（公開禁止クラス）。

一時的なリマインダーに対応してリポジトリのファイルをサニタイズしないこと。それらはキャリアではない。

## セキュリティリソース (Security Resources)

- **AgentShield**: エージェント設定の脆弱性をスキャンする — `npx ecc-agentshield scan`
- **Security Guide**: [エージェンティックセキュリティのすべてに関する簡略版ガイド (The Shorthand Guide to Everything Agentic Security)](./the-security-guide.md)
- **サプライチェーンインシデント対応 (Supply-chain incident response)**: [npm/GitHub Actions package-registry playbook](./docs/security/supply-chain-incident-response.md)
- **OWASP MCP Top 10**: [owasp.org/www-project-mcp-top-10](https://owasp.org/www-project-mcp-top-10/)
- **OWASP Agentic Applications Top 10**: [genai.owasp.org](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
