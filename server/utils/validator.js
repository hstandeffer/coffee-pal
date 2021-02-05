const { body, validationResult } = require('express-validator')

const contactValidation = () => {
  return [
    body('email').isEmail(),
    body('message').notEmpty()
  ]
}

const signInValidation = () => {
  return [
    body('email').isEmail(),
    body('password').notEmpty()
  ]
}

const signUpValidation = () => {
  return [
    body('email').isEmail(),
    body('username').notEmpty(),
    body('password').notEmpty(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
  
      return true;
    }),
  ]
}

const roasterValidation = () => {
  return [
    body('name').notEmpty(),
    body('summary').notEmpty(),
    body('website').isURL(),
  ]
}

const coffeeValidation = () => {
  return [
    body('coffeeName').notEmpty(),
    body('selectedBrand').notEmpty(),
    body('price').isNumeric(),
    body('roastType').isIn(['light', 'medium', 'dark']),
    body('url').isURL(),
  ]
}

const forgotPwValidation = () => {
  return [
    body('email').isEmail()
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
  signInValidation,
  signUpValidation,
  roasterValidation,
  coffeeValidation,
  forgotPwValidation,
  validate
}