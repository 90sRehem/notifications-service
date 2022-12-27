import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@/use-cases/send-notification';

@Controller()
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}

  @Get()
  list() {
    // return this.prisma.notification.findMany();
  }

  @Post()
  async createNotification(
    @Body() { content, category, recipientId }: CreateNotificationBody,
  ) {
    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });
    return { notification };
  }
}
