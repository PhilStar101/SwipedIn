import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@swiped-in/backend/config';

import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { config } from './config';
import { MatchModule } from './match/match.module';
import { ProfileModule } from './profile/profile.module';
import { RecommendationModule } from './recommendation/recommendation.module';

@Module({
  imports: [
    ConfigModule(config),
    ProfileModule,
    MatchModule,
    RecommendationModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
