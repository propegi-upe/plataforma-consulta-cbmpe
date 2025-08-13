import { GetEnterpriseUseCase } from './get-request.use-case';
import { InMemoryEnterprisesRepository } from 'src/infraestructure/database/in-memory/repositories/in-memory-enterprise.repository';
import { Enterprise } from 'src/domain/entities/enterprise.entity';
import { makeEnterpriseData } from 'src/test/factories/make-enterprise-data';
import { RESPONSE } from 'src/core/response/response.messages';

describe('GetEnterpriseUseCase', () => {
  let repo: InMemoryEnterprisesRepository;
  let useCase: GetEnterpriseUseCase;

  beforeEach(() => {
    repo = new InMemoryEnterprisesRepository();
    useCase = new GetEnterpriseUseCase(repo);
  });

  it('should get a enterprise by id', async () => {
    const createdEnterprise = makeEnterpriseData();
    await repo.create(createdEnterprise);

    const result = await useCase.execute({ id: createdEnterprise.id });

    expect(result.enterprise).toBeInstanceOf(Enterprise);
    expect(result.enterprise.id).toBe(createdEnterprise.id);
  });

  it('should throw an error if enterprise with a non-existing ID is requested', async () => {
    await expect(useCase.execute({ id: -7 })).rejects.toThrow(
      RESPONSE.PROJECTS.NOT_FOUND,
    );
  });
});
