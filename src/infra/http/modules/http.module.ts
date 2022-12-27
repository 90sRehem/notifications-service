import { Module } from '@nestjs/common';
import { NotificationsController } from '../controllers/notifications.controller';
import { SendNotification } from '@/use-cases/send-notification';
import { DatabaseModule } from '@/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
