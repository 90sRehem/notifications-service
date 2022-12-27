import { Notification } from '../domain/entities/Notification';

export abstract class INotificationRepository {
  public abstract create(notification: Notification): Promise<void>;
}
