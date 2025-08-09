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
    const search = query.search.trim();
    // Protocolo: 6 dígitos numéricos
    const isProtocolo = /^\d{6}$/.test(search);
    // CPF: 11 dígitos numéricos
    const isCpf = /^\d{11}$/.test(search);
    // CNPJ: 14 dígitos numéricos
    const isCnpj = /^\d{14}$/.test(search);

    return Array.from(this.requests.values()).filter((e) => {
      if (isProtocolo) {
        return String(e.id_protc_fk) === search;
      }
      if (isCpf) {
        return typeof e.nr_cpf === 'string' && e.nr_cpf === search;
      }
      if (isCnpj) {
        return typeof e.nr_cnpj === 'string' && e.nr_cnpj === search;
      }
      // Se não for nenhum dos acima, busca por nome (case insensitive, contém)
      if (typeof e.nm_razao_socl === 'string') {
        return e.nm_razao_socl.toLowerCase().includes(search.toLowerCase());
      }
      return false;
    });
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
