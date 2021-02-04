const User = require('../models/user')
const Coffee = require('../models/coffee')
const Roaster = require('../models/roaster')

const seedUsers = () => {
  const users = [
    User.create({
      username: 'jimbo',
      email: 'jimbo@gmail.com',
      password: 'password'
    }),
    User.create({
      username: 'john',
      email: 'john@gmail.com',
      password: 'password'
    })
  ]
  return Promise.all(users)
}

const seedRoasters = () => {
  const roasters = [
    Roaster.create({
      name: 'Verve Coffee Roasters',
      summary: 'Good coffee',
      address: 'Who Cares Ln',
      website: 'vervecoffee.com',
      imagePath: '1609388516385.jpg'
    })
  ]

  return Promise.all(roasters)
}

const seedCoffees = (roaster) => {
  const coffees = [
    Coffee.create({
      countries: ['Bolivia'],
      fairTrade: true,
      organic: true,
      price: '12',
      roastType: 'light',
      roaster: roaster._id,
      shadeGrown: false,
      brand: 'Verve',
      coffeeName: 'Tasty blend',
      url: 'test.com',
    }),
    Coffee.create({
      countries: ['Argentina'],
      fairTrade: false,
      organic: true,
      price: 22,
      roastType: 'medium',
      roaster: roaster._id,
      shadeGrown: false,
      brand: 'Verve',
      coffeeName: 'Tastiness blend',
      url: 'test.com',
    }),
    Coffee.create({
      countries: ['Columbia'],
      fairTrade: true,
      organic: true,
      price: 16,
      roastType: 'light',
      roaster: roaster._id,
      shadeGrown: false,
      brand: 'Verve',
      coffeeName: 'the best blend',
      url: 'test.com',
    })
  ]
  return Promise.all(coffees)
}

const createTestAccount = async () => {
  const users = await seedUsers()
  const roasters = await seedRoasters()
  await seedCoffees(roasters[0])
  return users[0]
}

module.exports = createTestAccount