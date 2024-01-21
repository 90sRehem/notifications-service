import { InMemoryNotificationRepositoryMock } from '../../test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

let notificationsRepository: InMemoryNotificationRepositoryMock;

describe('Send notification tests', () => {
  beforeAll(() => {
    notificationsRepository = new InMemoryNotificationRepositoryMock();
  });
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationsRepository);
    const { notification } = await sendNotification.execute({
      recipientId: '123',
      content: 'Hello World!',
      category: 'new_message',
    });
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
