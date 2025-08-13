import { Request } from '../entities/request.entity';

export interface RequestsRepository {
  findById(id: number): Promise<Request | null>;
  findMany(query: { limit?: number; offset?: number }): Promise<Request[]>;

  findManyByCpf(cpf: string): Promise<Request[]>;
  findManyByCnpj(cnpj: string): Promise<Request[]>;
  findManyByPersonNameOrCorporateName(searchText: string): Promise<Request[]>;
  findManyByProtocolId(protocolId: number): Promise<Request[]>;
}
