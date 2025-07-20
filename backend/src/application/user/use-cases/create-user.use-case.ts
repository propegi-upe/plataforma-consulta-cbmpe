import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UsersRepository } from 'src/domain/repositories/users.repository';
import { UserFactory } from 'src/test/factories/users.factory';
import { CreateUserDto } from '../dtos/create-user.dto';
import { USERS_REPOSITORY } from 'src/domain/repositories/tokens';

export type CreateUserUseCaseResponse = {
  user: User;
};

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    private readonly userFactory: UserFactory,
  ) {}

  async execute(dto: CreateUserDto): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(dto.email);
    if (userAlreadyExists) {
      throw new ConflictException('User with this email already exists.');
    }

    const user = this.userFactory.create({
      ...dto,
      lastAccess: new Date(),
    });

    await this.usersRepository.create(user);

    return { user };
  }
}
