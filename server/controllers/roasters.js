const roastersRouter = require('express').Router()
const Roaster = require('../models/roaster')

const config = require('../utils/config')

const aws = require('aws-sdk')
const multer  = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
  secretAccessKey: config.AWS_SECRET_KEY,
  accessKeyId: config.AWS_ACCESS_KEY,
  region: 'us-east-1'
});

const s3 = new aws.S3()
 
const upload = multer({
  storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: 'baroasta',
      key: function (req, file, cb) {
          let newFileName = Date.now() + '-' + file.originalname
          let fullPath = 'roasters/' + newFileName
          cb(null, fullPath)
      }
  })
})

roastersRouter.get('/', async (request, response) => {
  const roasters = await Roaster.find({})
  return response.json(roasters.map(roaster => roaster.toJSON()))
})

roastersRouter.post('/', upload.single('roasterImage'), async (request, response) => {
  const body = request.body
  const newRoaster = new Roaster({
    name: body.name,
    city: body.city,
    state: body.state,
    country: body.country,
    website: body.website,
    addedBy: body.addedBy,
    imagePath: request.file.key
  })

  const roaster = await newRoaster.save()
  response.json(roaster.toJSON())
})

module.exports = roastersRouter