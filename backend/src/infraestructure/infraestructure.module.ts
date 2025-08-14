import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTERPRISES_REPOSITORY } from 'src/domain/repositories/tokens';
import { AVCB_DOCUMENTS_REPOSITORY } from 'src/domain/repositories/tokens';
import { DatabaseModule } from './database/database.module';
import { TypeormEnterpriseEntity } from './database/typeorm/entities/typeorm-enterprise.entity';
import { TypeormEnterpriseRepository } from './database/typeorm/repositories/typeorm-enterprise.repository';
import { TypeormRequestEntity } from './database/typeorm/entities/typeorm-request.entity';
import { TypeormRequestRepository } from './database/typeorm/repositories/typeorm-request.repository';
import { REQUESTS_REPOSITORY } from 'src/domain/repositories/tokens';
import { TypeormavcbDocumentRepository } from './database/typeorm/repositories/typeorm-avcb-document.repository';
import { TypeormAvcbDocumentView } from './database/typeorm/entities/typeorm-avcbDocument.entity';

const REPOSITORIES = [
  {
    provide: ENTERPRISES_REPOSITORY,
    useClass: TypeormEnterpriseRepository,
  },
  {
    provide: REQUESTS_REPOSITORY,
    useClass: TypeormRequestRepository,
  },
  {
    provide: AVCB_DOCUMENTS_REPOSITORY,
    useClass: TypeormavcbDocumentRepository,
  },
];

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      TypeormEnterpriseEntity,
      TypeormRequestEntity,
      TypeormAvcbDocumentView,
    ]),
  ],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES],
})
export class InfraestructureModule {}
