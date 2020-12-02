const immunization = require('./services/immunization')

const create = (req, res) => {
  immunization.create(req.user.id, req.body)
    .then((immunization) => {
      res.json({ immunization })
    })
}

const update = (req, res) => {
  immunization.update(req.user.id, req.params.id, req.body)
    .then((immunization) => {
      res.json({ immunization })
    })
}

const remove = (req, res) => {
  immunization.remove(req.user.id, req.params.id)
    .then((immunization) => {
      res.json({ immunization })
    })
}

const list = (req, res) => {
  immunization.list(req.user.id, req.query)
    .then((immunizations) => {
      res.json({ immunizations })
    })
}

module.exports = {
  create,
  update,
  remove,
  list,
}
