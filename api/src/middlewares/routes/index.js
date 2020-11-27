const example = require('./example')
const user = require('./user')
const session = require('./session')
const immunization = require('./immunization')
const immunizationCode = require('./immunizationCode')
const diagnostic = require('./diagnostic')
const diagnosticCode = require('./diagnosticCode')

const routes = (app) => {
  app.use('/example', example)
  app.use('/user', user)
  app.use('/session', session)
  app.use('/immunization', immunization)
  app.use('/immunizationCode', immunizationCode)
  app.use('/diagnostic', diagnostic)
  app.use('/diagnosticCode', diagnosticCode)
}

module.exports = routes
