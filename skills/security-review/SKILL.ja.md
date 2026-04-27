---
name: security-review
description: 包括的なセキュリティチェックリスト。認証、認可、入力バリデーション、SQLインジェクション防止、XSS/CSRF保護、および一般的な脆弱性をカバーする。
---

# セキュリティレビューチェックリスト

このスキルは、コード変更、アーキテクチャ設計、およびデプロイメントのためのセキュリティチェックリストとガイドラインを提供する。

## セキュリティレビューを実行するタイミング

- 新しいAPIエンドポイントを追加する前
- 認証/認可ロジックを変更した後
- 新しい依存関係を導入する際
- デプロイメントの直前
- セキュリティインシデント中

## コアセキュリティチェックリスト

### 1. 秘密情報管理 (Secret Management)

#### FAIL: ハードコードされた秘密情報なし
```typescript
// DANGEROUS
const apiKey = "sk-1234567890abcdef"
```

#### PASS: 環境変数を使用
```typescript
// SAFE
const apiKey = process.env.API_KEY
if (!apiKey) throw new Error("API_KEY not configured")
```

#### 検証手順
- [ ] `git grep` または trufflehog で秘密情報をスキャン
- [ ] `.env` ファイルが `.gitignore` に含まれている
- [ ] CI/CD パイプラインが環境変数を使用している
- [ ] クライアントサイドコードに秘密情報が露出していない

### 2. 入力バリデーション (Input Validation)

#### スキーマバリデーション (Zod)
```typescript
import { z } from 'zod'

const UserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18).max(120),
  role: z.enum(['user', 'admin'])
})

// Validate input
const result = UserSchema.safeParse(req.body)
if (!result.success) {
  return res.status(400).json(result.error)
}
```

#### ファイルアップロード
```typescript
function validateFile(file: File) {
  // Size check (e.g. 5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File too large')
  }

  // MIME type check
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type')
  }

  // Extension check
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
  const extension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0]
  if (!extension || !allowedExtensions.includes(extension)) {
    throw new Error('Invalid file extension')
  }

  return true
}
```

#### 検証手順
- [ ] すべてのユーザー入力がスキーマで検証されている
- [ ] ファイルアップロードが制限されている (サイズ, タイプ, 拡張子)
- [ ] ユーザー入力がクエリで直接使用されていない
- [ ] ホワイトリスト検証 (ブラックリストではない)
- [ ] エラーメッセージが機密情報を漏洩していない

### 3. SQLインジェクション防止

#### FAIL: SQLを決して連結しない
```typescript
// DANGEROUS - SQL Injection vulnerability
const query = `SELECT * FROM users WHERE email = '${userEmail}'`
await db.query(query)
```

#### PASS: 常にパラメータ化クエリを使用する
```typescript
// Safe - parameterized query
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', userEmail)

// Or with raw SQL
await db.query(
  'SELECT * FROM users WHERE email = $1',
  [userEmail]
)
```

#### 検証手順
- [ ] すべてのデータベースクエリがパラメータ化クエリを使用している
- [ ] SQL内で文字列連結が行われていない
- [ ] ORM/クエリビルダーが正しく使用されている
- [ ] Supabaseクエリが適切にサニタイズされている

### 4. 認証 (Authentication) & 認可 (Authorization)

#### JWTトークン処理
```typescript
// FAIL: WRONG: localStorage (vulnerable to XSS)
localStorage.setItem('token', token)

// PASS: CORRECT: httpOnly cookies
res.setHeader('Set-Cookie',
  `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`)
```

#### 認可チェック
```typescript
export async function deleteUser(userId: string, requesterId: string) {
  // ALWAYS verify authorization first
  const requester = await db.users.findUnique({
    where: { id: requesterId }
  })

  if (requester.role !== 'admin') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    )
  }

  // Proceed with deletion
  await db.users.delete({ where: { id: userId } })
}
```

#### 行レベルセキュリティ (Supabase RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can only view their own data
CREATE POLICY "Users view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can only update their own data
CREATE POLICY "Users update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

#### 検証手順
- [ ] トークンがhttpOnly Cookieに保存されている (localStorageではない)
- [ ] 機密操作の前に認可チェックが行われている
- [ ] Supabaseで行レベルセキュリティが有効化されている
- [ ] ロールベースのアクセス制御が実装されている
- [ ] セッション管理が安全である

### 5. XSS防止

#### HTMLのサニタイズ
```typescript
import DOMPurify from 'isomorphic-dompurify'

// ALWAYS sanitize user-provided HTML
function renderUserContent(html: string) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p'],
    ALLOWED_ATTR: []
  })
  return <div dangerouslySetInnerHTML={{ __html: clean }} />
}
```

#### コンテンツセキュリティポリシー (CSP)
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
      connect-src 'self' https://api.example.com;
    `.replace(/\s{2,}/g, ' ').trim()
  }
]
```

#### 検証手順
- [ ] ユーザー提供のHTMLがサニタイズされている
- [ ] CSPヘッダーが設定されている
- [ ] 検証されていない動的コンテンツのレンダリングがない
- [ ] Reactの組み込みXSS保護が使用されている

### 6. CSRF保護

#### CSRFトークン
```typescript
import { csrf } from '@/lib/csrf'

export async function POST(request: Request) {
  const token = request.headers.get('X-CSRF-Token')

  if (!csrf.verify(token)) {
    return NextResponse.json(
      { error: 'Invalid CSRF token' },
      { status: 403 }
    )
  }

  // Process request
}
```

#### SameSite Cookies
```typescript
res.setHeader('Set-Cookie',
  `session=${sessionId}; HttpOnly; Secure; SameSite=Strict`)
```

#### 検証手順
- [ ] 状態変更操作にCSRFトークンがある
- [ ] すべてのCookieにSameSite=Strictが設定されている
- [ ] ダブルサブミットCookieパターンが実装されている

### 7. レート制限

#### APIレート制限
```typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests'
})

// Apply to routes
app.use('/api/', limiter)
```

#### コストの高い操作
```typescript
// Aggressive rate limiting for searches
const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: 'Too many search requests'
})

app.use('/api/search', searchLimiter)
```

#### 検証手順
- [ ] すべてのAPIエンドポイントでレート制限
- [ ] コストの高い操作に対してより厳しい制限
- [ ] IPベースのレート制限
- [ ] ユーザーベースのレート制限 (認証済み)

### 8. 機密データの露出

#### ロギング
```typescript
// FAIL: WRONG: Logging sensitive data
console.log('User login:', { email, password })
console.log('Payment:', { cardNumber, cvv })

// PASS: CORRECT: Redact sensitive data
console.log('User login:', { email, userId })
console.log('Payment:', { last4: card.last4, userId })
```

#### エラーメッセージ
```typescript
// FAIL: WRONG: Exposing internal details
catch (error) {
  return NextResponse.json(
    { error: error.message, stack: error.stack },
    { status: 500 }
  )
}

// PASS: CORRECT: Generic error messages
catch (error) {
  console.error('Internal error:', error)
  return NextResponse.json(
    { error: 'An error occurred. Please try again.' },
    { status: 500 }
  )
}
```

#### 検証手順
- [ ] パスワード、トークン、または秘密情報がログに含まれていない
- [ ] ユーザー向けのエラーメッセージが一般的である
- [ ] 詳細なエラーはサーバーログのみ
- [ ] ユーザーにスタックトレースを露出しない

### 9. ブロックチェーンセキュリティ (Solana)

#### ウォレット検証
```typescript
import { verify } from '@solana/web3.js'

async function verifyWalletOwnership(
  publicKey: string,
  signature: string,
  message: string
) {
  try {
    const isValid = verify(
      Buffer.from(message),
      Buffer.from(signature, 'base64'),
      Buffer.from(publicKey, 'base64')
    )
    return isValid
  } catch (error) {
    return false
  }
}
```

#### トランザクション検証
```typescript
async function verifyTransaction(transaction: Transaction) {
  // Verify recipient
  if (transaction.to !== expectedRecipient) {
    throw new Error('Invalid recipient')
  }

  // Verify amount
  if (transaction.amount > maxAmount) {
    throw new Error('Amount exceeds limit')
  }

  // Verify user has sufficient balance
  const balance = await getBalance(transaction.from)
  if (balance < transaction.amount) {
    throw new Error('Insufficient balance')
  }

  return true
}
```

#### 検証手順
- [ ] ウォレット署名が検証されている
- [ ] トランザクション詳細が検証されている
- [ ] トランザクション前に残高チェック
- [ ] 盲目的なトランザクション署名がない

### 10. 依存関係セキュリティ

#### 定期的な更新
```bash
# Check for vulnerabilities
npm audit

# Fix automatically fixable issues
npm audit fix

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

#### ロックファイル
```bash
# ALWAYS commit lock files
git add package-lock.json

# Use in CI/CD for reproducible builds
npm ci  # Instead of npm install
```

#### 検証手順
- [ ] 依存関係が最新である
- [ ] 既知の脆弱性がない (npm audit clean)
- [ ] ロックファイルがコミットされている
- [ ] GitHubでDependabotが有効化されている
- [ ] 定期的なセキュリティ更新

## セキュリティテスト

### 自動セキュリティテスト
```typescript
// Test authentication
test('requires authentication', async () => {
  const response = await fetch('/api/protected')
  expect(response.status).toBe(401)
})

// Test authorization
test('requires admin role', async () => {
  const response = await fetch('/api/admin', {
    headers: { Authorization: `Bearer ${userToken}` }
  })
  expect(response.status).toBe(403)
})

// Test input validation
test('rejects invalid input', async () => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ email: 'not-an-email' })
  })
  expect(response.status).toBe(400)
})

// Test rate limiting
test('enforces rate limits', async () => {
  const requests = Array(101).fill(null).map(() =>
    fetch('/api/endpoint')
  )

  const responses = await Promise.all(requests)
  const tooManyRequests = responses.filter(r => r.status === 429)

  expect(tooManyRequests.length).toBeGreaterThan(0)
})
```

## デプロイ前セキュリティチェックリスト

**いかなる**本番デプロイメントの前にも：

- [ ] **秘密情報**: ハードコードされた秘密情報なし、すべて環境変数内
- [ ] **入力検証**: すべてのユーザー入力が検証されている
- [ ] **SQLインジェクション**: すべてのクエリがパラメータ化されている
- [ ] **XSS**: ユーザーコンテンツがサニタイズされている
- [ ] **CSRF**: 保護が有効化されている
- [ ] **認証**: 適切なトークン処理
- [ ] **認可**: ロールチェックが適切に行われている
- [ ] **レート制限**: すべてのエンドポイントで有効化
- [ ] **HTTPS**: 本番環境で強制
- [ ] **セキュリティヘッダー**: CSP, X-Frame-Options が設定されている
- [ ] **エラーハンドリング**: エラーに機密データが含まれていない
- [ ] **ロギング**: 機密データがログ出力されていない
- [ ] **依存関係**: 最新であり、脆弱性がない
- [ ] **行レベルセキュリティ**: Supabaseで有効化されている
- [ ] **CORS**: 適切に設定されている
- [ ] **ファイルアップロード**: 検証済み (サイズ, タイプ)
- [ ] **ウォレット署名**: 検証済み (ブロックチェーンの場合)

## リソース

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/security)
- [Supabase Security](https://supabase.com/docs/guides/auth)
- [Web Security Academy](https://portswigger.net/web-security)

---

**覚えておくこと**: セキュリティはオプションではない。1つの脆弱性がプラットフォーム全体を危険にさらす可能性がある。疑わしい場合は、安全側に倒すこと。
