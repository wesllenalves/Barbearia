export const RegisterTypes = {
  CADASTRO_REQUEST: '@register/CADASTRO_REQUEST',
  CADASTRO_SUCESSO: '@register/CADASTRO_SUCESSO',
  CADASTRO_FAILURE: '@register/CADASTRO_FAILURE',
  CONFIRM_REQUEST: '@register/CONFIRM_REQUEST',
  CONFIRM_SUCESSO: '@register/CONFIRM_SUCESSO',
  FINALIZAR_CADASTRO_REQUEST: '@register/FINALIZAR_CADASTRO_REQUEST',
  FINALIZAR_CADASTRO_SUCCESS: '@register/FINALIZAR_CADASTRO_SUCCESS',
  FINALIZAR_CADASTRO_FAILURE: '@register/FINALIZAR_CADASTRO_FAILURE',
};

export function cadastroRequest(email, senha, name) {
  return {
    type: RegisterTypes.CADASTRO_REQUEST,
    payload: { email, senha, name },
  };
}

export function cadastroSucesso(dados) {
  return {
    type: RegisterTypes.CADASTRO_SUCESSO,
    payload: { dados },
  };
}

export function cadastroFailure() {
  return {
    type: RegisterTypes.CADASTRO_FAILURE,
  };
}

export function confirmRequest(token) {
  return {
    type: RegisterTypes.CONFIRM_REQUEST,
    payload: { token },
  };
}

export function confirmSucesso(token, usuario) {
  return {
    type: RegisterTypes.CONFIRM_SUCESSO,
    payload: { token, usuario },
  };
}

export function finalizarCadastroRequest(
  nome,
  cpf,
  cidade_id,
  cep,
  endereco,
  bairro,
  complemento,
  celular,
  senha,
) {
  return {
    type: RegisterTypes.FINALIZAR_CADASTRO_REQUEST,
    payload: {
      nome,
      cpf,
      cidade_id,
      cep,
      endereco,
      bairro,
      complemento,
      celular,
      senha,
    },
  };
}

export function finalizarCadastroSucess(dados) {
  return {
    type: RegisterTypes.FINALIZAR_CADASTRO_SUCCESS,
    payload: { dados },
  };
}

export function finalizarCadastroFailure() {
  return {
    type: RegisterTypes.FINALIZAR_CADASTRO_FAILURE,
  };
}
