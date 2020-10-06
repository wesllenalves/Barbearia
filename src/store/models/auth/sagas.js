/* eslint-disable no-use-before-define */
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { ToastAndroid} from "react-native";
import * as RootNavigation from '../../../RootNavigation';
import {
  all,
  call,
  takeLatest,
  put,
  delay,
  select,
  fork,
} from 'redux-saga/effects';

import api, { http } from '../../../services/api';

import {
  AuthTypes,
  loginSucesso,
  confirmSucessoToken,
  mudarSenhaSucesso,
  desligarLoading,
  loginFailure,
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
  const {dados} = data;
  switch (status) {
    case 200: // eslint-disable-next-line no-case-declarations
      
      const setLoginLocal = async (loginData) => {
        try {
          await AsyncStorage.setItem('token', loginData);
        } catch (err) {
          console.log(err);
        }
      };
      setLoginLocal(dados.access_token);     
      yield put(loginSucesso(dados.access_token, dados.usuario, dados.expires_in));
      //RootNavigation.navigate('SignIn');      
      break;

    case 401:
      /* ToastAndroid.showWithGravityAndOffset(      
        `${Object.keys(dados).map((item, index) => (
          dados[item]+'\n'
        ))}`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      ); */
      yield put(loginFailure());
      break;

    case 403:
      /* ToastAndroid.showWithGravityAndOffset(      
        `${Object.keys(dados).map((item, index) => (
          dados[item]+'\n'
        ))}`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      ); */
      yield put(loginFailure());
      break;

    default:      
      yield put(loginFailure());
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

export function* tokenRequest({payload}) { 
  const {token} = payload;
  const response = yield call(api, 'get', 'auth/renovar', {});

  const {data, status} = response;
  switch (status) {
    case 200:
      yield put(confirmSucessoToken(data.dados.token, data.dados.usuario));
      RootNavigation.navigate('MainTab');
      break;
    case 401:
      RootNavigation.navigate('SignIn');
      break;

    default:
      yield put();
  }
}

export default all([
  takeLatest(AuthTypes.LOGIN_REQUEST, login),
  takeLatest(AuthTypes.LOGOUT_REQUEST, logout),
  takeLatest(AuthTypes.CONFIRMA_SENHA_REQUEST, confirmResetarSenha),
  takeLatest(AuthTypes.ALTERAR_SENHA_REQUEST, resetarSenha),
  takeLatest(AuthTypes.CRIAR_SENHA_NOVA_REQUEST, alterarSenha),
  takeLatest(AuthTypes.TOKEN_RENOVAR_REQUEST, tokenRequest),
]);
