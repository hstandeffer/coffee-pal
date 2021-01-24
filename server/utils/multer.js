const aws = require('aws-sdk')
const multer  = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')
const config = require('../utils/config')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

if (config.NODE_ENV === 'production') {
  const s3 = new aws.S3()

  aws.config.update({
    secretAccessKey: config.AWS_SECRET_KEY,
    accessKeyId: config.AWS_ACCESS_KEY,
    region: 'us-east-1'
  }) 
  
  storage = multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'baroasta',
    key: function (req, file, cb) {
      let newFileName = Date.now() + '-' + file.originalname
      let fullPath = 'images/' + newFileName
      cb(null, fullPath)
    }
  })
}

let upload = multer({
  storage: storage
})

module.exports = {
  upload
}