# Deep Analyzer エビデンスプレイブック

候補ID：`corpus-backed-analyzer-change`

PRがリポジトリ分析、コミット分析、アーキテクチャ分類、ワークフロー検出、パターン検出、
またはdeep-analysisのリスク分類（risk-taxonomy）の挙動を変更する場合に、このプレイブックを使用します。

## 承認パス

1. 変更されたアナライザーのサーフェスとソースファイルを特定する。
2. `../ECC-Tools/README.md` から Deep Analyzer Evidence の契約を、
   `../ECC-Tools/src/lib/analyzer.ts` からフォローアップロジックを取得する。
3. 変更を、メンテナンス対象のコーパスまたはリファレンスエビデンスと突き合わせる：
   - `../ECC-Tools/src/analyzers/fixtures/deep-analyzer-corpus.ts`
   - `../ECC-Tools/src/analyzers/deep-analyzer-corpus.test.ts`
   - `../ECC-Tools/src/lib/analyzer.compare.test.ts`
4. 影響を受ける挙動について、期待される出力を比較する：
   - フォルダタイプ；
   - モジュール構成；
   - テストの配置場所；
   - 主要言語；
   - コミットメッセージのタイプ；
   - 検出されたワークフロー名。
5. 同じ変更対象サーフェスについて、アナライザーコーパス、期待出力スナップショット、フィクスチャ、
   ベンチマーク、ゴールデンケース、eval、またはリファレンスセットを追加または更新する。
6. `../ECC-Tools/` から関連する検証ゲートを実行する：
   - `npm test -- src/analyzers/deep-analyzer-corpus.test.ts src/lib/analyzer.compare.test.ts`
   - `npm run typecheck`
   - `npm run lint`
7. コーパスケース、期待出力の比較、検証出力、およびロールバックノートを、
   メンテナーのPR本文またはハンドオフに記録する。

## 却下パス

コーパス、スナップショット、フィクスチャ、ベンチマーク、ゴールデン、eval、またはリファレンスセットの
エビデンスなしに、アナライザーのしきい値、分類、またはリスク分類の変更を昇格させないこと。

変更が小さいというだけで `Deep Analyzer Evidence` のPRリスクバケットを抑制しないこと。
同じアナライザーサーフェスをカバーする併設エビデンスがある場合にのみ抑制すること。

広範な手動レビューノートだけに頼らないこと。アナライザーの変更には、期待出力を伴う
代表的なリポジトリ形状またはコミット履歴のケースが必要です。

エバリュエーターの実行から、PRコメントの投稿、check runの作成、Linearの同期、パッケージの公開、
プラグインの編集、またはリリースアーティファクトの作成を行わないこと。

## 最小限の検証

- `npm test -- src/analyzers/deep-analyzer-corpus.test.ts src/lib/analyzer.compare.test.ts`
- `npm run typecheck`
- `npm run lint`
- `git diff --check`
- ドキュメントまたはプレイブックを変更した場合はMarkdown lint

アナライザーエビデンスのソースアトリビューションを保持し、将来のメンテナーPRのために
ロールバックガイダンスを含めること。
