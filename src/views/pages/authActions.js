// import { toastr } from "react-redux-toastr";
import axios from "axios";
import ambiente from "../../config";

const login = data => {
  return dispatch => {
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  };
};

const signup = data => {
  return dispatch => {
    dispatch({ type: "REGISTER_SUCCESS", payload: data });
  };
};

const verifyActiveAccount = async code => {
  return async dispatch => {
    try {
      const response = await axios.get(`${ambiente.URL.account}/active`, {
        headers: { code: code }
      });
      if (response.data.mode === "EMAIL_ACTIVATION") {
        if (response.status === 200)
          dispatch({ type: "ACCOUNT_ACTIVE", payload: { value: 1, code } });
      }
      if (response.data.mode === "PASSWORD_RESET") {
        if (response.status === 200)
          dispatch({ type: "CHANGE_PASSWORD", payload: { value: 1, code } });
      }
    } catch (error) {
      if (
        error.response.data.errors[0].messages ===
        "Email já foi verificado pelo usuário"
      )
        dispatch({ type: "ACCOUNT_ACTIVE", payload: { value: 2, code } });
      else
        dispatch({
          type: "ALL_ERRORS_ACTIVE",
          payload: { operation: error.response.data.mode }
        });
    }
  };
};

const passwordRecovery = data => {
  return dispatch => {
    dispatch({ type: "EMAIL_SEND_PASSWORD_RECOVERY", payload: data });
  };
};

const changePassword = (values, changePasswordHash) => {
  return dispatch => {
    dispatch({ type: "PASSWORD_CHANGED", payload: true });
  };
};

export { login, signup, verifyActiveAccount, passwordRecovery, changePassword };
