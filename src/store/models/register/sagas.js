import React from 'react';
import { all, call, takeLatest, put } from 'redux-saga/effects';
import { ToastAndroid} from "react-native";
//import { store } from '../../index';
import api, { http } from '../../../services/api';
import ListErrosValidation from '../../../componests/ListErrorsValidation';
//import history from '~/services/history';
//import ListErrosValidation from '~/components/ListErrorsValidation';

import {
  RegisterTypes,
  confirmSucesso,
  cadastroFailure,
  cadastroSucesso,
  finalizarCadastroSucess,
  finalizarCadastroFailure,
} from './actions';
import { loginSucesso } from '../auth/actions';
import { logoutRequest } from '../auth/actions';
//import { addToast } from '~/store/modules/toast/actions';



export function* cadastrar({ payload }) {
  const { email, senha, name } = payload;
  const response = yield call(api, 'post', 'auth/cadastrar', {
    email,
    senha,
    name,
  });

  const { data, status } = response;

  if (status === 200) {
    const { mensagem, dados } = data;
    console.log('cadastrou:'+dados)
    alert('cadastrado com sucesso')     
    
    //yield put(cadastroSucesso(dados));
    
  } else if (status === 422) {
    const { dados } = data;
   // alert(data.erro +'\n'+ JSON.stringify(dados))
    yield put(cadastroFailure());
    ToastAndroid.showWithGravityAndOffset(      
      `${Object.keys(dados).map((item, index) => (
        dados[item]+'\n'
      ))}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50
    );
    
  } else {
    console.log('erro:'+JSON.stringify(response))
    yield put(cadastroFailure());
    
  }
}

/*export function* confirm({ payload }) { 
  const { token } = payload;
  const response = yield call(api, 'get', `auth/confirmar?token=${token}`);

  const { data, status } = response;

  if (status === 200) {
    yield put(confirmSucesso(data.dados.token, data.dados.usuario));
    yield put(
      addToast({
        title: 'Usuário cadastrado com sucesso!',
        content:
          'Agora falta apenas finalizar seu cadastro para usar o sistema!',
        color: 'success',
        time: false,
      })
    );

    history.push('/usuario/perfil');
  } else if (status === 422) {
    const { dados } = data;
    history.push('/');
    yield put(
      addToast({
        title: data.erro,
        content: <ListErrosValidation dados={dados} />,
        color: 'warning',
      })
    );
  } else {
    yield put(
      addToast({
        title: data.erro,
        color: 'danger',
      })
    );
  }
} */

/* export function* finalize({ payload }) {
  const response = yield call(api, 'put', `auth/concluir`, payload);
  const { data, status } = response;
  const { dados } = data;
  if (status === 200) {
    yield put(finalizarCadastroSucess(dados));
    autoRefreshTokenJWT();
    yield put(
      addToast({
        title: 'Sucesso',
        content: 'Sucesso ao finalizar seu cadastro!',
        color: 'success',
      })
    );
  } else if (status === 422) {
    yield put(
      addToast({
        title: data.erro,
        content: <ListErrosValidation dados={dados} />,
        color: 'warning',
      })
    );
    yield put(finalizarCadastroFailure());
  } else {
    yield put(
      addToast({
        title: data.erro,
        color: 'danger',
      })
    );
    yield put(finalizarCadastroFailure());
  }
} */

/* function autoRefreshTokenJWT() {
  const { authenticated } = store.getState().auth;
  if (authenticated) {
        http
          .get('auth/renovar')
          .then(response => {
            store.dispatch(loginSucesso(response.data.token, response.data.usuario, response.data.expira_em));
          })
          .catch(() => {
            console.log('Erro no refresh token')
          });
      } else {
        store.dispatch(
          logoutRequest('Sessão expirada', 'Faça login novamente.')
        );
      }
} */

export default all([
  takeLatest(RegisterTypes.CADASTRO_REQUEST, cadastrar),
  /* takeLatest(RegisterTypes.CONFIRM_REQUEST, confirm),
  takeLatest(RegisterTypes.FINALIZAR_CADASTRO_REQUEST, finalize), */
]);
