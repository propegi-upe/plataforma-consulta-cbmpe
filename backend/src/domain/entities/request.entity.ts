export class Request {
  public id: number;

  public cpf?: string;
  public personName?: string;
  public cnpj?: string;
  public corporateName?: string;
  public protocolId?: number;

  public idProjetFk?: string;
  public idAtivEconFk?: string;
  public idSitcReqFk?: string;
  public idTipoEdifiFk?: string;
  public idTipoPatrmFk?: string;
  public idRiscOcupFk?: string;
  public idSubTipoOcupFk?: string;
  public idTipoOcupFk?: string;
  public idUsuFk?: string;
  public icPess?: string;

  public dsTitulEstab?: string;
  public icTipoAr?: string;
  public dtIniValid?: Date;
  public dtFimValid?: Date;
  public nrTelef?: string;
  public nrCelr?: string;
  public dsEmail?: string;
  public nrAreaPatrm?: string;
  public nrAreaDecld?: string;
  public nrCapMaxPess?: string;
  public vlTaxaPgto?: string;
  public nrPavm?: string;
  public nrAltEdf?: string;
  public icGnv?: string;
  public icSistFixo?: string;
  public icMatExpl?: string;
  public idMotivIsentTpeiFk?: string;
  public dsObsAr?: string;
  public dsObs?: string;
  public icStat?: string;
  public dtIncl?: Date;
  public dtAtlz?: Date;
  public idMotivIsentTaxFk?: string;
  public icCondm?: string;
  public icEstaCondm?: string;
  public dsObsEndr?: string;
  public idCiddXOmeFk?: string;
  public dsReferEndr?: string;
  public icRevenGas?: string;
  public icPostoCombs?: string;
  public idTpEventTempFk?: string;
  public dsTpEventTempOutro?: string;
  public idOcupcFk?: string;
  public dtEmissAvbc?: Date;
  public icSitcAvcb?: string;
  public nrProtcProjt?: string;
  public nrQtdBotij?: string;
  public icEventAbert?: string;
  public nrLatd?: string;
  public nrLong?: string;
  public icForma?: string;
  public icTermoCompr?: string;
  public dsObsTermo?: string;
  public dtValidTermo?: Date;
  public parecerAvcb?: string;
  public nrProtcCondm?: string;

  constructor(
    id: number,

    cpf?: string,
    personName?: string,
    cnpj?: string,
    corporateName?: string,
    protocolId?: number,

    idProjetFk?: string,
    idAtivEconFk?: string,
    idSitcReqFk?: string,
    idTipoEdifiFk?: string,
    idTipoPatrmFk?: string,
    idRiscOcupFk?: string,
    idSubTipoOcupFk?: string,
    idTipoOcupFk?: string,
    idUsuFk?: string,
    icPess?: string,
    dsTitulEstab?: string,
    icTipoAr?: string,
    dtIniValid?: Date,
    dtFimValid?: Date,
    nrTelef?: string,
    nrCelr?: string,
    dsEmail?: string,
    nrAreaPatrm?: string,
    nrAreaDecld?: string,
    nrCapMaxPess?: string,
    vlTaxaPgto?: string,
    nrPavm?: string,
    nrAltEdf?: string,
    icGnv?: string,
    icSistFixo?: string,
    icMatExpl?: string,
    idMotivIsentTpeiFk?: string,
    dsObsAr?: string,
    dsObs?: string,
    icStat?: string,
    dtIncl?: Date,
    dtAtlz?: Date,
    idMotivIsentTaxFk?: string,
    icCondm?: string,
    icEstaCondm?: string,
    dsObsEndr?: string,
    idCiddXOmeFk?: string,
    dsReferEndr?: string,
    icRevenGas?: string,
    icPostoCombs?: string,
    idTpEventTempFk?: string,
    dsTpEventTempOutro?: string,
    idOcupcFk?: string,
    dtEmissAvbc?: Date,
    icSitcAvcb?: string,
    nrProtcProjt?: string,
    nrQtdBotij?: string,
    icEventAbert?: string,
    nrLatd?: string,
    nrLong?: string,
    icForma?: string,
    icTermoCompr?: string,
    dsObsTermo?: string,
    dtValidTermo?: Date,
    parecerAvcb?: string,
    nrProtcCondm?: string,
  ) {
    this.id = id;

    this.cpf = cpf;
    this.personName = personName;
    this.cnpj = cnpj;
    this.corporateName = corporateName;
    this.protocolId = protocolId;

    this.idProjetFk = idProjetFk;
    this.idAtivEconFk = idAtivEconFk;
    this.idSitcReqFk = idSitcReqFk;
    this.idTipoEdifiFk = idTipoEdifiFk;
    this.idTipoPatrmFk = idTipoPatrmFk;
    this.idRiscOcupFk = idRiscOcupFk;
    this.idSubTipoOcupFk = idSubTipoOcupFk;
    this.idTipoOcupFk = idTipoOcupFk;
    this.idUsuFk = idUsuFk;
    this.icPess = icPess;
    this.dsTitulEstab = dsTitulEstab;
    this.icTipoAr = icTipoAr;
    this.dtIniValid = dtIniValid;
    this.dtFimValid = dtFimValid;
    this.nrTelef = nrTelef;
    this.nrCelr = nrCelr;
    this.dsEmail = dsEmail;
    this.nrAreaPatrm = nrAreaPatrm;
    this.nrAreaDecld = nrAreaDecld;
    this.nrCapMaxPess = nrCapMaxPess;
    this.vlTaxaPgto = vlTaxaPgto;
    this.nrPavm = nrPavm;
    this.nrAltEdf = nrAltEdf;
    this.icGnv = icGnv;
    this.icSistFixo = icSistFixo;
    this.icMatExpl = icMatExpl;
    this.idMotivIsentTpeiFk = idMotivIsentTpeiFk;
    this.dsObsAr = dsObsAr;
    this.dsObs = dsObs;
    this.icStat = icStat;
    this.dtIncl = dtIncl;
    this.dtAtlz = dtAtlz;
    this.idMotivIsentTaxFk = idMotivIsentTaxFk;
    this.icCondm = icCondm;
    this.icEstaCondm = icEstaCondm;
    this.dsObsEndr = dsObsEndr;
    this.idCiddXOmeFk = idCiddXOmeFk;
    this.dsReferEndr = dsReferEndr;
    this.icRevenGas = icRevenGas;
    this.icPostoCombs = icPostoCombs;
    this.idTpEventTempFk = idTpEventTempFk;
    this.dsTpEventTempOutro = dsTpEventTempOutro;
    this.idOcupcFk = idOcupcFk;
    this.dtEmissAvbc = dtEmissAvbc;
    this.icSitcAvcb = icSitcAvcb;
    this.nrProtcProjt = nrProtcProjt;
    this.nrQtdBotij = nrQtdBotij;
    this.icEventAbert = icEventAbert;
    this.nrLatd = nrLatd;
    this.nrLong = nrLong;
    this.icForma = icForma;
    this.icTermoCompr = icTermoCompr;
    this.dsObsTermo = dsObsTermo;
    this.dtValidTermo = dtValidTermo;
    this.parecerAvcb = parecerAvcb;
    this.nrProtcCondm = nrProtcCondm;
  }
}
