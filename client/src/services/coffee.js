import api from '../shared/utils/api'

const baseUrl = '/api/coffees'

const getAll = async () => {
  const response = await api.get(baseUrl)
  return response
}

const get = async (coffeeId) => {
  const response = await api.get(`${baseUrl}/${coffeeId}`)
  return response
}

const add = async (coffeeObject) => {
  const response = await api.post(baseUrl, coffeeObject)
  return response
}

const update = async (coffeeId, coffeeObject) => {
  const response = await api.put(`${baseUrl}/${coffeeId}`, coffeeObject)
  return response
}

const getRecent = async () => {
  const response = await api.get(`${baseUrl}/recent`)
  return response
}

export default { getAll, get, add, update, getRecent }