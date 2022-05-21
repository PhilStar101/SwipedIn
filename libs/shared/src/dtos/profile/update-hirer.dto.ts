import { PartialType } from '@nestjs/swagger';

import { CreateHirerDto } from './create-hirer.dto';

export class UpdateHirerDto extends PartialType(
  CreateHirerDto,
  // OmitType(CreateHirerDto, ['providerIds'] as const),
) {}
