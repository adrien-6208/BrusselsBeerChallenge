const { Text, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    language: {
      type: Text,
    },
    name: {
      type: Text,
    },
    countryName: {
      type: Text,
    },
    brewery: {
      type: Relationship,
      ref: "Brewery.translation",
    },
  },
};
