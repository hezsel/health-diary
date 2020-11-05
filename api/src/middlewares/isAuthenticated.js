const Promise = require('bluebird')
const passport = require('passport')
const { Strategy } = require('passport-http-bearer')
const { getByToken: getSessionByToken } = require('../controllers/services/session')

const nodeifyPromiseCreator = createPromise => (value, callback) => (
  Promise.resolve(createPromise(value)).asCallback(callback)
)
const getUserByToken = nodeifyPromiseCreator(async (token) => {
  const session = await getSessionByToken(token)

  if (!session) return null

  return session.User
})

passport.use('bearer', new Strategy(getUserByToken))

const isAuthenticated = passport.authenticate('bearer', { session: false })

module.exports = isAuthenticated
