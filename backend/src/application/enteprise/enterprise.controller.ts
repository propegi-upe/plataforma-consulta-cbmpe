import { Controller, Param, ParseIntPipe, Get, Query } from '@nestjs/common';
import { RESPONSE } from 'src/core/response/response.messages';
import { FetchEnterprisesUseCase } from './use-cases/fetch-enterprises.use-case';
import { ApiResponses } from 'src/core/response/response.decorator';
import { getResponseExamples } from 'src/core/response/response.examples';
import { ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PaginationFilterType } from 'src/core/types/filters.type';
import { GetEnterpriseUseCase } from './use-cases/get-enterprise.use-case';

@ApiTags('Enterprises')
@ApiSecurity('Api-Key')
@Controller('enterprises')
export class EnterpriseController {
  constructor(
    private readonly fetchEnterprisesUseCase: FetchEnterprisesUseCase,
    private readonly getEnterpriseUseCase: GetEnterpriseUseCase,
  ) {}

  @ApiOperation({
    summary: 'Buscar todos os blocos',
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
    summary:
      'Buscar Estabelecimentos filtrados por um único campo obrigatório (cpf, cnpj, nome, razão social ou protocolo)',
  })
  @ApiResponses(getResponseExamples('get-enterprise'))
  @Get('filter')
  @ApiQuery({
    name: 'search',
    required: true,
    description: 'CPF, CNPJ, nome, razão social ou protocolo',
  })
  async getFiltered(@Query('search') search: string) {
    const result =
      await this.getEnterpriseUseCase.findByNameOrCnpjOrCpf(search);

    return {
      message: RESPONSE.ENTERPRISES.FILTERED_SUCCESSFULLY,
      data: result,
    };
  }

  @ApiOperation({
    summary: 'Buscar um Estabelecimento específico',
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
