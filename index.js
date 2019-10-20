const primitives = require('./definition/primitives')
const mentions = require('./definition/mentions')
const contentWarning = require('./definition/content-warning')
const image = require('./definition/image')

module.exports = function Definitions () {
  return Object.assign(
    {},
    primitives, // required
    { mentions },
    { contentWarning },
    { image }
  )
}
