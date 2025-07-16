import { User } from 'src/domain/entities/user.entity';
import { TypeormUserEntity } from '../entities/typeorm-user.entity';
import dayjs from 'src/core/config/dayjs.config';

export class UserMapper {
  static toDomain(entity: TypeormUserEntity): User {
    const user = new User(
      entity.name,
      entity.email,
      entity.passwordHash,
      entity.isActive,
    );
    user.id = entity.id;
    user.createdAt = dayjs(entity.createdAt).toDate();
    user.updatedAt = dayjs(entity.updatedAt).toDate();
    return user;
  }

  static toPersistence(user: User): TypeormUserEntity {
    const entity = new TypeormUserEntity();
    entity.id = user.id;
    entity.name = user.name;
    entity.email = user.email;
    entity.passwordHash = user.passwordHash;
    entity.isActive = user.isActive;
    return entity;
  }
}
