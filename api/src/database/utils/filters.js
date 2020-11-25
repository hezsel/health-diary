const { Op } = require('sequelize')
const {
  mapObjIndexed,
  pipe,
  reject,
  isNil,
} = require('ramda')

const generateWhereILike = pipe(
  reject(isNil),
  mapObjIndexed(value => ({
    [Op.iLike]: `%${value}%`
  })),
)

module.exports = {
  generateWhereILike,
}
