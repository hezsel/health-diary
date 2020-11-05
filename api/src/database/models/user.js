const { STRING } = require('sequelize')
const generateId = require('../../utils/generateId')

module.exports = {
  create(sequelize) {
    const User = sequelize.define('User', {
      id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: generateId('user'),
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      password: {
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
            email: this.get('email'),
          }
        },
      },
    })

    return User
  },
}
