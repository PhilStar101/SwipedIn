import { Module } from '@nestjs/common';
import { ConfigModule } from '@swiped-in/backend/config';
import { DatabaseModule } from '@swiped-in/backend/database';

import { config } from './config';
import { MatchModule } from './match/match.module';

@Module({
  imports: [ConfigModule(config), DatabaseModule, MatchModule],
})
export class AppModule {}
