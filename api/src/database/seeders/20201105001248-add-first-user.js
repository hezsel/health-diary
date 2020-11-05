const userId = 'user_ckh42wdxc00005quc3k4m1lxn'

const user = {
  id: userId,
  name: 'Dev',
  email: 'dev@test.com',
  password: '$2b$10$8kzfJ6KQKjrWa3xkSqFFRuDYCcbD1DbpoKdK.1cYRBsHcE/HPdS6K',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('User', [{
    ...user,
  }], {}),
  down: queryInterface => queryInterface.sequelize.query(`
    DELETE FROM "User" WHERE id = '${userId}';
  `),
}

