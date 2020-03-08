const test = require('tape')
const Validator = require('is-my-json-valid')
const Definitions = require('..')

test('isTangles', t => {
  const isValid = Validator({
    $schema: 'http://json-schema.org/schema#',
    type: 'object',
    required: ['tangles'],
    properties: {
      tangles: {
        artefact: { $ref: '#/definitions/tangle' },
        profile: { $ref: '#/definitions/tangle' },
        view: { $ref: '#/definitions/tangle' },
        relationship: { $ref: '#/definitions/tangle' },
        link: { $ref: '#/definitions/tangle' }
      }
    },
    definitions: Definitions()
  })
  
  const nullProperties = {
    root: null,
    previous: null
  }

  const fullProperties = {
    root: '%og6G1zCagfm7iodppYz10ytwhjubROjzpncU+Tfe6vU=.sha256',
    previous: [
      '%47drdibEae85Bo1+qKYKbH2Hlkb+CV6afDioPAe/QiE=.sha256',
      '%rMeiWMvDx0Hgy8d5Zn4QM5ldJNDeIIF3fkoSYlO3iQc=.sha256'
    ]
  }

  t.true(isValid({
    tangles: {
      profile: nullProperties,
      view: nullProperties,
      link: nullProperties,
      relationship: nullProperties,
      artefact: nullProperties,
    }
  }), 'all tangles - null properties')

  t.true(isValid({
    tangles: {
      profile: fullProperties,
      view: fullProperties,
      link: fullProperties,
      relationship: fullProperties,
      artefact: fullProperties,
    }
  }), 'all tangles - full properties')
  
  t.end()
})
