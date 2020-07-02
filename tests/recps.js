const test = require('tape')
const Validator = require('is-my-json-valid')
const { generate } = require('ssb-keys')
const Definitions = require('..')

const FeedId = () => {
  return generate().id
}

const msgId = '%THxjTGPuXvvxnbnAV7xVuVXdhDcmoNtDDN0j3UTxcd8=.sha256'
const groupId = '%nAV7xVTHxjTGPuXvvxnbuVXdhDcmoNtDDN0j3UTxcd8=.cloaked'

test('recipients/box1 (aka recps)', t => {
  const isValid = Validator({
    $schema: 'http://json-schema.org/schema#',
    type: 'object',
    required: ['recps'],
    properties: {
      recps: { $ref: '#/definitions/recps' }
    },
    definitions: Definitions()
  })

  const recps = []
  for (let i = 0; i < 7; i++) recps.push(FeedId())

  isValid({ recps })
  t.equal(isValid.errors, null, `${recps.length} recps`)

  t.false(isValid({ recps: [msgId] }), 'msgId invalid')
  t.false(isValid({ recps: [groupId] }), 'groupId invalid')
  t.false(isValid({ recps: [...recps, FeedId()] }), '8 recps invalid')
  t.false(isValid({ recps: [] }), '[] invalid')
  t.false(isValid({ recps: 'cat' }), '"cat" invalid')

  t.end()
})

test('recipients/box2', t => {
  const isValid = Validator({
    $schema: 'http://json-schema.org/schema#',
    type: 'object',
    required: ['recps'],
    properties: {
      recps: { $ref: '#/definitions/recipients/box2' }
    },
    definitions: Definitions()
  })

  const recps = [groupId]
  for (let i = 0; i < 16 - 1; i++) recps.push(FeedId())

  isValid({ recps })
  t.equal(isValid.errors, null, `${recps.length} recps`)

  t.true(isValid({ recps: [groupId] }), 'groupId')
  t.true(isValid({ recps: [FeedId()] }), 'feedId')

  t.false(isValid({ recps: [msgId] }), 'msgId invalid')
  t.false(isValid({ recps: [groupId, groupId] }), '[groupId, groupId] invalid')
  t.false(isValid({ recps: [groupId, msgId] }), '[groupId, msgId] invalid')
  t.false(isValid({ recps: [...recps, FeedId()] }), '17 recps invalid')
  t.false(isValid({ recps: [] }), '[] invalid')
  t.false(isValid({ recps: 'cat' }), '"cat" invalid')

  t.end()
})
