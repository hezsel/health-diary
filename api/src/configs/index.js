const Joi = require('joi')
const configSchema = require('./schema')
const parseEnvironment = require('./parseEnvironment')

const configs = parseEnvironment(process.env)

const { value, error } = configSchema.validate(configs)

if (error) {
  throw error
}

module.exports = value
