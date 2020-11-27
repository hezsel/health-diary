const immunizationCode = require('./services/immunizationCode')

const list = (req, res) => immunizationCode.list(req.query)
  .then((immunizationCodes) => {
    res.json({ immunizationCodes })
  })

module.exports = {
  list,
}
