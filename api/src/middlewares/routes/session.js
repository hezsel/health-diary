const express = require('express')
const isAuthenticated = require('../isAuthenticated')
const {
  get,
  create,
  remove,
} = require('../../controllers/session')

const router = express.Router()

router
  .get('/', isAuthenticated, get)
  .post('/', create)
  .delete('/', isAuthenticated, remove)

module.exports = router
