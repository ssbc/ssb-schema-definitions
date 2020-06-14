const test = require('tape')
const Validator = require('is-my-json-valid')
const Definitions = require('..')

const feedId = '@UQ8yZ/dCNDH6U6XhxqAB+WfHsM+IIwES4NNS/0tlTCU=.ed25519'
const msgId = '%FiR41bB1CrsanZA3VgAzoMmHEOl8ZNXWn+GS5vW3E/8=.sha256'
const blobId = '&anZA3VgAzoMmFiR41bB1CrsHEOl8ZNXWn+GS5vW3E/8=.sha256'

test('primitives', t => {
  const tests = [
    () => {
      // FEED ID
      var schema = {
        $schema: 'http://json-schema.org/schema#',
        type: 'object',
        properties: {
          author: { $ref: '#/definitions/feedId' }
        },
        definitions: Definitions()
      }
      var isValid = Validator(schema)

      t.true(
        isValid({ author: feedId }),
        'feedId passes'
      )
      t.false(
        isValid({ author: 'cat' }),
        'not feedId fails'
      )

      console.log('ensure schema REALLY works as JSON')
      schema = JSON.stringify(schema, null, 2)
      isValid = Validator(schema)
      t.true(
        isValid({ author: feedId }),
        'feedId passes'
      )
      t.false(
        isValid({ author: 'cat' }),
        'not feedId fails'
      )
    },

    () => {
      // MESSAGE ID
      var schema = {
        $schema: 'http://json-schema.org/schema#',
        type: 'object',
        properties: {
          forkFrom: { $ref: '#/definitions/messageId' }
        },
        definitions: Definitions()
      }
      var isValid = Validator(JSON.stringify(schema))
      t.true(
        isValid({ forkFrom: msgId }),
        'msgId passes'
      )
      t.false(
        isValid({ forkFrom: 'cat' }),
        'not msgId fails'
      )
    },

    () => {
      // BLOB ID
      var schema = {
        $schema: 'http://json-schema.org/schema#',
        type: 'object',
        properties: {
          avatar: { $ref: '#/definitions/blobId' }
        },
        definitions: Definitions()
      }
      var isValid = Validator(JSON.stringify(schema))
      t.true(
        isValid({ avatar: blobId }),
        'blobId passes'
      )
      t.false(
        isValid({ avatar: 'cat' }),
        'not blobId fails'
      )
    }
    // TODO
    // - channel
    // - root
    // - branch
    // - recps (note this might be change with ssb-private2)
  ]

  tests.forEach(f => f())

  t.end()
})
