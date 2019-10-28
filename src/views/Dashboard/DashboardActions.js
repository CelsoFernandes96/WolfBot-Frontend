import axios from "axios";
import ambiente from "../../config";
import functions from "../../utils/functions";

const USER_BOT = functions.loadLocalStorage("user_bot");

const startOrStopBot = async values => {
  const token = USER_BOT.authenticatedUser.accessToken;
  const url = `${ambiente.URL.api}/bot/acionarRobo`;
  try {
    const configResult = await axios.post(url, values, {
      headers: { authorization: token }
    });
    return configResult;
  } catch (error) {
    return error.response;
  }
};

const getStatusBot = async () => {
  const token = USER_BOT.authenticatedUser.accessToken;
  const url = `${ambiente.URL.api}/configuracao/buscar`;
  try {
    const configResult = await axios.get(url, {
      headers: { authorization: token }
    });
    return configResult;
  } catch (error) {
    return error.response;
  }
};

const atualizarDashboard = socketObject => {
  return dispatch => {
    dispatch({ type: "DASHBOARD_UPDATED", payload: socketObject });
  };
};

const getDashboardData = async token => {
  const url = `${ambiente.URL.api}/dashboard/updateDashboard`;
  return dispatch => {
    axios
      .get(url, { headers: { authorization: token } })
      .then(resp =>
        dispatch({ type: "GET_DASHBOARD", payload: resp.data.data })
      )
      .catch(e => {});
  };
};

export { getStatusBot, startOrStopBot, atualizarDashboard, getDashboardData };
