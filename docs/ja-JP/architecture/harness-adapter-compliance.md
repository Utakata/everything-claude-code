# ハーネスアダプター準拠マトリックス

このマトリックスは、複数のコーディングハーネスで ECC を使用したいチームのための公開オンランプです。クロスハーネスアーキテクチャを実践的なスコアカードに変えます：今日何が機能するか、何がインストラクションのみか、何がアダプターを必要とするか、そしてセットアップを信頼する前にオペレーターがどのエビデンスを収集すべきか。

ECC の耐久性のある単位は、共有ソースに留まります：

- `skills/*/SKILL.md`
- `rules/`
- `commands/`
- `hooks/hooks.json`
- `scripts/hooks/`
- MCP リファレンス設定
- セッションとオブザーバビリティの契約

ハーネス固有のファイルは、ローディング、イベントの形、コマンド名、またはプラットフォームの制限のみを適応させるべきです。

## 準拠状態

| 状態 | 意味 |
| --- | --- |
| Native | ECC はこのハーネスのサーフェスを直接インストールまたは検証できる。 |
| Adapter-backed | ECC は薄いアダプター、プラグイン、またはパッケージサーフェスを持つが、パリティはハーネスによって異なる。 |
| Instruction-backed | ECC はガイダンスとファイルを提供できるが、ハーネスは ECC が強制のために必要とするランタイムのフック/セッションサーフェスを公開しない。 |
| Reference-only | このツールは設計上の圧力または外部ランタイムとして有用だが、ECC はまだそれ用の直接的なインストーラーやアダプターを出荷していない。 |

## マトリックス

以下のマトリックスは、`scripts/lib/harness-adapter-compliance.js` からレンダリングされ、`npm run harness:adapters -- --check` によって検証されます。

<!-- harness-adapter-compliance:matrix-start -->
| ハーネスまたはランタイム | 状態 | サポートされる資産 | サポートされない/異なるサーフェス | インストールまたはオンランプ | 検証コマンド | リスクノート |
| --- | --- | --- | --- | --- | --- | --- |
| Claude Code | Native | Claude プラグイン資産；スキル；コマンド；フック；MCP 設定；ローカルルール；ステータスライン指向のワークフロー | Claude ネイティブのフックは他のハーネスでのパリティを意味しない | `./install.sh --profile minimal --target claude`；Claude プラグインインストール | `npm run harness:audit -- --format json`；`node scripts/session-inspect.js --list-adapters` | デフォルトですべてのスキルをロードするのを避ける；フックは opt-in で検査可能に保つ。 |
| Codex | Instruction-backed | `AGENTS.md`；Codex プラグインメタデータ；スキル；MCP リファレンス設定；コマンドパターン | ネイティブのフック強制と Claude のスラッシュコマンドセマンティクスは同等ではない | `./install.sh --profile minimal --target codex`；リポジトリローカルの `AGENTS.md` レビュー | `npm run harness:audit -- --format json` | ネイティブの Codex フックサーフェスが存在しない限り、フックをポリシーテキストとして扱う。 |
| OpenCode | Adapter-backed | OpenCode パッケージ/プラグインメタデータ；共有スキル；MCP 設定；イベントアダプターパターン | イベント名、プラグインパッケージング、コマンドディスパッチが Claude Code と異なる | このリポジトリからの OpenCode パッケージまたはプラグインサーフェス | `node tests/scripts/build-opencode.test.js`；`npm run harness:audit -- --format json` | フックロジックを共有スクリプトに保ち、エッジでイベントの形のみを適応させる。 |
| Cursor | Adapter-backed | Cursor ルール；プロジェクトローカルのスキル；フックアダプター；共有スクリプト | Cursor のフックイベントとルールローディングが Claude Code と異なる | `./install.sh --profile minimal --target cursor` | `node tests/lib/install-targets.test.js`；`npm run harness:audit -- --format json` | Cursor アダプターは既存のプロジェクトルールを保持し、暗黙の上書きを避けなければならない。 |
| Gemini | Instruction-backed | Gemini プロジェクトローカルのインストラクション；共有スキル；ルール；互換性ドキュメント | 完全な ECC フックパリティなし；エコシステムのポートは upstream ECC からのドリフトを文書化しなければならない | `./install.sh --profile minimal --target gemini` | `node tests/lib/install-targets.test.js` | Gemini CLI 内でエンドツーエンドに検証されるまで、Gemini ポートをエコシステムアダプターとして扱う。 |
| Zed | Adapter-backed | Zed プロジェクト設定；平坦化されたプロジェクトルール；共有スキル；コマンド；エージェント | Zed の外部エージェントとネイティブ Agent Panel の権限は Claude フックではない | `./install.sh --profile minimal --target zed` | `node tests/lib/install-targets.test.js`；`npm run harness:audit -- --format json` | プロジェクト設定を保守的に保ち、BYOK/OpenRouter のシークレットを `.zed/` にコピーしない。 |
| dmux | Adapter-backed | セッションスナップショット；tmux/ワークツリーのオーケストレーション状態；ハンドオフエクスポート | dmux はオーケストレーションランタイムであり、スキル/ルールのインストールターゲットではない | `node scripts/session-inspect.js --list-adapters`；dmux セッションターゲットの検査 | `node tests/lib/session-adapters.test.js` | dmux イベントを、リポジトリ検証の置き換えではなく、セッション/ランタイムのシグナルとして扱う。 |
| Orca | Reference-only | ワークツリーのライフサイクル；レビュー状態；通知；provider-identity の設計上の圧力 | 今日は ECC インストーラーや直接アダプターなし | ワークツリー/セッション状態の要件の比較ターゲットとして使用 | `npm run observability:ready` | 製品固有の仮定をインポートしない；教訓を ECC イベントフィールドに変換する。 |
| Superset | Reference-only | ワークスペースプリセット；並列エージェントのレビューループ；ワークツリー分離の設計上の圧力 | 今日は ECC インストーラーや直接アダプターなし | ワークスペースプリセットの分類の比較ターゲットとして使用 | `npm run observability:ready` | ECC をポータブルに保つ；基本的な価値を得るためにデスクトップワークスペースを要求しない。 |
| Ghast | Reference-only | ターミナルネイティブのペイングルーピング；cwd グルーピング；検索；通知 | 今日は ECC インストーラーや直接アダプターなし | terminal-first のセッショングルーピングの比較ターゲットとして使用 | `node scripts/session-inspect.js --list-adapters` | ビジュアル UI の仮定を追加する前に、ターミナルのエルゴノミクスを保持する。 |
| Terminal-only | Native | スキル；ルール；コマンド；スクリプト；ハーネス監査；オブザーバビリティ準備；ハンドオフ | 外部 UI なし、スクリプトが明示的に実行されない限り自動セッション制御なし | リポジトリをクローン；コマンドを直接実行；プロジェクトインストールには minimal プロファイルを使用 | `npm run harness:audit -- --format json`；`npm run observability:ready` | これはフォールバック契約である；すべての上位アダプターはこれにデグレードすべき。 |
<!-- harness-adapter-compliance:matrix-end -->

## スコアカードのオンランプ

チームまたはリポジトリのセットアップをより自律的にするよう ECC に求める前に、このシーケンスを使用します：

```bash
npm run harness:adapters -- --check
npm run harness:audit -- --format json
npm run observability:ready
node scripts/session-inspect.js --list-adapters
node scripts/loop-status.js --json --write-dir .ecc/loop-status
```

結果を、製品バッジではなく、セットアップスコアカードとして読みます：

- `harness:adapters -- --check` は、この公開マトリックスが依然としてアダプターのソースデータと
  必要なエビデンスフィールドに一致することを証明します。
- `harness:audit` は、ツールカバレッジ、コンテキスト効率、品質ゲート、
  メモリ永続化、eval カバレッジ、セキュリティガードレール、コスト効率をスコアリングします。
- `observability:ready` は、リポジトリが依然としてローカルステータス、
  セッション、ツールアクティビティ、リスクレジャー、リリースオンランプのシグナルを公開することを証明します。
- `session-inspect --list-adapters` は、現在の環境でどのセッションサーフェスが実際に
  検査可能かを示します。
- `loop-status --json` は、より長い自律実行のための、機械可読なハンドオフ/ステータスペイロードを作成します。

## データバックアップのスコアカード契約

各アダプターレコードは以下を公開します：

- `id`
- `state`
- `supported_assets`
- `unsupported_surfaces`
- `install_or_onramp`
- `verification_commands`
- `risk_notes`
- `last_verified_at`
- `owner`
- `source_docs`

公開アダプターの主張にインストールパス、検証コマンド、リスクノート、owner、source doc、または検証日付がない場合、バリデーターは失敗します。

## 運用ルール

- 同じワークフローのハーネス固有のフォークよりも、小さく追加的なアダプターを優先する。
- アダプターがインストールパスと検証コマンドを持つまで、ハーネスを native と呼ばない。
- 強制がランタイムバックアップではなくインストラクションバックアップの場合、Codex、Gemini、Zed の
  サーフェスを正直に保つ。
- ECC が直接アダプターを持つまで、reference-only ツールを設計上の圧力として扱う。
- terminal-only のパスを健全に保つ；それはポータビリティの床である。
