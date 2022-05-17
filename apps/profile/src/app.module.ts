import { Module } from '@nestjs/common';
import { ConfigModule } from '@swiped-in/backend/config';
import { DatabaseModule } from '@swiped-in/backend/database';

import { config } from './config';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [ConfigModule(config), DatabaseModule, ProfilesModule],
})
export class AppModule {}
