const mongoose = require('mongoose')

const roasterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: false
  },
  address: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  website: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  coffees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coffee'
  }]
})

roasterSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

roasterSchema.index({ name: 1 })

module.exports = mongoose.model('Roaster', roasterSchema)