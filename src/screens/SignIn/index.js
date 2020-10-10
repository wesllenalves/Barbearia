import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { ActivityIndicator } from "react-native";
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
import {loginRequest} from '../../store/models/auth/actions';
import  AsyncStorage  from '@react-native-community/async-storage';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [token, setToken] = useState();
  const [carregandor, setCarregandor ] = useState(false);

  const user = useSelector((state) => state.user);
  const {loading, carregando} = useSelector((state) => state.auth);
 
  const teste = true;

  useEffect(() => {
    setCarregandor(loading);
  },[loading])

  console.log(carregandor)
  const handleSignClick = () => {
    if (/* !emailField || !passwordField */ teste === false) {
      alert('preencha todos os campos!');
    } else {
      dispatch(loginRequest((email_cpf = emailField), (senha = passwordField)));
      
    }
  };
  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignUp'}],
    });
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
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

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>
          {
            loading ? <ActivityIndicator size="large" color="#ffff"/> : "LOGIN"
          }           
          </CustomButtonText>
        </CustomButton>
      </InputArea>
      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>
          Ainda não posui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
