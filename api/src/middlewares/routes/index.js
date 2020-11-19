const example = require('./example')
const user = require('./user')
const session = require('./session')
const immunization = require('./immunization')

const routes = (app) => {
  app.use('/example', example)
  app.use('/user', user)
  app.use('/session', session)
  app.use('/immunization', immunization)
}

module.exports = routes
