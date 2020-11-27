const { Immunization, ImmunizationCode } = require('../../database')

const create = (userId, attributes) => Immunization.create({
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
  attributes: [
    'id',
    'date',
    'location',
    'lotNumber',
    'expirationDate',
    'doseQuantity',
    'observation',
    'updatedAt',
    'createdAt',
  ],
  include: [
    {
      model: ImmunizationCode,
      as: 'immunizationCode',
      required: true,
      attributes: [
        'id',
        'name',
        'code',
        'version',
        'url',
      ],
    },
  ],
})

module.exports = {
  create,
  update,
  remove,
  list,
}
