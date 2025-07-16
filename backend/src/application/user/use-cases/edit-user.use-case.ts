import { Injectable, Inject } from '@nestjs/common';
import { UsersRepository } from 'src/domain/repositories/users.repository';
import { ResourceNotFound } from 'src/domain/errors/ResourceNotFound';
import { USERS_REPOSITORY } from 'src/domain/repositories/tokens';
import { RESPONSE } from 'src/core/response/response.messages';
import { User } from 'src/domain/entities/user.entity';

export interface EditUserUseCaseRequest {
  id: string;
  name?: string;
  email?: string;
  isActive?: boolean;
}

export interface EditUserUseCaseResponse {
  user: User;
}

@Injectable()
export class EditUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
    name,
    email,
    isActive,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const existingUser = await this.usersRepository.findById(id);
    if (!existingUser) {
      throw new ResourceNotFound(RESPONSE.USERS.NOT_FOUND);
    }

    if (name) existingUser.name = name;
    if (email) existingUser.email = email;
    if (isActive) existingUser.isActive = isActive;

    await this.usersRepository.save(existingUser);

    return { user: existingUser };
  }
}
