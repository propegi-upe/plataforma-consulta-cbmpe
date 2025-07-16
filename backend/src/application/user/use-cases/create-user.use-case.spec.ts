import { CreateUserUseCase } from './create-user.use-case';
import { InMemoryUsersRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory-users.repository';
import { User } from 'src/domain/entities/user.entity';
import { makeUserData } from 'src/test/factories/make-user-data';

describe('CreateUserUseCase', () => {
  it('should create a user', async () => {
    const repo = new InMemoryUsersRepository();
    const useCase = new CreateUserUseCase(repo);

    const customEmail = 'teste@exemplo.com';
    const requestData = makeUserData({ email: customEmail });

    const result = await useCase.execute(requestData);

    expect(result.user).toBeInstanceOf(User);
    expect(result.user.name).toBe(requestData.name);
    expect(result.user.email).toBe(customEmail);
    expect(result.user.isActive).toBe(requestData.isActive);

    const stored = await repo.findById(result.user.id);
    expect(stored).not.toBeNull();
    expect(stored?.name).toBe(requestData.name);
    expect(stored?.email).toBe(customEmail);
    expect(stored?.isActive).toBe(requestData.isActive);
    expect(stored?.passwordHash).toBe(requestData.passwordHash);
  });
});
