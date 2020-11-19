const express = require('express')
const isAuthenticated = require('../isAuthenticated')
const {
  create,
  update,
  remove,
  list,
} = require('../../controllers/immunization')

const router = express.Router()

router
  .get('/', isAuthenticated, list)
  .post('/', isAuthenticated, create)
  .put('/', isAuthenticated, update)
  .delete('/', isAuthenticated, remove)

module.exports = router
