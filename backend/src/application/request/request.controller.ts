import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { FetchRequestsUseCase } from './use-cases/fetch-requests.use-case';
import { GetRequestUseCase } from './use-cases/get-request.use-case';

import { ApiResponses } from 'src/core/response/response.decorator';
import { getResponseExamples } from 'src/core/response/response.examples';

import { RESPONSE } from 'src/core/response/response.messages';

import { PaginationFilterType } from 'src/core/types/filters.type';

@ApiTags('Requests')
@ApiSecurity('Api-Key')
@Controller('requests')
export class RequestController {
  constructor(
    private readonly fetchRequestsUseCase: FetchRequestsUseCase,
    private readonly getRequestUseCase: GetRequestUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar solicitações de AVCB' })
  @ApiQuery({
    name: 'filter',
    required: false,
    description:
      'Valor para buscar nos campos: CPF, CNPJ, nome da pessoa, nome da empresa ou protocolo',
  })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiResponses(getResponseExamples('fetch-requests'))
  @Get()
  async fetch(@Query() query: PaginationFilterType) {
    const result = await this.fetchRequestsUseCase.execute({ query });

    return {
      message: RESPONSE.REQUESTS.FETCHED_SUCCESSFULLY,
      data: result,
    };
  }

  @ApiOperation({
    summary: 'Obter uma solicitação de AVCB',
  })
  @ApiResponses(getResponseExamples('get-request'))
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const result = await this.getRequestUseCase.execute({ id });

    return {
      message: RESPONSE.REQUESTS.GET_SUCCESS,
      data: result,
    };
  }
}
