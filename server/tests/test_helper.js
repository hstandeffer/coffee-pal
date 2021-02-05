const Coffee = require('../models/coffee')

const initialCoffees = [
  {
    countries: ['Nicaragua', 'Guatemala'],
    fairTrade: true,
    organic: true,
    price: 12,
    roastType: 'light',
    shadeGrown: false,
    brand: 'Just Coffee',
    coffeeName: 'Good blend',
    url: 'afakelink.com',
  }
]

const initialRoasters = [
  {
    name: 'Just Coffee',
    summary: 'The best coffee',
    website: 'justcoffee.coop',
    imagePath: null,
  }
]

const coffeesInDb = async () => {
  const coffees = await Coffee.find({})
  return coffees.map(coffee => coffee.toJSON())
}

module.exports = {
  initialCoffees,
  initialRoasters,
  coffeesInDb
}