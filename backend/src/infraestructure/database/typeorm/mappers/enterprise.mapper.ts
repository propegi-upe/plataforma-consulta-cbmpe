import { Enterprise } from 'src/domain/entities/enterprise.entity';
import { TypeormEnterpriseEntity } from '../entities/typeorm-enterprise.entity';
import dayjs from 'src/core/config/dayjs.config';

export class EnterpriseMapper {
  static toDomain(entity: TypeormEnterpriseEntity): Enterprise {
    return new Enterprise(
      entity.id,

      entity.cpf,
      entity.personName,
      entity.cnpj,
      entity.corporateName,
      entity.protocolId,

      entity.economicActivityId,
      entity.propertyTypeId,
      entity.buildingTypeId,
      entity.enterpriseSituationId,
      entity.occupationSubTypeId,
      entity.occupationTypeId,
      entity.occupationRiskId,
      entity.userId,
      entity.personIndicator,
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
