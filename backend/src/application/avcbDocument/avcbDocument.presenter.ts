import { avcbDocument } from 'src/domain/entities/avcbDocument.entity';

export class avcbDocumentPresenter {
  static toHTTP(avcbDocument: avcbDocument) {
    return {
      idReqVisto: avcbDocument.idReqVisto,
      projectProtocolNumber: avcbDocument.projectProtocolNumber,
      establishmentTitle: avcbDocument.establishmentTitle,
      maxCapacity: avcbDocument.maxCapacity,
      occupationType: avcbDocument.occupationType,
      inspectionRequestProtocol: avcbDocument.inspectionRequestProtocol,
      projectJoinProtocol: avcbDocument.projectJoinProtocol,
      applicantName: avcbDocument.applicantName,
      applicantCpfCnpj: avcbDocument.applicantCpfCnpj,
      economicActivityNumber: avcbDocument.economicActivityNumber,
      economicActivityDescription: avcbDocument.economicActivityDescription,
      declaredArea: avcbDocument.declaredArea,
      occupationRisk: avcbDocument.occupationRisk,
      avcbAuthCode: avcbDocument.avcbAuthCode,
      arObservation: avcbDocument.arObservation,
      gasBottleQuantity: avcbDocument.gasBottleQuantity,
      inspectorId: avcbDocument.inspectorId,
      approvalChiefId: avcbDocument.approvalChiefId,
      omeId: avcbDocument.omeId,
      commitmentTerm: avcbDocument.commitmentTerm,
      validity: avcbDocument.validity,
    };
  }

  static toHTTPList(avcbDocuments: avcbDocument[]) {
    return avcbDocuments.map((doc) => this.toHTTP(doc));
  }
}
