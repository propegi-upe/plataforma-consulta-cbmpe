import { FetchRequirementsUseCase } from './fetch-requirements.use-case';
import { InMemoryRequirementsRepository } from 'src/infraestructure/database/in-memory/repositories/in-memory-requirements.repository';
import { Requirement } from 'src/domain/entities/requirements.entity';
import { makeRequirementData } from 'src/test/factories/make-requirement-data';

describe('FetchRequirementsUseCase', () => {
  let repo: InMemoryRequirementsRepository;
  let useCase: FetchRequirementsUseCase;

  beforeEach(() => {
    repo = new InMemoryRequirementsRepository();
    useCase = new FetchRequirementsUseCase(repo);
  });

  it('should return a list of requirements', async () => {
    const requirement1 = makeRequirementData();
    await repo.create(requirement1);

    const result = await useCase.execute({ query: { limit: 10, offset: 0 } });

    expect(result.requirements.length).toBe(1);
    expect(result.requirements[0]).toBeInstanceOf(Requirement);
    expect(result.requirements[0].id_req_visto).toBe(requirement1.id_req_visto);
  });

  it('should paginate requirements correctly', async () => {
    const requirement1 = makeRequirementData();
    await repo.create(requirement1);
    const requirement2 = makeRequirementData();
    await repo.create(requirement2);
    const requirement3 = makeRequirementData();
    await repo.create(requirement3);

    const allRequirementsResult = await useCase.execute({
      query: { limit: 10, offset: 0 },
    });
    expect(allRequirementsResult.requirements.length).toBe(3);
    expect(
      allRequirementsResult.requirements.map((p) => p.id_req_visto),
    ).toEqual([
      requirement1.id_req_visto,
      requirement2.id_req_visto,
      requirement3.id_req_visto,
    ]);

    const paginatedResult = await useCase.execute({
      query: { limit: 2, offset: 0 },
    });
    expect(paginatedResult.requirements.length).toBe(2);
  });
});
