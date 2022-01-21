import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { RedisCacheModule } from './redis/redis.module';
import { ConfigurationServiceConsumer } from './config.consumer';
import { ConfigServiceModule } from './config-service/config-service.module';

@Module({
  imports: [KafkaModule, RedisCacheModule, ConfigServiceModule],
  controllers: [AppController],
  providers: [AppService, ConfigurationServiceConsumer],
})
export class AppModule {}
