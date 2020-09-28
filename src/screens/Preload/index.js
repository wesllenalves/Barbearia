import React, {useEffect} from 'react';
import {Container, LoadingIcon} from './styled';
import BarberLogo from '../../assets/barber.svg';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';

export default () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        //validar token
        alert('existe token')
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
