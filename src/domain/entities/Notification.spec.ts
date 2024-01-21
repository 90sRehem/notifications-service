import { Content } from '../valueObjects/Content';
import { Notification } from './Notification';

describe('Notification tests', () => {
  it('should be able to create a new notification', () => {
    const notification = new Notification({
      content: new Content('Hello World!'),
      category: 'new_message',
      recipientId: '123',
    });
    expect(notification.content.content).toBe('Hello World!');
  });
});
