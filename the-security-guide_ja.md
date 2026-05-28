# Everything Agentic Security に関する簡略版ガイド (The Shorthand Guide to Everything Agentic Security)

これは特定のベンダーについてではなく、セッションのベースラインを持つことで、異常なツールの呼び出しが目立つようにすることについての話である。

間接的プロンプトインジェクションに関する Unit 42 の研究と、OpenAI の最新のガイダンスは、どちらも同じ方向を指している：悪意のあるコンテンツのいくつかがすり抜けることを前提とし、その後に何が起こるかを制約すること。

## キルスイッチ (Kill Switches)

グレースフルな終了（graceful kills）と強制的な終了（hard kills）の違いを知ること。`SIGTERM` はプロセスにクリーンアップの機会を与える。`SIGKILL` はプロセスを即座に停止する。どちらも重要である。

また、親だけでなく、プロセスグループ全体を強制終了すること。親だけを強制終了した場合、子プロセスは実行され続ける可能性がある。（これは、コンピューターの RAM が 64GB しかないのに、朝 Ghostty タブを見るとどういうわけか 100GB の RAM が消費されていて、シャットダウンしたと思っていた子プロセスが暴走してプロセスが一時停止している理由でもある）

![ある日目が覚めると... 原因は何だったか当ててみて](./assets/images/security/ghostyy-overflow.jpeg)

Node の例:

```javascript
// プロセスグループ全体を強制終了する
process.kill(-child.pid, "SIGKILL");
```

無人のループの場合は、ハートビートを追加する。エージェントが 30 秒ごとにチェックインを停止した場合は、自動的に強制終了する。侵害されたプロセスが丁寧にも自ら停止することに依存してはならない。

実用的なデッドマンスイッチ (dead-man switch):
- スーパーバイザーがタスクを開始する
- タスクは 30 秒ごとにハートビートを書き込む
- ハートビートが停止した場合、スーパーバイザーはプロセスグループを強制終了する
- 停止したタスクは、ログレビューのために隔離される

本当の停止パス（stop path）がない場合、あなたの「自律システム」は、あなたが制御を取り戻す必要があるまさにその瞬間に、あなたを無視する可能性がある。（OpenClaw で /stop や /kill などが機能せず、エージェントが制御不能に陥ったときに人々が何もできなかったときに、これを見たことがある。）彼らは OpenClaw での失敗について投稿したために、Meta のその女性をズタズタに非難したが、それはこれが必要な理由を示している。

## メモリ (Memory)

永続的なメモリは便利である。それは同時にガソリンでもある。

でも、通常あなたはその部分を忘れているよね？ 長い間使ってきたナレッジベースにすでにある .md ファイルを、誰が絶えずチェックしているというのか。ペイロードは、一度の攻撃で成功する必要はない。フラグメントを埋め込み、待機し、後で組み立てることができる。Microsoft の AI レコメンデーションポイズニングのレポートは、最近のそれを最も明確に思い出させるものである。

Anthropic は、Claude Code がセッション開始時にメモリをロードすることを文書化している。したがって、メモリは狭く保つこと：
- シークレットをメモリファイルに保存しない
- プロジェクトのメモリを、ユーザーグローバルなメモリから分離する
- 信頼できない実行の後には、メモリをリセットまたはローテーションする
- リスクの高いワークフローでは、長期保存メモリを完全に無効にする

ワークフローが一日中、外部のドキュメント、メールの添付ファイル、またはインターネットのコンテンツに触れている場合、長期保存の共有メモリを与えることは、永続化（persistence）を容易にしているだけである。

## 最低基準のチェックリスト (The Minimum Bar Checklist)

2026年にエージェントを自律的に実行している場合、これが最低基準である：
- エージェントのアイデンティティを個人アカウントから分離する
- 短命でスコープが限定された認証情報（credentials）を使用する
- 信頼できない作業は、コンテナ、devcontainers、VM、またはリモートサンドボックスで実行する
- デフォルトで外部ネットワークへの送信（outbound network）を拒否する
- シークレットを含むパスからの読み取りを制限する
- ファイル、HTML、スクリーンショット、およびリンクされたコンテンツは、特権エージェントがそれらを見る前にサニタイズする
- サンドボックス化されていないシェル、外部への送信（egress）、デプロイ、およびリポジトリ外への書き込みには承認を要求する
- ツールの呼び出し、承認、およびネットワーク試行を記録（log）する
- プロセスグループの強制終了と、ハートビートベースのデッドマンスイッチを実装する
- 永続的なメモリは狭く、使い捨て可能に保つ
- スキル、フック、MCP 設定、およびエージェントの記述子を、他のサプライチェーンアーティファクトと同様にスキャンする

私はあなたにこれをすべきだと提案しているのではない、私は言っているのだ - あなたのため、私のため、そしてあなたの将来の顧客のために。

## ツールの状況 (The Tooling Landscape)

良いニュースは、エコシステムが追いつきつつあることだ。十分に速いとは言えないが、動いてはいる。

Anthropic は Claude Code を強化し、信頼、権限、MCP、メモリ、フック、および隔離された環境に関する具体的なセキュリティガイダンスを公開した。

GitHub は、リポジトリのポイズニングと特権の乱用が現実であることを明確に前提とした、コーディングエージェントのコントロールを構築した。

OpenAI もついに本音を語り始めた：プロンプトインジェクションはシステム設計の問題であり、プロンプト設計の問題ではない。

OWASP には MCP Top 10 がある。まだ進行中のプロジェクト（living project）だが、エコシステムが十分にリスクを抱え、そうせざるを得なくなったため、現在そのカテゴリが存在している。

Snyk の `agent-scan` や関連する取り組みは、MCP / スキルレビューに有用である。

そして、特に ECC を使用している場合、これは私が AgentShield を構築した問題領域でもある：疑わしいフック、隠されたプロンプトインジェクションパターン、広すぎる権限、リスクの高い MCP 設定、シークレットの露出、および手動レビューでは絶対に見逃されるもの。

対象となる領域（surface area）は拡大している。それに対抗するツールは改善されている。しかし、「vibe coding」空間における基本的な運用セキュリティ（opsec）/ 認知的セキュリティ（cogsec）に対する犯罪的な無関心は、依然として間違っている。

人々は未だにこう考えている：
- 「悪いプロンプト」をプロンプトしなければならない
- 解決策は「より良い指示、簡単なセキュリティチェックを実行し、他に何もチェックせずに直接 main にプッシュすること」である
- エクスプロイトには、劇的なジェイルブレイクや、ある種のエッジケースの発生が必要である

通常はそうではない。

通常、それは通常の作業のように見える。リポジトリ。PR。チケット。PDF。ウェブページ。便利な MCP。Discord で誰かが推薦したスキル。エージェントが「後で覚えておく」べきメモリ。

それが、エージェントのセキュリティをインフラストラクチャとして扱わなければならない理由である。

後付け（afterthought）やバイブス（vibe）、人々が話すのは好きだが何もしないものとしてではなく - 必須のインフラストラクチャとして。

もしあなたがここまで読んで、これがすべて真実であると認めたのに；その1時間後に X で、ローカルの root アクセス権を持ち、公開リポジトリの main に直接プッシュしながら、`--dangerously-skip-permissions` を付けて 10 以上のエージェントを実行しているような、でたらめな投稿を見かけたら。

あなたを救う方法はない - あなたは AI 精神病（他の人々が使用するソフトウェアを公開しているため、私たち全員に影響を与える危険な種類の精神病）に感染している。

## おわりに (Close)

エージェントを自律的に実行している場合、プロンプトインジェクションが存在するかどうかはもはや問題ではない。それは存在する。問題は、価値のあるものを保持している間に、モデルが最終的に敵対的な何かを読み取ることを、あなたのランタイムが前提としているかどうかである。

それが、私が現在使用している基準である。

悪意のあるテキストがコンテキストに混入することを前提として構築する。
ツールの説明が嘘をつく可能性があることを前提として構築する。
リポジトリがポイズニングされる可能性があることを前提として構築する。
メモリが間違ったものを永続化する可能性があることを前提として構築する。
モデルが時折議論に負ける（lose the argument）可能性があることを前提として構築する。

そして、その議論に負けても生き残れる（survivable）ようにすること。

1つのルールが必要なら：**利便性のレイヤーを、決して隔離のレイヤーよりも先行させてはならない（never let the convenience layer outrun the isolation layer）。**

その1つのルールで、驚くほど遠くまで行ける。

あなたのセットアップをスキャンする: [github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield)

---

## 参考文献 (References)

- Check Point Research, "Caught in the Hook: RCE and API Token Exfiltration Through Claude Code Project Files" (February 25, 2026): [research.checkpoint.com](https://research.checkpoint.com/2026/rce-and-api-token-exfiltration-through-claude-code-project-files-cve-2025-59536/)
- NVD, CVE-2025-59536: [nvd.nist.gov](https://nvd.nist.gov/vuln/detail/CVE-2025-59536)
- NVD, CVE-2026-21852: [nvd.nist.gov](https://nvd.nist.gov/vuln/detail/CVE-2026-21852)
- Anthropic, "Defending against indirect prompt injection attacks": [anthropic.com](https://www.anthropic.com/news/prompt-injection-defenses)
- Claude Code docs, "Settings": [code.claude.com](https://code.claude.com/docs/en/settings)
- Claude Code docs, "MCP": [code.claude.com](https://code.claude.com/docs/en/mcp)
- Claude Code docs, "Security": [code.claude.com](https://code.claude.com/docs/en/security)
- Claude Code docs, "Memory": [code.claude.com](https://code.claude.com/docs/en/memory)
- GitHub Docs, "About assigning tasks to Copilot": [docs.github.com](https://docs.github.com/en/copilot/using-github-copilot/coding-agent/about-assigning-tasks-to-copilot)
- GitHub Docs, "Responsible use of Copilot coding agent on GitHub.com": [docs.github.com](https://docs.github.com/en/copilot/responsible-use-of-github-copilot-features/responsible-use-of-copilot-coding-agent-on-githubcom)
- GitHub Docs, "Customize the agent firewall": [docs.github.com](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-firewall)
- Simon Willison prompt injection series / lethal trifecta framing: [simonwillison.net](https://simonwillison.net/series/prompt-injection/)
- AWS Security Bulletin, AWS-2025-015: [aws.amazon.com](https://aws.amazon.com/security/security-bulletins/rss/aws-2025-015/)
- AWS Security Bulletin, AWS-2025-016: [aws.amazon.com](https://aws.amazon.com/security/security-bulletins/aws-2025-016/)
- Unit 42, "Fooling AI Agents: Web-Based Indirect Prompt Injection Observed in the Wild" (March 3, 2026): [unit42.paloaltonetworks.com](https://unit42.paloaltonetworks.com/ai-agent-prompt-injection/)
- Microsoft Security, "AI Recommendation Poisoning" (February 10, 2026): [microsoft.com](https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/)
- Snyk, "ToxicSkills: Malicious AI Agent Skills in the Wild": [snyk.io](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/)
- Snyk `agent-scan`: [github.com/snyk/agent-scan](https://github.com/snyk/agent-scan)
- Hunt.io, "CVE-2026-25253 OpenClaw AI Agent Exposure" (February 3, 2026): [hunt.io](https://hunt.io/blog/cve-2026-25253-openclaw-ai-agent-exposure)
- OpenAI, "Designing AI agents to resist prompt injection" (March 11, 2026): [openai.com](https://openai.com/index/designing-agents-to-resist-prompt-injection/)
- OpenAI Codex docs, "Agent network access": [platform.openai.com](https://platform.openai.com/docs/codex/agent-network)

---

以前のガイドをまだ読んでいない場合は、ここから始めてほしい：

> [The Shorthand Guide to Everything Claude Code](https://x.com/affaanmustafa/status/2012378465664745795)
>
> [The Longform Guide to Everything Claude Code](https://x.com/affaanmustafa/status/2014040193557471352)

それらを読んで、これらのリポジトリも保存してほしい：
- [github.com/affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)
- [github.com/affaan-m/agentshield](https://github.com/affaan-m/agentshield)
