module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ImmunizationCode', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    version: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
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
    queryInterface.dropTable('ImmunizationCode')
  },
}
