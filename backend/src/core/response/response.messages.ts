export const RESPONSE = {
  EXAMPLE: (id: string) => ({
    message: `Exemplo de resposta com ID: ${id}`,
  }),
  COMMON: {
    API_KEY_REQUIRED: 'Chave de API é obrigatória',
    INVALID_API_KEY: 'Chave de API inválida',
  },
  PROJECTS: {
    FETCHED_SUCCESSFULLY: 'Projetos buscados com sucesso',
    NOT_FOUND: 'Projeto não encontrado',
    GET_SUCCESS: 'Projeto obtido com sucesso',
  },

  REQUIREMENTS: {
    FETCHED_SUCCESSFULLY: 'Requisitos buscados com sucesso',
    NOT_FOUND: 'Requisito não encontrado',
    GET_SUCCESS: 'Requisito obtido com sucesso',
  },
};
