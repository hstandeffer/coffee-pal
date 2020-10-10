const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

usersRouter.post('/', (request, response) => {
  const { username, email, password } = request.body

  if (!username || !email || !password) {
    return response.status(400).json({ msg: 'Please enter all fields.' })
  }

  User.findOne({ email })
    .then(user => {
      if (user) return response.status(400).json({ msg: 'User already exists.' })

      const newUser = new User({
        username,
        email,
        password
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err

          newUser.password = hash
          console.log(newUser)
          newUser.save()
          .then(user => {
            jwt.sign(
              { id: user.id },
              config.JWT_SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                return response.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.username,
                    email: user.email
                  }
                })
              }
            )
          })
        })
      })
    })
})

module.exports = usersRouter