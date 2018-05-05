// const models = require('./models')
const AuthenticationController = require('./controllers/AuthenticationController')
const SongsController = require('./controllers/SongsController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  // middleware needs to be passed in before the controller
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)

  app.post('/login', AuthenticationController.login)

  app.get('/songs', SongsController.index)

  app.post('/songs', SongsController.post)

  app.get('/songs/:songId', SongsController.show)

  app.put('/songs/:songId', SongsController.put)
}
