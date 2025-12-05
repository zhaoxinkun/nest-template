import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LogsModule } from './common/logger/logs.module';
import { CacheModule } from '@/common/cache/cache.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './common/email/email.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    ConfigModule,
    LogsModule,
    CacheModule,
    RedisModule,
    EmailModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
