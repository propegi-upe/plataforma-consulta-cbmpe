import type { UsersRepository } from 'src/domain/repositories/users.repository';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeormUserEntity } from '../entities/typeorm-user.entity';
import type { User } from 'src/domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeormUserRepository implements UsersRepository {
  private paginationLimit: number;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TypeormUserEntity)
    private readonly repository: Repository<TypeormUserEntity>,
  ) {
    this.paginationLimit =
      this.configService.get<number>('PAGINATION_LIMIT') || 100;
  }

  async create(user: User): Promise<void> {
    const entity = UserMapper.toPersistence(user);
    await this.repository.save(entity);
  }

  async save(user: User): Promise<void> {
    const entity = UserMapper.toPersistence(user);
    await this.repository.save(entity);
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.repository.findOne({
      where: { id },
    });
    return result ? UserMapper.toDomain(result) : null;
  }

  async findMany(query: { limit?: number; offset?: number }): Promise<User[]> {
    const limit = query.limit ?? this.paginationLimit;
    const offset = query.offset ?? 0;

    const result = await this.repository.find({
      take: limit,
      skip: offset,
    });

    return result.map(UserMapper.toDomain);
  }
}
