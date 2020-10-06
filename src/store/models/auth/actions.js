export const AuthTypes = {
  LOGIN_REQUEST: '@auth/LOGIN_REQUEST',
  LOGIN_SUCESSO: '@auth/LOGIN_SUCESSO',
  LOGIN_FAILURE: '@auth/LOGIN_FAILURE',
  LOGOUT_REQUEST: '@auth/LOGOUT_REQUEST',
  ALTERAR_SENHA_REQUEST: '@auth/ALTERAR_SENHA_REQUEST',
  CONFIRMA_SENHA_REQUEST: '@auth/CONFIRMA_SENHA_REQUEST',
  CONFIRMA_SUCESSO_TOKEN_SENHA: '@auth/CONFIRMA_SUCESSO_TOKEN_SENHA',
  CRIAR_SENHA_NOVA_REQUEST: '@auth/CRIAR_SENHA_NOVA_REQUEST',
  CRIAR_SENHA_NOVA_SUCESSO: '@auth/CRIAR_SENHA_NOVA_SUCESSO',
  DESATIVAR_LOADING: '@auth/DESATIVAR_LOADING',
  TOKEN_RENOVAR_REQUEST: '@auth/TOKEN_RENOVAR_REQUEST',
  TOKEN_SUCESSO: '@auth/TOKEN_SUCESSO',
};

export function loginRequest(email_cpf, senha) {
  return {
    type: AuthTypes.LOGIN_REQUEST,
    payload: { email_cpf, senha },
  };
}

export function loginFailure() {
  return {
    type: AuthTypes.LOGIN_FAILURE,
    payload: {  },
  };
}

export function loginSucesso(access_token, usuario, expira_em) {
  return {
    type: AuthTypes.LOGIN_SUCESSO,
    payload: { access_token, usuario, expira_em },
  };
}

export function logoutRequest(
  title = 'Logout',
  content = 'Obrigado por usar nosso sistema.'
) {
  return {
    type: AuthTypes.LOGOUT_REQUEST,
    payload: { title, content },
  };
}

export function alterarSenhaRequest(cpf_email) {
  return {
    type: AuthTypes.ALTERAR_SENHA_REQUEST,
    payload: { cpf_email },
  };
}

export function confirmTokenAlterarSenha(token) {
  return {
    type: AuthTypes.CONFIRMA_SENHA_REQUEST,
    payload: { token },
  };
}

export function confirmSucessoToken(token, usuario) {
  return {
    type: AuthTypes.CONFIRMA_SUCESSO_TOKEN_SENHA,
    payload: { token, usuario },
  };
}

export function mudarSenhaRequest(senha) {
  return {
    type: AuthTypes.CRIAR_SENHA_NOVA_REQUEST,
    payload: { senha },
  };
}

export function mudarSenhaSucesso(usuario) {
  return {
    type: AuthTypes.CRIAR_SENHA_NOVA_SUCESSO,
    payload: { usuario},
  };
}

export function desligarLoading() {
  return {
    type: AuthTypes.DESATIVAR_LOADING,
  };
}

export function tokenRequest(token) {
  return {
    type: AuthTypes.TOKEN_RENOVAR_REQUEST,
    payload: { token },    
  };
}

export function tokenSucesso(token) {
  return {
    type: AuthTypes.TOKEN_SUCESSO,
    payload: { token },
  };
}
