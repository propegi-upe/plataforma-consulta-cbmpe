import { Project } from '../entities/project.entity';

export interface ProjectsRepository {
  findMany(query: { limit?: number; offset?: number }): Promise<Project[]>;
  findById(id: number): Promise<Project | null>;
}
