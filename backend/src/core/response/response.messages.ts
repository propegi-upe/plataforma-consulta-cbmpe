export const RESPONSE = {
  EXAMPLE: (id: string) => ({
    message: `Exemplo de resposta com ID: ${id}`,
  }),
  COMMON: {
    API_KEY_REQUIRED: 'Chave de API é obrigatória',
    INVALID_API_KEY: 'Chave de API inválida',
  },
  ENTERPRISES: {
    FETCHED_SUCCESSFULLY: 'Empreendimentos buscados com sucesso',
    NOT_FOUND: 'Empreendimento não encontrado',
    GET_SUCCESS: 'Empreendimento obtido com sucesso',
    FILTERED_SUCCESSFULLY: 'Empreendimentos filtrados com sucesso',
  },

  REQUESTS: {
    FETCHED_SUCCESSFULLY: 'Solicitações buscadas com sucesso',
    NOT_FOUND: 'Solicitação não encontrada',
    GET_SUCCESS: 'Solicitação obtida com sucesso',
  },
  AVCB_DOCUMENTS: {
    FETCHED_SUCCESSFULLY: 'Documentos AVCB buscados com sucesso',
    NOT_FOUND: 'Documento AVCB não encontrado',
    GET_SUCCESS: 'Documento AVCB obtido com sucesso',
  },
};
