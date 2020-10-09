const mongoose = require('mongoose')
const express = require('express')
const app = express()
const config = require('./utils/config')
console.log(config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })