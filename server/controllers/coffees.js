const coffeesRouter = require('express').Router()
const Coffee = require('../models/coffee')
const Roaster = require('../models/roaster')

const { upload } = require('../utils/multer')
const { auth } = require('../utils/middleware')

coffeesRouter.get('/', async (request, response) => {
  const coffees = await Coffee.find({}).populate('roaster')
  return response.json(coffees.map(coffee => coffee.toJSON()))
})

coffeesRouter.get('/query', async (request, response) => {
  const query = request.query

  // checks is an object and empty: will be true if empty and false otherwise
  if (Object.keys(query).length === 0 && query.constructor === Object) {
    const noQueryCoffees = await Coffee.find().limit(20).populate('roaster')
    return response.json(noQueryCoffees)
  }

  const coffees = await Coffee.find({ roastType: { $in: query.roastType }, price: { $gte: query.priceLow, $lte: query.priceHigh } }).limit(20).populate('roaster')

  return response.json(coffees.map(coffee => coffee.toJSON()))
})

coffeesRouter.post('/', auth, upload.single('coffeeImage'), async (request, response) => {
  const body = request.body
  const coffeeObj = {
    brand: body.selectedBrand,
    countries: body.selectedCountry,
    fairTrade: body.fairTrade,
    organic: body.organic,
    price: body.price,
    roastType: body.roastType,
    shadeGrown: body.shadeGrown,
    roaster: body.selectedBrand,
    coffeeName: body.coffeeName,
    url: body.url,
    addedBy: request.user.id
  }

  if (request.file && request.file.filename) {
    request.file.key = request.file.filename
    roasterObj.imagePath = request.file.key
  }
  
  const roaster = await Roaster.findById(body.selectedBrand)
  
  const newCoffee = new Coffee(coffeeObj)
  const savedCoffee = await newCoffee.save()
  
  roaster.coffees = roaster.coffees.concat(savedCoffee._id)
  await roaster.save()

  response.json(savedCoffee.toJSON())
})

coffeesRouter.get('/recent', async (request, response) => {
  const coffees = await Coffee.find().limit(4).populate('roaster')
  return response.json(coffees.map(coffee => coffee.toJSON()))
})

coffeesRouter.put('/:id', auth, async (request, response) => {
  const body = request.body
  const coffeeObj = {
    brand: body.selectedBrand,
    countries: body.selectedCountry,
    fairTrade: body.fairTrade,
    organic: body.organic,
    price: body.price,
    roastType: body.roastType,
    shadeGrown: body.shadeGrown,
    roaster: body.selectedBrand,
    coffeeName: body.coffeeName,
    url: body.url,
    addedBy: request.user.id
  }

  if (request.file && request.file.filename) {
    request.file.key = request.file.filename
    roasterObj.imagePath = request.file.key
  }

  const coffee = await Coffee.findByIdAndUpdate(request.params.id, coffeeObj, { new: true })
  return response.status(204).json(coffee.toJSON())
})

coffeesRouter.delete('/:id', auth, async (request, response) => {
  const coffee = await Coffee.findById(request.params.id)
  if (coffee.addedBy === request.user.id) {
    coffee.remove()
    return response.status(204).json({ msg: 'Coffee deleted successfully' })
  }
  else {
    return response.status(401).json({ error: 'Unauthorized' })
  }
})

// keep at bottom so wildcard doesnt catch above routes
coffeesRouter.get('/:id', async (request, response) => {
  const coffee = await Coffee.findById(request.params.id).populate('roaster', { name: 1, _id: 1, imagePath: 1 })
  return response.json(coffee.toJSON())
})

module.exports = coffeesRouter