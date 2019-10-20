const primitives = require('./definition/primitives')
const mentions = require('./definition/mentions')
const contentWarning = require('./definition/content-warning')
const image = require('./definition/image')

const definitions = Object.assign(
  {},
  primitives, // required
  { mentions },
  { contentWarning },
  { image }
)

module.exports = function Definitions () {
  return clone(definitions)
}

function clone (obj) {
  return require('lodash.clone')(obj)
  // return JSON.parse(JSON.stringify(obj)) // fails
  // return Object.assign({}, obj) // too shallow
}
