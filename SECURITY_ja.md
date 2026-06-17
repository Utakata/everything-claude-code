# セキュリティポリシー

## サポート対象バージョン

| バージョン | サポート状況         |
| ------- | ------------------ |
| 1.9.x   | :white_check_mark: |
| 1.8.x   | :white_check_mark: |
| < 1.8   | :x:                |

## 脆弱性の報告

ECCにセキュリティ脆弱性を発見した場合は、責任を持って報告すること。

**セキュリティ脆弱性に関する公開のGitHub Issueは作成しないこと。**

代わりに、以下の内容を **<security@ecc.tools>** 宛にメールで送信すること：

- 脆弱性の説明
- 再現手順
- 影響を受けるバージョン
- 潜在的な影響の評価

報告後、以下の対応が行われる：

- 48時間以内の**受領確認**
- 7日以内の**ステータス更新**
- 深刻な問題に対する30日以内の**修正または緩和策の提供**

脆弱性が承認された場合、以下の対応が行われる：

- リリースノートでのクレジット表記（匿名を希望しない場合）
- タイムリーな問題の修正
- 開示タイミングの調整

脆弱性が却下された場合は、その理由を説明し、別の場所へ報告すべきかどうかのガイダンスを提供する。

## スコープ

本ポリシーの対象範囲：

- ECCプラグインおよび本リポジトリ内のすべてのスクリプト
- ローカルマシンで実行されるフックスクリプト
- インストール / アンインストール / 修復のライフサイクルスクリプト
- ECCに同梱されるMCP構成
- セキュリティスキャナー AgentShield ([github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield))

## 運用ガイダンス

### シークレットの取り扱い

`mcp-configs/mcp-servers.json` は**テンプレート**である。すべての `YOUR_*_HERE` の値は、インストール時に環境変数またはシークレットマネージャーから置換されなければならない。実際の認証情報を決してコミットしてはならない。万が一シークレットを誤ってコミットしてしまった場合は、直ちにローテーションを行い、履歴を書き換えること。単なるリバート（revert）に頼ってはいけない。

同じルールは、ユーザー単位のClaude Code設定（`~/.claude/settings.json` または `%USERPROFILE%\.claude\settings.json`）にも適用される。このファイルは本リポジトリの管理外であるが、`claude doctor` の出力、スクリーンショット、またはバグレポートを通じて共有されることがよくある。PAT、APIキー、OAuthトークンなどを `mcpServers[*].env` ブロック内にハードコードしてはならない。これらは、MCPサーバーがすでにサポートしているOSのキーチェーンや環境変数から、起動時に解決するようにすること。以下は簡単な監査コマンドである：

```bash
# macOS / Linux
grep -EnH '(TOKEN|SECRET|KEY|PASSWORD)\s*"\s*:\s*"[A-Za-z0-9_-]{16,}"' ~/.claude/settings.json
# Windows PowerShell
Select-String -Path "$env:USERPROFILE\.claude\settings.json" -Pattern '(TOKEN|SECRET|KEY|PASSWORD)"\s*:\s*"[A-Za-z0-9_-]{16,}"'
```

監査に該当する場合は、発行元プロバイダーでシークレットのローテーションを行い、ファイルから削除すること（プロバイダーごとの環境変数、またはサポートしているサーバーの場合は `credentialHelper` を使用する）。

### ローカルのMCPポート

一部の同梱されているMCPサーバーは、プレーンなHTTP経由でローカルホストのポート（例: `devfleet` は `http://localhost:18801/mcp`）に接続する。初回使用前に、リッスンしているプロセスを確認すること：

```bash
# Windows
netstat -ano | findstr :18801
# macOS / Linux
lsof -iTCP:18801 -sTCP:LISTEN
```

PIDを想定されるdevfleetバイナリと照合すること。そのポート上の他のいかなるプロセスも、MCPトラフィックを傍受する可能性がある。

## トリアージ：不審な `<system-reminder>` ブロック

ECCはClaude Code内部で実行されており、Claude Codeは毎ターン、モデルの入力に対して**クライアント側の一時的なシステムリマインダー（ephemeral client-side system reminders）**を挿入する（TodoWriteのナッジ、日付変更の通知、ファイル変更の通知など）。これらのブロックの特徴は以下の通り：

- 通常、*"ignore if not applicable"*（該当しない場合は無視すること）、*"NEVER mention this reminder to the user"*（このリマインダーについてユーザーに決して言及しないこと） または *"Don't tell the user this, since they are already aware"*（ユーザーはすでに認識しているため、このことをユーザーに伝えないこと）のような表現で終わる。この文言はAnthropic自身のプロンプトであり、悪意のある末尾コード（malicious tail）ではない。
- ターンごとにCLIによって追加され、セッショントランスクリプト（`~/.claude/projects/<slug>/<sessionId>.jsonl`）には**保存されない**。

この組み合わせにより、ツール結果に追加されたプロンプトインジェクションと誤認しやすくなる。攻撃として扱う前に、以下の点を確認すること：

1. そのブロックは実際にこのリポジトリ配下のファイル内に存在するか？ `grep -rEn "system-reminder|NEVER mention|DO NOT mention" .` を実行し、何も出力されなければ、リポジトリが原因ではない。
2. そのブロックはトランスクリプトに保存されているか？ 現在のセッションの `.jsonl` を検査し、その正確なテキストが `tool_result` の本文内に存在しなければ、それはクライアントから挿入された一時的なリマインダーであり、ツールのペイロードではない。
3. その内容は、Anthropicの既知のリマインダー（TodoWriteナッジ、日付変更、ファイル変更通知）と文脈的に一致しているか？ 一致している場合、それは一時的なリマインダーのメカニズムであり、対応は不要である。

ブロックが、(a) トランスクリプトの `tool_result` 内に存在し、**かつ** (b) 実際に読み込まれたファイルやURLに起因しない場合にのみ、Anthropicへエスカレーションすること。最小限のレポート要件：新規セッション、クリーンなローカルファイルの読み込み、観察された正確なテキスト、およびトランスクリプトの抜粋。宛先は <https://github.com/anthropics/claude-code/issues> （非機密）または <mailto:security@anthropic.com> （エンバーゴクラス）である。

一時的なリマインダーを理由にリポジトリのファイルをサニタイズしないこと。それらはキャリア（原因）ではない。

## セキュリティリソース

- **AgentShield**: エージェント設定の脆弱性をスキャンする — `npx ecc-agentshield scan`
- **Security Guide**: [The Shorthand Guide to Everything Agentic Security](./the-security-guide.md)
- **サプライチェーンのインシデント対応**: [npm/GitHub Actions パッケージレジストリ プレイブック](./docs/security/supply-chain-incident-response.md)
- **OWASP MCP Top 10**: [owasp.org/www-project-mcp-top-10](https://owasp.org/www-project-mcp-top-10/)
- **OWASP Agentic Applications Top 10**: [genai.owasp.org](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
