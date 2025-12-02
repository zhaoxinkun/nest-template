// redis配置链接池
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import Redis from 'ioredis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const redisProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: async (configService: ConfigService) => {
    // 创建redis实例
    const redis = new Redis({
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
      db: configService.get('REDIS_DB'),
      // password: configService.get('REDIS_PASSWORD'),
      maxRetriesPerRequest: null,
      enableReadyCheck: true,
      reconnectOnError: () => true,
    });

    redis.on('connect', () => console.log('Redis connected.'));
    redis.on('error', (err) => console.error('Redis error:', err));

    return redis;
  },
  inject: [ConfigService],
};
