import { AccessTokenModel } from '../components/auth/auth.models';

export function obterHeaderAutorizacao(accessToken?: AccessTokenModel) {
  if (!accessToken) throw new Error('O token de acesso não foi fornecido');

  return {
    headers: {
      Authorization: accessToken.chave,
    },
  };
}
