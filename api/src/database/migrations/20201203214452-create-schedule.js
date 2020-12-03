module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Schedule', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    diagnostic_code_id: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'DiagnosticCode',
        key: 'id',
      },
    },
    immunization_code_id: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'ImmunizationCode',
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
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: true,
    },
    location: {
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
    queryInterface.dropTable('Schedule')
  },
}
