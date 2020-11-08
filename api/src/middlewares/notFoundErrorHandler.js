const { NotFoundError } = require('../errors')

const notFoundErrorHandler = (req, res) => {
  const notFoundError = new NotFoundError({
    message: `Cannot ${req.method} ${req.url}`,
    errorCode: 'route_not_found',
  })

  res.status(notFoundError.httpStatusCode)
  res.json(notFoundError.toResponse())
}

module.exports = notFoundErrorHandler
