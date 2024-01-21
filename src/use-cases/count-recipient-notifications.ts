import { INotificationRepository } from '../repositories/Notifications-repository';
import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: INotificationRepository) {}

  public async execute({
    recipientId,
  }: CountRecipientNotificationRequest): Promise<CountRecipientNotificationResponse> {
    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
