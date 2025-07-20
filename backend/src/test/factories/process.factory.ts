import { Injectable } from '@nestjs/common';
import { ProcessEntity } from 'src/domain/entities/process.entity';

// Cria um tipo auxiliar com todas as propriedades necessárias para criar um Processo,
// omitindo as que são geradas automaticamente (id, createdAt, updatedAt).
type CreateProcessProps = Omit<ProcessEntity, 'id' | 'createdAt' | 'updatedAt'>;

@Injectable()
export class ProcessFactory {
  /**
   * Cria uma nova instância da entidade Processo.
   * @param props As propriedades para o novo processo.
   * @returns Uma instância de ProcessEntity.
   */
  create(props: CreateProcessProps): ProcessEntity {
    return new ProcessEntity(
      props.userId,
      props.establishmentId,
      props.processType,
      props.processProtocol,
      props.openingDate,
      props.lastUpdateDate,
      props.status,
      props.estimatedReturnDeadline,
      props.requirementDeadlineDate,
      props.waitingTimeCbmpe,
    );
  }
}
