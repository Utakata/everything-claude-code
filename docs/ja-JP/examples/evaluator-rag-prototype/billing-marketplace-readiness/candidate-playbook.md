# Billing Marketplace Readiness プレイブック

リリースコピーまたはロードマップのテキストが、ECC Tools の課金（billing）、Marketplace の提供状況、
アカウント復旧、プラン、シート、エンタイトルメント、またはサブスクリプション状態に言及する場合に、
このプレイブックを使用します。

## 承認パス

1. `docs/releases/2.0.0-rc.1/publication-readiness.md` から始める。
2. 現在のリポジトリと公開リスティングのサーフェスを確認する：
   - `gh api repos/ECC-Tools/ECC-Tools`
   - `https://github.com/marketplace/ecc-tools`
3. すべての課金またはMarketplaceの主張を次のように分類する：
   - `verified`
   - `blocked`
   - `remove-before-publication`
4. ロードマップの受け入れ基準を、ライブ製品の主張とは分離して保つ。
5. エビデンスがライブURLまたはコマンド結果を指し示した後にのみ、リリースコピーを更新する。
6. タグ作成、npm publish、プラグイン提出、marketplace編集、サブスクリプション変更、
   およびアナウンス投稿は、承認ゲート付きのままにする。

## 却下パス

ロードマップ項目が存在する、ドライランが成功した、またはMarketplace URLが分かっているという理由で、
課金がライブであると言わないこと。ロードマップの意図やドライランの公開エビデンスは、
課金状態ではありません。

エバリュエーターの実行から、プラン制限、サブスクリプション、シート、エンタイトルメント、
またはMarketplaceメタデータを編集しないこと。これらは製品/オペレーターのアクションであり、
それぞれの承認パスが必要です。

## 検証ゲート

- `rg -n "billing|Billing|Marketplace|marketplace|subscription|seat|entitlement|plan" README.md docs/releases/2.0.0-rc.1 docs/ECC-2.0-GA-ROADMAP.md`
- `gh api repos/ECC-Tools/ECC-Tools`
- `https://github.com/marketplace/ecc-tools` の手動ライブチェック
- `npx --yes markdownlint-cli docs/releases/2.0.0-rc.1/*.md docs/ECC-2.0-GA-ROADMAP.md`
- `git diff --check`

リリースコピーが公開される前に、メンテナー所有のPRにエビデンスを記録すること。
