import { Request } from '../entities/request.entity';

export interface RequestsRepository {
  findById(id: number): Promise<Request | null>;
  findMany(query: { limit?: number; offset?: number }): Promise<Request[]>;

  findManyByCpf(
    cpf: string,
    query: { limit?: number; offset?: number },
  ): Promise<Request[]>;

  findManyByCnpj(
    cnpj: string,
    query: { limit?: number; offset?: number },
  ): Promise<Request[]>;

  findManyByPersonNameOrCorporateName(
    searchText: string,
    query: { limit?: number; offset?: number },
  ): Promise<Request[]>;

  findManyByProtocolId(
    protocolId: number,
    query: { limit?: number; offset?: number },
  ): Promise<Request[]>;
}
