// Onde: src/infrastructure/database/in-memory/repositories/in-memory-establishments.repository.spec.ts

import { InMemoryEstablishmentsRepository } from './in-memory-establishments.repository';
import { EstablishmentFactory } from '@/core/domain/factories/establishment.factory';
import { EstablishmentEntity } from '@/core/domain/entities/establishment.entity';

describe('InMemoryEstablishmentsRepository', () => {
  let establishmentsRepository: InMemoryEstablishmentsRepository;
  let establishmentFactory: EstablishmentFactory;

  // Roda antes de cada teste para garantir um ambiente limpo
  beforeEach(() => {
    establishmentsRepository = new InMemoryEstablishmentsRepository();
    establishmentFactory = new EstablishmentFactory();
  });

  it('should be able to create a new establishment', async () => {
    // Arrange: Prepara os dados do teste
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
    const establishment = establishmentFactory.create(establishmentProps);

    // Act: Executa a ação a ser testada
    await establishmentsRepository.create(establishment);

    // Assert: Verifica se o resultado é o esperado
    const foundEstablishment = await establishmentsRepository.findById(
      establishment.id,
    );
    expect(foundEstablishment).toEqual(establishment);
  });

  it('should be able to save (update) an existing establishment', async () => {
    // Arrange
    const establishment = establishmentFactory.create({
      userId: 'user-456',
      tradeName: 'Oficina do Zé',
      corporateName: 'José Mecânica ME',
      address: 'Avenida Principal, 456',
      cnpj: '44.555.666/0001-77',
      responsibleCpf: '444.555.666-77',
      businessActivity: 'Serviços Automotivos',
    });
    await establishmentsRepository.create(establishment);

    // Act: Modifica um dado e salva
    establishment.tradeName = 'Oficina do Zé - 24 Horas';
    await establishmentsRepository.save(establishment);

    // Assert
    const updatedEstablishment = await establishmentsRepository.findById(
      establishment.id,
    );
    expect(updatedEstablishment?.tradeName).toBe('Oficina do Zé - 24 Horas');
  });

  it('should return null when an establishment is not found by id', async () => {
    // Act
    const establishment =
      await establishmentsRepository.findById('non-existent-id');

    // Assert
    expect(establishment).toBeNull();
  });

  it('should be able to find establishments by userId', async () => {
    // Arrange: Cria múltiplos estabelecimentos para dois usuários diferentes
    const est1 = establishmentFactory.create({
      userId: 'user-abc',
      tradeName: 'Padaria A',
      corporateName: 'A',
      address: 'A',
      cnpj: 'A',
      responsibleCpf: 'A',
      businessActivity: 'A',
    });
    const est2 = establishmentFactory.create({
      userId: 'user-def',
      tradeName: 'Loja B',
      corporateName: 'B',
      address: 'B',
      cnpj: 'B',
      responsibleCpf: 'B',
      businessActivity: 'B',
    });
    const est3 = establishmentFactory.create({
      userId: 'user-abc',
      tradeName: 'Café C',
      corporateName: 'C',
      address: 'C',
      cnpj: 'C',
      responsibleCpf: 'C',
      businessActivity: 'C',
    });

    await establishmentsRepository.create(est1);
    await establishmentsRepository.create(est2);
    await establishmentsRepository.create(est3);

    // Act: Busca todos os estabelecimentos de um usuário específico
    const foundEstablishments =
      await establishmentsRepository.findByUserId('user-abc');

    // Assert
    expect(foundEstablishments).toHaveLength(2);
    expect(foundEstablishments).toContain(est1);
    expect(foundEstablishments).toContain(est3);
  });
});
