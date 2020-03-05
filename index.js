const primitives = require('./definition/primitives')
const mentions = require('./definition/mentions')
const contentWarning = require('./definition/content-warning')
const image = require('./definition/image')
const tombstone = require('./definition/tombstone')
const tangle = require('./definition/tangle')
const tangles = require('./definition/tangles')

const definitions = Object.assign(
  {},
  primitives, // required
  { mentions },
  { contentWarning },
  { image },
  { tombstone },
  { tangle },
  { tangles }
)

module.exports = function Definitions () {
  return clone(definitions)
}

function clone (obj) {
  return require('lodash.clone')(obj)
  // return JSON.parse(JSON.stringify(obj)) // fails
  // return Object.assign({}, obj) // too shallow
}
