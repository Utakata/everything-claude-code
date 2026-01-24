---
name: tdd-workflow
description: 新機能の作成、バグ修正、またはコードのリファクタリングの際にこのスキルを使用する。単体、統合、およびE2Eテストを含む80%以上のカバレッジを持つテスト駆動開発を強制する。
---

# テスト駆動開発 (TDD) ワークフロー

このスキルは、すべてのコード開発が包括的なテストカバレッジを伴うTDD原則に従うことを保証する。

## アクティブにするタイミング

- 新機能や機能性の作成
- バグや問題の修正
- 既存コードのリファクタリング
- APIエンドポイントの追加
- 新しいコンポーネントの作成

## コア原則

### 1. コードの前にテスト
常にテストを最初に書き、次にテストをパスさせるためのコードを実装する。

### 2. カバレッジ要件
- 最低80%のカバレッジ (単体 + 統合 + E2E)
- すべてのエッジケースがカバーされている
- エラーシナリオがテストされている
- 境界条件が検証されている

### 3. テストタイプ

#### 単体テスト (Unit Tests)
- 個々の関数とユーティリティ
- コンポーネントロジック
- 純粋関数
- ヘルパーとユーティリティ

#### 統合テスト (Integration Tests)
- APIエンドポイント
- データベース操作
- サービス間の相互作用
- 外部API呼び出し

#### E2Eテスト (Playwright)
- 重要なユーザーフロー
- 完全なワークフロー
- ブラウザ自動化
- UIインタラクション

## TDDワークフローのステップ

### ステップ 1: ユーザージャーニーを書く
```
[役割] として、[アクション] をしたい、それによって [メリット] を得たい

例:
ユーザーとして、セマンティックに市場を検索したい、
それによって、正確なキーワードがなくても関連する市場を見つけられるようにしたい。
```

### ステップ 2: テストケースを生成する
各ユーザージャーニーについて、包括的なテストケースを作成する：

```typescript
describe('Semantic Search', () => {
  it('returns relevant markets for query', async () => {
    // Test implementation
  })

  it('handles empty query gracefully', async () => {
    // Test edge case
  })

  it('falls back to substring search when Redis unavailable', async () => {
    // Test fallback behavior
  })

  it('sorts results by similarity score', async () => {
    // Test sorting logic
  })
})
```

### ステップ 3: テストを実行する (失敗するはず)
```bash
npm test
# Tests should fail - we haven't implemented yet
```

### ステップ 4: コードを実装する
テストをパスさせるための最小限のコードを書く：

```typescript
// Implementation guided by tests
export async function searchMarkets(query: string) {
  // Implementation here
}
```

### ステップ 5: テストを再度実行する
```bash
npm test
# Tests should now pass
```

### ステップ 6: リファクタリング
テストをグリーンのままコード品質を向上させる：
- 重複を削除
- 命名を改善
- パフォーマンスを最適化
- 可読性を向上

### ステップ 7: カバレッジを検証
```bash
npm run test:coverage
# Verify 80%+ coverage achieved
```

## テストパターン

### 単体テストパターン (Jest/Vitest)
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    fireEvent.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### API統合テストパターン
```typescript
import { NextRequest } from 'next/server'
import { GET } from './route'

describe('GET /api/markets', () => {
  it('returns markets successfully', async () => {
    const request = new NextRequest('http://localhost/api/markets')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(Array.isArray(data.data)).toBe(true)
  })

  it('validates query parameters', async () => {
    const request = new NextRequest('http://localhost/api/markets?limit=invalid')
    const response = await GET(request)

    expect(response.status).toBe(400)
  })

  it('handles database errors gracefully', async () => {
    // Mock database failure
    const request = new NextRequest('http://localhost/api/markets')
    // Test error handling
  })
})
```

### E2Eテストパターン (Playwright)
```typescript
import { test, expect } from '@playwright/test'

test('user can search and filter markets', async ({ page }) => {
  // Navigate to markets page
  await page.goto('/')
  await page.click('a[href="/markets"]')

  // Verify page loaded
  await expect(page.locator('h1')).toContainText('Markets')

  // Search for markets
  await page.fill('input[placeholder="Search markets"]', 'election')

  // Wait for debounce and results
  await page.waitForTimeout(600)

  // Verify search results displayed
  const results = page.locator('[data-testid="market-card"]')
  await expect(results).toHaveCount(5, { timeout: 5000 })

  // Verify results contain search term
  const firstResult = results.first()
  await expect(firstResult).toContainText('election', { ignoreCase: true })

  // Filter by status
  await page.click('button:has-text("Active")')

  // Verify filtered results
  await expect(results).toHaveCount(3)
})

test('user can create a new market', async ({ page }) => {
  // Login first
  await page.goto('/creator-dashboard')

  // Fill market creation form
  await page.fill('input[name="name"]', 'Test Market')
  await page.fill('textarea[name="description"]', 'Test description')
  await page.fill('input[name="endDate"]', '2025-12-31')

  // Submit form
  await page.click('button[type="submit"]')

  // Verify success message
  await expect(page.locator('text=Market created successfully')).toBeVisible()

  // Verify redirect to market page
  await expect(page).toHaveURL(/\/markets\/test-market/)
})
```

## テストファイル構成

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx          # Unit tests
│   │   └── Button.stories.tsx       # Storybook
│   └── MarketCard/
│       ├── MarketCard.tsx
│       └── MarketCard.test.tsx
├── app/
│   └── api/
│       └── markets/
│           ├── route.ts
│           └── route.test.ts         # Integration tests
└── e2e/
    ├── markets.spec.ts               # E2E tests
    ├── trading.spec.ts
    └── auth.spec.ts
```

## 外部サービスのモック

### Supabase モック
```typescript
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({
          data: [{ id: 1, name: 'Test Market' }],
          error: null
        }))
      }))
    }))
  }
}))
```

### Redis モック
```typescript
jest.mock('@/lib/redis', () => ({
  searchMarketsByVector: jest.fn(() => Promise.resolve([
    { slug: 'test-market', similarity_score: 0.95 }
  ])),
  checkRedisHealth: jest.fn(() => Promise.resolve({ connected: true }))
}))
```

### OpenAI モック
```typescript
jest.mock('@/lib/openai', () => ({
  generateEmbedding: jest.fn(() => Promise.resolve(
    new Array(1536).fill(0.1) // Mock 1536-dim embedding
  ))
}))
```

## テストカバレッジ検証

### カバレッジレポート実行
```bash
npm run test:coverage
```

### カバレッジしきい値
```json
{
  "jest": {
    "coverageThresholds": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## 避けるべき一般的なテストの間違い

### ❌ WRONG: 実装の詳細をテストする
```typescript
// Don't test internal state
expect(component.state.count).toBe(5)
```

### ✅ CORRECT: ユーザーに見える振る舞いをテストする
```typescript
// Test what users see
expect(screen.getByText('Count: 5')).toBeInTheDocument()
```

### ❌ WRONG: 壊れやすいセレクタ
```typescript
// Breaks easily
await page.click('.css-class-xyz')
```

### ✅ CORRECT: セマンティックセレクタ
```typescript
// Resilient to changes
await page.click('button:has-text("Submit")')
await page.click('[data-testid="submit-button"]')
```

### ❌ WRONG: テストの分離がない
```typescript
// Tests depend on each other
test('creates user', () => { /* ... */ })
test('updates same user', () => { /* depends on previous test */ })
```

### ✅ CORRECT: 独立したテスト
```typescript
// Each test sets up its own data
test('creates user', () => {
  const user = createTestUser()
  // Test logic
})

test('updates user', () => {
  const user = createTestUser()
  // Update logic
})
```

## 継続的テスト

### 開発中のウォッチモード
```bash
npm test -- --watch
# Tests run automatically on file changes
```

### プレコミットフック
```bash
# Runs before every commit
npm test && npm run lint
```

### CI/CD統合
```yaml
# GitHub Actions
- name: Run Tests
  run: npm test -- --coverage
- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

## ベストプラクティス

1. **テストを最初に書く** - 常にTDD
2. **テストごとに1つのアサーション** - 単一の振る舞いに焦点を当てる
3. **説明的なテスト名** - 何がテストされているか説明する
4. **Arrange-Act-Assert** - 明確なテスト構造
5. **外部依存関係のモック** - 単体テストを隔離する
6. **エッジケースのテスト** - Null, undefined, empty, large
7. **エラーパスのテスト** - ハッピーパスだけでなく
8. **テストを高速に保つ** - 単体テストは各50ms未満
9. **テスト後のクリーンアップ** - 副作用なし
10. **カバレッジレポートのレビュー** - ギャップを特定する

## 成功基準

- 80%以上のコードカバレッジ達成
- すべてのテストがパス (グリーン)
- スキップまたは無効化されたテストがない
- 高速なテスト実行 (単体テスト < 30秒)
- E2Eテストが重要なユーザーフローをカバーしている
- テストが本番前にバグを捕捉する

---

**覚えておくこと**: テストはオプションではない。それは確信を持ったリファクタリング、迅速な開発、そして本番環境の信頼性を可能にするセーフティネットである。
