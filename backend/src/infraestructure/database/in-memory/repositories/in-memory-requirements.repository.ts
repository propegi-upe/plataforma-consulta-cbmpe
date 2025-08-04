import { RequirementsRepository } from 'src/domain/repositories/requirements.repository';
import { Requirement } from 'src/domain/entities/requirements.entity';

export class InMemoryRequirementsRepository implements RequirementsRepository {
  private requirements: Map<string, Requirement> = new Map();
  private paginationLimit: number = 100;

  async findMany(query: {
    limit?: number;
    offset?: number;
  }): Promise<Requirement[]> {
    const limit = query.limit ?? this.paginationLimit;
    const offset = query.offset ?? 0;

    const requirementsArray = Array.from(this.requirements.values());
    return requirementsArray.slice(offset, offset + limit);
  }

  async create(requirement: Requirement): Promise<void> {
    this.requirements.set(String(requirement.id_req_visto), requirement);
  }
}
