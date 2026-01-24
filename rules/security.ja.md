# セキュリティガイドライン

## 必須セキュリティチェック

**いかなる**コミットの前にも：
- [ ] ハードコードされた秘密情報 (APIキー、パスワード、トークン) がない
- [ ] すべてのユーザー入力が検証されている
- [ ] SQLインジェクション防止 (パラメータ化クエリ)
- [ ] XSS防止 (サニタイズされたHTML)
- [ ] CSRF保護が有効化されている
- [ ] 認証/認可が検証されている
- [ ] すべてのエンドポイントでレート制限
- [ ] エラーメッセージが機密データを漏洩していない

## 秘密情報管理 (Secret Management)

```typescript
// NEVER: Hardcoded secrets
const apiKey = "sk-proj-xxxxx"

// ALWAYS: Environment variables
const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error('OPENAI_API_KEY not configured')
}
```

## セキュリティ対応プロトコル

セキュリティ問題が見つかった場合：
1. 直ちに停止する
2. **security-reviewer** エージェントを使用する
3. 続行する前に CRITICAL な問題を修正する
4. 露出した秘密情報をローテーションする
5. 同様の問題がないかコードベース全体をレビューする
