import React from 'react';
import {
  all,
  call,
  takeLatest,
  put,
  delay,
  fork,
} from 'redux-saga/effects';


import api from '../../../services/api';

import {
   UserTypes,
   allUser,
   allUserSucesso,
 } from './actions';

export function* usuario({  }) {
 
  const response = yield call(api, 'post', '', {});

  const { data, status } = response;

  switch (status) {
    case 200:
      // eslint-disable-next-line no-case-declarations
      const { dados } = data;
      yield put(allUserSucesso(dados));
      yield delay(50);
      break;

    case 401:
      yield put();
      break;

    case 403:
      yield put();
      break;

    default:
      yield put();
  }
}



export default all([
  takeLatest(UserTypes.GET_ALL_USER_INFO_REQUEST, usuario),
]);
