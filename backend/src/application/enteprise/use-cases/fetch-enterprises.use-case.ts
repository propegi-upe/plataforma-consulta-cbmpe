import { Enterprise } from 'src/domain/entities/enterprise.entity';

import { EnterprisesRepository } from 'src/domain/repositories/enterprise.repository';
import { ENTERPRISES_REPOSITORY } from 'src/domain/repositories/tokens';

import { Inject } from '@nestjs/common';

import { detectFieldType } from 'src/utils';

export type FetchEnterprisesUseCaseRequest = {
  query: {
    filter?: string;
    limit?: number;
    offset?: number;
  };
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
    const { filter, limit, offset } = query;

    let enterprises: Enterprise[] = [];

    if (filter) {
      const field = detectFieldType(filter);

      switch (field) {
        case 'cnpj':
          enterprises = await this.enterprisesRepository.findManyByCnpj(
            filter,
            { limit, offset },
          );
          break;

        case 'cpf':
          enterprises = await this.enterprisesRepository.findManyByCpf(filter, {
            limit,
            offset,
          });
          break;

        case 'text':
          enterprises =
            await this.enterprisesRepository.findManyByPersonNameOrCorporateName(
              filter,
              { limit, offset },
            );
          break;

        case 'protocol':
          enterprises = await this.enterprisesRepository.findManyByProtocolId(
            Number(filter),
            { limit, offset },
          );
          break;
      }
    } else {
      enterprises = await this.enterprisesRepository.findMany({
        limit,
        offset,
      });
    }

    return {
      enterprises,
    };
  }
}
