const roastersRouter = require('express').Router()
const Roaster = require('../models/roaster')

const { toMongooseObjectId } = require('../utils/mongoose')
const { upload } = require('../utils/multer')
const { auth, authAdmin } = require('../utils/middleware')
const { roasterValidation, validate } = require('../utils/validator')

roastersRouter.get('/', async (request, response) => {
  const lastRoasterId = request.query.roasterId
  const findObj = lastRoasterId ? { _id: {$lt: toMongooseObjectId(lastRoasterId)}} : {}
  const roasters = await Roaster.find(findObj).select('-coffees -address -updatedAt').sort({ _id: -1 }).limit(10)

  return response.json(roasters.map(roaster => roaster.toJSON()))
})

roastersRouter.get('/list', async (request, response) => {
  const roasters = await Roaster.find({})
  let roasterList = []
  roasters.forEach((roaster) => {
    let roasterObj = { 'id': roaster._id, 'name': roaster.name }
    roasterList.push(roasterObj)
  })

  return response.send(roasterList)
})

roastersRouter.post('/', auth, authAdmin, upload.single('roasterImage'), roasterValidation(), validate, async (request, response) => {
  const body = request.body
  const roasterObj = {
    name: body.name,
    summary: body.summary,
    address: body.address,
    website: body.website,
    addedBy: request.user.id,
  }

  if (request.file) {
    if (process.env.NODE_ENV === 'production') {
      roasterObj.imagePath = request.file.key
    }
    else {
      roasterObj.imagePath = request.file.filename
    }
  }

  const newRoaster = new Roaster(roasterObj)

  const roaster = await newRoaster.save()
  return response.json(roaster.toJSON())
})

roastersRouter.get('/recent', async (request, response) => {
  const roasters = await Roaster.find().sort({ _id: -1 }).limit(4)
  return response.json(roasters.map(roaster => roaster.toJSON()))
})

roastersRouter.get('/:id', async (request, response) => {
  const roaster = await Roaster.findById(request.params.id).populate({
    path: 'coffees',
    model: 'Coffee',
    select: 'coffeeName imagePath imageUrl roastType price',
    populate: {
      path: 'roaster',
      model: 'Roaster',
      select: 'imagePath'
    }
  })
  return response.json(roaster.toJSON())
})

module.exports = roastersRouter