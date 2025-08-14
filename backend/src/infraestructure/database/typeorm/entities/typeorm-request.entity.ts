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
  idProjetFk?: string;

  @Column({ name: 'id_ativ_econ_fk' })
  idAtivEconFk?: string;

  @Column({ name: 'id_sitc_req_fk' })
  idSitcReqFk?: string;

  @Column({ name: 'id_tipo_edifi_fk' })
  idTipoEdifiFk?: string;

  @Column({ name: 'id_tipo_patrm_fk' })
  idTipoPatrmFk?: string;

  @Column({ name: 'id_risc_ocup_fk' })
  idRiscOcupFk?: string;

  @Column({ name: 'id_sub_tipo_ocup_fk' })
  idSubTipoOcupFk?: string;

  @Column({ name: 'id_tipo_ocup_fk' })
  idTipoOcupFk?: string;

  @Column({ name: 'id_usu_fk' })
  idUsuFk?: string;

  @Column({ name: 'ic_pess' })
  icPess?: string;

  @Column({ name: 'ds_titul_estab' })
  dsTitulEstab?: string;

  @Column({ name: 'ic_tipo_ar' })
  icTipoAr?: string;

  @Column({ name: 'dt_ini_valid' })
  dtIniValid?: Date;

  @Column({ name: 'dt_fim_valid' })
  dtFimValid?: Date;

  @Column({ name: 'nr_telef' })
  nrTelef?: string;

  @Column({ name: 'nr_celr' })
  nrCelr?: string;

  @Column({ name: 'ds_email' })
  dsEmail?: string;

  @Column({ name: 'nr_area_patrm' })
  nrAreaPatrm?: string;

  @Column({ name: 'nr_area_decld' })
  nrAreaDecld?: string;

  @Column({ name: 'nr_cap_max_pess' })
  nrCapMaxPess?: string;

  @Column({ name: 'vl_taxa_pgto' })
  vlTaxaPgto?: string;

  @Column({ name: 'nr_pavm' })
  nrPavm?: string;

  @Column({ name: 'nr_alt_edf' })
  nrAltEdf?: string;

  @Column({ name: 'ic_gnv' })
  icGnv?: string;

  @Column({ name: 'ic_sist_fixo' })
  icSistFixo?: string;

  @Column({ name: 'ic_mat_expl' })
  icMatExpl?: string;

  @Column({ name: 'id_motiv_isent_tpei_fk' })
  idMotivIsentTpeiFk?: string;

  @Column({ name: 'ds_obs_ar' })
  dsObsAr?: string;

  @Column({ name: 'ds_obs' })
  dsObs?: string;

  @Column({ name: 'ic_stat' })
  icStat?: string;

  @Column({ name: 'dt_incl' })
  dtIncl?: Date;

  @Column({ name: 'dt_atlz' })
  dtAtlz?: Date;

  @Column({ name: 'id_motiv_isent_tax_fk' })
  idMotivIsentTaxFk?: string;

  @Column({ name: 'ic_condm' })
  icCondm?: string;

  @Column({ name: 'ic_esta_condm' })
  icEstaCondm?: string;

  @Column({ name: 'ds_obs_endr' })
  dsObsEndr?: string;

  @Column({ name: 'id_cidd_x_ome_fk' })
  idCiddXOmeFk?: string;

  @Column({ name: 'ds_refer_endr' })
  dsReferEndr?: string;

  @Column({ name: 'ic_reven_gas' })
  icRevenGas?: string;

  @Column({ name: 'ic_posto_combs' })
  icPostoCombs?: string;

  @Column({ name: 'id_tp_event_temp_fk' })
  idTpEventTempFk?: string;

  @Column({ name: 'ds_tp_event_temp_outro' })
  dsTpEventTempOutro?: string;

  @Column({ name: 'id_ocupc_fk' })
  idOcupcFk?: string;

  @Column({ name: 'dt_emiss_avbc' })
  dtEmissAvbc?: Date;

  @Column({ name: 'ic_sitc_avcb' })
  icSitcAvcb?: string;

  @Column({ name: 'nr_protc_projt' })
  nrProtcProjt?: string;

  @Column({ name: 'nr_qtd_botij' })
  nrQtdBotij?: string;

  @Column({ name: 'ic_event_abert' })
  icEventAbert?: string;

  @Column({ name: 'nr_latd' })
  nrLatd?: string;

  @Column({ name: 'nr_long' })
  nrLong?: string;

  @Column({ name: 'ic_forma' })
  icForma?: string;

  @Column({ name: 'ic_termo_compr' })
  icTermoCompr?: string;

  @Column({ name: 'ds_obs_termo' })
  dsObsTermo?: string;

  @Column({ name: 'dt_valid_termo' })
  dtValidTermo?: Date;

  @Column({ name: 'parecer_avcb' })
  parecerAvcb?: string;

  @Column({ name: 'nr_protc_condm' })
  nrProtcCondm?: string;
}
