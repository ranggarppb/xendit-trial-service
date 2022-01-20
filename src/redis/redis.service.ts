import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  public async get(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  public async set(key: string, value: any, options?: any): Promise<any> {
    return await this.cacheManager.set(key, value, options);
  }

  public async del(key: string): Promise<any> {
    return await this.cacheManager.del(key);
  }
}
