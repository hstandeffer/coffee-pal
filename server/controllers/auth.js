const authRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

authRouter.post('/', (request, response) => {
  const { email, password } = request.body

  if (!email || !password) {
    return response.status(400).json({ msg: 'Please enter all fields and try again' })
  }

  User.findOne({ email })
    .then(user => {
      if (!user) return response.status(400).json({ msg: 'User does not exist' })

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return response.status(400).json({ msg: 'Invalid credentials' })

          jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: 3600 * 24 * 365 }, (err, token) => {
            if (err) throw err
            response.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            })
          })
        })
    })
})

authRouter.post('/verify', async (request, response) => {
  const { token } = request.body
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET)
    if (decoded) {
      response.json(decoded)
    }
    else {
      response.status(401).json({ msg: 'Unauthenticated' })
    }
  }
  catch (err) {
    response.status(404).json({ msg: err })
  }
})

module.exports = authRouter