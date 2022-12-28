import { Notification } from '@/domain/entities/Notification';
export class NotificationViewModel {
  static toViewModel(notification: Notification): NotificationViewModel {
    return {
      id: notification.id,
      content: notification.content.content,
      category: notification.category,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
    };
  }
}
