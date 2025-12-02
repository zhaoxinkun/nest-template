export class CacheUtils {
  /**
   * key 规范化
   */
  static buildKey(prefix: string, key: string) {
    return `${prefix}:${key}`;
  }

  /**
   * TTL 扩散，防止缓存雪崩
   */
  static randomTTL(ttl: number) {
    const random = Math.floor(Math.random() * 3000);
    return ttl + random; //企业级缓存必须随机 TTL，防止集体过期导致 缓存雪崩
  }
}
