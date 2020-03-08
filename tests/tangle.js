const test = require('tape')
const Validator = require('is-my-json-valid')
const Definitions = require('..')

test('isTangle', t => {
  const isValid = Validator({
    $schema: 'http://json-schema.org/schema#',
    type: 'object',
    required: ['tangle'],
    properties: {
      tangle: { $ref: '#/definitions/tangle'}
    },
    definitions: Definitions()
  })

  t.false(isValid({
    tangle: null
  }), 'null tangle')

  t.true(isValid({
    tangle: {
      root: null,
      previous: null
    }
  }), 'null tangle properties')

  t.true(isValid({
    tangle: {
      root: '%og6G1zCagfm7iodppYz10ytwhjubROjzpncU+Tfe6vU=.sha256',
      previous: [
        '%47drdibEae85Bo1+qKYKbH2Hlkb+CV6afDioPAe/QiE=.sha256',
        '%rMeiWMvDx0Hgy8d5Zn4QM5ldJNDeIIF3fkoSYlO3iQc=.sha256'
      ]
    }
  }), 'full tangle')

  

  t.false(isValid({
    tangle: {
      root: 'rootId',
      previous: null
    }
  }), 'bad root')

  t.false(isValid({
    tangle: {
      root: '%rootId',
      previous: 'previousId'
    }
  }), 'bad previous - not an array')

  t.false(isValid({
    tangle: {
      root: '%rootId',
      previous: [
        '%47drdibEae85Bo1+qKYKbH2Hlkb+CV6afDioPAe/QiE=.sha256'
      ]
    }
  }), 'bad previous - one item')

  t.end()
})