const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const customErrorHandler = require('./customErrorHandler')
const internalServerErrorHandler = require('./internalServerErrorHandler')
const notFoundErrorHandler = require('./notFoundErrorHandler')

const middlewares = (app) => {
  app.use(cors())
  app.use(bodyParser.json({ limit: '200kb' }))
  routes(app)
  app.use(customErrorHandler)
  app.use(internalServerErrorHandler)
  app.use(notFoundErrorHandler)
}

module.exports = middlewares
