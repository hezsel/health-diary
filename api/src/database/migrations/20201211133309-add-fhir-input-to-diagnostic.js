module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Diagnostic', 'fhir_input', {
    type: Sequelize.JSONB,
    allowNull: true,
  }),

  down: queryInterface => queryInterface.removeColumn('Diagnostic', 'fhir_input'),
}
