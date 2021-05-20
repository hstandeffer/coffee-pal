import api from '../shared/utils/api'

const baseUrl = '/api/coffees'

const updateCoffee = async (coffee) => {
  const response = await api.put(`${baseUrl}/${coffee.id}`, {...coffee, selectedBrand: coffee.roaster.id })
  return response
}

const services = { updateCoffee }

export default services