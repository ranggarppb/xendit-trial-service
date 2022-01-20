import { Injectable } from '@nestjs/common';
import { RedisCacheService } from './redis/redis.service';
import fetch from 'node-fetch';

@Injectable()
export class AppService {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  async getHello(): Promise<any> {
    const config = await this.redisCacheService.get('config');

    if (!config) {
      console.log('Getting data directly from config server');
      const response = await fetch('http://localhost:8080/service/config');
      const config = await response.text();
      console.log(config);
      console.log('Set config in cache');
      await this.redisCacheService.set('config', config, { ttl: 31556952 });
      return config;
    }

    console.log('Getting data from cache');
    console.log(config);
    return config;
  }
}
