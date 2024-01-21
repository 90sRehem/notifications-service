import { Module } from '@nestjs/common';
import { AppController } from './infra/http/controllers/app.controller';
import { AppService } from './infra/app.service';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { HttpModule } from './infra/http/modules/http.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
