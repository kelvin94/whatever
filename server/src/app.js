const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan') // morga is for logging error/info mesages
const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json()) // let express app to parse json request
app.use(cors()) // let any host get access this
require('./routes')(app) // 这里可以这样是因为routes.js export a function which takes an express instance as argument

// sequelize.sync will connect to the database, create the table if the table is not existed
sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT || 8081)
    console.log(`server running on port ${config.port}`)
  })
