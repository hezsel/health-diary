const {
  CONFLICT,
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  SERVICE_UNAVAILABLE,
  INTERNAL_SERVER_ERROR,
} = require('http-status-codes')

const {
  omit,
} = require('ramda')

class CustomError extends Error {
  toResponse(omitFields = []) {
    return omit(['httpStatusCode', ...omitFields], this)
  }
}

class ConflictError extends CustomError {
  constructor(error = {}) {
    super(error.message)

    this.errorCode = error.errorCode
    this.type = 'conflictError'
    this.errorMessage = error.message
    this.errors = error.errors || {}
    this.httpStatusCode = CONFLICT
  }
}

class BadRequestError extends CustomError {
  constructor(error = {}) {
    super(error.message)

    this.errorCode = error.errorCode
    this.type = 'badRequestError'
    this.errorMessage = error.message
    this.errors = error.errors || {}
    this.httpStatusCode = BAD_REQUEST
  }
}

class ForbiddenError extends CustomError {
  constructor(error = {}) {
    super(error.message)

    this.errorCode = error.errorCode
    this.type = 'forbiddenError'
    this.errorMessage = error.message
    this.httpStatusCode = FORBIDDEN
  }
}

class NotFoundError extends CustomError {
  constructor(error = {}) {
    super(error.message)

    this.errorMessage = error.message
    this.errorCode = error.errorCode
    this.type = 'notFoundError'
    this.httpStatusCode = NOT_FOUND
  }
}

class ServiceUnavailableError extends CustomError {
  constructor(error = {}) {
    super(error.message)

    this.errorMessage = error.message
    this.errorCode = error.errorCode
    this.type = 'serviceUnavailableError'
    this.httpStatusCode = SERVICE_UNAVAILABLE
  }
}

class InternalServerError extends CustomError {
  constructor(error = {}) {
    super(error.message)

    this.errorMessage = error.message
    this.errorCode = error.errorCode
    this.type = 'internalServerError'
    this.httpStatusCode = INTERNAL_SERVER_ERROR
    if (process.env.NODE_ENV !== 'production') {
      this.errors = error.errors
    }
  }
}

module.exports = {
  CustomError,
  ConflictError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ServiceUnavailableError,
  InternalServerError,
}
