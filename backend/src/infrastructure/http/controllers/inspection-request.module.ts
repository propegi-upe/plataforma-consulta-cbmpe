import { Module, Injectable, Controller, Get } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeormInspectionRequestEntity } from 'src/infrastructure/database/typeorm/entities/typeorm-inspection.entity';

@Injectable()
export class InspectionRequestRepository {
  constructor(
    @InjectRepository(TypeormInspectionRequestEntity)
    private readonly typeOrmRepository: Repository<TypeormInspectionRequestEntity>,
  ) {}

  async findAll(): Promise<TypeormInspectionRequestEntity[]> {
    return this.typeOrmRepository.find({ take: 10 });
  }
}

@Controller('inspection-requests')
export class InspectionRequestController {
  constructor(private readonly repository: InspectionRequestRepository) {}

  @Get()
  async findAll() {
    console.log('Buscando requisições de vistoria...');
    return this.repository.findAll();
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([TypeormInspectionRequestEntity])],
  controllers: [InspectionRequestController],
  providers: [InspectionRequestRepository],
})
export class InspectionRequestModule {}
