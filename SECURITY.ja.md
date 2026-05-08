# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.9.x   | :white_check_mark: |
| 1.8.x   | :white_check_mark: |
| < 1.8   | :x:                |

## Reporting a Vulnerability

ECCのセキュリティ脆弱性を発見した場合は、責任を持って報告してほしい。

**セキュリティの脆弱性に関して、公開のGitHub issueを開かないこと。**

代わりに、**<security@ecc.tools>** 宛てに以下の情報を添えてメールで報告すること：

- 脆弱性の説明
- 再現手順
- 影響を受けるバージョン
- 潜在的な影響評価

以下の対応が期待できる：

- 48時間以内の**受領確認**
- 7日以内の**ステータス更新**
- 致命的な問題に対する30日以内の**修正または緩和策の提供**

脆弱性が承認された場合、我々は以下の対応を行う：

- （匿名を希望しない限り）リリースノートであなたをクレジットする
- タイムリーに問題を修正する
- あなたと開示のタイミングを調整する

脆弱性が却下された場合は、その理由を説明し、別の場所に報告すべきかどうかのガイダンスを提供する。

## Scope

このポリシーの対象範囲は以下の通りである：

- ECCプラグインおよび本リポジトリ内の全スクリプト
- ローカルマシンで実行されるフックスクリプト
- インストール / アンインストール / 修復のライフサイクルスクリプト
- ECCに同梱されているMCP設定
- AgentShield セキュリティスキャナー ([github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield))

## Security Resources

- **AgentShield**: エージェント設定の脆弱性をスキャンする — `npx ecc-agentshield scan`
- **Security Guide**: [The Shorthand Guide to Everything Agentic Security](./the-security-guide.md)
- **OWASP MCP Top 10**: [owasp.org/www-project-mcp-top-10](https://owasp.org/www-project-mcp-top-10/)
- **OWASP Agentic Applications Top 10**: [genai.owasp.org](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
