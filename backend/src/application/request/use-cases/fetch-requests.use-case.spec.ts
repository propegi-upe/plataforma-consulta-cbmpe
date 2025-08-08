import { FetchRequestsUseCase } from './fetch-requests.use-case';
import { InMemoryRequestsRepository } from 'src/infraestructure/database/in-memory/repositories/in-memory-request.repository';
import { Request } from 'src/domain/entities/request.entity';
import { makeRequestData } from 'src/test/factories/make-request-data';

describe('FetchRequestsUseCase', () => {
  let repo: InMemoryRequestsRepository;
  let useCase: FetchRequestsUseCase;

  beforeEach(() => {
    repo = new InMemoryRequestsRepository();
    useCase = new FetchRequestsUseCase(repo);
  });

  it('should return a list of requests', async () => {
    const request1 = makeRequestData();
    await repo.create(request1);

    const result = await useCase.execute({ query: { limit: 10, offset: 0 } });

    expect(result.requests.length).toBe(1);
    expect(result.requests[0]).toBeInstanceOf(Request);
    expect(result.requests[0].id_req_visto).toBe(request1.id_req_visto);
  });

  it('should paginate requests correctly', async () => {
    const request1 = makeRequestData();
    await repo.create(request1);
    const request2 = makeRequestData();
    await repo.create(request2);
    const request3 = makeRequestData();
    await repo.create(request3);

    const allRequestsResult = await useCase.execute({
      query: { limit: 10, offset: 0 },
    });
    expect(allRequestsResult.requests.length).toBe(3);
    expect(allRequestsResult.requests.map((p) => p.id_req_visto)).toEqual([
      request1.id_req_visto,
      request2.id_req_visto,
      request3.id_req_visto,
    ]);

    const paginatedResult = await useCase.execute({
      query: { limit: 2, offset: 0 },
    });
    expect(paginatedResult.requests.length).toBe(2);
  });
});
