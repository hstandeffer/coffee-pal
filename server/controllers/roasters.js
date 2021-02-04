const roastersRouter = require('express').Router()
const Roaster = require('../models/roaster')

const { upload } = require('../utils/multer')
const { auth } = require('../utils/middleware')
const { roasterValidation, validate } = require('../utils/validator')

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

roastersRouter.post('/', auth, upload.single('roasterImage'), roasterValidation(), validate, async (request, response) => {
  const body = request.body
  const roasterObj = {
    name: body.name,
    summary: body.summary,
    address: body.address,
    website: body.website,
    addedBy: request.user.id,
  }
  
  if (request.file && request.file.filename) {
    request.file.key = request.file.filename
    roasterObj.imagePath = request.file.key
  }

  const newRoaster = new Roaster(roasterObj)

  const roaster = await newRoaster.save()
  return response.json(roaster.toJSON())
})

roastersRouter.get('/recent-roasters', async (request, response) => {
  const roasters = await Roaster.find().limit(4)
  return response.json(roasters.map(roaster => roaster.toJSON()))
})

roastersRouter.get('/:id', async (request, response) => {
  const roaster = await Roaster.findById(request.params.id).populate({
    path: 'coffees',
    model: 'Coffee',
    populate: {
      path: 'roaster',
      model: 'Roaster',
      select: 'imagePath'
    }
  })
  return response.json(roaster.toJSON())
})

module.exports = roastersRouter