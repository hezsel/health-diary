const { create: createUser } = require('./services/user')

const create = (req, res) => {
  createUser(req.body)
    .then((user) => {
      res.json(user)
    })
}

module.exports = { create }
