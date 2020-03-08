module.exports = {
  type: 'object',
  required: ['root', 'previous'],
  properties: {
    root: { $ref: '#/definitions/messageId'},
    previous: {
      type: 'array',
      item: { $ref: '#/definitions/messageId'},
      minItems: 1
    }
  }
}
