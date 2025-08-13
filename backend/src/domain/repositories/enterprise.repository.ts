import { Enterprise } from '../entities/enterprise.entity';

export interface EnterprisesRepository {
  findById(id: number): Promise<Enterprise | null>;
  findMany(query: { limit?: number; offset?: number }): Promise<Enterprise[]>;

  findManyByCpf(cpf: string): Promise<Enterprise[]>;
  findManyByCnpj(cnpj: string): Promise<Enterprise[]>;
  findManyByPersonNameOrCorporateName(
    searchText: string,
  ): Promise<Enterprise[]>;
  findManyByProtocolId(protocolId: number): Promise<Enterprise[]>;
}
