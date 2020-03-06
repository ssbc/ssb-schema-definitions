const { msgIdRegex, feedIdRegex, blobIdRegex } = require('ssb-ref')
const channelRegex = /^#[^\s]+/
// TODO find a canonical ssb definition of channel
if (!msgIdRegex || !feedIdRegex || !blobIdRegex) throw new Error('ssb-schema-definitions is missing a regex!')

module.exports = {
  messageId: {
    type: 'string',
    pattern: msgIdRegex
  },
  feedId: {
    type: 'string',
    pattern: feedIdRegex
  },
  blobId: {
    type: 'string',
    pattern: blobIdRegex
  },
  channel: {
    type: 'string',
    pattern: channelRegex
  },

  string: {
    type: 'object',
    required: ['set'],
    properties: {
      set: { type: 'string' }
    }
  },
  integer: {
    type: 'object',
    required: ['set'],
    properties: {
      set: { type: 'integer' }
    }
  },

  nullTangle: {
    type: 'object',
    required: ['root', 'previous'],
    properties: {
      root: { type: 'null' },
      previous: { type: 'null' }
    }
  },
  fullTangle: {
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
  },
  tangle: {
    oneOf: [
      { $ref: '#/definitions/nullTangle'},
      { $ref: '#/definitions/fullTangle'}
    ]
  },
  tombstone: {
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
              date: { type: 'integer' },
              reason: { type: 'string' }
            }
          }
        ]
      }
    }
  },
  // TODO - extract and test
  root: { $ref: '#/definitions/messageId' },
  branch: {
    oneOf: [
      { $ref: '#/definitions/messageId' },
      {
        type: 'array',
        items: {
          oneOf: [ // TODO - remove this (write tests first)
            { $ref: '#/definitions/messageId' }
          ]
        }
      }
    ]
  },

  // TODO - extract and test
  recps: {
    oneOf: [
      { type: 'null' },
      {
        type: 'array',
        items: {
          oneOf: [ // TODO - remove this (write tests first)
            { $ref: '#/definitions/feedId' }
            // { $ref: '#/definitions/mentions/feed' }
          ]
        },
        minItems: 1,
        maxItems: 7
      }
    ]
  },

  // TODO - extract and test
  encrypt: {
    // TODO check if this needs the following (write tests):
    // type: 'object'
    // required: ['box'],
    // properties: {
    box: {
      type: 'string',
      pattern: '\.box$' // was giving me grief so I brutally trimmed it
    }
  }
}
