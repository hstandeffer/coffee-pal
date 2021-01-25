import axios from 'axios'
import { getStoredAuthToken } from '../shared/utils/authToken'
import api from '../shared/utils/api'

const baseUrl = '/api/users'


const defaults = {
  headers: () => ({
    'Content-Type': 'application/json',
    Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined,
  })
}

const config = {
  headers: { Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined },
}

const saveCoffee = async (coffeeId) => {
  const coffeeObj = { coffeeId: coffeeId }
  const response = await axios.post(`${baseUrl}/save-coffee`, coffeeObj, defaults.headers())
  return response.data
}

const deleteCoffee = async (coffeeId) => {
  const coffeeObj = { coffeeId: coffeeId }
  const response = await axios.put(`${baseUrl}/delete-coffee`, coffeeObj, config)
  return response.data
}

const getCurrentUser = async () => {
  const response = await api.get(`${baseUrl}/current-user`)
  return response
}

const forgotPassword = async (email) => {
  const emailObj = { email: email }
  const response = await axios.post(`${baseUrl}/forgot-password`, emailObj, config)
  return response.data
}

const updatePassword = async (dataObj) => {
  const response = await axios.put(`${baseUrl}/update-password`, dataObj, config)
  return response
}

const changePassword = async (dataObj) => {
  const response = await axios.put(`${baseUrl}/change-password`, dataObj, config)
  return response
}

export default { saveCoffee, deleteCoffee, getCurrentUser, forgotPassword, updatePassword, changePassword }