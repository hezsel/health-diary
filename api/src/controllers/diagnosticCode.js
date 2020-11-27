const diagnosticCode = require('./services/diagnosticCode')

const list = (req, res) => diagnosticCode.list(req.query)
  .then((diagnosticCodes) => {
    res.json({ diagnosticCodes })
  })

module.exports = {
  list,
}
