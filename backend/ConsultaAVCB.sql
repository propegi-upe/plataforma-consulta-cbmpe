SELECT DISTINCT 
	rv.id_req_visto,
        rv.nr_protc_projt, 
        rv.ds_titul_estab,
        rv.nr_cap_max_pess,
        oc.ds_tipo_ocup,
	prv.nr_protc AS nr_protc_req_visto, 
	ppj.nr_protc AS nr_protc_projtj, 
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
        CASE rv.ic_tipo_ar WHEN 'P' THEN (SELECT 'até ' || TO_CHAR(rv.dt_emiss_avbc + INTERVAL '1 YEAR' * 
        (CASE 
        when rv.ic_esta_condm = 'S' and (select tto.nr_valid_avcb 
from ovrsgat.tb_req_visto req
inner join ovrsac.tb_protc tp on req.nr_protc_condm = tp.nr_protc 
inner join ovrsgat.tb_req_visto trv on tp.id_protc = trv.id_protc_fk 
inner join ovrsgat.tb_tipo_ocup tto on trv.id_tipo_ocup_fk = tto.id_tipo_ocup 
where req.id_req_visto = 277687) < oc.nr_valid_avcb then pg.nr_valid_ar
        WHEN rv.dt_emiss_avbc >= '2020-12-15' AND not exists(select 1 from ovrsgat.tb_blacklist where ovrsgat.tb_blacklist.nr_protc_fk = prv.nr_protc) and rv.id_sub_tipo_ocup_fk != 109 THEN oc.nr_valid_avcb 
        ELSE pg.nr_valid_ar END), 'DD/MM/YYYY') 
        FROM ovrsgat.tb_param_glb pg) 
		ELSE TO_CHAR(rv.dt_ini_valid, 'DD/MM/YYYY') || ' até ' || TO_CHAR(rv.dt_fim_valid, 'DD/MM/YYYY') 
		END AS validade  
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
WHERE rv.id_req_visto = 277687