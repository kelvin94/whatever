// create an Express middleware which will validate data coming into AuthController
const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    // validate the data coming in
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        // string must be characters from a-z, 0-9 and length from 8-32
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    // 'validate' method to compare req.body to schema we define above
    const {error} = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'password provided faile to macth following rules:'
          })
          break
        default:
          res.status(400).send({
            error: 'unsure what goes wrong..'
          })
      }
    } else {
      next()
    }
  }
}
