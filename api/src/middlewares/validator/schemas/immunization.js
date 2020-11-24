const BaseJoi = require('joi')
const JoiDate = require('@hapi/joi-date')

const Joi = BaseJoi.extend(JoiDate)

const immunization = {
  validation: Joi.object().keys({
    immunizationCodeId: Joi.string().required(),
    userId: Joi.string().required(),
    date: Joi.date().format('YYYY-MM-DD').required(),
    location: Joi.string().optional().allow(null),
    lotNumber: Joi.string().optional().allow(null),
    expirationDate: Joi.date().format('YYYY-MM-DD').optional().allow(null),
    doseQuantity: Joi.string().optional().allow(null),
    location: Joi.string().optional().allow(null),
  }),
  error: 'invalid_immunization',
}

const schemas = {
  create: immunization,
  update: immunization,
}

module.exports = schemas