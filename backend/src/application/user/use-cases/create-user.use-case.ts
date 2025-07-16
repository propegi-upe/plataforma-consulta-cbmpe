import { UsersRepository } from 'src/domain/repositories/users.repository';
import { User } from 'src/domain/entities/user.entity';
import { USERS_REPOSITORY } from 'src/domain/repositories/tokens';
import { Inject } from '@nestjs/common';

export interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  passwordHash: string;
  isActive: boolean;
}

export interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    email,
    passwordHash,
    isActive,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = new User(name, email, passwordHash, isActive);
    await this.usersRepository.create(user);
    return { user };
  }
}
