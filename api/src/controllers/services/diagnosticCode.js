const { DiagnosticCode } = require('../../database')
const { generateWhereILike } = require('../../database/utils/filters')

const list = (filters) => DiagnosticCode.findAll({
  where: generateWhereILike(filters),
})

module.exports = {
  list,
}
