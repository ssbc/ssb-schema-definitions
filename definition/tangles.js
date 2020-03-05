module.exports = {
  anyOf: [
    {
      type: 'object',
      required: ['profile'],
      properties: {
        profile: { $ref: '#/defintitions/tangle' }
      }
    },
    {
      type: 'object',
      required: ['view'],
      properties: {
        view: { $ref: '#/definitions/tangle' }
      }
    },
    {
      type: 'object',
      required: ['link'],
      properties: {
        link: { $ref: '#/definitions/tangle' }
      }
    },
    {
      type: 'object',
      required: ['relationship'],
      properties: {
        relationship: { $ref: '#/definitions/tangle' }
      }
    },
    {
      type: 'object',
      required: ['artefact'],
      properties: {
        artefact: { $ref: '#/definitions/tangle' }
      }
    }
  ]
}
