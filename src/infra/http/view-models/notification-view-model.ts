import { Notification } from '@/domain/entities/Notification';
import { ApiProperty } from '@nestjs/swagger';
export class NotificationViewModel {
  @ApiProperty({ example: '7ab25ee7-9650-47c8-897f-d2044c601743' })
  id: string;

  @ApiProperty({ example: 'Olá, tudo bem?' })
  content: string;

  @ApiProperty({ example: 'message' })
  category: string;

  @ApiProperty({ example: 'f4a3b7c0-8e5a-4b8c-9b9c-8d6b5a4c3b2a' })
  recipientId: string;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  createdAt: Date;

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
