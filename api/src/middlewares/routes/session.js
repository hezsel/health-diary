const express = require('express')
const isAuthenticated = require('../isAuthenticated')
const {
  get,
  create,
  remove,
} = require('../../controllers/session')
const validator = require('../validator')
const {
  sessionSchema: {
    create: createSchema,
    remove: removeSchema,
  },
} = require('../validator/schemas')
const router = express.Router()

router
  .get('/', isAuthenticated, get)
  .post('/', validator(createSchema, 'body'), create)
  .delete('/', validator(removeSchema, 'body'), isAuthenticated, remove)

module.exports = router
