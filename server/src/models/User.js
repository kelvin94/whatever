module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    // this 2nd arg is OPTIONS
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  })
}
