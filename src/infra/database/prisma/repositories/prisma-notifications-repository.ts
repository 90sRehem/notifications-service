import { Notification } from '@/domain/entities/Notification';
import { INotificationRepository } from '@/repositories/Notifications-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements INotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}
  public async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        content: notification.content.content,
        category: notification.category,
        recipientId: notification.recipientId,
        createdAt: notification.createdAt,
      },
    });
  }
}
