const example = require('./example')
const user = require('./user')
const session = require('./session')
const immunization = require('./immunization')
const immunizationCode = require('./immunizationCode')
const diagnostic = require('./diagnostic')
const diagnosticCode = require('./diagnosticCode')
const schedule = require('./schedule')

const routes = (app) => {
  app.use('/example', example)
  app.use('/user', user)
  app.use('/session', session)
  app.use('/immunization', immunization)
  app.use('/immunization_code', immunizationCode)
  app.use('/diagnostic', diagnostic)
  app.use('/diagnostic_code', diagnosticCode)
  app.use('/schedule', schedule)
}

module.exports = routes
