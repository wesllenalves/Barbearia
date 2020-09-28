/* eslint-disable no-use-before-define */
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  all,
  call,
  takeLatest,
  put,
  delay,
  select,
  fork,
} from 'redux-saga/effects';

import api from '../../../services/api';

import {
  AuthTypes,
  loginSucesso,
  confirmSucessoToken,
  mudarSenhaSucesso,
  desligarLoading,
  logoutRequest,
  tokenSucesso,
} from './actions';

export function* login({payload}) {
  const {email_cpf, senha} = payload;
  const response = yield call(api, 'post', 'auth', {
    email_cpf,
    senha,
  });

  const {data, status} = response;
  switch (status) {
    case 200: // eslint-disable-next-line no-case-declarations
      const {dados} = data;
      const setLoginLocal = async (loginData) => {
        try {
          await AsyncStorage.setItem('token', loginData);
        } catch (err) {
          console.log(err);
        }
      };
      setLoginLocal(dados.access_token);     
      yield put(loginSucesso(dados.access_token, dados.usuario, dados.expires_in));
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

export function* logout({payload}) {
  yield call(api, 'get', 'auth/sair');
  if (payload.title !== 'Logout') {
    yield put();
  }
}

export function* resetarSenha({payload}) {
  const {cpf_email} = payload;
  const response = yield call(api, 'post', 'auth/resetar-senha', {
    cpf_email,
  });

  const {data, status} = response;

  switch (status) {
    case 200:
      yield put();
      break;

    case 422:
      yield put();
      break;

    default:
      yield put();
  }
}

export function* confirmResetarSenha({payload}) {
  const {token} = payload;
  const response = yield call(api, 'get', `auth/resetar-senha?token=${token}`);

  const {data, status} = response;

  if (status === 200) {
    yield put(confirmSucessoToken(data.dados.token, data.dados.usuario));
    yield put();
  } else if (status === 422) {
    const {dados} = data;
    yield put();
  } else {
    yield put();
  }
}

export function* alterarSenha({payload}) {
  const {senha} = payload;
  const response = yield call(api, 'put', 'auth/alterar-senha', {senha});

  const {data, status} = response;

  switch (status) {
    case 200:
      yield put();
      break;
    case 422:
      yield put();
      break;

    default:
      yield put();
  }
  yield put();
}

export default all([
  takeLatest(AuthTypes.LOGIN_REQUEST, login),
  takeLatest(AuthTypes.LOGOUT_REQUEST, logout),
  takeLatest(AuthTypes.CONFIRMA_SENHA_REQUEST, confirmResetarSenha),
  takeLatest(AuthTypes.ALTERAR_SENHA_REQUEST, resetarSenha),
  takeLatest(AuthTypes.CRIAR_SENHA_NOVA_REQUEST, alterarSenha),
]);
