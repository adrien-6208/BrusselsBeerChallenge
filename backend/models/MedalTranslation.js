const { Text, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    language: {
      type: Text,
    },
    name: {
      type: Text,
    },
    medal: {
      type: Relationship,
      ref: "Medal.translation",
    },
  },
};
