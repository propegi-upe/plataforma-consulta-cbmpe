import { Request } from 'src/domain/entities/request.entity';

import { RequestsRepository } from 'src/domain/repositories/request.repository';
import { REQUESTS_REPOSITORY } from 'src/domain/repositories/tokens';

import { Inject } from '@nestjs/common';

import { detectFieldType } from 'src/utils';

export type FetchRequestsUseCaseRequest = {
  query: {
    filter?: string;
    limit?: number;
    offset?: number;
  };
};

export interface FetchRequestsUseCaseResponse {
  requests: Request[];
}

export class FetchRequestsUseCase {
  constructor(
    @Inject(REQUESTS_REPOSITORY)
    private readonly requestsRepository: RequestsRepository,
  ) {}

  async execute({
    query,
  }: FetchRequestsUseCaseRequest): Promise<FetchRequestsUseCaseResponse> {
    const { filter } = query;

    let requests: Request[] = [];

    if (filter) {
      const field = detectFieldType(filter);

      switch (field) {
        case 'cnpj':
          requests = await this.requestsRepository.findManyByCnpj(filter);
          break;

        case 'cpf':
          requests = await this.requestsRepository.findManyByCpf(filter);
          break;

        case 'text':
          requests =
            await this.requestsRepository.findManyByPersonNameOrCorporateName(
              filter,
            );
          break;

        case 'protocol':
          requests = await this.requestsRepository.findManyByProtocolId(
            Number(filter),
          );
          break;
      }
    } else {
      requests = await this.requestsRepository.findMany(query);
    }

    return {
      requests,
    };
  }
}
