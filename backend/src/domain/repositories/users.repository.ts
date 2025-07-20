import { User } from '../entities/user.entity';

export interface UsersRepository {
  create(user: User): Promise<void>;
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findMany(query: { limit?: number; offset?: number }): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
}
