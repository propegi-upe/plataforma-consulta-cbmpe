import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'vw_avcb_details',
  schema: 'ovrsgat',
  expression: `
    
    SELECT
        rv.id_req_visto,
        rv.nr_protc_projt,
        rv.ds_titul_estab,
      
        CASE rv.ic_pess WHEN 'PF' THEN rv.nm_pess ELSE rv.nm_razao_socl END AS requerente,
        CASE rv.ic_pess WHEN 'PF' THEN rv.nr_cpf ELSE rv.nr_cnpj END AS cpf_cnpj,
        ae.nr_ativ_econ,
        ae.ds_ativ_econ,
        rv.nr_area_decld,
        ro.ds_risc_ocup,
        aa.ds_cod_auten_avcb,
        rv.ds_obs_ar,
        rv.nr_qtd_botij,
        v.id_usu_sist AS id_vistor,
        hrv.id_usu_sist AS id_chefe_defer,
        s.id_ome_fk,
        rv.ic_termo_compr,
        'validade_placeholder' AS validade -- Placeholder para a coluna calculada
    FROM ovrsgat.tb_req_visto rv
    INNER JOIN ovrsac.tb_protc prv ON rv.id_protc_fk = prv.id_protc
    LEFT JOIN ovrsgat.tb_projt pj ON rv.id_projet_fk = pj.id_projt
    LEFT JOIN ovrsac.tb_protc ppj ON pj.id_protc_fk = ppj.id_protc
    INNER JOIN ovrsgat.tb_ativ_econ ae ON rv.id_ativ_econ_fk = ae.id_ativ_econ
    INNER JOIN ovrsgat.tb_risc_ocup ro ON rv.id_risc_ocup_fk = ro.id_risc_ocup
    INNER JOIN ovrsgat.tb_auten_avcb aa ON rv.id_req_visto = aa.id_req_visto_fk AND aa.id_auten_avcb = (SELECT MAX(saa.id_auten_avcb) FROM ovrsgat.tb_auten_avcb saa WHERE saa.id_req_visto_fk = rv.id_req_visto)
    LEFT JOIN ovrsgat.tb_visto v ON rv.id_req_visto = v.id_req_visto_fk AND v.id_visto = (SELECT MAX(sv.id_visto) FROM ovrsgat.tb_visto sv WHERE sv.id_req_visto_fk = rv.id_req_visto AND sv.ic_sitc_relat = 'P')
    INNER JOIN ovrsgat.tb_hist_req_visto hrv ON rv.id_req_visto = hrv.id_req_visto_fk AND hrv.id_hist_req_visto = (SELECT MAX(shrv.id_hist_req_visto) FROM ovrsgat.tb_hist_req_visto shrv WHERE shrv.id_req_visto_fk = rv.id_req_visto AND shrv.id_sitc_req_fk = 9)
    INNER JOIN ovrsgat.tb_secao s ON hrv.id_secao_fk = s.id_secao
    INNER JOIN ovrsgat.tb_tipo_ocup oc ON (oc.id_tipo_ocup = rv.id_tipo_ocup_fk)
  `,
})
export class TypeormAvcbDocumentView {
  @ViewColumn({ name: 'id_req_visto' })
  idReqVisto?: number;

  @ViewColumn({ name: 'nr_protc_projt' })
  projectProtocolNumber?: string;

  @ViewColumn({ name: 'ds_titul_estab' })
  establishmentTitle?: string;

  @ViewColumn({ name: 'nr_cap_max_pess' })
  maxCapacity?: number;

  @ViewColumn({ name: 'ds_tipo_ocup' })
  occupationType?: string;

  @ViewColumn({ name: 'nr_protc_req_visto' })
  inspectionRequestProtocol?: string;

  @ViewColumn({ name: 'nr_protc_projtj' })
  projectJoinProtocol?: string;

  @ViewColumn({ name: 'requerente' })
  applicantName?: string;

  @ViewColumn({ name: 'cpf_cnpj' })
  applicantCpfCnpj?: string;

  @ViewColumn({ name: 'nr_ativ_econ' })
  economicActivityNumber?: string;

  @ViewColumn({ name: 'ds_ativ_econ' })
  economicActivityDescription?: string;

  @ViewColumn({ name: 'nr_area_decld' })
  declaredArea?: number;

  @ViewColumn({ name: 'ds_risc_ocup' })
  occupationRisk?: string;

  @ViewColumn({ name: 'ds_cod_auten_avcb' })
  avcbAuthCode?: string;

  @ViewColumn({ name: 'ds_obs_ar' })
  arObservation?: string;

  @ViewColumn({ name: 'nr_qtd_botij' })
  gasBottleQuantity?: number;

  @ViewColumn({ name: 'id_vistor' })
  inspectorId?: number;

  @ViewColumn({ name: 'id_chefe_defer' })
  approvalChiefId?: number;

  @ViewColumn({ name: 'id_ome_fk' })
  omeId?: number;

  @ViewColumn({ name: 'ic_termo_compr' })
  commitmentTerm?: string;

  @ViewColumn({ name: 'validade' })
  validity?: string;
}
