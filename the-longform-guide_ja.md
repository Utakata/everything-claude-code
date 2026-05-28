# Everything Claude Code — ロングフォームガイド (The Longform Guide)

*このガイドは、`github.com/affaan-m/everything-claude-code/tree/main/hooks/memory-persistence` にあるリポジトリのコードを使用して実装することができる。*

---

### 継続的学習 / メモリ (Continuous Learning / Memory)

プロンプトを何度も繰り返さなければならなかったり、Claude が同じ問題にぶつかったり、以前聞いたことのあるような回答を返してきた場合 — それらのパターンはスキルに追加しなければならない。

**問題 (The Problem):** トークンの無駄遣い、コンテキストの無駄遣い、時間の無駄遣い。

**解決策 (The Solution):** Claude Code が些細ではないこと（デバッグ手法、回避策、プロジェクト固有のパターンなど）を発見した場合、その知識を新しいスキルとして保存する。次に似たような問題が発生したとき、そのスキルが自動的に読み込まれる。

私はこれを行うための継続的学習スキルを構築した: `github.com/affaan-m/everything-claude-code/tree/main/skills/continuous-learning`

**なぜ Stop フックなのか（UserPromptSubmit ではない理由）:**

重要な設計上の決定は、UserPromptSubmit の代わりに **Stop フック** を使用することである。UserPromptSubmit はすべてのメッセージで実行されるため、すべてのプロンプトに遅延（レイテンシ）が追加される。Stop はセッション終了時に1回だけ実行されるため、軽量であり、セッション中の速度を低下させない。

---

### トークンの最適化 (Token Optimization)

**主要な戦略: サブエージェントアーキテクチャ (Primary Strategy: Subagent Architecture)**

使用するツールとサブエージェントアーキテクチャを最適化し、タスクに十分な、可能な限り安価なモデルを委譲するように設計する。

**モデル選択クイックリファレンス (Model Selection Quick Reference):**

![Model Selection Table](./assets/images/longform/04-model-selection.png)
*様々な一般的なタスクにおけるサブエージェントの仮想的な設定と、その選択の背後にある理由*

| Task Type                 | Model  | Why                                        |
| ------------------------- | ------ | ------------------------------------------ |
| 探索/検索                 | Haiku  | 高速、安価、ファイルの検索には十分         |
| 簡単な編集                 | Haiku  | 単一ファイルの変更、明確な指示             |
| 複数ファイルの実装         | Sonnet | コーディングに最適なバランス               |
| 複雑なアーキテクチャ       | Opus   | 深い推論が必要                             |
| PR レビュー                | Sonnet | コンテキストを理解し、ニュアンスを捉える   |
| セキュリティ分析           | Opus   | 脆弱性を見逃すわけにはいかない             |
| ドキュメントの作成         | Haiku  | 構造がシンプルである                       |
| 複雑なバグのデバッグ       | Opus   | システム全体を念頭に置く必要がある         |

コーディングタスクの 90% は Sonnet をデフォルトとする。最初の試行が失敗した場合、タスクが 5 つ以上のファイルにまたがる場合、アーキテクチャの決定、またはセキュリティが重要なコードの場合は Opus にアップグレードする。

**価格リファレンス (Pricing Reference):**

![Claude Model Pricing](./assets/images/longform/05-pricing-table.png)
*出典: <https://platform.claude.com/docs/en/about-claude/pricing>*

**ツール固有の最適化 (Tool-Specific Optimizations):**

grep を mgrep に置き換える — 従来の grep や ripgrep と比較して、平均でトークンを約 50% 削減できる：

![mgrep Benchmark](./assets/images/longform/06-mgrep-benchmark.png)
*50のタスクベンチマークにおいて、mgrep + Claude Code は、grep ベースのワークフローと比較して、同等以上の判断品質でトークンを約 1/2 しか消費しなかった。出典: mgrep by @mixedbread-ai*

**モジュール化されたコードベースの利点 (Modular Codebase Benefits):**

メインファイルが数千行ではなく数百行になるような、よりモジュール化されたコードベースを持つことは、トークンの最適化コストの両方に役立ち、さらに最初の試行でタスクを正しく完了させるのにも役立つ。

---

### 検証ループと評価 (Verification Loops and Evals)

**ベンチマーキングワークフロー (Benchmarking Workflow):**

スキルを使用した場合と使用しない場合で同じことを要求し、出力の違いを確認して比較する：

会話をフォークし、そのうちの1つでスキルのない新しいワークツリーを開始し、最後に差分を引き上げて、何がログに記録されたかを確認する。

**評価パターンの種類 (Eval Pattern Types):**

- **チェックポイントベースの評価 (Checkpoint-Based Evals)**: 明示的なチェックポイントを設定し、定義された基準に照らして検証し、修正してから続行する。
- **継続的な評価 (Continuous Evals)**: N分ごと、または主要な変更後に実行する（完全なテストスイート + lint）。

**主要な指標 (Key Metrics):**

```
pass@k: k回の試行のうち少なくとも1回成功する
        k=1: 70%  k=3: 91%  k=5: 97%

pass^k: k回の試行すべてが成功しなければならない
        k=1: 70%  k=3: 34%  k=5: 17%
```

とにかく動作させたい場合は **pass@k** を使用する。一貫性が不可欠な場合は **pass^k** を使用する。

---

## 並列化 (PARALLELIZATION)

マルチ Claude ターミナル設定で会話をフォークする場合、フォークでのアクションと元の会話でのアクションのスコープが明確に定義されていることを確認すること。コードの変更に関しては、重複を最小限に抑えることを目指す。

**私の好むパターン (My Preferred Pattern):**

コード変更にはメインのチャットを使用し、コードベースや現在の状態に関する質問、または外部サービスに関する調査にはフォークを使用する。

**任意のターミナル数について (On Arbitrary Terminal Counts):**

![Boris on Parallel Terminals](./assets/images/longform/07-boris-parallel.png)
*Boris (Anthropic) による複数の Claude インスタンスの実行について*

Boris は並列化に関するヒントを持っている。彼はローカルで5つの Claude インスタンスを実行し、上流で5つ実行するようなことを提案している。私は任意の数のターミナルを設定することはお勧めしない。ターミナルの追加は、真の必要性から行われるべきである。

あなたの目標は次のようになるべきである：**最小限の並列化でどれだけのことを完了できるか。**

**並列インスタンスのための Git ワークツリー (Git Worktrees for Parallel Instances):**

```bash
# 並行作業のためのワークツリーを作成する
git worktree add ../project-feature-a feature-a
git worktree add ../project-feature-b feature-b
git worktree add ../project-refactor refactor-branch

# 各ワークツリーは独自の Claude インスタンスを取得する
cd ../project-feature-a && claude
```

インスタンスの拡張を開始し、互いに重複するコードで作業する複数の Claude インスタンスがある場合は、git ワークツリーを使用し、それぞれについて非常に明確に定義された計画を持つことが不可欠である。`/rename <name here>` を使用して、すべてのチャットに名前を付けること。

![Two Terminal Setup](./assets/images/longform/08-two-terminals.png)
*開始セットアップ: コーディング用の左のターミナル、質問用の右のターミナル - /rename と /fork を使用する*

**カスケードメソッド (The Cascade Method):**

複数の Claude Code インスタンスを実行する場合は、「カスケード」パターンで整理する：

- 新しいタブを右側に開いて新しいタスクを開始する
- 左から右へ、古いものから新しいものへとスイープする
- 一度に最大 3〜4 個のタスクに集中する

---

## 基礎固め (GROUNDWORK)

**2つのインスタンスによるキックオフパターン (The Two-Instance Kickoff Pattern):**

私自身のワークフロー管理のために、私は空のリポジトリから2つの Claude インスタンスを開いて開始するのが好きだ。

**インスタンス 1: スキャフォールディングエージェント (Scaffolding Agent)**
- 足場と基礎を築く
- プロジェクト構造を作成する
- 設定をセットアップする (CLAUDE.md, rules, agents)

**インスタンス 2: 深い調査エージェント (Deep Research Agent)**
- すべてのサービス、ウェブ検索に接続する
- 詳細な PRD を作成する
- アーキテクチャの mermaid 図を作成する
- 実際のドキュメントクリップを添えてリファレンスをコンパイルする

**llms.txt パターン (llms.txt Pattern):**

利用可能な場合、ドキュメントのページに到達した後に `/llms.txt` を実行することで、多くのドキュメントリファレンスで `llms.txt` を見つけることができる。これにより、LLM に最適化されたクリーンなバージョンのドキュメントが得られる。

**哲学: 再利用可能なパターンを構築する (Philosophy: Build Reusable Patterns)**

@omarsar0 より: 「初期の頃、私は再利用可能なワークフロー/パターンの構築に時間を費やしました。構築するのは退屈でしたが、モデルとエージェントハーネスが改善されるにつれて、これには驚異的な複利効果がありました。」

**何に投資すべきか (What to invest in):**

- サブエージェント (Subagents)
- スキル (Skills)
- コマンド (Commands)
- 計画パターン (Planning patterns)
- MCP ツール (MCP tools)
- コンテキストエンジニアリングパターン (Context engineering patterns)

---

## エージェントとサブエージェントのベストプラクティス (Best Practices for Agents & Sub-Agents)

**サブエージェントのコンテキスト問題 (The Sub-Agent Context Problem):**

サブエージェントは、すべてをダンプする代わりに要約を返すことでコンテキストを節約するために存在する。しかし、オーケストレーターはサブエージェントに欠けているセマンティック（意味的）なコンテキストを持っている。サブエージェントは文字通りのクエリのみを知っており、リクエストの背後にある「目的（PURPOSE）」を知らない。

**反復的検索パターン (Iterative Retrieval Pattern):**

1. オーケストレーターはすべてのサブエージェントの戻り値を評価する
2. それを受け入れる前にフォローアップの質問をする
3. サブエージェントはソースに戻り、回答を得て、戻る
4. 十分になるまでループする（最大 3 サイクル）

**キー (Key):** クエリだけでなく、目的（objective）のコンテキストを渡すこと。

**シーケンシャルなフェーズを持つオーケストレーター (Orchestrator with Sequential Phases):**

```markdown
Phase 1: RESEARCH (Explore エージェントを使用) → research-summary.md
Phase 2: PLAN (planner エージェントを使用) → plan.md
Phase 3: IMPLEMENT (tdd-guide エージェントを使用) → code changes
Phase 4: REVIEW (code-reviewer エージェントを使用) → review-comments.md
Phase 5: VERIFY (必要に応じて build-error-resolver を使用) → done または ループバック
```

**重要なルール (Key rules):**

1. 各エージェントは1つの明確な入力を受け取り、1つの明確な出力を生成する
2. 出力は次のフェーズの入力となる
3. 決してフェーズをスキップしない
4. エージェント間では `/clear` を使用する
5. 中間出力をファイルに保存する

---

## 楽しいこと / 必須ではないが楽しいヒント (FUN STUFF / NOT CRITICAL JUST FUN TIPS)

### カスタムステータスライン (Custom Status Line)

`/statusline` を使用して設定することができる。すると、Claude はあなたがそれを持っていないと言うが、あなたの代わりにセットアップすることができ、その中に何を入れたいかを尋ねてくる。

参照: ccstatusline（カスタム Claude Code ステータスラインのコミュニティプロジェクト）

### 音声文字起こし (Voice Transcription)

あなたの声で Claude Code に話しかける。多くの人にとって、タイピングよりも速い。

- Mac 上の superwhisper, MacWhisper
- 文字起こしに間違いがあっても、Claude は意図を理解する

### ターミナルエイリアス (Terminal Aliases)

```bash
alias c='claude'
alias gb='github'
alias co='code'
alias q='cd ~/Desktop/projects'
```

---

## マイルストーン (Milestone)

![25k+ GitHub Stars](./assets/images/longform/09-25k-stars.png)
*1週間足らずで25,000以上のGitHubスターを獲得*

---

## リソース (Resources)

**エージェントオーケストレーション (Agent Orchestration):**

- claude-flow — 54以上の特化型エージェントを備えた、コミュニティ構築のエンタープライズオーケストレーションプラットフォーム

**自己改善メモリ (Self-Improving Memory):**

- このリポジトリの `skills/continuous-learning/` を参照
- rlancemartin.github.io/2025/12/01/claude_diary/ - セッションリフレクションパターン

**システムプロンプトリファレンス (System Prompts Reference):**

- system-prompts-and-models-of-ai-tools — AI システムプロンプトのコミュニティコレクション（110k以上のスター）

**公式 (Official):**

- Anthropic Academy: anthropic.skilljar.com

---

## 参考文献 (References)

- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [YK: 32 Claude Code Tips](https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to)
- [RLanceMartin: Session Reflection Pattern](https://rlancemartin.github.io/2025/12/01/claude_diary/)
- @PerceptualPeak: Sub-Agent Context Negotiation
- @menhguin: Agent Abstractions Tierlist
- @omarsar0: Compound Effects Philosophy

---

*両方のガイドでカバーされているすべてのものは、GitHub の [everything-claude-code](https://github.com/affaan-m/everything-claude-code) で入手できる。*
