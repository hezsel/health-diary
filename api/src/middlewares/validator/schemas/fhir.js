const BaseJoi = require('joi')
const JoiDate = require('@hapi/joi-date')

const Joi = BaseJoi.extend(JoiDate)

const exportResourceSchema = {
  validation: Joi.object().keys({
    id: Joi.string().required(),
  }),
  error: 'invalid_data_id',
}

const schemas = {
  exportResourceSchema,
}

module.exports = schemas
