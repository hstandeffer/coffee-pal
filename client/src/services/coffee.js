import axios from 'axios'
import { getStoredAuthToken } from '../shared/utils/authToken'

const baseUrl = '/api/coffees'

const config = {
  headers: { Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined },
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const get = async (coffeeId) => {
  const response = await axios.get(`${baseUrl}/${coffeeId}`, config)
  return response.data
}

const add = async (coffeeObject) => {
  const response = await axios.post(baseUrl, coffeeObject, config)
  return response.data
}

const getRecent = async () => {
  const response = await axios.get(`${baseUrl}/recent`, config)
  return response.data
}

export default { getAll, get, add, getRecent }