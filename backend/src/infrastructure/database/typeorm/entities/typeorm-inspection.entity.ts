import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tb_req_visto', schema: 'ovrsgat' })
export class TypeormInspectionRequestEntity {
  @PrimaryColumn({ name: 'id_req_visto', type: 'numeric' })
  id: number;

  @Column({ name: 'id_projet_fk', type: 'numeric', nullable: true })
  projectId: number;

  @Column({ name: 'id_ativ_econ_fk', type: 'numeric' })
  economicActivityId: number;

  @Column({ name: 'id_sitc_req_fk', type: 'numeric' })
  requestSituationId: number;

  @Column({ name: 'id_tipo_edifi_fk', type: 'numeric', nullable: true })
  buildingTypeId: number;

  @Column({ name: 'id_tipo_patrm_fk', type: 'numeric', nullable: true })
  propertyTypeId: number;

  @Column({ name: 'id_risc_ocup_fk', type: 'numeric', nullable: true })
  occupationRiskId: number;

  @Column({ name: 'id_sub_tipo_ocup_fk', type: 'numeric' })
  occupationSubTypeId: number;

  @Column({ name: 'id_tipo_ocup_fk', type: 'numeric' })
  occupationTypeId: number;

  @Column({ name: 'id_usu_fk', type: 'numeric' })
  userId: number;

  @Column({ name: 'ic_pess', type: 'varchar', length: 2, nullable: true })
  personIndicator: string;

  @Column({ name: 'nr_cpf', type: 'varchar', length: 20, nullable: true })
  cpf: string;

  @Column({ name: 'nm_pess', type: 'varchar', length: 255, nullable: true })
  personName: string;

  @Column({ name: 'nr_cnpj', type: 'varchar', length: 20, nullable: true })
  cnpj: string;

  @Column({
    name: 'nm_razao_socl',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  corporateName: string;

  @Column({
    name: 'ds_titul_estab',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  establishmentTitle: string;

  @Column({ name: 'ic_tipo_ar', type: 'varchar', length: 1, nullable: true })
  arTypeIndicator: string;

  @Column({ name: 'dt_ini_valid', type: 'timestamp', nullable: true })
  validityStartDate: Date;

  @Column({ name: 'dt_fim_valid', type: 'timestamp', nullable: true })
  validityEndDate: Date;

  @Column({ name: 'nr_telef', type: 'varchar', length: 20, nullable: true })
  phoneNumber: string;

  @Column({ name: 'nr_celr', type: 'varchar', length: 20, nullable: true })
  cellPhoneNumber: string;

  @Column({ name: 'ds_email', type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({
    name: 'nr_area_patrm',
    type: 'numeric',
    precision: 35,
    scale: 2,
    nullable: true,
  })
  propertyArea: number;

  @Column({
    name: 'nr_area_decld',
    type: 'numeric',
    precision: 35,
    scale: 2,
    nullable: true,
  })
  declaredArea: number;

  @Column({ name: 'nr_cap_max_pess', type: 'numeric', nullable: true })
  maxCapacity: number;

  @Column({
    name: 'vl_taxa_pgto',
    type: 'numeric',
    precision: 35,
    scale: 2,
    nullable: true,
  })
  paymentFee: number;

  @Column({ name: 'nr_pavm', type: 'numeric', nullable: true })
  floorCount: number;

  @Column({ name: 'nr_alt_edf', type: 'numeric', nullable: true })
  buildingHeight: number;

  @Column({ name: 'ic_gnv', type: 'varchar', length: 1, nullable: true })
  hasGnv: string;

  @Column({ name: 'ic_sist_fixo', type: 'varchar', length: 1, nullable: true })
  hasFixedSystem: string;

  @Column({ name: 'ic_mat_expl', type: 'varchar', length: 1, nullable: true })
  hasExplosiveMaterial: string;

  @Column({ name: 'id_motiv_isent_tpei_fk', type: 'numeric', nullable: true })
  tpeiExemptionReasonId: number;

  @Column({ name: 'ds_obs_ar', type: 'text', nullable: true })
  arObservation: string;

  @Column({ name: 'ds_obs', type: 'text', nullable: true })
  observation: string;

  @Column({ name: 'ic_stat', type: 'varchar', length: 1, nullable: true })
  statusIndicator: string;

  @Column({ name: 'dt_incl', type: 'timestamp', nullable: true })
  inclusionDate: Date;

  @Column({ name: 'dt_atlz', type: 'timestamp', nullable: true })
  updateDate: Date;

  @Column({ name: 'id_protc_fk', type: 'numeric', nullable: true })
  protocolId: number;

  @Column({ name: 'id_motiv_isent_tax_fk', type: 'numeric', nullable: true })
  taxExemptionReasonId: number;

  @Column({ name: 'ic_condm', type: 'varchar', length: 1, nullable: true })
  isCondominium: string;

  @Column({ name: 'ic_esta_condm', type: 'varchar', length: 1, nullable: true })
  isCondominiumEstablished: string;

  @Column({ name: 'ds_obs_endr', type: 'text', nullable: true })
  addressObservation: string;

  @Column({ name: 'id_cidd_x_ome_fk', type: 'numeric', nullable: true })
  cityOmeId: number;

  @Column({
    name: 'ds_refer_endr',
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  addressReference: string;

  @Column({ name: 'ic_reven_gas', type: 'varchar', length: 1, nullable: true })
  isGasResale: string;

  @Column({
    name: 'ic_posto_combs',
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  isGasStation: string;

  @Column({ name: 'id_tp_event_temp_fk', type: 'numeric', nullable: true })
  temporaryEventTypeId: number;

  @Column({
    name: 'ds_tp_event_temp_outro',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  temporaryEventTypeOther: string;

  @Column({ name: 'id_ocupc_fk', type: 'numeric', nullable: true })
  occupationId: number;

  @Column({ name: 'dt_emiss_avbc', type: 'timestamp', nullable: true })
  avbcEmissionDate: Date;

  @Column({ name: 'ic_sitc_avcb', type: 'varchar', length: 1, nullable: true })
  avcbSituationIndicator: string;

  @Column({
    name: 'nr_protc_projt',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  projectProtocolNumber: string;

  @Column({ name: 'nr_qtd_botij', type: 'numeric', nullable: true })
  gasBottleQuantity: number;

  @Column({
    name: 'ic_event_abert',
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  isOpenEvent: string;

  @Column({ name: 'nr_latd', type: 'varchar', length: 40, nullable: true })
  latitude: string;

  @Column({ name: 'nr_long', type: 'varchar', length: 40, nullable: true })
  longitude: string;

  @Column({ name: 'ic_forma', type: 'varchar', length: 1, nullable: true })
  form: string;

  @Column({
    name: 'ic_termo_compr',
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  commitmentTerm: string;

  @Column({
    name: 'ds_obs_termo',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  termObservation: string;

  @Column({ name: 'dt_valid_termo', type: 'timestamp', nullable: true })
  termValidityDate: Date;

  @Column({ name: 'parecer_avcb', type: 'text', nullable: true })
  avcbOpinion: string;

  @Column({
    name: 'nr_protc_condm',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  condominiumProtocolNumber: string;
}
