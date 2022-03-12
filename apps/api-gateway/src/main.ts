/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
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
            }),
          ),
        }),
      ],
    }),
  });
  // Main configuration
  const configService = app.get(ConfigService);
  const globalPrefix = configService.get<string>('api.prefix');
  app.setGlobalPrefix(globalPrefix);

  // OPENAPI setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get('documentation.title'))
    .setDescription(configService.get('documentation.description'))
    .setVersion(configService.get('documentation.version'))
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: configService.get('documentation.title'),
  };
  SwaggerModule.setup(
    configService.get('documentation.prefix'),
    app,
    document,
    swaggerCustomOptions,
  );

  const port = configService.get<number>('api.port');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
