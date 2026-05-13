# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.9.x   | :white_check_mark: |
| 1.8.x   | :white_check_mark: |
| < 1.8   | :x:                |

## Reporting a Vulnerability

もしECCにセキュリティ上の脆弱性を発見した場合は、責任を持って報告すること。

**セキュリティ上の脆弱性について、公開のGitHub issueを開かないこと。**

代わりに、以下を含めて **<security@ecc.tools>** 宛にメールを送信すること：

- 脆弱性の説明
- 再現手順
- 影響を受けるバージョン
- 潜在的な影響の評価

以下の対応を想定すること：

- 48時間以内の**受領確認**
- 7日以内の**ステータス更新**
- 重大な問題については30日以内の**修正または緩和策**

脆弱性が受領された場合、以下の対応が行われる：

- リリースノートに報告者として記載する（匿名を希望する場合を除く）
- 問題をタイムリーに修正する
- 情報公開のタイミングを報告者と調整する

脆弱性が却下された場合は、その理由を説明し、他の場所で報告すべきかどうかについてのガイダンスを提供する。

## Scope

このポリシーは以下を対象とする：

- ECCプラグインおよびこのリポジトリ内のすべてのスクリプト
- マシン上で実行されるhookスクリプト
- install/uninstall/repairのライフサイクルスクリプト
- ECCに同梱されているMCP configurations
- AgentShieldセキュリティスキャナ（[github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield)）

## Security Resources

- **AgentShield**: agent configの脆弱性をスキャンする — `npx ecc-agentshield scan`
- **Security Guide**: [The Shorthand Guide to Everything Agentic Security](./the-security-guide.md)
- **OWASP MCP Top 10**: [owasp.org/www-project-mcp-top-10](https://owasp.org/www-project-mcp-top-10/)
- **OWASP Agentic Applications Top 10**: [genai.owasp.org](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
