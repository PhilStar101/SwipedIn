import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetPaginationParamsDto {
  @Type(() => Number)
  @IsNumber()
  // TODO: why optional is needed?
  @IsOptional()
  offset?: number;
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number;
}
