const crypto = require('crypto')
const bcrypt = require('../../utils/bcrypt')
const {
  User,
  Session,
} = require('../../database')

const get = async (authorization, user) => {
  const token = authorization.split(' ')[1]

  return { token, user }
}

const remove = async ({ token }) => {
  const session = await Session.findOne({
    where: {
      token,
    },
  })

  await session.destroy()
}

const throwCredentialError = () => {
  throw new BadRequestError({
    errorCode: 'credential_invalid',
    message: 'Credential invalid',
  })
}

const create = async ({
  email,
  password,
}) => {
  const user = await User.findOne({
    where: {
      email,
    },
  })
  if (!user) throwCredentialError()

  const match = await bcrypt.compareHash(password, user.password)
  if (!match) throwCredentialError()

  const token = await crypto.randomBytes(15).toString('hex')
  await Session.create({
    userId: user.id,
    token,
  })

  return { token, user }
}

const getByToken = async (token) => {
  const session = await Session.findOne({
    include: [{
      model: User,
    }],
    where: {
      token,
    },
  })

  if (!session) return null

  return session
}

module.exports = {
  create,
  remove,
  get,
  getByToken,
}
