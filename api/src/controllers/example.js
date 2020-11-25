const example = require('./services/example')

const show = (req, res) => {
  example.show()
    .then((example) => {
      res.json(example)
    })
}

const showLogged = (req, res) => {
  example.showLogged(req.user)
    .then((example) => {
      res.json(example)
    })
}

module.exports = {
  show,
  showLogged,
}
