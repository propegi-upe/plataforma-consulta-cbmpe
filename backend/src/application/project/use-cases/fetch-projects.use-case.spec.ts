import { FetchProjectsUseCase } from './fetch-projects.use-case';
import { InMemoryProjectsRepository } from 'src/infraestructure/database/in-memory/repositories/in-memory-projects.repository';
import { Project } from 'src/domain/entities/project.entity';
import { makeProjectData } from 'src/test/factories/make-project-data';

describe('FetchProjectsUseCase', () => {
  let repo: InMemoryProjectsRepository;
  let useCase: FetchProjectsUseCase;

  beforeEach(() => {
    repo = new InMemoryProjectsRepository();
    useCase = new FetchProjectsUseCase(repo);
  });

  it('should return a list of projects', async () => {
    const project1 = makeProjectData();
    await repo.create(project1);

    const result = await useCase.execute({ query: { limit: 10, offset: 0 } });

    expect(result.projects.length).toBe(1);
    expect(result.projects[0]).toBeInstanceOf(Project);
    expect(result.projects[0].id).toBe(project1.id);
  });

  it('should paginate projects correctly', async () => {
    const project1 = makeProjectData();
    await repo.create(project1);
    const project2 = makeProjectData();
    await repo.create(project2);
    const project3 = makeProjectData();
    await repo.create(project3);

    const allProjectsResult = await useCase.execute({
      query: { limit: 10, offset: 0 },
    });
    expect(allProjectsResult.projects.length).toBe(3);
    expect(allProjectsResult.projects.map((p) => p.id)).toEqual([
      project1.id,
      project2.id,
      project3.id,
    ]);

    const paginatedResult = await useCase.execute({
      query: { limit: 2, offset: 0 },
    });
    expect(paginatedResult.projects.length).toBe(2);
  });
});
