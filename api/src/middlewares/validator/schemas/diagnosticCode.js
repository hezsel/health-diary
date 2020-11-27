const Joi = require('joi')

const filters = {
  validation: Joi.object().keys({
    name: Joi.string().optional(),
  }),
  error: 'invalid_diagnostic_code_filters',
}

const schemas = {
  filters,
}

module.exports = schemas
