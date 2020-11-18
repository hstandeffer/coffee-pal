const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const { auth } = require('../utils/middleware')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  return response.json(users)
})

usersRouter.post('/', (request, response) => {
  const { username, email, password } = request.body

  if (!username || !email || !password) {
    return response.status(400).json({ msg: 'Please enter all fields.' })
  }

  User.findOne({ email })
    .then(user => {
      if (user) return response.status(400).json({ msg: 'User already exists.' })

      const newUser = new User({
        username,
        email,
        password
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err

          newUser.password = hash
          newUser.save()
          .then(user => {
            jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
              if (err) throw err;
              response.json({
                token,
                user: {
                  id: user.id,
                  name: user.username,
                  email: user.email
                }
              })
            })
          })
        })
      })
    })
})

usersRouter.post('/save-coffee', auth, async (request, response) => {
  const id = request.user.id
  const body = request.body
  User.findById(id).then(user => {
    user.saved_coffees.push(body.coffeeId)
    user.save()
  })
})

usersRouter.get('/current-user', auth, async (request, response) => {
  const user = request.user
  return response.json(user.id)
})

usersRouter.get('/saved-coffee-ids', auth, async (request, response) => {
  const id = request.user.id
  const user = await User.findById(id)
  return response.json({ coffeeIds: user.saved_coffees })
})

module.exports = usersRouter