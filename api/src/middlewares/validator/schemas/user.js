const Joi = require('joi')

const user = {
  validation: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  error: 'invalid_user',
}

const schemas = {
  create: user,
}

module.exports = schemas
