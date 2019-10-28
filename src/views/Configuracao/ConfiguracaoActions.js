import axios from 'axios'
import ambiente from '../../config'
import functions from '../../utils/functions'

const USER_BOT = functions.loadLocalStorage('user_bot')

const getConfiguracao = async () => {
  const token = USER_BOT.authenticatedUser.accessToken;
  const url = `${ambiente.URL.api}/configuracao/buscar`;
  try {
    const configResult = await axios.get(url, { headers: { authorization: token } });
    return configResult;
  } catch (error) {
    return error.response;
  }
}

const testConfiguracao = async () => {
  const token = USER_BOT.authenticatedUser.accessToken;
  const url = `${ambiente.URL.api}/exchange/balance`;
  try {
    const saldoResult = await axios.get(url, { headers: { authorization: token } });
    return saldoResult;
  } catch (error) {
    return error.response;
  }
}

const postConfiguracao = async (values) => {
  const token = USER_BOT.authenticatedUser.accessToken;
  const url = `${ambiente.URL.api}/configuracao/salvar`
  try {
    const configResult = axios.post(url, values, { headers: { authorization: token } })
    return configResult
  } catch (error) {
    return error.response
  }
}

export {
  getConfiguracao,
  postConfiguracao,
  testConfiguracao,
}
