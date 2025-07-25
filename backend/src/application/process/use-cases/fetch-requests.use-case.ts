import { Injectable, Inject } from '@nestjs/common';
import { ProcessEntity } from 'src/domain/entities/process.entity';
import { ProcessesRepository } from 'src/domain/repositories/process.repository';
import { FetchRequestsDto } from '../dtos/fetch-requests.dto';
import { PROCESSES_REPOSITORY } from 'src/domain/repositories/tokens';

export type FetchRequestsUseCaseResponse = {
  processes: ProcessEntity[];
};

@Injectable()
export class FetchRequestsUseCase {
  constructor(
    @Inject(PROCESSES_REPOSITORY)
    private readonly processesRepository: ProcessesRepository,
  ) {}

  async execute({
    userId,
  }: FetchRequestsDto): Promise<FetchRequestsUseCaseResponse> {
    const processes = await this.processesRepository.findByUserId(userId);
    return { processes };
  }
}
