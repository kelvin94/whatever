// const models = require('./models')
const AuthenticationController = require('./controllers/AuthenticationController')
const SongsController = require('./controllers/SongsController')
const HistoriesController = require('./controllers/HistoriesController')
const BookmarksController = require('./controllers/BookmarksController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  // middleware needs to be passed in before the controller
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)

  app.post('/login', AuthenticationController.login)

  app.get('/songs', SongsController.index)

  app.post('/songs', SongsController.post)

  app.get('/songs/:songId', SongsController.show)

  app.put('/songs/:songId', SongsController.put)

  app.get('/bookmarks', isAuthenticated, BookmarksController.index)

  app.post('/bookmarks', isAuthenticated, BookmarksController.post)

  app.delete('/bookmarks/:bookmarkId', isAuthenticated, BookmarksController.delete)

  app.get('/histories', isAuthenticated, HistoriesController.index)

  app.post('/histories', isAuthenticated, HistoriesController.post)
}
