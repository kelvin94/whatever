const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

// joi is a library to validate reqquest.body.query or request.parameters

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: `email already used`
      })
    }
    // console.log('models', models)
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'login info is wrong'
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'login info is wrong'
        })
      }
      return res.send({
        user: user.toJSON(),
        token: jwtSignUser(user.toJSON())
      })
    } catch (err) {
      res.status(500).send({
        error: `login info is wrong`
      })
    }
    // console.log('models', models)
  }
}
