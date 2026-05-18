---
name: prisma-patterns
description: TypeScriptバックエンド向けPrisma ORMのパターン — スキーマ設計、クエリ最適化、トランザクション、ページネーション、およびupdateManyがレコードではなくカウントを返す、$transactionのタイムアウト、migrate devがDBをリセットする、バルク書き込みで@updatedAtがスキップされる、サーバーレス環境でのコネクション枯渇といった重大なトラップ。
origin: ECC
---

# Prisma パターン

TypeScriptバックエンドにおけるPrisma ORMの本番パターンと非自明なトラップ。
Prisma 5.x および 6.x に対して検証済み。一部の動作はPrisma 4と異なります。

バージョン固有のパターンを適用する前に、Prismaのバージョンを確認してください：

```bash
npx prisma --version
```

Prisma 5では`relationJoins`が導入され、クエリ戦略と設定に応じてJOINを通じてリレーションをロードできるようになりました。`omit`フィールド修飾子と`prisma.$extends` クライアント拡張APIも追加されました。注意：`relationJoins`は大規模な1:Nリレーションや深いネストの`include`でrow explosionを引き起こす可能性があります — リレーションが親ごとに多数の行を返す可能性がある場合は両方のアプローチをベンチマークしてください。

## 有効化するタイミング

- Prismaスキーマのモデルとリレーションを設計または変更する場合
- クエリ、トランザクション、またはページネーションロジックを記述する場合
- `updateMany`、`deleteMany`、またはバルク操作を使用する場合
- データベースのマイグレーションを実行または計画する場合
- サーバーレス環境（Vercel、Lambda、Cloudflare Workers）にデプロイする場合
- ソフトデリートやマルチテナントの行フィルタリングを実装する場合

## コアコンセプト

### IDストラテジー

| ストラテジー | 使用タイミング | 避けるべき場合 |
|---|---|---|
| `@default(cuid())` | デフォルトの選択肢 — URLセーフ、ソート可能、衝突なし | 外部システムに連番IDが必要な場合 |
| `@default(uuid())` | Prisma以外のシステムとの相互運用性が必要な場合 | 高書き込みテーブル（ランダムUUIDはB-treeインデックスを断片化する） |
| `@default(autoincrement())` | 内部結合テーブル、監査ログ | 公開向けID（レコード数が露出する） |

### スキーマのデフォルト

```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique  // @uniqueはすでにインデックスを作成する — @@indexは不要
  name      String
  role      Role      @default(USER)
  posts     Post[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@index([createdAt])
  @@index([deletedAt, createdAt]) // ソフトデリート + ソートクエリのための複合インデックス
}
```

- `WHERE`または`ORDER BY`で使用されるすべての外部キーとカラムに`@@index`を追加してください。
- ソフトデリートが将来的に必要となる場合は、事前に`deletedAt DateTime?`を宣言してください — 後から追加するとライブテーブルでのマイグレーションが必要になります。
- `updatedAt @updatedAt`はPrismaが`update`と`upsert`のみで自動的に設定します（バルク更新のトラップについてはアンチパターンを参照）。

### `include` vs `select`

| | `include` | `select` |
|---|---|---|
| 返却内容 | すべてのスカラーフィールド + 指定されたリレーション | 指定されたフィールドのみ |
| 使用場面 | ほとんどのフィールドとリレーションが必要な場合 | ホットパス、大規模テーブル、オーバーフェッチを避ける場合 |
| パフォーマンス | 広いテーブルでオーバーフェッチの可能性 | 最小ペイロード、大規模データセットで高速 |
| Prisma 5の注意 | デフォルトでJOINを使用（`relationJoins`） | 同じ |

```ts
// include — すべてのカラム + リレーション
const user = await prisma.user.findUnique({
  where: { id },
  include: { posts: { select: { id: true, title: true } } },
});

// select — 明示的な許可リスト
const user = await prisma.user.findUnique({
  where: { id },
  select: { id: true, email: true, name: true },
});
```

APIレスポンスからRawなPrismaエンティティを返さないでください — 公開フィールドを制御するためにレスポンスDTOにマッピングしてください：

```ts
// 悪い例: passwordHash、deletedAt、内部フィールドが漏洩する
return await prisma.user.findUniqueOrThrow({ where: { id } });

// 良い例: 明示的なDTOマッピング
const user = await prisma.user.findUniqueOrThrow({ where: { id } });
return { id: user.id, name: user.name, email: user.email };
```

### トランザクション形式の選択

| 状況 | 使用方法 |
|---|---|
| 独立した操作で相互依存なし | 配列形式 |
| 後のステップが前の結果に依存する | インタラクティブ形式 |
| 外部呼び出し（メール、HTTP）が含まれる | トランザクションの外側で実行 |

```ts
// 配列形式 — 1回のラウンドトリップでバッチ処理
const [user, post] = await prisma.$transaction([
  prisma.user.update({ where: { id }, data: { name } }),
  prisma.post.create({ data: { title, authorId: id } }),
]);

// インタラクティブ形式 — txクライアントのみ使用し、外側のprismaクライアントは使用しない
const post = await prisma.$transaction(async (tx) => {
  const user = await tx.user.findUniqueOrThrow({ where: { id } });
  if (user.role !== 'ADMIN') throw new Error('Forbidden');
  return tx.post.create({ data: { title, authorId: user.id } });
});
```

### PrismaClientシングルトン

各`PrismaClient`インスタンスは独自のコネクションプールを開きます。一度だけインスタンス化してください。

```ts
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

`globalThis`パターンはホットリロード（Next.js、nodemon、ts-node-dev）時の重複インスタンスを防ぎます。

### N+1問題

ループ内でリレーションをロードすると、行ごとに1つのクエリが発行されます。

```ts
// 悪い例: N+1 — ユーザーごとに追加クエリが発生
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { authorId: user.id } });
}

// 良い例: 単一クエリ
const users = await prisma.user.findMany({ include: { posts: true } });
```

Prisma 5+の`relationJoins`では、`include`形式が単一のJOINを使用します。大規模な1:Nセットではresult setのサイズが増加する場合があります — リレーションが親ごとに多数の行を返す可能性がある場合は両方のアプローチをベンチマークしてください。

## コード例

### カーソルページネーション（フィードと大規模データセットに推奨）

```ts
async function getPosts(cursor?: string, limit = 20) {
  const items = await prisma.post.findMany({
    where: { published: true },
    orderBy: [
      { createdAt: 'desc' },
      { id: 'desc' }, // 重複タイムスタンプでの不安定なページネーションを防ぐセカンダリソート
    ],
    take: limit + 1,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  });

  const hasNextPage = items.length > limit;
  if (hasNextPage) items.pop();

  return { items, nextCursor: hasNextPage ? items[items.length - 1].id : null };
}
```

`limit + 1`を取得してpopする — 追加のカウントクエリなしに`hasNextPage`を検出する標準的な方法です。複数の行が同じタイムスタンプを共有する場合の不安定なページネーションを防ぐため、常に一意のフィールド（例：`id`）をセカンダリ`orderBy`に含めてください。ユーザーが任意のページにジャンプする必要がある場合のみオフセットページネーションを使用してください（管理テーブル）。

### ソフトデリート

```ts
// 常に明示的にフィルタリングする — ミドルウェアに依存しない（動作が隠れてデバッグが困難になる）
const activeUsers = await prisma.user.findMany({ where: { deletedAt: null } });

await prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });
await prisma.user.update({ where: { id }, data: { deletedAt: null } }); // 復元
```

### エラーハンドリング

```ts
import { Prisma } from '@prisma/client';

try {
  await prisma.user.create({ data: { email } });
} catch (e) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2002') throw new ConflictError('Email already exists');
    if (e.code === 'P2025') throw new NotFoundError('Record not found');
    if (e.code === 'P2003') throw new BadRequestError('Referenced record does not exist');
  }
  throw e;
}
```

一般的なコード: `P2002` unique違反 · `P2025` not found · `P2003` 外部キー違反。

サービス境界でキャッチしてドメインエラーに変換してください。APIコンシューマーにRawなPrismaメッセージを公開しないでください。

### コネクションプール — サーバーレス

接続パラメータを`DATABASE_URL`に直接埋め込んでください — URLにすでにクエリパラメータがある場合（例：`?schema=public`）、文字列連結が壊れます：

```bash
# .env — 推奨: URLにパラメータを埋め込む
DATABASE_URL="postgresql://user:pass@host/db?connection_limit=1&pool_timeout=20"

# 外部プーラーを使用する場合（PgBouncer、Supabaseプーラー）
DATABASE_URL="postgresql://user:pass@host/db?pgbouncer=true&connection_limit=1"
```

```ts
// Vercel、AWS Lambda、および同様のサーバーレスランタイム: インスタンスごとにプールを1に制限
// connection_limitとpool_timeoutはDATABASE_URL経由で制御される
const prisma = new PrismaClient();
```

## アンチパターン

### `updateMany`はレコードではなくカウントを返す

```ts
// 悪い例: resultは{ count: 2 } — users[0]はundefined
const users = await prisma.user.updateMany({ where: { role: 'GUEST' }, data: { role: 'USER' } });

// 良い例: 最初にIDを取得し、次に更新し、影響を受けた行のみを取得する
const targets = await prisma.user.findMany({
  where: { role: 'GUEST' },
  select: { id: true },
});
const ids = targets.map((u) => u.id);
await prisma.user.updateMany({ where: { id: { in: ids } }, data: { role: 'USER' } });
const updated = await prisma.user.findMany({ where: { id: { in: ids } } });
```

`deleteMany`も同様 — `{ count: n }`を返し、削除された行は返しません。

### `$transaction`インタラクティブ形式は5秒後にタイムアウトする

```ts
// 悪い例: トランザクション内の外部呼び出しが5秒のデフォルトを超える → "Transaction already closed"
await prisma.$transaction(async (tx) => {
  const user = await tx.user.findUniqueOrThrow({ where: { id } });
  await sendWelcomeEmail(user.email); // 外部呼び出し
  await tx.user.update({ where: { id }, data: { emailSent: true } });
});

// 良い例: 外部呼び出しをトランザクションの外側に置く
const user = await prisma.user.findUniqueOrThrow({ where: { id } });
await sendWelcomeEmail(user.email);
await prisma.user.update({ where: { id }, data: { emailSent: true } });

// バルク処理で本当に必要な場合のみタイムアウトを引き上げる
await prisma.$transaction(async (tx) => { ... }, { timeout: 30_000 });
```

### `migrate dev`はデータベースをリセットする可能性がある

`migrate dev`はスキーマのドリフトを検出し、DBのリセットを促す場合があり、すべてのデータが削除されます。

```bash
# 共有開発、ステージング、または本番環境では絶対に使用しない
npx prisma migrate dev --name add_column

# ローカルのソロ開発以外のすべての環境で安全
npx prisma migrate deploy

# 適用せずにドリフトを確認する
npx prisma migrate diff \
  --from-migrations ./prisma/migrations \
  --to-schema-datamodel ./prisma/schema.prisma \
  --shadow-database-url "$SHADOW_DATABASE_URL"
```

### マイグレーションファイルを手動編集すると将来のデプロイが壊れる

Prismaはすべてのマイグレーションファイルにチェックサムを付けます。適用後に編集すると、元のファイルがすでに実行されているすべての環境で`P3006 checksum mismatch`が発生します。代わりに新しいマイグレーションを作成してください。

### 破壊的なスキーマ変更にはマルチステップのマイグレーションが必要

既存のカラムに`NOT NULL`を追加したり、1つのマイグレーションでカラム名を変更したりすると、テーブルがロックされたりデータが失われたりします。expand-and-contractを使用してください：

```bash
# ステップ1: ローカルでマイグレーションを作成し、デプロイする
npx prisma migrate dev --name add_new_column   # ローカルのみ
npx prisma migrate deploy                       # ステージング / 本番
```

```ts
// ステップ2: データをバックフィルする（シェルではなくスクリプトまたはマイグレーションジョブで実行）
await prisma.user.updateMany({ data: { newColumn: derivedValue } });
```

```bash
# ステップ3: NOT NULL制約のマイグレーションをローカルで作成し、デプロイする
npx prisma migrate dev --name make_new_column_required  # ローカルのみ
npx prisma migrate deploy                               # ステージング / 本番
```

### `@updatedAt`は`updateMany`では発火しない

`@updatedAt`は`update`と`upsert`のみで自動的に設定されます。バルク書き込みでは古い値のままになります。

```ts
// 悪い例: updatedAtは古い値のまま
await prisma.post.updateMany({ where: { authorId }, data: { published: true } });

// 良い例
await prisma.post.updateMany({
  where: { authorId },
  data: { published: true, updatedAt: new Date() },
});
```

### ソフトデリート + `findUniqueOrThrow`は削除済みレコードを漏洩させる

`findUniqueOrThrow`はDBに行が存在しない場合にのみ`P2025`をスローします。ソフトデリートされた行はまだ存在しており、エラーなしで返されます。

`findUniqueOrThrow`は`where`にユニーク制約フィールドが必要です — `id`の横に`deletedAt: null`を追加すると、`{ id, deletedAt }`が複合ユニーク制約ではないため型エラーが発生します。代わりに`findFirstOrThrow`を使用してください。

```ts
// 悪い例: ソフトデリートされたユーザーを返す
const user = await prisma.user.findUniqueOrThrow({ where: { id } });

// 悪い例: Prismaの型エラー — { id, deletedAt }はユニーク制約ではない
const user = await prisma.user.findUniqueOrThrow({ where: { id, deletedAt: null } });

// 良い例: findFirstOrThrowは任意のwhere条件をサポートする
const user = await prisma.user.findFirstOrThrow({ where: { id, deletedAt: null } });
```

### `where`なしの`deleteMany`はすべての行を削除する

```ts
// 悪い例: テーブルを静かに全消去する
await prisma.post.deleteMany();

// 良い例
await prisma.post.deleteMany({ where: { authorId: userId } });
```

## ベストプラクティス

| ルール | 理由 |
|---|---|
| CI/CDでは`migrate deploy`、ローカルのみ`migrate dev` | `migrate dev`はドリフト時にDBをリセットする可能性がある |
| エンティティをレスポンスDTOにマッピングする | 内部フィールドの漏洩を防ぐ |
| サービス境界で`PrismaClientKnownRequestError`をキャッチする | ドメインエラーに変換する |
| 手動のnullチェックより`*OrThrow`メソッドを優先する | P2025を自動的にスロー；非ユニークフィールドをフィルタリングする場合は`findFirstOrThrow`を使用 |
| サーバーレスでは`connection_limit=1` + 外部プーラー | コネクション枯渇を防ぐ |
| `deleteMany`には常に`where`を指定する | 誤ったテーブル全消去を防ぐ |
| `updateMany`では`updatedAt: new Date()`を手動で設定する | `@updatedAt`はバルク書き込みをスキップする |

## 関連スキル

- `nestjs-patterns` — Prismaを統合するNestJSサービスレイヤー
- `postgres-patterns` — PostgreSQLレベルのインデックスとコネクションチューニング
- `database-migrations` — 本番環境向けマルチステップのマイグレーション計画
- `backend-patterns` — 一般的なAPIとサービスレイヤーの設計
