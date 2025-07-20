import { UsersRepository } from 'src/domain/repositories/users.repository';
import { User } from 'src/domain/entities/user.entity';

export class InMemoryUsersRepository implements UsersRepository {
  private users: Map<string, User> = new Map();
  private paginationLimit: number = 100;

  async create(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  async findMany(query: { limit?: number; offset?: number }): Promise<User[]> {
    const limit = query.limit ?? this.paginationLimit;
    const offset = query.offset ?? 0;

    const blocksArray = Array.from(this.users.values());
    return blocksArray.slice(offset, offset + limit);
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }
}
