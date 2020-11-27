const { STRING, DATE } = require('sequelize')
const generateId = require('../utils/generateId')

module.exports = {
  create(sequelize) {
    const Diagnostic = sequelize.define('Diagnostic', {
      id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: generateId('diag'),
      },
      diagnosticCodeId: {
        type: STRING,
        allowNull: false,
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
      date: {
        type: DATE,
        allowNull: false,
      },
      result: {
        type: STRING,
        allowNull: true,
      },
      performer: {
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
            diagnosticCodeId: this.get('diagnosticCodeId'),
            userId: this.get('userId'),
            date: this.get('date'),
            result: this.get('result'),
            performer: this.get('performer'),
            observation: this.get('observation'),
          }
        },
      },
    })

    return Diagnostic
  },
  associate(Diagnostic, {
    DiagnosticCode,
    User,
  }) {
    Diagnostic.belongsTo(DiagnosticCode, {
      foreignKey: 'diagnosticCodeId',
      as: 'diagnosticCode',
    })
    Diagnostic.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    })
  },
}
