import axios from 'axios'
import { getStoredAuthToken } from '../shared/utils/authToken'

const baseUrl = '/api/users'

const config = {
  headers: { Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined },
}

const saveCoffee = async (coffeeId) => {
  const coffeeObj = { coffeeId: coffeeId }
  const response = await axios.post(`${baseUrl}/save-coffee`, coffeeObj, config)
  return response.data
}

const getSavedIds = async () => {
  const response = await axios.get(`${baseUrl}/saved-coffee-ids`, config)
  return response.data
}

const getCurrentUser = async () => {
  const response = await axios.get(`${baseUrl}/current-user`, config)
  return response.data
}

export default { saveCoffee, getSavedIds, getCurrentUser }