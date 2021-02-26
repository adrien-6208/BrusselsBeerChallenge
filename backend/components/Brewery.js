const { Text, Relationship } = require('@keystonejs/fields');

module.exports = {
    fields: {
        name: {
            type: Text,
            isRequired: true,
        },
        phone: {
            type: Text
        },
        email: {
            type: Text
        },
        website: {
            type: Text,
        },
        address: {
            type: Text,
        },
        country: {
            type: Text,
            isRequired: true,
        },
        beer: {
            type: Relationship,
            ref: 'Beer.brewery',
            many: true,
        },
    },
};