const { STRING } = require('sequelize')
const generateId = require('../../utils/generateId')

module.exports = {
  create(sequelize) {
    const ImmunizationCode = sequelize.define('ImmunizationCode', {
      id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: generateId('immu_code'),
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      url: {
        type: STRING,
        allowNull: false,
      },
    }, {
      timestamps: true,
      paranoid: true,
      getterMethods: {
        formatted() {
          return {
            id: this.get('id'),
            name: this.get('name'),
            url: this.get('url'),
          }
        },
      },
    })

    return ImmunizationCode
  },
  associate(ImmunizationCode, {
    Immunization,
  }) {
    ImmunizationCode.hasMany(Immunization, {
      foreignKey: 'immunizationCodeId',
      as: 'immunizations',
    })
  },
}
