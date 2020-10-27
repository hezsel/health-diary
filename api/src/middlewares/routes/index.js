const example = require('./example')
const user = require('./user')

const routes = (app) => {
  app.use('/example', example)
  app.use('/user', user)
}

module.exports = routes
