import { Module } from '@nestjs/common';
import { ConfigModule } from '@swiped-in/backend/config';
import { MongooseModule } from '@swiped-in/shared';

import { config } from './config';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [ConfigModule(config), MongooseModule, ProfilesModule],
})
export class AppModule {}
