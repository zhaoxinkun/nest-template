import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { CacheUtils } from './cache.utils';
import { CacheOptions } from './cache.types';
import { RedisService } from '@/redis/redis.service';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private redisService: RedisService,
  ) {
  }

  /**
   * 统一处理 key + prefix
   */
  private formatKey(key: string, options?: CacheOptions) {
    const prefix = options?.prefix ?? '';
    return CacheUtils.buildKey(prefix, key);
  }

  private deserialize(value: string) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  /**
   * 只读缓存
   */
  async get<T>(key: string, options?: CacheOptions): Promise<T | null | undefined> {
    const realKey = this.formatKey(key, options);
    // 查一级缓存
    const memoryValue = await this.cache.get<T>(realKey);
    if (memoryValue) return memoryValue;

    // 查二级缓存
    const redisValue = await this.redisService.get(realKey);
    if (redisValue) {
      const parsed = this.deserialize(redisValue);

      // 回填到 Memory（提高热数据命中率）
      await this.cache.set(realKey, parsed, 10000);
      return parsed;
    }
    // 都没命中
    return null;
  }

  /**
   * 设置缓存（Memory + Redis 双写）
   */
  async set<T>(key: string, value: T, ttl = 5000, options?: CacheOptions) {
    const realKey = this.formatKey(key, options);
    const realTTL = CacheUtils.randomTTL(ttl);

    // 写一级缓存
    await this.cache.set(realKey, value, realTTL);

    // 写二级缓存
    await this.redisService.set(realKey, JSON.stringify(value), realTTL);
  }

  /**
   * 删除缓存 双层删除
   */
  async del(key: string, options?: CacheOptions) {
    const realKey = this.formatKey(key, options);
    await this.cache.del(realKey);
    await this.redisService.del(realKey);
  }

  /**
   * 企业级最常用：getOrSet（缓存穿透保护）自动缓存（核心）
   */
  async getOrSet<T>(
    key: string,
    ttl: number,
    fetchFn: () => Promise<T>,
    options?: CacheOptions,
  ): Promise<T> {
    const realKey = this.formatKey(key, options);

    const cached = await this.cache.get<T>(realKey);
    if (cached) return cached;

    const data = await fetchFn();
    await this.set(key, data, ttl, options);

    return data;
  }

  /**
   * 包裹一个函数 —— 自动缓存（可替代 wrap 方法）
   */
  async wrap<T>(
    key: string,
    fn: () => Promise<T>,
    ttl = 5000,
    options?: CacheOptions,
  ): Promise<T> {
    return this.getOrSet(key, ttl, fn, options);
  }
}
