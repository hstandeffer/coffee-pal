const contactRouter = require('express').Router()
const { sendMail } = require('../utils/mail')

contactRouter.post('/', async (request, response) => {
  if (request.body.email === '') {
    return response.json(400).send('Email is required')
  }

  sendMail(null, request.body.email, 'Baroasta Contact Form', `Message from ${request.body.email}: ${request.body.message}`)

  return response.json({ msg: 'Email successfully sent' })
})

module.exports = contactRouter