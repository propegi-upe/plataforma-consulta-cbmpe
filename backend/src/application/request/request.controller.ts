import { Controller, Get, Query } from '@nestjs/common';
import { RESPONSE } from 'src/core/response/response.messages';
import { FetchRequestsUseCase } from './use-cases/fetch-requests.use-case';
import { ApiResponses } from 'src/core/response/response.decorator';
import { getResponseExamples } from 'src/core/response/response.examples';
import { ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PaginationFilterType } from 'src/core/types/filters.type';

@ApiTags('Requests')
@ApiSecurity('Api-Key')
@Controller('requests')
export class RequestController {
  constructor(private readonly fetchRequestsUseCase: FetchRequestsUseCase) {}

  @ApiOperation({ summary: 'Buscar todos os blocos' })
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
    summary:
      'Buscar requisições filtradas por um único campo obrigatório (cpf, cnpj, nome ou protocolo)',
  })
  @ApiResponses(getResponseExamples('find-request-by-search'))
  @Get('filter')
  @ApiQuery({
    name: 'search',
    required: true,
    description: 'CPF, CNPJ, nome ou protocolo',
  })
  async getFiltered(@Query('search') search: string) {
    const result =
      await this.fetchRequestsUseCase.findByNameOrCnpjOrCpf(search);

    return {
      message: RESPONSE.REQUESTS.FETCHED_SUCCESSFULLY,
      data: result,
    };
  }
}
