const diagnostic = require('./services/diagnostic')

const create = (req, res) => {
  diagnostic.create(req.user.id, req.body)
    .then((diagnostic) => {
      res.json({ diagnostic })
    })
}

const update = (req, res) => {
  diagnostic.update(req.user.id, req.params.id, req.body)
    .then((diagnostic) => {
      res.json({ diagnostic })
    })
}

const remove = (req, res) => {
  diagnostic.remove(req.user.id, req.params.id)
    .then((diagnostic) => {
      res.json({ diagnostic })
    })
}

const list = (req, res) => {
  diagnostic.list(req.user.id)
    .then((diagnostics) => {
      res.json({ diagnostics })
    })
}

module.exports = {
  create,
  update,
  remove,
  list,
}
