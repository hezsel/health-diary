const immunization = require('./services/immunization')

const create = (req, res) => {
  immunization.create(req.user.id, req.body)
    .then((user) => {
      res.json(user)
    })
}
const update = (req, res) => {
  immunization.update(req.user.id, req.params.id, req.body)
    .then((user) => {
      res.json(user)
    })
}
const remove = (req, res) => {
  immunization.remove(req.user.id, req.params.id)
    .then((user) => {
      res.json(user)
    })
}
const list = (req, res) => {
  immunization.list(req.user.id)
    .then((user) => {
      res.json(user)
    })
}

module.exports = {
  create,
  update,
  remove,
  list,
}
