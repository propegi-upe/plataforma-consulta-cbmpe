import { RequirementsRepository } from 'src/domain/repositories/requirements.repository';
import { Requirement } from 'src/domain/entities/requirements.entity';
import { REQUIREMENTS_REPOSITORY } from 'src/domain/repositories/tokens';
import { Inject } from '@nestjs/common';

export type FetchRequirementsUseCaseRequest = {
  query: { limit?: number; offset?: number };
};

export interface FetchRequirementsUseCaseResponse {
  requirements: Requirement[];
}

export class FetchRequirementsUseCase {
  constructor(
    @Inject(REQUIREMENTS_REPOSITORY)
    private readonly requirementsRepository: RequirementsRepository,
  ) {}

  async execute({
    query,
  }: FetchRequirementsUseCaseRequest): Promise<FetchRequirementsUseCaseResponse> {
    const requirements = await this.requirementsRepository.findMany(query);
    return { requirements };
  }
}
