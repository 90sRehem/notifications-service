import { Content } from '../domain/valueObjects/Content';
import { Notification } from '../domain/entities/Notification';
import { INotificationRepository } from '../repositories/Notifications-repository';
import { Injectable } from '@nestjs/common';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: INotificationRepository) {}

  public async execute({
    recipientId,
    content,
    category,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {
    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationRepository.create(notification);
    return { notification };
  }
}
