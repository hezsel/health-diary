const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')

const middlewares = (app) => {
  app.use(cors())
  app.use(bodyParser.json({ limit: '200kb' }))
  routes(app)
}

module.exports = middlewares
