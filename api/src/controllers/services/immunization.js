const { Immunization } = require('../../database')

const create = async (userId, attributes) => Immunization.create({
  ...attributes,
  userId,
}).then((immunization) => immunization.formatted)

const update = (userId, id, attributes) => Immunization.update(
  attributes,
  {
    where: { id, userId },
  },
)

const remove = (userId, id) => Immunization.destroy({
  where: { id, userId },
})

const list = (userId) => Immunization.findAll({
  where: { userId },
})

module.exports = {
  create,
  update,
  remove,
  list,
}
