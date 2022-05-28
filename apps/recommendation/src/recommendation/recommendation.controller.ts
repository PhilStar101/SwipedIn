import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  createPatternFactory,
  GetPaginationParamsDto,
  Role,
} from '@swiped-in/shared';

import { RecommendationService } from './recommendation.service';

const recommendationPattern = createPatternFactory('recommendation');

@Controller()
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @MessagePattern(recommendationPattern('hirer'))
  getHirerRecommendations(
    @Payload('id') id: string,
    @Payload('paginationParams') paginationParams: GetPaginationParamsDto,
  ) {
    return this.recommendationService.get(id, paginationParams, Role.Hirer);
  }

  @MessagePattern(recommendationPattern('employee'))
  getEmployeeRecommendations(
    @Payload('id') id: string,
    @Payload('paginationParams') paginationParams: GetPaginationParamsDto,
  ) {
    return this.recommendationService.get(id, paginationParams, Role.Employee);
  }
}
