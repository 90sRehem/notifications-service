import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@/use-cases/cancel-notification';
import { ReadNotification } from '@/use-cases/read-notification';
import { UnreadNotification } from '@/use-cases/unread-notification';
import { CountRecipientNotification } from '@/use-cases/count-recipient-notifications';
import { GetRecipientNotification } from '@/use-cases/get-recipient-notifications';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CountFromRecipientResponse } from '../dtos/count-from-recipient';
import { CreateNotificationResponse } from '../dtos/create-notification-response';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly countRecipientNotification: CountRecipientNotification,
    private readonly getRecipientNotifications: GetRecipientNotification,
  ) {}

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a notification' })
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  @ApiOperation({ summary: 'Count notifications from recipient' })
  @ApiResponse({
    status: 200,
    type: CountFromRecipientResponse,
  })
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });
    return { count };
  }

  @Get('from/:recipientId')
  @ApiOperation({ summary: 'List notifications from recipient' })
  @ApiResponse({
    status: 200,
    description: 'The list has been successfully retrieved.',
    type: [NotificationViewModel],
  })
  async listFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });
    return {
      notifications: notifications.map(NotificationViewModel.toViewModel),
    };
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiResponse({ status: 200 })
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  @ApiOperation({ summary: 'Mark a notification as unread' })
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  @ApiOperation({ summary: 'Create a notification' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateNotificationResponse,
  })
  async create(
    @Body() { content, category, recipientId }: CreateNotificationBody,
  ) {
    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });
    return {
      notification: NotificationViewModel.toViewModel(notification),
    };
  }
}
