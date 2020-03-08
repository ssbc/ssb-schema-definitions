module.exports = {
  type: 'object',
  required: ['set'],
  properties: {
    set: {
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
  }
}
