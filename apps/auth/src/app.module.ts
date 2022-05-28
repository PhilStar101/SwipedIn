import { Module } from '@nestjs/common';
import { ConfigModule } from '@swiped-in/backend/config';

import { config } from './config';

@Module({
  imports: [ConfigModule(config)],
  controllers: [],
  providers: [],
})
export class AppModule {}
