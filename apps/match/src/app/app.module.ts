import { Module } from '@nestjs/common';
import { ConfigModule } from '@swiped-in/backend/config';

import { config } from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
