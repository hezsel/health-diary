const express = require('express')
const multer = require('multer')
const { create, show, remove } = require('../../controllers/attachment')
const isAuthenticated = require('../isAuthenticated')
const validator = require('../validator')
const { attachmentSchema } = require('../validator/schemas')

const upload = multer()

const router = express.Router()

router
  .post(
    '/',
    isAuthenticated,
    upload.single('attachment'),
    validator(attachmentSchema.create, 'query'),
    create,
  )
  .get( '/:id', isAuthenticated, show)
  .delete('/:id', isAuthenticated, remove)

module.exports = router
