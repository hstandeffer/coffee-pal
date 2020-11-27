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
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  website: {
    type: String,
    required: false
  },
  imagePath: {
    type: String,
    required: false
  }
})

roasterSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Roaster', roasterSchema)