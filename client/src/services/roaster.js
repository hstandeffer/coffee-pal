import api from '../shared/utils/api'

const baseUrl = '/api/roasters'

const getAll = async () => {
  const response = await api.get(baseUrl)
  return response
}

const get = async (roasterId) => {
  const response = await api.get(`${baseUrl}/${roasterId}`)
  return response
}

const add = async (roasterObject) => {
  const data = new FormData()
  data.append('roasterImage', roasterObject.image)
  data.append('name', roasterObject.name)
  data.append('summary', roasterObject.summary)
  data.append('address', roasterObject.address)
  data.append('website', roasterObject.website)

  const response = await api.post(baseUrl, data)
  return response
}

const getRecent = async () => {
  const response = await api.get(`${baseUrl}/recent-roasters`)
  return response
}

const getList = async () => {
  const response = await api.get(`${baseUrl}/list`)
  return response
}

export default { getAll, get, add, getRecent, getList }