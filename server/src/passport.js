const passport = require('passport')
const {User} = require('./models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('./config/config')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // if someone make a request to our server, and the req hsa a bearer token
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    // custom logic to verify and return msg
    try {
      const user = await User.findOne({
        where: {
          id: jwtPayload.id
        }
      })
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user) // done(null, user) will set user as part of the request attribute === req.user
    } catch (error) {
      return done(new Error(), false)
    }
  })
)

module.exports = null
