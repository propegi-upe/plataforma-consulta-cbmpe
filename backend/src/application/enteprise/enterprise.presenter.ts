import { Enterprise } from 'src/domain/entities/enterprise.entity';

export class EnterprisePresenter {
  static toHTTP(enterprise: Enterprise) {
    return {
      id: enterprise.id,

      cpf: enterprise.cpf,
      personName: enterprise.personName,
      cnpj: enterprise.cnpj,
      corporateName: enterprise.corporateName,
      protocolId: enterprise.protocolId,

      economicActivityId: enterprise.economicActivityId,
      propertyTypeId: enterprise.propertyTypeId,
      buildingTypeId: enterprise.buildingTypeId,
      enterpriseSituationId: enterprise.enterpriseSituationId,
      occupationSubTypeId: enterprise.occupationSubTypeId,
      occupationTypeId: enterprise.occupationTypeId,
      occupationRiskId: enterprise.occupationRiskId,
      userId: enterprise.userId,
      personIndicator: enterprise.personIndicator,
      establishmentTitle: enterprise.establishmentTitle,
      arTypeIndicator: enterprise.arTypeIndicator,
      validityStartDate: enterprise.validityStartDate,
      validityEndDate: enterprise.validityEndDate,
      phoneNumber: enterprise.phoneNumber,
      cellPhoneNumber: enterprise.cellPhoneNumber,
      email: enterprise.email,
      propertyArea: enterprise.propertyArea,
      declaredArea: enterprise.declaredArea,
      maxCapacity: enterprise.maxCapacity,
      paymentFee: enterprise.paymentFee,
      floorCount: enterprise.floorCount,
      buildingHeight: enterprise.buildingHeight,
      hasGnv: enterprise.hasGnv,
      hasFixedSystem: enterprise.hasFixedSystem,
      hasExplosiveMaterial: enterprise.hasExplosiveMaterial,
      tpeiExemptionReasonId: enterprise.tpeiExemptionReasonId,
      observations: enterprise.observations,
      statusIndicator: enterprise.statusIndicator,
      inclusionDate: enterprise.inclusionDate,
      updateDate: enterprise.updateDate,
      taxExemptionReasonId: enterprise.taxExemptionReasonId,
      isCondominium: enterprise.isCondominium,
      isCondominiumEstablished: enterprise.isCondominiumEstablished,
      addressObservation: enterprise.addressObservation,
      cityOmeId: enterprise.cityOmeId,
      addressReference: enterprise.addressReference,
      isGasResale: enterprise.isGasResale,
      isGasStation: enterprise.isGasStation,
      temporaryEventTypeId: enterprise.temporaryEventTypeId,
      temporaryEventTypeOther: enterprise.temporaryEventTypeOther,
      occupationId: enterprise.occupationId,
      stampDate: enterprise.stampDate,
      gasBottleQuantity: enterprise.gasBottleQuantity,
      nature: enterprise.nature,
      form: enterprise.form,
    };
  }

  static toHTTPList(enterprises: Enterprise[]) {
    return enterprises.map((enterprise) => this.toHTTP(enterprise));
  }
}
