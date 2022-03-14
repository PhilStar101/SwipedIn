import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'AUTH_SERVICE',
            transport: Transport.REDIS,
            options: {
              url: 'redis://localhost:6379',
            },
          },
          {
            name: 'PROFILE_SERVICE',
            transport: Transport.REDIS,
            options: {
              url: 'redis://localhost:6379',
            },
          },
          {
            name: 'MATCH_SERVICE',
            transport: Transport.REDIS,
            options: {
              url: 'redis://localhost:6379',
            },
          },
          {
            name: 'RECOMMENDATION_SERVICE',
            transport: Transport.REDIS,
            options: {
              url: 'redis://localhost:6379',
            },
          },
        ]),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api-gateway!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController).toBeDefined();
    });
  });
});
