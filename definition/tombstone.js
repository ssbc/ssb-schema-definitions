module.exports = {
  oneOf: [
    { type: 'null' },
    {
      type: 'object',
      required: ['date'],
      properties: {
        date: { type: 'integer' }, // a Unix timestamp
        reason: { type: 'string' }
      }
    }
  ]
}
