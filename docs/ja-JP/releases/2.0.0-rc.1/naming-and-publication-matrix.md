# ECC v2.0.0-rc.1 ネーミング・公表マトリックス

スナップショット日付：2026-05-12。

このマトリックスは、rc.1 レーンについて「Everything Claude Code、ECC、または改名したサーフェスとして出荷するか？」というリリースの問いに答えます。これは計画のためのエビデンスであり、公表アクションではありません。

## 決定

`v2.0.0-rc.1` については、公開アイデンティティを **Everything Claude Code (ECC)** のまま維持します。
コピー、プラグインスラグ、ステータスサーフェス、図では短い製品名として **ECC** を使いますが、rc.1 リリース前に GitHub リポジトリ、npm パッケージ、パッケージエントリポイントを改名しないでください。

理由：

- 現在のインストールサーフェスは、すでに `ecc-universal` と `ecc`
  プラグインスラグとして機能している；
- 正確な npm パッケージ名 `ecc` は、無関係な楕円曲線暗号（elliptic
  curve cryptography）パッケージにすでに占有されている；
- リポジトリ名 `affaan-m/ecc` は存在しないが、rc.1 前に
  `affaan-m/everything-claude-code` を改名すると、避けられる URL、
  パッケージ、ドキュメント、marketplace の churn が発生する；
- Claude と Codex のプラグインサーフェスは、すでに `ecc` として十分短い；
- rc.1 は、より広範なブランド移行の前に、リリース、プラグイン、公表パイプラインを証明すべきである。

## 現在の値

| サーフェス | 現在の値 | エビデンスコマンド | 2026-05-12 の結果 | リリース決定 |
| --- | --- | --- | --- | --- |
| 製品表示名 | `Everything Claude Code` | `rg -n "Everything Claude Code" README.md CHANGELOG.md docs/releases/2.0.0-rc.1` | README、リリースノート、ローンチコピー、プラグインマニフェスト全体に存在 | rc.1 では維持 |
| ショートネーム | `ECC` | README/リリースドキュメント | 短いクロスハーネスブランドとして使用 | 維持し、簡潔なコピーで優先 |
| GitHub リポジトリ | `affaan-m/everything-claude-code` | `git remote get-url origin` | `https://github.com/affaan-m/everything-claude-code.git` | rc.1 では維持 |
| 可能なショートリポジトリ | `affaan-m/ecc` | `gh repo view affaan-m/ecc` | 現在の認証では見つからない | rc.1 後のみ候補 |
| npm パッケージ | `ecc-universal` | `node -p "require('./package.json').name"` | `ecc-universal` | rc.1 では維持 |
| npm パッケージバージョン | ローカル `2.0.0-rc.1`、レジストリ latest `1.10.0` | `node -p "require('./package.json').version"` および `npm view ecc-universal name version dist-tags --json` | ローカルの rc.1 は準備完了；レジストリ latest は `1.10.0` のまま | rc は `latest` ではなく `next` として publish |
| 正確な npm ショートネーム | `ecc` | `npm view ecc name version description repository.url --json` | `ecc@0.0.2`「Elliptic curve cryptography functions.」に占有されている | 使用しない |
| スコープ付き npm ショートネーム | `@affaan-m/ecc` | `npm view @affaan-m/ecc name version --json` | レジストリ 404 | npm スコープポリシーが許せば将来のスコープ付きパッケージの可能性 |
| 旧パッケージ名 | `everything-claude-code` | `npm view everything-claude-code name version dist-tags --json` | レジストリは2026-02-07 に unpublished と報告 | rc.1 では復活させない |
| Claude プラグインスラグ | `ecc` | `node -p "require('./.claude-plugin/plugin.json').name"` | `ecc` | 維持 |
| Claude プラグインバージョン | `2.0.0-rc.1` | `claude plugin validate .claude-plugin/plugin.json` | Claude Code `2.1.121` で検証合格 | リリースタグゲートの準備完了 |
| Claude marketplace エントリ | `ecc` | `.claude-plugin/marketplace.json` | バージョンとリポジトリが現在の rc.1 サーフェスを指す | 維持 |
| Codex プラグインスラグ | `ecc` | `node -p "require('./.codex-plugin/plugin.json').name"` | `ecc` | 維持 |
| Codex プラグインバージョン | `2.0.0-rc.1` | `node tests/docs/ecc2-release-surface.test.js` | リリースサーフェステスト合格 | Codex marketplace/手動 marketplace ゲートの準備完了 |
| Codex repo marketplace | `ecc` | `.agents/plugins/marketplace.json`；`codex plugin marketplace add --help` | Repo marketplace の add が GitHub 短縮形とローカルルートをサポート；ローカル temp-home add スモーク合格 | rc.1 の Codex 配布パスとして使用 |
| OpenCode パッケージ | `ecc-universal` | `node -p "require('./.opencode/package.json').name"` | `ecc-universal` | 維持 |
| OpenCode ビルド | 生成されたパッケージ出力 | `npm run build:opencode` | 合格 | パッケージ dry-run ゲートの準備完了 |
| npm pack サーフェス | 縮小されたランタイムパッケージ | `npm pack --dry-run --json` | `ecc-universal-2.0.0-rc.1.tgz` を生成、969 エントリ、展開後約 5.0 MB | 最終リリースコミットからの再実行が必要 |

## 公表パス

| パス | 現在のエビデンス | 必要な次のアクション | ブロッカー |
| --- | --- | --- | --- |
| GitHub リリース | `docs/releases/2.0.0-rc.1/` とリリースノートがツリー内にある | 最終リリースコミットから必要なコマンドエビデンスを再実行し、その後 `v2.0.0-rc.1` プレリリースを作成/検証 | まだタグ/リリースなし |
| npm | `ecc-universal` のローカルパッケージバージョンは `2.0.0-rc.1`；レジストリ latest は `1.10.0` | 最終の `npm pack --dry-run` とリリーステストの後、`npm publish --tag next` で rc を publish | 最終リリースコミット前には publish しない |
| Claude プラグイン | `claude plugin validate .claude-plugin/plugin.json` 合格；`claude plugin tag --help` がリリースタグフローで `{name}--v{version}` タグを作成しプッシュできることを確認 | クリーンなリリースコミットから `claude plugin tag .claude-plugin --dry-run` を実行し、その後リリース承認後にのみ tag/push | このパスではプラグインリリースタグが未作成 |
| Claude marketplace | `.claude-plugin/marketplace.json` が `ecc` と公開リポジトリを指す | タグ存在後に marketplace の更新/インストールパスを検証 | 外部 marketplace 伝播は未検証 |
| Codex プラグイン | `codex plugin marketplace` が add/upgrade/remove をサポート；`.codex-plugin/plugin.json` が存在；`.agents/plugins/marketplace.json` がリポジトリルートから `ecc` を公開；temp-home ローカル `codex plugin marketplace add` 合格 | repo-marketplace コマンドで rc.1 ドキュメントを公開し、その後 OpenAI の公式 Plugin Directory セルフサーブパスを監視 | 公式 Plugin Directory の公開は coming soon と文書化されている |
| OpenCode パッケージ | `.opencode/package.json` がソースからビルドされ npm パッケージ内に同梱される | リリースコミットから `npm run build:opencode` とパッケージ dry-run を再実行 | このパスでは OpenCode CLI 1.2.21 が別個のプラグイン公開コマンドを公開していない |
| ECC Tools billing の主張 | README とローンチコピーが ECC Tools / marketplace コンテキストに言及 | ECC-Tools #73 が `/api/billing/readiness` `announcementGate` を追加；いかなる payment アナウンスの前にも Marketplace 管理下のテストアカウントに対して実行 | billing アナウンスのコードゲートは存在；ライブ Marketplace アカウントのリードバックは未了 |
| ソーシャルおよびロングフォームコピー | X スレッド、LinkedIn コピー、記事アウトライン、GitHub リリースコピーが存在 | 古い URL を置き換え、その後 release/npm/plugin の URL が機能した後にのみ公開 | リリースアクション完了まで公開 URL は最終ではない |

## rc.1 後の改名

rc.1 後にプロジェクトが「Everything Claude Code」から「ECC」へ移行する場合は、
段階的移行として実施します：

1. 置き換えパッケージに検証済みオーナー、非推奨計画、インストール移行が揃うまで、
   npm パッケージとして `ecc-universal` を維持する。
2. リリースノート、ドキュメント、プラグイン marketplace エントリ、npm メタデータ、外部リンクが
   リダイレクトの準備が整うまで、`affaan-m/everything-claude-code` を正規のリポジトリとして維持する。
3. 新しい図、ステータスペイロード、クロスハーネスドキュメントでは、
   すぐに製品名として `ECC` を使う。
4. 改名を発表する前に、新しい GitHub/npm/パッケージのサーフェスを予約または作成する。
5. 旧コマンド、パッケージ名、プラグインスラグ、ドキュメント URL を新しい名前にマップする
   互換性ガイドを出荷する。

## このパスでキャプチャしたエビデンス

```text
git rev-parse HEAD
7109ee08db7209c5d14809efcf832043020dfc57

node -p "require('./package.json').name + '@' + require('./package.json').version"
ecc-universal@2.0.0-rc.1

node -p "require('./.claude-plugin/plugin.json').name + '@' + require('./.claude-plugin/plugin.json').version"
ecc@2.0.0-rc.1

node -p "require('./.codex-plugin/plugin.json').name + '@' + require('./.codex-plugin/plugin.json').version"
ecc@2.0.0-rc.1

node -p "require('./.opencode/package.json').name + '@' + require('./.opencode/package.json').version"
ecc-universal@2.0.0-rc.1

npm view ecc name version description repository.url --json
ecc@0.0.2 is occupied by an unrelated elliptic curve cryptography package.

npm view ecc-universal name version dist-tags --json
registry latest is 1.10.0; no rc dist-tag exists yet.

claude plugin validate .claude-plugin/plugin.json
Validation passed on Claude Code 2.1.121.

node tests/docs/ecc2-release-surface.test.js
18 release-surface checks passed.

node tests/scripts/npm-publish-surface.test.js
2 npm publish-surface checks passed.

npm run build:opencode
Passed.

npm pack --dry-run --json
Produced ecc-universal-2.0.0-rc.1.tgz, 969 entries, about 5.0 MB unpacked.

codex plugin marketplace add --help
Supports GitHub shorthand, HTTP(S) Git URLs, SSH URLs, local marketplace roots,
--ref, and Git-only --sparse.

HOME="$(mktemp -d)" codex plugin marketplace add <local-checkout>
Added marketplace ecc and recorded the installed marketplace root as
<local-checkout> without touching the real Codex config.
```
