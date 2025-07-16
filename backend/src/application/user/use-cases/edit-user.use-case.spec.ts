import { EditUserUseCase } from './edit-user.use-case';
import { InMemoryUsersRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory-users.repository';
import { User } from 'src/domain/entities/user.entity';
import { makeUserData } from 'src/test/factories/make-user-data';
import { RESPONSE } from 'src/core/response/response.messages';

describe('EditUserUseCase', () => {
  it('should edit a user', async () => {
    const repo = new InMemoryUsersRepository();
    const useCase = new EditUserUseCase(repo);

    const initialUser = makeUserData({
      name: 'Usuário Original',
      email: 'original@exemplo.com',
    });
    await repo.create(initialUser);

    const newName = 'Usuário Editado';
    const newEmail = 'editado@exemplo.com';

    const result = await useCase.execute({
      id: initialUser.id,
      name: newName,
      email: newEmail,
    });

    expect(result.user).toBeInstanceOf(User);
    expect(result.user.id).toBe(initialUser.id);
    expect(result.user.name).toBe(newName);
    expect(result.user.email).toBe(newEmail);

    const storedUser = await repo.findById(initialUser.id);
    expect(storedUser).not.toBeNull();
    expect(storedUser?.name).toBe(newName);
    expect(storedUser?.email).toBe(newEmail);
    expect(storedUser?.updatedAt).toEqual(result.user.updatedAt);
  });

  it('should not edit a user with a non-existing ID', async () => {
    const repo = new InMemoryUsersRepository();
    const useCase = new EditUserUseCase(repo);
    await expect(
      useCase.execute({ id: 'non-existing-id', name: 'Novo Nome' }),
    ).rejects.toThrow(RESPONSE.USERS.NOT_FOUND);
  });
});
