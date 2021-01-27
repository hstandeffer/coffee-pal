const authRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

authRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  if (!email || !password) {
    return response.status(400).json({ error: 'Please ensure all fields are correct and try again.' })
  }

  const user = await User.findOne({ email }, 'password')
  if (!user) return response.status(400).json({ error: 'User does not exist' })

  bcrypt.compare(password, user.password)
    .then(isMatch => {
      if (!isMatch) return response.status(400).json({ error: 'Invalid credentials' })

      jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: 3600 * 24 * 365 }, (err, token) => {
        if (err) {
          return response.status(401).json({ error: 'Authentication token is invalid' })
        }
        
        return response.json({
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

authRouter.post('/verify', async (request, response) => {
  const { token } = request.body
  if (!token) {
    return response.status(401).json({ error: 'Authentication token is invalid' })
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: 'Authentication token is invalid'})
    }

    if (decoded) {
      return response.json(decoded)
    }

    else {
      return response.status(401).json({ error: 'User is unauthenticated' })
    }
  })
  
})

module.exports = authRouter