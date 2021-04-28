import api from '../shared/utils/api'
const baseUrl = '/api/tasting'

const getAll = async () => {
  const response = await api.get(baseUrl)
  return response.data
}

const get = async (tastingId) => {
  const response = await api.get(`${baseUrl}/${tastingId}`)
  return response.data
}

const add = async (tastingObject) => {
  const response = await api.post(baseUrl, tastingObject)
  return response.data
}

const services = { getAll, get, add }

export default services