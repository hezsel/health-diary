const show = async () => {
  return {
    example: 'hello there',
  }
}
const showLogged = async (user) => {
  return {
    example: `hello there ${user.name}`,
  }
}

module.exports = {
  show,
  showLogged,
}
