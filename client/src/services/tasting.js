import axios from 'axios'
const baseUrl = '/api/tasting'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (tastingId) => {
  const response = await axios.get(`${baseUrl}/${tastingId}`)
  return response.data
}

const add = async (tastingObject) => {
  const response = await axios.post(baseUrl, tastingObject)
  return response.data
}

export default { getAll, get, add }