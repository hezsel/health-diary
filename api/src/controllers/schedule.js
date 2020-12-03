const schedule = require('./services/schedule')

const create = (req, res) => {
  schedule.create(req.user.id, req.body)
    .then((schedule) => {
      res.json({ schedule })
    })
}

const update = (req, res) => {
  schedule.update(req.user.id, req.params.id, req.body)
    .then(() => {
      res.json('success')
    })
}

const remove = (req, res) => {
  schedule.remove(req.user.id, req.params.id)
    .then((schedule) => {
      res.json({ schedule })
    })
}

const list = (req, res) => {
  schedule.list(req.user.id)
    .then((schedules) => {
      res.json({ schedules })
    })
}

module.exports = {
  create,
  update,
  remove,
  list,
}
