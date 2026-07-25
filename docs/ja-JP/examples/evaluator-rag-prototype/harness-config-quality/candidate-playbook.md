# ハーネス設定品質プレイブック

候補ID：`adapter-matrix-backed-drift-check`

PR、インストール変更、またはセットアップ推奨が、MCP、プラグイン、フック、コマンド、エージェント、
ルール、インストールターゲット、またはハーネスアダプターのサーフェスに触れる場合に、
このプレイブックを使用します。

## 承認パス

1. 変更対象のハーネス/設定サーフェスを特定する。
2. アダプター状態を
   `docs/architecture/harness-adapter-compliance.md` または
   `scripts/lib/harness-adapter-compliance.js` から取得する。
3. ハーネスが `Native`、`Adapter-backed`、`Instruction-backed`、
   または `Reference-only` のいずれであるかを記録する。
4. マトリックスからインストール/オンランプのパスと検証コマンドを特定する。
5. マージ、ドライラン、または明示的な非上書き（no-overwrite）の挙動を使用して、
   既存のユーザー設定とプロジェクト設定を保持する。
6. 関連する検証ゲートを実行する：
   - `npm run harness:adapters -- --check`
   - `npm run harness:audit -- --format json`
   - `node tests/lib/install-targets.test.js`
   - `node tests/opencode-plugin-hooks.test.js`
   - `node tests/docs/mcp-management-docs.test.js`
7. エビデンスがハーネス状態と一致し、設定保持の挙動が明示的である場合にのみ、
   設定推奨を昇格させる。

## 却下パス

アダプターマトリックスとテストが証明しない限り、Codex、Gemini、Zed、OpenCode、
またはその他のハーネスについて Claude のフックパリティを主張しないこと。

マージ/ドライランのパスとロールバックノートなしに、`settings.json`、MCP設定、
プラグインマニフェスト、ルールファイル、またはコマンドサーフェスを上書きしないこと。

エバリュエーターの実行から、ライブのMCPサーバーの切り替え、プラグインの公開、
またはユーザーレベルのハーネス設定の編集を行わないこと。

## 最小限の検証

- `npm run harness:adapters -- --check`
- `npm run harness:audit -- --format json`
- 変更されたサーフェスに対する、焦点を絞ったinstall、plugin、MCP、またはhookのテスト
- `git diff --check`
- ドキュメントを変更した場合はMarkdown lint

アダプター状態、リスクノート、検証コマンド、および設定保持の挙動を、
メンテナーのPR本文またはハンドオフに記録すること。
