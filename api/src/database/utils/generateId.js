const cuid = require('cuid')

module.exports = (prefix) => {
  return () => `${prefix}_${cuid()}`
}
