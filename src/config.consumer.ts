import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class ConfigurationServiceConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: 'configuration' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: JSON.parse(message.value.toString()),
            topic: topic.toString(),
            partition: partition.toString(),
          });
        },
      },
    );
  }
}
