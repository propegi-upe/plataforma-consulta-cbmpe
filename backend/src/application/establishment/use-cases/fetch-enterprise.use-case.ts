import { Injectable, Inject } from '@nestjs/common';
import { EstablishmentEntity } from 'src/domain/entities/establishment.entity';
import { EstablishmentsRepository } from 'src/domain/repositories/establishments.repository';
import { FetchEnterprisesDto } from '../dtos/fetch-enterprise.dto';
import { ESTABLISHMENTS_REPOSITORY } from 'src/domain/repositories/tokens';

export type FetchEnterprisesUseCaseResponse = {
  establishments: EstablishmentEntity[];
};

@Injectable()
export class FetchEnterprisesUseCase {
  constructor(
    @Inject(ESTABLISHMENTS_REPOSITORY)
    private readonly establishmentsRepository: EstablishmentsRepository,
  ) {}

  /**
   * Executa a busca por todos os estabelecimentos.
   * @param dto Pode conter filtros ou opções de paginação no futuro.
   * @returns Uma lista de estabelecimentos.
   */
  async execute(
    dto: FetchEnterprisesDto,
  ): Promise<FetchEnterprisesUseCaseResponse> {
    // 1. Usa o método findAll do repositório que já criamos
    const establishments = await this.establishmentsRepository.findAll();

    // 2. Retorna a lista de estabelecimentos encontrados
    return { establishments };
  }
}
