# GANスタイルハーネスの例

Generator-Evaluator ハーネスをさまざまなプロジェクトタイプで使用する方法を示す例です。

## クイックスタート

```bash
# フルスタックWebアプリ（3つのエージェントすべてを使用）
./scripts/gan-harness.sh "Build a project management app with Kanban boards and team collaboration"

# フロントエンドデザイン（plannerをスキップし、デザインの反復に集中）
GAN_SKIP_PLANNER=true ./scripts/gan-harness.sh "Create a stunning landing page for a crypto portfolio tracker"

# APIのみ（ブラウザテスト不要）
GAN_EVAL_MODE=code-only ./scripts/gan-harness.sh "Build a REST API for a recipe sharing platform with search and ratings"

# 予算がタイト（反復回数を減らし、しきい値を下げる）
GAN_MAX_ITERATIONS=5 GAN_PASS_THRESHOLD=6.5 ./scripts/gan-harness.sh "Build a todo app with categories and due dates"
```

## 例：コマンドの使用

```bash
# Claude Codeのインタラクティブモードで：
/project:gan-build "Build a music streaming dashboard with playlists, visualizer, and social features"

# オプション付き：
/project:gan-build "Build a recipe sharing platform" --max-iterations 10 --pass-threshold 7.5 --eval-mode screenshot
```

## 例：手動での3エージェント実行

最大限の制御のために、各エージェントを個別に実行します：

```bash
# ステップ1：計画（spec.mdを生成）
claude -p --model opus "$(cat agents/gan-planner.md)

Your brief: 'Build a retro game maker with sprite editor and level designer'

Write the full spec to gan-harness/spec.md and eval rubric to gan-harness/eval-rubric.md."

# ステップ2：生成（イテレーション1）
claude -p --model opus "$(cat agents/gan-generator.md)

Iteration 1. Read gan-harness/spec.md. Build the initial application.
Start dev server on port 3000. Commit as iteration-001."

# ステップ3：評価（イテレーション1）
claude -p --model opus "$(cat agents/gan-evaluator.md)

Iteration 1. Read gan-harness/eval-rubric.md.
Test http://localhost:3000. Write feedback to gan-harness/feedback/feedback-001.md.
Be ruthlessly strict."

# ステップ4：生成（イテレーション2 — フィードバックを読む）
claude -p --model opus "$(cat agents/gan-generator.md)

Iteration 2. Read gan-harness/feedback/feedback-001.md FIRST.
Address every issue. Then read gan-harness/spec.md for remaining features.
Commit as iteration-002."

# 満足するまでステップ3〜4を繰り返す
```

## 例：カスタム評価基準

非ビジュアルなプロジェクト（API、CLI、ライブラリ）の場合は、ルーブリックをカスタマイズします：

```bash
mkdir -p gan-harness
cat > gan-harness/eval-rubric.md << 'EOF'
# API Evaluation Rubric

### Correctness (weight: 0.4)
- Do all endpoints return expected data?
- Are edge cases handled (empty inputs, large payloads)?
- Do error responses have proper status codes?

### Performance (weight: 0.2)
- Response times under 100ms for simple queries?
- Database queries optimized (no N+1)?
- Pagination implemented for list endpoints?

### Security (weight: 0.2)
- Input validation on all endpoints?
- SQL injection prevention?
- Rate limiting implemented?
- Authentication properly enforced?

### Documentation (weight: 0.2)
- OpenAPI spec generated?
- All endpoints documented?
- Example requests/responses provided?
EOF

GAN_SKIP_PLANNER=true GAN_EVAL_MODE=code-only ./scripts/gan-harness.sh "Build a REST API for task management"
```

## プロジェクトタイプと推奨設定

| プロジェクトタイプ | Evalモード | 反復回数 | しきい値 | 概算コスト |
|-------------|-----------|------------|-----------|-----------|
| フルスタックWebアプリ | playwright | 10-15 | 7.0 | $100-200 |
| ランディングページ | screenshot | 5-8 | 7.5 | $30-60 |
| REST API | code-only | 5-8 | 7.0 | $30-60 |
| CLIツール | code-only | 3-5 | 6.5 | $15-30 |
| データダッシュボード | playwright | 8-12 | 7.0 | $60-120 |
| ゲーム | playwright | 10-15 | 7.0 | $100-200 |

## 出力の理解

各実行後、以下を確認します：

1. **`gan-harness/build-report.md`** — スコア進行を含む最終サマリー
2. **`gan-harness/feedback/`** — すべての評価フィードバック（品質の進化を理解するのに役立つ）
3. **`gan-harness/spec.md`** — 完全なspec（手動で続けたい場合に役立つ）
4. **スコア進行** — 着実な改善を示すはずです。プラトー（横ばい）はモデルが上限に達したことを示します。

## ヒント

1. **明確なブリーフから始める** — 「XをYとZで作る」は「何かかっこいいものを作る」に勝ります
2. **5回未満の反復にしない** — 最初の2〜3回の反復は通常しきい値を下回ります
3. **UIプロジェクトには `playwright` モードを使う** — スクリーンショットのみではインタラクションのバグを見逃します
4. **フィードバックファイルをレビューする** — 最終スコアが合格でも、フィードバックには貴重な洞察が含まれます
5. **specを反復改善する** — 結果が期待外れの場合は、`spec.md` を改善し、`--skip-planner` で再実行します
