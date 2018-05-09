// 备注 this is for showing how to do association for two models
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {})

  History.associate = function (models) {
    History.belongsTo(models.User)
    History.belongsTo(models.Song)
  }
  return History
}
