import { ProjectsRepository } from 'src/domain/repositories/projects.repository';
import { Project } from 'src/domain/entities/project.entity';
import { PROJECTS_REPOSITORY } from 'src/domain/repositories/tokens';
import { Inject } from '@nestjs/common';

export type FetchProjectsUseCaseRequest = {
  query: { limit?: number; offset?: number };
};

export interface FetchProjectsUseCaseResponse {
  projects: Project[];
}

export class FetchProjectsUseCase {
  constructor(
    @Inject(PROJECTS_REPOSITORY)
    private readonly projectsRepository: ProjectsRepository,
  ) {}

  async execute({
    query,
  }: FetchProjectsUseCaseRequest): Promise<FetchProjectsUseCaseResponse> {
    const projects = await this.projectsRepository.findMany(query);
    return { projects };
  }
}
