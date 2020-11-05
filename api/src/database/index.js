const Sequelize = require('sequelize')
const {
  pipe,
  mapObjIndexed,
  forEachObjIndexed,
  merge,
  isNil,
  ifElse,
  always,
} = require('ramda')
const models = require('./models')
const { database: databaseConfig } = require('../configs')

const {
  database,
  username,
  password,
  url,
} = databaseConfig

const sequelize = new Sequelize(
  ...ifElse(
    isNil,
    always([database, username, password]),
    always([url]),
  )(url),
  merge(databaseConfig, {
    define: {
      underscored: true,
      freezeTableName: true,
    },
  }),
)

const createModels = mapObjIndexed(model => ({
  model,
  instance: model.create(sequelize),
}))

const associateModels = forEachObjIndexed(({ model, instance }) => {
  if (model.associate) {
    model.associate(instance, sequelize.models)
  }
})

pipe(createModels, associateModels)(models)

const db = merge(sequelize.models, { sequelize })

module.exports = db
