const user = {
  id: 'user_ckh42wdxc00005quc3k4m1lxn',
  name: 'Dev',
  email: 'dev@test.com',
  password: '$2b$10$8kzfJ6KQKjrWa3xkSqFFRuDYCcbD1DbpoKdK.1cYRBsHcE/HPdS6K',
  created_at: '2020-11-24T22:42:00.770Z',
  updated_at: '2020-11-24T22:42:00.770Z',
}

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('User', [{
    ...user,
  }], {}),
  down: queryInterface => queryInterface.sequelize.query(`
    DELETE FROM "User" WHERE id = '${user.id}';
  `),
}

