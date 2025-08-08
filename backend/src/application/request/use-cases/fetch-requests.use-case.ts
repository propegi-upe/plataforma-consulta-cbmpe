import { Request } from 'src/domain/entities/request.entity';
import { RequestsRepository } from 'src/domain/repositories/request.repository';
import { REQUESTS_REPOSITORY } from 'src/domain/repositories/tokens';
import { Inject } from '@nestjs/common';
import { RESPONSE } from 'src/core/response/response.messages';
import { ResourceNotFound } from 'src/domain/errors/ResourceNotFound';

export type FetchRequestsUseCaseRequest = {
  query: { limit?: number; offset?: number };
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
    const requests = await this.requestsRepository.findMany(query);
    return { requests };
  }
  async findByNameOrCnpjOrCpf(
    search: string,
  ): Promise<{ requests: Request[] }> {
    const requests = await this.requestsRepository.findByNameOrCnpjOrCpf({
      search,
    });
    if (!requests || requests.length === 0) {
      throw new ResourceNotFound(RESPONSE.REQUESTS.NOT_FOUND);
    }
    return { requests };
  }

  async search(params: {
    id_protc_fk?: string;
    nm_pess?: string;
    nr_cpf?: string;
    nr_cnpj?: string;
    ds_titul_estab?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ requests: Request[] }> {
    const requests = await this.requestsRepository.search(params);
    if (!requests || requests.length === 0) {
      throw new ResourceNotFound(RESPONSE.REQUESTS.NOT_FOUND);
    }
    return { requests };
  }
}
