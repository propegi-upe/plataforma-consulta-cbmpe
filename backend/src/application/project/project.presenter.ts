import { Project } from 'src/domain/entities/project.entity';

export class ProjectPresenter {
  static toHTTP(project: Project) {
    return {
      id: project.id,
      economicActivityId: project.economicActivityId,
      propertyTypeId: project.propertyTypeId,
      buildingTypeId: project.buildingTypeId,
      projectSituationId: project.projectSituationId,
      occupationSubTypeId: project.occupationSubTypeId,
      occupationTypeId: project.occupationTypeId,
      occupationRiskId: project.occupationRiskId,
      userId: project.userId,
      personIndicator: project.personIndicator,
      cpf: project.cpf,
      personName: project.personName,
      cnpj: project.cnpj,
      corporateName: project.corporateName,
      establishmentTitle: project.establishmentTitle,
      arTypeIndicator: project.arTypeIndicator,
      validityStartDate: project.validityStartDate,
      validityEndDate: project.validityEndDate,
      phoneNumber: project.phoneNumber,
      cellPhoneNumber: project.cellPhoneNumber,
      email: project.email,
      propertyArea: project.propertyArea,
      declaredArea: project.declaredArea,
      maxCapacity: project.maxCapacity,
      paymentFee: project.paymentFee,
      floorCount: project.floorCount,
      buildingHeight: project.buildingHeight,
      hasGnv: project.hasGnv,
      hasFixedSystem: project.hasFixedSystem,
      hasExplosiveMaterial: project.hasExplosiveMaterial,
      tpeiExemptionReasonId: project.tpeiExemptionReasonId,
      observations: project.observations,
      statusIndicator: project.statusIndicator,
      inclusionDate: project.inclusionDate,
      updateDate: project.updateDate,
      protocolId: project.protocolId,
      taxExemptionReasonId: project.taxExemptionReasonId,
      isCondominium: project.isCondominium,
      isCondominiumEstablished: project.isCondominiumEstablished,
      addressObservation: project.addressObservation,
      cityOmeId: project.cityOmeId,
      addressReference: project.addressReference,
      isGasResale: project.isGasResale,
      isGasStation: project.isGasStation,
      temporaryEventTypeId: project.temporaryEventTypeId,
      temporaryEventTypeOther: project.temporaryEventTypeOther,
      occupationId: project.occupationId,
      stampDate: project.stampDate,
      gasBottleQuantity: project.gasBottleQuantity,
      nature: project.nature,
      form: project.form,
    };
  }

  static toHTTPList(projects: Project[]) {
    return projects.map((project) => this.toHTTP(project));
  }
}
