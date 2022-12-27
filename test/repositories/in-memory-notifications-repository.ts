import { Notification } from '../../src/domain/entities/Notification';
import { INotificationRepository } from '../../src/repositories/Notifications-repository';

export class InMemoryNotificationRepositoryMock
  implements INotificationRepository
{
  public notifications: Notification[] = [];
  public create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
    return Promise.resolve();
  }
}
