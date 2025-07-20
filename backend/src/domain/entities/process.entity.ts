import { Base } from './base.entity';

export class ProcessEntity extends Base {
  // Chaves estrangeiras para os relacionamentos
  public userId: string;
  public establishmentId: string;

  // Atributos específicos do Processo
  public processType: string;
  public processProtocol: string;
  public openingDate: Date;
  public lastUpdateDate: Date;
  public status: string;
  public estimatedReturnDeadline: Date;
  public requirementDeadlineDate: Date;
  public waitingTimeCbmpe: number;

  constructor(
    userId: string,
    establishmentId: string,
    processType: string,
    processProtocol: string,
    openingDate: Date,
    lastUpdateDate: Date,
    status: string,
    estimatedReturnDeadline: Date,
    requirementDeadlineDate: Date,
    waitingTimeCbmpe: number,
  ) {
    super();
    this.userId = userId;
    this.establishmentId = establishmentId;

    this.processType = processType;
    this.processProtocol = processProtocol;
    this.openingDate = openingDate;
    this.lastUpdateDate = lastUpdateDate;
    this.status = status;
    this.estimatedReturnDeadline = estimatedReturnDeadline;
    this.requirementDeadlineDate = requirementDeadlineDate;
    this.waitingTimeCbmpe = waitingTimeCbmpe;
  }
}
