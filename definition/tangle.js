module.exports = {
  oneOf: [
    {
      type: 'object',
      required: ['root', 'previous'],
      properties: {
        root: { type: 'null' },
        previous: { type: 'null' }
      }
    },
    {
      type: 'object',
      required: ['root', 'previous'],
      properties: {
        root: { $ref: '#/definitions/messageId' },
        previous: {
          type: 'array',
          items: { $ref: '#/definitions/messageId'},
          minItems: 1
        }
      }
    }
  ]
}