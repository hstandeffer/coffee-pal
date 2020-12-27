const coffeesRouter = require('express').Router()
const Coffee = require('../models/coffee')

coffeesRouter.get('/', async (request, response) => {
  try {
    const coffees = await Coffee.find({})
    response.json(coffees.map(coffee => coffee.toJSON()))
  }
  catch (err) {
    response.status(404).json({ msg: err })
  }
})

coffeesRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const newCoffee = new Coffee({
      countries: body.countries,
      currency: body.currency,
      description: body.description,
      fairTrade: body.fairTrade,
      imageUrl: body.imageUrl,
      organic: body.organic,
      price: body.price,
      roastType: body.roastType,
      shadeGrown: body.shadeGrown,
      siteName: body.siteName,
      title: body.title,
      url: body.url,
    })
    const coffee = await newCoffee.save()
    response.json(coffee.toJSON())
  }
  catch (err) {
    response.status(404).json({ msg: err })
  }
})

coffeesRouter.get('/recent', async (request, response) => {
  try {
    const coffees = await Coffee.find().limit(4)
    response.json(coffees)
  }
  catch (err) {
    response.status(404).json({ msg: err })
  }
})

// keep at bottom so wildcard doesnt catch above routes
coffeesRouter.get('/:id', async (request, response) => {
  try {
    const coffee = Coffee.findById(request.params.id)
    response.json(coffee.toJSON())
  }
  catch (err) {
    response.status(404).json({ msg: err })
  }
})

module.exports = coffeesRouter