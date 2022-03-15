import {
  ConfigFactory,
  ConfigModule as ConfigModuleNest,
  ConfigObject,
} from '@nestjs/config';

import { environmentSchema } from '../schemas/environment.schema';

export const ConfigModule = (config: ConfigFactory<ConfigObject>) =>
  ConfigModuleNest.forRoot({
    isGlobal: true,
    expandVariables: true,
    cache: true,
    load: [config],
    validationSchema: environmentSchema,
    validationOptions: {
      allowUnknown: true,
      abortEarly: false,
    },
  });
