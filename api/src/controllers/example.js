const { show: showExample } = require('./services/example')

const show = (req, res) => {
  showExample()
    .then((example) => {
      res.json(example)
    })
}

module.exports = { show }
