# CI失敗診断プレイブック

候補ID：`log-backed-minimal-fix`

PR、メンテナーブランチ、またはリリース準備ブランチに、1つ以上の赤い GitHub Actions チェックがある場合に、
このプレイブックを使用します。

## 承認パス

1. PRとブランチのコンテキストをキャプチャする：
   - `gh pr view <pr-number> --json files,statusCheckRollup,headRefName,baseRefName`
   - `gh run view <run-id> --json jobs`
2. 失敗したログのエビデンスを取得する：
   - `gh run view <run-id> --log-failed`
3. 失敗したジョブ、ステップ、OS、Node/Python/Rust のバージョン、パッケージマネージャー、
   および最短で有用なエラー抜粋を記録する。
4. 失敗したステップを、PRの変更ファイルと比較する。
5. 既知の一致する失敗モードを、現在のドキュメント、テスト、および過去のPRから検索する。
6. ローカル再現またはリグレッションコマンドを含む場合にのみ、最小の修正パスを昇格させる。
7. 別の実装ブランチが存在した後、焦点を絞ったローカルゲートを再実行し、
   マージ前に GitHub Actions の全マトリックスを待つ。

## 却下パス

元の失敗と、それを無視して安全な理由を記録せずに、一時的なグリーン結果が現れるまで
CIを再実行し続けないこと。

チェックを通すためだけに、テストを弱めたり、マトリックスの脚（leg）をスキップしたり、
パッチを無関係なファイルに広げたりしないこと。

必須チェックがまだ赤いブランチから、リリース準備完了を主張しないこと。

## 最小限の検証

- `gh run view <run-id> --log-failed`
- 失敗したサーフェスに一致する、焦点を絞ったローカルコマンド。例：
  - `node tests/<matching-test>.js`
  - `npm run harness:audit -- --format json`
  - `npm run observability:ready`
  - `cargo test`
- `git diff --check`
- マージ前の GitHub Actions の必須マトリックス全体

修正をマージする前に、失敗したログの抜粋と選択したリグレッションコマンドを、
メンテナーのPR本文またはハンドオフに記録すること。
