export class Project {
  public id?: number;
  public economicActivityId?: number;
  public propertyTypeId?: number;
  public buildingTypeId?: number;
  public projectSituationId?: number;
  public occupationSubTypeId?: number;
  public occupationTypeId?: number;
  public occupationRiskId?: number;
  public userId?: number;
  public personIndicator?: string;
  public cpf?: string;
  public personName?: string;
  public cnpj?: string;
  public corporateName?: string;
  public establishmentTitle?: string;
  public arTypeIndicator?: string;
  public validityStartDate?: Date;
  public validityEndDate?: Date;
  public phoneNumber?: string;
  public cellPhoneNumber?: string;
  public email?: string;
  public propertyArea?: number;
  public declaredArea?: number;
  public maxCapacity?: number;
  public paymentFee?: number;
  public floorCount?: number;
  public buildingHeight?: number;
  public hasGnv?: string;
  public hasFixedSystem?: string;
  public hasExplosiveMaterial?: string;
  public tpeiExemptionReasonId?: number;
  public observations?: string;
  public statusIndicator?: string;
  public inclusionDate?: Date;
  public updateDate?: Date;
  public protocolId?: number;
  public taxExemptionReasonId?: number;
  public isCondominium?: string;
  public isCondominiumEstablished?: string;
  public addressObservation?: string;
  public cityOmeId?: number;
  public addressReference?: string;
  public isGasResale?: string;
  public isGasStation?: string;
  public temporaryEventTypeId?: number;
  public temporaryEventTypeOther?: string;
  public occupationId?: number;
  public stampDate?: Date;
  public gasBottleQuantity?: number;
  public nature?: string;
  public form?: string;

  constructor(
    id?: number,
    economicActivityId?: number,
    propertyTypeId?: number,
    buildingTypeId?: number,
    projectSituationId?: number,
    occupationSubTypeId?: number,
    occupationTypeId?: number,
    occupationRiskId?: number,
    userId?: number,
    personIndicator?: string,
    cpf?: string,
    personName?: string,
    cnpj?: string,
    corporateName?: string,
    establishmentTitle?: string,
    arTypeIndicator?: string,
    validityStartDate?: Date,
    validityEndDate?: Date,
    phoneNumber?: string,
    cellPhoneNumber?: string,
    email?: string,
    propertyArea?: number,
    declaredArea?: number,
    maxCapacity?: number,
    paymentFee?: number,
    floorCount?: number,
    buildingHeight?: number,
    hasGnv?: string,
    hasFixedSystem?: string,
    hasExplosiveMaterial?: string,
    tpeiExemptionReasonId?: number,
    observations?: string,
    statusIndicator?: string,
    inclusionDate?: Date,
    updateDate?: Date,
    protocolId?: number,
    taxExemptionReasonId?: number,
    isCondominium?: string,
    isCondominiumEstablished?: string,
    addressObservation?: string,
    cityOmeId?: number,
    addressReference?: string,
    isGasResale?: string,
    isGasStation?: string,
    temporaryEventTypeId?: number,
    temporaryEventTypeOther?: string,
    occupationId?: number,
    stampDate?: Date,
    gasBottleQuantity?: number,
    nature?: string,
    form?: string,
  ) {
    this.id = id;
    this.economicActivityId = economicActivityId;
    this.propertyTypeId = propertyTypeId;
    this.buildingTypeId = buildingTypeId;
    this.projectSituationId = projectSituationId;
    this.occupationSubTypeId = occupationSubTypeId;
    this.occupationTypeId = occupationTypeId;
    this.occupationRiskId = occupationRiskId;
    this.userId = userId;
    this.personIndicator = personIndicator;
    this.cpf = cpf;
    this.personName = personName;
    this.cnpj = cnpj;
    this.corporateName = corporateName;
    this.establishmentTitle = establishmentTitle;
    this.arTypeIndicator = arTypeIndicator;
    this.validityStartDate = validityStartDate;
    this.validityEndDate = validityEndDate;
    this.phoneNumber = phoneNumber;
    this.cellPhoneNumber = cellPhoneNumber;
    this.email = email;
    this.propertyArea = propertyArea;
    this.declaredArea = declaredArea;
    this.maxCapacity = maxCapacity;
    this.paymentFee = paymentFee;
    this.floorCount = floorCount;
    this.buildingHeight = buildingHeight;
    this.hasGnv = hasGnv;
    this.hasFixedSystem = hasFixedSystem;
    this.hasExplosiveMaterial = hasExplosiveMaterial;
    this.tpeiExemptionReasonId = tpeiExemptionReasonId;
    this.observations = observations;
    this.statusIndicator = statusIndicator;
    this.inclusionDate = inclusionDate;
    this.updateDate = updateDate;
    this.protocolId = protocolId;
    this.taxExemptionReasonId = taxExemptionReasonId;
    this.isCondominium = isCondominium;
    this.isCondominiumEstablished = isCondominiumEstablished;
    this.addressObservation = addressObservation;
    this.cityOmeId = cityOmeId;
    this.addressReference = addressReference;
    this.isGasResale = isGasResale;
    this.isGasStation = isGasStation;
    this.temporaryEventTypeId = temporaryEventTypeId;
    this.temporaryEventTypeOther = temporaryEventTypeOther;
    this.occupationId = occupationId;
    this.stampDate = stampDate;
    this.gasBottleQuantity = gasBottleQuantity;
    this.nature = nature;
    this.form = form;
  }
}
