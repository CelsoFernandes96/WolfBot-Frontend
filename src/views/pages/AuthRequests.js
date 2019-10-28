import axios from "axios";
import ambiente from "../../config";

const loginRequest = async values => {
  const url = `${ambiente.URL.account}/login`;
  try {
    const loginResult = await axios.post(url, values);
    return loginResult;
  } catch (e) {
    return e.response;
  }
};

const validateToken = async token => {
  const url = `${ambiente.URL.api}/userinfo`;
  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: token
      }
    });
    return result.data;
  } catch (e) {
    return e.response.data;
  }
};

const signupRequest = async values => {
  const url = `${ambiente.URL.account}/signup`;
  try {
    const signupResult = await axios.post(url, values);
    return signupResult;
  } catch (e) {
    return e.response;
  }
};

const passwordRecoveryRequest = async values => {
  const url = `${ambiente.URL.account}/passwordrecovery`;
  try {
    const result = await axios.post(url, values);
    return result;
  } catch (e) {
    return e.response;
  }
};

const changePasswordLogin = async values => {
  const url = `${ambiente.URL.account}/changepassword`;
  try {
    const result = await axios.post(url, values);
    return result;
  } catch (e) {
    return e.response;
  }
};

const socketManage = async localStorageObject => {
  const url = `${ambiente.URL.account}/managesocket`;
  try {
    const result = await axios.post(url, { localStorageObject });
    return result.data;
  } catch (e) {
    return e.response.data;
  }
};

export {
  loginRequest,
  validateToken,
  signupRequest,
  passwordRecoveryRequest,
  changePasswordLogin,
  socketManage
};
