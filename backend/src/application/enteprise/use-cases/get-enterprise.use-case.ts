import { Enterprise } from 'src/domain/entities/enterprise.entity';

import { EnterprisesRepository } from 'src/domain/repositories/enterprise.repository';
import { ENTERPRISES_REPOSITORY } from 'src/domain/repositories/tokens';

import { Inject } from '@nestjs/common';

import { RESPONSE } from 'src/core/response/response.messages';
import { ResourceNotFound } from 'src/domain/errors/ResourceNotFound';

export interface GetEnterpriseUseCaseRequest {
  id: number;
}

export interface GetEnterpriseUseCaseResponse {
  enterprise: Enterprise;
}

export class GetEnterpriseUseCase {
  constructor(
    @Inject(ENTERPRISES_REPOSITORY)
    private enterprisesRepository: EnterprisesRepository,
  ) {}

  async execute({
    id,
  }: GetEnterpriseUseCaseRequest): Promise<GetEnterpriseUseCaseResponse> {
    const enterprise = await this.enterprisesRepository.findById(id);

    if (!enterprise) {
      throw new ResourceNotFound(RESPONSE.ENTERPRISES.NOT_FOUND);
    }

    return { enterprise };
  }
}
