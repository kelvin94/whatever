const Promise = require('bluebird') // bluebird is a promise library
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs')) // promisifyAll will take any methods in 'bcrypt-nodejs' that have a callback structure wrapping them to have promise structure.

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then((salt) => {
      return bcrypt.hashAsync(user.password, salt, null)
    })
    .then((hash) => {
      return user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // this 2nd arg is OPTIONS
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      // beforeCreate: hashPassword,
      // beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }
  return User
}
