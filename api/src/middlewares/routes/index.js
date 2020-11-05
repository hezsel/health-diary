const example = require('./example')
const user = require('./user')
const session = require('./session')

const routes = (app) => {
  app.use('/example', example)
  app.use('/user', user)
  app.use('/session', session)
}

module.exports = routes
