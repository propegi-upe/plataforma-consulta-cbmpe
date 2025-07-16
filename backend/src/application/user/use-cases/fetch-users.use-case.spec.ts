import { FetchUsersUseCase } from './fetch-users.use-case';
import { InMemoryUsersRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory-users.repository';
import { User } from 'src/domain/entities/user.entity';
import { makeUserData } from 'src/test/factories/make-user-data';

describe('FetchUsersUseCase', () => {
  let repo: InMemoryUsersRepository;
  let useCase: FetchUsersUseCase;

  beforeEach(() => {
    repo = new InMemoryUsersRepository();
    useCase = new FetchUsersUseCase(repo);
  });

  it('should return a list of users', async () => {
    const user1 = makeUserData({ name: 'Usuário 1' });
    await repo.create(user1);

    const result = await useCase.execute({ query: { limit: 10, offset: 0 } });

    expect(result.users.length).toBe(1);
    expect(result.users[0]).toBeInstanceOf(User);
    expect(result.users[0].id).toBe(user1.id);
    expect(result.users[0].name).toBe('Usuário 1');
  });

  it('should return an empty list if no users exist', async () => {
    const result = await useCase.execute({ query: { limit: 10, offset: 0 } });
    expect(result.users.length).toBe(0);
  });

  it('should paginate users correctly', async () => {
    const user1 = makeUserData({ name: 'User A' });
    await repo.create(user1);
    const user2 = makeUserData({ name: 'User B' });
    await repo.create(user2);
    const user3 = makeUserData({ name: 'User C' });
    await repo.create(user3);

    const allUsersResult = await useCase.execute({
      query: { limit: 10, offset: 0 },
    });
    expect(allUsersResult.users.length).toBe(3);
    expect(allUsersResult.users.map((u) => u.id)).toEqual([
      user1.id,
      user2.id,
      user3.id,
    ]);

    const paginatedResult = await useCase.execute({
      query: { limit: 2, offset: 0 },
    });
    expect(paginatedResult.users.length).toBe(2);
  });
});
