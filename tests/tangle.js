const test = require('tape')
const Validator = require('is-my-json-valid')
const Definitions = require('..')

test('isTangle', t => {
  const tests = [
    /* rootTangle */
    () => {
      const isValid = Validator({
        $schema: 'http://json-schema.org/schema#',
        type: 'object',
        required: ['tangle'],
        properties: {
          tangle: { $ref: '#/definitions/tangle/root' }
        },
        definitions: Definitions()
      })

      t.true(
        isValid({ tangle: { root: null, previous: null } }),
        'rootTangle passes'
      )
      t.false(
        isValid({ tangle: { previous: null } }),
        'rootTangle fails (missing root)'
      )
      t.false(
        isValid({ tangle: { root: null } }),
        'rootTangle fails (missing previous)'
      )
      t.false(
        isValid({
          tangle: {
            root: '%og6G1zCagfm7iodppYz10ytwhjubROjzpncU+Tfe6vU=.sha256',
            previous: ['%asdasdasgfm7iodppYz10ytwhjubROjzpncU+Tfe6vU=.sha256']
          }
        }),
        'tangleRoot fails (not update)'
      )
    },

    /* tangleUpdate */
    () => {
      const isValid = Validator({
        $schema: 'http://json-schema.org/schema#',
        type: 'object',
        required: ['tangle'],
        properties: {
          tangle: { $ref: '#/definitions/tangle/update' }
        },
        definitions: Definitions()
      })

      t.true(
        isValid({
          tangle: {
            root: '%og6G1zCagfm7iodppYz10ytwhjubROjzpncU+Tfe6vU=.sha256',
            previous: ['%asdasdasgfm7iodppYz10ytwhjubROjzpncU+Tfe6vU=.sha256']
          }
        }),
        'tangleUpdate passes'
      )
      t.false(
        isValid({
          tangle: {
            previous: ['%asdasdasgfm7iodppYz10ytwhjubROjzpncU+Tfe6vU=.sha256']
          }
        }),
        'tangleUpdate fails (missing root)'
      )
      t.false(
        isValid({
          tangle: {
            root: 'roote!',
            previous: ['%asdasdasgfm7iodppYz10ytwhjubROjzpncU+Tfe6vU=.sha256']
          }
        }),
        'tangleUpdate fails (malformed root)'
      )
      t.false(
        isValid({
          tangle: {
            root: '%og6G1zCagfm7iodppYz10ytwhjubROjzpncU+Tfe6vU=.sha256',
            previous: []
          }
        }),
        'tangleUpdate fails (malformed previous)'
      )
      t.false(
        isValid({ tangle: { root: null, previous: null } }),
        'tangleUpate fails (not root)'
      )
    },

    /* tangle (general definition) */
    () => {
      const isValid = Validator({
        $schema: 'http://json-schema.org/schema#',
        type: 'object',
        required: ['tangle'],
        properties: {
          tangle: { $ref: '#/definitions/tangle/any' }
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
    },

    /* multiple tangles */
    () => {
      const isValid = Validator({
        $schema: 'http://json-schema.org/schema#',
        type: 'object',
        required: ['tangles'],
        properties: {
          tangles: {
            artefact: { $ref: '#/definitions/tangle/any' },
            profile: { $ref: '#/definitions/tangle/any' },
            view: { $ref: '#/definitions/tangle/any' },
            relationship: { $ref: '#/definitions/tangle/any' },
            link: { $ref: '#/definitions/tangle/any' }
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
          artefact: nullProperties
        }
      }), 'all tangles - null properties')

      t.true(isValid({
        tangles: {
          profile: fullProperties,
          view: fullProperties,
          link: fullProperties,
          relationship: fullProperties,
          artefact: fullProperties
        }
      }), 'all tangles - full properties')
    }
  ]

  tests.forEach(f => f())

  t.end()
})
