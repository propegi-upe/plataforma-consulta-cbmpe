import { Request } from '../entities/request.entity';

export interface RequestsRepository {
  findMany(query: { limit?: number; offset?: number }): Promise<Request[]>;
  findById(id: number): Promise<Request | null>;
  findByNameOrCnpjOrCpf(query: { search: string }): Promise<Request[]>;
  search(params: {
    id_protc_fk?: string;
    nm_pess?: string;
    nr_cpf?: string;
    nr_cnpj?: string;
    ds_titul_estab?: string;
  }): Promise<Request[]>;
}
