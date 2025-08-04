import { Requirement } from '../entities/requirements.entity';

export interface RequirementsRepository {
  findMany(query: { limit?: number; offset?: number }): Promise<Requirement[]>;
}
