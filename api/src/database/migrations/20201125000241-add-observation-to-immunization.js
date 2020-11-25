module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Immunization', 'observation', {
    type: Sequelize.STRING(1000),
    allowNull: true,
  }),

  down: queryInterface => queryInterface.removeColumn('Immunization', 'observation'),
}
