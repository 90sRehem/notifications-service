import { InMemoryNotificationRepositoryMock } from '../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notifications-factory';
import { UnreadNotification } from './unread-notification';

let notificationsRepository: InMemoryNotificationRepositoryMock;
let unreadNotification: UnreadNotification;

describe('Unread notification tests', () => {
  beforeAll(() => {
    notificationsRepository = new InMemoryNotificationRepositoryMock();
    unreadNotification = new UnreadNotification(notificationsRepository);
  });
  it('should be able to unread a notification', async () => {
    // Arrange

    const notification = makeNotification({ readAt: new Date() });
    // Act
    await notificationsRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification that does not exist', async () => {
    // Arrange
    // Act
    await expect(
      unreadNotification.execute({ notificationId: '123' }),
    ).rejects.toThrowError(NotificationNotFound);
  });
});
