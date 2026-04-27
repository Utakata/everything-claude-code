---
name: frontend-patterns
description: Next.js App Router、React Server Components、クライアントサイドのインタラクティビティ、および最新のWeb UI開発のためのフロントエンドアーキテクチャパターン。
---

# フロントエンド開発パターン

スケーラブルなフロントエンドアプリケーションのためのアーキテクチャパターンとベストプラクティス。

## Next.js App Router パターン

### サーバーコンポーネントとクライアントコンポーネント

```typescript
// PASS: Server Component (Default) - Data Fetching
// app/markets/page.tsx
export default async function MarketsPage() {
  const markets = await getMarkets() // Direct DB/API call

  return (
    <div className="p-4">
      <h1>Markets</h1>
      <MarketsList initialData={markets} />
    </div>
  )
}

// PASS: Client Component - Interactivity
// components/MarketsList.tsx
'use client'

import { useState } from 'react'

export function MarketsList({ initialData }) {
  const [markets, setMarkets] = useState(initialData)
  // ... interactive logic
}
```

### コンポーネント合成 (Composition)

```typescript
// PASS: Pass Server Component to Client Component
// ClientWrapper.tsx
'use client'

export function ClientWrapper({ children }) {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      {children} {/* Server Component renders here */}
    </div>
  )
}

// page.tsx
export default function Page() {
  return (
    <ClientWrapper>
      <ServerComponent /> {/* This runs on server */}
    </ClientWrapper>
  )
}
```

### データ取得パターン

```typescript
// PASS: Parallel Data Fetching
async function Dashboard() {
  const userPromise = getUser()
  const statsPromise = getStats()
  const eventsPromise = getEvents()

  // Start all requests simultaneously
  const [user, stats, events] = await Promise.all([
    userPromise,
    statsPromise,
    eventsPromise
  ])

  return <DashboardUI user={user} stats={stats} events={events} />
}

// PASS: Streaming with Suspense
import { Suspense } from 'react'

export default function Page() {
  return (
    <section>
      <h1>Dashboard</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowComponent />
      </Suspense>
    </section>
  )
}
```

## Reactパターン

### コンテナ/プレゼンテーション (修正版)

現代のReactでは、フックを使用してロジックを分離する：

```typescript
// PASS: Custom Hook for Logic (Container)
function useMarketData(marketId: string) {
  const { data, error, isLoading } = useSWR(`/api/markets/${marketId}`)

  const placeTrade = async (amount: number) => {
    // Trade logic
  }

  return { market: data, isLoading, error, placeTrade }
}

// PASS: UI Component (Presentation)
function MarketView({ marketId }) {
  const { market, isLoading, placeTrade } = useMarketData(marketId)

  if (isLoading) return <Spinner />

  return (
    <div>
      <h1>{market.name}</h1>
      <TradeButton onTrade={placeTrade} />
    </div>
  )
}
```

### 複合コンポーネント (Compound Components)

```typescript
// PASS: Flexible Parent/Child Components
import { createContext, useContext } from 'react'

const ToggleContext = createContext()

function Toggle({ children }) {
  const [on, setOn] = useState(false)
  const toggle = () => setOn(!on)
  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  )
}

Toggle.On = ({ children }) => {
  const { on } = useContext(ToggleContext)
  return on ? children : null
}

Toggle.Off = ({ children }) => {
  const { on } = useContext(ToggleContext)
  return on ? null : children
}

Toggle.Button = () => {
  const { on, toggle } = useContext(ToggleContext)
  return <button onClick={toggle}>{on ? 'On' : 'Off'}</button>
}

// Usage
<Toggle>
  <Toggle.On>The button is on</Toggle.On>
  <Toggle.Off>The button is off</Toggle.Off>
  <Toggle.Button />
</Toggle>
```

### プロップゲッター (Prop Getters)

```typescript
// PASS: Prop Collections for Complex Components
function useToggle() {
  const [on, setOn] = useState(false)
  const toggle = () => setOn(!on)

  const getTogglerProps = ({ onClick, ...props } = {}) => ({
    'aria-pressed': on,
    onClick: (e) => {
      toggle()
      onClick && onClick(e)
    },
    ...props,
  })

  return { on, toggle, getTogglerProps }
}

// Usage
function App() {
  const { getTogglerProps } = useToggle()
  return <button {...getTogglerProps()}>Click me</button>
}
```

## 状態管理

### URL状態 (信頼できる情報源)

```typescript
// PASS: Use URL query params as state
'use client'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

function SearchBar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <input
      defaultValue={searchParams.get('query')?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
    />
  )
}
```

### サーバー状態 (React Query / SWR)

```typescript
// PASS: SWR for async data
import useSWR from 'swr'

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return <div>Hello {data.name}!</div>
}
```

### グローバル状態 (Zustand)

```typescript
// PASS: Simple global store
import { create } from 'zustand'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useStore = create<BearState>((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))

// Usage in component
function Controls() {
  const increase = useStore((state) => state.increase)
  return <button onClick={() => increase(1)}>One up</button>
}
```

## パフォーマンスパターン

### 画像最適化

```typescript
// PASS: Use Next.js Image Component
import Image from 'next/image'

export function Avatar({ url }) {
  return (
    <Image
      src={url}
      alt="User avatar"
      width={64}
      height={64}
      className="rounded-full"
      placeholder="blur" // Prevent CLS
      loading="lazy"
    />
  )
}
```

### 動的インポート

```typescript
// PASS: Lazy load heavy components
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false // Client-side only if needed
})
```

### デバウンスされたイベントハンドラ

```typescript
// PASS: Debounce rapid events (like search)
import { useDebouncedCallback } from 'use-debounce'

function Search({ onChange }) {
  const debounced = useDebouncedCallback(
    (value) => {
      onChange(value)
    },
    300 // 300ms delay
  )

  return <input onChange={(e) => debounced(e.target.value)} />
}
```

## アクセシビリティパターン

### キーボードナビゲーション

```typescript
// PASS: Handle keyboard events
function CustomDropdown({ isOpen, setIsOpen }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        setIsOpen(!isOpen)
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  return (
    <div
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      onKeyDown={handleKeyDown}
    >
      {/* Dropdown implementation */}
    </div>
  )
}
```

### フォーカス管理

```typescript
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Save currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement

      // Focus modal
      modalRef.current?.focus()
    } else {
      // Restore focus when closing
      previousFocusRef.current?.focus()
    }
  }, [isOpen])

  return isOpen ? (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={e => e.key === 'Escape' && onClose()}
    >
      {children}
    </div>
  ) : null
}
```

**覚えておくこと**: 現代のフロントエンドパターンは、保守可能で高性能なユーザーインターフェースを可能にする。プロジェクトの複雑さに合ったパターンを選択すること。
