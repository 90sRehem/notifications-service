import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository';
import { INotificationRepository } from '@/repositories/Notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: INotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [INotificationRepository],
})
export class DatabaseModule {}
