const express = require('express')
const isAuthenticated = require('../isAuthenticated')
const {
  create,
  update,
  remove,
  list,
} = require('../../controllers/diagnostic')
const validator = require('../validator')
const {
  diagnosticSchema: {
    create: createSchema,
    update: updateSchema,
    filters: filtersSchema,
  },
} = require('../validator/schemas')
const router = express.Router()

router
  .get('/', isAuthenticated, validator(filtersSchema, 'query'), list)
  .post('/', isAuthenticated, validator(createSchema, 'body'), create)
  .put('/:id', isAuthenticated, validator(updateSchema, 'body'), update)
  .delete('/:id', isAuthenticated, remove)

module.exports = router
