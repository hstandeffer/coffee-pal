const testRouter = require('express').Router()
const Coffee = require('../models/coffee')
const User = require('../models/user')
const Roaster = require('../models/roaster')
const createTestAccount = require('../database/createTestAccount')
const { signToken } = require('../utils/authToken')

testRouter.delete('/reset', async (request, response) => {
  await Coffee.deleteMany({})
  await User.deleteMany({})
  await Roaster.deleteMany({})

  response.status(204).end()
})

testRouter.post('/create-test-account', async (request, response) => {
  const user = await createTestAccount()
  response.send({ token: signToken({ id: user._id }) })
})

module.exports = testRouter