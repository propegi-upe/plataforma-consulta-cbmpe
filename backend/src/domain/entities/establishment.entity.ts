import { Base } from './base.entity';

export class EstablishmentEntity extends Base {
  public userId: string;

  public tradeName: string;
  public corporateName: string;
  public address: string;
  public cnpj: string;
  public responsibleCpf: string;
  public businessActivity: string;
  public currentStatus?: string;
  public lastInspectionDate: Date;

  constructor(
    userId: string,
    tradeName: string,
    corporateName: string,
    address: string,
    cnpj: string,
    responsibleCpf: string,
    businessActivity: string,
    currentStatus?: string,
    lastInspectionDate?: Date,
  ) {
    super();

    this.userId = userId;

    this.tradeName = tradeName;
    this.corporateName = corporateName;
    this.address = address;
    this.cnpj = cnpj;
    this.responsibleCpf = responsibleCpf;
    this.businessActivity = businessActivity;
    this.currentStatus = currentStatus;
    this.lastInspectionDate = lastInspectionDate || new Date();
  }
}
