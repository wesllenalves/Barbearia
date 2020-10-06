import produce from 'immer';

import { RegisterTypes } from './actions';

const INITIAL_STATE = {
  loading: false,
  confirm: false,
};

export default function register(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case RegisterTypes.CADASTRO_REQUEST: {
        draft.loading = true;
        break;
      }
      case RegisterTypes.CADASTRO_SUCESSO: {
        draft.loading = false;
        break;
      }
      case RegisterTypes.CADASTRO_FAILURE: {
        draft.loading = false;
        break;
      }
      case RegisterTypes.CONFIRM_SUCESSO: {
        draft.loading = false;
        draft.confirm = true;
        break;
      }
      case RegisterTypes.FINALIZAR_CADASTRO_REQUEST: {
        draft.loading = true;
        break;
      }
      case RegisterTypes.FINALIZAR_CADASTRO_SUCCESS: {
        draft.loading = false;
        break;
      }
      case RegisterTypes.FINALIZAR_CADASTRO_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
