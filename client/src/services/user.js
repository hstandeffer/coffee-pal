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

const getCurrentUser = async () => {
  const response = await axios.get(`${baseUrl}/current-user`, config)
  return response.data
}

const forgotPassword = async (email) => {
  const emailObj = { email: email }
  const response = await axios.post(`${baseUrl}/forgot-password`, emailObj, config)
  return response.data
}

export default { saveCoffee, getCurrentUser, forgotPassword }