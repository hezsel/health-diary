const { STRING } = require('sequelize')
const generateId = require('../utils/generateId')

module.exports = {
  create(sequelize) {
    const DiagnosticCode = sequelize.define('DiagnosticCode', {
      id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: generateId('diag_code'),
      },
      code: {
        type: STRING,
        allowNull: false,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      version: {
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
            code: this.get('code'),
            version: this.get('version'),
            url: this.get('url'),
          }
        },
      },
    })

    return DiagnosticCode
  },
}
