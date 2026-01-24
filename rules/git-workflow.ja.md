# Gitワークフロー

## コミットメッセージフォーマット

```
<type>: <description>

<optional body>
```

Types: feat, fix, refactor, docs, test, chore, perf, ci

Note: `~/.claude/settings.json` によりグローバルで Attribution は無効化されている。

## プルリクエストワークフロー

PR作成時：
1. (最新コミットだけでなく) 全コミット履歴を分析する
2. `git diff [base-branch]...HEAD` を使用してすべての変更を確認する
3. 包括的なPRサマリを作成する
4. TODOを含むテスト計画を含める
5. 新しいブランチの場合は `-u` フラグを付けてプッシュする

## 機能実装ワークフロー

1. **まず計画する**
   - **planner** エージェントを使用して実装計画を作成する
   - 依存関係とリスクを特定する
   - フェーズに分解する

2. **TDDアプローチ**
   - **tdd-guide** エージェントを使用する
   - 最初にテストを書く (RED)
   - テストをパスさせるために実装する (GREEN)
   - リファクタリング (IMPROVE)
   - 80%以上のカバレッジを検証する

3. **コードレビュー**
   - コードを書いた直後に **code-reviewer** エージェントを使用する
   - CRITICAL および HIGH の問題に対処する
   - 可能な場合 MEDIUM の問題を修正する

4. **コミット & プッシュ**
   - 詳細なコミットメッセージ
   - Conventional Commits フォーマットに従う
