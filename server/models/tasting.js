const mongoose = require('mongoose')

const tastingSchema = new mongoose.Schema({
  brewMethod: {
    type: String,
    required: true
  },
  coffeeTemperature: {
    type: String,
    required: true
  },
  grindSize: {
    type: String,
    required: true
  },
  brewTime: {
    type: String,
    required: true
  },
  coffeeWeight: {
    type: String,
    required: true
  },
  waterWeight: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  coffee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coffee'
  }
})

tastingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Tasting', tastingSchema)