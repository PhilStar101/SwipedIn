import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@swiped-in/shared';

import { config } from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule(config),
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
})
export class AppModule {}
