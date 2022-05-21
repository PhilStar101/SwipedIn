import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

import { Socials } from './common';

export class CreateHirerDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsUrl()
  webSite?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  stack: string[];

  @ApiProperty()
  @IsPositive()
  salary?: number;

  @ApiProperty()
  @ValidateNested()
  @IsDefined()
  @Type(() => Socials)
  socials: Socials;
}
