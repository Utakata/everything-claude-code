---
description: 要件を再確認し、リスクを評価し、段階的な実装計画を作成する。コードに触れる前にユーザーの「確認」を待つこと。
---

# 計画コマンド (Plan Command)

このコマンドは **planner** エージェントを呼び出し、コードを書く前に包括的な実装計画を作成する。

## このコマンドが行うこと

1. **要件の再確認** - 何を構築する必要があるか明確にする
2. **リスクの特定** - 潜在的な問題とブロッカーを表面化させる
3. **ステップ計画の作成** - 実装をフェーズに分解する
4. **確認の待機** - 進める前にユーザーの承認を受けなければならない (MUST)

## 使用するタイミング

以下の場合に `/plan` を使用する：
- 新機能を開始する時
- 重要なアーキテクチャ変更を行う時
- 複雑なリファクタリングに取り組む時
- 複数のファイル/コンポーネントが影響を受ける時
- 要件が不明確または曖昧な時

## 仕組み

plannerエージェントは以下を行う：

1. **リクエストを分析** し、明確な言葉で要件を再記述する
2. **フェーズに分解** し、具体的で実行可能なステップにする
3. コンポーネント間の **依存関係を特定** する
4. **リスク** と潜在的なブロッカーを評価する
5. **複雑さを推定** する (High/Medium/Low)
6. **計画を提示** し、あなたの明示的な確認を「待機」する

## 使用例

```
User: /plan I need to add real-time notifications when markets resolve

Agent (planner):
# Implementation Plan: Real-Time Market Resolution Notifications

## Requirements Restatement
- Send notifications to users when markets they're watching resolve
- Support multiple notification channels (in-app, email, webhook)
- Ensure notifications are delivered reliably
- Include market outcome and user's position result

## Implementation Phases

### Phase 1: Database Schema
- Add notifications table with columns: id, user_id, market_id, type, status, created_at
- Add user_notification_preferences table for channel preferences
- Create indexes on user_id and market_id for performance

### Phase 2: Notification Service
- Create notification service in lib/notifications.ts
- Implement notification queue using BullMQ/Redis
- Add retry logic for failed deliveries
- Create notification templates

### Phase 3: Integration Points
- Hook into market resolution logic (when status changes to "resolved")
- Query all users with positions in market
- Enqueue notifications for each user

### Phase 4: Frontend Components
- Create NotificationBell component in header
- Add NotificationList modal
- Implement real-time updates via Supabase subscriptions
- Add notification preferences page

## Dependencies
- Redis (for queue)
- Email service (SendGrid/Resend)
- Supabase real-time subscriptions

## Risks
- HIGH: Email deliverability (SPF/DKIM required)
- MEDIUM: Performance with 1000+ users per market
- MEDIUM: Notification spam if markets resolve frequently
- LOW: Real-time subscription overhead

## Estimated Complexity: MEDIUM
- Backend: 4-6 hours
- Frontend: 3-4 hours
- Testing: 2-3 hours
- Total: 9-13 hours

**WAITING FOR CONFIRMATION**: Proceed with this plan? (yes/no/modify)
```

## 重要な注意点

**CRITICAL (重要)**: plannerエージェントは、あなたが「yes」や「proceed」などの肯定的な応答で計画を明示的に確認するまで、**一切コードを書かない**。

変更が必要な場合は、以下のように応答する：
- "modify: [あなたの変更]"
- "different approach: [代替案]"
- "skip phase 2 and do phase 3 first"

## 他のコマンドとの統合

計画後：
- `/tdd` を使用してテスト駆動開発で実装する
- ビルドエラーが発生した場合は `/build-and-fix` を使用する
- 実装完了をレビューするために `/code-review` を使用する

## 関連エージェント

このコマンドは以下に位置する `planner` エージェントを呼び出す：
`~/.claude/agents/planner.md`
