# プロジェクトCLAUDE.mdの例

これはプロジェクトレベルの CLAUDE.md ファイルの例である。これをプロジェクトルートに配置する。

## プロジェクト概要

[プロジェクトの簡単な説明 - 何をするものか、技術スタック]

## 重要なルール

### 1. コード構成

- 少数の大きなファイルより、多数の小さなファイル
- 高い凝集度、低い結合度
- 1ファイルあたり通常200-400行、最大800行
- タイプ別ではなく、機能/ドメイン別に整理する

### 2. コーディングスタイル

- コード、コメント、ドキュメントに絵文字を使用しない
- 常に不変性 - オブジェクトや配列を決して変更（ミューテーション）しない
- 本番コードに console.log を残さない
- try/catch による適切なエラーハンドリング
- Zodなどによる入力検証

### 3. テスト

- TDD: テストを最初に書く
- 最低80%のカバレッジ
- ユーティリティの単体テスト
- APIの統合テスト
- 重要なフローのE2Eテスト

### 4. セキュリティ

- ハードコードされた秘密情報なし
- 機密データには環境変数を使用
- すべてのユーザー入力を検証
- パラメータ化クエリのみ使用
- CSRF保護を有効化

## ファイル構造

```
src/
|-- app/              # Next.js app router
|-- components/       # 再利用可能なUIコンポーネント
|-- hooks/            # カスタムReactフック
|-- lib/              # ユーティリティライブラリ
|-- types/            # TypeScript定義
```

## 主要パターン

### APIレスポンスフォーマット

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
```

### エラーハンドリング

```typescript
try {
  const result = await operation()
  return { success: true, data: result }
} catch (error) {
  console.error('Operation failed:', error)
  return { success: false, error: 'User-friendly message' }
}
```

## 環境変数

```bash
# 必須
DATABASE_URL=
API_KEY=

# オプション
DEBUG=false
```

## 利用可能なコマンド

- `/tdd` - テスト駆動開発ワークフロー
- `/plan` - 実装計画の作成
- `/code-review` - コード品質のレビュー
- `/build-fix` - ビルドエラーの修正

## Gitワークフロー

- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`
- mainに直接コミットしない
- PRはレビューを必要とする
- マージ前にすべてのテストがパスしなければならない
