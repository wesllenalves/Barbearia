import produce from 'immer';

import {UserTypes} from './actions';
import { AuthTypes } from '../auth/actions';

const INITIAL_STATE = {
  dados: null,
  token: null,
  erro: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case AuthTypes.LOGIN_SUCESSO: {
        draft.dados = action.payload.usuario;
        break;
      }
      case UserTypes.GET_ALL_USER_INFO_REQUEST: {
        break;
      }
      case UserTypes.GET_ALL_USER_INFO_REQUEST_SUCCESS: {
        draft.id = action.payload.id;
        draft.name = action.payload.dados.name;
        draft.email = action.payload.dados.email;
        draft.avatar = action.payload.dados.avatar;
        break;
      }
      case UserTypes.GET_ALL_USER_INFO_REQUEST_FAILURE: {
        draft.erro = action.payload.dados.erro;
        break;
      }
      default:
        return state;
        break;
    }
  });
}
