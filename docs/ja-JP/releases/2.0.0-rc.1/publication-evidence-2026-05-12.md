# ECC v2.0.0-rc.1 公表エビデンス — 2026-05-12

これはドライランのリリースエビデンスのみです。GitHub リリース、npm 公開、プラグインタグ、marketplace 提出、アナウンス投稿を作成しません。

## ソースコミット

| フィールド | エビデンス |
| --- | --- |
| Upstream main ベース | `0598af70a51346bae34d987b9bed143386055967` |
| エビデンスブランチ | `codex/release-publication-evidence` |
| エビデンススコープ | このブランチのパッケージ衛生とリリースドキュメント更新を含むワーキングツリー |
| Git remote | `https://github.com/affaan-m/everything-claude-code.git` |
| ローカルステータスの但し書き | ワーキングツリーに無関係な untracked `docs/drafts/` ディレクトリがあった |

実際のリリースオペレーターは、公開前にクリーンなチェックアウトで最終リリースコミットからこれらのチェックを再実行すべきです。

## レジストリとリリースの状態

| サーフェス | コマンド | 結果 |
| --- | --- | --- |
| GitHub プレリリース | `gh release view v2.0.0-rc.1 --repo affaan-m/everything-claude-code --json tagName,url,isPrerelease` | `release not found` |
| npm dist-tags | `npm view ecc-universal dist-tags --json` | `{ "latest": "1.10.0" }` |
| npm パッケージメタデータ | `node -p "require('./package.json').name + '@' + require('./package.json').version"` | `ecc-universal@2.0.0-rc.1` |
| 製品アイデンティティ | `rg -n "Everything Claude Code" README.md CHANGELOG.md docs/releases/2.0.0-rc.1` | README と rc.1 リリースドキュメントに存在 |

## npm ドライラン

最初の pack パスで、広範なパッケージの `files` エントリが untracked なローカル `__pycache__`
パスを含んでいたため、tarball 内にローカルの Python バイトコードキャッシュファイルが露出しました。
このブランチは明示的なパッケージファイルの除外とリグレッションテストを追加し、パッケージサーフェスに
Python バイトコードが現れた場合に `npm pack` が失敗するようにします。

| コマンド | 結果 |
| --- | --- |
| `node tests/scripts/npm-publish-surface.test.js` | `2/2` 合格；Python バイトコード除外のアサーションを含む |
| `npm pack --dry-run --json` | `ecc-universal-2.0.0-rc.1.tgz`；`entryCount: 965`；`size: 1565968`；`unpackedSize: 4934637`；`hasBytecode: false` |
| `npm publish --tag next --dry-run --json` | ドライランのターゲットは `tag next` の npm レジストリ；`entryCount: 965`；`hasBytecode: false` |

一時的なインストールスモーク：

| コマンド | 結果 |
| --- | --- |
| `npm pack --pack-destination /tmp/ecc-publication-smoke-dd9ud5 --json` | ローカルインストールスモーク用に `ecc-universal-2.0.0-rc.1.tgz` を作成 |
| `npm install --prefix /tmp/ecc-publication-smoke-dd9ud5 /tmp/ecc-publication-smoke-dd9ud5/ecc-universal-2.0.0-rc.1.tgz` | 8 パッケージを追加 |
| `node /tmp/ecc-publication-smoke-dd9ud5/node_modules/ecc-universal/scripts/ecc.js --help` | ECC selective-install CLI のヘルプを出力 |
| `node /tmp/ecc-publication-smoke-dd9ud5/node_modules/ecc-universal/scripts/catalog.js profiles --json` | 6つのインストールプロファイルを返す：`minimal`、`core`、`developer`、`security`、`research`、`full` |
| `find /tmp/ecc-publication-smoke-dd9ud5/node_modules/ecc-universal -path '*__pycache__*' -o -name '*.pyc' -o -name '*.pyo' -o -name '*.pyd'` | 出力なし |

## プラグインとハーネスのエビデンス

| サーフェス | コマンド | 結果 |
| --- | --- | --- |
| Claude プラグインマニフェスト | `claude plugin validate .claude-plugin/plugin.json` | 合格 |
| Claude プラグインタグのプリフライト | `claude plugin tag .claude-plugin --dry-run` | 無関係な untracked `docs/drafts/` によりブロック |
| Claude プラグインタグの強制ドライラン | `claude plugin tag .claude-plugin --dry-run --force` | HEAD に `ecc--v2.0.0-rc.1` を作成する；メンテナーが決定しない限り、実際のリリースに `--force` を使わない |
| Codex marketplace CLI | `codex plugin marketplace --help` とサブコマンドヘルプ | `add`、`upgrade`、`remove` をサポート；`add` はリポジトリとローカル marketplace ルートをサポート |
| OpenCode パッケージ | `npm run build:opencode` | 合格 |
| Claude hook/plugin ルート | `node tests/hooks/hooks.test.js` | `236/236` 合格 |
| Codex リリースサーフェス | `node tests/docs/ecc2-release-surface.test.js` | `18/18` 合格 |
| Agent/catalog メタデータ | `node tests/scripts/catalog.test.js` | `7/7` 合格 |
| オブザーバビリティゲート | `npm run observability:ready` | `16/16` 合格 |

## クリーンチェックアウトの Claude プラグインスモーク

このフォローアップパスは、コミット
`bfacf37715b39655cbc2c48f12f2a35c67cb0253` から
`/tmp/ecc-clean-plugin-evidence` にある detached なクリーンワークツリーを使用しました。
分離された一時ホーム（`HOME=/tmp/ecc-clean-plugin-home`）と一時ローカルプロジェクト
（`/tmp/ecc-plugin-install-smoke`）を使用したため、ユーザーの実際の Claude
プラグイン設定には書き込みませんでした。

| コマンド | 結果 |
| --- | --- |
| `git -C /tmp/ecc-clean-plugin-evidence status --short --branch` | dirty または untracked ファイルなしで `## HEAD (no branch)` |
| `claude plugin validate .claude-plugin/plugin.json` | 合格 |
| `claude plugin validate .claude-plugin/marketplace.json` | 合格 |
| `claude plugin tag .claude-plugin --dry-run` | `--force` なしで合格；HEAD に `ecc--v2.0.0-rc.1` を作成し `refs/tags/ecc--v2.0.0-rc.1` をプッシュする |
| 一時 `HOME` での `claude plugin marketplace add /tmp/ecc-clean-plugin-evidence --scope local` | ローカル設定に marketplace `ecc` を追加 |
| 一時 `HOME` での `claude plugin list --available --json` | `ecc@ecc`、バージョン `2.0.0-rc.1`、ソース `./` をリスト |
| 一時 `HOME` での `claude plugin install ecc@ecc --scope local` | ローカルスコープに `ecc@ecc` をインストール |
| 一時 `HOME` での `claude plugin list --json` | `ecc@ecc`、バージョン `2.0.0-rc.1`、有効、ローカルスコープ、`/tmp/ecc-clean-plugin-home/.claude/plugins/cache/ecc/ecc/2.0.0-rc.1` 配下のインストールパスをリスト |
| 一時 `HOME` での `claude plugin uninstall ecc@ecc --scope local` | 正常にアンインストール；最終的なプラグインリストは `[]` |

## アナウンスプレースホルダーチェック

禁止プレースホルダーのスキャンは、それらの禁止プレースホルダーを名指しする publication-readiness
チェックリストの行のみを返しました。ローンチパックのプレースホルダーインスタンスは見つかりませんでした。

## 残りのブロッカー

- GitHub プレリリース `v2.0.0-rc.1` を作成または検証する。
- npm dist-tag `next` で `ecc-universal@2.0.0-rc.1` を publish する。
- 明示的な承認の後にのみ、Claude プラグインタグを作成してプッシュする。クリーンな
  チェックアウトのドライランと一時インストールスモークは現在合格している。
- ライブの Claude/Codex/OpenCode marketplace 提出パスを確認するか、手動提出のオーナーとステータスを記録する。
- ローンチコピーで使用する前に、ECC Tools の billing/App/Marketplace の主張を検証する。
- リリースとパッケージ/プラグインの URL が存在した後、ライブ URL でアナウンスコピーをリフレッシュする。
