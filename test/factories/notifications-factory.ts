import {
  Notification,
  INotificationProps,
} from '@/domain/entities/Notification';
import { Content } from '@/domain/valueObjects/Content';

type NotificationOverrides = Partial<INotificationProps>;

export function makeNotification(overrides: NotificationOverrides = {}) {
  return new Notification({
    recipientId: '123',
    content: new Content('Hello World!'),
    category: 'new_message',
    ...overrides,
  });
}
