import axios from 'axios'
import ambiente from '../../config'
import functions from '../../utils/functions'

const USER_BOT = functions.loadLocalStorage('user_bot')

const getHistocic = async () => {
  const token = USER_BOT.authenticatedUser.accessToken;
  const url = `${ambiente.URL.api}/order/historic`;
  try {
    const orderResult = await axios.get(url, { headers: { authorization: token } });
    return orderResult;
  } catch (error) {
    return error.response;
  }
}

export {
  getHistocic,
}
