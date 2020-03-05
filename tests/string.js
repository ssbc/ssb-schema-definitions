const test = require('tape')
const Validator = require('is-my-json-valid')
const Definitions = require('..')

test('isString', t => {
  const isValid = Validator({
    $schema: 'http://json-schema.org/schema#',
    type: 'object',
    required: ['string'],
    properties: {
      string: { $ref: '#/definitions/string'}
    },
    definitions: Definitions()
  })

  t.true(isValid({
    string: {
      set: 'cherese'
    }
  }), 'valid string')

  t.true(isValid({
    string: {
      set: ''
    }
  }), 'empty string')

  t.false(isValid({
    string: {
      set: null
    }
  }), 'null string')

  t.false(isValid({
    string: {
      set: 123456789
    }
  }), 'invalid integer')

  t.end()
})