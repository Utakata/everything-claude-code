# スキル開発ガイド

Everything Claude Code (ECC) のための効果的なスキルを作成する包括的なガイド。

## 目次

- [スキルとは？](#スキルとは)
- [スキルアーキテクチャ](#スキルアーキテクチャ)
- [最初のスキルを作成する](#最初のスキルを作成する)
- [スキルカテゴリ](#スキルカテゴリ)
- [効果的なスキルコンテンツを書く](#効果的なスキルコンテンツを書く)
- [ベストプラクティス](#ベストプラクティス)
- [一般的なパターン](#一般的なパターン)
- [スキルをテストする](#スキルをテストする)
- [スキルを提出する](#スキルを提出する)
- [例のギャラリー](#例のギャラリー)

---

## スキルとは？

スキルは、Claude Code がコンテキストに基づいてロードする **知識モジュール** です。以下を提供します：

- **ドメインの専門知識**：フレームワークのパターン、言語のイディオム、ベストプラクティス
- **ワークフロー定義**：一般的なタスクのためのステップバイステップのプロセス
- **リファレンス素材**：コードスニペット、チェックリスト、決定木
- **コンテキストの注入**：特定の条件が満たされたときにアクティブ化する

**エージェント**（専門のサブアシスタント）や **コマンド**（ユーザーがトリガーするアクション）とは異なり、スキルは Claude Code が関連するときに参照する受動的な知識です。

### スキルがアクティブ化するとき

スキルは以下のときにアクティブ化します：
- ユーザーのタスクがスキルのドメインに一致する
- Claude Code が関連するコンテキストを検出する
- コマンドがスキルを参照する
- エージェントがドメイン知識を必要とする

### スキル vs エージェント vs コマンド

| コンポーネント | 目的 | アクティベーション |
|-----------|---------|------------|
| **スキル** | 知識リポジトリ | コンテキストベース（自動） |
| **エージェント** | タスク実行者 | 明示的な委譲 |
| **コマンド** | ユーザーアクション | ユーザー呼び出し（`/command`） |
| **フック** | 自動化 | イベントトリガー |
| **ルール** | 常時オンのガイドライン | 常にアクティブ |

---

## スキルアーキテクチャ

### ファイル構造

```
skills/
└── your-skill-name/
    ├── SKILL.md           # Required: Main skill definition
    ├── examples/          # Optional: Code examples
    │   ├── basic.ts
    │   └── advanced.ts
    └── references/        # Optional: External references
        └── links.md
```

### SKILL.md 形式

```markdown
---
name: skill-name
description: Brief description shown in skill list and used for auto-activation
origin: ECC
---

# Skill Title

Brief overview of what this skill covers.

## When to Activate

Describe scenarios where Claude should use this skill.

## Core Concepts

Main patterns and guidelines.

## Code Examples

\`\`\`typescript
// Practical, tested examples
\`\`\`

## Anti-Patterns

Show what NOT to do with concrete examples.

## Best Practices

- Actionable guidelines
- Do's and don'ts

## Related Skills

Link to complementary skills.
```

### YAML フロントマターのフィールド

| フィールド | 必須 | 説明 |
|-------|----------|-------------|
| `name` | はい | 小文字、ハイフン区切りの識別子（例：`react-patterns`） |
| `description` | はい | スキルリストと自動アクティベーションのための1行の説明 |
| `origin` | いいえ | ソース識別子（例：`ECC`、`community`、プロジェクト名） |
| `tags` | いいえ | 分類のためのタグの配列 |
| `version` | いいえ | 更新追跡のためのスキルバージョン |

---

## 最初のスキルを作成する

### ステップ1：フォーカスを選ぶ

良いスキルは **焦点が絞られ、実行可能** です：

| PASS: 良いフォーカス | FAIL: 広すぎる |
|---------------|--------------|
| `react-hook-patterns` | `react` |
| `postgresql-indexing` | `databases` |
| `pytest-fixtures` | `python-testing` |
| `nextjs-app-router` | `nextjs` |

### ステップ2：ディレクトリを作成する

```bash
mkdir -p skills/your-skill-name
```

### ステップ3：SKILL.md を書く

最小限のテンプレートは以下です：

```markdown
---
name: your-skill-name
description: Brief description of when to use this skill
---

# Your Skill Title

Brief overview (1-2 sentences).

## When to Activate

- Scenario 1
- Scenario 2
- Scenario 3

## Core Concepts

### Concept 1

Explanation with examples.

### Concept 2

Another pattern with code.

## Code Examples

\`\`\`typescript
// Practical example
\`\`\`

## Best Practices

- Do this
- Avoid that

## Related Skills

- `related-skill-1`
- `related-skill-2`
```

### ステップ4：コンテンツを追加する

Claude が **すぐに使える** コンテンツを書きます：

- PASS: コピー＆ペースト可能なコード例
- PASS: 明確な決定木
- PASS: 検証のためのチェックリスト
- FAIL: 例のない曖昧な説明
- FAIL: 実行可能なガイダンスのない長い散文

---

## スキルカテゴリ

### 言語標準

イディオムなコード、命名規約、言語固有のパターンに焦点を当てます。

**例：** `python-patterns`、`golang-patterns`、`typescript-standards`

```markdown
---
name: python-patterns
description: Python idioms, best practices, and patterns for clean, idiomatic code.
---

# Python Patterns

## When to Activate

- Writing Python code
- Refactoring Python modules
- Python code review

## Core Concepts

### Context Managers

\`\`\`python
# Always use context managers for resources
with open('file.txt') as f:
    content = f.read()
\`\`\`
```

### フレームワークパターン

フレームワーク固有の規約、一般的なパターン、アンチパターンに焦点を当てます。

**例：** `django-patterns`、`nextjs-patterns`、`springboot-patterns`

```markdown
---
name: django-patterns
description: Django best practices for models, views, URLs, and templates.
---

# Django Patterns

## When to Activate

- Building Django applications
- Creating models and views
- Django URL configuration
```

### ワークフロースキル

一般的な開発タスクのためのステップバイステップのプロセスを定義します。

**例：** `tdd-workflow`、`code-review-workflow`、`deployment-checklist`

```markdown
---
name: code-review-workflow
description: Systematic code review process for quality and security.
---

# Code Review Workflow

## Steps

1. **Understand Context** - Read PR description and linked issues
2. **Check Tests** - Verify test coverage and quality
3. **Review Logic** - Analyze implementation for correctness
4. **Check Security** - Look for vulnerabilities
5. **Verify Style** - Ensure code follows conventions
```

### ドメイン知識

特定のドメイン（セキュリティ、パフォーマンスなど）のための専門知識。

**例：** `security-review`、`performance-optimization`、`api-design`

```markdown
---
name: api-design
description: REST and GraphQL API design patterns, versioning, and best practices.
---

# API Design Patterns

## RESTful Conventions

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /resources | List all |
| GET | /resources/:id | Get one |
| POST | /resources | Create |
```

### ツール統合

特定のツール、ライブラリ、またはサービスを使用するためのガイダンス。

**例：** `supabase-patterns`、`docker-patterns`、`mcp-server-patterns`

---

## 効果的なスキルコンテンツを書く

### 1. 「When to Activate」から始める

このセクションは、自動アクティベーションにとって **重要** です。具体的に：

```markdown
## When to Activate

- Creating new React components
- Refactoring existing components
- Debugging React state issues
- Reviewing React code for best practices
```

### 2. 「Show, Don't Tell（語らずに示す）」を使う

悪い例：
```markdown
## Error Handling

Always handle errors properly in async functions.
```

良い例：
```markdown
## Error Handling

\`\`\`typescript
async function fetchData(url: string) {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
    }

    return await response.json()
  } catch (error) {
    console.error('Fetch failed:', error)
    throw new Error('Failed to fetch data')
  }
}
\`\`\`

### Key Points

- Check \`response.ok\` before parsing
- Log errors for debugging
- Re-throw with user-friendly message
```

### 3. アンチパターンを含める

やってはいけないことを示します：

```markdown
## Anti-Patterns

### FAIL: Direct State Mutation

\`\`\`typescript
// NEVER do this
user.name = 'New Name'
items.push(newItem)
\`\`\`

### PASS: Immutable Updates

\`\`\`typescript
// ALWAYS do this
const updatedUser = { ...user, name: 'New Name' }
const updatedItems = [...items, newItem]
\`\`\`
```

### 4. チェックリストを提供する

チェックリストは実行可能で、従いやすいです：

```markdown
## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console.log in production code
- [ ] Environment variables documented
- [ ] Secrets not hardcoded
- [ ] Error handling complete
- [ ] Input validation in place
```

### 5. 決定木を使う

複雑な決定のために：

```markdown
## Choosing the Right Approach

\`\`\`
Need to fetch data?
├── Single request → use fetch directly
├── Multiple independent → Promise.all()
├── Multiple dependent → await sequentially
└── With caching → use SWR or React Query
\`\`\`
```

---

## ベストプラクティス

### すべきこと（DO）

| プラクティス | 例 |
|----------|---------|
| **具体的にする** | 「子コンポーネントに渡すイベントハンドラーには \`useCallback\` を使う」 |
| **例を示す** | コピー＆ペースト可能なコードを含める |
| **なぜ（WHY）を説明する** | 「不変性は React の state での予期しない副作用を防ぐ」 |
| **関連スキルをリンクする** | 「関連：\`react-performance\`」 |
| **焦点を保つ** | 1つのスキル = 1つのドメイン/概念 |
| **セクションを使う** | 素早くスキャンできる明確なヘッダー |

### すべきでないこと（DON'T）

| プラクティス | なぜ悪いか |
|----------|--------------|
| **曖昧にする** | 「良いコードを書く」 - 実行可能でない |
| **長い散文** | パースが難しい、コードの方が良い |
| **カバーしすぎる** | 「Python、Django、Flask のパターン」 - 広すぎる |
| **例をスキップする** | 実践のない理論は有用性が低い |
| **アンチパターンを無視する** | やってはいけないことを学ぶのは価値がある |

### コンテンツガイドライン

1. **長さ**：200〜500 行が典型、最大 800 行
2. **コードブロック**：言語識別子を含める
3. **ヘッダー**：`##` と `###` の階層を使う
4. **リスト**：順序なしには `-`、順序付きには `1.` を使う
5. **テーブル**：比較とリファレンスのために

---

## 一般的なパターン

### パターン1：標準スキル

```markdown
---
name: language-standards
description: Coding standards and best practices for [language].
---

# [Language] Coding Standards

## When to Activate

- Writing [language] code
- Code review
- Setting up linting

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Variables | camelCase | userName |
| Constants | SCREAMING_SNAKE | MAX_RETRY |
| Functions | camelCase | fetchUser |
| Classes | PascalCase | UserService |

## Code Examples

[Include practical examples]

## Linting Setup

[Include configuration]

## Related Skills

- `language-testing`
- `language-security`
```

### パターン2：ワークフロースキル

```markdown
---
name: task-workflow
description: Step-by-step workflow for [task].
---

# [Task] Workflow

## When to Activate

- [Trigger 1]
- [Trigger 2]

## Prerequisites

- [Requirement 1]
- [Requirement 2]

## Steps

### Step 1: [Name]

[Description]

\`\`\`bash
[Commands]
\`\`\`

### Step 2: [Name]

[Description]

## Verification

- [ ] [Check 1]
- [ ] [Check 2]

## Troubleshooting

| Problem | Solution |
|---------|----------|
| [Issue] | [Fix] |
```

### パターン3：リファレンススキル

```markdown
---
name: api-reference
description: Quick reference for [API/Library].
---

# [API/Library] Reference

## When to Activate

- Using [API/Library]
- Looking up [API/Library] syntax

## Common Operations

### Operation 1

\`\`\`typescript
// Basic usage
\`\`\`

### Operation 2

\`\`\`typescript
// Advanced usage
\`\`\`

## Configuration

[Include config examples]

## Error Handling

[Include error patterns]
```

---

## スキルをテストする

### ローカルテスト

1. **Claude Code のスキルディレクトリにコピーする**：
   ```bash
   cp -r skills/your-skill-name ~/.claude/skills/
   ```

2. **Claude Code でテストする**：
   ```
   You: "I need to [task that should trigger your skill]"

   Claude should reference your skill's patterns.
   ```

3. **アクティベーションを検証する**：
   - スキルの概念を説明するよう Claude に求める
   - あなたの例とパターンを使うか確認する
   - あなたのガイドラインに従うことを確認する

### 検証チェックリスト

- [ ] **YAML フロントマターが有効** - 構文エラーなし
- [ ] **名前が規約に従う** - lowercase-with-hyphens
- [ ] **説明が明確** - いつ使うかを伝える
- [ ] **例が機能する** - コードがコンパイルされ実行される
- [ ] **リンクが有効** - 関連スキルが存在する
- [ ] **機密データなし** - API キー、トークン、パスなし

### コード例のテスト

すべてのコード例をテストします：

```bash
# From the repo root
npx tsc --noEmit skills/your-skill-name/examples/*.ts

# Or from inside the skill directory
npx tsc --noEmit examples/*.ts

# From the repo root
python -m py_compile skills/your-skill-name/examples/*.py

# Or from inside the skill directory
python -m py_compile examples/*.py

# From the repo root
go build ./skills/your-skill-name/examples/...

# Or from inside the skill directory
go build ./examples/...
```

---

## スキルを提出する

### 1. フォークとクローン

```bash
gh repo fork affaan-m/everything-claude-code --clone
cd everything-claude-code
```

### 2. ブランチを作成する

```bash
git checkout -b feat/skill-your-skill-name
```

### 3. スキルを追加する

```bash
mkdir -p skills/your-skill-name
# Create SKILL.md
```

### 4. 検証する

```bash
# Check YAML frontmatter
head -10 skills/your-skill-name/SKILL.md

# Verify structure
ls -la skills/your-skill-name/

# Run tests if available
npm test
```

### 5. コミットとプッシュ

```bash
git add skills/your-skill-name/
git commit -m "feat(skills): add your-skill-name skill"
git push -u origin feat/skill-your-skill-name
```

### 6. プルリクエストを作成する

この PR テンプレートを使用します：

```markdown
## Summary

Brief description of the skill and why it's valuable.

## Skill Type

- [ ] Language standards
- [ ] Framework patterns
- [ ] Workflow
- [ ] Domain knowledge
- [ ] Tool integration

## Testing

How I tested this skill locally.

## Checklist

- [ ] YAML frontmatter valid
- [ ] Code examples tested
- [ ] Follows skill guidelines
- [ ] No sensitive data
- [ ] Clear activation triggers
```

---

## 例のギャラリー

### 例1：言語標準

**ファイル：** `skills/rust-patterns/SKILL.md`

```markdown
---
name: rust-patterns
description: Rust idioms, ownership patterns, and best practices for safe, idiomatic code.
origin: ECC
---

# Rust Patterns

## When to Activate

- Writing Rust code
- Handling ownership and borrowing
- Error handling with Result/Option
- Implementing traits

## Ownership Patterns

### Borrowing Rules

\`\`\`rust
// PASS: CORRECT: Borrow when you don't need ownership
fn process_data(data: &str) -> usize {
    data.len()
}

// PASS: CORRECT: Take ownership when you need to modify or consume
fn consume_data(data: Vec<u8>) -> String {
    String::from_utf8(data).unwrap()
}
\`\`\`

## Error Handling

### Result Pattern

\`\`\`rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("Parse error: {0}")]
    Parse(#[from] std::num::ParseIntError),
}

pub type AppResult<T> = Result<T, AppError>;
\`\`\`

## Related Skills

- `rust-testing`
- `rust-security`
```

### 例2：フレームワークパターン

**ファイル：** `skills/fastapi-patterns/SKILL.md`

```markdown
---
name: fastapi-patterns
description: FastAPI patterns for routing, dependency injection, validation, and async operations.
origin: ECC
---

# FastAPI Patterns

## When to Activate

- Building FastAPI applications
- Creating API endpoints
- Implementing dependency injection
- Handling async database operations

## Project Structure

\`\`\`
app/
├── main.py              # FastAPI app entry point
├── routers/             # Route handlers
│   ├── users.py
│   └── items.py
├── models/              # Pydantic models
│   ├── user.py
│   └── item.py
├── services/            # Business logic
│   └── user_service.py
└── dependencies.py      # Shared dependencies
\`\`\`

## Dependency Injection

\`\`\`python
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session

@router.get("/users/{user_id}")
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db)
):
    # Use db session
    pass
\`\`\`

## Related Skills

- `python-patterns`
- `pydantic-validation`
```

### 例3：ワークフロースキル

**ファイル：** `skills/refactoring-workflow/SKILL.md`

```markdown
---
name: refactoring-workflow
description: Systematic refactoring workflow for improving code quality without changing behavior.
origin: ECC
---

# Refactoring Workflow

## When to Activate

- Improving code structure
- Reducing technical debt
- Simplifying complex code
- Extracting reusable components

## Prerequisites

- All tests passing
- Git working directory clean
- Feature branch created

## Workflow Steps

### Step 1: Identify Refactoring Target

- Look for code smells (long methods, duplicate code, large classes)
- Check test coverage for target area
- Document current behavior

### Step 2: Ensure Tests Exist

\`\`\`bash
# Run tests to verify current behavior
npm test

# Check coverage for target files
npm run test:coverage
\`\`\`

### Step 3: Make Small Changes

- One refactoring at a time
- Run tests after each change
- Commit frequently

### Step 4: Verify Behavior Unchanged

\`\`\`bash
# Run full test suite
npm test

# Run E2E tests
npm run test:e2e
\`\`\`

## Common Refactorings

| Smell | Refactoring |
|-------|-------------|
| Long method | Extract method |
| Duplicate code | Extract to shared function |
| Large class | Extract class |
| Long parameter list | Introduce parameter object |

## Checklist

- [ ] Tests exist for target code
- [ ] Made small, focused changes
- [ ] Tests pass after each change
- [ ] Behavior unchanged
- [ ] Committed with clear message
```

---

## 追加リソース

- [CONTRIBUTING.md](../CONTRIBUTING.md) - 一般的なコントリビューションガイドライン
- [project-guidelines-template](./examples/project-guidelines-template.md) - プロジェクト固有のスキルテンプレート
- [coding-standards](../skills/coding-standards/SKILL.md) - 標準スキルの例
- [tdd-workflow](../skills/tdd-workflow/SKILL.md) - ワークフロースキルの例
- [security-review](../skills/security-review/SKILL.md) - ドメイン知識スキルの例

---

**覚えておくこと**：良いスキルは、焦点が絞られ、実行可能で、すぐに役立ちます。自分が使いたいと思うスキルを書きましょう。
