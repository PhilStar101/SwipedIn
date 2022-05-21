import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { logger } from '@swiped-in/backend/logger';

import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger({ name: config().service.name }),
  });
  // Main configuration
  const configService = app.get(ConfigService);
  const globalPrefix = configService.get<string>('service.api.prefix');
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      transform: true,
    }),
  );

  // OPENAPI setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get('service.api.documentation.title'))
    .setDescription(configService.get('service.api.documentation.description'))
    .setVersion(configService.get('service.api.documentation.version'))
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: configService.get('service.api.documentation.title'),
  };
  SwaggerModule.setup(
    configService.get('service.api.documentation.prefix'),
    app,
    document,
    swaggerCustomOptions,
  );

  const port = configService.get<number>('service.api.port');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
