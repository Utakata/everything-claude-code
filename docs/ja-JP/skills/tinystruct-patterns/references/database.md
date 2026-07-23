# tinystruct データベース永続化

## 使用場面

データベース操作には、組み込みのORMライクなデータレイヤーを使用します。`AbstractData` を継承したPOJOとXMLマッピングファイルを用いて、JPA/Hibernateの軽量な代替手段を提供します。

## 動作の仕組み

### アーキテクチャ

各テーブルは以下によって表現されます：
1. **Java POJO**：`AbstractData` を継承し、ゲッター/セッターと `setData(Row)` を提供します。
2. **マッピングXML**：リソース内の `ClassName.map.xml` で、JavaフィールドをDBカラムにバインドします。

#### 主要な基底クラス：`AbstractData`
CRUDメソッドを提供します：
- `append()` / `appendAndGetId()`
- `update()`
- `delete()`
- `findAll()` / `findOneById()` / `findOneByKey(key, value)`
- `findWith(where, params)`
- `find(SQL, params)`

### POJO生成（CLI）

稼働中のデータベーステーブルをイントロスペクトして、POJOとマッピングファイルを生成します。

#### 設定
`application.properties`：
```properties
driver=com.mysql.cj.jdbc.Driver
database.url=jdbc:mysql://localhost:3306/mydb
database.user=root
database.password=secret
```

#### コマンド
```bash
# インタラクティブモード
bin/dispatcher generate

# テーブルを指定
bin/dispatcher generate --tables users
```

## 例

### CRUD操作
```java
// CREATE
User user = new User();
user.setUsername("james");
user.append();

// READ
User user = new User();
user.setId(42);
user.findOneById();

// UPDATE
user.setEmail("new@example.com");
user.update();

// DELETE
user.delete();
```

### 条件付きクエリ
```java
User user = new User();
Table results = user.findWith("username LIKE ?", new Object[]{"%jam%"});

// 流暢な条件ビルダー
Condition condition = new Condition();
condition.setRequestFields("id,username");
Table filtered = user.find(
    condition.select("`users`").and("email LIKE ?").orderBy("id DESC"),
    new Object[]{"%@example.com"}
);
```

### マッピングXMLの構造
`User.map.xml`：
```xml
<mapping>
  <class name="User" table="users">
    <id name="Id" column="id" increment="true" generate="false" length="11" type="int"/>
    <property name="username" column="username" length="50" type="varchar"/>
    <property name="email" column="email" length="100" type="varchar"/>
  </class>
</mapping>
```

## 重要なルール

1. **ファイル配置**：マッピングXMLは、`src/main/resources/` 配下でPOJOのパッケージパスを**必ず**ミラーする必要があります。
2. **命名**：テーブル名はクラス名用に単数形化されます（`users` → `User`）。アンダースコア区切りのカラムはキャメルケースのフィールドになります（`created_at` → `createdAt`）。
3. **セッター**：セッター内では `setFieldAsXxx` メソッド（例：`setFieldAsString`）を使用して、内部フィールドマップと状態を同期させます。
4. **Idフィールド**：Javaにおける主キーフィールドは常に `Id` という名前です（`AbstractData` から継承）。
