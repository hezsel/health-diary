const bcrypt = require('bcrypt')

const saltRounds = 10

const encrypt = async (password) => await bcrypt.hash(password, saltRounds)

const compareHash = async (password, hash) => bcrypt.compare(password, hash)

module.exports = {
  encrypt,
  compareHash,
}
