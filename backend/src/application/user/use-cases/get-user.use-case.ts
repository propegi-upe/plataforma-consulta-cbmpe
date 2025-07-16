import { UsersRepository } from 'src/domain/repositories/users.repository';
import { User } from 'src/domain/entities/user.entity';
import { ResourceNotFound } from 'src/domain/errors/ResourceNotFound';
import { RESPONSE } from 'src/core/response/response.messages';
import { Inject } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/domain/repositories/tokens';

export interface GetUserUseCaseRequest {
  id: string;
}

export interface GetUserUseCaseResponse {
  user: User;
}

export class GetUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new ResourceNotFound(RESPONSE.USERS.NOT_FOUND);
    }
    return { user };
  }
}
