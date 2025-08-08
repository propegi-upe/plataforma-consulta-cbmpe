export class avcbDocument {
  public idReqVisto?: number;
  public projectProtocolNumber?: string;
  public establishmentTitle?: string;
  public maxCapacity?: number;
  public occupationType?: string;
  public inspectionRequestProtocol?: string;
  public projectJoinProtocol?: string;
  public applicantName?: string;
  public applicantCpfCnpj?: string;
  public economicActivityNumber?: string;
  public economicActivityDescription?: string;
  public declaredArea?: number;
  public occupationRisk?: string;
  public avcbAuthCode?: string;
  public arObservation?: string;
  public gasBottleQuantity?: number;
  public inspectorId?: number;
  public approvalChiefId?: number;
  public omeId?: number;
  public commitmentTerm?: string;
  public validity?: string;

  constructor(
    idReqVisto?: number,
    projectProtocolNumber?: string,
    establishmentTitle?: string,
    maxCapacity?: number,
    occupationType?: string,
    inspectionRequestProtocol?: string,
    projectJoinProtocol?: string,
    applicantName?: string,
    applicantCpfCnpj?: string,
    economicActivityNumber?: string,
    economicActivityDescription?: string,
    declaredArea?: number,
    occupationRisk?: string,
    avcbAuthCode?: string,
    arObservation?: string,
    gasBottleQuantity?: number,
    inspectorId?: number,
    approvalChiefId?: number,
    omeId?: number,
    commitmentTerm?: string,
    validity?: string,
  ) {
    this.idReqVisto = idReqVisto;
    this.projectProtocolNumber = projectProtocolNumber;
    this.establishmentTitle = establishmentTitle;
    this.maxCapacity = maxCapacity;
    this.occupationType = occupationType;
    this.inspectionRequestProtocol = inspectionRequestProtocol;
    this.projectJoinProtocol = projectJoinProtocol;
    this.applicantName = applicantName;
    this.applicantCpfCnpj = applicantCpfCnpj;
    this.economicActivityNumber = economicActivityNumber;
    this.economicActivityDescription = economicActivityDescription;
    this.declaredArea = declaredArea;
    this.occupationRisk = occupationRisk;
    this.avcbAuthCode = avcbAuthCode;
    this.arObservation = arObservation;
    this.gasBottleQuantity = gasBottleQuantity;
    this.inspectorId = inspectorId;
    this.approvalChiefId = approvalChiefId;
    this.omeId = omeId;
    this.commitmentTerm = commitmentTerm;
    this.validity = validity;
  }
}
