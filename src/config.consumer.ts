import { Injectable, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class ConfigurationServiceConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly appService: AppService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: 'configuration' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const valueParsed = JSON.parse(message.value.toString());
          console.log({
            value: valueParsed,
            topic: topic.toString(),
            partition: partition.toString(),
          });
          if (valueParsed.status === 'invalid') {
            console.log(
              'Expired configuration, getting new configuration from config server',
            );
            await this.appService.getHello(false);
          }
        },
      },
    );
  }
}
