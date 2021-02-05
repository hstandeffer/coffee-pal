const config = require('../utils/config')
const jwt = require('jsonwebtoken')

const getAuthTokenFromRequest = request => {
  const header = request.get('Authorization') || ''
  const [bearer, token] = header.split(' ')
  return bearer === 'Bearer' && token ? token : null
}

const auth = (request, response, next) => {
  const token = getAuthTokenFromRequest(request)

  if (!token) {
    return response.status(401).json({ msg: 'Authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET)

    request.user = decoded
    next()
  } catch (e) {
    response.status(400).json({ msg: 'Invalid token' })
  }
}

const requestLogger = (request, response, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('----')
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Authentication token is invalid' })
  }

  next(error)
}

module.exports = {
  auth,
  errorHandler,
  requestLogger
}