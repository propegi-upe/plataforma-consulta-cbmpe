import { Controller, Get, Query } from '@nestjs/common';
import { RESPONSE } from 'src/core/response/response.messages';
import { FetchRequirementsUseCase } from './use-cases/fetch-requirements.use-case';
import { ApiResponses } from 'src/core/response/response.decorator';
import { getResponseExamples } from 'src/core/response/response.examples';
import { ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PaginationFilterType } from 'src/core/types/filters.type';

@ApiTags('Requirements')
@ApiSecurity('Api-Key')
@Controller('requirements')
export class RequirementController {
  constructor(
    private readonly fetchRequirementsUseCase: FetchRequirementsUseCase,
  ) {}

  @ApiOperation({
    summary: 'Buscar todos os blocos',
  })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiResponses(getResponseExamples('fetch-requirements'))
  @Get()
  async fetch(@Query() query: PaginationFilterType) {
    const result = await this.fetchRequirementsUseCase.execute({ query });

    return {
      message: RESPONSE.REQUIREMENTS.FETCHED_SUCCESSFULLY,
      data: result,
    };
  }
}
