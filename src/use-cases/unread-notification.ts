import { INotificationRepository } from '../repositories/Notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors/notification-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: INotificationRepository) {}

  public async execute({
    notificationId,
  }: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
