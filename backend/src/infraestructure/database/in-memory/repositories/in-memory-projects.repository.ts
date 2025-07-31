import { ProjectsRepository } from 'src/domain/repositories/projects.repository';
import { Project } from '../../../../domain/entities/project.entity';

export class InMemoryProjectsRepository implements ProjectsRepository {
  private projects: Map<string, Project> = new Map();
  private paginationLimit: number = 100;

  async findById(id: number): Promise<Project | null> {
    const project = this.projects.get(String(id));
    return project ?? null;
  }
  async findMany(query: {
    limit?: number;
    offset?: number;
  }): Promise<Project[]> {
    const limit = query.limit ?? this.paginationLimit;
    const offset = query.offset ?? 0;

    const projectsArray = Array.from(this.projects.values());
    return projectsArray.slice(offset, offset + limit);
  }

  async create(project: Project): Promise<void> {
    this.projects.set(String(project.id), project);
  }
}
