const roastersRouter = require('express').Router()
const Roaster = require('../models/roaster')
const multer  = require('multer')
const mime = require('mime')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + mime.getExtension(file.mimetype))
  }
})
 
const upload = multer({ storage: storage })

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
    imagePath: request.file.filename
  })

  const roaster = await newRoaster.save()
  response.json(roaster.toJSON())
})

module.exports = roastersRouter