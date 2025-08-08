export const RESPONSE = {
  EXAMPLE: (id: string) => ({
    message: `Exemplo de resposta com ID: ${id}`,
  }),
  COMMON: {
    API_KEY_REQUIRED: 'Chave de API é obrigatória',
    INVALID_API_KEY: 'Chave de API inválida',
  },
  ENTERPRISES: {
    FETCHED_SUCCESSFULLY: 'Projetos buscados com sucesso',
    NOT_FOUND: 'Projeto não encontrado',
    GET_SUCCESS: 'Projeto obtido com sucesso',
    FILTERED_SUCCESSFULLY: 'Projetos filtrados com sucesso',
  },

  REQUESTS: {
    FETCHED_SUCCESSFULLY: 'Requisições buscadas com sucesso',
    NOT_FOUND: 'Requisição não encontrada',
    GET_SUCCESS: 'Requisição obtida com sucesso',
  },
  AVCB_DOCUMENTS: {
    FETCHED_SUCCESSFULLY: 'Documentos AVCB buscados com sucesso',
    NOT_FOUND: 'Documento AVCB não encontrado',
    GET_SUCCESS: 'Documento AVCB obtido com sucesso',
  },
};
