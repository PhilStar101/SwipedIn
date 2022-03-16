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
  CreateProfileDto,
  GetPaginationParamsDto,
  UpdateProfileDto,
} from '@swiped-in/shared';

// import { Profile } from 'passport';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  findAll(@Query() paginationParams: GetPaginationParamsDto) {
    return this.profilesService.findAll(paginationParams);
  }

  @Get('/byProvider')
  findByProvider(@Query('provider') provider: string, @Query('id') id: string) {
    return this.profilesService.findByProvider(provider, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(id);
  }
}
