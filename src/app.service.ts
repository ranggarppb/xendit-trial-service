import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import fetch from 'node-fetch';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello(): Promise<any> {
    const config = await this.cacheManager.get('config');

    if (!config) {
      console.log('Getting data directly from config server');
      const response = await fetch('http://localhost:8080/service/config');
      const config = await response.text();
      console.log('Set config in cache');
      await this.cacheManager.set('config', config, { ttl: 31556952 });
      return config;
    }

    console.log('Getting data from cache');
    return config;
  }
}
