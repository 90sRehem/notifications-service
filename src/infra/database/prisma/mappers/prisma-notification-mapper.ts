import {
  Prisma,
  Notification as PrismaNotificationEntity,
} from '@prisma/client';
import { Notification } from '@/domain/entities/Notification';
import { Content } from '@/domain/valueObjects/Content';

export class PrismaNotificationMapper {
  public static toPersistence(
    notification: Notification,
  ): Prisma.NotificationCreateInput {
    return {
      id: notification.id,
      content: notification.content.content,
      category: notification.category,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
    };
  }

  public static toDomain(notification: PrismaNotificationEntity): Notification {
    return new Notification(
      {
        content: new Content(notification.content),
        category: notification.category,
        recipientId: notification.recipientId,
        createdAt: notification.createdAt,
        readAt: notification.readAt,
        canceledAt: notification.canceledAt,
        updatedAt: notification.updatedAt,
      },
      notification.id,
    );
  }
}
