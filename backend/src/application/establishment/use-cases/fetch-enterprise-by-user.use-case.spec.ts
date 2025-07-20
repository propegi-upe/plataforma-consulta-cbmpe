import { InMemoryEstablishmentsRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory-establishments.repository';
import { EstablishmentFactory } from 'src/test/factories/establishment.factory';
import { FetchEnterprisesUseCase } from './fetch-enterprise-by-user.use-case';
import { EstablishmentEntity } from 'src/domain/entities/establishment.entity';

describe('FetchEnterpriseByUserUseCase', () => {
  let establishmentsRepository: InMemoryEstablishmentsRepository;
  let establishmentFactory: EstablishmentFactory;
  let fetchEnterpriseByUserUseCase: FetchEnterprisesUseCase;

  beforeEach(() => {
    establishmentsRepository = new InMemoryEstablishmentsRepository();
    establishmentFactory = new EstablishmentFactory();
    fetchEnterpriseByUserUseCase = new FetchEnterprisesUseCase(
      establishmentsRepository,
    );
  });

  it('should be able to fetch a list of enterprises', async () => {
    // Arrange: Cria dois estabelecimentos e salva-os no repositório
    await establishmentsRepository.create(
      establishmentFactory.create({
        userId: 'user-123',
        tradeName: 'Supermercado Preço Bom',
        corporateName: 'Preço Bom Ltda.',
        address: 'Rua das Flores, 123',
        cnpj: '11.222.333/0001-44',
        responsibleCpf: '111.222.333-44',
        businessActivity: 'Varejo',
        lastInspectionDate: new Date(),
      }),
    );
    await establishmentsRepository.create(
      establishmentFactory.create({
        userId: 'user-456',
        tradeName: 'Oficina do Zé',
        corporateName: 'José Mecânica ME',
        address: 'Avenida Principal, 456',
        cnpj: '44.555.666/0001-77',
        responsibleCpf: '444.555.666-77',
        businessActivity: 'Serviços Automotivos',

        lastInspectionDate: new Date(),
      }),
    );

    // Act: Executa o caso de uso
    const result = await fetchEnterpriseByUserUseCase.execute({});

    // Assert: Verifica se a lista retornada contém os dois estabelecimentos
    expect(result.establishments).toHaveLength(2);
    expect(result.establishments[0]).toBeInstanceOf(EstablishmentEntity);
    expect(result.establishments[0].tradeName).toBe('Supermercado Preço Bom');
    expect(result.establishments[1].tradeName).toBe('Oficina do Zé');
  });

  it('should return an empty array when there are no enterprises', async () => {
    // Arrange: O repositório está vazio

    // Act
    const result = await fetchEnterpriseByUserUseCase.execute({});

    // Assert
    expect(result.establishments).toHaveLength(0);
  });
});
