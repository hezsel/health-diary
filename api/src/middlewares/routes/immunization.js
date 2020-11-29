const express = require('express')
const isAuthenticated = require('../isAuthenticated')
const {
  create,
  update,
  remove,
  list,
} = require('../../controllers/immunization')
const validator = require('../validator')
const {
  immunizationSchema: {
    create: createSchema,
    update: updateSchema,
  },
} = require('../validator/schemas')
const router = express.Router()

router
  .get('/', isAuthenticated, list)
  .post('/', isAuthenticated, validator(createSchema, 'body'), create)
  .put('/:id', isAuthenticated, validator(updateSchema, 'body'), update)
  .delete('/:id', isAuthenticated, remove)

module.exports = router
