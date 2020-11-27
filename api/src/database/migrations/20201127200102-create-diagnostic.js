module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Diagnostic', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    diagnostic_code_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'DiagnosticCode',
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
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    result: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    performer: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    observation: {
      type: Sequelize.STRING,
      allowNull: true,
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
    queryInterface.dropTable('Diagnostic')
  },
}
