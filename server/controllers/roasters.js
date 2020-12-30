const roastersRouter = require('express').Router()
const Roaster = require('../models/roaster')

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

roastersRouter.get('/', async (request, response) => {
  const roasters = await Roaster.find({}).populate('coffees')
  return response.json(roasters.map(roaster => roaster.toJSON()))
})

roastersRouter.get('/list', async (request, response) => {
  const roasters = await Roaster.find({})
  let roasterMap = []
  roasters.forEach((roaster) => {
    let roasterObj = { 'id': roaster._id, 'name': roaster.name }
    roasterMap.push(roasterObj)
  })

  return response.send(roasterMap)
})

roastersRouter.post('/', auth, upload.single('roasterImage'), async (request, response) => {
  const body = request.body
  if (request.file && request.file.filename) {
    request.file.key = request.file.filename
  }

  const newRoaster = new Roaster({
    name: body.name,
    summary: body.summary,
    address: body.address,
    website: body.website,
    addedBy: request.user.id,
    imagePath: request.file.key
  })

  const roaster = await newRoaster.save()
  response.json(roaster.toJSON())
})

roastersRouter.get('/recent-roasters', async (request, response) => {
  const roasters = await Roaster.find().limit(4)
  return response.json(roasters.map(roaster => roaster.toJSON()))
})

roastersRouter.get('/:id', async (request, response) => {
  const roaster = await Roaster.findById(request.params.id).populate('coffees')
  return response.json(roaster.toJSON())
})

module.exports = roastersRouter