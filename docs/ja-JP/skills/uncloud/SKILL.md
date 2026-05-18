---
name: uncloud
description: Uncloudクラスターの管理時に使用します — サービスのデプロイ、Caddyイングレスの設定、クラスター外デバイス向けの静的プロキシルートの追加、ポートの公開、スケーリング、ログの確認、または`uc` CLIによるマシンとボリュームの管理。
origin: ECC
---

# Uncloudクラスター管理

`uc` CLIのリファレンス — Dockerコンテナ、WireGuardメッシュネットワーク、Caddyリバースプロキシを使用した分散型セルフホスティングプラットフォーム。

## 有効化するタイミング

以下の場合にUncloudクラスターを操作する際にこのスキルを使用してください：
- `uc machine`でマシンをブートストラップまたは参加させる場合
- `uc deploy`でComposeファイルからサービスをデプロイする場合
- Uncloudを通じてHTTP、HTTPS、TCP、またはUDPポートを公開する場合
- `x-caddy`、`x-ports`、または`--caddyfile`でCaddyイングレスを設定する場合
- 外部LANデバイスをクラスタープロキシ経由でルーティングする場合
- ログ、サービス状態、ボリューム、DNS、またはマシン配置を確認する場合

## 仕組み

UncloudはWireGuardメッシュで接続されたピアマシン間でDockerサービスを実行します。各マシンは同等のクラスターメンバーであり、サービスはオーバーレイネットワーク上で通信し、Caddyはパブリックなhttp/HTTPSトラフィックを終端するためにグローバルに実行されます。ComposeファイルはUncloudの拡張機能を使用してイングレス、配置、および生成されたCaddy設定を行い、`uc` CLIはイメージの配布、スケジューリング、スケーリング、ログ、およびクラスター状態を処理します。

## 例

```bash
uc machine init user@host --name machine-1
uc service run --name web -p app.example.com:8080/https nginx:latest
uc deploy
```

## コアコンセプト

- **中央コントロールプレーンなし** — すべてのマシンはWireGuardで接続された同等のピア
- **Caddy**はすべてのマシンでグローバルサービスとして実行；Let's EncryptからTLSを自動取得
- **オーバーレイネットワーク** — サービスはデフォルトで`10.210.0.0/16`経由で通信；メッシュ内でDNSを提供
- **Caddyfileは自動生成** — 直接編集しないこと；代わりに`x-caddy` / `--caddyfile`を使用する

---

## CLIクイックリファレンス

### マシン

| コマンド | 目的 |
|---------|---------|
| `uc machine init user@host` | 最初のマシン / 新規クラスターのブートストラップ |
| `uc machine add user@host` | 既存クラスターにマシンを参加させる |
| `uc machine ls` | マシン一覧 |
| `uc machine update NAME --public-ip IP` | イングレス用のパブリックIPを更新 |
| `uc machine rm NAME` | マシンを削除 |

主な`init`フラグ: `--name`、`--network 10.210.0.0/16`、`--no-caddy`、`--no-dns`、`--public-ip auto\|IP\|none`

### サービス

| コマンド | 目的 |
|---------|---------|
| `uc service ls` / `uc ls` | サービス一覧 |
| `uc service run IMAGE` | 単一コンテナのサービスを実行 |
| `uc deploy` | `compose.yaml`からデプロイ |
| `uc deploy --no-build` | リビルドせずに既にプッシュされたイメージをデプロイ |
| `uc deploy --recreate` | サービスの強制再作成 |
| `uc scale SERVICE N` | レプリカ数を設定 |
| `uc service logs SERVICE` | ログを表示 |
| `uc service exec SERVICE` | コンテナにシェルで接続 |
| `uc service inspect SERVICE` | 詳細情報 |
| `uc service rm SERVICE` | サービスを削除（名前付きボリュームは保持） |
| `uc ps` | クラスター全体のすべてのコンテナ |

### イメージ

```bash
uc image push myapp:latest                    # ローカルイメージをすべてのマシンにプッシュ
uc image push myapp:latest -m machine1,machine2  # 特定のマシンにプッシュ
uc images                                     # クラスター内のイメージ一覧
```

### ボリューム

```bash
uc volume ls                  # すべてのボリューム
uc volume ls -m machine1      # 特定のマシン上のボリューム
uc volume create NAME -m MACHINE
uc volume rm NAME
```

### Caddy

```bash
uc caddy config    # 現在生成されたCaddyfileを表示（読み取り専用）
uc caddy deploy    # クラスター全体でCaddyをデプロイ/アップグレード
```

### DNS & コンテキスト

```bash
uc dns show        # 予約済みの*.uncld.devドメインを表示
uc dns reserve     # 新しいドメインを予約
uc ctx ls          # クラスターコンテキスト一覧
uc ctx use prod    # コンテキストを切り替え
```

---

## ポートの公開

### HTTP/HTTPS（Caddyリバースプロキシ経由）

```
-p [hostname:]container_port[/protocol]
```

| 例 | 意味 |
|---------|---------|
| `-p 8080/https` | 自動`service-name.cluster-domain`ホスト名でHTTPS |
| `-p app.example.com:8080/https` | カスタムホスト名でHTTPS |
| `-p 8080/http` | HTTPのみ、TLSなし |

### TCP/UDP（ホストバウンド、Caddyをバイパス）

```
-p [host_ip:]host_port:container_port[/protocol]@host
```

| 例 | 意味 |
|---------|---------|
| `-p 5432:5432@host` | すべてのインターフェースでTCP 5432 |
| `-p 127.0.0.1:5432:5432@host` | ループバックのみTCP 5432 |
| `-p 53:5353/udp@host` | UDP |

---

## Composeファイルの拡張機能

UncloudはDockerComposeの上にこれらの拡張機能を追加します：

### `x-ports` — ドメインを使用してポートを公開

```yaml
services:
  app:
    image: app:latest
    x-ports:
      - example.com:8000/https
      - www.example.com:8000/https
      - api.example.com:9000/https
```

### `x-caddy` — サービス用のカスタムCaddy設定

```yaml
services:
  app:
    image: app:latest
    x-caddy: |
      example.com {
        redir https://www.example.com{uri} permanent
      }
      www.example.com {
        reverse_proxy {{upstreams 8000}} {
          import common_proxy
        }
        basic_auth /admin/* {
          admin $2a$14$...
        }
      }
```

`x-caddy`内で使用可能なテンプレート関数：
- `{{upstreams [service] [port]}}` — 正常なコンテナIP
- `{{.Name}}` — サービス名
- `{{.Upstreams}}` — すべてのサービス → IPのマップ

### `x-machines` — 配置制約

```yaml
services:
  db:
    image: postgres:18
    x-machines: db-machine          # 単一マシン名
  app:
    image: app:latest
    x-machines:
      - machine-1
      - machine-2
```

### マルチサービスの完全な例

```yaml
services:
  api:
    build: ./api
    x-ports:
      - api.example.com:3000/https
    environment:
      DATABASE_URL: postgres://db:5432/mydb

  web:
    build: ./web
    x-ports:
      - example.com:8000/https
      - www.example.com:8000/https
    environment:
      API_URL: http://api:3000

  db:
    image: postgres:18
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - db-data:/var/lib/postgresql/data
    x-machines: db-machine

volumes:
  db-data:
```

---

## 外部（クラスター外）デバイスへのルーティング

実際のコンテナを実行せずにCaddy経由で外部デバイス（例：BMC、NAS、ルーターUI）を公開するには：

**1. Caddyfileスニペットを作成する**（例：`~/device.caddyfile`）：

```caddyfile
https://device.example.com {
    reverse_proxy https://192.168.1.x {
        transport http {
            tls_insecure_skip_verify   # 自己署名BMC証明書に必要
        }
    }
    log
}
```

平文アップストリームの場合: `reverse_proxy http://192.168.1.x:port`

**2. no-opコンテナで名前付きサービスとして登録する：**

```bash
uc service run \
  --name device-bmc \
  --caddyfile ~/device.caddyfile \
  registry.k8s.io/pause:3.9
```

`pause`は最小限のno-opコンテナです — 何もしませんが、UncloudにCaddyfileを添付するためのサービスエントリを提供します。

**3. 確認する：**

```bash
uc caddy config   # device.example.comブロックが表示されるはず
```

> `--caddyfile`は非`@host`の公開ポートと組み合わせることはできません。

**DNSのヒント:** ワイルドカードレコード（`*.yourdomain.com → cluster-public-ip`）を設定すると、新しいサブドメインが即座に機能します — サービスごとのDNS変更は不要です。

---

## サービスDNS（内部）

クラスター内のサービスは名前で互いに解決できます：

| DNS名 | 解決先 |
|----------|------------|
| `service-name` | 任意の正常なコンテナ |
| `service-name.internal` | 同じ |
| `rr.service-name.internal` | ラウンドロビン |
| `nearest.service-name.internal` | マシンローカルを優先 |

---

## スケーリング & グローバルサービス

```bash
uc scale web 5    # 5レプリカ（マシン間に分散）
uc scale web 1    # スケールダウン
```

```yaml
services:
  caddy:
    deploy:
      mode: global   # すべてのマシンに1コンテナ
```

---

## イメージタグテンプレート（compose.yaml内）

```yaml
image: myapp:{{gitdate "20060102"}}.{{gitsha 7}}
image: myapp:{{gitsha 7}}.${GITHUB_RUN_ID:-local}
```

| 関数 | 出力 |
|----------|--------|
| `{{gitsha N}}` | コミットSHAの最初のN文字 |
| `{{gitdate "format"}}` | Goフォーマットのgitコミット日時 |
| `{{date "format"}}` | 現在の日時 |

---

## 一般的なワークフロー

**ソースからデプロイ：**
```bash
uc deploy                          # ビルド + プッシュ + デプロイ
uc build --push && uc deploy --no-build   # ステップを分離
```

**サービスを確認する：**
```bash
uc inspect web
uc logs -f web
uc logs --since 1h web
uc exec web                        # シェルを開く
uc exec web /bin/sh -c "env"       # 特定のコマンドを実行
```

**ゼロダウンタイムデプロイ**は自動的に行われます；Uncloudは古いコンテナを終了する前にヘルスチェックを待機します。

**強制再作成：**
```bash
uc deploy --recreate
```

---

## よくあるミス

| ミス | 修正方法 |
|---------|-----|
| Caddyfileを直接編集する | composeの`x-caddy`または`uc service run`の`--caddyfile`を使用する |
| 自己署名証明書のHTTPSアップストリームをプロキシする | `transport http { tls_insecure_skip_verify }`を追加する |
| `uc caddy config`にユーザー定義ブロックが表示されない | Caddy管理ソケットに到達不能 — `uc inspect caddy`と`uc logs caddy`を確認する |
| コンテナから外部LANのIPに到達できない | CaddyコンテナのホストがターゲットネットワークにルーティングできるかHER確認する |
| `uc service rm`後にボリュームが失われた | 名前付きボリュームは保持される；匿名ボリュームのみ自動削除される |
