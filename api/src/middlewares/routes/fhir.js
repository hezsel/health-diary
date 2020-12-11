const express = require('express')
const isAuthenticated = require('../isAuthenticated')
const {
  importResource,
  exportResource,
} = require('../../controllers/fhir')
const router = express.Router()

router
  .get(
    '/immunization/:id',
    isAuthenticated,
    exportResource('Immunization'),
  )
  .get(
    '/diagnostic/:id',
    isAuthenticated,
    exportResource('DiagnosticReport'),
  )
  .post(
    '/',
    isAuthenticated,
    importResource,
  )

module.exports = router
