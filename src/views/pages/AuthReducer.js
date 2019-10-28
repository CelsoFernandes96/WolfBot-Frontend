const userKey = "user_bot";
const INITIAL_STATE = {
  user: "",
  email: "",
  emailVerified: false,
  tokenExpirationTime: null,
  refreshToken: null,
  accessToken: "",
  accountActive: false, // se a conta foi ativada corretamente
  emailIsActive: false, // se email já está ativo ou não
  codeActiveAccountInvalid: false, // se o código está inválido
  changePassword: false, // se a troca da senha pode ser feita corretamente
  operation: "",
  code: ""
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      const userLogIn = JSON.stringify({
        ...action.payload,
        dashboard_reload: 1
      });
      localStorage.setItem(userKey, userLogIn);
      const {
        authenticatedUser: {
          accessToken,
          email,
          emailVerified,
          expirationTime,
          refreshToken,
          uid
        }
      } = action.payload;
      return {
        ...state,
        user: uid,
        email,
        emailVerified,
        tokenExpirationTime: expirationTime,
        refreshToken,
        accessToken
      };

    case "ACCOUNT_ACTIVE":
      switch (action.payload.value) {
        case 1:
          return {
            ...state,
            accountActive: true,
            codeActiveAccountInvalid: false,
            changePassword: false,
            emailIsActive: false,
            operation: "EMAIL_ACTIVATION",
            code: action.payload.code
          };

        case 2:
          return {
            ...state,
            accountActive: false,
            codeActiveAccountInvalid: false,
            changePassword: false,
            emailIsActive: true,
            operation: "EMAIL_ACTIVATION",
            code: action.payload.code
          };

        default:
          return {
            ...state,
            accountActive: false,
            codeActiveAccountInvalid: true,
            changePassword: false,
            emailIsActive: false,
            operation: "ALL"
          };
      }

    case "CHANGE_PASSWORD":
      return {
        ...state,
        changePassword: true,
        accountActive: false,
        codeActiveAccountInvalid: false,
        emailIsActive: false,
        operation: "PASSWORD_RESET",
        code: action.payload.code
      };

    case "ALL_ERRORS_ACTIVE":
      return {
        ...state,
        accountActive: false,
        codeActiveAccountInvalid: true,
        emailIsActive: false,
        changePassword: false,
        operation: "ALL"
      };

    default:
      return state;
  }
};
