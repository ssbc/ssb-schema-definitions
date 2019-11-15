const test = require('tape')
const Validator = require('is-my-json-valid')
const Definitions = require('../')

const feedId = '@0000000000000000000000000000000000000000000=.ed25519'

test('isValidRecps', (t) => {
  const isValid = Validator({
    $schema: 'http://json-schema.org/schema#',
    type: 'object',
    required: ['recps'],
    properties: {
      recps: { $ref: '#/definitions/recps' }
    },
    definitions: Definitions()
  })

  const arrayRecps = {
    recps: [
      feedId,
      feedId,
      feedId
    ]
  }

  t.true(isValid(arrayRecps), 'valid')

  const missingProperty = {}

  t.false(isValid(missingProperty), 'missing recps')

  const mentionArrayRecps = {
    recps: [
      {
        link: feedId,
        name: 'dan'
      },
      {
        link: feedId,
        name: 'gabby'
      },
      {
        link: feedId,
        name: 'jerry'
      }
    ]
  }

  t.true(isValid(mentionArrayRecps), 'valid')

  const mixedArrayRecps = {
    recps: [
      feedId,
      {
        link: feedId,
        name: 'dan'
      },
      {
        link: feedId,
        name: 'gabby'
      },
      {
        link: feedId,
        name: 'jerry'
      }
    ]
  }

  t.true(isValid(mixedArrayRecps), 'valid')

  t.end()
})
