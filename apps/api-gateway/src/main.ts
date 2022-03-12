/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { utilities, WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const { combine, ms } = format;
const { Console } = transports;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new Console({
          format: combine(
            ms(),
            utilities.format.nestLike(environment().api.name, {
              prettyPrint: true,
            })
          ),
        }),
      ],
    }),
  });
  const configService = app.get(ConfigService);
  const globalPrefix = configService.get<string>('api.prefix');
  app.setGlobalPrefix(globalPrefix);

  const port = configService.get<number>('api.port');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
