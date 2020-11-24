const { ImmunizationCode } = require('../../database')
const { generateWhereILike } = require('../../database/utils/filters')

const list = (filters) => ImmunizationCode.findAll({
  where: generateWhereILike(filters),
})

module.exports = {
  list,
}
