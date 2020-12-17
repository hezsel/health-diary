const { Immunization, ImmunizationCode, Attachment } = require('../../database')
const { generateWhereILike } = require('../../database/utils/filters')

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

const list = (userId, filters) => Immunization.findAll({
  where: {
    userId,
    ...generateWhereILike(filters),
  },
  attributes: [
    'id',
    'date',
    'location',
    'lotNumber',
    'expirationDate',
    'doseQuantity',
    'observation',
    'fhirInput',
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
    {
      model: Attachment,
      as: 'attachments',
      required: false,
      attributes: [
        'id',
        'originalFileName',
      ],
    },
  ],
})

const getById = (userId, id) => Immunization.findOne({
  where: {
    id, 
    userId,
  },
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
  ]
}).then((immunization) => ({
  ...immunization.formatted,
  immunizationCode: immunization.immunizationCode.formatted
}))

module.exports = {
  create,
  update,
  remove,
  list,
  getById,
}
