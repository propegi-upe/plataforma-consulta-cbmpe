import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'tb_req_visto', schema: 'ovrsgat' })
export class TypeormRequestEntity {
  @PrimaryColumn({ name: 'id_req_visto' })
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

  @Column({ name: 'id_projet_fk' })
  id_projet_fk?: string;

  @Column({ name: 'id_ativ_econ_fk' })
  id_ativ_econ_fk?: string;

  @Column({ name: 'id_sitc_req_fk' })
  id_sitc_req_fk?: string;

  @Column({ name: 'id_tipo_edifi_fk' })
  id_tipo_edifi_fk?: string;

  @Column({ name: 'id_tipo_patrm_fk' })
  id_tipo_patrm_fk?: string;

  @Column({ name: 'id_risc_ocup_fk' })
  id_risc_ocup_fk?: string;

  @Column({ name: 'id_sub_tipo_ocup_fk' })
  id_sub_tipo_ocup_fk?: string;

  @Column({ name: 'id_tipo_ocup_fk' })
  id_tipo_ocup_fk?: string;

  @Column({ name: 'id_usu_fk' })
  id_usu_fk?: string;

  @Column({ name: 'ic_pess' })
  ic_pess?: string;

  @Column({ name: 'ds_titul_estab' })
  ds_titul_estab?: string;

  @Column({ name: 'ic_tipo_ar' })
  ic_tipo_ar?: string;

  @Column({ name: 'dt_ini_valid' })
  dt_ini_valid?: Date;

  @Column({ name: 'dt_fim_valid' })
  dt_fim_valid?: Date;

  @Column({ name: 'nr_telef' })
  nr_telef?: string;

  @Column({ name: 'nr_celr' })
  nr_celr?: string;

  @Column({ name: 'ds_email' })
  ds_email?: string;

  @Column({ name: 'nr_area_patrm' })
  nr_area_patrm?: string;

  @Column({ name: 'nr_area_decld' })
  nr_area_decld?: string;

  @Column({ name: 'nr_cap_max_pess' })
  nr_cap_max_pess?: string;

  @Column({ name: 'vl_taxa_pgto' })
  vl_taxa_pgto?: string;

  @Column({ name: 'nr_pavm' })
  nr_pavm?: string;

  @Column({ name: 'nr_alt_edf' })
  nr_alt_edf?: string;

  @Column({ name: 'ic_gnv' })
  ic_gnv?: string;

  @Column({ name: 'ic_sist_fixo' })
  ic_sist_fixo?: string;

  @Column({ name: 'ic_mat_expl' })
  ic_mat_expl?: string;

  @Column({ name: 'id_motiv_isent_tpei_fk' })
  id_motiv_isent_tpei_fk?: string;

  @Column({ name: 'ds_obs_ar' })
  ds_obs_ar?: string;

  @Column({ name: 'ds_obs' })
  ds_obs?: string;

  @Column({ name: 'ic_stat' })
  ic_stat?: string;

  @Column({ name: 'dt_incl' })
  dt_incl?: Date;

  @Column({ name: 'dt_atlz' })
  dt_atlz?: Date;

  @Column({ name: 'id_motiv_isent_tax_fk' })
  id_motiv_isent_tax_fk?: string;

  @Column({ name: 'ic_condm' })
  ic_condm?: string;

  @Column({ name: 'ic_esta_condm' })
  ic_esta_condm?: string;

  @Column({ name: 'ds_obs_endr' })
  ds_obs_endr?: string;

  @Column({ name: 'id_cidd_x_ome_fk' })
  id_cidd_x_ome_fk?: string;

  @Column({ name: 'ds_refer_endr' })
  ds_refer_endr?: string;

  @Column({ name: 'ic_reven_gas' })
  ic_reven_gas?: string;

  @Column({ name: 'ic_posto_combs' })
  ic_posto_combs?: string;

  @Column({ name: 'id_tp_event_temp_fk' })
  id_tp_event_temp_fk?: string;

  @Column({ name: 'ds_tp_event_temp_outro' })
  ds_tp_event_temp_outro?: string;

  @Column({ name: 'id_ocupc_fk' })
  id_ocupc_fk?: string;

  @Column({ name: 'dt_emiss_avbc' })
  dt_emiss_avbc?: Date;

  @Column({ name: 'ic_sitc_avcb' })
  ic_sitc_avcb?: string;

  @Column({ name: 'nr_protc_projt' })
  nr_protc_projt?: string;

  @Column({ name: 'nr_qtd_botij' })
  nr_qtd_botij?: string;

  @Column({ name: 'ic_event_abert' })
  ic_event_abert?: string;

  @Column({ name: 'nr_latd' })
  nr_latd?: string;

  @Column({ name: 'nr_long' })
  nr_long?: string;

  @Column({ name: 'ic_forma' })
  ic_forma?: string;

  @Column({ name: 'ic_termo_compr' })
  ic_termo_compr?: string;

  @Column({ name: 'ds_obs_termo' })
  ds_obs_termo?: string;

  @Column({ name: 'dt_valid_termo' })
  dt_valid_termo?: Date;

  @Column({ name: 'parecer_avcb' })
  parecer_avcb?: string;

  @Column({ name: 'nr_protc_condm' })
  nr_protc_condm?: string;
}
