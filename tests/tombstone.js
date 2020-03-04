const test = require('tape')
const Validator = require('is-my-json-valid')
const Definitions = require('../')

const date = Date.now()

test('isTombstone', t => {
  const isValid = Validator({
    $schema: 'http://json-schema.org/schema#',
    type: 'object',
    required: ['tombstone'],
    properties: {
      tombstone: { $ref: '#/definitions/tombstone' }
    },
    definitions: Definitions()
  })

  isValid({
    tombstone: {
      set: {
        date: date,
        reason: 'duplicate'
      }
    }
  })
  t.equal(isValid.errors, null, 'full set')

  isValid({
    tombstone: {
      set: null
    }
  })
  t.equal(isValid.errors, null, 'null set')

  t.false(
    isValid({
      tombstone: null
    }), 'no set'
  )

  t.true(
    isValid({
      tombstone: {
        set: {
          date: date
        }
      }
    }), 'minimal'
  )

  t.false(
    isValid({
      tombstone: {
        set: {
          reason: 'duplicate'
        }
      }
    }), 'missing date'
  )


  t.false(
    isValid({
      tombstone: {
        set: {
          date: 'dog'
        }
      }
    }), 'bad date'
  )

  t.false(
    isValid({
      tombstone: {
        set: {
          date: date,
          reason: 12345
        }
      }
    }), 'bad reason'
  )

  t.end()
})
