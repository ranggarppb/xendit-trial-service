import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { ConfigurationServiceConsumer } from './config.consumer';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [AppService, ConfigurationServiceConsumer],
})
export class AppModule {}
