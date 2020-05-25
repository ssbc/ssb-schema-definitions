const test = require('tape')
const Validator = require('is-my-json-valid')
const Definitions = require('../')

test('isValidBox', (t) => {
  const isValid = Validator({
    $ref: '#/definitions/box',
    definitions: Definitions()
  })

  const fine = 'abcdefg.box'
  t.true(isValid(fine), 'valid')

  const notFine = 'abcdefgbox'
  t.false(isValid(notFine), 'no period before box')

  t.end()
})
