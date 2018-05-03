// const models = require('./models')
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  // middleware needs to be passed in before the controller
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
}
