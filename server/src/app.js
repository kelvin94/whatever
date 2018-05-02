const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan') // morga is for logging error/info mesages

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json()) // let express app to parse json request
app.use(cors()) // let any host get access this
app.get('/status', (req, res) => {
  res.send({
    message: 'hello'
  })
})
app.listen(process.env.PORT || 8081)
