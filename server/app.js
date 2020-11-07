const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const app = express()

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('../client/build'))
app.use(express.json())
app.use('/api/coffees', require('./controllers/coffees'))
app.use('/api/users', require('./controllers/users'))
app.use('/api/auth', require('./controllers/auth'))

module.exports = app