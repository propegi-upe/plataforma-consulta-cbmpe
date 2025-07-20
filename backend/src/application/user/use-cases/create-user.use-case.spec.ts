import { InMemoryUsersRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory-users.repository';
import { CreateUserUseCase } from './create-user.use-case';
import { UserFactory } from 'src/test/factories/users.factory';
import { ConflictException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';

describe('CreateUserUseCase', () => {
  let usersRepository: InMemoryUsersRepository;
  let userFactory: UserFactory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    userFactory = new UserFactory();
    createUserUseCase = new CreateUserUseCase(usersRepository, userFactory);
  });

  it('should be able to create a new user', async () => {
    const createUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '11987654321',
      profileType: 'Cidadão',
      cpfCnpj: '111.222.333-44',
      govbrId: 'gov-12345',
    };

    const result = await createUserUseCase.execute(createUserDto);

    expect(result.user).toBeInstanceOf(User);
    expect(result.user.name).toBe('John Doe');
    expect(result.user.email).toBe('john.doe@example.com');

    const storedUser = await usersRepository.findById(result.user.id);
    expect(storedUser).not.toBeNull();
    expect(storedUser?.cpfCnpj).toBe('111.222.333-44');
  });

  it('should not be able to create a user with an already existing email', async () => {
    const existingUser = userFactory.create({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '11987654321',
      profileType: 'Cidadão',
      cpfCnpj: '444.555.666-77',
      govbrId: 'gov-67890',
      lastAccess: new Date(),
    });
    await usersRepository.create(existingUser);

    const createUserDto = {
      name: 'John Smith',
      email: 'jane.doe@example.com',
      phone: '11123456789',
      profileType: 'Requerente',
      cpfCnpj: '777.888.999-00',
      govbrId: 'gov-11223',
    };

    await expect(createUserUseCase.execute(createUserDto)).rejects.toThrow(
      ConflictException,
    );
  });
});
