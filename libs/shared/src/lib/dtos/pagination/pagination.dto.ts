import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetPaginationParamsDto {
  @Type(() => Number)
  @IsNumber()
  offset: number;
  @Type(() => Number)
  @IsNumber()
  limit: number;
}
