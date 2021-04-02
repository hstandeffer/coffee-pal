const contactRouter = require('express').Router()
const { sendMail } = require('../utils/mail')
const { contactValidation, validate } = require('../utils/validator')
const config = require('../utils/config')

contactRouter.post('/', contactValidation(), validate, async (request, response) => {
  sendMail(null, config.EMAIL_ADDRESS, 'Squig Contact Form', `Message from ${request.body.email}: ${request.body.message}`)

  return response.status(200).json({ msg: 'Email successfully sent' })
})

module.exports = contactRouter