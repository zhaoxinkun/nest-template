import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as CacheModuleType } from '@nestjs/cache-manager';
import { RedisModule } from '@/redis/redis.module';

@Module({
  imports: [
    CacheModuleType.register({
      ttl: 3000,
      max: 200,
    }),
    RedisModule,
  ],
  controllers: [],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {
}
