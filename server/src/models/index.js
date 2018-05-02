const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

// the functionality to read through models folder
fs
  .readdirSync(__dirname) // read through currenct directory and return an array of file name
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    // import method takes a url to import a model file
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

// gave access to both 'sequelize' and 'Sequelize' object in other files that are importing this index.js file

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
