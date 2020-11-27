const express = require('express')
const isAuthenticated = require('../isAuthenticated')
const { list } = require('../../controllers/diagnosticCode')
const validator = require('../validator')
const {
  diagnosticCodeSchema: {
    filters: filtersSchema,
  },
} = require('../validator/schemas')
const router = express.Router()

router
  .get('/', isAuthenticated, validator(filtersSchema, 'query'), list)

module.exports = router
