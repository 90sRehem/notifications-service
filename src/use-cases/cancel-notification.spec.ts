import { InMemoryNotificationRepositoryMock } from '../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { Content } from '../domain/valueObjects/Content';
import { Notification } from '../domain/entities/Notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notifications-factory';

let notificationsRepository: InMemoryNotificationRepositoryMock;
let cancelNotification: CancelNotification;

describe('Cancel notification tests', () => {
  beforeAll(() => {
    notificationsRepository = new InMemoryNotificationRepositoryMock();
    cancelNotification = new CancelNotification(notificationsRepository);
  });
  it('should be able to cancel a notification', async () => {
    // Arrange

    const notification = makeNotification();
    // Act
    await notificationsRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification that does not exist', async () => {
    // Arrange
    // Act
    await expect(
      cancelNotification.execute({ notificationId: '123' }),
    ).rejects.toThrowError(NotificationNotFound);
  });
});
