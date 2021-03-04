const { Text, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    language: {
      type: Text,
    },
    name: {
      type: Text,
    },
    category: {
      type: Relationship,
      ref: "Category.translation",
    },
  },
};
