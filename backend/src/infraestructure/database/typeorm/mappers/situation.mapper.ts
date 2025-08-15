import { TypeormRequestSituationEntity } from '../entities/typeorm-situation-request.entity';

export class SituationMapper {
  static toDomain(entity: TypeormRequestSituationEntity) {
    return {
      id: entity.id,
      description: entity.description,
      status: entity.status,
    };
  }
}
