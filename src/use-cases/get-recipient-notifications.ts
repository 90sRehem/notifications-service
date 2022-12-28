import { INotificationRepository } from '../repositories/Notifications-repository';
import { Notification } from '../domain/entities/Notification';
import { Injectable } from '@nestjs/common';

interface GetRecipientNotificationRequest {
  recipientId: string;
}

interface GetRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationRepository: INotificationRepository) {}

  public async execute({
    recipientId,
  }: GetRecipientNotificationRequest): Promise<GetRecipientNotificationResponse> {
    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
