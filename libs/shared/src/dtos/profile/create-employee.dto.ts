import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

import { Socials } from './common';

export class Experience {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  time: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  companies: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  stack: string[];
}

export class Name {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiPropertyOptional()
  @IsString()
  lastName?: string;
}
export class CreateEmployeeDto {
  @ApiPropertyOptional()
  @IsNumber()
  age?: number;

  @ApiPropertyOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsUrl()
  webSite?: string;

  @ApiProperty()
  @ValidateNested()
  @IsDefined()
  @Type(() => Name)
  name: Name;

  @ApiProperty()
  @ValidateNested()
  @IsDefined()
  @Type(() => Experience)
  experience: Experience;

  @ApiProperty()
  @ValidateNested()
  @IsDefined()
  @Type(() => Socials)
  socials: Socials;
}
