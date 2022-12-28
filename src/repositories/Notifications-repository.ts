import { Notification } from '../domain/entities/Notification';

export abstract class INotificationRepository {
  public abstract create(notification: Notification): Promise<void>;
  public abstract findById(
    notificationId: string,
  ): Promise<Notification | null>;
  public abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
}
