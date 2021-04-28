import api from '../shared/utils/api'

const baseUrl = '/api/auth'

const signIn = async (user) => {
  const response = await api.post(`${baseUrl}`, user)
  return response
}

const services = { signIn }

export default services