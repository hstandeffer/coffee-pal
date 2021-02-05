const mongoose = require('mongoose')

const toMongooseObjectId = (id) => {
  return mongoose.Types.ObjectId(id)
}

module.exports = {
  toMongooseObjectId
}