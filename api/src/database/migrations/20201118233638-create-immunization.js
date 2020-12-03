module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Immunization', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    immunization_code_id: {
      type: Sequelize.STRING,
      allowNull: false,
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
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lot_number: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    expiration_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    dose_quantity: {
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
    queryInterface.dropTable('Immunization')
  },
}
