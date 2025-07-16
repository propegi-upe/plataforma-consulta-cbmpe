import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';

type CreateUserProps = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

@Injectable()
export class UserFactory {
  create(props: CreateUserProps): User {
    return new User(
      props.name,
      props.email,
      props.phone,
      props.profileType,
      props.cpfCnpj,
      props.govbrId,
      props.lastAccess,
    );
  }
}
