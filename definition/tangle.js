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

module.exports = {
  root: tangleRoot,
  update: tangleUpdate,
  any: {
    oneOf: [
      { $ref: '#/definitions/tangle/root' },
      { $ref: '#/definitions/tangle/update' }
    ]
  }
}
