import { Module } from '@nestjs/common';
import { InfraestructureModule } from 'src/infrastructure/infraestructure.module';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { EditUserUseCase } from './use-cases/edit-user.use-case';
import { FetchUsersUseCase } from './use-cases/fetch-users.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';

@Module({
  imports: [InfraestructureModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    EditUserUseCase,
    FetchUsersUseCase,
    GetUserUseCase,
  ],
})
export class UserModule {}
