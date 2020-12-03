const { Schedule, DiagnosticCode, ImmunizationCode } = require('../../database')

const create = (userId, attributes) => Schedule.create({
  ...attributes,
  userId,
}).then((schedule) => schedule.formatted)

const update = (userId, id, attributes) => Schedule.update(
  attributes,
  {
    where: { id, userId },
  },
)

const remove = (userId, id) => Schedule.destroy({
  where: { id, userId },
})

const list = (userId) => Schedule.findAll({
  where: { userId },
  attributes: [
    'id',
    'date',
    'time',
    'location',
    'observation',
    'updatedAt',
    'createdAt',
  ],
  include: [
    {
      model: DiagnosticCode,
      as: 'diagnosticCode',
      required: false,
      attributes: [
        'id',
        'name',
        'code',
        'version',
        'url',
      ],
    },
    {
      model: ImmunizationCode,
      as: 'immunizationCode',
      required: false,
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
