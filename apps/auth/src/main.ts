import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { logger } from '@swiped-in/logger';

import { AppModule } from './app/app.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      logger: logger({ name: config().service.name }),
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    },
  );
  await app.listen();
  Logger.log(`🚀 Auth service is running`);
}

bootstrap();
