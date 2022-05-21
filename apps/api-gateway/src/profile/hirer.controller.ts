import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateHirerDto,
  GetPaginationParamsDto,
  UpdateHirerDto,
} from '@swiped-in/shared';

// import { Profile } from 'passport';
import { HirerService } from './hirer.service';

@Controller('profiles/hirer')
export class HirerController {
  constructor(private readonly hirersService: HirerService) {}

  @Post()
  create(@Body() createHirerDto: CreateHirerDto) {
    return this.hirersService.create(createHirerDto);
  }

  @Get()
  findAll(@Query() paginationParams: GetPaginationParamsDto) {
    return this.hirersService.findAll(paginationParams);
  }

  @Get('/byProvider')
  findByProvider(@Query('provider') provider: string, @Query('id') id: string) {
    return this.hirersService.findByProvider(provider, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hirersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHirerDto: UpdateHirerDto) {
    return this.hirersService.update(id, updateHirerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hirersService.remove(id);
  }
}
