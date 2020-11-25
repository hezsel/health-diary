const express = require('express')
const { create } = require('../../controllers/user')
const validator = require('../validator')
const {
  userSchema: { create: createSchema },
} = require('../validator/schemas')
const router = express.Router()

router
  .post('/', validator(createSchema, 'body'), create)

module.exports = router
