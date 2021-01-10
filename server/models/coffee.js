const mongoose = require('mongoose')

const coffeeSchema = new mongoose.Schema({
  countries: {
    type: Array,
    required: false
  },
  fairTrade: {
    type: Boolean,
    required: false
  },
  imagePath: {
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
  roaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roaster'
  },
  shadeGrown: {
    type: Boolean,
    required: false
  },
  brand: {
    type: String,
    required: true
  },
  coffeeName: {
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