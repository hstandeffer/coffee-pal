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
      if (!user) return response.status(400).json({ msg: 'User does not exists' })

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return response.status(400).json({ msg: 'Invalid credentials' })

          jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err
            response.json({
              token, user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            })
          })
        })
    })
})

module.exports = authRouter