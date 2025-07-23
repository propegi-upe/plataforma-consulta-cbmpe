export type Solicitacao = {
  id: number;
  protocolo: string;
  dataAbertura: string;
  nome: string;
  cnpj: string;
  status: string;
};

export type Avcb = {
  id: number;
  numeroAvcb: string;
  protocolo: string;
  dataEmissao: string;
  nomeFantasia: string;
  razaoSocial: string;
  cpfCnpj: string;
  endereco: string;
  seguimento: string;
  validade: string;
};
