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
  const data = new FormData()
  data.append('coffeeImage', coffeeObject.image)
  data.append('coffeeName', coffeeObject.coffeeName)
  if (coffeeObject.selectedBrand) {
    data.append('selectedBrand', coffeeObject.selectedBrand.id)
  }
  else {
    data.append('selectedBrand', null)
  }
  data.append('selectedCountry', coffeeObject.selectedCountry) 
  data.append('fairTrade', coffeeObject.fairTrade) 
  data.append('organic', coffeeObject.organic) 
  data.append('shadeGrown', coffeeObject.shadeGrown) 
  data.append('url', coffeeObject.url) 
  data.append('price', coffeeObject.price) 
  data.append('roastType', coffeeObject.roastType)
  const response = await api.post(baseUrl, data)
  return response
}

const update = async (coffeeObject, coffeeId) => {
  const data = new FormData()
  data.append('coffeeImage', coffeeObject.image)
  data.append('coffeeName', coffeeObject.coffeeName)
  if (coffeeObject.selectedBrand) {
    data.append('selectedBrand', coffeeObject.selectedBrand.id)
  }
  else {
    data.append('selectedBrand', null)
  }
  data.append('selectedCountry', coffeeObject.selectedCountry) 
  data.append('fairTrade', coffeeObject.fairTrade) 
  data.append('organic', coffeeObject.organic) 
  data.append('shadeGrown', coffeeObject.shadeGrown) 
  data.append('url', coffeeObject.url)
  data.append('price', coffeeObject.price) 
  data.append('roastType', coffeeObject.roastType)

  const response = await api.put(`${baseUrl}/${coffeeId}`, data)
  return response
}

const getRecent = async () => {
  const response = await api.get(`${baseUrl}/recent`)
  return response
}

export default { getAll, get, add, update, getRecent }