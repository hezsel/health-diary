const fhir = require('./services/fhir')

const importResource = (req, res) => {
  fhir.importResource(req.user.id, req.body)
    .then((fhir) => {
      res.json({ fhir })
    })
}

const exportResource = resourceType => (req, res) => {
  fhir.exportResource(req.user.id, req.params.id, resourceType)
    .then((fhir) => {
      res.json({ fhir })
    })
}


module.exports = {
  importResource,
  exportResource,
}
