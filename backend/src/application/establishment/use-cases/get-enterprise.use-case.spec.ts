import { InMemoryEstablishmentsRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory-establishments.repository';
import { EstablishmentFactory } from 'src/test/factories/establishment.factory';
import { GetEnterpriseUseCase } from './get-enterprise.use-case';
import { NotFoundException } from '@nestjs/common';
import { EstablishmentEntity } from 'src/domain/entities/establishment.entity';

describe('GetEnterpriseUseCase', () => {
  let establishmentsRepository: InMemoryEstablishmentsRepository;
  let establishmentFactory: EstablishmentFactory;
  let getEnterpriseUseCase: GetEnterpriseUseCase;

  beforeEach(() => {
    establishmentsRepository = new InMemoryEstablishmentsRepository();
    establishmentFactory = new EstablishmentFactory();
    getEnterpriseUseCase = new GetEnterpriseUseCase(establishmentsRepository);
  });

  it('should be able to get an enterprise by its id', async () => {
    // .(este teste passa)
    const establishmentProps = {
      userId: 'user-123',
      tradeName: 'Supermercado Preço Bom',
      corporateName: 'Preço Bom Ltda.',
      address: 'Rua das Flores, 123',
      cnpj: '11.222.333/0001-44',
      responsibleCpf: '111.222.333-44',
      businessActivity: 'Varejo',
      lastInspectionDate: new Date(),
    };
    const newEstablishment = establishmentFactory.create(establishmentProps);
    await establishmentsRepository.create(newEstablishment);

    const result = await getEnterpriseUseCase.execute({
      id: newEstablishment.id,
    });

    expect(result.establishment).toBeInstanceOf(EstablishmentEntity);
    expect(result.establishment.id).toBe(newEstablishment.id);
  });

  it('should throw a NotFoundException when the enterprise does not exist', async () => {
    // .(este teste passa)
    await expect(
      getEnterpriseUseCase.execute({ id: 'non-existent-id' }),
    ).rejects.toThrow(NotFoundException);
  });

  // VAI FALHAR * o ideal seria ele skippar = colocar um skip pra passar
  it('should fail intentionally to demonstrate the test runner is working', async () => {
    // Arrange
    const establishmentProps = {
      userId: 'user-123',
      tradeName: 'Padaria do Povo', // Nome real
      corporateName: 'Povo Pães Ltda.',
      address: 'Rua do Pão, 10',
      cnpj: '55.666.777/0001-88',
      responsibleCpf: '555.666.777-88',
      businessActivity: 'Panificação',
      lastInspectionDate: new Date(),
    };
    const newEstablishment = establishmentFactory.create(establishmentProps);
    await establishmentsRepository.create(newEstablishment);

    // Act
    const result = await getEnterpriseUseCase.execute({
      id: newEstablishment.id,
    });

    expect(result.establishment.tradeName).toBe('Padaria do Povo'); // pra ele rodar tem que ser igual o de cima "Padaria do Povo"
  });
});
