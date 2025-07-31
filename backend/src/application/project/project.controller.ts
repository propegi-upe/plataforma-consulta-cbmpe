import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { RESPONSE } from 'src/core/response/response.messages';
import { FetchProjectsUseCase } from './use-cases/fetch-projects.use-case';
import { ApiResponses } from 'src/core/response/response.decorator';
import { getResponseExamples } from 'src/core/response/response.examples';
import { ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PaginationFilterType } from 'src/core/types/filters.type';
import { GetProjectUseCase } from './use-cases/get-project.use-case';

@ApiTags('Projects')
@ApiSecurity('Api-Key')
@Controller('projects')
export class ProjectController {
  constructor(
    private readonly fetchProjectsUseCase: FetchProjectsUseCase,
    private readonly getProjectUseCase: GetProjectUseCase,
  ) {}

  @ApiOperation({
    summary: 'Buscar todos os blocos',
  })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiResponses(getResponseExamples('fetch-projects'))
  @Get()
  async fetch(@Query() query: PaginationFilterType) {
    const result = await this.fetchProjectsUseCase.execute({ query });

    return {
      message: RESPONSE.PROJECTS.FETCHED_SUCCESSFULLY,
      data: result,
    };
  }

  @ApiOperation({
    summary: 'Buscar um projeto específico',
  })
  @ApiResponses(getResponseExamples('get-project'))
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const result = await this.getProjectUseCase.execute({ id });

    return {
      message: RESPONSE.PROJECTS.GET_SUCCESS,
      data: result,
    };
  }
}
