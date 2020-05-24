const test = require('tape')
const Validator = require('is-my-json-valid')
const Definitions = require('../')

const blobId = '&1ZQM7TjQHBUEcdBijB6y7dkX047wCf4aXcjFplTjrJo=.sha256'
const unbox = 'YmNz1XfPw/xkjoN594ZfE/JUhpYiGyOOQwNDf6DN+54=.boxs'

test('isImage', t => {
  const isValid = Validator({
    $schema: 'http://json-schema.org/schema#',
    type: 'object',
    required: ['avatar'],
    properties: {
      avatar: { $ref: '#/definitions/image' }
    },
    definitions: Definitions()
  })

  isValid({
    avatar: {
      blob: blobId,
      mimeType: 'image/png',
      unbox,
      size: 512,
      width: 300,
      height: 200
    }
  })
  t.equal(isValid.errors, null, 'full')

  t.true(
    isValid({
      avatar: {
        blob: blobId,
        mimeType: 'image/png'
      }
    }), 'minimal'
  )

  t.false(
    isValid({
      avatar: {
        blob: 'http://somelink',
        mimeType: 'image/png'
      }
    }), 'bad blob'
  )
  t.false(
    isValid({
      avatar: {
        blob: '&things',
        mimeType: 'image/png'
      }
    }), 'bad blob 2'
  )

  t.false(
    isValid({
      avatar: {
        blob: blobId,
        unbox: 'woop',
        mimeType: 'image/png'
      }
    }), 'bad unbox (too short)'
  )
  t.false(
    isValid({
      avatar: {
        blob: blobId,
        unbox: 'YmNz1XfPw/xkjoN594ZfE/JUhpYiGyOOQwNDf6DN+woooboxs',
        mimeType: 'image/png'
      }
    }), 'bad unbox (no .boxs suffix)'
  )

  t.false(
    isValid({
      avatar: {
        blob: blobId,
        mimeType: 'png'
      }
    }), 'bad mimeType'
  )

  t.false(
    isValid({
      avatar: {
        blob: blobId,
        mimeType: 'image/png',
        size: 4.5
      }
    }), 'bad size'
  )

  t.end()
})
