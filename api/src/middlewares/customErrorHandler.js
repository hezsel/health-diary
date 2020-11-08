const {
  is,
} = require('ramda')

const {
  CustomError,
} = require('../errors')

const isCustomError = error => is(CustomError, error)

const customErrorHandler = (error, req, res, next) => {
  if (isCustomError(error)) {
    res.status(error.httpStatusCode)
    res.json(error.toResponse())
    return
  }

  next(error)
}

module.exports = customErrorHandler
