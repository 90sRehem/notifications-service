import { Notification } from '../../src/domain/entities/Notification';
import { INotificationRepository } from '../../src/repositories/Notifications-repository';

export class InMemoryNotificationRepositoryMock
  implements INotificationRepository
{
  public notifications: Notification[] = [];

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return Promise.resolve(
      this.notifications.filter((item) => item.recipientId === recipientId),
    );
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = this.notifications.filter(
      (item) => item.recipientId === recipientId,
    ).length;
    return Promise.resolve(count);
  }

  public findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );
    if (notification) {
      return Promise.resolve(notification);
    }
    return Promise.resolve(null);
  }

  public save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
    return Promise.resolve();
  }

  public create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
    return Promise.resolve();
  }
}
