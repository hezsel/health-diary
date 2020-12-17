module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Attachment', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    file_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    original_file_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    extension: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    diagnostic_id: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'Diagnostic',
        key: 'id',
      },
    },
    immunization_id: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'Immunization',
        key: 'id',
      },
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    deleted_at: {
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => {
    queryInterface.dropTable('Attachment')
  },
}
