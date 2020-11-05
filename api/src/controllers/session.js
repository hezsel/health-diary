const session = require('./services/session')

const create = (req, res, next) => {
  session.create(req.body)
    .then((data) => {
      const { token, user } = data
      res.json({ token, user })
    })
    .catch(next)
}

const get = (req, res, next) => {
  session.get(req.headers.authorization, req.user)
    .then(data => res.json(data))
    .catch(next)
}

const remove = (req, res, next) => {
  session.remove(req.body)
    .then(() => res.json({}))
    .catch(next)
}

module.exports = {
  create,
  remove,
  get,
}
