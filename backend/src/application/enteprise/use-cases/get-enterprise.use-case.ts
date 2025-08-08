import { EnterprisesRepository } from 'src/domain/repositories/enterprise.repository';
import { Enterprise } from 'src/domain/entities/enterprise.entity';
import { ResourceNotFound } from 'src/domain/errors/ResourceNotFound';
import { RESPONSE } from 'src/core/response/response.messages';
import { Inject } from '@nestjs/common';
import { ENTERPRISES_REPOSITORY } from 'src/domain/repositories/tokens';

export interface GetEnterpriseUseCaseRequest {
  id: number;
  cpf?: string;
  corporateName?: string;
  cnpj?: string;
  protocolId?: number;
  personName?: string;
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

  async findByNameOrCnpjOrCpf(
    search: string,
  ): Promise<{ enterprises: Enterprise[] }> {
    const enterprises = await this.enterprisesRepository.findByNameOrCnpjOrCpf({
      search,
    });
    if (!enterprises || enterprises.length === 0) {
      throw new ResourceNotFound(RESPONSE.ENTERPRISES.NOT_FOUND);
    }
    return { enterprises };
  }

  async search(params: {
    personName?: string;
    cnpj?: string;
    cpf?: string;
    corporateName?: string;
    protocolId?: number;
    limit?: number;
    offset?: number;
  }): Promise<{ enterprises: Enterprise[] }> {
    const enterprises = await this.enterprisesRepository.search(params);
    if (!enterprises || enterprises.length === 0) {
      throw new ResourceNotFound(RESPONSE.ENTERPRISES.NOT_FOUND);
    }
    return { enterprises };
  }
}
