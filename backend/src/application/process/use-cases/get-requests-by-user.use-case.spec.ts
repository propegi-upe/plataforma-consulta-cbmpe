import { InMemoryProcessesRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory-processes.repository';
import { ProcessFactory } from 'src/test/factories/process.factory';
import { GetRequestUseCase } from './get-requests-by-user.use-case';
import { NotFoundException } from '@nestjs/common';
import { ProcessEntity } from 'src/domain/entities/process.entity';

describe('GetRequestUseCase', () => {
  let processesRepository: InMemoryProcessesRepository;
  let processFactory: ProcessFactory;
  let getRequestUseCase: GetRequestUseCase;

  beforeEach(() => {
    processesRepository = new InMemoryProcessesRepository();
    processFactory = new ProcessFactory();
    getRequestUseCase = new GetRequestUseCase(processesRepository);
  });

  it('should be able to get a request by its id', async () => {
    // Arrange: Cria um processo e o salva no repositório
    const processProps = {
      userId: 'user-123',
      establishmentId: 'est-abc',
      processType: 'Vistoria',
      processProtocol: 'PROT-2025-001',
      openingDate: new Date(),
      lastUpdateDate: new Date(),
      status: 'Em Análise',
      estimatedReturnDeadline: new Date(),
      requirementDeadlineDate: new Date(),
      waitingTimeCbmpe: 10,
    };
    const newProcess = processFactory.create(processProps);
    await processesRepository.create(newProcess);

    // Act: Executa o caso de uso com o ID do processo criado
    const result = await getRequestUseCase.execute({ id: newProcess.id });

    // Assert: Verifica se o processo retornado é o correto
    expect(result.process).toBeInstanceOf(ProcessEntity);
    expect(result.process.id).toBe(newProcess.id);
    expect(result.process.processProtocol).toBe('PROT-2025-001');
  });

  it('should throw a NotFoundException when the request does not exist', async () => {
    await expect(
      getRequestUseCase.execute({ id: 'non-existent-id' }),
    ).rejects.toThrow(NotFoundException);
  });
});
