const {User} = require('../models')
// joi is a library to validate reqquest.body.query or request.parameters
module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        error: `email already used`
      })
    }
    // console.log('models', models)
  }
}
