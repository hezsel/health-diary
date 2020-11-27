const BaseJoi = require('joi')
const JoiDate = require('@hapi/joi-date')

const Joi = BaseJoi.extend(JoiDate)

const diagnostic = {
  validation: Joi.object().keys({
    diagnosticCodeId: Joi.string().required(),
    date: Joi.date().format('YYYY-MM-DD').required(),
    result: Joi.string().optional().allow(null),
    performer: Joi.string().optional().allow(null),
    observation: Joi.string().optional().allow(null),
  }),
  error: 'invalid_diagnostic',
}

const schemas = {
  create: diagnostic,
  update: diagnostic,
}

module.exports = schemas
