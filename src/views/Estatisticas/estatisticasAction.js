import axios from 'axios'
import ambiente from '../../config'
import functions from '../../utils/functions'

const USER_BOT = functions.loadLocalStorage('user_bot')

const getTotalOrden = async () => {
  const token = USER_BOT.authenticatedUser.accessToken;
  const url = `${ambiente.URL.api}/statistic/getTotalOrden`;
  try {
    const result = await axios.get(url, { headers: { authorization: token } });
    return result;
  } catch (error) {
    return error.response;
  }
}

const getOrderPerDay = async () => {
  const token = USER_BOT.authenticatedUser.accessToken;
  const url = `${ambiente.URL.api}/statistic/getOrderPerDay`;
  try {
    const result = await axios.get(url, { headers: { authorization: token } });
    
    return result.data;
  } catch (error) {
    return error.response;
  }
}

const getProfitPerDay = async () => {
  const token = USER_BOT.authenticatedUser.accessToken;
  const url = `${ambiente.URL.api}/statistic/getProfitPerDay`;
  try {
    const result = await axios.get(url, { headers: { authorization: token } });
    return result;
  } catch (error) {
    return error.response;
  }
}

export {
  getTotalOrden,
  getOrderPerDay,
  getProfitPerDay
}
