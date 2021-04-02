const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const { transporter } = require('../utils/mail')
const cryptoRandomString = require('crypto-random-string')
const { auth, authAdmin } = require('../utils/middleware')
const { signToken } = require('../utils/authToken')
const { forgotPwValidation, signUpValidation, validate } = require('../utils/validator')

usersRouter.post('/', signUpValidation(), validate, async (request, response) => {
  const { username, email, password } = request.body

  const user = await User.findOne({ email })
  
  if (user) {
    return response.status(400).json({ error: 'User already exists' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({ username, email, password: passwordHash })

  try {
    const savedUser = await newUser.save()
    const token = signToken({ id: savedUser._id })
  
    return response.json({
      token,
      user: { id: savedUser.id, name: savedUser.savedUsername, email: savedUser.email }
    })
  }
  catch (err) {
    return response.json({ error: 'User already exists' })
  }
})

usersRouter.post('/save-coffee', auth, async (request, response) => {
  const id = request.user.id
  const coffeeId = request.body.coffeeId

  const user = await User.findById(id)
  const isFavorited = user.saved_coffees.some((c) => {
    return c.equals(coffeeId)
  })
  if (!isFavorited) {
    user.saved_coffees.push(coffeeId)
    const savedUser = await user.save()
    return response.status(200).json(savedUser.toJSON())
  }

  return response.json(user.toJSON())
})

// this is removing a saved coffee, need to rename route
usersRouter.put('/delete-coffee', auth, async (request, response) => {
  const id = request.user.id
  const coffeeId = request.body.coffeeId

  const user = await User.findById(id)
  const isFavorited = user.saved_coffees.some((c) => {
    return c.equals(coffeeId)
  })

  if (isFavorited) {
    user.saved_coffees.pull(coffeeId)
    const savedUser = await user.save()
    return response.json(savedUser.toJSON())
  }
  return response.status(400).json({ msg: 'Coffee is not favorited' })
})

usersRouter.post('/forgot-password', forgotPwValidation(), validate, async (request, response) => {
  const user = await User.findOne({ email: request.body.email }).exec()

  if (user === null) {
    response.status(403).json({ error: 'Email not found' })
  }
  
  const token = cryptoRandomString({ length: 32, type: 'url-safe' })
  user.reset_password_token = token
  user.reset_password_expires= Date.now() + 600000
  await user.save()
  
  const mailOptions = {
    from: `${config.EMAIL_ADDRESS}`,
    to: `${user.email}`,
    subject: 'Reset Baroasta Password',
    text:
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
      + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
      + `${config.APP_URL}/password-reset/${token}\n\n`
      + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
  }
  
  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      return response.status(400).json({ error: 'The password reset email could not be sent'})
    } else {
      return response.status(200).json({ msg: 'recovery email sent' })
    }
  })
})

usersRouter.get('/password-reset/:token', async (request, response) => {
  const user = await User.findOne({ reset_password_token: request.params.token, reset_password_expires: { $gt: Date.now() } })
  if (user === null || !user) {
    response.status(403).json({ error: 'Password reset link is invalid or has expired' })
  }
  else {
    response.status(200).json({ msg: 'password reset ok' })
  }
})

usersRouter.put('/update-password', async (request, response) => {
  // this could instead use JWT to decode rather than searching by the token, but should work well too
  const { password, token } = request.body
  const user = await User.findOne({ reset_password_token: token, reset_password_expires: { $gt: Date.now() } })
  if (user === null || !user) {
    response.status(403).json({ error: 'Password reset link is invalid or has expired' })
  }

  if (!password) {
    response.status(400).json({ error: 'Please enter a new password.' })
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return response.status(400).json({ error: 'Something went wrong, please try again.' })
      }
      user.password = hash
      user.reset_password_token = null
      user.reset_password_expires = null
      // could automatically log user in here if you want
      user.save().then(() => {
        response.status(200).json({ msg: 'Password successfully updated' })
      })
    })
  })
})

usersRouter.put('/change-password', auth, async (request, response) => {
  const { password } = request.body
  const user = await User.findById(request.user.id)

  if (!user) {
    return response.status(400).json({ error: 'User does not exist' })
  }

  if (!password) {
    response.status(400).json({ error: 'Please enter a new password.' })
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err
      user.password = hash
      user.reset_password_token = null
      user.reset_password_expires = null
      // could automatically log user in here if you want
      user.save().then(() => {
        response.status(200).json({ msg: 'Password successfully updated' })
      })
    })
  })
})

usersRouter.put('/update', auth, async (request, response) => {
  const { name, favoriteCoffee, favoriteBrewing } = request.body
  const updateObj = {
    name: name,
    favorite_coffee_type: favoriteCoffee,
    favorite_brewing_method: favoriteBrewing,
  }

  const user = await User.findByIdAndUpdate(request.user.id,
    updateObj,
    { new: true },
  )

  if (!user) {
    return response.status(400).json({ error: 'User does not exist' })
  }
  
  await user.save()
  return response.json(user.toJSON())
})

usersRouter.get('/current-user', auth, async (request, response) => {
  const user = await User.findById(request.user.id)
    .populate({
      path: 'saved_coffees',
      model: 'Coffee',
      populate: {
        path: 'roaster',
        model: 'Roaster'
      }
    })

  if (!user) {
    return response.status(400).json({ error: 'User does not exist' })
  }
  
  return response.json(user.toJSON())
})

module.exports = usersRouter