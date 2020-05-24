module.exports = {
  type: 'object',
  required: ['blob', 'mimeType'],
  properties: {
    blob: { $ref: '#/definitions/blobId' },
    unbox: {
      type: 'string',
      minLength: 49,
      maxLength: 49,
      pattern: '\\.boxs'
    },
    mimeType: {
      type: 'string',
      pattern: '^image/.*$'
    },
    size: { type: 'integer' },
    width: { type: 'integer' },
    height: { type: 'integer' }
  }
}
