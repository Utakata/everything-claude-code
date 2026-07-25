# プロジェクトガイドラインテンプレート

これは、以前はライブの ECC スキルとして出荷されていた、プロジェクト固有のスキルテンプレートです。

再利用可能なクロスプロジェクトスキルではなく、リファレンス素材であるため、現在は `docs/examples/` に存在します。

これはプロジェクト固有のスキルの例です。自分のプロジェクトのテンプレートとしてこれを使用してください。

実際のプロダクションアプリケーションに基づいています：[Zenith](https://zenith.chat) - AI 駆動の顧客発見プラットフォーム。

## 使用場面

設計対象の特定のプロジェクトで作業するときに、このスキルを参照します。プロジェクトスキルには以下が含まれます：
- アーキテクチャの概要
- ファイル構造
- コードパターン
- テスト要件
- デプロイワークフロー

---

## アーキテクチャの概要

**技術スタック：**
- **フロントエンド**：Next.js 15（App Router）、TypeScript、React
- **バックエンド**：FastAPI（Python）、Pydantic モデル
- **データベース**：Supabase（PostgreSQL）
- **AI**：ツール呼び出しと構造化出力を備えた Claude API
- **デプロイ**：Google Cloud Run
- **テスト**：Playwright（E2E）、pytest（バックエンド）、React Testing Library

**サービス：**
```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  Next.js 15 + TypeScript + TailwindCSS                     │
│  Deployed: Vercel / Cloud Run                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         Backend                             │
│  FastAPI + Python 3.11 + Pydantic                          │
│  Deployed: Cloud Run                                       │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │ Supabase │   │  Claude  │   │  Redis   │
        │ Database │   │   API    │   │  Cache   │
        └──────────┘   └──────────┘   └──────────┘
```

---

## ファイル構造

```
project/
├── frontend/
│   └── src/
│       ├── app/              # Next.js app router pages
│       │   ├── api/          # API routes
│       │   ├── (auth)/       # Auth-protected routes
│       │   └── workspace/    # Main app workspace
│       ├── components/       # React components
│       │   ├── ui/           # Base UI components
│       │   ├── forms/        # Form components
│       │   └── layouts/      # Layout components
│       ├── hooks/            # Custom React hooks
│       ├── lib/              # Utilities
│       ├── types/            # TypeScript definitions
│       └── config/           # Configuration
│
├── backend/
│   ├── routers/              # FastAPI route handlers
│   ├── models.py             # Pydantic models
│   ├── main.py               # FastAPI app entry
│   ├── auth_system.py        # Authentication
│   ├── database.py           # Database operations
│   ├── services/             # Business logic
│   └── tests/                # pytest tests
│
├── deploy/                   # Deployment configs
├── docs/                     # Documentation
└── scripts/                  # Utility scripts
```

---

## コードパターン

### API レスポンス形式（FastAPI）

```python
from pydantic import BaseModel
from typing import Generic, TypeVar, Optional

T = TypeVar('T')

class ApiResponse(BaseModel, Generic[T]):
    success: bool
    data: Optional[T] = None
    error: Optional[str] = None

    @classmethod
    def ok(cls, data: T) -> "ApiResponse[T]":
        return cls(success=True, data=data)

    @classmethod
    def fail(cls, error: str) -> "ApiResponse[T]":
        return cls(success=False, error=error)
```

### フロントエンドの API 呼び出し（TypeScript）

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` }
    }

    return await response.json()
  } catch (error) {
    return { success: false, error: String(error) }
  }
}
```

### Claude AI 統合（構造化出力）

```python
from anthropic import Anthropic
from pydantic import BaseModel

class AnalysisResult(BaseModel):
    summary: str
    key_points: list[str]
    confidence: float

async def analyze_with_claude(content: str) -> AnalysisResult:
    client = Anthropic()

    response = client.messages.create(
        model="claude-sonnet-4-5-20250514",
        max_tokens=1024,
        messages=[{"role": "user", "content": content}],
        tools=[{
            "name": "provide_analysis",
            "description": "Provide structured analysis",
            "input_schema": AnalysisResult.model_json_schema()
        }],
        tool_choice={"type": "tool", "name": "provide_analysis"}
    )

    # ツール使用の結果を抽出
    tool_use = next(
        block for block in response.content
        if block.type == "tool_use"
    )

    return AnalysisResult(**tool_use.input)
```

### カスタムフック（React）

```typescript
import { useState, useCallback } from 'react'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(
  fetchFn: () => Promise<ApiResponse<T>>
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    const result = await fetchFn()

    if (result.success) {
      setState({ data: result.data!, loading: false, error: null })
    } else {
      setState({ data: null, loading: false, error: result.error! })
    }
  }, [fetchFn])

  return { ...state, execute }
}
```

---

## テスト要件

### バックエンド（pytest）

```bash
# すべてのテストを実行
poetry run pytest tests/

# カバレッジ付きで実行
poetry run pytest tests/ --cov=. --cov-report=html

# 特定のテストファイルを実行
poetry run pytest tests/test_auth.py -v
```

**テスト構造：**
```python
import pytest
from httpx import AsyncClient
from main import app

@pytest.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
```

### フロントエンド（React Testing Library）

```bash
# テストを実行
npm run test

# カバレッジ付きで実行
npm run test -- --coverage

# E2E テストを実行
npm run test:e2e
```

**テスト構造：**
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { WorkspacePanel } from './WorkspacePanel'

describe('WorkspacePanel', () => {
  it('renders workspace correctly', () => {
    render(<WorkspacePanel />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('handles session creation', async () => {
    render(<WorkspacePanel />)
    fireEvent.click(screen.getByText('New Session'))
    expect(await screen.findByText('Session created')).toBeInTheDocument()
  })
})
```

---

## デプロイワークフロー

### デプロイ前チェックリスト

- [ ] すべてのテストがローカルで合格
- [ ] `npm run build` が成功（フロントエンド）
- [ ] `poetry run pytest` が合格（バックエンド）
- [ ] ハードコードされたシークレットなし
- [ ] 環境変数が文書化されている
- [ ] データベースマイグレーションの準備ができている

### デプロイコマンド

```bash
# フロントエンドをビルドしてデプロイ
cd frontend && npm run build
gcloud run deploy frontend --source .

# バックエンドをビルドしてデプロイ
cd backend
gcloud run deploy backend --source .
```

### 環境変数

```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Backend (.env)
DATABASE_URL=postgresql://...
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJ...
```

---

## 重要なルール

1. コード、コメント、ドキュメントに **絵文字なし**
2. **不変性** - オブジェクトや配列を決して変更しない
3. **TDD** - 実装の前にテストを書く
4. **80% カバレッジ** 最低限
5. **多数の小さなファイル** - 200〜400 行が典型、最大 800
6. プロダクションコードに **console.log なし**
7. try/catch による **適切なエラー処理**
8. Pydantic/Zod による **入力検証**

---

## 関連スキル

- `coding-standards.md` - 一般的なコーディングのベストプラクティス
- `backend-patterns.md` - API とデータベースのパターン
- `frontend-patterns.md` - React と Next.js のパターン
- `tdd-workflow/` - テスト駆動開発の方法論
