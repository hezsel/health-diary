const {
  create: createAttachment,
  show: showAttachment,
  remove: removeAttachment,
} = require('./services/attachment')

const create = (req, res, next) => {
  createAttachment(req.user, req.file, req.query)
    .then((attachment) => {
      res.json(attachment)
    })
    .catch(next)
}

const show = (req, res, next) => {
  showAttachment(req.user, req.params.id)
    .then((attachment) => {
      res.json(attachment)
    })
    .catch(next)
}

const remove = (req, res, next) => {
  removeAttachment(req.user, req.params.id)
    .then((attachment) => {
      res.json(attachment)
    })
    .catch(next)
}

module.exports = {
  create,
  show,
  remove,
}
