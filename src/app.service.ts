import { Injectable } from '@nestjs/common';
import { RedisCacheService } from './redis/redis.service';
import { ConfigService } from './config-service/config-service.service';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  private async getConfigAndStoreInCache() {
    console.log('Getting data directly from config server');
    try {
      const config = await this.configService.get();
      console.log('Set config in cache');
      await this.redisCacheService.set('configuration', config, {
        ttl: 31556952,
      });
      return JSON.parse(config);
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
    if (typeof config === 'string') return JSON.parse(config);
    return config;
  }
}
