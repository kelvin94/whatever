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
    // import method takes a url to import a model file, meaning loading all models file to sequelize instance
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

// gave access to both 'sequelize' and 'Sequelize' object in other files that are importing this index.js file
db.sequelize = sequelize // this is attaching the sequelize object we created in this file
db.Sequelize = Sequelize // this is attaching the Sequelize Library we imported at the top of the file

module.exports = db
