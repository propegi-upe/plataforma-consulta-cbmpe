import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tb_projt', schema: 'ovrsgat' })
export class TypeormEnterpriseEntity {
  @PrimaryColumn({ name: 'id_projt' })
  id: number;

  @Column({ name: 'nr_cpf' })
  cpf?: string;

  @Column({ name: 'nm_pess' })
  personName?: string;

  @Column({ name: 'nr_cnpj' })
  cnpj?: string;

  @Column({ name: 'nm_razao_socl' })
  corporateName?: string;

  @Column({ name: 'id_protc_fk' })
  protocolId?: number;

  @Column({ name: 'id_ativ_econ_fk' })
  economicActivityId?: number;

  @Column({ name: 'id_tipo_patrm_fk' })
  propertyTypeId?: number;

  @Column({ name: 'id_tipo_edifi_fk' })
  buildingTypeId?: number;

  @Column({ name: 'id_sitc_projt_fk' })
  enterpriseSituationId?: number;

  @Column({ name: 'id_sub_tipo_ocup_fk' })
  occupationSubTypeId?: number;

  @Column({ name: 'id_tipo_ocup_fk' })
  occupationTypeId?: number;

  @Column({ name: 'id_risc_ocup_fk' })
  occupationRiskId?: number;

  @Column({ name: 'id_usu_fk' })
  userId?: number;

  @Column({ name: 'ic_pess' })
  personIndicator?: string;

  @Column({ name: 'ds_titul_estab' })
  establishmentTitle?: string;

  @Column({ name: 'ic_tipo_ar' })
  arTypeIndicator?: string;

  @Column({ name: 'dt_ini_valid' })
  validityStartDate?: Date;

  @Column({ name: 'dt_fim_valid' })
  validityEndDate?: Date;

  @Column({ name: 'nr_telef' })
  phoneNumber?: string;

  @Column({ name: 'nr_celr' })
  cellPhoneNumber?: string;

  @Column({ name: 'ds_email' })
  email?: string;

  @Column({ name: 'nr_area_patrm' })
  propertyArea?: number;

  @Column({ name: 'nr_area_decld' })
  declaredArea?: number;

  @Column({ name: 'nr_cap_max_pess' })
  maxCapacity?: number;

  @Column({ name: 'vl_taxa_pgto' })
  paymentFee?: number;

  @Column({ name: 'nr_pavm' })
  floorCount?: number;

  @Column({ name: 'nr_alt_edf' })
  buildingHeight?: number;

  @Column({ name: 'ic_gnv' })
  hasGnv?: string;

  @Column({ name: 'ic_sist_fixo' })
  hasFixedSystem?: string;

  @Column({ name: 'ic_mat_expl' })
  hasExplosiveMaterial?: string;

  @Column({ name: 'id_motiv_isent_tpei_fk' })
  tpeiExemptionReasonId?: number;

  @Column({ name: 'db_obs' })
  observations?: string;

  @Column({ name: 'ic_stat' })
  statusIndicator?: string;

  @Column({ name: 'dt_incl' })
  inclusionDate?: Date;

  @Column({ name: 'dt_atlz' })
  updateDate?: Date;

  @Column({ name: 'id_motiv_isent_tax_fk' })
  taxExemptionReasonId?: number;

  @Column({ name: 'ic_condm' })
  isCondominium?: string;

  @Column({ name: 'ic_esta_condm' })
  isCondominiumEstablished?: string;

  @Column({ name: 'ds_obs_endr' })
  addressObservation?: string;

  @Column({ name: 'id_cidd_x_ome_fk' })
  cityOmeId?: number;

  @Column({ name: 'ds_refer_endr' })
  addressReference?: string;

  @Column({ name: 'ic_reven_gas' })
  isGasResale?: string;

  @Column({ name: 'ic_posto_combs' })
  isGasStation?: string;

  @Column({ name: 'id_tp_event_temp_fk' })
  temporaryEventTypeId?: number;

  @Column({ name: 'ds_tp_event_temp_outro' })
  temporaryEventTypeOther?: string;

  @Column({ name: 'id_ocupc_fk' })
  occupationId?: number;

  @Column({ name: 'dt_carim' })
  stampDate?: Date;

  @Column({ name: 'nr_qtd_botij' })
  gasBottleQuantity?: number;

  @Column({ name: 'ic_natz' })
  nature?: string;

  @Column({ name: 'ic_forma' })
  form?: string;
}
