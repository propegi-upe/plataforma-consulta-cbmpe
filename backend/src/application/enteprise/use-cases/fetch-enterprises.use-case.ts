import { EnterprisesRepository } from 'src/domain/repositories/enterprise.repository';
import { Enterprise } from 'src/domain/entities/enterprise.entity';
import { ENTERPRISES_REPOSITORY } from 'src/domain/repositories/tokens';
import { Inject } from '@nestjs/common';

export type FetchEnterprisesUseCaseRequest = {
  query: { limit?: number; offset?: number };
};

export interface FetchEnterprisesUseCaseResponse {
  enterprises: Enterprise[];
}

export class FetchEnterprisesUseCase {
  constructor(
    @Inject(ENTERPRISES_REPOSITORY)
    private readonly enterprisesRepository: EnterprisesRepository,
  ) {}

  async execute({
    query,
  }: FetchEnterprisesUseCaseRequest): Promise<FetchEnterprisesUseCaseResponse> {
    const enterprises = await this.enterprisesRepository.findMany(query);
    return { enterprises };
  }
}
