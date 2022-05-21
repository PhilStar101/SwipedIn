import { Module } from '@nestjs/common';
import { ConfigModule } from '@swiped-in/backend/config';
import { DatabaseModule } from '@swiped-in/backend/database';

import { config } from './config';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ConfigModule(config), DatabaseModule, ProfileModule],
})
export class AppModule {}
