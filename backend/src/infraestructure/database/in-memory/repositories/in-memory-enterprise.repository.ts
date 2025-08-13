import { EnterprisesRepository } from 'src/domain/repositories/enterprise.repository';
import { Enterprise } from '../../../../domain/entities/enterprise.entity';

export class InMemoryEnterprisesRepository implements EnterprisesRepository {
  private enterprises: Map<string, Enterprise> = new Map();
  private paginationLimit: number = 100;

  async create(enterprise: Enterprise): Promise<void> {
    this.enterprises.set(String(enterprise.id), enterprise);
  }

  async findById(id: number): Promise<Enterprise | null> {
    const enterprise = this.enterprises.get(String(id));

    return enterprise ?? null;
  }

  async findMany(query: {
    limit?: number;
    offset?: number;
  }): Promise<Enterprise[]> {
    const limit = query.limit ?? this.paginationLimit;
    const offset = query.offset ?? 0;

    const enterprisesArray = Array.from(this.enterprises.values());

    return enterprisesArray.slice(offset, offset + limit);
  }

  async findManyByCpf(cpf: string): Promise<Enterprise[]> {
    const enterprisesArray = Array.from(this.enterprises.values());

    const filteredEnterprises = enterprisesArray.filter(
      (enterprise) => enterprise.cpf === cpf,
    );

    return filteredEnterprises;
  }

  async findManyByCnpj(cnpj: string): Promise<Enterprise[]> {
    const enterprisesArray = Array.from(this.enterprises.values());

    const filteredEnterprises = enterprisesArray.filter(
      (enterprise) => enterprise.cnpj === cnpj,
    );

    return filteredEnterprises;
  }

  async findManyByPersonNameOrCorporateName(
    searchText: string,
  ): Promise<Enterprise[]> {
    const enterprisesArray = Array.from(this.enterprises.values());

    const filteredEnterprises = enterprisesArray.filter(
      (enterprise) =>
        enterprise.personName === searchText ||
        enterprise.corporateName === searchText,
    );

    return filteredEnterprises;
  }

  async findManyByProtocolId(protocolId: number): Promise<Enterprise[]> {
    const enterprisesArray = Array.from(this.enterprises.values());

    const filteredEnterprises = enterprisesArray.filter(
      (enterprise) => enterprise.protocolId === protocolId,
    );

    return filteredEnterprises;
  }
}
