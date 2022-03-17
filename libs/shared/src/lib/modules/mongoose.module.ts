import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule as MongooseModuleNest } from '@nestjs/mongoose';

export const MongooseModule = MongooseModuleNest.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get('service.database.host'),
  }),
  inject: [ConfigService],
});
