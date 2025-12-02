import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LogsModule } from './common/logger/logs.module';
import { RedisModule } from './redis/redis.module';
import { AppService } from '@/app.service';


@Module({
  imports: [
    ConfigModule,
    LogsModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
