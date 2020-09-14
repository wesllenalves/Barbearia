import produce from 'immer';

import { UserTypes } from './actions';

const INITIAL_STATE = {
  id: 'id1',
  name: 'Michael',
  email: 'michael@example.com',
  token: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case UserTypes.GET_ALL_USER_INFO_REQUEST: {
        
        break;
      }
      case UserTypes.GET_ALL_USER_INFO_REQUEST_SUCCESS: {
        draft.id = action.payload.id;
        draft.name = action.payload.name;
        draft.email = action.payload.email;
        break;
      }
      case UserTypes.GET_ALL_USER_INFO_REQUEST_FAILURE: {
        draft.token = action.payload.token;
        break;
      }      
      default:
        return state;
        break;
    }
  });
}
