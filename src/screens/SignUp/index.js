import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { ActivityIndicator } from "react-native";

import {useDispatch, useSelector} from 'react-redux';
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styled';
import BarberLogo from '../../assets/barber.svg';
import SignInput from '../../componests/SignInput';
import EmailIcon from '../../assets/email.svg';
import LookIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';
import {cadastroRequest} from '../../store/models/register/actions';

export default () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {loading} = useSelector((state) => state.register);

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [nomeField, setNomeField] = useState('');

  const handleSignUpClick = () => {
    if (!emailField || !passwordField || !nomeField) {
      alert('preencha todos os campos!');
    } else {
      dispatch(cadastroRequest((email = emailField), (password = passwordField), (name = nomeField)));
      
    }
  };

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
      <SignInput
          IconSvg={PersonIcon}
          placeholder="Digite seu nome"
          value={nomeField}
          onChangeText={setNomeField}
        />
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu email"
          value={emailField}
          onChangeText={setEmailField}
        />        
        <SignInput
          IconSvg={LookIcon}
          placeholder="Digite sua Senha"
          value={passwordField}
          onChangeText={setPasswordField}
          password={true}
        />

        <CustomButton onPress={handleSignUpClick}>
          <CustomButtonText>
          {
            loading ? <ActivityIndicator size="large" color="#ffff"/> : "CADASTRAR"
          }          
          </CustomButtonText>
        </CustomButton>
      </InputArea>
      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
