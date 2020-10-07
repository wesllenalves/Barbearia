import produce from 'immer';

import {AuthTypes} from './actions';

const INITIAL_STATE = {
  loading: false,
  carregando: false,
  token: null,
  authenticated: false,  
  expira_em: 60,
  alterar_senha: false,
  
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case AuthTypes.LOGIN_REQUEST: {
        draft.loading = true;
        draft.carregando = true;
      }
      case AuthTypes.LOGIN_SUCESSO: {
        draft.token = action.payload.access_token;
        draft.authenticated = true;
        draft.expira_em = action.payload.expira_em;
        draft.loading = false;
        draft.carregando = false;
        break;
      }
      case AuthTypes.LOGIN_FAILURE: {        
        draft.loading = false;
        draft.carregando = false;
        break;
      }
      case AuthTypes.LOGOUT_REQUEST: {
        draft.token = null;
        draft.authenticated = false;
        break;
      }
      case AuthTypes.ALTERAR_SENHA_REQUEST: {
        draft.loading = true;
        break;
      }
      case AuthTypes.CONFIRMA_SUCESSO_TOKEN_SENHA: {
        draft.token = action.payload.token;
        draft.authenticated = true;
        draft.alterar_senha = true;
        break;
      }
      case AuthTypes.CRIAR_SENHA_NOVA_REQUEST: {
        draft.loading = true;
        break;
      }
      case AuthTypes.CRIAR_SENHA_NOVA_SUCESSO: {
        draft.alterar_senha = false;
        break;
      }
      case AuthTypes.DESATIVAR_LOADING: {
        draft.loading = false;
        break;
      }
      case AuthTypes.TOKEN_SUCESSO: {
        draft.token = action.payload.token;
        draft.authenticated = true;
        break;
      }
      default:
    }
  });
}
