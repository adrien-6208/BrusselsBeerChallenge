const { Text, Relationship } = require('@keystonejs/fields');

module.exports = {
    fields: {
        name: {
            type: Text,
            isRequired: true,
        },
        beer: {
            type: Relationship,
            ref: 'Beer.medal',
            many: true,
        },
    },
};