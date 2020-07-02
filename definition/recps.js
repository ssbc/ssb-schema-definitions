const box1 = {
  type: 'array',
  items: { $ref: '#/definitions/feedId' },
  minItems: 1,
  maxItems: 7
}

const box2 = {
  type: 'array',
  items: [
    {
      oneOf: [
        { $ref: '#/definitions/cloakedMessageId' },
        { $ref: '#/definitions/feedId' }
      ]
    }
  ],
  additionalItems: { $ref: '#/definitions/feedId' },
  minItems: 1,
  maxItems: 16
}

module.exports = {
  box1,
  box2
}
