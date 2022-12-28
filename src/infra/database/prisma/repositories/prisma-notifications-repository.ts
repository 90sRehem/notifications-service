import { Notification } from '@/domain/entities/Notification';
import { INotificationRepository } from '@/repositories/Notifications-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements INotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });
    return count;
  }

  public async findManyByRecipientId(
    recipientId: string,
  ): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  public async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  public async save(notification: Notification): Promise<void> {
    const notificationToPersist =
      PrismaNotificationMapper.toPersistence(notification);

    await this.prismaService.notification.update({
      where: {
        id: notification.id,
      },
      data: notificationToPersist,
    });
  }

  public async create(notification: Notification): Promise<void> {
    const notificationToPersist =
      PrismaNotificationMapper.toPersistence(notification);

    await this.prismaService.notification.create({
      data: notificationToPersist,
    });
  }
}
