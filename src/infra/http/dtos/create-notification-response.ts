import { ApiProperty } from '@nestjs/swagger';
import { NotificationViewModel } from '../view-models/notification-view-model';

export abstract class CreateNotificationResponse {
  @ApiProperty({
    type: NotificationViewModel,
    description: 'The notification created',
  })
  notification: NotificationViewModel;
}
