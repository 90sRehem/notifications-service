import { InMemoryNotificationRepositoryMock } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notifications-factory';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('get recipient notification tests', () => {
  it('should be able to get notifications by recipient id', async () => {
    // Arrange
    const notificationsRepository = new InMemoryNotificationRepositoryMock();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    // Assert
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: 'recipient-1',
        }),
        expect.objectContaining({
          recipientId: 'recipient-1',
        }),
      ]),
    );
  });
});
