---
description: Playwright E2Eテストの生成、実行、デバッグ。重要なユーザーフローを検証するために使用する。
---

# E2Eテスト自動化

`tests/e2e/` 内のPlaywrightテストを生成および実行するためのコマンド。

## 機能

1. **E2Eテスト生成** - ユーザーフローのPlaywrightテストを作成
2. **E2Eテスト実行** - ブラウザ間でテストを実行
3. **アーティファクト取得** - 失敗時のスクリーンショット、ビデオ、トレース
4. **結果アップロード** - HTMLレポートとJUnit XML
5. **Flakyテスト特定** - 不安定なテストを隔離

## 使用するタイミング

以下の場合に `/e2e` を使用する：
- 重要なユーザージャーニー (ログイン、取引、支払い) のテスト
- マルチステップフローがエンドツーエンドで機能することの検証
- UIインタラクションとナビゲーションのテスト
- フロントエンドとバックエンド間の統合検証
- 本番デプロイメントの準備

## 仕組み

e2e-runnerエージェントは以下を行う：

1. **ユーザーフロー分析** とテストシナリオの特定
2. **Playwrightテスト生成** (Page Object Modelパターンを使用)
3. **テスト実行** (複数のブラウザ: Chrome, Firefox, Safari)
4. **失敗のキャプチャ** (スクリーンショット、ビデオ、トレース)
5. **レポート生成** (結果とアーティファクト)
6. **Flakyテスト特定** と修正の推奨

## 使用例

```
User: /e2e Test the market search and view flow

Agent (e2e-runner):
# E2E Test Generation: Market Search and View Flow

## Test Scenario Identified

**User Journey:** Market Search → View Results → Click Market → View Details

**Test Coverage:**
1. Navigate to markets page
2. Perform semantic search
3. Verify search results
4. Click on first result
5. Verify market details page loads
6. Verify chart renders

## Generated Test Code

```typescript
// tests/e2e/markets/search-and-view.spec.ts
import { test, expect } from '@playwright/test'
import { MarketsPage } from '../../pages/MarketsPage'
import { MarketDetailsPage } from '../../pages/MarketDetailsPage'

test.describe('Market Search and View Flow', () => {
  test('user can search markets and view details', async ({ page }) => {
    // 1. Navigate to markets page
    const marketsPage = new MarketsPage(page)
    await marketsPage.goto()

    // Verify page loaded
    await expect(page).toHaveTitle(/Markets/)
    await expect(page.locator('h1')).toContainText('Markets')

    // 2. Perform semantic search
    await marketsPage.searchMarkets('election')

    // Wait for API response
    await page.waitForResponse(resp =>
      resp.url().includes('/api/markets/search') && resp.status() === 200
    )

    // 3. Verify search results
    const marketCards = marketsPage.marketCards
    await expect(marketCards.first()).toBeVisible()
    const resultCount = await marketCards.count()
    expect(resultCount).toBeGreaterThan(0)

    // Take screenshot of search results
    await page.screenshot({ path: 'artifacts/search-results.png' })

    // 4. Click on first result
    const firstMarketTitle = await marketCards.first().textContent()
    await marketCards.first().click()

    // 5. Verify market details page loads
    await expect(page).toHaveURL(/\/markets\/[a-z0-9-]+/)

    const detailsPage = new MarketDetailsPage(page)
    await expect(detailsPage.marketName).toBeVisible()
    await expect(detailsPage.marketDescription).toBeVisible()

    // 6. Verify chart renders
    await expect(detailsPage.priceChart).toBeVisible()

    // Verify market name matches
    const detailsTitle = await detailsPage.marketName.textContent()
    expect(detailsTitle?.toLowerCase()).toContain(
      firstMarketTitle?.toLowerCase().substring(0, 20) || ''
    )

    // Take screenshot of market details
    await page.screenshot({ path: 'artifacts/market-details.png' })
  })

  test('search with no results shows empty state', async ({ page }) => {
    const marketsPage = new MarketsPage(page)
    await marketsPage.goto()

    // Search for non-existent market
    await marketsPage.searchMarkets('xyznonexistentmarket123456')

    // Verify empty state
    await expect(page.locator('[data-testid="no-results"]')).toBeVisible()
    await expect(page.locator('[data-testid="no-results"]')).toContainText(
      /no.*results|no.*markets/i
    )

    const marketCount = await marketsPage.marketCards.count()
    expect(marketCount).toBe(0)
  })

  test('can clear search and see all markets again', async ({ page }) => {
    const marketsPage = new MarketsPage(page)
    await marketsPage.goto()

    // Initial market count
    const initialCount = await marketsPage.marketCards.count()

    // Perform search
    await marketsPage.searchMarkets('trump')
    await page.waitForLoadState('networkidle')

    // Verify filtered results
    const filteredCount = await marketsPage.marketCards.count()
    expect(filteredCount).toBeLessThan(initialCount)

    // Clear search
    await marketsPage.searchInput.clear()
    await page.waitForLoadState('networkidle')

    // Verify all markets shown again
    const finalCount = await marketsPage.marketCards.count()
    expect(finalCount).toBe(initialCount)
  })
})
```

## Running Tests

```bash
# Run the generated test
npx playwright test tests/e2e/markets/search-and-view.spec.ts

Running 3 tests using 3 workers

  ✓  [chromium] › search-and-view.spec.ts:5:3 › user can search markets and view details (4.2s)
  ✓  [chromium] › search-and-view.spec.ts:52:3 › search with no results shows empty state (1.8s)
  ✓  [chromium] › search-and-view.spec.ts:67:3 › can clear search and see all markets again (2.9s)

  3 passed (9.1s)

Artifacts generated:
- artifacts/search-results.png
- artifacts/market-details.png
- playwright-report/index.html
```

## Test Report

```
╔══════════════════════════════════════════════════════════════╗
║                    E2E Test Results                          ║
╠══════════════════════════════════════════════════════════════╣
║ Status:     PASS: ALL TESTS PASSED                              ║
║ Total:      3 tests                                          ║
║ Passed:     3 (100%)                                         ║
║ Failed:     0                                                ║
║ Flaky:      0                                                ║
║ Duration:   9.1s                                             ║
╚══════════════════════════════════════════════════════════════╝

Artifacts:
 Screenshots: 2 files
 Videos: 0 files (only on failure)
 Traces: 0 files (only on failure)
 HTML Report: playwright-report/index.html

View report: npx playwright show-report
```

PASS: E2E test suite ready for CI/CD integration!
```

## テストアーティファクト

テスト実行時、以下のアーティファクトがキャプチャされる：

**すべてのテスト:**
- タイムラインと結果を含むHTMLレポート
- CI統合用JUnit XML

**失敗時のみ:**
- 失敗状態のスクリーンショット
- テストのビデオ録画
- デバッグ用トレースファイル (ステップバイステップリプレイ)
- ネットワークログ
- コンソールログ

## アーティファクトの表示

```bash
# ブラウザでHTMLレポートを表示
npx playwright show-report

# 特定のトレースファイルを表示
npx playwright show-trace artifacts/trace-abc123.zip

# スクリーンショットは artifacts/ ディレクトリに保存される
open artifacts/search-results.png
```

## Flakyテスト検出

テストが断続的に失敗する場合：

```
WARNING:  FLAKY TEST DETECTED: tests/e2e/markets/trade.spec.ts

Test passed 7/10 runs (70% pass rate)

Common failure:
"Timeout waiting for element '[data-testid="confirm-btn"]'"

Recommended fixes:
1. Add explicit wait: await page.waitForSelector('[data-testid="confirm-btn"]')
2. Increase timeout: { timeout: 10000 }
3. Check for race conditions in component
4. Verify element is not hidden by animation

Quarantine recommendation: Mark as test.fixme() until fixed
```

## ブラウザ設定

デフォルトで複数のブラウザでテストが実行される：
- PASS: Chromium (Desktop Chrome)
- PASS: Firefox (Desktop)
- PASS: WebKit (Desktop Safari)
- PASS: Mobile Chrome (optional)

`playwright.config.ts` でブラウザを調整する。

## CI/CD統合

CIパイプラインに追加：

```yaml
# .github/workflows/e2e.yml
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run E2E tests
  run: npx playwright test

- name: Upload artifacts
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## PMX固有の重要フロー

PMXの場合、以下のE2Eテストを優先する：

**CRITICAL (常にパス必須):**
1. ユーザーはウォレットを接続できる
2. ユーザーは市場を閲覧できる
3. ユーザーは市場を検索できる (セマンティック検索)
4. ユーザーは市場の詳細を表示できる
5. ユーザーは取引を行える (テスト資金を使用)
6. 市場が正しく解決される
7. ユーザーは資金を引き出せる

**IMPORTANT (重要):**
1. 市場作成フロー
2. ユーザープロフィール更新
3. リアルタイム価格更新
4. チャートレンダリング
5. 市場のフィルタリングとソート
6. モバイルレスポンシブレイアウト

## ベストプラクティス

**行うべきこと (DO):**
- PASS: 保守性のためにPage Object Modelを使用する
- PASS: セレクタには `data-testid` 属性を使用する
- PASS: 任意のタイムアウトではなく、APIレスポンスを待つ
- PASS: 重要なユーザージャーニーをエンドツーエンドでテストする
- PASS: mainへのマージ前にテストを実行する
- PASS: テスト失敗時にアーティファクトをレビューする

**行ってはいけないこと (DON'T):**
- FAIL: 壊れやすいセレクタを使用しない (CSSクラスは変更される可能性がある)
- FAIL: 実装の詳細をテストしない
- FAIL: 本番環境に対してテストを実行しない
- FAIL: Flakyテストを無視しない
- FAIL: 失敗時のアーティファクトレビューをスキップしない
- FAIL: すべてのエッジケースをE2Eでテストしない (単体テストを使用する)

## 重要な注意点

**CRITICAL for PMX:**
- リアルマネーを含むE2Eテストは、必ず testnet/staging でのみ実行すること
- 決して本番環境に対して取引テストを実行しないこと
- 金融テストには `test.skip(process.env.NODE_ENV === 'production')` を設定すること
- 少額のテスト資金を持つテストウォレットのみを使用すること

## 他のコマンドとの統合

- `/plan` を使用してテストすべき重要なジャーニーを特定する
- `/tdd` を使用して単体テストを行う (より高速、より詳細)
- `/e2e` を使用して統合およびユーザージャーニーテストを行う
- `/code-review` を使用してテスト品質を検証する

## 関連エージェント

このコマンドは以下に位置する `e2e-runner` エージェントを呼び出す：
`~/.claude/agents/e2e-runner.md`

## クイックコマンド

```bash
# すべてのE2Eテストを実行
npx playwright test

# 特定のテストファイルを実行
npx playwright test tests/e2e/markets/search.spec.ts

# ヘッドレスなしモードで実行 (ブラウザを表示)
npx playwright test --headed

# テストをデバッグ
npx playwright test --debug

# テストコード生成
npx playwright codegen http://localhost:3000

# レポート表示
npx playwright show-report
```
