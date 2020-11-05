const {
  show: showExample,
  showLogged: showExampleLogged,
} = require('./services/example')

const show = (req, res) => {
  showExample()
    .then((example) => {
      res.json(example)
    })
}

const showLogged = (req, res) => {
  showExampleLogged(req.user)
    .then((example) => {
      res.json(example)
    })
}

module.exports = {
  show,
  showLogged,
}
