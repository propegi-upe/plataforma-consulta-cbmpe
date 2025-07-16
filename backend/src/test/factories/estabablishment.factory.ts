import { Injectable } from '@nestjs/common';
import { EstablishmentEntity } from '../entities/establishment.entity';

type CreateEstablishmentProps = Omit<
  EstablishmentEntity,
  'id' | 'createdAt' | 'updatedAt'
>;

@Injectable()
export class EstablishmentFactory {
  create(props: CreateEstablishmentProps): EstablishmentEntity {
    return new EstablishmentEntity(
      props.userId,
      props.tradeName,
      props.corporateName,
      props.address,
      props.cnpj,
      props.responsibleCpf,
      props.businessActivity,
      props.currentStatus,
      props.lastInspectionDate,
    );
  }
}
