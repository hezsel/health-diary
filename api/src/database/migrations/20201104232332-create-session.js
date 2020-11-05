module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Session', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    token: {
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
    queryInterface.dropTable('Session')
  },
}
