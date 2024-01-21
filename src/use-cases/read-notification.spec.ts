import { InMemoryNotificationRepositoryMock } from '../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notifications-factory';
import { ReadNotification } from './read-notification';

let notificationsRepository: InMemoryNotificationRepositoryMock;
let readNotification: ReadNotification;

describe('Read notification tests', () => {
  beforeAll(() => {
    notificationsRepository = new InMemoryNotificationRepositoryMock();
    readNotification = new ReadNotification(notificationsRepository);
  });
  it('should be able to read a notification', async () => {
    // Arrange

    const notification = makeNotification();
    // Act
    await notificationsRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification that does not exist', async () => {
    // Arrange
    // Act
    await expect(
      readNotification.execute({ notificationId: '123' }),
    ).rejects.toThrowError(NotificationNotFound);
  });
});
