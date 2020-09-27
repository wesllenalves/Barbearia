export const UserTypes = {
  GET_ALL_USER_INFO_REQUEST: '@user/GET_ALL_USER_INFO_REQUEST',
  GET_ALL_USER_INFO_REQUEST_SUCCESS: '@user/GET_ALL_USER_INFO_REQUEST_SUCCESS',
  GET_ALL_USER_INFO_REQUEST_FAILURE: '@user/GET_ALL_USER_INFO_REQUEST_FAILURE',
};

export function allUser() {
  return {
    type: UserTypes.GET_ALL_USER_INFO_REQUEST,
    payload: {},
  };
}

export function allUserSucesso(dados) {
  return {
    type: UserTypes.GET_ALL_USER_INFO_REQUEST_SUCCESS,
    payload: {dados},
  };
}

export function allUserFailure() {
  return {
    type: UserTypes.GET_ALL_USER_INFO_REQUEST_FAILURE,
    payload: {},
  };
}
