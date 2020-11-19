const { STRING, DATE } = require('sequelize')
const generateId = require('../../utils/generateId')

module.exports = {
  create(sequelize) {
    const Immunization = sequelize.define('Immunization', {
      id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: generateId('immu'),
      },
      immunizationCodeId: {
        type: STRING,
        allowNull: false,
        references: {
          model: 'ImmunizationCode',
          key: 'id',
        },
      },
      userId: {
        type: STRING,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      date: {
        type: DATE,
        allowNull: false,
      },
      location: {
        type: STRING,
        allowNull: true,
      },
      lotNumber: {
        type: STRING,
        allowNull: true,
      },
      expirationDate: {
        type: DATE,
        allowNull: true,
      },
      doseQuantity: {
        type: STRING,
        allowNull: true,
      },
    }, {
      timestamps: true,
      paranoid: true,
      getterMethods: {
        formatted() {
          return {
            id: this.get('id'),
            immunizationCodeId: this.get('immunizationCodeId'),
            userId: this.get('userId'),
            date: this.get('date'),
            location: this.get('location'),
            lotNumber: this.get('lotNumber'),
            expirationDate: this.get('expirationDate'),
            doseQuantity: this.get('doseQuantity'),
          }
        },
      },
    })

    return Immunization
  },
  associate(Immunization, {
    ImmunizationCode,
    User,
  }) {
    Immunization.belongsTo(ImmunizationCode, {
      foreignKey: 'immunizationCodeId',
      as: 'immunizationCode',
    })
    Immunization.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    })
  },
}
