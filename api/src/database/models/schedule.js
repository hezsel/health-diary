const { STRING, DATEONLY, TIME } = require('sequelize')
const generateId = require('../utils/generateId')

module.exports = {
  create(sequelize) {
    const Schedule = sequelize.define('Schedule', {
      id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: generateId('sche'),
      },
      immunizationCodeId: {
        type: STRING,
        allowNull: true,
        references: {
          model: 'ImmunizationCode',
          key: 'id',
        },
      },
      diagnosticCodeId: {
        type: STRING,
        allowNull: true,
        references: {
          model: 'DiagnosticCode',
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
      name: {
        type: STRING,
        allowNull: false,
      },
      date: {
        type: DATEONLY,
        allowNull: false,
      },
      time: {
        type: TIME,
        allowNull: true,
      },
      location: {
        type: STRING,
        allowNull: true,
      },
      observation: {
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
            diagnosticCodeId: this.get('diagnosticCodeId'),
            userId: this.get('userId'),
            name: this.get('name'),
            date: this.get('date'),
            time: this.get('time'),
            location: this.get('location'),
            observation: this.get('observation'),
          }
        },
      },
    })

    return Schedule
  },
  associate(Schedule, {
    ImmunizationCode,
    DiagnosticCode,
    User,
  }) {
    Schedule.belongsTo(ImmunizationCode, {
      foreignKey: 'immunizationCodeId',
      as: 'immunizationCode',
    })
    Schedule.belongsTo(DiagnosticCode, {
      foreignKey: 'diagnosticCodeId',
      as: 'diagnosticCode',
    })
    Schedule.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    })
  },
}
