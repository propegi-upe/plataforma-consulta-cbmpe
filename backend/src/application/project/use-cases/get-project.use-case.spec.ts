import { GetProjectUseCase } from './get-project.use-case';
import { InMemoryProjectsRepository } from 'src/infraestructure/database/in-memory/repositories/in-memory-projects.repository';
import { Project } from 'src/domain/entities/project.entity';
import { makeProjectData } from 'src/test/factories/make-project-data';
import { RESPONSE } from 'src/core/response/response.messages';

describe('GetProjectUseCase', () => {
  let repo: InMemoryProjectsRepository;
  let useCase: GetProjectUseCase;

  beforeEach(() => {
    repo = new InMemoryProjectsRepository();
    useCase = new GetProjectUseCase(repo);
  });

  it('should get a project by id', async () => {
    const createdProject = makeProjectData();
    await repo.create(createdProject);

    const result = await useCase.execute({ id: createdProject.id! });

    expect(result.project).toBeInstanceOf(Project);
    expect(result.project.id).toBe(createdProject.id);
  });

  it('should throw an error if project with a non-existing ID is requested', async () => {
    await expect(useCase.execute({ id: -7 })).rejects.toThrow(
      RESPONSE.PROJECTS.NOT_FOUND,
    );
  });
});
