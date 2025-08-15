import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { TypeormRequestEntity } from './typeorm-request.entity';

@Entity({ name: 'tb_sitc_req', schema: 'ovrsgat' })
export class TypeormRequestSituationEntity {
  @PrimaryColumn({ name: 'id_sitc_req' })
  id: number;

  @Column({ name: 'ds_sitc_req' })
  description: string;

  @Column({ name: 'ic_stat' })
  status: string;

  @ManyToMany(() => TypeormRequestEntity, (request) => request.situation)
  requests: TypeormRequestEntity[];
}
