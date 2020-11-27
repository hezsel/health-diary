const { Diagnostic, DiagnosticCode } = require('../../database')

const create = (userId, attributes) => Diagnostic.create({
  ...attributes,
  userId,
}).then((diagnostic) => diagnostic.formatted)

const update = (userId, id, attributes) => Diagnostic.update(
  attributes,
  {
    where: { id, userId },
  },
)

const remove = (userId, id) => Diagnostic.destroy({
  where: { id, userId },
})

const list = (userId) => Diagnostic.findAll({
  where: { userId },
  attributes: [
    'id',
    'date',
    'result',
    'performer',
    'observation',
    'updatedAt',
    'createdAt',
  ],
  include: [
    {
      model: DiagnosticCode,
      as: 'diagnosticCode',
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