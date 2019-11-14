module.exports = {
  type: 'object',
  required: ['blob', 'mimeType'],
  properties: {
    blob: { $ref: '#/definitions/blobId' },
    mimeType: {
      type: 'string',
      pattern: '^image/.*$'
    },
    size: { type: 'integer' },
    width: { type: 'integer' },
    height: { type: 'integer' }
  }
}
