const { STRING } = require('sequelize')
const generateId = require('../../utils/generateId')

module.exports = {
  create(sequelize) {
    const Session = sequelize.define('Session', {
      id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: generateId('session'),
      },
      userId: {
        type: STRING,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      token: {
        type: STRING,
        allowNull: false,
      },
    }, {
      timestamps: true,
      paranoid: true,
    })

    return Session
  },
  associate(Session, { User }) {
    Session.belongsTo(User, {
      foreignKey: 'userId',
    })
  },
}
