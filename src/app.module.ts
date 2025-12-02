import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LogsModule } from './common/logger/logs.module';
import { CacheModule } from './cache/cache.module';
import { RedisModule } from './redis/redis.module';


@Module({
  imports: [
    ConfigModule,
    LogsModule,
    CacheModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
