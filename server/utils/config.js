require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let JWT_SECRET = process.env.JWT_SECRET
let APP_URL = process.env.APP_URL
let AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
let AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY

let EMAIL_ADDRESS = process.env.EMAIL_ADDRESS
let EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  APP_URL,
  MONGODB_URI,
  PORT,
  JWT_SECRET,
  AWS_SECRET_KEY,
  AWS_ACCESS_KEY,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD
}