export class Requirement {
  public id_req_visto?: string;
  public id_projet_fk?: string;
  public id_ativ_econ_fk?: string;
  public id_sitc_req_fk?: string;
  public id_tipo_edifi_fk?: string;
  public id_tipo_patrm_fk?: string;
  public id_risc_ocup_fk?: string;
  public id_sub_tipo_ocup_fk?: string;
  public id_tipo_ocup_fk?: string;
  public id_usu_fk?: string;
  public ic_pess?: string;
  public nr_cpf?: string;
  public nm_pess?: string;
  public nr_cnpj?: string;
  public nm_razao_socl?: string;
  public ds_titul_estab?: string;
  public ic_tipo_ar?: string;
  public dt_ini_valid?: Date;
  public dt_fim_valid?: Date;
  public nr_telef?: string;
  public nr_celr?: string;
  public ds_email?: string;
  public nr_area_patrm?: string;
  public nr_area_decld?: string;
  public nr_cap_max_pess?: string;
  public vl_taxa_pgto?: string;
  public nr_pavm?: string;
  public nr_alt_edf?: string;
  public ic_gnv?: string;
  public ic_sist_fixo?: string;
  public ic_mat_expl?: string;
  public id_motiv_isent_tpei_fk?: string;
  public ds_obs_ar?: string;
  public ds_obs?: string;
  public ic_stat?: string;
  public dt_incl?: Date;
  public dt_atlz?: Date;
  public id_protc_fk?: string;
  public id_motiv_isent_tax_fk?: string;
  public ic_condm?: string;
  public ic_esta_condm?: string;
  public ds_obs_endr?: string;
  public id_cidd_x_ome_fk?: string;
  public ds_refer_endr?: string;
  public ic_reven_gas?: string;
  public ic_posto_combs?: string;
  public id_tp_event_temp_fk?: string;
  public ds_tp_event_temp_outro?: string;
  public id_ocupc_fk?: string;
  public dt_emiss_avbc?: Date;
  public ic_sitc_avcb?: string;
  public nr_protc_projt?: string;
  public nr_qtd_botij?: string;
  public ic_event_abert?: string;
  public nr_latd?: string;
  public nr_long?: string;
  public ic_forma?: string;
  public ic_termo_compr?: string;
  public ds_obs_termo?: string;
  public dt_valid_termo?: Date;
  public parecer_avcb?: string;
  public nr_protc_condm?: string;

  constructor(
    id_req_visto?: string,
    id_projet_fk?: string,
    id_ativ_econ_fk?: string,
    id_sitc_req_fk?: string,
    id_tipo_edifi_fk?: string,
    id_tipo_patrm_fk?: string,
    id_risc_ocup_fk?: string,
    id_sub_tipo_ocup_fk?: string,
    id_tipo_ocup_fk?: string,
    id_usu_fk?: string,
    ic_pess?: string,
    nr_cpf?: string,
    nm_pess?: string,
    nr_cnpj?: string,
    nm_razao_socl?: string,
    ds_titul_estab?: string,
    ic_tipo_ar?: string,
    dt_ini_valid?: Date,
    dt_fim_valid?: Date,
    nr_telef?: string,
    nr_celr?: string,
    ds_email?: string,
    nr_area_patrm?: string,
    nr_area_decld?: string,
    nr_cap_max_pess?: string,
    vl_taxa_pgto?: string,
    nr_pavm?: string,
    nr_alt_edf?: string,
    ic_gnv?: string,
    ic_sist_fixo?: string,
    ic_mat_expl?: string,
    id_motiv_isent_tpei_fk?: string,
    ds_obs_ar?: string,
    ds_obs?: string,
    ic_stat?: string,
    dt_incl?: Date,
    dt_atlz?: Date,
    id_protc_fk?: string,
    id_motiv_isent_tax_fk?: string,
    ic_condm?: string,
    ic_esta_condm?: string,
    ds_obs_endr?: string,
    id_cidd_x_ome_fk?: string,
    ds_refer_endr?: string,
    ic_reven_gas?: string,
    ic_posto_combs?: string,
    id_tp_event_temp_fk?: string,
    ds_tp_event_temp_outro?: string,
    id_ocupc_fk?: string,
    dt_emiss_avbc?: Date,
    ic_sitc_avcb?: string,
    nr_protc_projt?: string,
    nr_qtd_botij?: string,
    ic_event_abert?: string,
    nr_latd?: string,
    nr_long?: string,
    ic_forma?: string,
    ic_termo_compr?: string,
    ds_obs_termo?: string,
    dt_valid_termo?: Date,
    parecer_avcb?: string,
    nr_protc_condm?: string,
  ) {
    this.id_req_visto = id_req_visto;
    this.id_projet_fk = id_projet_fk;
    this.id_ativ_econ_fk = id_ativ_econ_fk;
    this.id_sitc_req_fk = id_sitc_req_fk;
    this.id_tipo_edifi_fk = id_tipo_edifi_fk;
    this.id_tipo_patrm_fk = id_tipo_patrm_fk;
    this.id_risc_ocup_fk = id_risc_ocup_fk;
    this.id_sub_tipo_ocup_fk = id_sub_tipo_ocup_fk;
    this.id_tipo_ocup_fk = id_tipo_ocup_fk;
    this.id_usu_fk = id_usu_fk;
    this.ic_pess = ic_pess;
    this.nr_cpf = nr_cpf;
    this.nm_pess = nm_pess;
    this.nr_cnpj = nr_cnpj;
    this.nm_razao_socl = nm_razao_socl;
    this.ds_titul_estab = ds_titul_estab;
    this.ic_tipo_ar = ic_tipo_ar;
    this.dt_ini_valid = dt_ini_valid;
    this.dt_fim_valid = dt_fim_valid;
    this.nr_telef = nr_telef;
    this.nr_celr = nr_celr;
    this.ds_email = ds_email;
    this.nr_area_patrm = nr_area_patrm;
    this.nr_area_decld = nr_area_decld;
    this.nr_cap_max_pess = nr_cap_max_pess;
    this.vl_taxa_pgto = vl_taxa_pgto;
    this.nr_pavm = nr_pavm;
    this.nr_alt_edf = nr_alt_edf;
    this.ic_gnv = ic_gnv;
    this.ic_sist_fixo = ic_sist_fixo;
    this.ic_mat_expl = ic_mat_expl;
    this.id_motiv_isent_tpei_fk = id_motiv_isent_tpei_fk;
    this.ds_obs_ar = ds_obs_ar;
    this.ds_obs = ds_obs;
    this.ic_stat = ic_stat;
    this.dt_incl = dt_incl;
    this.dt_atlz = dt_atlz;
    this.id_protc_fk = id_protc_fk;
    this.id_motiv_isent_tax_fk = id_motiv_isent_tax_fk;
    this.ic_condm = ic_condm;
    this.ic_esta_condm = ic_esta_condm;
    this.ds_obs_endr = ds_obs_endr;
    this.id_cidd_x_ome_fk = id_cidd_x_ome_fk;
    this.ds_refer_endr = ds_refer_endr;
    this.ic_reven_gas = ic_reven_gas;
    this.ic_posto_combs = ic_posto_combs;
    this.id_tp_event_temp_fk = id_tp_event_temp_fk;
    this.ds_tp_event_temp_outro = ds_tp_event_temp_outro;
    this.id_ocupc_fk = id_ocupc_fk;
    this.dt_emiss_avbc = dt_emiss_avbc;
    this.ic_sitc_avcb = ic_sitc_avcb;
    this.nr_protc_projt = nr_protc_projt;
    this.nr_qtd_botij = nr_qtd_botij;
    this.ic_event_abert = ic_event_abert;
    this.nr_latd = nr_latd;
    this.nr_long = nr_long;
    this.ic_forma = ic_forma;
    this.ic_termo_compr = ic_termo_compr;
    this.ds_obs_termo = ds_obs_termo;
    this.dt_valid_termo = dt_valid_termo;
    this.parecer_avcb = parecer_avcb;
    this.nr_protc_condm = nr_protc_condm;
  }
}
