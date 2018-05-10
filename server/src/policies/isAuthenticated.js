const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    // 1st arg in .authenticate is the stragety we define in the passport.js file
    if (err || !user) {
      return res.status(403).send({
        error: 'you donot have access to this resource'
      })
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}
