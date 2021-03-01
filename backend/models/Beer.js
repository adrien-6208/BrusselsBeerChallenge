const { Text, Relationship } = require('@keystonejs/fields');

module.exports = {
    fields: {
        name: {
            type: Text,
            isRequired: true,
        },
        alcohol: {
            type: Text,
        },
        bitterness: {
            type: Text,
        },
        bottle_content: {
            type: Text,
        },
        final_gravity: {
            type: Text,
        },
        original_gravity: {
            type: Text,
        },
        brewery: {
            type: Relationship,
            ref: 'Brewery.beer',
            isRequired: true,
        },
        medal: {
            type: Relationship,
            ref: 'Medal.beer'
        },
    },
};