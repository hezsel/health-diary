require('dotenv').config()
const express = require('express')

const app = express()

const middlewares = require('./middlewares')

middlewares(app)

const { server } = require('./configs')

app.listen(server.port, () => {
  console.log(`App listening on port ${server.port}`)
})
