import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetPaginationParamsDto, Role } from '@swiped-in/shared';

import { RecommendationService } from './recommendation.service';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get('hirer/:id')
  getHirerRecommendations(
    @Param('id') id: string,
    @Query() paginationParams: GetPaginationParamsDto,
  ) {
    return this.recommendationService.get(id, paginationParams, Role.Hirer);
  }

  @Get('employee/:id')
  getEmployeeRecommendations(
    @Param('id') id: string,
    @Query() paginationParams: GetPaginationParamsDto,
  ) {
    return this.recommendationService.get(id, paginationParams, Role.Employee);
  }
}
