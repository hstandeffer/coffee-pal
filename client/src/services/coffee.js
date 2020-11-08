import axios from 'axios'
import { getStoredAuthToken } from '../shared/utils/authToken'

const baseUrl = '/api/coffees'

let token = getStoredAuthToken()

const config = {
  headers: { Authorization: token ? token : null },
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

const getSavedCoffees = async (coffeeIds) => {
  const response = await axios.post(`${baseUrl}/saved-coffees`, {coffeeIds: coffeeIds}, config)
  return response.data
}

export default { getAll, get, add, getSavedCoffees }