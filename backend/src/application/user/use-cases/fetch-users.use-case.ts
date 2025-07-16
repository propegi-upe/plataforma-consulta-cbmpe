import { UsersRepository } from 'src/domain/repositories/users.repository';
import { User } from 'src/domain/entities/user.entity';
import { USERS_REPOSITORY } from 'src/domain/repositories/tokens';
import { Inject } from '@nestjs/common';

export type FetchShipmentsUseCaseRequest = {
  query: { limit?: number; offset?: number };
};

export interface FetchUsersUseCaseResponse {
  users: User[];
}

export class FetchUsersUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    query,
  }: FetchShipmentsUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany(query);
    return { users };
  }
}
