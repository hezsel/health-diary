require('dotenv').config()
const express = require('express')

const app = express()

const middlewares = require('./middlewares')

middlewares(app)

const port = process.env.PORT

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
