import axios from 'axios'
import { getStoredAuthToken } from '../shared/utils/authToken'

const baseUrl = '/api/roasters'

let token = getStoredAuthToken()

const config = {
  headers: { Authorization: token ? token : null },
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const get = async (roasterId) => {
  const response = await axios.get(`${baseUrl}/${roasterId}`, config)
  return response.data
}

const add = async (roasterObject) => {
  console.log(roasterObject)
  const response = await axios.post(baseUrl, roasterObject, config)
  return response.data
}

export default { getAll, get, add }