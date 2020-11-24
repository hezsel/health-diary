const Joi = require('joi')

const filters = {
  validation: Joi.object().keys({
    name: Joi.string().optional(),
  }),
  error: 'invalid_immunization_filters',
}

const schemas = {
  filters,
}

module.exports = schemas
