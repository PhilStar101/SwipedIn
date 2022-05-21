import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProviderIds {
  @ApiPropertyOptional()
  @IsNotEmpty()
  google?: string;
}

export class Socials {
  @ApiProperty()
  @IsString()
  instagram: string;

  @ApiProperty()
  @IsString()
  twitter: string;

  @ApiProperty()
  @IsString()
  gitHub: string;

  @ApiProperty()
  @IsString()
  linkedIn: string;
}
