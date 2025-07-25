import { InMemoryEstablishmentsRepository } from './in-memory-establishments.repository';
import { EstablishmentFactory } from 'src/test/factories/establishment.factory';
import { EstablishmentEntity } from 'src/domain/entities/establishment.entity';

describe('InMemoryEstablishmentsRepository', () => {
  let establishmentsRepository: InMemoryEstablishmentsRepository;
  let establishmentFactory: EstablishmentFactory;

  beforeEach(() => {
    establishmentsRepository = new InMemoryEstablishmentsRepository();
    establishmentFactory = new EstablishmentFactory();
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

      lastInspectionDate: new Date(),
    });
    await establishmentsRepository.create(establishment);

    // Act
    establishment.tradeName = 'Oficina do Zé - 24 Horas';
    await establishmentsRepository.save(establishment);

    // Assert
    const updatedEstablishment = await establishmentsRepository.findById(
      establishment.id,
    );
    expect(updatedEstablishment?.tradeName).toBe('Oficina do Zé - 24 Horas');
  });

  it('should be able to find establishments by userId', async () => {
    // Arrange
    const est1 = establishmentFactory.create({
      userId: 'user-abc',
      tradeName: 'Padaria A',
      corporateName: 'A',
      address: 'A',
      cnpj: 'A',
      responsibleCpf: 'A',
      businessActivity: 'A',

      lastInspectionDate: new Date(),
    });
    const est2 = establishmentFactory.create({
      userId: 'user-def',
      tradeName: 'Loja B',
      corporateName: 'B',
      address: 'B',
      cnpj: 'B',
      responsibleCpf: 'B',
      businessActivity: 'B',

      lastInspectionDate: new Date(),
    });
    const est3 = establishmentFactory.create({
      userId: 'user-abc',
      tradeName: 'Café C',
      corporateName: 'C',
      address: 'C',
      cnpj: 'C',
      responsibleCpf: 'C',
      businessActivity: 'C',

      lastInspectionDate: new Date(),
    });

    await establishmentsRepository.create(est1);
    await establishmentsRepository.create(est2);
    await establishmentsRepository.create(est3);

    // Act
    const foundEstablishments =
      await establishmentsRepository.findByUserId('user-abc');

    // Assert
    expect(foundEstablishments).toHaveLength(2);
    expect(foundEstablishments).toContain(est1);
  });
});
