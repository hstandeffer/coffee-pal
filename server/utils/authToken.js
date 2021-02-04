const jwt = require('jsonwebtoken')
const config = require('./config')

const signToken = (payload, options) => 
  jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: '180 days',
    ...options
  })

module.exports = { signToken }