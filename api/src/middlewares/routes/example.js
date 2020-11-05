const express = require('express')
const isAuthenticated = require('../isAuthenticated')
const { show, showLogged } = require('../../controllers/example')

const router = express.Router()

router
  .get('/', show)
  .get('/only_logged_in', isAuthenticated, showLogged)

module.exports = router
