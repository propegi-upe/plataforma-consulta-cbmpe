import { ProjectsRepository } from 'src/domain/repositories/projects.repository';
import { Project } from 'src/domain/entities/project.entity';
import { ResourceNotFound } from 'src/domain/errors/ResourceNotFound';
import { RESPONSE } from 'src/core/response/response.messages';
import { Inject } from '@nestjs/common';
import { PROJECTS_REPOSITORY } from 'src/domain/repositories/tokens';

export interface GetProjectUseCaseRequest {
  id: number;
}

export interface GetProjectUseCaseResponse {
  project: Project;
}

export class GetProjectUseCase {
  constructor(
    @Inject(PROJECTS_REPOSITORY)
    private projectsRepository: ProjectsRepository,
  ) {}

  async execute({
    id,
  }: GetProjectUseCaseRequest): Promise<GetProjectUseCaseResponse> {
    const project = await this.projectsRepository.findById(id);
    if (!project) {
      throw new ResourceNotFound(RESPONSE.PROJECTS.NOT_FOUND);
    }
    return { project };
  }
}
