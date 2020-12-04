const { ImmunizationCode } = require('../../database')
const { generateWhereILike } = require('../../database/utils/filters')

const list = (filters) => ImmunizationCode.findAll({
  where: generateWhereILike(filters),
  limit: 20,
})

module.exports = {
  list,
}
