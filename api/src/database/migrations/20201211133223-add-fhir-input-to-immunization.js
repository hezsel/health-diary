module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Immunization', 'fhir_input', {
    type: Sequelize.JSONB,
    allowNull: true,
  }),

  down: queryInterface => queryInterface.removeColumn('Immunization', 'fhir_input'),
}
