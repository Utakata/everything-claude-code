---
description: テスト駆動開発セッションを開始する。インターフェースを定義し、レッド・グリーン・リファクターのサイクルを通じて実装をガイドする。
---

# TDDコマンド

このコマンドは **tdd-guide** エージェントを呼び出し、テスト駆動開発を使用して機能の実装やバグ修正を行うのを支援する。

## このコマンドが行うこと

1. **インターフェース定義** - 入力/出力のタイプを作成する
2. **失敗するテストを作成 (RED)** - 機能を実装する前にテストを書く
3. **テスト実行** - テストが（機能未実装のため）失敗することを確認する
4. **最小限の実装を作成 (GREEN)** - テストをパスさせるためのコードを書く
5. **テスト実行** - テストがパスすることを確認する
6. **リファクタリング** - テストをグリーンのままコードを改善する
7. **カバレッジ確認** - 80%以上のテストカバレッジを保証する

## 使用するタイミング

以下の場合に `/tdd` を使用する：
- 新機能を実装する時
- 新しい関数/コンポーネントを追加する時
- バグを修正する時 (まずバグを再現するテストを書く)
- 既存のコードをリファクタリングする時
- 重要なビジネスロジックを構築する時

## 仕組み

tdd-guideエージェントは以下を行う：

1. 入力/出力の **インターフェースを定義** する
2. **失敗するテストを作成** する (コードがまだ存在しないため)
3. **テストを実行** し、正しい理由で失敗することを確認する
4. テストをパスさせるための **最小限の実装を作成** する
5. **テストを実行** し、パスすることを確認する
6. テストをグリーンのままコードを **リファクタリング** する
7. **カバレッジをチェック** し、80%未満の場合はテストを追加する

## TDDサイクル

```
RED → GREEN → REFACTOR → REPEAT

RED:      失敗するテストを書く
GREEN:    パスするための最小限のコードを書く
REFACTOR: コードを改善し、テスト通過を維持する
REPEAT:   次の機能/シナリオへ
```

## 使用例

```
User: /tdd I need a function to calculate market liquidity score

Agent (tdd-guide):
# TDD Session: Market Liquidity Score Calculator

## Step 1: Define Interface (SCAFFOLD)

```typescript
// lib/liquidity.ts
export interface MarketData {
  totalVolume: number
  bidAskSpread: number
  activeTraders: number
  lastTradeTime: Date
}

export function calculateLiquidityScore(market: MarketData): number {
  // TODO: Implementation
  throw new Error('Not implemented')
}
```

## Step 2: Write Failing Test (RED)

```typescript
// lib/liquidity.test.ts
import { calculateLiquidityScore } from './liquidity'

describe('calculateLiquidityScore', () => {
  it('should return high score for liquid market', () => {
    const market = {
      totalVolume: 100000,
      bidAskSpread: 0.01,
      activeTraders: 500,
      lastTradeTime: new Date()
    }

    const score = calculateLiquidityScore(market)

    expect(score).toBeGreaterThan(80)
    expect(score).toBeLessThanOrEqual(100)
  })

  it('should return low score for illiquid market', () => {
    const market = {
      totalVolume: 100,
      bidAskSpread: 0.5,
      activeTraders: 2,
      lastTradeTime: new Date(Date.now() - 86400000) // 1 day ago
    }

    const score = calculateLiquidityScore(market)

    expect(score).toBeLessThan(30)
    expect(score).toBeGreaterThanOrEqual(0)
  })

  it('should handle edge case: zero volume', () => {
    const market = {
      totalVolume: 0,
      bidAskSpread: 0,
      activeTraders: 0,
      lastTradeTime: new Date()
    }

    const score = calculateLiquidityScore(market)

    expect(score).toBe(0)
  })
})
```

## Step 3: Run Tests - Verify FAIL

```bash
npm test lib/liquidity.test.ts

FAIL lib/liquidity.test.ts
  ✕ should return high score for liquid market (2 ms)
    Error: Not implemented

1 test failed, 0 passed
```

PASS: Tests fail as expected. Ready to implement.

## Step 4: Implement Minimal Code (GREEN)

```typescript
// lib/liquidity.ts
export function calculateLiquidityScore(market: MarketData): number {
  // Handle zero volume edge case
  if (market.totalVolume === 0) {
    return 0
  }

  // Calculate component scores (0-100 scale)
  const volumeScore = Math.min(market.totalVolume / 1000, 100)
  const spreadScore = Math.max(100 - (market.bidAskSpread * 1000), 0)
  const traderScore = Math.min(market.activeTraders / 10, 100)

  // Recent activity bonus
  const hoursSinceLastTrade = (Date.now() - market.lastTradeTime.getTime()) / (1000 * 60 * 60)
  const recencyScore = Math.max(100 - (hoursSinceLastTrade * 10), 0)

  // Weighted average
  const score = (
    volumeScore * 0.4 +
    spreadScore * 0.3 +
    traderScore * 0.2 +
    recencyScore * 0.1
  )

  return Math.min(Math.max(score, 0), 100) // Clamp to 0-100
}
```

## Step 5: Run Tests - Verify PASS

```bash
npm test lib/liquidity.test.ts

PASS lib/liquidity.test.ts
  ✓ should return high score for liquid market (3 ms)
  ✓ should return low score for illiquid market (2 ms)
  ✓ should handle edge case: zero volume (1 ms)

3 tests passed
```

PASS: All tests passing!

## Step 6: Refactor (IMPROVE)

```typescript
// lib/liquidity.ts - Refactored with constants and better readability
const WEIGHTS = {
  VOLUME: 0.4,
  SPREAD: 0.3,
  TRADERS: 0.2,
  RECENCY: 0.1,
} as const

const SCALE_FACTORS = {
  VOLUME: 1000,
  SPREAD: 1000,
  TRADERS: 10,
  RECENCY_PENALTY: 10,
} as const

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function calculateLiquidityScore(market: MarketData): number {
  if (market.totalVolume === 0) return 0

  const volumeScore = Math.min(market.totalVolume / SCALE_FACTORS.VOLUME, 100)
  const spreadScore = clamp(100 - (market.bidAskSpread * SCALE_FACTORS.SPREAD), 0, 100)
  const traderScore = Math.min(market.activeTraders / SCALE_FACTORS.TRADERS, 100)

  const hoursSinceLastTrade = (Date.now() - market.lastTradeTime.getTime()) / (1000 * 60 * 60)
  const recencyScore = clamp(100 - (hoursSinceLastTrade * SCALE_FACTORS.RECENCY_PENALTY), 0, 100)

  const weightedScore =
    volumeScore * WEIGHTS.VOLUME +
    spreadScore * WEIGHTS.SPREAD +
    traderScore * WEIGHTS.TRADERS +
    recencyScore * WEIGHTS.RECENCY

  return clamp(weightedScore, 0, 100)
}
```

## Step 7: Verify Tests Still Pass

```bash
npm test lib/liquidity.test.ts

PASS lib/liquidity.test.ts
  ✓ should return high score for liquid market (3 ms)
  ✓ should return low score for illiquid market (2 ms)
  ✓ should handle edge case: zero volume (1 ms)

3 tests passed
```

PASS: Refactoring complete, tests still passing!

## Step 8: Check Coverage

```bash
npm test -- --coverage lib/liquidity.test.ts

File           | % Stmts | % Branch | % Funcs | % Lines
---------------|---------|----------|---------|--------
liquidity.ts   |   100   |   100    |   100   |   100

Coverage: 100% PASS: (Target: 80%)
```

PASS: TDD session complete!
```

## TDDベストプラクティス

**行うべきこと (DO):**
- PASS: 実装の前に、必ず最初にテストを書く (FIRST)
- PASS: 実装前にテストを実行し、失敗することを確認する
- PASS: テストをパスさせるための最小限のコードを書く
- PASS: テストがグリーンの状態でのみリファクタリングする
- PASS: エッジケースとエラーシナリオを追加する
- PASS: 80%以上のカバレッジを目指す (重要なコードは100%)

**行ってはいけないこと (DON'T):**
- FAIL: テストの前に実装を書かない
- FAIL: 変更のたびにテストを実行するのをスキップしない
- FAIL: 一度に大量のコードを書かない
- FAIL: 失敗しているテストを無視しない
- FAIL: 実装の詳細をテストしない (振る舞いをテストする)
- FAIL: すべてをモックしない (統合テストを好む)

## 含めるべきテストの種類

**単体テスト (Unit Tests)** (関数レベル):
- ハッピーパスシナリオ
- エッジケース (空、null、最大値)
- エラー条件
- 境界値

**統合テスト (Integration Tests)** (コンポーネントレベル):
- APIエンドポイント
- データベース操作
- 外部サービス呼び出し
- フックを持つReactコンポーネント

**E2Eテスト (E2E Tests)** (`/e2e` コマンドを使用):
- 重要なユーザーフロー
- マルチステッププロセス
- フルスタック統合

## カバレッジ要件

- すべてのコードで **最低80%**
- 以下の場合 **100%必須**:
  - 金融計算
  - 認証ロジック
  - セキュリティクリティカルなコード
  - コアビジネスロジック

## 重要な注意点

**必須 (MANDATORY)**: テストは実装の前に書かれなければならない。TDDサイクルは以下の通り：

1. **RED** - 失敗するテストを書く
2. **GREEN** - パスするように実装する
3. **REFACTOR** - コードを改善する

REDフェーズを決してスキップしないこと。テストの前に決してコードを書かないこと。

## 他のコマンドとの統合

- 何を構築するか理解するために最初に `/plan` を使用する
- テスト付きで実装するために `/tdd` を使用する
- ビルドエラーが発生した場合は `/build-fix` を使用する
- 実装をレビューするために `/code-review` を使用する
- カバレッジを検証するために `/test-coverage` を使用する

## 関連エージェント

このコマンドは以下に位置する `tdd-guide` エージェントを呼び出す：
`~/.claude/agents/tdd-guide.md`

また、以下の `tdd-workflow` スキルを参照できる：
`~/.claude/skills/tdd-workflow/`
