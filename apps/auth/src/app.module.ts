import { Module } from '@nestjs/common';
import { ConfigModule } from '@swiped-in/backend/config';
import { DatabaseModule } from '@swiped-in/backend/database';

import { AuthModule } from './auth/auth.module';
import { config } from './config';

@Module({
  imports: [ConfigModule(config), DatabaseModule, AuthModule],
})
export class AppModule {}
