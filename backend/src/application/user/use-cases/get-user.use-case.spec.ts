import { GetUserUseCase } from './get-user.use-case';
import { InMemoryUsersRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory-users.repository';
import { User } from 'src/domain/entities/user.entity';
import { makeUserData } from 'src/test/factories/make-user-data';
import { RESPONSE } from 'src/core/response/response.messages';

describe('GetUserUseCase', () => {
  let repo: InMemoryUsersRepository;
  let useCase: GetUserUseCase;

  beforeEach(() => {
    repo = new InMemoryUsersRepository();
    useCase = new GetUserUseCase(repo);
  });

  it('should get a user by id', async () => {
    const createdUser = makeUserData({
      name: 'Test User',
      email: 'test@example.com',
    });
    await repo.create(createdUser);

    const result = await useCase.execute({ id: createdUser.id });

    expect(result.user).toBeInstanceOf(User);
    expect(result.user.id).toBe(createdUser.id);
    expect(result.user.name).toBe(createdUser.name);
    expect(result.user.email).toBe(createdUser.email);
    expect(result.user.isActive).toBe(createdUser.isActive);
    expect(result.user.createdAt).toEqual(createdUser.createdAt);
    expect(result.user.updatedAt).toEqual(createdUser.updatedAt);
  });

  it('should throw an error if user with a non-existing ID is requested', async () => {
    await expect(useCase.execute({ id: 'non-existent-id' })).rejects.toThrow(
      RESPONSE.USERS.NOT_FOUND,
    );
  });
});
