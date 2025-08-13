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

  async findManyByCpf(cpf: string): Promise<Request[]> {
    const requestsArray = Array.from(this.requests.values());

    const filteredRequests = requestsArray.filter(
      (request) => request.cpf === cpf,
    );

    return filteredRequests;
  }

  async findManyByCnpj(cnpj: string): Promise<Request[]> {
    const requestsArray = Array.from(this.requests.values());

    const filteredRequests = requestsArray.filter(
      (request) => request.cnpj === cnpj,
    );

    return filteredRequests;
  }

  async findManyByPersonNameOrCorporateName(
    searchText: string,
  ): Promise<Request[]> {
    const requestsArray = Array.from(this.requests.values());

    const filteredRequests = requestsArray.filter(
      (request) =>
        request.personName === searchText ||
        request.corporateName === searchText,
    );

    return filteredRequests;
  }

  async findManyByProtocolId(protocolId: number): Promise<Request[]> {
    const requestsArray = Array.from(this.requests.values());

    const filteredRequests = requestsArray.filter(
      (request) => request.protocolId === protocolId,
    );

    return filteredRequests;
  }
}
