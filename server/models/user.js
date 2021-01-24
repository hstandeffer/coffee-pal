const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String
  },
  imagePath: {
    type: String
  },
  saved_coffees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coffee'
  }],
  favorite_coffee_type: {
    type: String
  },
  favorite_brewing_method: {
    type: String
  },
  reset_password_token: String,
  reset_password_expires: Date
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

userSchema.index({ username: 1 })

module.exports = mongoose.model('User', userSchema)