import { Project } from 'src/domain/entities/project.entity';
import { TypeormProjectEntity } from '../entities/typeorm-project.entity';
import dayjs from 'src/core/config/dayjs.config';

export class ProjectMapper {
  static toDomain(entity: TypeormProjectEntity): Project {
    return new Project(
      entity.id,
      entity.economicActivityId,
      entity.propertyTypeId,
      entity.buildingTypeId,
      entity.projectSituationId,
      entity.occupationSubTypeId,
      entity.occupationTypeId,
      entity.occupationRiskId,
      entity.userId,
      entity.personIndicator,
      entity.cpf,
      entity.personName,
      entity.cnpj,
      entity.corporateName,
      entity.establishmentTitle,
      entity.arTypeIndicator,
      entity.validityStartDate
        ? dayjs(entity.validityStartDate).toDate()
        : undefined,
      entity.validityEndDate
        ? dayjs(entity.validityEndDate).toDate()
        : undefined,
      entity.phoneNumber,
      entity.cellPhoneNumber,
      entity.email,
      entity.propertyArea,
      entity.declaredArea,
      entity.maxCapacity,
      entity.paymentFee,
      entity.floorCount,
      entity.buildingHeight,
      entity.hasGnv,
      entity.hasFixedSystem,
      entity.hasExplosiveMaterial,
      entity.tpeiExemptionReasonId,
      entity.observations,
      entity.statusIndicator,
      entity.inclusionDate ? dayjs(entity.inclusionDate).toDate() : undefined,
      entity.updateDate ? dayjs(entity.updateDate).toDate() : undefined,
      entity.protocolId,
      entity.taxExemptionReasonId,
      entity.isCondominium,
      entity.isCondominiumEstablished,
      entity.addressObservation,
      entity.cityOmeId,
      entity.addressReference,
      entity.isGasResale,
      entity.isGasStation,
      entity.temporaryEventTypeId,
      entity.temporaryEventTypeOther,
      entity.occupationId,
      entity.stampDate ? dayjs(entity.stampDate).toDate() : undefined,
      entity.gasBottleQuantity,
      entity.nature,
      entity.form,
    );
  }
}
