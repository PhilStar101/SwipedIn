import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@swiped-in/backend/config';

import { config } from './config';
import { MatchModule } from './match/match.module';
import { ProfileModule } from './profile/profile.module';
import { RecommendationModule } from './recommendation/recommendation.module';

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
    ]),
    ProfileModule,
    MatchModule,
    RecommendationModule,
  ],
})
export class AppModule {}
