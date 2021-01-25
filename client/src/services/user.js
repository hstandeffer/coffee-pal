import api from '../shared/utils/api'

const baseUrl = '/api/users'

const saveCoffee = async (coffeeId) => {
  const response = await api.post(`${baseUrl}/save-coffee`, { coffeeId })
  return response
}

const deleteCoffee = async (coffeeId) => {
  const response = await api.put(`${baseUrl}/delete-coffee`, { coffeeId })
  return response.data
}

const getCurrentUser = async () => {
  const response = await api.get(`${baseUrl}/current-user`)
  return response
}

const forgotPassword = async (email) => {
  const response = await api.post(`${baseUrl}/forgot-password`, { email })
  return response
}

const updatePassword = async (dataObj) => {
  const response = await api.put(`${baseUrl}/update-password`, dataObj)
  return response
}

const changePassword = async (dataObj) => {
  const response = await api.put(`${baseUrl}/change-password`, dataObj)
  return response
}

export default { saveCoffee, deleteCoffee, getCurrentUser, forgotPassword, updatePassword, changePassword }