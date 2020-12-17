const { STRING, DATEONLY, JSONB } = require('sequelize')
const generateId = require('../utils/generateId')

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
        type: DATEONLY,
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
        type: DATEONLY,
        allowNull: true,
      },
      doseQuantity: {
        type: STRING,
        allowNull: true,
      },
      observation: {
        type: STRING,
        allowNull: true,
      },
      fhirInput: {
        type: JSONB,
        allowNull: true,
      }
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
            observation: this.get('observation'),
            fhirInput: this.get('fhirInput'),
          }
        },
      },
    })

    return Immunization
  },
  associate(Immunization, {
    ImmunizationCode,
    User,
    Attachment,
  }) {
    Immunization.belongsTo(ImmunizationCode, {
      foreignKey: 'immunizationCodeId',
      as: 'immunizationCode',
    })
    Immunization.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    })
    Immunization.hasMany(Attachment, {
      foreignKey: 'immunizationId',
      as: 'attachments',
    })
  },
}
