import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class ProviderIds {
  @ApiPropertyOptional()
  @IsNotEmpty()
  google?: string;
}

export class CreateUserDto {
  @ApiProperty()
  @ValidateNested()
  @IsDefined()
  @Type(() => ProviderIds)
  providerIds: ProviderIds;

  @ApiPropertyOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsDefined()
  @IsAlphanumeric()
  username: string;

  @ApiProperty()
  @IsAlphanumeric()
  password?: string;

  @ApiProperty()
  @IsUrl()
  avatar?: string;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  confirmed: boolean;
}
