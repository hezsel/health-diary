const example = require('./example')

const routes = (app) => {
  app.use('/example', example)
}

module.exports = routes
