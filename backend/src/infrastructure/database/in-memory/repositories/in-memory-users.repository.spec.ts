// Onde: src/infrastructure/database/in-memory/repositories/in-memory-users.repository.spec.ts

import { InMemoryUsersRepository } from './in-memory-users.repository';
import { UserFactory } from 'src/test/factories/users.factory';
import { User } from 'src/domain/entities/user.entity';

describe('InMemoryUsersRepository', () => {
  let usersRepository: InMemoryUsersRepository;
  let userFactory: UserFactory;

  // Roda antes de cada teste para garantir um ambiente limpo
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    userFactory = new UserFactory();
  });

  it('should be able to create a new user', async () => {
    // Arrange: Prepara os dados do teste
    const userProps = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      profileType: 'Admin',
      cpfCnpj: '111.222.333-44',
      govbrId: 'gov-123',
      lastAccess: new Date(),
    };
    const user = userFactory.create(userProps);

    // Act: Executa a ação a ser testada
    await usersRepository.create(user);

    // Assert: Verifica se o resultado é o esperado
    const foundUser = await usersRepository.findById(user.id);
    expect(foundUser).toEqual(user);
  });

  it('should be able to save (update) an existing user', async () => {
    // Arrange
    const user = userFactory.create({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '987654321',
      profileType: 'User',
      cpfCnpj: '444.555.666-77',
      govbrId: 'gov-456',
      lastAccess: new Date(),
    });
    await usersRepository.create(user);

    // Act: Modifica um dado e salva
    user.name = 'Jane Smith';
    await usersRepository.save(user);

    // Assert
    const updatedUser = await usersRepository.findById(user.id);
    expect(updatedUser?.name).toBe('Jane Smith');
  });

  it('should return null when user is not found by id', async () => {
    // Act
    const user = await usersRepository.findById('non-existent-id');

    // Assert
    expect(user).toBeNull();
  });

  it('should be able to find many users with pagination', async () => {
    // Arrange: Cria múltiplos usuários
    for (let i = 1; i <= 15; i++) {
      const user = userFactory.create({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        phone: '123',
        profileType: 'User',
        cpfCnpj: `cpf-${i}`,
        govbrId: `gov-${i}`,
        lastAccess: new Date(),
      });
      await usersRepository.create(user);
    }

    // Act: Busca uma "página" de usuários
    const paginatedUsers = await usersRepository.findMany({
      limit: 5,
      offset: 5,
    });

    // Assert
    expect(paginatedUsers).toHaveLength(5); // Espera que a página tenha 5 usuários
    expect(paginatedUsers[0].name).toBe('User 6'); // O primeiro usuário da página deve ser o 6º
  });
});
