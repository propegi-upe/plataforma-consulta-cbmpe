export const RESPONSE = {
  EXAMPLE: (id: string) => ({
    message: `Exemplo de resposta com ID: ${id}`,
  }),
  COMMON: {
    API_KEY_REQUIRED: 'Chave de API é obrigatória',
    INVALID_API_KEY: 'Chave de API inválida',
  },
  USERS: {
    NOT_FOUND: 'Usuário não encontrado',
    CREATED_SUCCESSFULLY: 'Usuário criado com sucesso',
    UPDATED_SUCCESSFULLY: 'Usuário atualizado com sucesso',
    FETCHED_SUCCESSFULLY: 'Usuários buscados com sucesso',
  },
};
