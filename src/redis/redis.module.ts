import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { redisProvider } from '@/redis/redis.provider';


@Module({
  controllers: [],
  providers: [redisProvider, RedisService],
  exports: [RedisService],
})
export class RedisModule {
}
