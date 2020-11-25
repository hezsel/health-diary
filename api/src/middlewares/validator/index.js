const Joi = require('joi')
const {
  isEmpty,
  pipe,
  path,
  defaultTo,
  map,
  mergeAll,
} = require('ramda')

const {
  BadRequestError,
} = require('../../errors')

const parseErrors = pipe(
  path(['error', 'details']),
  defaultTo([]),
  map(({ path: errorPath, message }) => ({ [errorPath]: message })),
  mergeAll,
)

const getErrorsFromJoi = (
  data,
  schema,
) => schema.validate(data, { abortEarly: false })

const getErrors = pipe(getErrorsFromJoi, parseErrors)

const validator = (schema, from) => (req, res, next)  => {
  const data = req[from]

  const errors = getErrors(data, schema.validation)

  if (isEmpty(errors)) {
    next()
    return
  }

  const error = new BadRequestError({
    errorCode: schema.error,
    errors,
    message: 'Invalid input',
  })

  res.status(error.httpStatusCode).json(error.toResponse())
}

module.exports = validator
