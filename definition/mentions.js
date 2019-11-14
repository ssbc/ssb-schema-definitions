module.exports = {
  message: {
    type: 'object',
    required: ['link'],
    properties: {
      link: { $ref: '#/definitions/messageId' }
    }
  },
  feed: {
    type: 'object',
    required: ['link', 'name'],
    properties: {
      link: { $ref: '#/definitions/feedId' },
      name: { type: 'string' }
    }
  },
  blob: {
    type: 'object',
    required: ['link', 'name'],
    properties: {
      link: { $ref: '#/definitions/blobId' },
      name: { type: 'string' }
    }
  },
  channel: {
    type: 'object',
    required: ['link'],
    properties: {
      link: { $ref: '#/definitions/channel' }
    }
  },
  any: {
    oneOf: [
      { type: 'null' },
      {
        type: 'array',
        items: {
          oneOf: [
            { $ref: '#/definitions/feedId' },
            { $ref: '#/definitions/messageId' },
            { $ref: '#/definitions/blobId' },
            { $ref: '#/definitions/mentions/feed' },
            { $ref: '#/definitions/mentions/message' },
            { $ref: '#/definitions/mentions/blob' },
            { $ref: '#/definitions/mentions/channel' }
          ]
        }
      }
    ]
  }
}
