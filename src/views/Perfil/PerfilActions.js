import axios from "axios";
import ambiente from "../../config";
import functions from "../../utils/functions";

const USER_BOT = functions.loadLocalStorage("user_bot");

const getUser = response => {
  return dispatch => {
    dispatch({ type: "GET_USER_PROFILE", payload: response.data });
  };
};

const saveUser = response => {
  return dispatch => {
    dispatch({ type: "SAVE_USER_PROFILE", payload: response.data });
  };
};

const changePassword = response => {
  return dispatch => {
    dispatch({ type: "PASSWORD_CHANGED", payload: response.data });
  };
};

const deleteAccount = response => {
  return dispatch => {
    dispatch({ type: "DELETED_ACCOUNT", payload: response.data });
  };
};

const getAtividades = async () => {
  const response = await axios.get(`${ambiente.URL.api}/profile/activities`, {
    headers: {
      Authorization: USER_BOT.authenticatedUser.accessToken
    }
  });

  return dispatch => {
    dispatch({ type: "GET_ACTIVITIES", payload: response.data.data });
  };
};

export { getUser, saveUser, changePassword, deleteAccount, getAtividades };
