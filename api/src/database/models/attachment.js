const { STRING } = require('sequelize')
const generateId = require('../utils/generateId')

module.exports = {
  create(sequelize) {
    const Attachment = sequelize.define('Attachment', {
      id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: generateId('att'),
      },
      fileName: {
        type: STRING,
        allowNull: false,
      },
      originalFileName: {
        type: STRING,
        allowNull: false,
      },
      extension: {
        type: STRING,
        allowNull: false,
      },
      immunizationId: {
        type: STRING,
        allowNull: true,
        references: {
          model: 'Immunization',
          key: 'id',
        },
      },
      diagnosticId: {
        type: STRING,
        allowNull: true,
        references: {
          model: 'Diagnostic',
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
    }, {
      timestamps: true,
      paranoid: true,
    })

    return Attachment
  },
  associate(Attachment, {
    Diagnostic,
    Immunization,
    User,
  }) {
    Attachment.belongsTo(Diagnostic, {
      foreignKey: 'diagnosticId',
      as: 'diagnostic',
    })
    Attachment.belongsTo(Immunization, {
      foreignKey: 'immunizationId',
      as: 'immunization'
    })
    Attachment.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    })
  },
}
