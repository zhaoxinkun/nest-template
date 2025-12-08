import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LogsModule } from './common/logger/logs.module';
import { CacheModule } from '@/common/cache/cache.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './common/email/email.module';
import { UserModule } from './modules/user/user.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { TenantModule } from './tenant/tenant.module';


@Module({
  imports: [
    ConfigModule,
    LogsModule,
    CacheModule,
    RedisModule,
    EmailModule,
    UserModule,
    TypeormModule,
    TenantModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
