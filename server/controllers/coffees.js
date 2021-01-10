const coffeesRouter = require('express').Router()
const Coffee = require('../models/coffee')

const config = require('../utils/config')
const { auth } = require('../utils/middleware')

const aws = require('aws-sdk')
const multer  = require('multer')
const multerS3 = require('multer-s3')

const path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

if (config.NODE_ENV === 'production') {
  const s3 = new aws.S3()

  aws.config.update({
    secretAccessKey: config.AWS_SECRET_KEY,
    accessKeyId: config.AWS_ACCESS_KEY,
    region: 'us-east-1'
  }) 
  
  storage = multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'baroasta',
    key: function (req, file, cb) {
      let newFileName = Date.now() + '-' + file.originalname
      let fullPath = 'images/' + newFileName
      cb(null, fullPath)
    }
  })
}

let upload = multer({
  storage: storage
})

coffeesRouter.get('/', async (request, response) => {
  try {
    const coffees = await Coffee.find({}).populate('roaster')
    response.json(coffees.map(coffee => coffee.toJSON()))
  }
  catch (err) {
    response.status(404).json({ msg: err })
  }
})

coffeesRouter.get('/query', async (request, response) => {
  const query = request.query

  // check is an object and empty: will be true if empty and false otherwise
  if (Object.keys(query).length === 0 && query.constructor === Object) {
    const noQueryCoffees = await Coffee.find().limit(4).populate('roaster')
    return response.json(noQueryCoffees)
  }

  const coffees = await Coffee.find({ roastType: { $in: query.roastType }, price: { $gte: query.priceLow, $lte: query.priceHigh } }).limit(5).populate('roaster')

  return response.json(coffees)
})

coffeesRouter.post('/', auth, upload.single('coffeeImage'), async (request, response) => {
  if (request.file && request.file.filename) {
    request.file.key = request.file.filename
  }
  
  try {
    const body = request.body
    const newCoffee = new Coffee({
      brand: body.selectedBrand,
      countries: body.selectedCountry,
      fairTrade: body.fairTrade,
      imagePath: body.imagePath,
      organic: body.organic,
      price: body.price,
      roastType: body.roastType,
      shadeGrown: body.shadeGrown,
      roaster: body.selectedBrand,
      coffeeName: body.coffeeName,
      url: body.url,
      addedBy: request.user.id
    })
    const coffee = await newCoffee.save()
    response.json(coffee.toJSON())
  }
  catch (err) {
    console.log(err)
    let errMsg = 'Coffee upload failed. Ensure all fields are correct and try again.'
    response.status(404).json({ msg: errMsg })
  }
})

coffeesRouter.get('/recent', async (request, response) => {
  try {
    const coffees = await Coffee.find().limit(4).populate('roaster')
    response.json(coffees)
  }
  catch (err) {
    response.status(404).json({ msg: err })
  }
})

// keep at bottom so wildcard doesnt catch above routes
coffeesRouter.get('/:id', async (request, response) => {
  try {
    const coffee = await Coffee.findById(request.params.id).populate('roaster', { name: 1, _id: 1, imagePath: 1 })
    response.json(coffee.toJSON())
  }
  catch (err) {
    response.status(404).json({ msg: err })
  }
})

module.exports = coffeesRouter