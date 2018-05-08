// const models = require('./models')
const AuthenticationController = require('./controllers/AuthenticationController')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  // middleware needs to be passed in before the controller
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)

  app.post('/login', AuthenticationController.login)

  app.get('/songs', SongsController.index)

  app.post('/songs', SongsController.post)

  app.get('/songs/:songId', SongsController.show)

  app.put('/songs/:songId', SongsController.put)

  app.get('/bookmarks', BookmarksController.index)

  app.post('/bookmarks', BookmarksController.post)

  app.delete('/bookmarks/:bookmarkId', BookmarksController.delete)
}
