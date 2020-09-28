import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
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
import {loginRequest} from '../../store/models/auth/actions';
import  AsyncStorage  from '@react-native-community/async-storage';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [token, setToken] = useState();

  const user = useSelector((state) => state.user);
  const {authenticated} = useSelector((state) => state.auth);
 
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if(value !== null){
        console.log('token:'+value)
        setToken(value);
      }      
    } catch (error) {
      console.log(error)
    }
  };

  
  /* useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token != null) {
        
      } else {
        navigation.navigate('SignIn');
      }
    };
    checkToken();
  }, [user]); */
  
  

  const handleSignClick = () => {
    if (!emailField || !passwordField) {
      alert('preencha todos os campos!');
    } else {
      dispatch(loginRequest((email_cpf = emailField), (senha = passwordField)));
      if(authenticated){
        //setLoginLocal('wesllen');
        getData();
        console.log(token)
      }
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
          <CustomButtonText>LOGIN</CustomButtonText>
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
