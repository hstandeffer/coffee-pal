const coffeesRouter = require('express').Router()
const Coffee = require('../models/coffee')

coffeesRouter.get('/', (request, response) => {
  Coffee.find({})
    .then(coffees => {
      return response.json(coffees.map(coffee => coffee.toJSON()))
    })
})

coffeesRouter.post('/', (request, response) => {
  const newCoffee = new Coffee({
    countries: request.body.countries,
    currency: request.body.currency,
    description: request.body.description,
    fairTrade: request.body.fairTrade,
    imageUrl: request.body.imageUrl,
    organic: request.body.organic,
    price: request.body.price,
    roastType: request.body.roastType,
    shadeGrown: request.body.shadeGrown,
    siteName: request.body.siteName,
    title: request.body.title,
    url: request.body.url,
  })

  newCoffee.save().then(coffee => response.json(coffee.toJSON()))
})

coffeesRouter.post('/saved-coffees', async (request, response) => {
  const coffees = await Coffee.find({ '_id': { $in: request.body.coffeeIds }})
  return response.json(coffees)
})

coffeesRouter.get('/recent-coffees', async (request, response) => {
  const coffees = await Coffee.find().limit(4)
  return response.json(coffees)
})

// keep at bottom so wildcard doesnt catch above routes
coffeesRouter.get('/:id', (request, response) => {
  Coffee.findById(request.params.id)
    .then(coffee => {
      response.json(coffee.toJSON())
    })
    .catch(err => {
      response.status(404).json({ msg: err })
    })
})

module.exports = coffeesRouter