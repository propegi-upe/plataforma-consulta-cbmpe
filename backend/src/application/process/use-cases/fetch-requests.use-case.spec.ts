import { InMemoryProcessesRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory-processes.repository';
import { ProcessFactory } from 'src/test/factories/process.factory';
import { FetchRequestsUseCase } from './fetch-requests.use-case';

describe('FetchRequestsUseCase', () => {
  let processesRepository: InMemoryProcessesRepository;
  let processFactory: ProcessFactory;
  let fetchRequestsUseCase: FetchRequestsUseCase;

  beforeEach(() => {
    processesRepository = new InMemoryProcessesRepository();
    processFactory = new ProcessFactory();
    fetchRequestsUseCase = new FetchRequestsUseCase(processesRepository);
  });

  it('should be able to fetch all requests for a specific user', async () => {
    // Arrange
    const targetUserId = 'user-123';
    const otherUserId = 'user-456';

    await processesRepository.create(
      processFactory.create({
        userId: targetUserId,
        establishmentId: 'est-a',
        processType: 'Vistoria',
        processProtocol: 'PROT-001',
        openingDate: new Date(),
        lastUpdateDate: new Date(),
        status: 'Em Análise',
        estimatedReturnDeadline: new Date(),
        requirementDeadlineDate: new Date(),
        waitingTimeCbmpe: 5,
      }),
    );
    await processesRepository.create(
      processFactory.create({
        userId: targetUserId,
        establishmentId: 'est-b',
        processType: 'Análise de Projeto',
        processProtocol: 'PROT-002',
        openingDate: new Date(),
        lastUpdateDate: new Date(),
        status: 'Aguardando Pagamento',
        estimatedReturnDeadline: new Date(),
        requirementDeadlineDate: new Date(),
        waitingTimeCbmpe: 2,
      }),
    );
    await processesRepository.create(
      processFactory.create({
        userId: otherUserId,
        establishmentId: 'est-c',
        processType: 'Vistoria',
        processProtocol: 'PROT-003',
        openingDate: new Date(),
        lastUpdateDate: new Date(),
        status: 'Concluído',
        estimatedReturnDeadline: new Date(),
        requirementDeadlineDate: new Date(),
        waitingTimeCbmpe: 0,
      }),
    );

    // Act
    const result = await fetchRequestsUseCase.execute({ userId: targetUserId });

    // Assert
    expect(result.processes).toHaveLength(2);
    expect(result.processes[0].userId).toBe(targetUserId);
  });

  it('should return an empty array if the user has no requests', async () => {
    // Act
    const result = await fetchRequestsUseCase.execute({
      userId: 'user-with-no-requests',
    });

    // Assert
    expect(result.processes).toHaveLength(0);
  });
});
