import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ProcessEntity } from 'src/domain/entities/process.entity';
import { ProcessesRepository } from 'src/domain/repositories/process.repository';
import { GetRequestDto } from 'src/application/process/dtos/get-request.dto';
import { PROCESSES_REPOSITORY } from 'src/domain/repositories/tokens';

export type GetRequestUseCaseResponse = {
  process: ProcessEntity;
};

@Injectable()
export class GetRequestUseCase {
  constructor(
    @Inject(PROCESSES_REPOSITORY)
    private readonly processesRepository: ProcessesRepository,
  ) {}

  /**
   * Executa a busca por um processo específico pelo seu ID.
   * @param dto Contém o ID do processo a ser buscado.
   * @returns O processo encontrado.
   */
  async execute({ id }: GetRequestDto): Promise<GetRequestUseCaseResponse> {
    const process = await this.processesRepository.findById(id);

    if (!process) {
      throw new NotFoundException(`Request with ID "${id}" not found.`);
    }

    return { process };
  }
}
