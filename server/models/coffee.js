const mongoose = require('mongoose')

const coffeeSchema = new mongoose.Schema({
  countries: {
    type: Array,
    required: false
  },
  currency: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  fairTrade: {
    type: Boolean,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  organic: {
    type: Boolean,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  roastType: {
    type: String,
    required: false
  },
  shadeGrown: {
    type: Boolean,
    required: false
  },
  siteName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  url: {
    type: String,
    required: false
  },
})

coffeeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Coffee', coffeeSchema)