const userSchema = require('./user')
const sessionSchema = require('./session')
const immunizationSchema = require('./immunization')
const immunizationCodeSchema = require('./immunizationCode')
const diagnosticSchema = require('./diagnostic')
const diagnosticCodeSchema = require('./diagnosticCode')
const scheduleSchema = require('./schedule')
const attachmentSchema = require('./attachment')

module.exports = {
  userSchema,
  sessionSchema,
  immunizationSchema,
  immunizationCodeSchema,
  diagnosticSchema,
  diagnosticCodeSchema,
  scheduleSchema,
  attachmentSchema,
}
