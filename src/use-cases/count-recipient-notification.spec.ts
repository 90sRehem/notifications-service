import { InMemoryNotificationRepositoryMock } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notifications-factory';

describe('Count recipient notification tests', () => {
  it('should be able to count notifications by recipient id', async () => {
    // Arrange
    const notificationsRepository = new InMemoryNotificationRepositoryMock();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    // Act
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    // Assert
    expect(count).toEqual(2);
  });
});
