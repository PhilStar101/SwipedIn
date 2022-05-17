import { LoggerService } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

const { combine, ms } = format;
const { Console } = transports;

export interface LoggerConfig {
  name: string;
}

export function logger(config: LoggerConfig): LoggerService {
  return WinstonModule.createLogger({
    transports: [
      new Console({
        format: combine(
          ms(),
          utilities.format.nestLike(config.name, {
            prettyPrint: true,
          }),
        ),
      }),
    ],
  });
}
