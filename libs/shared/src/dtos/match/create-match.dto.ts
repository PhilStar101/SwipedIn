import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMatchDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  hirer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  employee: string;
}
