const userSchema = require('./user')
const sessionSchema = require('./session')
const immunizationSchema = require('./immunization')
const immunizationCodeSchema = require('./immunizationCode')
const diagnosticSchema = require('./diagnostic')
const diagnosticCodeSchema = require('./diagnosticCode')

module.exports = {
  userSchema,
  sessionSchema,
  immunizationSchema,
  immunizationCodeSchema,
  diagnosticSchema,
  diagnosticCodeSchema,
}
