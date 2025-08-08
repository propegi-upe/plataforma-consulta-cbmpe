import { EnterprisesRepository } from 'src/domain/repositories/enterprise.repository';
import { Enterprise } from '../../../../domain/entities/enterprise.entity';

export class InMemoryEnterprisesRepository implements EnterprisesRepository {
  private enterprises: Map<string, Enterprise> = new Map();
  private paginationLimit: number = 100;

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

  async create(enterprise: Enterprise): Promise<void> {
    this.enterprises.set(String(enterprise.id), enterprise);
  }

  async findByNameOrCnpjOrCpf(query: {
    search: string;
  }): Promise<Enterprise[]> {
    const { search } = query;
    const enterprisesArray = Array.from(this.enterprises.values());
    const lowerSearch = search.toLowerCase();

    return enterprisesArray.filter((enterprise) => {
      if (
        typeof enterprise.personName === 'string' &&
        enterprise.personName.toLowerCase().includes(lowerSearch)
      ) {
        return true;
      }
      if (
        typeof enterprise.cnpj === 'string' &&
        enterprise.cnpj.includes(search)
      ) {
        return true;
      }
      if (
        typeof enterprise.cpf === 'string' &&
        enterprise.cpf.includes(search)
      ) {
        return true;
      }
      if (
        typeof enterprise.corporateName === 'string' &&
        enterprise.corporateName.toLowerCase().includes(lowerSearch)
      ) {
        return true;
      }
      if (
        typeof enterprise.protocolId === 'number' &&
        enterprise.protocolId === Number(search)
      ) {
        return true;
      }
      return false;
    });
  }

  async search(params: {
    personName?: string;
    cnpj?: string;
    cpf?: string;
    corporateName?: string;
    protocolId?: number;
    limit?: number;
    offset?: number;
  }): Promise<Enterprise[]> {
    let results = Array.from(this.enterprises.values());

    if (params.personName) {
      const lower = params.personName.toLowerCase();
      results = results.filter(
        (e) =>
          typeof e.personName === 'string' &&
          e.personName.toLowerCase().includes(lower),
      );
    }
    if (params.cnpj) {
      results = results.filter(
        (e) => typeof e.cnpj === 'string' && e.cnpj.includes(params.cnpj!),
      );
    }
    if (params.cpf) {
      results = results.filter(
        (e) => typeof e.cpf === 'string' && e.cpf.includes(params.cpf!),
      );
    }
    if (params.corporateName) {
      const lower = params.corporateName.toLowerCase();
      results = results.filter(
        (e) =>
          typeof e.corporateName === 'string' &&
          e.corporateName.toLowerCase().includes(lower),
      );
    }
    if (params.protocolId !== undefined) {
      results = results.filter(
        (e) =>
          typeof e.protocolId === 'number' &&
          e.protocolId === params.protocolId,
      );
    }

    const offset = params.offset ?? 0;
    const limit = params.limit ?? this.paginationLimit;

    return results.slice(offset, offset + limit);
  }
}
