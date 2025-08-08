import { avcbDocument } from 'src/domain/entities/avcbDocument.entity';
import { TypeormAvcbDocumentView } from '../entities/typeorm-avcbDocument.entity';
export class AvcbDocumentMapper {
  static toDomain(entity: TypeormAvcbDocumentView): avcbDocument {
    return new avcbDocument(
      entity.idReqVisto,
      entity.projectProtocolNumber,
      entity.establishmentTitle,
      entity.maxCapacity,
      entity.occupationType,
      entity.inspectionRequestProtocol,
      entity.projectJoinProtocol,
      entity.applicantName,
      entity.applicantCpfCnpj,
      entity.economicActivityNumber,
      entity.economicActivityDescription,
      entity.declaredArea,
      entity.occupationRisk,
      entity.avcbAuthCode,
      entity.arObservation,
      entity.gasBottleQuantity,
      entity.inspectorId,
      entity.approvalChiefId,
      entity.omeId,
      entity.commitmentTerm,
      entity.validity,
    );
  }
}
