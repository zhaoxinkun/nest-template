import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT } from './redis.provider';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT)
    private redis: Redis,
  ) {
  }

  async get(key: string) {
    return this.redis.get(key);
  }

  async set(key: string, value: any, expireSeconds?: number) {
    if (expireSeconds) {
      return this.redis.set(key, value, 'EX', expireSeconds);
    }
    return this.redis.set(key, value);
  }

  async del(key: string) {
    return this.redis.del(key);
  }

  async hget(hash: string, field: string) {
    return this.redis.hget(hash, field);
  }

  async hset(hash: string, field: string, value: string) {
    return this.redis.hset(hash, field, value);
  }

  async publish(channel: string, message: string) {
    return this.redis.publish(channel, message);
  }

  /**
   * 检查key是否存在
   */
  async exists(key: string): Promise<boolean> {
    return (await this.redis.exists(key)) === 1;
  }

  getClient() {
    return this.redis;
  }
}