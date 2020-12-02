const BaseJoi = require('joi')
const JoiDate = require('@hapi/joi-date')

const Joi = BaseJoi.extend(JoiDate)

const immunization = {
  validation: Joi.object().keys({
    immunizationCodeId: Joi.string().required(),
    date: Joi.date().format('YYYY-MM-DD').required(),
    location: Joi.string().optional().allow(null),
    lotNumber: Joi.string().optional().allow(null),
    expirationDate: Joi.date().format('YYYY-MM-DD').optional().allow(null),
    doseQuantity: Joi.string().optional().allow(null),
    observation: Joi.string().optional().allow(null),
  }),
  error: 'invalid_immunization',
}

const filters = {
  validation: Joi.object().keys({
    immunizationCodeId: Joi.string().optional(),
    date: Joi.date().format('YYYY-MM-DD').optional(),
  }),
  error: 'invalid_immunization_filters',
}

const schemas = {
  create: immunization,
  update: immunization,
  filters,
}

module.exports = schemas
