import { Module } from '@nestjs/common';
import { NotificationsController } from '../controllers/notifications.controller';
import { SendNotification } from '@/use-cases/send-notification';
import { DatabaseModule } from '@/infra/database/database.module';
import { CancelNotification } from '@/use-cases/cancel-notification';
import { CountRecipientNotification } from '@/use-cases/count-recipient-notifications';
import { ReadNotification } from '@/use-cases/read-notification';
import { UnreadNotification } from '@/use-cases/unread-notification';
import { GetRecipientNotification } from '@/use-cases/get-recipient-notifications';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    ReadNotification,
    UnreadNotification,
    GetRecipientNotification,
  ],
})
export class HttpModule {}
