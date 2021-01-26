const contactRouter = require('express').Router()
const { sendMail } = require('../utils/mail')
const { contactValidation, validate } = require('../utils/validator')

contactRouter.post('/', contactValidation(), validate, async (request, response) => {
  sendMail(null, request.body.email, 'Baroasta Contact Form', `Message from ${request.body.email}: ${request.body.message}`)

  return response.json({ msg: 'Email successfully sent' })
})

module.exports = contactRouter