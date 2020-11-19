const user = require('./services/user')

const create = (req, res) => {
  user.create(req.body)
    .then((user) => {
      res.json(user)
    })
}

module.exports = { create }
