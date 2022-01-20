import { Injectable, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ConsumerService } from './kafka/consumer.service';
import { RedisCacheService } from './redis/redis.service';

@Injectable()
export class ConfigurationServiceConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly appService: AppService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: 'configuration' },
      {
        eachMessage: async ({ message }) => {
          const valueParsed = JSON.parse(message.value.toString());
          await this.redisCacheService.set(
            'configuration',
            valueParsed.newConfig,
            { ttl: 31556952 },
          );
        },
      },
    );
  }
}
