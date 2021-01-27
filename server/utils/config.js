require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let JWT_SECRET = process.env.JWT_SECRET
let APP_URL = 'http://localhost:3000'
let AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
let AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
let NODE_ENV = process.env.NODE_ENV

let EMAIL_ADDRESS = process.env.EMAIL_ADDRESS
let EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  APP_URL,
  MONGODB_URI,
  PORT,
  NODE_ENV,
  JWT_SECRET,
  AWS_SECRET_KEY,
  AWS_ACCESS_KEY,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD
}