const test = require('tape')
const Validator = require('is-my-json-valid')
const Definitions = require('..')

test('isInteger', t => {
  const isValid = Validator({
    $schema: 'http://json-schema.org/schema#',
    type: 'object',
    required: ['integer'],
    properties: {
      integer: { $ref: '#/definitions/integer'}
    },
    definitions: Definitions()
  })

  t.true(isValid({
    integer: {
      set: 123456789
    }
  }), 'valid integer')

  t.false(isValid({
    integer: {
      set: ''
    }
  }), 'empty string')

  t.false(isValid({
    integer: {
      set: null
    }
  }), 'null value')

  t.false(isValid({
    integer: {
      set: 'string'
    }
  }), 'invalid integer')

  t.end()
})