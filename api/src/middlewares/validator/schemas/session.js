const Joi = require('joi')

const schemas = {
  create: {
    validation: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
    error: 'invalid_login',
  },
  remove: {
    validation: Joi.object().keys({
      token: Joi.string().required(),
    }),
    error: 'invalid_logout',
  },
}

module.exports = schemas
