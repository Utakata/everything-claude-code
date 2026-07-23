# AgentShield ポリシー例外プレイブック

候補ID：`sarif-backed-timeboxed-exception-review`

AgentShield の組織ポリシー出力が、修復、期限付き例外（time-boxed exception）、
または明示的な強制（enforcement）を必要とする可能性のある指摘（finding）を生成した場合に、
このプレイブックを使用します。

## 承認パス

1. AgentShield の finding id、カテゴリ、深刻度、影響を受けるファイルまたは
   MCP/hook サーフェス、およびポリシーパックまたは組織ベースラインを特定する。
2. 判断の前にスキャナーエビデンスを取得する：
   - SARIF/code-scanning の結果、特に `agentshield-policy/*`
   - JSON/HTML レポートのエビデンス
   - ターミナルまたは GitHub Action の job-summary カウント
3. 例外リクエストのライフサイクルフィールドを記録する：owner、ticket、scope、
   expiry、rationale、およびそれが active、expiring soon、または expired のいずれか。
4. 新しいエビデンスが存在するまで、期限切れの例外は却下または強制のままにする。
5. 即時の修復が可能かどうかを判断する。不可能な場合は、指定された owner、ticket、scope、
   expiry に紐づいた、狭い期限付き例外のみを昇格させる。
6. AgentShield のコード、ポリシーパック、強制設定、リリース状態、
   およびライブのセキュリティ姿勢を、読み取り専用のエバリュエーター実行の対象外にする。

## 却下パス

指摘が不都合であるという理由で、ポリシーカテゴリ、ポリシーパック、
または組織ゲートを一括抑制しないこと。

SARIF またはレポートのエビデンス、および現在の owner、ticket、scope、expiry なしに、
critical/high の指摘をダウングレードしないこと。

期限切れの例外を active として扱わないこと。expired とは、メンテナーが新しい境界付きの例外を
作成するか、根本的な問題を修正するまで、ポリシーゲートが強制されたままであるべきことを意味します。

## 最小限の検証

- `npx ecc-agentshield scan --format json`
- AgentShield の SARIF/code-scanning アーティファクトまたはレポートのエビデンス
- エグゼクティブレビューのエビデンスが必要な場合は `npx ecc-agentshield scan --format html`
- 現在の例外ライフサイクルフィールド：owner、ticket、scope、expiry、status
- `node tests/docs/evaluator-rag-prototype.test.js`
- `git diff --check`

スキャナーエビデンス、ライフサイクル状態、ポリシーパックのソース、および
修復か例外かの判断を、メンテナーのPR本文またはハンドオフに記録すること。
