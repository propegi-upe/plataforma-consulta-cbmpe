import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { FetchEnterprisesUseCase } from './use-cases/fetch-enterprises.use-case';
import { GetEnterpriseUseCase } from './use-cases/get-enterprise.use-case';

import { ApiResponses } from 'src/core/response/response.decorator';
import { getResponseExamples } from 'src/core/response/response.examples';

import { RESPONSE } from 'src/core/response/response.messages';

import { PaginationFilterType } from 'src/core/types/filters.type';

@ApiTags('Enterprises')
@ApiSecurity('Api-Key')
@Controller('enterprises')
export class EnterpriseController {
  constructor(
    private readonly fetchEnterprisesUseCase: FetchEnterprisesUseCase,
    private readonly getEnterpriseUseCase: GetEnterpriseUseCase,
  ) {}

  @ApiOperation({
    summary: 'Buscar empreendimentos',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    description:
      'Valor para buscar nos campos: CPF, CNPJ, nome da pessoa, nome da empresa ou protocolo',
  })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiResponses(getResponseExamples('fetch-enterprises'))
  @Get()
  async fetch(@Query() query: PaginationFilterType) {
    const result = await this.fetchEnterprisesUseCase.execute({ query });

    return {
      message: RESPONSE.ENTERPRISES.FETCHED_SUCCESSFULLY,
      data: result,
    };
  }

  @ApiOperation({
    summary: 'Obter um estabelecimento',
  })
  @ApiResponses(getResponseExamples('get-enterprise'))
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const result = await this.getEnterpriseUseCase.execute({ id });

    return {
      message: RESPONSE.ENTERPRISES.GET_SUCCESS,
      data: result,
    };
  }
}
