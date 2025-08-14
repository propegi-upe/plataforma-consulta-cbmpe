import { Enterprise } from '../entities/enterprise.entity';

export interface EnterprisesRepository {
  findById(id: number): Promise<Enterprise | null>;
  findMany(query: { limit?: number; offset?: number }): Promise<Enterprise[]>;

  findManyByCpf(
    cpf: string,
    query: { limit?: number; offset?: number },
  ): Promise<Enterprise[]>;

  findManyByCnpj(
    cnpj: string,
    query: { limit?: number; offset?: number },
  ): Promise<Enterprise[]>;

  findManyByPersonNameOrCorporateName(
    searchText: string,
    query: { limit?: number; offset?: number },
  ): Promise<Enterprise[]>;

  findManyByProtocolId(
    protocolId: number,
    query: { limit?: number; offset?: number },
  ): Promise<Enterprise[]>;
}
