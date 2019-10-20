# SSB Schema Definitions

Standardised schema definitions for SSB messages when using [is-my-json-valid](https://github.com/mafintosh/is-my-json-valid).

## Example Usage

```js
const Definitions = require('ssb-schema-definitions')
const Validator = require('is-my-json-valid')

const schema = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'tangles'],
  properties: {
    type: {
      type: 'string',
      pattern: '^profile/.*$'
    },

    preferredName: { type: 'string' },

    avatarImage: { $ref: '#/definitions/image' }, // << reference a definition

    tangles: {
      type: 'object',
      required: ['profile'],
      properties: {
        profile: {
          oneOf: [
            { // for root message
              type: 'object',
              required: ['root', 'previous'],
              properties: {
                root: { type: 'null' },
                previous: { type: 'null' }
              }
            },
            { // for after the root message
              type: 'object',
              required: ['root', 'previous'],
              properties: {
                root: { $ref: '#/definitions/messageId' }, // <<
                previous: {
                  type: 'array',
                  items: { $ref: '#/definitions/messageId' }, // <<
                  minItems: 1
                }
              }
            }
          ]
        }
      }
    }
  },
  definitions: Definitions() // attach the definitions
}

const isValid = Validator(schema)

// isValid(msgContent) => Boolean
// isValid.errors => null | [Errors]
```

## API

### `Definitions() => Object`

The definitions is a getter (function) so that you can pull it and mutate it awithout getting into trouble.

To see what definitions are available check out `index.js`.

You can also see examples of how to use most of the definitions in the `tests/` filder

