const { body, validationResult } = require('express-validator')

const contactValidation = () => {
  return [
    body('email').isEmail(),
    body('message').notEmpty()
  ]
}

const validate = (request, response, next) => {
  const errors = validationResult(request)

  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  next()
}

module.exports = {
  contactValidation,
  validate
}