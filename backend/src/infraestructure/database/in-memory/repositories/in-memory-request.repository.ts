import { RequestsRepository } from 'src/domain/repositories/request.repository';
import { Request } from 'src/domain/entities/request.entity';

export class InMemoryRequestsRepository implements RequestsRepository {
  private requests: Map<string, Request> = new Map();
  private paginationLimit: number = 100;

  async findMany(query: {
    limit?: number;
    offset?: number;
  }): Promise<Request[]> {
    const limit = query.limit ?? this.paginationLimit;
    const offset = query.offset ?? 0;
    const requestsArray = Array.from(this.requests.values());
    return requestsArray.slice(offset, offset + limit);
  }

  async findById(id: number): Promise<Request | null> {
    const request = this.requests.get(String(id));
    return request ?? null;
  }

  async findByNameOrCnpjOrCpf(query: { search: string }): Promise<Request[]> {
    const search = query.search.toLowerCase();
    return Array.from(this.requests.values()).filter(
      (e) =>
        (typeof e.nm_pess === 'string' &&
          e.nm_pess.toLowerCase().includes(search)) ||
        (typeof e.nr_cnpj === 'string' && e.nr_cnpj.includes(search)) ||
        (typeof e.nr_cpf === 'string' && e.nr_cpf.includes(search)),
    );
  }

  async search(params: {
    id_protc_fk?: string;
    nm_pess?: string;
    nr_cpf?: string;
    nr_cnpj?: string;
    ds_titul_estab?: string;
  }): Promise<Request[]> {
    let results = Array.from(this.requests.values());

    if (params.id_protc_fk) {
      results = results.filter(
        (e) =>
          typeof e.id_protc_fk === 'string' &&
          e.id_protc_fk.includes(params.id_protc_fk!),
      );
    }
    if (params.nm_pess) {
      const lower = params.nm_pess.toLowerCase();
      results = results.filter(
        (e) =>
          typeof e.nm_pess === 'string' &&
          e.nm_pess.toLowerCase().includes(lower),
      );
    }
    if (params.nr_cpf) {
      results = results.filter(
        (e) =>
          typeof e.nr_cpf === 'string' && e.nr_cpf.includes(params.nr_cpf!),
      );
    }
    if (params.nr_cnpj) {
      results = results.filter(
        (e) =>
          typeof e.nr_cnpj === 'string' && e.nr_cnpj.includes(params.nr_cnpj!),
      );
    }
    if (params.ds_titul_estab) {
      const lower = params.ds_titul_estab.toLowerCase();
      results = results.filter(
        (e) =>
          typeof e.ds_titul_estab === 'string' &&
          e.ds_titul_estab.toLowerCase().includes(lower),
      );
    }

    return results;
  }
}
