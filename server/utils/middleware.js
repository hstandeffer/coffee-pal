const config = require('../utils/config')
const jwt = require('jsonwebtoken')

const getAuthTokenFromRequest = request => {
  const header = request.get('Authorization') || '';
  const [bearer, token] = header.split(' ');
  return bearer === 'Bearer' && token ? token : null;
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

module.exports = {
  auth
}