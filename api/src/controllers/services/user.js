const { User } = require('../../database')
const { encrypt } = require('../../utils/bcrypt')

const create = async ({
  name,
  email,
  password,
}) => {
  const user = await User.create({
    name,
    email,
    password: await encrypt(password),
  })

  return user.formatted
}

module.exports = {
  create,
}
