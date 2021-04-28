import api from '../shared/utils/api'

const baseUrl = '/api/contact'

const send = async (email, message) => {
  const response = await api.post(`${baseUrl}`, { email, message })
  return response
}

const services = { send } 

export default services