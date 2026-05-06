# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.9.x   | :white_check_mark: |
| 1.8.x   | :white_check_mark: |
| < 1.8   | :x:                |

## Reporting a Vulnerability

ECCにセキュリティの脆弱性を発見した場合は、責任を持って報告していただきたい。

**セキュリティの脆弱性に関する公開のGitHub Issueを作成しないこと。**

代わりに、**<security@ecc.tools>** 宛に以下の情報を含めてメールを送信すること：

- 脆弱性の説明
- 再現手順
- 影響を受けるバージョン
- 潜在的な影響評価

以下の対応を予定している：

- 48時間以内の**受領確認**
- 7日以内の**ステータス更新**
- 重大な問題については30日以内の**修正または緩和策の提供**

脆弱性が承認された場合、我々は以下の対応を行う：

- リリースノートでのクレジット表記（匿名を希望する場合を除く）
- タイムリーな問題の修正
- 報告者との開示時期の調整

脆弱性が却下された場合は、その理由を説明し、他の場所で報告すべきかどうかのガイダンスを提供する。

## Scope

このポリシーの対象範囲は以下の通りである：

- ECCプラグインおよび本リポジトリ内のすべてのスクリプト
- ローカルマシンで実行されるフックスクリプト
- インストール/アンインストール/修復のライフサイクルスクリプト
- ECCに同梱されているMCP設定
- AgentShield セキュリティスキャナ ([github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield))

## Security Resources

- **AgentShield**: エージェント設定の脆弱性をスキャンする — `npx ecc-agentshield scan`
- **Security Guide**: [The Shorthand Guide to Everything Agentic Security](./the-security-guide.md)
- **OWASP MCP Top 10**: [owasp.org/www-project-mcp-top-10](https://owasp.org/www-project-mcp-top-10/)
- **OWASP Agentic Applications Top 10**: [genai.owasp.org](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
