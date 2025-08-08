import { FetchEnterprisesUseCase } from './fetch-enterprises.use-case';
import { InMemoryEnterprisesRepository } from 'src/infraestructure/database/in-memory/repositories/in-memory-enterprise.repository';
import { Enterprise } from 'src/domain/entities/enterprise.entity';
import { makeEnterpriseData } from 'src/test/factories/make-enterprise-data';

describe('FetchEnterprisesUseCase', () => {
  let repo: InMemoryEnterprisesRepository;
  let useCase: FetchEnterprisesUseCase;

  beforeEach(() => {
    repo = new InMemoryEnterprisesRepository();
    useCase = new FetchEnterprisesUseCase(repo);
  });

  it('should return a list of enterprises', async () => {
    const enterprise1 = makeEnterpriseData();
    await repo.create(enterprise1);

    const result = await useCase.execute({ query: { limit: 10, offset: 0 } });

    expect(result.enterprises.length).toBe(1);
    expect(result.enterprises[0]).toBeInstanceOf(Enterprise);
    expect(result.enterprises[0].id).toBe(enterprise1.id);
  });

  it('should paginate enterprises correctly', async () => {
    const enterprise1 = makeEnterpriseData();
    await repo.create(enterprise1);
    const enterprise2 = makeEnterpriseData();
    await repo.create(enterprise2);
    const enterprise3 = makeEnterpriseData();
    await repo.create(enterprise3);

    const allEnterprisesResult = await useCase.execute({
      query: { limit: 10, offset: 0 },
    });
    expect(allEnterprisesResult.enterprises.length).toBe(3);
    expect(allEnterprisesResult.enterprises.map((p) => p.id)).toEqual([
      enterprise1.id,
      enterprise2.id,
      enterprise3.id,
    ]);

    const paginatedResult = await useCase.execute({
      query: { limit: 2, offset: 0 },
    });
    expect(paginatedResult.enterprises.length).toBe(2);
  });
});
