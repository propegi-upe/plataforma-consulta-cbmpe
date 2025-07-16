import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RESPONSE } from 'src/core/response/response.messages';
import { EditUserUseCase } from './use-cases/edit-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { FetchUsersUseCase } from './use-cases/fetch-users.use-case';
import { ApiResponses } from 'src/core/response/response.decorator';
import { getResponseExamples } from 'src/core/response/response.examples';
import { ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserDtoMapper } from './mappers/user-dto.mapper';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { PaginationFilterType } from 'src/core/types/filters.type';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiTags('Users')
@ApiSecurity('Api-Key')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly editUserUseCase: EditUserUseCase,
    private readonly fetchUsersUseCase: FetchUsersUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @ApiOperation({
    summary: 'Criar um novo usuário',
  })
  @ApiResponses(getResponseExamples('create-user'))
  @Post()
  async create(@Body() body: CreateUserDto) {
    const request = UserDtoMapper.toCreateUseCaseRequest(body);
    const result = await this.createUserUseCase.execute(request);
    return {
      message: RESPONSE.USERS.CREATED_SUCCESSFULLY,
      data: result,
    };
  }

  @ApiOperation({
    summary: 'Editar um usuário existente',
  })
  @ApiResponses(getResponseExamples('edit-user'))
  @Put(':id')
  async edit(
    @Body() body: UpdateUserDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const request = UserDtoMapper.toUpdateUseCaseRequest(id, body);
    const result = await this.editUserUseCase.execute(request);
    return {
      message: RESPONSE.USERS.UPDATED_SUCCESSFULLY,
      data: result,
    };
  }

  @ApiOperation({
    summary: 'Buscar uma usuário específico',
  })
  @ApiResponses(getResponseExamples('get-user'))
  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.getUserUseCase.execute({ id });

    return {
      message: RESPONSE.USERS.FETCHED_SUCCESSFULLY,
      data: result,
    };
  }

  @ApiOperation({
    summary: 'Buscar todas os usuários',
  })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiResponses(getResponseExamples('fetch-users'))
  @Get()
  async fetch(@Query() query: PaginationFilterType) {
    const result = await this.fetchUsersUseCase.execute({ query });

    return {
      message: RESPONSE.USERS.FETCHED_SUCCESSFULLY,
      data: result,
    };
  }
}
