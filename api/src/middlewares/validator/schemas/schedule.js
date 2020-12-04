const BaseJoi = require('joi')
const JoiDate = require('@hapi/joi-date')

const Joi = BaseJoi.extend(JoiDate)

const schedule = {
  validation: Joi.object().keys({
    immunizationCodeId: Joi.string().optional(),
    diagnosticCodeId: Joi.string().optional(),
    name: Joi.string().optional(),
    date: Joi.date().format('YYYY-MM-DD').required(),
    time: Joi.date().format('HH:mm').required(),
    location: Joi.string().optional().allow(null),
    observation: Joi.string().optional().allow(null),
  }),
  error: 'invalid_schedule',
}

const schemas = {
  create: schedule,
  update: schedule,
}

module.exports = schemas
