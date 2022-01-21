import { Injectable } from '@nestjs/common';
import { RedisCacheService } from './redis/redis.service';
import fetch from 'node-fetch';

@Injectable()
export class AppService {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  private async getConfigAndStoreInCache() {
    console.log('Getting data directly from config server');
    try {
      const response = await fetch('http://localhost:8080/service/config');
      const config = await response.json();
      console.log('Set config in cache');
      await this.redisCacheService.set('configuration', config, {
        ttl: 31556952,
      });
      return config;
    } catch (error) {
      console.log('Error getting data from config server');
      return 'Default config';
    }
  }

  async getRequest(): Promise<any> {
    const config = await this.redisCacheService.get('configuration');

    if (!config) {
      return this.getConfigAndStoreInCache();
    }

    console.log('Getting data from cache');
    return config;
  }
}
