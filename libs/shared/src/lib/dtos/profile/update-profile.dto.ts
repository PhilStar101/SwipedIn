import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-profile.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['providerIds'] as const),
) {}
