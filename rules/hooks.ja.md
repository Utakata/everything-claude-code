# フックシステム

## フックタイプ

- **PreToolUse**: ツール実行前 (バリデーション、パラメータ修正)
- **PostToolUse**: ツール実行後 (自動フォーマット、チェック)
- **Stop**: セッション終了時 (最終検証)

## 現在のフック (`~/.claude/settings.json` 内)

### PreToolUse
- **tmux reminder**: 長時間実行コマンド (npm, pnpm, yarn, cargoなど) に対して tmux を提案する
- **git push review**: プッシュ前に Zed を開いてレビューする
- **doc blocker**: 不要な .md/.txt ファイルの作成をブロックする

### PostToolUse
- **PR creation**: PR URL と GitHub Actions のステータスをログ出力する
- **Prettier**: 編集後に JS/TS ファイルを自動フォーマットする
- **TypeScript check**: .ts/.tsx ファイル編集後に tsc を実行する
- **console.log warning**: 編集されたファイル内の console.log について警告する

### Stop
- **console.log audit**: セッション終了前にすべての修正ファイルで console.log をチェックする

## 自動承認権限 (Auto-Accept Permissions)

注意して使用すること：
- 信頼できる、明確に定義された計画に対して有効にする
- 探索的な作業に対しては無効にする
- dangerously-skip-permissions フラグは決して使用しない
- 代わりに `~/.claude.json` で `allowedTools` を設定する

## TodoWrite ベストプラクティス

TodoWrite ツールを使用して以下を行う：
- マルチステップタスクの進捗を追跡する
- 指示の理解を確認する
- リアルタイムの操縦を可能にする
- 詳細な実装ステップを表示する

ToDoリストは以下を明らかにする：
- 順序が違うステップ
- 欠落している項目
- 余分な不要項目
- 間違った粒度
- 解釈ミスの要件
