import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { EstablishmentEntity } from 'src/domain/entities/establishment.entity';
import { EstablishmentsRepository } from 'src/domain/repositories/establishments.repository';
import { GetEnterpriseDto } from '../dtos/get-enterprise.dto';
import { ESTABLISHMENTS_REPOSITORY } from 'src/domain/repositories/tokens';

export type GetEnterpriseUseCaseResponse = {
  establishment: EstablishmentEntity;
};

@Injectable()
export class GetEnterpriseUseCase {
  constructor(
    @Inject(ESTABLISHMENTS_REPOSITORY)
    private readonly establishmentsRepository: EstablishmentsRepository,
  ) {}

  /**
   * Executa a busca por um estabelecimento específico pelo seu ID.
   * @param dto Contém o ID do estabelecimento a ser buscado.
   * @returns O estabelecimento encontrado.
   */
  async execute({
    id,
  }: GetEnterpriseDto): Promise<GetEnterpriseUseCaseResponse> {
    const establishment = await this.establishmentsRepository.findById(id);

    if (!establishment) {
      throw new NotFoundException(`Enterprise with ID "${id}" not found.`);
    }

    return { establishment };
  }
}
