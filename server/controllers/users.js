const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const cryptoRandomString = require('crypto-random-string')
const nodemailer = require('nodemailer')
const { auth } = require('../utils/middleware')
require('dotenv').config

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
    response.json(users.map(user => user.toJSON()))
  }
  catch (err) {
    response.status(404).json({ msg: err })
  }
})

usersRouter.post('/', async (request, response) => {
  const { username, email, password } = request.body

  if (!username || !email || !password) {
    response.status(400).json({ msg: 'Please enter all fields.' })
  }

  const user = await User.findOne({ email })
  if (user) {
    return response.status(400).json({ msg: 'User already exists' })
  }

  const newUser = new User({
    username,
    email,
    password
  })  

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err
      newUser.password = hash
      newUser.save().then(user => {
        jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err
          response.json({
            token,
            user: { id: user.id, name: user.username, email: user.email }
          })
        })
      })
    })
  })
})

usersRouter.post('/save-coffee', auth, async (request, response) => {
  try {
    const id = request.user.id
    const user = await User.findById(id)
    user.saved_coffees.push(request.body.coffeeId)
    const savedUser = await user.save()
    response.json(savedUser.toJSON())
  }
  catch (err) {
    response.status(404).json({ msg: err })
  }
})

usersRouter.post('/forgot-password', async (request, response) => {
  if (request.body.email === '') {
    response.status(400).send('email is required')
  }
  const user = await User.findOne({ email: request.body.email }).exec()
  if (user === null) {
    response.status(403).send('email not found')
  }
  
  const token = cryptoRandomString({ length: 32, type: 'url-safe' })
  user.reset_password_token = token
  user.reset_password_expires= Date.now() + 600000
  await user.save()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  })
  
  const mailOptions = {
    from: `${process.env.EMAIL_ADDRESS}`,
    to: `${user.email}`,
    subject: 'Reset Baroasta Password',
    text:
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
      + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
      + `${process.env.APP_URL}/password-reset/${token}\n\n`
      + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
  }
  
  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.error('there was an error: ', err)
    } else {
      response.status(200).send('recovery email sent')
    }
  })
})

usersRouter.get('/password-reset/:token', async (request, response) => {
  const user = await User.findOne({ reset_password_token: request.params.token, reset_password_expires: { $gt: Date.now() } })
  if (user === null || !user) {
    response.status(403).json({ msg: 'Password reset link is invalid or has expired' })
  }
  else {
    response.status(200).send('password reset ok')
  }
})

usersRouter.post('/update-password', async (request, response) => {
  
})

usersRouter.get('/current-user', auth, async (request, response) => {
  try {
    const user = await User.findById(request.user.id).populate('saved_coffees')
    response.json(user.toJSON())
  }
  catch (err) {
    response.status(404).json({ msg: err })
  }
})

module.exports = usersRouter