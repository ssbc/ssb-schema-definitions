const tangleRoot = {
  type: 'object',
  required: ['root', 'previous'],
  properties: {
    root: { type: 'null' },
    previous: { type: 'null' }
  }
}

const tangleUpdate = {
  type: 'object',
  required: ['root', 'previous'],
  properties: {
    root: { $ref: '#/definitions/messageId' },
    previous: {
      type: 'array',
      item: { $ref: '#/definitions/messageId' },
      minItems: 1
    }
  }
}

const tangle = {
  oneOf: [
    { $ref: '#/definitions/tangleRoot' },
    { $ref: '#/definitions/tangleUpdate' }
  ]
}

module.exports = {
  tangleRoot,
  tangleUpdate,
  tangle
}
