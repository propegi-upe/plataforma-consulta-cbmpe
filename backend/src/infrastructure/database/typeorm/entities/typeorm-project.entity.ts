import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tb_projt', schema: 'ovrsgat' })
export class TypeormProjectEntity {
  // A chave primária aqui é um número, não um UUID.
  @PrimaryColumn({ name: 'id_projt', type: 'numeric' })
  id: number;

  @Column({ name: 'nr_cnpj' })
  cnpj: string;

  @Column({ name: 'nm_razao_socl' })
  corporateName: string;
}
