const Joi = require('joi')

const create = {
  validation: Joi.object().keys({
    type: Joi.string()
      .valid('diagnostic', 'immunization')
      .required(),
    id: Joi.string()
      .required(),
  }),
  error: 'attachment_invalid',
}

module.exports = {
  create,
}
