import React, {useEffect} from 'react';
import {Container, LoadingIcon} from './styled';
import { store } from '../../store/index';
import BarberLogo from '../../assets/barber.svg';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import api, { http } from '../../services/api';
import {tokenRequest} from '../../store/models/auth/actions';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const access_token = useSelector((state) => state.auth);
  useEffect(() => {

    function autoRefreshAlterarSenhaTokenJWT() {
      const { authenticated } = store.getState().auth;
      if (authenticated) {
            
          } else {
            /* store.dispatch(
              logoutRequest('Sessão expirada', 'Faça login novamente.')
            ); */
            
          }
    }

    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {        //validar token
        //dispatch(tokenRequest());
        navigation.navigate('MainTab');
      } else {
        navigation.navigate('SignIn');
      }
    };
    checkToken();
  }, [user]);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadingIcon size="large" color="#FFFFFF" />
    </Container>
  );
};
