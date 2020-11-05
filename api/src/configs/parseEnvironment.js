const parseEnvironment = env => ({
  server: {
    port: env.PORT,
  },
  database: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT,
    logging: env.DB_LOGGING,
    seederStorage: 'sequelize',
    url: env.DATABASE_URL,
  },
})

module.exports = parseEnvironment
