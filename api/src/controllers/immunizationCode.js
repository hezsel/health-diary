const immunizationCode = require('./services/immunizationCode')

const list = (req, res) => immunizationCode.list(req.query)
  .then((immunizations) => {
    res.json({ immunizations })
  })

module.exports = {
  list,
}
