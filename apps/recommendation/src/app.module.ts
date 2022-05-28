import { Module } from '@nestjs/common';
import { ConfigModule } from '@swiped-in/backend/config';
import { DatabaseModule } from '@swiped-in/backend/database';

import { config } from './config';
import { RecommendationModule } from './recommendation/recommendation.module';

@Module({
  imports: [ConfigModule(config), DatabaseModule, RecommendationModule],
})
export class AppModule {}
