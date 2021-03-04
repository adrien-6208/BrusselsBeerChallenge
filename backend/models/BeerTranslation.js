const { Text, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    language: {
      type: Text,
    },
    name: {
      type: Text,
      isRequired: true,
    },
    beer: {
      type: Relationship,
      ref: "Beer.translation",
    },
  },
};
