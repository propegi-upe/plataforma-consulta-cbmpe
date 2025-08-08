import { Enterprise } from '../entities/enterprise.entity';

export interface EnterprisesRepository {
  findMany(query: { limit?: number; offset?: number }): Promise<Enterprise[]>;
  findById(id: number): Promise<Enterprise | null>;
  findByNameOrCnpjOrCpf(query: { search: string }): Promise<Enterprise[]>;
  search(params: {
    personName?: string;
    cnpj?: string;
    cpf?: string;
    corporateName?: string;
    protocolId?: number;
    limit?: number;
    offset?: number;
  }): Promise<Enterprise[]>;
}
