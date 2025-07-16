import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserUseCaseRequest } from '../use-cases/create-user.use-case';
import { EditUserUseCaseRequest } from '../use-cases/edit-user.use-case';

export class UserDtoMapper {
  static toCreateUseCaseRequest(dto: CreateUserDto): CreateUserUseCaseRequest {
    return {
      name: dto.name,
      email: dto.email,
      passwordHash: dto.password,
      isActive: dto.isActive,
    };
  }

  static toUpdateUseCaseRequest(
    id: string,
    dto: UpdateUserDto,
  ): EditUserUseCaseRequest {
    const request: Partial<EditUserUseCaseRequest> = { id };

    if (dto.name !== undefined) request.name = dto.name;
    if (dto.email !== undefined) request.email = dto.email;

    if (dto.isActive !== undefined) request.isActive = dto.isActive;

    return request as EditUserUseCaseRequest;
  }
}
