import { Request } from 'src/domain/entities/request.entity';

import { RequestsRepository } from 'src/domain/repositories/request.repository';
import { REQUESTS_REPOSITORY } from 'src/domain/repositories/tokens';

import { Inject } from '@nestjs/common';

import { RESPONSE } from 'src/core/response/response.messages';
import { ResourceNotFound } from 'src/domain/errors/ResourceNotFound';

export interface GetRequestUseCaseRequest {
  id: number;
}

export interface GetRequestUseCaseResponse {
  request: Request;
}

export class GetRequestUseCase {
  constructor(
    @Inject(REQUESTS_REPOSITORY)
    private requestsRepository: RequestsRepository,
  ) {}

  async execute({
    id,
  }: GetRequestUseCaseRequest): Promise<GetRequestUseCaseResponse> {
    const request = await this.requestsRepository.findById(id);

    if (!request) {
      throw new ResourceNotFound(RESPONSE.ENTERPRISES.NOT_FOUND);
    }

    return {
      request,
    };
  }
}
