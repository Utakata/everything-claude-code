# Everything Claude Code - トラブルシューティングガイド (Troubleshooting Guide)

このガイドでは、Everything Claude Code プラグインを使用する際の一般的な問題、その原因、および解決策について説明する。

## 目次 (Table of Contents)

- [メモリとコンテキストの問題 (Memory & Context Issues)](#memory--context-issues)
- [エージェントハーネスの失敗 (Agent Harness Failures)](#agent-harness-failures)
- [フックとワークフローのエラー (Hook & Workflow Errors)](#hook--workflow-errors)
- [インストールとセットアップ (Installation & Setup)](#installation--setup)
- [パフォーマンスの問題 (Performance Issues)](#performance-issues)
- [一般的なエラーメッセージ (Common Error Messages)](#common-error-messages)
- [ヘルプを得る (Getting Help)](#getting-help)

---

## メモリとコンテキストの問題 (Memory & Context Issues)

### コンテキストウィンドウのオーバーフロー (Context Window Overflow)

**症状:** "Context too long" エラー、または不完全な応答

**原因:**
- トークン制限を超える大きなファイルのアップロード
- 蓄積された会話履歴
- 1つのセッションでの複数の大きなツール出力

**解決策:**
```bash
# 1. 会話履歴をクリアして新しく始める
# Claude Code を使用: "New Chat" または Cmd/Ctrl+Shift+N

# 2. 分析の前にファイルサイズを縮小する
head -n 100 large-file.log > sample.log

# 3. 大きな出力にはストリーミングを使用する
head -n 50 large-file.txt

# 4. タスクを小さなチャンクに分割する
# 「50個のファイルすべてを分析する」の代わりに
# 「src/components/ ディレクトリ内のファイルを分析する」を使用する
```

### メモリ永続化の失敗 (Memory Persistence Failures)

**症状:** エージェントが以前のコンテキストや観察結果を覚えていない

**原因:**
- 継続的学習（continuous-learning）フックが無効になっている
- 観察（observations）ファイルが破損している
- プロジェクトの検出に失敗した

**解決策:**
```bash
# 観察が記録されているか確認する
ls ~/.claude/homunculus/projects/*/observations.jsonl

# 現在のプロジェクトのハッシュIDを検索する
python3 - <<'PY'
import json, os
registry_path = os.path.expanduser("~/.claude/homunculus/projects.json")
with open(registry_path) as f:
    registry = json.load(f)
for project_id, meta in registry.items():
    if meta.get("root") == os.getcwd():
        print(project_id)
        break
else:
    raise SystemExit("Project hash not found in ~/.claude/homunculus/projects.json")
PY

# そのプロジェクトの最近の観察を表示する
tail -20 ~/.claude/homunculus/projects/<project-hash>/observations.jsonl

# 破損した観察ファイルを再作成する前にバックアップする
mv ~/.claude/homunculus/projects/<project-hash>/observations.jsonl \
  ~/.claude/homunculus/projects/<project-hash>/observations.jsonl.bak.$(date +%Y%m%d-%H%M%S)

# フックが有効になっているか確認する
grep -r "observe" ~/.claude/settings.json
```

---

## エージェントハーネスの失敗 (Agent Harness Failures)

### エージェントが見つからない (Agent Not Found)

**症状:** "Agent not loaded" または "Unknown agent" エラー

**原因:**
- プラグインが正しくインストールされていない
- エージェントのパス設定の誤り
- マーケットプレイスと手動インストールの不一致

**解決策:**
```bash
# プラグインのインストールを確認する
ls ~/.claude/plugins/cache/

# エージェントが存在するか確認する（マーケットプレイスインストールの場合）
ls ~/.claude/plugins/cache/*/agents/

# 手動インストールの場合、エージェントは以下にあるはずである:
ls ~/.claude/agents/  # カスタムエージェントのみ

# プラグインをリロードする
# Claude Code → Settings → Extensions → Reload
```

### ワークフローの実行がハングする (Workflow Execution Hangs)

**症状:** エージェントは起動するが完了しない

**原因:**
- エージェントロジックの無限ループ
- ユーザー入力でブロックされている
- APIを待機中にネットワークタイムアウトが発生した

**解決策:**
```bash
# 1. 停止しているプロセスがないか確認する
ps aux | grep claude

# 2. デバッグモードを有効にする
export CLAUDE_DEBUG=1

# 3. タイムアウトを短く設定する
export CLAUDE_TIMEOUT=30

# 4. ネットワーク接続を確認する
curl -I https://api.anthropic.com
```

### ツール使用エラー (Tool Use Errors)

**症状:** "Tool execution failed" または permission denied

**原因:**
- 依存関係の欠落（npm, python など）
- ファイルの権限が不十分
- パスが見つからない

**解決策:**
```bash
# 必要なツールがインストールされているか確認する
which node python3 npm git

# フックスクリプトの権限を修正する
chmod +x ~/.claude/plugins/cache/*/hooks/*.sh
chmod +x ~/.claude/plugins/cache/*/skills/*/hooks/*.sh

# PATH に必要なバイナリが含まれているか確認する
echo $PATH
```

---

## フックとワークフローのエラー (Hook & Workflow Errors)

### フックが発火しない (Hooks Not Firing)

**症状:** 実行前/後のフックが実行されない

**原因:**
- settings.json にフックが登録されていない
- フックの構文が無効
- フックスクリプトが実行可能でない

**解決策:**
```bash
# フックが登録されているか確認する
grep -A 10 '"hooks"' ~/.claude/settings.json

# フックファイルが存在し、実行可能であるか確認する
ls -la ~/.claude/plugins/cache/*/hooks/

# フックを手動でテストする
bash ~/.claude/plugins/cache/*/hooks/pre-bash.sh <<< '{"command":"echo test"}'

# フックを再登録する（プラグインを使用している場合）
# Claude Code の設定でプラグインを無効にしてから再度有効にする
```

### Python/Node バージョンの不一致 (Python/Node Version Mismatches)

**症状:** "python3 not found" または "node: command not found"

**原因:**
- Python/Node がインストールされていない
- PATH が設定されていない
- Python のバージョンが間違っている（Windows）

**解決策:**
```bash
# Python 3 をインストールする（ない場合）
# macOS: brew install python3
# Ubuntu: sudo apt install python3
# Windows: Download from python.org

# Node.js をインストールする（ない場合）
# macOS: brew install node
# Ubuntu: sudo apt install nodejs npm
# Windows: Download from nodejs.org

# インストールを確認する
python3 --version
node --version
npm --version

# Windows: python3 ではなく python が機能することを確認する
python --version
```

### 開発サーバーブロッカーの誤検知 (Dev Server Blocker False Positives)

**症状:** "dev" を含む正当なコマンドがフックによってブロックされる

**原因:**
- ヒアドキュメント（Heredoc）の内容がパターンマッチをトリガーしている
- 引数に "dev" を含む非 dev コマンド

**解決策:**
```bash
# これは v1.8.0+ で修正されている (PR #371)
# プラグインを最新バージョンにアップグレードする

# 回避策: dev サーバーを tmux でラップする
tmux new-session -d -s dev "npm run dev"
tmux attach -t dev

# 必要に応じて一時的にフックを無効にする
# ~/.claude/settings.json を編集し、pre-bash フックを削除する
```

---

## インストールとセットアップ (Installation & Setup)

### プラグインがロードされない (Plugin Not Loading)

**症状:** インストール後にプラグインの機能が利用できない

**原因:**
- マーケットプレイスのキャッシュが更新されていない
- Claude Code バージョンの非互換性
- プラグインファイルが破損している
- ローカルの Claude 設定がワイプまたはリセットされた

**解決策:**
```bash
# まず、このマシンについて ECC がまだ知っていることを調査する
ecc list-installed
ecc doctor
ecc repair

# doctor/repair で不足しているファイルを復元できない場合にのみ再インストールする

# 変更する前にプラグインキャッシュを検査する
ls -la ~/.claude/plugins/cache/

# プラグインキャッシュをそのまま削除するのではなくバックアップする
mv ~/.claude/plugins/cache ~/.claude/plugins/cache.backup.$(date +%Y%m%d-%H%M%S)
mkdir -p ~/.claude/plugins/cache

# マーケットプレイスから再インストールする
# Claude Code → Extensions → Everything Claude Code → Uninstall
# その後、マーケットプレイスから再インストールする

# 問題がマーケットプレイス/アカウントアクセスである場合は、ECC Tools の課金/アカウント回復を個別に使用する。アカウント回復の代わりとして再インストールを使用しないこと。

# Claude Code のバージョンを確認する
claude --version
# Claude Code 2.0+ が必要

# 手動インストール（マーケットプレイスが失敗する場合）
git clone https://github.com/affaan-m/everything-claude-code.git
cp -r everything-claude-code ~/.claude/plugins/ecc
```

### パッケージマネージャーの検出に失敗する (Package Manager Detection Fails)

**症状:** 間違ったパッケージマネージャーが使用されている（pnpm ではなく npm）

**原因:**
- ロックファイルが存在しない
- CLAUDE_PACKAGE_MANAGER が設定されていない
- 複数のロックファイルが検出を混乱させている

**解決策:**
```bash
# 優先するパッケージマネージャーをグローバルに設定する
export CLAUDE_PACKAGE_MANAGER=pnpm
# ~/.bashrc または ~/.zshrc に追加する

# またはプロジェクトごとに設定する
echo '{"packageManager": "pnpm"}' > .claude/package-manager.json

# または package.json フィールドを使用する
npm pkg set packageManager="pnpm@8.15.0"

# 警告: ロックファイルを削除すると、インストールされている依存関係のバージョンが変更される可能性がある。
# 最初にロックファイルをコミットまたはバックアップしてから、クリーンインストールを実行し、CIを再実行すること。
# これは、意図的にパッケージマネージャーを切り替える場合にのみ行うこと。
rm package-lock.json  # pnpm/yarn/bun を使用している場合
```

---

## パフォーマンスの問題 (Performance Issues)

### 応答時間が遅い (Slow Response Times)

**症状:** エージェントの応答に 30 秒以上かかる

**原因:**
- 観察（observation）ファイルが大きい
- アクティブなフックが多すぎる
- API へのネットワーク遅延

**解決策:**
```bash
# 大きな観察ファイルを削除するのではなくアーカイブする
archive_dir="$HOME/.claude/homunculus/archive/$(date +%Y%m%d)"
mkdir -p "$archive_dir"
find ~/.claude/homunculus/projects -name "observations.jsonl" -size +10M -exec sh -c '
  for file do
    base=$(basename "$(dirname "$file")")
    gzip -c "$file" > "'"$archive_dir"'/${base}-observations.jsonl.gz"
    : > "$file"
  done
' sh {} +

# 使用していないフックを一時的に無効にする
# ~/.claude/settings.json を編集する

# アクティブな観察ファイルを小さく保つ
# 大きなアーカイブは ~/.claude/homunculus/archive/ の下に配置する必要がある
```

### CPU 使用率が高い (High CPU Usage)

**症状:** Claude Code が CPU を 100% 消費している

**原因:**
- 無限の観察ループ
- 大規模なディレクトリのファイル監視
- フックのメモリリーク

**解決策:**
```bash
# 暴走しているプロセスがないか確認する
top -o cpu | grep claude

# 継続的学習を一時的に無効にする
touch ~/.claude/homunculus/disabled

# Claude Code を再起動する
# Cmd/Ctrl+Q を押してから再度開く

# 観察ファイルのサイズを確認する
du -sh ~/.claude/homunculus/*/
```

---

## 一般的なエラーメッセージ (Common Error Messages)

### "EACCES: permission denied"

```bash
# フックの権限を修正する
find ~/.claude/plugins -name "*.sh" -exec chmod +x {} \;

# 観察ディレクトリの権限を修正する
chmod -R u+rwX,go+rX ~/.claude/homunculus
```

### "MODULE_NOT_FOUND"

```bash
# プラグインの依存関係をインストールする
cd ~/.claude/plugins/cache/ecc
npm install

# または手動インストールの場合は
cd ~/.claude/plugins/ecc
npm install
```

### "spawn UNKNOWN"

```bash
# Windows 固有: スクリプトが正しい改行コードを使用していることを確認する
# CRLF を LF に変換する
find ~/.claude/plugins -name "*.sh" -exec dos2unix {} \;

# または dos2unix をインストールする
# macOS: brew install dos2unix
# Ubuntu: sudo apt install dos2unix
```

---

## ヘルプを得る (Getting Help)

まだ問題が発生している場合:

1. **GitHub Issues を確認する**: [github.com/affaan-m/everything-claude-code/issues](https://github.com/affaan-m/everything-claude-code/issues)
2. **デバッグログを有効にする**:
   ```bash
   export CLAUDE_DEBUG=1
   export CLAUDE_LOG_LEVEL=debug
   ```
3. **診断情報を収集する**:
   ```bash
   claude --version
   node --version
   python3 --version
   echo $CLAUDE_PACKAGE_MANAGER
   ls -la ~/.claude/plugins/cache/
   ```
4. **Issue を開く**: デバッグログ、エラーメッセージ、および診断情報を含めること

---

## 関連ドキュメント (Related Documentation)

- [README.md](./README.md) - インストールと機能
- [CONTRIBUTING.md](./CONTRIBUTING.md) - 開発ガイドライン
- [docs/](./docs/) - 詳細なドキュメント
- [examples/](./examples/) - 使用例
