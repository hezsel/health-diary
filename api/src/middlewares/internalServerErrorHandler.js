const { serializeError } = require('serialize-error')
const { InternalServerError } = require('../errors')

const internalServerErrorHandler = (err, req, res, next) => {
  const internalServerError = new InternalServerError({
    message: 'Something wrong is not right',
    errorCode: 'internal_server_error',
    errors: serializeError(err),
  })

  res.status(internalServerError.httpStatusCode)
  res.json(internalServerError.toResponse())
}

module.exports = internalServerErrorHandler
