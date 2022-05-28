import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  createPatternFactory,
  GetPaginationParamsDto,
  Role,
} from '@swiped-in/shared';

const recommendationPattern = createPatternFactory('recommendation');

@Injectable()
export class RecommendationService {
  constructor(
    @Inject('RECOMMENDATION_SERVICE') private recommendationClient: ClientProxy,
  ) {}

  async get(id: string, paginationParams: GetPaginationParamsDto, role: Role) {
    return this.recommendationClient.send(recommendationPattern(Role[role]), {
      id,
      paginationParams,
      role,
    });
  }
}
